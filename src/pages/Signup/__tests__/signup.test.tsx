import { render, screen } from '@testing-library/react'
import Register from '../index'
import { BrowserRouter } from 'react-router-dom'

describe('Register page', () => {
  it('has title, input username, input email, input password, button, & link to login elements', () => {
    render(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
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
})
