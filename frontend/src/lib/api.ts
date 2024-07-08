import axios from 'axios'

import { BACKEND_API_URL } from '@/utils/constants'

const api = axios.create({
  baseURL: BACKEND_API_URL
})

console.log(BACKEND_API_URL)
export default api
