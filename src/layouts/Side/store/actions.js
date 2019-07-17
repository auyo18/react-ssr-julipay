import types from './types'
import {getRandomArticle} from "../../../api/article"
import {SUCCESS_CODE} from "../../../config"

export const setOneRandomArticle = (params = {limit: 1}) => async dispatch => {
  try {
    let {code, result} = await getRandomArticle(params)
    if (code === SUCCESS_CODE) {
      dispatch(ONE_RANDOM_ARTICLE(result))
    }
  } catch (e) {
    console.log(e)
  }
}

export const setRecommendArticle = (params = {limit: 10}) => async dispatch => {
  try {
    let {code, result} = await getRandomArticle(params)
    if (code === SUCCESS_CODE) {
      dispatch(RECOMMEND_ARTICLE(result))
    }
  } catch (e) {
    console.log(e)
  }
}

export const setPolymerizationArticle = (params = {limit: 5}) => async dispatch => {
  try {
    let {code, result} = await getRandomArticle(params)
    if (code === SUCCESS_CODE) {
      dispatch(POLYMERIZATION_ARTICLE(result))
    }
  } catch (e) {
    console.log(e)
  }
}

export const ONE_RANDOM_ARTICLE = oneRandomArticle => ({
  type: types.SET_ONE_RANDOM_ARTICLE,
  oneRandomArticle
})

export const RECOMMEND_ARTICLE = recommendList => ({
  type: types.SET_RECOMMEND_ARTICLE,
  recommendList
})

export const POLYMERIZATION_ARTICLE = polymerizationList => ({
  type: types.SET_POLYMERIZATION_ARTICLE,
  polymerizationList
})
