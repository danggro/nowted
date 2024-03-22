import { useDispatch } from 'react-redux'
import * as api from 'redux/api/folderAPI'
import { ActionType } from 'redux/constants/folderConstants'
import { useAppSelector } from 'redux/store'

const useAddOtherFolder = () => {
  const dispatch = useDispatch()
  const otherFolder = useAppSelector(
    (state) =>
      state.folder.folders.filter((folder) => folder.name === 'Other')[0]
  )

  const addOtherFolder = async (): Promise<number> => {
    if (!!otherFolder) return otherFolder.id
    const { data, error } = await api.addFolder({ name: 'Other' })
    if (!data) return 0

    dispatch({ type: ActionType.ADD_FOLDER, payload: data })
    dispatch({ type: ActionType.SELECT_FOLDER, payload: data.id })
    return data.id
  }

  return { addOtherFolder }
}

export default useAddOtherFolder
