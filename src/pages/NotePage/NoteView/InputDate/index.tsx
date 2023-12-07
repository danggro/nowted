import styled from 'styled-components'
import * as palette from '../../../../assets/Variables'
import SVGDate from '../../SVG/SVGDate'
import { useEffect, useState } from 'react'
import InputDay from './InputDay'
import InputMonth from './InputMonth'
import InputYear from './InputYear'

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
  onBlur: (e: React.FocusEvent) => void
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
  }, [date])

  const handleBlurYear = (e: React.FocusEvent) => {
    if (!date && !month && !year) return null
    onBlur(e)
    setDate(`${day}/${month}/${year}`)
  }

  return (
    <InputDateContainer>
      <SVGDate />
      <span>Date</span>
      <div>
        <InputDay day={day} setDay={setDay} />
        <span>/</span>
        <InputMonth month={month} setMonth={setMonth} />
        <span>/</span>
        <InputYear year={year} setYear={setYear} onBlur={handleBlurYear} />
      </div>
    </InputDateContainer>
  )
}

export default InputDate
