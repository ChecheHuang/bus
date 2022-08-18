import { updateStart, updateSuccess, updateError } from './userSlice'
import axios from 'axios'
export const updateUser = async (url, data, dispatch) => {
  dispatch(updateStart())
  try {
    const res = await axios.post(url, data)
    dispatch(updateSuccess(res.data))
  } catch (err) {
    dispatch(updateError())
  }
}
