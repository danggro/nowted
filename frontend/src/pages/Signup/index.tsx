import ButtonAuth from 'components/auth/ButtonAuth'
import ContainerAuth from 'components/auth/ContainerAuth'
import FormAuth from 'components/auth/FormAuth'
import TitleAuth from 'components/auth/TitleAuth'
import MainAuth from 'components/auth/MainAuth'
import AnotherAuth from 'components/auth/AnotherAuth'
import InputAuth from 'components/auth/InputAuth'
import { useNavigate } from 'react-router'
import { useAppDispatch } from 'redux/store'
import { signUpAction } from 'redux/actions/authActions'
import useInputAuth from 'hooks/useInputAuth'

const Signup = () => {
  const [username, setUsername] = useInputAuth()
  const [email, setEmail] = useInputAuth()
  const [password, setPassword] = useInputAuth()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault()

    const newUser = { username, email, password }
    dispatch(signUpAction(newUser, navigate))
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
            onChange={setUsername}
          />
          <InputAuth
            type="email"
            id="email"
            placeholder="Email"
            name="email"
            value={email}
            onChange={setEmail}
          />
          <InputAuth
            type="password"
            id="password"
            placeholder="Password"
            name="password"
            value={password}
            minlength={8}
            onChange={setPassword}
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
