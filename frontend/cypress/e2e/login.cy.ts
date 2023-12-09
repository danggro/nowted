describe('Login Page', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND_DEV')}/users/`, {
      username: 'digran',
      email: 'digran@gmail.com',
      password: '12345678',
    })
    cy.visit('')
  })
  afterEach(() => {
    cy.request('DELETE', `${Cypress.env('BACKEND_DEV')}/users/1`)
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
      cy.request('DELETE', `${Cypress.env('BACKEND_DEV')}/login/1`)
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
