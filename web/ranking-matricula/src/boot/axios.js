import axios from 'axios';
import { utils } from './utilsDev'

export const HTTP = axios.create({
  timeout: 60000,
  baseURL: 'http://localhost:7000/',
  headers: {
    'Content-Type': 'application/json;charset=utf-8'
  }
})

axios.defaults.withCredentials = true
axios.defaults.headers.common = { 'X-Requested-With': 'XMLHttpRequest' }

export default async ({router, Vue }) => {
  HTTP.interceptors.request.use((req) => {
    console.log('Interceptor request', req)
    const token = localStorage.getItem('user-token')
    if (token) {
      req.headers.common.Authorization = 'jwt ' + token
    }
    return req
  })

  HTTP.interceptors.response.use((response) => {
    return response
  }, (error) => {
    if (error.response && error.response.status === 401) {
      console.log(error.response)
      router.push('/login')
      utils.notify.error('Autenticação inválida. Por favor tente autenticar novamente!')
    } else {
      console.log('Erro ao acessar o servidor. Por favor tente autenticar novamente no servidor!', error)
      if (error.response) {
        utils.notify.error('Erro ao acessar o servidor!!! CODIGO: ' + error.response.status)
      } else {
        utils.notify.error('Erro ao acessar o servidor!!! ERRO: ' + error)
      }
    }
    return Promise.reject(error)
  })

  Vue.prototype.$axios = axios;
};
