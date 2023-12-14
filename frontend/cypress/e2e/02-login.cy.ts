describe('Login Page', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND_DEV')}/testing/reset`)
    cy.user({
      username: 'digran',
      email: 'digran@gmail.com',
      password: '12345678',
    })
    cy.visit('')
  })
  it('Login form is shown', () => {
    cy.get('h1').contains('Login')
    cy.get('#username')
    cy.get('#password')
    cy.get('button').contains('Login')
  })

  describe('Login', () => {
    it('success with valid input', () => {
      cy.get('#username').type('digran')
      cy.get('#password').type('12345678')
      cy.get('button').contains('Login').click()

      cy.contains('New Note')
    })

    it('fails if username empty', () => {
      cy.get('button').contains('Login').click()
      cy.contains('Username is missing')
    })

    it('fails if password empty', () => {
      cy.get('#username').type('digran')
      cy.get('button').contains('Login').click()
      cy.contains('Password is missing')
    })
  })
})
