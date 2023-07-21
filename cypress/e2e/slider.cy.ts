import { defaultLevelValues } from '../../src/utils/levels';

const moveSlider = (args: {
  times: number;
  direction: 'left' | 'right';
  selector: string;
}) => {
  for (let i = 0; i < args.times; i++) {
    cy.get(`[data-cy=${args.selector}]`)
      .focus()
      .type(`{${args.direction}arrow}`);
  }
};

const checkSliderValue = (args: {
  selector: string;
  value: string | number;
}) => {
  cy.get(`[data-cy=${args.selector}]`).should(
    'have.attr',
    'aria-valuenow',
    args.value
  );
};

describe('Levels tests', () => {
  it('Occupied slider values change correctly', () => {
    cy.visit('/');

    checkSliderValue({
      selector: 'occupied-slider',
      value: defaultLevelValues.occupied,
    });

    moveSlider({ times: 2, direction: 'right', selector: 'occupied-slider' });
    checkSliderValue({ selector: 'occupied-slider', value: '90' });

    moveSlider({ times: 10, direction: 'left', selector: 'occupied-slider' });
    checkSliderValue({ selector: 'occupied-slider', value: '40' });
  });

  it('Power save slider values change correctly', () => {
    cy.visit('/');

    checkSliderValue({
      selector: 'power-save-slider',
      value: defaultLevelValues.powerSave,
    });

    moveSlider({ times: 5, direction: 'right', selector: 'power-save-slider' });
    checkSliderValue({ selector: 'power-save-slider', value: '45' });

    moveSlider({ times: 10, direction: 'left', selector: 'power-save-slider' });
    checkSliderValue({ selector: 'power-save-slider', value: '0' });
  });

  it('Minimum slider values change correctly', () => {
    cy.visit('/');

    checkSliderValue({
      selector: 'minimum-slider',
      value: defaultLevelValues.minimum,
    });

    moveSlider({ times: 10, direction: 'right', selector: 'minimum-slider' });
    checkSliderValue({ selector: 'minimum-slider', value: '45' });

    moveSlider({ times: 9, direction: 'left', selector: 'minimum-slider' });
    checkSliderValue({ selector: 'minimum-slider', value: '1' });
  });

  it('Checks if the correct values are logged', () => {
    cy.visit('/');

    moveSlider({ times: 10, direction: 'right', selector: 'occupied-slider' });
    moveSlider({
      times: 10,
      direction: 'right',
      selector: 'power-save-slider',
    });
    moveSlider({ times: 10, direction: 'right', selector: 'minimum-slider' });

    cy.get('[data-cy=apply]').click();
  });
});
