import Axios, { AxiosInstance } from "axios"


const clienteHttp: AxiosInstance = Axios.create({
  baseURL: "http://localhost:3000/"
})


export default clienteHttp