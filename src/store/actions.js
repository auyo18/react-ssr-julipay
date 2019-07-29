import types from './types'
import {getSiteInfo} from '../api/site'
import {getCategory} from "../api/category"
import {SUCCESS_CODE} from '../config'

export const setInfo = () => (
  async dispatch => {
    try {
      const {code, data} = await getSiteInfo()
      if (code === SUCCESS_CODE) {
        dispatch(SITE_INFO(data))
      }
    } catch (e) {
      console.log(e.message)
    }
    try {
      const {code, data} = await getCategory()
      if (code === SUCCESS_CODE) {
        dispatch(CATEGORY_INFO(data))
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

export const CATEGORY_INFO = categoryList => ({
  type: types.SET_CATEGORY_LIST,
  categoryList
})
