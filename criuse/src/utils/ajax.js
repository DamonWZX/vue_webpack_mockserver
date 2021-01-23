import axios from 'axios'
import qs from 'qs'

const service = axios.create({
  baseURL: 'http://localhost:3001/',
  timeout: 180000
})

/**
 * 通用request封装
 * @param method
 * @param url
 * @param data
 * @param config
 * @returns {Promise}
 */
const request = (method, url, data, config = {}) => {
  const options = Object.assign({}, config, {
    url,
    method,
    data
  })
  options.headers = options.headers || {}
  return new Promise((resolve, reject) => {
    service
      .request(options)
      .then(res => {
        const data = res.data
        resolve(data)
      })
      .catch(res => {
        console.log('请求失败,请查看服务器信息')
        reject(res)
      })
  }).catch(() => {})
}

const ajax = {
  get (url, data, config) {
    url += `?${qs.stringify(data)}`
    return request('get', url, null, config)
  },
  delete (url, data, config) {
    return request('delete', url, data, config)
  },
  post (url, data, config) {
    return request('post', url, data, config)
  },
  put (url, data, config = {}) {
    config.headers = {
      'Content-Type': 'application/json; charset=UTF-8'
    }
    return request('put', url, data, config)
  }
}

export default ajax
