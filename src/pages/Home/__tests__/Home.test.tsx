import { render, screen } from '@testing-library/react'
import Home from '../index'

it("check if there's  This is Home", () => {
  render(<Home />)
  const myElem = screen.getByText('This is Home')
  expect(myElem).toBeInTheDocument()
})
