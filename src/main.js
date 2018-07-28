/* eslint-disable */

import Vue          from 'vue'
import App          from './App'
import BuyButton    from './components/BuyButton'
import store        from './store'

Vue.component('buy-button', BuyButton)

const CURRENCY = "thing"
const CURRENCY_PLURAL = "things"

const app = new Vue({
  el: '#app',
  store,
  components: {
    app: App
  }
})
