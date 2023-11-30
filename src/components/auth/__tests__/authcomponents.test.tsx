import { render, screen } from '@testing-library/react'
import TitleAuth from '../TitleAuth'
import InputAuth from '../InputAuth'
import ButtonAuth from '../ButtonAuth'
import AnotherAuth from '../AnotherAuth'
import { BrowserRouter } from 'react-router-dom'

describe('Authorization Components', () => {
  it('should render title', () => {
    render(<TitleAuth title="Login" someText="Just some text" />)
    const title = screen.getByText('Login')
    const someText = screen.getByText('Just some text')
    expect(title).toBeInTheDocument()
    expect(someText).toBeInTheDocument()
  })

  it('should render input form', () => {
    render(
      <InputAuth
        type="text"
        placeholder="Username"
        id="username"
        name="username"
      />
    )
    const placeholder = screen.getByPlaceholderText('Username')
    expect(placeholder).toBeInTheDocument()
  })

  it('should render button auth', () => {
    render(<ButtonAuth page="login">Login</ButtonAuth>)
    const button = screen.getByText('Login')
    expect(button).toBeInTheDocument()
  })

  it('should render link to another auth', () => {
    render(
      <BrowserRouter>
        <AnotherAuth
          someText="Don't have account?"
          to="/signup"
          textTo="Signup"
          page="login"
        />
      </BrowserRouter>
    )
    const link = screen.getByText('Signup')
    expect(link).toBeInTheDocument()
  })
})
