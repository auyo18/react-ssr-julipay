import {setInfo} from "../../../store/actions"

export const setCategory = () => async dispatch => {
  await Promise.all([
    dispatch(setInfo())
  ])
}
