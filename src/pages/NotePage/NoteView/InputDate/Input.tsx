import { InputDateComponent } from '.'
import { preventPressNumber } from '../../../../utils/utils'

interface Props {
  value: string
  name: string
  onBlur: (e: React.FocusEvent) => void
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const Input = (props: Props) => {
  const { value, name, onBlur, onChange } = props
  const style = {
    width: name !== 'day' && name === 'month' ? '35px' : '40px',
  }
  return (
    <InputDateComponent
      style={style}
      type="text"
      id={`${name}`}
      name={`${name}`}
      placeholder={name === 'day' ? 'dd' : name === 'month' ? 'mm' : 'yyyy'}
      value={value}
      maxLength={name === 'day' || name === 'month' ? 2 : 4}
      onKeyDown={preventPressNumber}
      onChange={onChange}
      onBlur={onBlur}
      onFocus={(e) => e.target.select()}
    />
  )
}

export default Input
