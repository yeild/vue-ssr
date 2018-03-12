import Vue from 'vue'
import Vuex from 'vuex'
import { getNewsList, getNewsContent } from '../api'

Vue.use(Vuex)

export function createStore () {
  return new Vuex.Store({
    state: {
      newsList: []
    },
    actions: {
      getNewsList ({ commit }) {
        return getNewsList().then(res => {
          const newsList = res.data.stories
          commit('setNewsList', { newsList })
        })
      }
    },
    mutations: {
      setNewsList (state, { newsList }) {
        Vue.set(state.newsList, newsList)
      }
    }
  })
}