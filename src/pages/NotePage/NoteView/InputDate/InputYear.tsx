import React from 'react'
import { InputDateComponent } from '.'
import { handleInputDate, preventPressNumber } from '../../../../utils/utils'

interface Props {
  year: string
  setYear: React.Dispatch<React.SetStateAction<string>>
  onBlur: (e: React.FocusEvent) => void
}

const InputYear = (props: Props) => {
  const { year, setYear, onBlur } = props

  return (
    <InputDateComponent
      style={{ width: '45px' }}
      type="text"
      id="year"
      name="year"
      placeholder="yyyy"
      value={year}
      maxLength={4}
      onKeyDown={preventPressNumber}
      onChange={(e) => handleInputDate(e, setYear, new Date().getFullYear())}
      onBlur={onBlur}
    />
  )
}

export default InputYear
