import {setInfo} from "../../../store/actions"

export const setNotFound = () => async dispatch => {
  await dispatch(setInfo())
}
