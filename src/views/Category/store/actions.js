import types from './types'
import {setInfo} from "../../../store/actions"
import {setSideData} from "../../../layouts/Side/store/actions"
import {ARTICLE_LENGTH, SUCCESS_CODE} from "../../../config"
import {getArticleList} from "../../../api/article"

export const setCategory = (store, path) => async dispatch => {
  await dispatch(setInfo())
  let category = 0
  const ary = path.split('/')
  const name = ary[ary.length - 1]
  const categoryList = store.getState().common.categoryList
  const currentCategory = categoryList.filter(item => (
    item.slug === name
  ))
  if (currentCategory.length) {
    category = currentCategory[0]._id
  }
  await dispatch(setArticleList({category, limit: ARTICLE_LENGTH}, [], store))
  await dispatch(setSideData())
}

export const setArticleList = (params, curList) => async dispatch => {
  try {
    let {code, data: list, total} = await getArticleList(params)
    if (params.page > 1) {
      // 加载更多
      list = [...curList, ...list]
    }
    if (code === SUCCESS_CODE) {
      dispatch(ARTICLE_LIST(list))
      dispatch(ARTICLE_TOTAL(total))
    }
  } catch (e) {
    console.log(e.message)
  }
}

export const ARTICLE_LIST = articleList => ({
  type: types.SET_ARTICLE_LIST,
  articleList
})

export const ARTICLE_TOTAL = total => ({
  type: types.SET_ARTICLE_TOTAL,
  total
})

export const CURRENT_PAGE = currentPage => ({
  type: types.SET_CURRENT_PAGE,
  currentPage
})
