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

const checkSliderValue = (args: { selector: string; value: string }) => {
  cy.get(`[data-cy=${args.selector}]`)
    .children('input')
    .should('have.value', args.value);
};

describe('Levels tests', () => {
  it('Occupied slider values change correctly', () => {
    cy.visit('/');

    moveSlider({ times: 5, direction: 'right', selector: 'occupied-slider' });
    checkSliderValue({ selector: 'occupied-slider-container', value: '85' });

    moveSlider({ times: 10, direction: 'left', selector: 'occupied-slider' });
    checkSliderValue({ selector: 'occupied-slider-container', value: '75' });
  });

  it('Power save slider values change correctly', () => {
    cy.visit('/');

    moveSlider({ times: 5, direction: 'right', selector: 'power-save-slider' });
    checkSliderValue({ selector: 'power-save-slider-container', value: '25' });

    moveSlider({ times: 10, direction: 'left', selector: 'power-save-slider' });
    checkSliderValue({ selector: 'power-save-slider-container', value: '15' });
  });

  it('Minimum slider values change correctly', () => {
    cy.visit('/');

    moveSlider({ times: 10, direction: 'right', selector: 'minimum-slider' });
    checkSliderValue({ selector: 'minimum-slider-container', value: '10' });

    moveSlider({ times: 10, direction: 'left', selector: 'minimum-slider' });
    checkSliderValue({ selector: 'minimum-slider-container', value: '0' });
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
