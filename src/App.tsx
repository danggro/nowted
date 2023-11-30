import './assets/styles.css'
import Home from './pages/Home'
import image from './assets/image.jpg'
const App = () => {
  return (
    <>
      <h1>Hello</h1>
      <img src={image} alt="example" />
      <Home />
    </>
  )
}
export default App
