import { Folder, FolderForm } from 'types/types'
import { API, handleApiError, setConfig } from './utils'
import { getLocalSession } from 'utils/utils'

export const getFolder = async () => {
  const session = getLocalSession()
  try {
    const res = await API.get<Folder[]>(
      '/folder',
      setConfig(session?.accessToken)
    )
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}

export const addFolder = async (folder: FolderForm) => {
  const session = getLocalSession()
  try {
    const res = await API.post<Folder>(
      '/folder',
      folder,
      setConfig(session?.accessToken)
    )
    return { error: null, data: res.data }
  } catch (error) {
    return handleApiError(error)
  }
}
