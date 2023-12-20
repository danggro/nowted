describe('Signup Page', () => {
  let wait: Boolean = true
  beforeEach(function () {
    if (wait) {
      cy.wait(10000)
      wait = false
    }
    cy.request('POST', `${Cypress.env('BACKEND_DEV')}/testing/reset`)
    cy.visit('/signup')
  })

  it('Signup form is shown', () => {
    cy.get('#username')
    cy.get('#email')
    cy.get('#password')
    cy.contains('Signup')
  })

  describe('Signup', () => {
    it('success with valid input', () => {
      cy.get('#username').type('digran')
      cy.get('#email').type('digran@gmail.com')
      cy.get('#password').type('12345678')
      cy.get('button').contains('Signup').click()

      cy.get('h1').contains('Login')
      cy.get('a').contains('Signup').click()
    })

    it('fails if username empty', () => {
      cy.get('button').contains('Signup').click()
      cy.contains('Username cannot be empty')
    })

    it('fails if email empty', () => {
      cy.get('#username').type('digran')
      cy.get('button').contains('Signup').click()
      cy.contains('Email cannot be empty')
    })

    it('fails if password empty', () => {
      cy.get('#username').type('digran')
      cy.get('#email').type('digran@gmail.com')
      cy.get('button').contains('Signup').click()
      cy.contains('Password cannot be empty')
    })

    it('fails if username not available', () => {
      cy.user({
        username: 'digran',
        email: 'digran@gmail.com',
        password: '12345678',
      })
      cy.get('#username').type('digran')
      cy.get('#email').type('digran@gmail.com')
      cy.get('#password').type('12345678')
      cy.get('button').contains('Signup').click()

      cy.contains('Username not available')
    })

    it('fails if email not available', () => {
      cy.user({
        username: 'digran',
        email: 'digran@gmail.com',
        password: '12345678',
      })
      cy.get('#username').type('bambang')
      cy.get('#email').type('digran@gmail.com')
      cy.get('#password').type('12345678')
      cy.get('button').contains('Signup').click()

      cy.contains('Email not available')
    })

    it('fails if email not valid', () => {
      cy.get('#username').type('bambang')
      cy.get('#email').type('bambang')
      cy.get('#password').type('12345678')
      cy.get('button').contains('Signup').click()

      cy.contains('Email not valid')
    })

    it('fails if password less than 8 character', () => {
      cy.get('#username').type('bambang')
      cy.get('#email').type('bambang@gmail.com')
      cy.get('#password').type('123456')
      cy.get('button').contains('Signup').click()
      cy.contains('Minimum 8 character')
    })
  })
})
