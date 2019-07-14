import request from '../utils/request'
import {BASE_URL} from "../config"

export const getSiteInfo = () => request({
  url: BASE_URL + '/api/users/getInfo',
  method: 'get'
})
