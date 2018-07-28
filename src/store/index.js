import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    score: 0,
    total: 0
  },
  mutations: {
    incrementScore (state, points = 1) {
      state.score++
      state.total++
    }
  }
})

export default store
