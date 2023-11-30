import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
      <h1 style={{ fontSize: '150px' }}>This is Home</h1>
      <Link to="/login">login</Link>
    </>
  )
}
export default Home
