import types from './types'
import {getSiteInfo} from '../api/siteInfo'
import {SUCCESS_CODE} from '../config'

export const setInfo = () => (
  async dispatch => {
    try {
      const {code, result} = await getSiteInfo()
      if (code === SUCCESS_CODE) {
        dispatch(SITE_INFO(result.siteInfo))
        dispatch(CATEGORY_INFO(result.categoryInfo))
      }
    } catch (e) {
      console.log(e.message)
    }
  }
)

export const SITE_INFO = siteInfo => ({
  type: types.SET_SITE_INFO,
  siteInfo
})

export const CATEGORY_INFO = categoryInfo => ({
  type: types.SET_CATEGORY_INFO,
  categoryInfo
})
