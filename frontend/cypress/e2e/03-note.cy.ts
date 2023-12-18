describe('Note Page', () => {
  beforeEach(() => {
    cy.request('POST', `${Cypress.env('BACKEND_DEV')}/testing/reset`)
    cy.user({
      username: 'digran',
      email: 'digran@gmail.com',
      password: '12345678',
    })
    cy.login({ username: 'digran', password: '12345678' })
    cy.visit('')
  })

  it('button component is shown', () => {
    cy.get('button').contains('New Note')
    cy.get('button').contains('Logout')
  })

  it('when button form component is shown', () => {
    cy.get('button').contains('New Note').click()
    cy.get('#title')
    cy.get('#day')
    cy.get('#month')
    cy.get('#year')
    cy.get('#content')
  })

  describe('Create new note', () => {
    beforeEach(() => {
      cy.get('button').contains('New Note').click()
    })

    it('success with valid input', () => {
      cy.get('#title').type('This is title')
      cy.get('#day').type('31')
      cy.get('#month').type('12')
      cy.get('#year').type('2023')
      cy.get('#content').type('This is content')
      cy.contains('Note Saved')
      cy.get('.test-note')
    })

    it('success with valid date default', () => {
      cy.get('#title').type('This is title')
      cy.get('#content').type('This is content')
      cy.contains('Note Saved')
      cy.get('.test-note')
    })

    it('fails if title is missing', () => {
      cy.get('#day').type('31')
      cy.get('#month').type('12')
      cy.get('#year').type('2023')
      cy.get('#content').type('This is content')
      cy.get('span').contains('Title is missing')
    })

    it('fails if date is not valid', () => {
      cy.get('#title').type('This is title')
      cy.get('#day').type('50')
      cy.get('span').contains('Date not valid')
      cy.get('#day').clear()
      cy.get('#day').type('31')
      cy.get('#month').type('20')
      cy.get('span').contains('Date not valid')
      cy.get('#month').clear()
      cy.get('#month').type('12')
      cy.get('#year').type('2100')
      cy.get('span').contains('Date not valid')
    })
  })

  it('Success update specific note', () => {
    cy.note({
      title: 'This is title',
      date: '12/12/2023',
      content: 'This is content',
    })
    cy.get('.test-note').click()
    cy.get('#title').type(' update')
    cy.get('#day').type('01')
    cy.get('#month').type('01')
    cy.get('#year').type('2022')
    cy.get('#content').type(' update')
    cy.get('.test-note').contains('This is title update')
    cy.get('.test-note').contains('01/01/2022')
    cy.get('.test-note').contains('This is content update')
  })

  it('Success delete specific note', () => {
    cy.note({
      title: 'This is title',
      date: '12/12/2023',
      content: 'This is content',
    })
    cy.get('.test-note').click()
    cy.get('#3dot').click()
    cy.contains('Delete').click()
    cy.get('html').should('not.contain', 'This is title')
  })
})
