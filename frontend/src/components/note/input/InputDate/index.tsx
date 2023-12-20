import styled from 'styled-components'
import * as palette from 'assets/Variables'
import SVGDate from '../../svg/SVGDate'
import { useEffect } from 'react'
import Input from './Input'
import ErrorElement from '../ErrorElement'
import useInputDate from 'hooks/useInputDate'

const InputDateContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${palette.TEXT_SECONDARY};
  position: relative;
  & > span {
    margin-left: 20px;
    margin-right: 60px;
  }
`

export const InputDateComponent = styled.input`
  width: 30px;
  padding: 0 2px;
  border-bottom: 2px solid transparent;
  text-align: center;
  &:focus {
    border-bottom: 2px solid ${palette.BLACK_TERTIARY};
  }
  &::placeholder {
    color: ${palette.TEXT_SECONDARY} !important;
    opacity: 1;
  }
`

interface Props {
  date: string
  setDate: React.Dispatch<React.SetStateAction<string>>
}

const InputDate = (props: Props) => {
  const { date, setDate } = props
  const [day, setDay] = useInputDate()
  const [month, setMonth] = useInputDate()
  const [year, setYear] = useInputDate()

  useEffect(() => {
    const dateSplit = date.split('/')
    if (date) {
      setDay(dateSplit[0])
      setMonth(dateSplit[1])
      setYear(dateSplit[2])
    } else {
      setDay('')
      setMonth('')
      setYear('')
    }
  }, [date])

  useEffect(() => {
    setDate(() => {
      if (!day && !month && !year) return ''
      return `${day}/${month}/${year}`
    })
  }, [day, month, year])

  return (
    <InputDateContainer id="date">
      <SVGDate />
      <span>Date</span>
      <div>
        <Input value={day} name="day" onChange={(e) => setDay('', e, 31)} />
        <span>/</span>
        <Input
          value={month}
          name="month"
          onChange={(e) => setMonth('', e, 12)}
        />
        <span>/</span>
        <Input
          value={year}
          name="year"
          onChange={(e) => setYear('', e, new Date().getFullYear())}
        />
      </div>
      <ErrorElement name="date" />
    </InputDateContainer>
  )
}

export default InputDate
