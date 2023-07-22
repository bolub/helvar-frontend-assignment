import { defaultLevelValues } from '../../src/utils/levels';

const moveSlider = (args: {
  times: number;
  direction: 'left' | 'right';
  selector: string;
}) => {
  for (let i = 0; i < args.times; i++) {
    cy.get(args.selector).focus().type(`{${args.direction}arrow}`);
  }
};

const checkSliderValue = (args: {
  selector: string;
  value: string | number;
}) => {
  cy.get(args.selector).should('have.attr', 'aria-valuenow', args.value);
};

describe('Levels tests', () => {
  let levels: {
    occupied: string;
    powerSave: string;
    minimum: string;
  };

  beforeEach(() => {
    cy.fixture('levels').then((levelSelectors) => {
      levels = levelSelectors;
    });
  });

  it('Occupied slider values change correctly', () => {
    cy.visit('/');

    checkSliderValue({
      selector: levels.occupied,
      value: defaultLevelValues.occupied,
    });

    moveSlider({ times: 2, direction: 'right', selector: levels.occupied });
    checkSliderValue({ selector: levels.occupied, value: '90' });

    moveSlider({ times: 10, direction: 'left', selector: levels.occupied });
    checkSliderValue({ selector: levels.occupied, value: '40' });
  });

  it('Power save slider values change correctly', () => {
    cy.visit('/');

    checkSliderValue({
      selector: levels.powerSave,
      value: defaultLevelValues.powerSave,
    });

    moveSlider({ times: 5, direction: 'right', selector: levels.powerSave });
    checkSliderValue({ selector: levels.powerSave, value: '45' });

    moveSlider({ times: 10, direction: 'left', selector: levels.powerSave });
    checkSliderValue({ selector: levels.powerSave, value: '0' });
  });

  it('Minimum slider values change correctly', () => {
    cy.visit('/');

    checkSliderValue({
      selector: levels.minimum,
      value: defaultLevelValues.minimum,
    });

    moveSlider({ times: 10, direction: 'right', selector: levels.minimum });
    checkSliderValue({ selector: levels.minimum, value: '45' });

    moveSlider({ times: 9, direction: 'left', selector: levels.minimum });
    checkSliderValue({ selector: levels.minimum, value: '1' });
  });

  it('Checks if the correct values are emitted on apply', () => {
    cy.visit('/');

    moveSlider({ times: 10, direction: 'right', selector: levels.occupied });
    moveSlider({
      times: 10,
      direction: 'right',
      selector: levels.powerSave,
    });
    moveSlider({ times: 10, direction: 'right', selector: levels.minimum });

    cy.get('[data-cy=apply]').click();

    cy.get('[data-cy=occupied-value]').should('have.text', '100');
    cy.get('[data-cy=power-save-value]').should('have.text', '70');
    cy.get('[data-cy=minimum-value]').should('have.text', '45');
  });

  it('Checks if the default values are emitted on cancel', () => {
    cy.visit('/');

    moveSlider({
      times: 10,
      direction: 'right',
      selector: levels.occupied,
    });
    moveSlider({
      times: 10,
      direction: 'right',
      selector: levels.powerSave,
    });
    moveSlider({ times: 10, direction: 'right', selector: levels.minimum });

    cy.get('[data-cy=cancel]').click();

    cy.get('[data-cy=occupied-value]').should(
      'have.text',
      defaultLevelValues.occupied
    );
    cy.get('[data-cy=power-save-value]').should(
      'have.text',
      defaultLevelValues.powerSave
    );
    cy.get('[data-cy=minimum-value]').should(
      'have.text',
      defaultLevelValues.minimum
    );
  });

  it('Checks if occupied is always greater than power save and minimum', () => {
    cy.visit('/');

    moveSlider({ times: 15, direction: 'left', selector: levels.occupied });
    checkSliderValue({ selector: levels.occupied, value: '5' });
    checkSliderValue({ selector: levels.powerSave, value: '5' });

    moveSlider({ times: 2, direction: 'left', selector: levels.occupied });
    checkSliderValue({ selector: levels.occupied, value: '0' });
    checkSliderValue({ selector: levels.powerSave, value: '0' });
    checkSliderValue({ selector: levels.minimum, value: '0' });

    moveSlider({
      times: 10,
      direction: 'right',
      selector: levels.powerSave,
    });
    moveSlider({ times: 8, direction: 'right', selector: levels.minimum });
    moveSlider({ times: 14, direction: 'left', selector: levels.occupied });

    // moveSlider({
    //   times: 10,
    //   direction: 'right',
    //   selector: levels.powerSave,
    // });
    // moveSlider({ times: 10, direction: 'right', selector: levels.minimum });
  });
});
