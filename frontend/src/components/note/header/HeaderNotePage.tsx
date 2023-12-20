import styled from 'styled-components'
import logoSrc from 'assets/logo.png'
import * as palette from 'assets/Variables'
import SVGAdd from '../svg/SVGAdd'
import { getLocalSession } from 'utils/utils'
import { useNavigate } from 'react-router'
import { useAppDispatch } from 'redux/store'
import { setNoteAction } from 'redux/actions/noteActions'
import { logoutAction } from 'redux/actions/authActions'

const Header = styled.header`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  position: sticky;
  top: 0;
  background-color: ${palette.BLACK};
  & > div {
    display: flex;
    justify-content: space-between;
  }
`

const Button = styled.button`
  text-align: center;
  display: flex;
  align-items: center;
  padding: 10px;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  border-radius: 3px;
  background-color: ${palette.BLACK_SECONDARY};
  cursor: pointer;
  &:hover {
    background-color: ${palette.BLACK_TERTIARY};
  }
`

const HeaderNotePage = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleLogout = async () => {
    const sessionLocal = getLocalSession()
    if (sessionLocal) {
      dispatch(logoutAction(sessionLocal.accessToken, navigate))
    } else {
      navigate('/login')
    }
  }

  const handleNewNote = async () => {
    dispatch(setNoteAction({ title: '', date: '', content: '', view: true }))
  }

  return (
    <Header>
      <div>
        <img
          src={logoSrc}
          alt="logo-application"
          style={{ width: 'fit-content' }}
        />
        <Button onClick={handleLogout}>Logout</Button>
      </div>
      <Button onClick={handleNewNote}>
        <SVGAdd />
        <span>New Note</span>
      </Button>
    </Header>
  )
}
export default HeaderNotePage
