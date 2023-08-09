import { expect, it, describe } from 'vitest';
import {
  getNearestStepValue,
  getIncrementalValue,
} from 'src/components/custom-slider/utils';

describe('getNearestStepValue', () => {
  it('returns the correct value for input less than or equal to 1', () => {
    expect(getNearestStepValue(0)).toBe(0);
    expect(getNearestStepValue(1)).toBe(1);
  });

  it('returns 5 for input equal to 2', () => {
    expect(getNearestStepValue(2)).toBe(5);
  });

  it('returns nearest multiple of 5', () => {
    expect(getNearestStepValue(10)).toBe(10);
    expect(getNearestStepValue(20)).toBe(20);
    expect(getNearestStepValue(25)).toBe(25);

    expect(getNearestStepValue(11)).toBe(10);
    expect(getNearestStepValue(14)).toBe(15);
    expect(getNearestStepValue(16)).toBe(15);
  });

  it('returns 100 for input greater than or equal to 100', () => {
    expect(getNearestStepValue(100)).toBe(100);
    expect(getNearestStepValue(101)).toBe(100);
    expect(getNearestStepValue(200)).toBe(100);
  });
});

describe('getIncrementalValue', () => {
  describe('When moving up', () => {
    it('returns 1 for input value less than or equal to 1', () => {
      expect(
        getIncrementalValue({
          value: 1,
          isMovingUp: true,
          isMovingDown: false,
        })
      ).toBe(1);

      expect(
        getIncrementalValue({
          value: 0,
          isMovingUp: true,
          isMovingDown: false,
        })
      ).toBe(1);
    });

    it('returns 3 for input value of 2 ', () => {
      expect(
        getIncrementalValue({
          value: 2,
          isMovingUp: true,
          isMovingDown: false,
        })
      ).toBe(3);
    });
  });

  it('returns 3 when moving down and input value is less than or equal to 1 ', () => {
    expect(
      getIncrementalValue({
        value: 1,
        isMovingUp: false,
        isMovingDown: true,
      })
    ).toBe(1);
  });

  it('returns 4 when moving in any direction and input is 5', () => {
    expect(
      getIncrementalValue({
        value: 5,
        isMovingUp: false,
        isMovingDown: true,
      })
    ).toBe(4);

    expect(
      getIncrementalValue({
        value: 5,
        isMovingUp: true,
        isMovingDown: false,
      })
    ).toBe(4);
  });

  it('returns 5 when moving in any direction and input is not specifically handled (a multiple of 5)', () => {
    expect(
      getIncrementalValue({
        value: 20,
        isMovingUp: false,
        isMovingDown: true,
      })
    ).toBe(5);

    expect(
      getIncrementalValue({
        value: 20,
        isMovingUp: true,
        isMovingDown: false,
      })
    ).toBe(5);
  });
});
