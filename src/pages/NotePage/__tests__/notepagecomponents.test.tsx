import { render, screen } from '@testing-library/react'
import HeaderNotePage from '../HeaderNotePage'
import logoSrc from 'assets/logo.png'

describe('Header components Note Page', () => {
  it('should render logo application', () => {
    render(<HeaderNotePage />)
    const logo = screen.getByAltText('logo-application')

    expect(logo.getAttribute('src')).toEqual(logoSrc)
  })

  it('should render button to add new note', () => {
    render(<HeaderNotePage />)
    const button = screen.getByText('New Note')

    expect(button).toBeInTheDocument()
  })
})
