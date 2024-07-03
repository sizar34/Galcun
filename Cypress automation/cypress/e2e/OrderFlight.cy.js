/// <reference types="cypress" />
import { selectOrigin, selectDestination, selectDates, clickSearch, fillForm, fillPassengerDetails, selectGender, enterBirthdate } from './support/helper';

Cypress.on('uncaught:exception', (err, runnable) => {
  // returning false here prevents Cypress from failing the test
  return false;
});

let TimeOut=50000;

describe('Order a Flight at issta website', () => {
  it('Order a Flight to Budapest from Tel Aviv', () => {
    // Visit the issta website
    cy.visit('https://www.issta.co.il/');

    // Click on the "Flights" link
    cy.get('a[href="/flights"]').first().click();

    // Use helper functions
    selectOrigin('תל אביב');
    selectDestination('בודפשט');
    selectDates('10', '17');

    // Decrease number of passengers
    cy.contains('button.ng-spinner-remove', ' - ').first().click({ force: true });

    // Click the "Choose" button
    cy.contains('button.ng-btn-primary', 'בחירה').click({ force: true });

    // Click the "Search" button using helper function
    clickSearch();

    // Get the href of the button and visit the URL
    cy.get('.button-wrapper a.btn-details').then(($a) => {
      const href = $a.attr('href');
      cy.log(href);

      // Prepend the base URL to the href to form a complete URL
      const completeUrl = `https://www.issta.co.il${href}`;

      // Visit the link using the complete URL
      cy.visit(completeUrl);
    });

    // Click on the "Continue" button
    cy.get('button.btn.btn-block.btn-primary[type="submit"]', { setTimeout: TimeOut }).click({ setTimeout: TimeOut });

    // Fill in the form using helper function
    fillForm('Sizar', 'Simaan', 'simaan.sizaar@gmail.com', '0546611868');
    
    // Click on the "Continue" button
    cy.get('button.btn.btn--default.step-one-submit[type="submit"]').click();

    // Fill in the passenger details using helper function
    fillPassengerDetails('Sizar', 'Simaan');

    // Select gender using helper function
    selectGender('זכר');

    // Enter birthdate using helper function
    enterBirthdate('11051996');

    // Choose the baggage
    cy.contains('.baggage-selector-option', 'ללא מזוודה').click({ force: true });

    // Click all baggage options
    cy.get('.baggage-selector-option.selected-option[data-id="-1"]').each(($el) => {
      cy.wrap($el).click({ setTimeout: TimeOut });
    });

    // Click the final submit button
    cy.get('button.btn.btn--default.step-one-submit').click();

    // Click on additional options
    cy.contains('span.general-service-title.general-service-remove-title', 'לא תודה, אני אשלם אם אזדקק לשינויים', { setTimeout: TimeOut }).click({ setTimeout: TimeOut });
    cy.contains('span.general-service-title.general-service-remove-title', 'אקח את הסיכון, בחרתי לוותר על שירות זה', { setTimeout: TimeOut }).click({ setTimeout: TimeOut });
    cy.contains('span.general-service-title.general-service-remove-title', 'לא תודה, אסתדר בעצמי', { setTimeout: TimeOut }).click({ setTimeout: TimeOut });
    cy.contains('span.general-service-title.general-service-remove-title', 'לא, תודה', { setTimeout: TimeOut }).click({ setTimeout: TimeOut });

    // Click the final submit button again
    cy.get('button[type="submit"]').contains('המשיכו').click({ force: true });
  });
});
