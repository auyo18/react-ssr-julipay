import types from './types'
import {getArticleList} from "../../../api/article"
import {SUCCESS_CODE, BANNER_LENGTH, ARTICLE_LENGTH} from "../../../config"
import {setInfo} from "../../../store/actions"
import {
  setOneRandomArticle,
  setRecommendArticle,
  setPolymerizationArticle
} from "../../../layouts/Side/store/actions"

export const setHome = () => (
  async dispatch => {
    await Promise.all([
      dispatch(setInfo()),
      dispatch(setBannerList()),
      dispatch(setArticleList()),
      dispatch(setOneRandomArticle()),
      dispatch(setRecommendArticle()),
      dispatch(setPolymerizationArticle())
    ])
  }
)

export const setBannerList = (params = {
  rule: 'importance',
  limit: BANNER_LENGTH,
  sort: 1
}) => async dispatch => {
  try {
    const {code, result} = await getArticleList(params)
    if (code === SUCCESS_CODE) {
      dispatch(BANNER_LIST(result))
    }
  } catch (e) {
    console.log(e.message)
  }
}

export const setArticleList = (params = {limit: ARTICLE_LENGTH}, curList) => async dispatch => {
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

export const BANNER_LIST = bannerList => ({
  type: types.SET_BANNER_LIST,
  bannerList
})

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
