import { render, screen } from '@testing-library/react'
import App from './App'

it("check if there's word Hello", () => {
  render(<App />)
  const myElem = screen.getByText('Hello')
  expect(myElem).toBeInTheDocument()
})
