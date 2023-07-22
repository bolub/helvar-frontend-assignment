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

describe('Levels tests', () => {
  let levels: {
    occupied: string;
    powerSave: string;
    minimum: string;
    applyButton: string;
    cancelButton: string;
    occupiedValue: string;
    powerSaveValue: string;
    minimumValue: string;
    closeModalButton: string;
  };

  beforeEach(() => {
    cy.fixture('levels').then((levelSelectors) => {
      levels = levelSelectors;
    });

    cy.visit('/');
  });

  it('Checks if the correct values are emitted on apply', () => {
    moveSlider({ times: 10, direction: 'right', selector: levels.occupied });
    moveSlider({
      times: 10,
      direction: 'right',
      selector: levels.powerSave,
    });
    moveSlider({ times: 10, direction: 'right', selector: levels.minimum });

    cy.get(levels.applyButton).click();

    cy.get(levels.occupiedValue).should('have.text', '100');
    cy.get(levels.powerSaveValue).should('have.text', '70');
    cy.get(levels.minimumValue).should('have.text', '45');
  });

  it('Checks if the default values are emitted on cancel', () => {
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

    cy.get(levels.cancelButton).click();

    cy.get(levels.occupiedValue).should(
      'have.text',
      defaultLevelValues.occupied
    );
    cy.get(levels.powerSaveValue).should(
      'have.text',
      defaultLevelValues.powerSave
    );
    cy.get(levels.minimumValue).should('have.text', defaultLevelValues.minimum);
  });

  it('Checks if occupied is always greater than or equal to power save and minimum', () => {
    // Move slider just enough to affect the power save slider and check if the values are equal
    moveSlider({ times: 15, direction: 'left', selector: levels.occupied });
    cy.get(levels.applyButton).click();
    cy.get(levels.occupiedValue).then(($occupiedValue) => {
      const occupied = parseInt($occupiedValue.text(), 10);

      cy.get(levels.powerSaveValue).then(($powerSaveValue) => {
        const powerSave = parseInt($powerSaveValue.text(), 10);

        expect(occupied).to.equal(powerSave);
      });
    });
    cy.get(levels.closeModalButton).click();

    // Move slider to the far left end to check if all values are equal
    moveSlider({ times: 2, direction: 'left', selector: levels.occupied });
    cy.get(levels.applyButton).click();
    cy.get(levels.occupiedValue).then(($occupiedValue) => {
      const occupied = parseInt($occupiedValue.text(), 10);

      cy.get(levels.powerSaveValue).then(($powerSaveValue) => {
        const powerSave = parseInt($powerSaveValue.text(), 10);

        cy.get(levels.minimumValue).then(($minimumValue) => {
          const minimum = parseInt($minimumValue.text(), 10);
          expect(occupied).to.equal(powerSave).to.equal(minimum);
        });
      });
    });
    cy.get(levels.closeModalButton).click();

    // Move slider to the far right and confirm occupied is always greater than power save and minimum
    moveSlider({
      times: 10,
      direction: 'right',
      selector: levels.occupied,
    });

    cy.get(levels.applyButton).click();
    cy.get(levels.occupiedValue).then(($occupiedValue) => {
      const occupied = parseInt($occupiedValue.text(), 10);

      cy.get(levels.powerSaveValue).then(($powerSaveValue) => {
        const powerSave = parseInt($powerSaveValue.text(), 10);

        cy.get(levels.minimumValue).then(($minimumValue) => {
          const minimum = parseInt($minimumValue.text(), 10);
          expect(occupied)
            .to.be.greaterThan(powerSave)
            .to.be.greaterThan(minimum);
        });
      });
    });
  });

  it('Checks if power save is always greater than or equal to minimum but less than or equal to occupied', () => {
    // Move slider just enough to affect the power save slider and check if the values are equal
    moveSlider({ times: 5, direction: 'left', selector: levels.powerSave });
    cy.get(levels.applyButton).click();
    cy.get(levels.powerSaveValue).then(($powerSaveValue) => {
      const powerSave = parseInt($powerSaveValue.text(), 10);

      cy.get(levels.minimumValue).then(($minimumValue) => {
        const minimum = parseInt($minimumValue.text(), 10);

        expect(powerSave).to.equal(minimum);
      });
    });
    cy.get(levels.closeModalButton).click();

    // Move slider to the far right to check if power save is equal to occupied
    moveSlider({ times: 18, direction: 'right', selector: levels.powerSave });
    cy.get(levels.applyButton).click();
    cy.get(levels.powerSaveValue).then(($powerSaveValue) => {
      const powerSave = parseInt($powerSaveValue.text(), 10);

      cy.get(levels.occupiedValue).then(($occupiedValue) => {
        const occupied = parseInt($occupiedValue.text(), 10);

        cy.get(levels.minimumValue).then(($minimumValue) => {
          const minimum = parseInt($minimumValue.text(), 10);

          expect(powerSave).to.equal(occupied);
          expect(powerSave).to.be.greaterThan(minimum);
        });
      });
    });
    cy.get(levels.closeModalButton).click();
  });

  it('Checks if minimum is always less than or equal to power save and occupied', () => {
    // Move slider to the far right and check if minimum is equal to power save and occupied
    moveSlider({ times: 18, direction: 'right', selector: levels.minimum });
    cy.get(levels.applyButton).click();
    cy.get(levels.minimumValue).then(($minimumValue) => {
      const minimum = parseInt($minimumValue.text(), 10);

      cy.get(levels.powerSaveValue).then(($powerSaveValue) => {
        const powerSave = parseInt($powerSaveValue.text(), 10);

        cy.get(levels.occupiedValue).then(($occupiedValue) => {
          const occupied = parseInt($occupiedValue.text(), 10);

          expect(minimum).to.equal(powerSave).to.equal(occupied);
        });
      });
    });
  });
});
