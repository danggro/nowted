import styled from 'styled-components'
import * as palette from '../../../../assets/Variables'
import SVGDate from '../../SVG/SVGDate'
import { useContext, useEffect, useState } from 'react'
import { NoteContext } from '../../../../context/NoteContext'
import Input from './Input'
import { handleInputDate } from '../../../../utils/utils'

const InputDateContainer = styled.div`
  display: flex;
  align-items: center;
  color: ${palette.TEXT_SECONDARY};
  position: relative;
  & > div::after {
    content: 'Value not valid';
    color: ${palette.RED};
    position: absolute;
    bottom: -25px;
    left: 127px;
    opacity: var(--opacityErrNote, 0);
  }
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
  const [day, setDay] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [year, setYear] = useState<string>('')

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
    setDate(`${day}/${month}/${year}`)
  }, [day, month, year])

  return (
    <InputDateContainer id="date">
      <SVGDate />
      <span>Date</span>
      <div>
        <Input
          value={day}
          name="day"
          onChange={(e) => handleInputDate(e, 31, setDay)}
        />
        <span>/</span>
        <Input
          value={month}
          name="month"
          onChange={(e) => handleInputDate(e, 12, setMonth)}
        />
        <span>/</span>
        <Input
          value={year}
          name="year"
          onChange={(e) =>
            handleInputDate(e, new Date().getFullYear(), setYear)
          }
        />
      </div>
    </InputDateContainer>
  )
}

export default InputDate
