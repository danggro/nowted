import styled from 'styled-components'
import * as palette from '../../../assets/Variables'
import SVGDate from '../SVG/SVGDate'

const InputDateComponent = styled.div`
  display: flex;
  align-items: center;
  color: ${palette.TEXT_SECONDARY};
  input::placeholder {
    color: ${palette.TEXT_SECONDARY} !important;
    opacity: 1;
  }
  span {
    margin-left: 20px;
    margin-right: 60px;
  }
`

interface Props {
  date: string
  setDate: React.Dispatch<React.SetStateAction<string>>
  onBlur: () => void
}

const InputDate = (props: Props) => {
  const { date, setDate, onBlur } = props
  const handleInputDate = (e: React.BaseSyntheticEvent) => {
    let value = e.target.value

    if (value.length > e.target.maxLength) {
      value = value.slice(0, e.target.maxLength)
    }

    if (value.length === 2) {
      if (Number(value) > 31 || Number(value) === 0)
        throw new Error('Value not valid')
      value += '/'
    }

    if (value.length === 5) {
      if (Number(value.slice(3, 5)) > 12 || Number(value.slice(3, 5)) === 0)
        throw new Error('Value not valid')
      value += '/'
    }

    if (
      Number(value.slice(6)) > new Date().getFullYear() ||
      Number(value.slice(6)) === 0
    )
      throw new Error('Value not valid')

    setDate(value)
  }

  return (
    <InputDateComponent>
      <SVGDate />
      <span>Date</span>
      <input
        type="text"
        id="date"
        name="date"
        placeholder="dd/mm/yyyy"
        value={date}
        maxLength={10}
        onKeyDown={(e) => {
          if (isNaN(Number(e.key))) {
            e.preventDefault()
            return false
          }
        }}
        onChange={handleInputDate}
        onBlur={onBlur}
      />
    </InputDateComponent>
  )
}

export default InputDate
