import { render, screen } from '@testing-library/react'
import Register from '../index'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'
import { renderWithProviders } from '../../../utils/test-utils'
import users from '../../../services/users'

describe('Register page', () => {
  let inputUsername: HTMLInputElement
  let inputEmail: HTMLInputElement
  let inputPassword: HTMLInputElement
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <Register />
      </BrowserRouter>
    )
    inputUsername = screen.getByPlaceholderText('Username')
    inputEmail = screen.getByPlaceholderText('Email')
    inputPassword = screen.getByPlaceholderText('Password')
  })
  it('has title, input username, input email, input password, button, & link to login elements', () => {
    const signupText = screen.getAllByText(/signup/i)
    const title = signupText[0]
    const button = signupText[1]

    const login = screen.getByText(/Login/i)

    expect(title).toBeInTheDocument()
    expect(inputUsername).toBeInTheDocument()
    expect(inputEmail).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(login).toBeInTheDocument()
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
    describe('but will error', () => {
      it.skip('if email not match with pattern', async () => {
        await userEvent.type(inputUsername, 'dang123.com')

        console.log(inputUsername.checkValidity())
      })
      it.todo('if password character less than 8')
    })
  })

  describe.only('when someone submit form', () => {
    it('new user created in database', async () => {
      const { data } = await users.add({
        username: 'digran',
        email: 'digran@gmail.com',
        password: '12345678',
      })

      const getUsers = await users.getAll()
      const dataUser = getUsers.data.find(
        (user) => user.username === data.username
      )
      expect(data).toEqual(dataUser)
    })
    it.todo('if success page will navigate to login page')
    it.todo('will error if username not available')
    it.todo('will error if email not available')
  })
})
