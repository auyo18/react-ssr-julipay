import types from './types'
import {setInfo} from "../../../store/actions"
import {getArticle} from "../../../api/article"
import {SUCCESS_CODE} from "../../../config"
import {setSideData} from "../../../layouts/Side/store/actions"

export const setArticle = (path) => async dispatch => {
  const ary = path.split('/')
  const _id = ary[ary.length - 1]
  await dispatch(setInfo())
  await dispatch(setArticleContent({_id}))
  await dispatch(setSideData())

}

export const setArticleContent = params => async dispatch => {
  try {
    const {code, data} = await getArticle(params)
    if (code === SUCCESS_CODE) {
      dispatch(ARTICLE_CONTENT(data))
      dispatch(ARTICLE_NOT_FOUND(false))
    } else {
      dispatch(ARTICLE_NOT_FOUND(true))
    }
  } catch (e) {
    dispatch(ARTICLE_NOT_FOUND(true))
    console.log(e.message)
  }
}

export const ARTICLE_CONTENT = articleContent => ({
  type: types.SET_ARTICLE_CONTENT,
  articleContent
})

export const ARTICLE_NOT_FOUND = articleNotFound => ({
  type: types.SET_ARTICLE_NOT_FOUND,
  articleNotFound
})
