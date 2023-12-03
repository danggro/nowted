import { render, screen } from '@testing-library/react'
import Register from '../index'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

describe('Register page', () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
  })
  it('has title, input username, input email, input password, button, & link to login elements', () => {
    const signupText = screen.getAllByText(/signup/i)
    const title = signupText[0]
    const button = signupText[1]
    const inputUsername = screen.getByPlaceholderText(/username/i)
    const inputEmail = screen.getByPlaceholderText(/email/i)
    const inputPassword = screen.getByPlaceholderText(/password/i)
    const login = screen.getByText(/Login/i)

    expect(title).toBeInTheDocument()
    expect(inputUsername).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(login).toBeInTheDocument()
  })

  describe('in form, someone', () => {
    it('can input username in form', async () => {
      const inputUsername = screen.getByPlaceholderText('Username')

      await userEvent.type(inputUsername, 'danggro')
      expect(inputUsername).toHaveValue('danggro')
    })
    it('can input email in form', async () => {
      const inputEmail = screen.getByPlaceholderText(/email/i)

      await userEvent.type(inputEmail, 'danggro@gmail.com')
      expect(inputEmail).toHaveValue('danggro@gmail.com')
    })
    it('can input password in form', async () => {
      const inputPassword = screen.getByPlaceholderText(/password/i)

      await userEvent.type(inputPassword, 'secret')
      expect(inputPassword).toHaveValue('secret')
    })
  })
})
