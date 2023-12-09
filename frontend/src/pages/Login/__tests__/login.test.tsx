import { render, screen } from '@testing-library/react'
import Login from '../index'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('Login page', () => {
  let inputUsername: HTMLInputElement
  let inputPassword: HTMLInputElement
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    inputUsername = screen.getByPlaceholderText('Username')
    inputPassword = screen.getByPlaceholderText('Password')
  })

  describe('in form, someone', () => {
    it('can input their username in form input', async () => {
      await userEvent.type(inputUsername, 'danggro')
      expect(inputUsername.value).toBe('danggro')
    })

    it('can input their password in form input', async () => {
      await userEvent.type(inputPassword, 'secret')
      expect(inputPassword.value).toBe('secret')
    })
  })
})
