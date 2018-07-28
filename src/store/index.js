import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    clicks: 0,
    score: 0,
    total: 0,
    production: 0,
    speed: 1
  },
  mutations: {
    click (state) {
      state.clicks++
    },
    incrementScore (state, points = 1) {
      state.score += points
      state.total += points
    },
    pay (state, points = 0) {
      state.score -= points
    },
    addProduction (state, amount) {
      state.production += amount
    },
    setSpeed (state, speed) {
      state.speed = speed
    }
  }
})

export default store
