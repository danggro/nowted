import { render, screen } from '@testing-library/react'
import HeaderNotePage from '../HeaderNotePage'
import logoSrc from 'assets/logo.png'
import { Note } from 'types/types'
import ListNoteItem from '../ListNoteItem'
import axios from 'axios'
import ListNote from '../ListNote'

const urlServer = 'http://localhost:3002/api'

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

  it('should render a note from server', async () => {
    const { data }: { data: Note } = await axios.get(urlServer + '/notes/1')
    render(
      <ListNoteItem
        title={data.title}
        date={data.date}
        content={data.content}
      />
    )
    const title = screen.getByText('night aline')
    const date = screen.getByText('112233')
    const content = screen.getByText('I always spent all night long alone')
    expect(title).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })

  it('should render list of note from server', async () => {
    const { data }: { data: Note[] } = await axios.get(urlServer + '/notes')
    render(<ListNote data={data} />)
    const title = document.getElementsByTagName('h1')
    expect(title.length).toBeGreaterThanOrEqual(0)
  })
})
