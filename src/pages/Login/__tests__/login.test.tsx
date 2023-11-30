import { render, screen } from '@testing-library/react'
import Login from '../index'
import { BrowserRouter } from 'react-router-dom'

describe('Login page', () => {
  it('has title, input username, input password, button, & link to signup elements', () => {
    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )
    const loginText = screen.getAllByText(/login/i)
    const title = loginText[0]
    const button = loginText[1]
    const inputUsername = screen.getByPlaceholderText(/username/i)
    const inputPassword = screen.getByPlaceholderText(/password/i)
    const signup = screen.getByText(/signup/i)

    expect(title).toBeInTheDocument()
    expect(inputUsername).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(signup).toBeInTheDocument()
  })
})
