import { screen } from '@testing-library/react'
import Login from '../index'
import { BrowserRouter } from 'react-router-dom'
import { renderWithProviders } from '../../../utils/test-utils'
import userEvent from '@testing-library/user-event'
import reducer, { handleLogin, setUser } from '../../../reducers/userReducer'
import { useAppDispatch } from '../../../hooks/hooks'
import auth from '../../../services/auth'

describe('Login page', () => {
  let inputUsername: HTMLInputElement
  let inputPassword: HTMLInputElement
  beforeEach(() => {
    renderWithProviders(
      <BrowserRouter>
        <Login />
      </BrowserRouter>,
      {
        preloadedState: {
          user: { username: '', token: '' },
        },
      }
    )
    inputUsername = screen.getByPlaceholderText('Username')
    inputPassword = screen.getByPlaceholderText('Password')
  })

  it('has title, input username, input password, button, & link to signup elements', () => {
    const loginText = screen.getAllByText(/login/i)
    const title = loginText[0]
    const button = loginText[1]
    const signup = screen.getByText(/signup/i)

    expect(title).toBeInTheDocument()
    expect(inputUsername).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()
    expect(button).toBeInTheDocument()
    expect(signup).toBeInTheDocument()
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

  describe('test the reducer and action', () => {
    it('should return the initial state', async () => {
      expect(reducer(undefined, { type: undefined })).toEqual({
        username: '',
        password: '',
      })
    })

    // it('should change user state according to input form', () => {
    //   const initialState: CredentialsLogin = { username: '', password: '' }
    //   expect(
    //     reducer(
    //       initialState,
    //       setUser({ username: 'danggro', token: 'secret' })
    //     )
    //   ).toEqual({ username: 'danggro', password: 'secret' })
    // })

    it.skip('should handle login to set user state and save session to local storage browser', async () => {
      const dispatch = useAppDispatch()
      const login = await dispatch(
        handleLogin({ username: 'danggro', password: 'secret' })
      )
      expect(login).toEqual({
        username: 'danggro',
        password: 'secret',
      })
    })
  })

  describe('error will appear when someone fill in form if', () => {
    it.skip('input blank', async () => {
      await userEvent.type(inputUsername, 'danggro')
      await userEvent.clear(inputUsername)

      const errorElement = screen.getByText('Please fill this input form')
      expect(errorElement).toBeVisible()
    })
    it.skip('input password less than 8 character', async () => {
      await userEvent.type(inputPassword, '123')
      const element = inputPassword.parentElement

      expect(element).toEqual('Minimum 8 character')
    })
  })

  describe.only('when someone submit form', () => {
    beforeEach(async () => {
      await auth.login({ username: 'danggro', password: '12345678' })
    })
    afterEach(async () => {
      await auth.logout('1')
    })
    it.skip('the page should directed to main page', async () => {
      expect(inputUsername).not.toBeInTheDocument()
    })
    it.skip('session saved to local storage', () => {
      const session = window.localStorage.getItem('loggedUser')

      expect(session).not.toBeNull()
    })
    it.skip('session saved to database', async () => {
      const session = await auth.getSession(inputUsername.value)
      expect(session.length).toBeGreaterThan(0)
    })
    it.todo('will error if username not found')
    it.todo('will error if password not match')
  })
})
