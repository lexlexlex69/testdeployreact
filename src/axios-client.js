import axios from "axios"

const axiosClient = axios.create({
  baseURL: `https://laravelonly-copy-bi5wzqoc8-lexs-projects-4a50776e.vercel.app/api/api/`,
})

axiosClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("ACCESS_TOKEN")
  config.headers.Authorization = `Bearer ${token}`
  return config
})

axiosClient.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    try {
      const { response } = error
      if (response.status === 401) localStorage.removeItem("ACCESS_TOKEN")
    } catch (e) {
      console.error(e)
    }
    throw error
  }
)

export default axiosClient
