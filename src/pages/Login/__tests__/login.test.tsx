import { screen } from '@testing-library/react'
import Login from '../index'
import { BrowserRouter } from 'react-router-dom'
import { renderWithProviders } from '../../../utils/test-utils'
import userEvent from '@testing-library/user-event'
import reducer, { setUser } from '../../../reducers/userReducer'
import { CredentialsLogin } from '../../../types/types'
describe('Login page', () => {
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
      {
        preloadedState: {
          user: { username: 'asd', password: 'asd' },
        },
      }
    )
  })

  it('has title, input username, input password, button, & link to signup elements', () => {
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

  describe('in form, someone', () => {
    it('can input their username in form input', async () => {
      const inputUsername = screen.getByPlaceholderText(
        'Username'
      ) as HTMLInputElement

      await userEvent.type(inputUsername, 'danggro')
      expect(inputUsername.value).toBe('danggro')
    })

    it('can input their password in form input', async () => {
      const inputPassword = screen.getByPlaceholderText(
        'Password'
      ) as HTMLInputElement

      await userEvent.type(inputPassword, 'secret')
      expect(inputPassword.value).toBe('secret')
    })
  })

  describe('test the reducer and action', () => {
    it('should return the initial state', async () => {
      expect(reducer(undefined, { type: undefined })).toEqual({
        username: '',
        password: '',
      })
    })

    it('should change user state according to input form', () => {
      const initialState: CredentialsLogin = { username: '', password: '' }
      expect(
        reducer(
          initialState,
          setUser({ username: 'danggro', password: 'secret' })
        )
      ).toEqual({ username: 'danggro', password: 'secret' })
    })
  })
})
