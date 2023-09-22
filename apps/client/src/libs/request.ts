import axios from 'axios'

const request = axios.create({
  baseURL: '/api',
})

export * from 'axios'
export default request
