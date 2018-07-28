import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    score: 0,
    total: 0,
    production: 0
  },
  mutations: {
    incrementScore (state, points = 1) {
      state.score += points
      state.total += points
    },
    pay (state, points = 0) {
      state.score -= points
    },
    addProduction (state, amount) {
      state.production += amount
    }
  }
})

export default store
