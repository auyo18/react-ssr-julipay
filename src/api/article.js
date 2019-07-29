import request from '../utils/request'

export const getArticleList = params => request({
  url: '/article/getArticleList',
  method: 'get',
  params
})

export const getRandomArticle = params => request({
  url: '/article/getRandomArticle',
  method: 'get',
  params
})

export const getArticle = params => {
  return request({
    url: '/article/getDetail',
    method: 'get',
    params
  })
}
