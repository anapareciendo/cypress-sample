/// <reference types="cypress" />


describe('api test - send message', () => {

    it('message endpoint', () => {
        cy.request({
            method: 'POST',
            url: '/message/', // baseUrl is prepend to URL
            // form: true, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
            body: {
              description: 'cypress testing message',
              email: 'cypress@cypress.com',
              name: 'cypress framework',
              phone: '01666999666',
              subject: 'fake@fakemail.com'
            },
          }).then((resp) => {
            expect(resp.status).to.eq(201)
          })
    })

})

describe('desktop tests - send message', () => {

    before(() => {
        cy.navigate_to_home()
    })

    it('fill in contact form', () => {
        cy.get_by_sel('ContactName').clear().type('cypress framework')
        cy.get_by_sel('ContactEmail').clear().type('cypress@cypress.com')
        cy.get_by_sel('ContactPhone').clear().type('01666999666')
        cy.get_by_sel('ContactSubject').clear().type('fake@fakemail.com')
        cy.get_by_sel('ContactDescription').clear().type('cypress testing message')
    })
    
    it('submit form', () => {
        cy.get('#submitContact').click()
        // cy.get('form').submit()
        cy.get(':nth-child(2) > div > h2').contains('Thanks for getting in touch cypress framework')
    })
    
})

describe('mobile tests - check views', () => {

    before(() => {
        cy.visitMobile('/')
        .then(win => expect(win.ontouchstart).to.be.null)
    })

    beforeEach(() => {
        cy.viewport("iphone-x")
    })

    it('fill in contact form', () => {
        cy.get_by_sel('ContactName').clear().type('cypress framework')
        cy.get_by_sel('ContactEmail').clear().type('cypress@cypress.com')
        cy.get_by_sel('ContactPhone').clear().type('01666999666')
        cy.get_by_sel('ContactSubject').clear().type('fake@fakemail.com')
        cy.get_by_sel('ContactDescription').clear().type('cypress testing message')
    })
    
    it('submit form', () => {
        cy.get('#submitContact').click()
        //cy.get('form').submit()
        cy.get(':nth-child(2) > div > h2').contains('Thanks for getting in touch cypress framework')
    })
    
})