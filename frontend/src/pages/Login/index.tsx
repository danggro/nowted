import ButtonAuth from 'components/auth/ButtonAuth'
import TitleAuth from 'components/auth/TitleAuth'
import FormAuth from 'components/auth/FormAuth'
import ContainerAuth from 'components/auth/ContainerAuth'
import MainAuth from 'components/auth/MainAuth'
import AnotherAuth from 'components/auth/AnotherAuth'
import React, { useEffect, useState } from 'react'
import InputAuth from 'components/auth/InputAuth'
import {
  getLocalSession,
  handleInputAuth,
  setErrorInputAuth,
} from 'utils/utils'
import { useNavigate } from 'react-router'
import { useUser } from 'hooks/hooks'

const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const navigate = useNavigate()
  const users = useUser()
  const sessionLocal = getLocalSession()

  useEffect(() => {
    if (sessionLocal) return navigate('/')
  }, [])

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    const form = e.currentTarget.children
    const elementUsername = form[0].childNodes[0] as HTMLInputElement
    const elementPassword = form[1].childNodes[0] as HTMLInputElement

    try {
      await users.login({ username, password })
    } catch (err: unknown) {
      const error = err as Error
      console.log(error)

      if (error.message === 'User not found')
        setErrorInputAuth(error.message, elementUsername)
      if (error.message === 'Wrong password')
        setErrorInputAuth(error.message, elementPassword)
      if (error.message === 'Username is missing')
        return setErrorInputAuth(error.message, elementUsername)
      if (error.message === 'Password is missing')
        return setErrorInputAuth(error.message, elementPassword)
    }
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
            onChange={(e) => handleInputAuth(e, setUsername)}
          />
          <InputAuth
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            onChange={(e) => handleInputAuth(e, setPassword)}
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
