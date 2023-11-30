import ButtonAuth from '../../components/auth/ButtonAuth'
import ContainerAuth from '../../components/auth/ContainerAuth'
import FormAuth from '../../components/auth/FormAuth'
import TitleAuth from '../../components/auth/TitleAuth'
import InputAuth from '../../components/auth/InputAuth'
import MainAuth from '../../components/auth/MainAuth'
import AnotherAuth from '../../components/auth/AnotherAuth'
const Signup = () => {
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
          />
          <InputAuth type="email" id="email" placeholder="Email" name="email" />
          <InputAuth
            type="password"
            id="password"
            placeholder="Password"
            name="password"
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
