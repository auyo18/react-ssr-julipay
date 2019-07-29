const isDev = process.env.NODE_ENV === 'development'

export const BASE_URL = isDev ? 'http://127.0.0.1:3000/api/julipay' : 'https://api.julipay.com/api/julipay'

export const SITE_NAME = '聚力创意'

export const SUCCESS_CODE = 0

export const BANNER_LENGTH = 5

export const ARTICLE_LENGTH = 10
