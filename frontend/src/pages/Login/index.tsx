import ButtonAuth from 'components/auth/ButtonAuth'
import TitleAuth from 'components/auth/TitleAuth'
import FormAuth from 'components/auth/FormAuth'
import ContainerAuth from 'components/auth/ContainerAuth'
import MainAuth from 'components/auth/MainAuth'
import AnotherAuth from 'components/auth/AnotherAuth'
import React, { useEffect } from 'react'
import InputAuth from 'components/auth/InputAuth'
import { getLocalSession } from 'utils/utils'
import { useNavigate } from 'react-router'
import { useAppDispatch } from 'redux/store'
import { signInAction } from 'redux/actions/authActions'
import useInputAuth from 'hooks/useInputAuth'

const Login = () => {
  const [username, setUsername] = useInputAuth()
  const [password, setPassword] = useInputAuth()
  const navigate = useNavigate()

  const sessionLocal = getLocalSession()

  const dispatch = useAppDispatch()

  useEffect(() => {
    if (sessionLocal) return navigate('/')
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    dispatch(signInAction({ username, password }, navigate))
  }

  if (sessionLocal) return null

  return (
    <MainAuth page="login">
      <ContainerAuth>
        <TitleAuth title="Login" someText="Glad you're back!" />
        <FormAuth onSubmit={handleSubmit}>
          <InputAuth
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            value={username}
            onChange={setUsername}
          />
          <InputAuth
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={setPassword}
            minlength={8}
          />
          <ButtonAuth page="login">Login</ButtonAuth>
          <AnotherAuth
            someText="Don't have an account ?"
            to="/signup"
            textTo="Signup"
            page="login"
          />
        </FormAuth>
      </ContainerAuth>
    </MainAuth>
  )
}
export default Login
