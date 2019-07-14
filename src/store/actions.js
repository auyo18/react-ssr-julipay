import types from './types'
import {getSiteInfo} from "../api/siteInfo"
import {SUCCESS_CODE} from "../config"

export const setSiteInfo = () => (
  async dispatch => {
    const {code, result} = await getSiteInfo()
    if (code === SUCCESS_CODE) {
      dispatch({
        type: types.SET_SITE_INFO,
        siteInfo: result.siteInfo
      })
    }
  }
)
