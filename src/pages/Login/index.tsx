import ButtonAuth from '../../components/auth/ButtonAuth'
import TitleAuth from '../../components/auth/TitleAuth'
import FormAuth from '../../components/auth/FormAuth'
import ContainerAuth from '../../components/auth/ContainerAuth'
import MainAuth from '../../components/auth/MainAuth'
import AnotherAuth from '../../components/auth/AnotherAuth'
import React, { useState } from 'react'
// import { handleLogin } from '../../reducers/userReducer'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import InputAuth from '../../components/auth/InputAuth'

const Login = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const dispatch = useAppDispatch()
  const selector = useAppSelector((state) => state.user)

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()
    // dispatch(handleLogin({ username, password }))
    console.log(selector)
  }

  return (
    <MainAuth page="login">
      <ContainerAuth>
        <TitleAuth title="Login" someText="Glad you're back!" />
        <FormAuth>
          <InputAuth
            type="text"
            id="username"
            placeholder="Username"
            name="username"
            value={username}
            setState={setUsername}
          />
          <InputAuth
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            setState={setPassword}
          />
          <ButtonAuth page="login" onClick={handleSubmit}>
            Login
          </ButtonAuth>
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
