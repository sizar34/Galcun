// support/helper.js

// Select the origin
export const selectOrigin = (origin) => {
    cy.get('input[placeholder="בחר מוצא"]').click({ force: true });
    cy.contains('.ng-autocomplete-item', origin).click({ force: true });
  };
  
  // Select the destination
  export const selectDestination = (destination) => {
    cy.get('input[placeholder="לאיפה?"]').click({ force: true }).type(destination, { force: true });
  };
  
  // Select departure and return dates
  export const selectDates = (departureDate, returnDate) => {
    cy.get('div.day.toMonth.valid').contains('span.day-number', departureDate).click({ force: true });
    cy.get('div.day.toMonth.valid').contains('span.day-number', returnDate).click({ force: true });
  };
  
  // Click the "Search" button
  export const clickSearch = () => {
    cy.get('button[type="submit"]').contains('חפשו').first().click({ force: true });
  };
  
  // Fill in the form
  export const fillForm = (firstName, lastName, email, phone) => {
    cy.get('#checkout-first-name').type(firstName, { delay: 100 });
    cy.get('#checkout-last-name').type(lastName, { delay: 100 });
    cy.get('#checkout-email').clear().type(email, { delay: 150, force: true });
    cy.get('#checkout-phone').type(phone, { delay: 100 });
  };
  
  // Fill in the passenger details
  export const fillPassengerDetails = (firstNameEng, lastNameEng) => {
    cy.get('input[data-placeholder-text=" שם פרטי (באנגלית)"]').type(firstNameEng);
    cy.get('input[data-placeholder-text=" שם משפחה (באנגלית)"]').type(lastNameEng);
  };
  
  // Select gender
  export const selectGender = (gender) => {
    cy.get('span.label').contains('מין').click();
    cy.contains('li', gender).click();
  };
  
  // Enter birthdate
  export const enterBirthdate = (birthdate) => {
    cy.get('input[data-msg-required="נא להזין תאריך לידה"]').type(birthdate);
  };
  