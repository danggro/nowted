import { render, screen } from '@testing-library/react'
import Register from '../index'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('Register page', () => {
  let inputUsername: HTMLInputElement
  let inputEmail: HTMLInputElement
  let inputPassword: HTMLInputElement
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
    inputUsername = screen.getByPlaceholderText('Username')
    inputEmail = screen.getByPlaceholderText('Email')
    inputPassword = screen.getByPlaceholderText('Password')
  })

  describe('in form, someone can input', () => {
    it('username', async () => {
      await userEvent.type(inputUsername, 'danggro')
      expect(inputUsername).toHaveValue('danggro')
    })
    it('email', async () => {
      await userEvent.type(inputEmail, 'danggro@gmail.com')
      expect(inputEmail).toHaveValue('danggro@gmail.com')
    })
    it('password', async () => {
      await userEvent.type(inputPassword, 'secret')
      expect(inputPassword).toHaveValue('secret')
    })
  })
})
