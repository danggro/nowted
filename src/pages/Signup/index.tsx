import ButtonAuth from '../../components/auth/ButtonAuth'
import ContainerAuth from '../../components/auth/ContainerAuth'
import FormAuth from '../../components/auth/FormAuth'
import TitleAuth from '../../components/auth/TitleAuth'
import MainAuth from '../../components/auth/MainAuth'
import AnotherAuth from '../../components/auth/AnotherAuth'
import { useState } from 'react'
import InputAuth from '../../components/auth/InputAuth'
const Signup = () => {
  const [username, setUsername] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [email, setEmail] = useState<string>('')

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault()
    console.log(username, password)
  }

  return (
    <MainAuth page="signup">
      <ContainerAuth>
        <TitleAuth title="Signup" someText="Just some details to get you in!" />
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
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            setState={setEmail}
          />
          <InputAuth
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            setState={setPassword}
          />
          <ButtonAuth page="signup" onClick={handleSubmit}>
            Signup
          </ButtonAuth>
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
