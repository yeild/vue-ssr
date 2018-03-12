import axios from 'axios'
const baseURL = 'https://news-at.zhihu.com/api/4/news/'

export function getNewsList() {
  return axios.get(baseURL + 'latest')
}
export function getNewsContent(id) {
  return axios.get(baseURL + id)
}