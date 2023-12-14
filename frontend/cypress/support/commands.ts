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
    login(credentials: { username: string; password: string }): Chainable<any>
    user(user: {
      username: string
      email: string
      password: string
    }): Chainable<any>
    note(note: { title: string; date: string; content: string }): Chainable<any>
  }
}

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND_DEV')}/auth/login`, {
    username,
    password,
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('user', ({ username, email, password }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND_DEV')}/users`,
    body: {
      username,
      email,
      password,
    },
  })
})

Cypress.Commands.add('note', ({ title, date, content }) => {
  cy.request({
    method: 'POST',
    url: `${Cypress.env('BACKEND_DEV')}/notes`,
    body: {
      title,
      date,
      content,
    },
    headers: {
      Authorization: `Bearer ${
        JSON.parse(localStorage.getItem('loggedUser') as string).token
      }`,
    },
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
