import types from './types'
import {setInfo} from '../../../store/actions'
import {setSideData} from '../../../layouts/Side/store/actions'
import {ARTICLE_LENGTH, SUCCESS_CODE} from '../../../config'
import {getArticleList} from '../../../api/article'

export const setTag = path => async dispatch => {
  const ary = path.split('/')
  const name = decodeURI(ary[2])
  await dispatch(setInfo())
  await dispatch(setArticleList({keyword: name, limit: ARTICLE_LENGTH}))
  await dispatch(setSideData())
}

export const setArticleList = (params, curList = []) => async dispatch => {
  let {code, data: list, total} = await getArticleList(params)
  if (params.page > 1) {
    // 加载更多
    list = [...curList, ...list]
  }
  if (code === SUCCESS_CODE) {
    dispatch(ARTICLE_LIST(list))
    dispatch(ARTICLE_TOTAL(total))
    dispatch(TAG_NAME(params.keyword))
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

export const TAG_NAME = name => ({
  type: types.SET_TAG_NAME,
  name
})
