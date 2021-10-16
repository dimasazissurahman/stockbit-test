/* eslint-disable no-undef */
/// <reference types="Cypress" />

describe('Testing Home Page', function () {
    it('Test All Component', function () {
        cy.visit('/');
        cy.get('[data-test-id="test-search"]').type('her').should('have.value', 'her');
        cy.get('[data-test-id="check-data-2"]').should('be.visible');
        cy.scrollTo('bottom');
        cy.get('[data-test-id="check-img-Her"]').click();
        cy.get('[data-test-id="close-btn"]').click();
        cy.get('[data-test-id="button-test-1"]').click();
        cy.visit('/');
        cy.get('[data-test-id="test-search"]').type('batman').should('have.value', 'batman');
        cy.get('[data-test-id="button-test-1"]').click();
        cy.visit('/');
        cy.get('[data-test-id="test-search"]').type('robin').should('have.value', 'robin');
        cy.scrollTo('bottom');
        cy.get('[data-test-id="check-data-10"]').should('be.visible');
    });
})