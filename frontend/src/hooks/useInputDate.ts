import { useState } from 'react'
import { setActionError } from 'redux/actions/noteActions'
import { useAppDispatch } from 'redux/store'

const objectError = {
  title: '',
  date: '',
}

const useInputDate = () => {
  const [state, setState] = useState<string>('')
  const dispatch = useAppDispatch()
  const setStateFunction = (
    valueExt: React.SetStateAction<string>,
    e?: React.ChangeEvent<HTMLInputElement>,
    condition?: number
  ) => {
    if (valueExt || !condition || !e) return setState(valueExt)

    let value = e.target.value
    const nextInput = e.target.nextSibling?.nextSibling as HTMLInputElement

    // limit maxlength input
    if (value.length > e.target.maxLength) {
      value = value.slice(0, e.target.maxLength)
    }

    setState(value)

    if (Number(value) > condition || Number(value) === 0) {
      objectError.date = 'Date not valid'
      dispatch(setActionError(objectError))
    } else {
      objectError.date = ''
      dispatch(setActionError(objectError))

      if (value.length === e.target.maxLength && e.target.id !== 'year') {
        nextInput.focus()
      }
    }
  }

  return [state, setStateFunction] as const
}

export default useInputDate
