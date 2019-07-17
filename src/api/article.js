import request from '../utils/request'
import {BASE_URL} from "../config"

export const getArticleList = params => request({
  url: BASE_URL + '/api/article/articleList',
  method: 'get',
  params
})

export const getRandomArticle = params => request({
  url: BASE_URL + '/api/article/getRandomArticle',
  method: 'get',
  params
})
