// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('navigate_to_home', () => {
    cy.visit('/')
    cy.get('[class="hotel-logoUrl"]').should('be.visible')
})

// -- data-cy selector commands
Cypress.Commands.add("get_by_sel", (selector, ...args) => {
    return cy.get(`[data-testid=${selector}]`, ...args);
})
  
Cypress.Commands.add("get_by_sel_like", (selector, ...args) => {
    return cy.get(`[data-testid*=${selector}]`, ...args);
})

// -- login by api - csrf token
Cypress.Commands.add('login', (user) => {
    cy.request('/login')
    .its('body')
    .then((body) => {
      const $html = Cypress.$(body)
      const csrf = $html.find('input[name=_token]').val()

      cy.request({
        method: 'POST',
        url: '/login',
        form: true,
        body: {
          email: user,
          password: Cypress.env('CYPRESS_PASSWORD'),
          _token: csrf
        }
      }).then((resp) => {
            expect(resp.status).to.eq(200)
      })
    })    
})