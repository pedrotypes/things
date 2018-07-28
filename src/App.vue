<template>
  <div>
    <div class="panel state">
      <p class="summary">
        <span v-if="score > 0">
          I have
          <span v-if="score == 1">a {{ txt.currency }}.</span>
          <span v-else>{{ score }} {{ txt.currency_plural }}.</span>
        </span>

        <span v-if="production > 0">
          Adding {{ production }} {{ txt.currency_plural }}/s.
        </span>

        &nbsp;
      </p>

      <button class="main-action" @click="pick()">
        <span v-if="clicks == 0">oh look, a</span>
        <span v-else>pick up another</span> {{ txt.currency }}!
      </button>

      <debug v-if="debug" />
    </div>

    <div
      class="panel store"
      v-if="score >= cheapestItem.baseCost || state.items.length > 0"
    >
      <p>
        I can make useful stuff!
      </p>
      <ul>
        <li v-for="(item, key) in availableItems" v-if="item.unlocked">
          <buy-button
            v-bind:itemId="key"
            v-bind:item="item"
            v-bind:state="state"
          ></buy-button>
        </li>
      </ul>
    </div>

    <div class="panel items" v-if="state.items.length > 0">
      <p>
        Stuff I made
      </p>
      <ul>
        <li v-for="item in state.items">
          <span clas="item-id">
            {{ item.count }}x {{ item.name }}
          </span>
          <span class="item-production">
            {{ item.production_action}} {{ item.count * item.production }} thing/s
          </span>
        </li>
      </ul>
    </div>

    <div class="debug-help" v-if="isDevelopment">
      Press 'd' to debug
    </div>

    <div class="footer">
      <button @click="pauseGame()">pause</button>
      <button @click="setSpeed(1)">1x</button>
      <button @click="setSpeed(5)">5x</button>
      <button @click="setSpeed(10)">10x</button>
      <button @click="setSpeed(100)">100x</button>
    </div>

  </div>
</template>

<style lang="css" scoped>
  .panel {
    float: left;
    display: block;
    width:  30%;
    margin: 0;
    padding: 0;
  }
  .state {
  }
  .items {
  }
  .store {
  }
  .summary {
  }
  .main-action {
  }
  .item-id {
    display: block;
  }
  .item-production {
    display: block;
    color: #999;
    font-size: 0.9em;
  }
  .footer {
    position: absolute;
    bottom: 1em;
    right: 1em;
    display: inline-block;
  }
  .debug-help {
    position: absolute;
    bottom: 1em;
    left: 1em;
    display: inline-block;
  }
</style>

<script>

import Items from './services/Items.js'
import Txt from './services/Txt.js'
import BuyButton from './components/BuyButton'
import Debug from './components/Debug'
import { mapState } from 'vuex'

export default {
  components: { BuyButton, Debug },
  data () {
    return {
      tickerInterval: null,
      state: {
        items: []
      },
      txt: Txt,
      availableItems: Items.list(),
      cheapestItem: Items.cheapest(),
      debug: false
    }
  },
  computed: {
    ...mapState(['score', 'total', 'clicks', 'production', 'speed']),
    isDevelopment () {
      return process.env.NODE_ENV === 'development'
    }
  },
  methods: {
    tick () {
      this.$store.commit('incrementScore', this.production)
      Items.unlock(this.score, this.total)
    },

    pick () {
      this.$store.commit('click')
      this.$store.commit('incrementScore')
      Items.unlock(this.score, this.total)
    },

    setSpeed (speed) {
      this.$store.commit('setSpeed', speed)
      this.speed = speed
      this.runGame()
    },

    runGame () {
      this.pauseGame()

      this.tickerInterval = setInterval(function () {
        this.tick()
      }.bind(this), 1000 / this.speed)
    },

    pauseGame () {
      if (this.tickerInterval) {
        window.clearInterval(this.tickerInterval)
      };
    },
    keyUp (e) {
      console.log(e)
    }
  },
  created () {
    this.state.total = this.state.score
    this.runGame()
  },
  mounted () {
    // capture keypresses
    window.addEventListener('keypress', function (e) {
      // console.log(e.keyCode)

      // toggle debug mode
      if (e.keyCode === 100) { // d key
        this.debug = !this.debug
      }

      // speed control
      if (e.keyCode === 49) { this.setSpeed(1) }
      if (e.keyCode === 50) { this.setSpeed(5) }
      if (e.keyCode === 51) { this.setSpeed(10) }
      if (e.keyCode === 52) { this.setSpeed(100) }

      // pause game
      if (e.keyCode === 112) { this.pauseGame() }
    }.bind(this))
  }
}
</script>
