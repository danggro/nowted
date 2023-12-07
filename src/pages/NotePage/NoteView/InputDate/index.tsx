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
  onBlur: () => void
}

const InputDate = (props: Props) => {
  const { date, setDate, onBlur } = props
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
    console.log(date)
  }, [date])

  const handleOnBlur = async () => {
    if (!date || !month || !year) return null
    onBlur()
  }

  return (
    <InputDateContainer id="date">
      <SVGDate />
      <span>Date</span>
      <div>
        <Input
          value={day}
          name="day"
          onBlur={handleOnBlur}
          onChange={(e) => handleInputDate(e, 31, setDate)}
        />
        <span>/</span>
        <Input
          value={month}
          name="month"
          onBlur={handleOnBlur}
          onChange={(e) => handleInputDate(e, 12, setDate)}
        />
        <span>/</span>
        <Input
          value={year}
          name="year"
          onBlur={handleOnBlur}
          onChange={(e) =>
            handleInputDate(e, new Date().getFullYear(), setDate)
          }
        />
      </div>
    </InputDateContainer>
  )
}

export default InputDate
