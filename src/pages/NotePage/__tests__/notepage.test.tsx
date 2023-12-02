import { render, screen } from '@testing-library/react'
import NotePage from '../index'
import logoSrc from 'assets/logo.png'
import axios from 'axios'
import { NoteType } from 'types/types'
import Note from '../ListNoteItem'
import ListNote from '../ListNote'

const urlServer = 'http://localhost:3001/api'

describe('Note Page', () => {
  beforeEach(() => {
    render(<NotePage />)
  })
  it('should render logo applicaiton', () => {
    const logo = screen.getByAltText('logo-application')

    expect(logo.getAttribute('src')).toEqual(logoSrc)
  })

  it('should render button add note', () => {
    const button = screen.getByText('New Note')

    expect(button).toBeInTheDocument
  })

  it('should render form input for make a new note', () => {
    const inputTitle = screen.getByPlaceholderText('Title')
    const inputDate = screen.getByPlaceholderText('Date')
    const inputContent = screen.getByPlaceholderText('Type your note here')

    expect(inputTitle).toBeInTheDocument()
    expect(inputDate).toBeInTheDocument()
    expect(inputContent).toBeInTheDocument()
  })
})

describe('When integrated with server Note Page', () => {
  it('should render a note from server', async () => {
    const { data }: { data: NoteType } = await axios.get(urlServer + '/notes/1')
    render(<Note title={data.title} date={data.date} content={data.content} />)
    const title = screen.getByText('night aline')
    const date = screen.getByText('112233')
    const content = screen.getByText('I always spent all night long alone')
    expect(title).toBeInTheDocument()
    expect(date).toBeInTheDocument()
    expect(content).toBeInTheDocument()
  })

  it('should render list of note from server', async () => {
    const { data }: { data: NoteType[] } = await axios.get(urlServer + '/notes')
    render(<ListNote data={data} />)
    const title = document.getElementsByTagName('h1')
    expect(title.length).toBeGreaterThanOrEqual(0)
  })
})
