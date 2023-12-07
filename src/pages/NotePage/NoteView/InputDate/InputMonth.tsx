import { InputDateComponent } from '.'
import { handleInputDate, preventPressNumber } from '../../../../utils/utils'

interface Props {
  month: string
  setMonth: React.Dispatch<React.SetStateAction<string>>
}

const InputMonth = (props: Props) => {
  const { month, setMonth } = props

  return (
    <InputDateComponent
      style={{ width: '35px' }}
      type="text"
      id="month"
      name="month"
      placeholder="mm"
      value={month}
      maxLength={2}
      onKeyDown={preventPressNumber}
      onChange={(e) => handleInputDate(e, setMonth, 12)}
    />
  )
}

export default InputMonth
