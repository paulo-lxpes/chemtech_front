import axios from 'axios'

const Api = axios.create({
  baseURL: 'https://localhost:7050/v1/',
/*   baseURL: '/Gre/Deg3/v1/api/', */
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
    Accept: 'application/json'
  }
})

export default Api