/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
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
declare namespace Cypress {
  interface Chainable<Subject = any> {
    login(credentials: { username: string; userId: number }): Chainable<any>
    user(user: {
      username: string
      email: string
      password: string
    }): Chainable<any>
    note(note: {
      title: string
      date: string
      content: string
      userId: number
    }): Chainable<any>
  }
}

Cypress.Commands.add('login', ({ username, userId }) => {
  cy.request('POST', `${Cypress.env('BACKEND_DEV')}/login`, {
    username,
    token: userId,
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('user', ({ username, email, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND_DEV')}/users`, {
    username,
    email,
    password,
  })
})

Cypress.Commands.add('note', ({ title, date, content, userId }) => {
  cy.request('POST', `${Cypress.env('BACKEND_DEV')}/notes`, {
    title,
    date,
    content,
    userId,
  }).then(() => {
    cy.visit('')
  })
})
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
//
