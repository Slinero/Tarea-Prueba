/// <reference types="cypress" />

Cypress.Commands.add('verificarInformacionHotel', () => {
    cy.contains('Shady Meadows B&B').should('be.visible');
    cy.contains('The Old Farmhouse, Shady Street, Newfordburyshire, NE1 410S').should('be.visible');
    cy.contains('012345678901').should('be.visible');
    cy.contains('fake@fakeemail.com').should('be.visible');
  });
  
  // Comando para verificar que al menos una imagen esté visible
  Cypress.Commands.add('verificarImagenVisible', () => {
    cy.get('img').should('be.visible');
  });
  
  Cypress.Commands.add('verificarDescripcionHotel', () => {
    cy.contains('Welcome to Shady Meadows, a delightful Bed & Breakfast nestled in the hills on Newingtonfordburyshire. A place so beautiful you will never want to leave. All our rooms have comfortable beds and we provide breakfast from the locally sourced supermarket. It is a delightful place.').should('be.visible');
  });

  // Comando para validar el envío de un formulario vacío
Cypress.Commands.add('validarEnvioFormVacio', () => {
  cy.log('Envío de form de contacto en blanco...');
  cy.get('#submitContact').click();
  cy.get('.alert').should('be.visible');
  cy.get('p').contains('Subject must be between 5 and 100 characters.');
  cy.get('p').contains('Subject may not be blank');
  cy.get('p').contains('Name may not be blank');
  cy.get('p').contains('Message must be between 20 and 2000 characters.');
  cy.get('p').contains('Message may not be blank');
  cy.get('p').contains('Email may not be blank');
  cy.get('p').contains('Phone may not be blank');
  cy.get('p').contains('Phone must be between 11 and 21 characters.');
});

// Comando para validar el envío de un formulario con datos incorrectos
Cypress.Commands.add('validarEnvioFormIncorrecto', () => {
  cy.log('Set de datos incorrectos...');
  cy.get('input[placeholder="Name"]').type('asd');
  cy.get('input[placeholder="Email"]').type('asdasd');
  cy.get('input[placeholder="Phone"]').type('asdasd');
  cy.get('input[placeholder="Subject"]').type('asdasd');
  cy.get('[data-testid="ContactDescription"]').type('asdasd');
  cy.get('#submitContact').click();

  cy.get('.alert').should('be.visible');
  cy.get('p').contains('Phone must be between 11 and 21 characters.');
  cy.get('p').contains('debe ser una dirección de correo electrónico con formato correcto');
  cy.get('p').contains('Message must be between 20 and 2000 characters.');
});

// Comando para validar el envío de un formulario con datos correctos
Cypress.Commands.add('validarEnvioFormCorrecto', () => {
  cy.log('Set de datos correctos...');
  cy.get('input[placeholder="Name"]').type('Juan Pérez');
  cy.get('input[placeholder="Email"]').type('juan@gmail.com');
  cy.get('input[placeholder="Phone"]').type('35123696457');
  cy.get('input[placeholder="Subject"]').type('Reserva de habitación para fecha X');
  cy.get('[data-testid="ContactDescription"]').type('loremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestloremTestlo'); 
  cy.get('#submitContact').click();
});
