import { boot } from 'quasar/wrappers'
import axios from 'axios'

const baseURL = 'http://localhost:5000'

const axiosInstance = axios.create({ baseURL: 'http://localhost:5000' })

export default boot(({ app }) => {
  app.config.globalProperties.$axios = axiosInstance
  app.config.globalProperties.$baseImageURL = baseURL
})

export { axios }
