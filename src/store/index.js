import Vue from 'vue'
import Vuex from 'vuex'
import { getNewsList, getNewsContent } from '../api'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      newsList: [],
      newsContent: {}
    },
    actions: {
      getNewsList ({ commit }) {
        return getNewsList().then(res => {
          const newsList = res.data.stories
          commit('setNewsList', { newsList })
        })
      },
      getNewsContent ({commit}, id) {
        return getNewsContent(id).then(res => {
          commit('setNewsContent', { newsContent: res.data })
        })
      }
    },
    mutations: {
      setNewsList (state, { newsList }) {
        Vue.set(state, 'newsList', newsList)
      },
      setNewsContent (state, { newsContent }) {
        Vue.set(state, 'newsContent', newsContent)
      }
    }
  })
}