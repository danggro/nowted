describe('Signup Page', () => {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND_DEV')}/testing/reset`)
    cy.visit('')
    cy.get('a').contains('Signup').click()
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
      cy.contains('Username is missing')
    })

    it('fails if email empty', () => {
      cy.get('#username').type('digran')
      cy.get('button').contains('Signup').click()
      cy.contains('Email is missing')
    })

    it('fails if password empty', () => {
      cy.get('#username').type('digran')
      cy.get('#email').type('digran@gmail.com')
      cy.get('button').contains('Signup').click()
      cy.contains('Password is missing')
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

      cy.get('button').contains('Signup').click()
      cy.contains('User not available')
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

      cy.get('button').contains('Signup').click()
      cy.contains('Email not available')
    })

    it('fails if email not valid', () => {
      cy.get('#username').type('bambang')
      cy.get('#email').type('bambang')
      cy.get('#password').type('12345678')
      cy.get('button').contains('Signup').click()

      cy.get('button').contains('Signup').click()
      cy.contains('Email not valid')
    })

    it('fails if password less than 8 character', () => {
      cy.get('#username').type('bambang')
      cy.get('#email').type('bambang@gmail.com')
      cy.get('#password').type('1234567')
      cy.get('button').contains('Signup').click()

      cy.get('button').contains('Signup').click()
      cy.contains('Minimum 8 character')
    })
  })
})
