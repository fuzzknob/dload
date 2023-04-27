import axios from 'axios'

const request = axios.create({
  baseURL: 'http://localhost:8000',
})

export * from 'axios'
export default request
