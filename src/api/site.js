import request from '../utils/request'

export const getSiteInfo = () => request({
  url: '/site/getSiteInfo',
  method: 'get'
})
