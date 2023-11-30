import { Link } from 'react-router-dom'
import './style.css'
const Login = () => {
  return (
    <main>
      <div>
        <div>
          <h1>Login</h1>
          <span>Glad you&apos;re back!</span>
        </div>
        <form>
          <input
            type="text"
            id="username"
            placeholder="Username"
            name="username"
          />
          <input
            type="text"
            id="password"
            placeholder="Password"
            name="password"
          />
          <button type="submit">Login</button>
          <span>
            Don&apos;t have an account ? <Link to={'#'}>Signup</Link>
          </span>
        </form>
      </div>
    </main>
  )
}
export default Login
