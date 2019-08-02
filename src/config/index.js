const isDev = process.env.NODE_ENV === 'development'

export const BASE_URL = isDev ? 'http://192.168.50.3:3001/api/julipay' : 'https://api.julipay.com/api/julipay'

export const SITE_NAME = '聚力创意'

export const SITE_SUB_NAME = '聚力体验至上'

export const SUCCESS_CODE = 0

export const BANNER_LENGTH = 5

export const ARTICLE_LENGTH = 10
