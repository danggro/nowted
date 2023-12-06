import ButtonAuth from '../../components/auth/ButtonAuth'
import ContainerAuth from '../../components/auth/ContainerAuth'
import FormAuth from '../../components/auth/FormAuth'
import TitleAuth from '../../components/auth/TitleAuth'
import MainAuth from '../../components/auth/MainAuth'
import AnotherAuth from '../../components/auth/AnotherAuth'
import { useState } from 'react'
import InputAuth from '../../components/auth/InputAuth'
import { handleChange, setErrorInput, userUtil } from '../../utils/utils'
import { useNavigate } from 'react-router'

const Signup = () => {
  const [username, setUsername] = useState<string>('digran')
  const [email, setEmail] = useState<string>('digran@gmail.com')
  const [password, setPassword] = useState<string>('12345678')
  const users = userUtil()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const form = e.currentTarget.children
    const elementUsername = form[0].childNodes[0] as HTMLInputElement
    const elementEmail = form[1].childNodes[0] as HTMLInputElement

    try {
      await users.add({ username, email, password })
      navigate('/login')
    } catch (err: unknown) {
      const error = err as Error
      if (error.message === 'User not available')
        return setErrorInput(error.message, elementUsername)
      if (error.message === 'Email not available')
        return setErrorInput(error.message, elementEmail)
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
            onChange={(e) => handleChange(e, setUsername)}
          />
          <InputAuth
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={(e) => handleChange(e, setEmail)}
          />
          <InputAuth
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            minlength={8}
            onChange={(e) => handleChange(e, setPassword)}
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
