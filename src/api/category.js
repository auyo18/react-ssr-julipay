import request from '../utils/request'


export function getCategory() {
  return request({
    url: '/category/getCategory',
    method: 'get'
  })
}
