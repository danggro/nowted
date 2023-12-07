import { InputDateComponent } from '.'
import { handleInputDate, preventPressNumber } from '../../../../utils/utils'

interface Props {
  day: string
  setDay: React.Dispatch<React.SetStateAction<string>>
}

const InputDay = (props: Props) => {
  const { day, setDay } = props

  return (
    <InputDateComponent
      type="text"
      id="day"
      name="day"
      placeholder="dd"
      value={day}
      maxLength={2}
      onKeyDown={preventPressNumber}
      onChange={(e) => handleInputDate(e, setDay, 31)}
    />
  )
}

export default InputDay
