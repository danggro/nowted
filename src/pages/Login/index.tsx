import ButtonAuth from '../../components/auth/ButtonAuth'
import TitleAuth from '../../components/auth/TitleAuth'
import FormAuth from '../../components/auth/FormAuth'
import InputAuth from '../../components/auth/InputAuth'
import ContainerAuth from '../../components/auth/ContainerAuth'
import MainAuth from '../../components/auth/MainAuth'
import AnotherAuth from '../../components/auth/AnotherAuth'

const Login = () => {
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
          />
          <InputAuth
            type="password"
            id="password"
            placeholder="Password"
            name="password"
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
