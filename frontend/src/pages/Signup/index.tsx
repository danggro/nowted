import ButtonAuth from 'components/auth/ButtonAuth'
import ContainerAuth from 'components/auth/ContainerAuth'
import FormAuth from 'components/auth/FormAuth'
import TitleAuth from 'components/auth/TitleAuth'
import MainAuth from 'components/auth/MainAuth'
import AnotherAuth from 'components/auth/AnotherAuth'
import { useState } from 'react'
import InputAuth from 'components/auth/InputAuth'
import { handleInputAuth, setErrorInputAuth } from 'utils/utils'
import { useNavigate } from 'react-router'
import { useUser } from 'hooks'

const Signup = () => {
  const [username, setUsername] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const users = useUser()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const form = e.currentTarget.children
    const elementUsername = form[0].childNodes[0] as HTMLInputElement
    const elementEmail = form[1].childNodes[0] as HTMLInputElement
    const elementPassword = form[2].childNodes[0] as HTMLInputElement

    try {
      await users.add({ username, email, password })
      navigate('/login')
    } catch (err: unknown) {
      const error = err as Error
      if (error.message === 'User not available')
        return setErrorInputAuth(error.message, elementUsername)
      if (error.message === 'Email not available')
        return setErrorInputAuth(error.message, elementEmail)
      if (error.message === 'Username is missing')
        return setErrorInputAuth(error.message, elementUsername)
      if (error.message === 'Email is missing')
        return setErrorInputAuth(error.message, elementEmail)
      if (error.message === 'Password is missing')
        return setErrorInputAuth(error.message, elementPassword)
      if (error.message === 'Minimum 8 character')
        return setErrorInputAuth(error.message, elementPassword)
    }
  }

  return (
    <MainAuth page="signup">
      <ContainerAuth>
        <TitleAuth title="Signup" someText="Just some details to get you in!" />
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
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => handleInputAuth(e, setEmail)}
          />
          <InputAuth
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            minlength={8}
            onChange={(e) => handleInputAuth(e, setPassword)}
          />
          <ButtonAuth page="signup">Signup</ButtonAuth>
          <AnotherAuth
            someText="Already Registered ?"
            to="/login"
            textTo="Login"
            page="signup"
          />
        </FormAuth>
      </ContainerAuth>
    </MainAuth>
  )
}
export default Signup
