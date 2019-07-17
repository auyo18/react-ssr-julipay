import types from './types'
import {setInfo} from "../../../store/actions"
import {
  setOneRandomArticle,
  setPolymerizationArticle,
  setRecommendArticle
} from "../../../layouts/Side/store/actions"
import {ARTICLE_LENGTH, SUCCESS_CODE} from "../../../config"
import {getArticleList} from "../../../api/article"

export const setCategory = (store, path) => async dispatch => {
  await dispatch(setInfo())
  let category = 0
  const categoryInfo = store.getState().common.categoryInfo
  const currentCategory = categoryInfo.filter(item => (
    item.slug === path.replace('/', '')
  ))
  if (currentCategory.length) {
    category = currentCategory[0]._id
  }
  await Promise.all([
    dispatch(setArticleList({category, limit: ARTICLE_LENGTH}, [], store)),
    dispatch(setOneRandomArticle()),
    dispatch(setRecommendArticle()),
    dispatch(setPolymerizationArticle())
  ])
}

export const setArticleList = (params, curList) => async dispatch => {
  try {
    let {code, result: list, total} = await getArticleList(params)
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
