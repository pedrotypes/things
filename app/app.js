import Vue          from 'vue'
import VueRouter    from 'vue-router'

import App          from './components/App.vue'
import BuyButton    from './components/BuyButton.vue'


var Router = new VueRouter();
Vue.use(VueRouter)

Vue.component('buy-button', BuyButton);

const CURRENCY = "thing";
const CURRENCY_PLURAL = "things";

const app = new Vue({
    el: '#app',
    router: Router,
    components: {
        app: App
    }
})
