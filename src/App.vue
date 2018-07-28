<template>
  <div>
    <div class="panel state">
      <fieldset>
        <label>State</label>
        <ul>
          <li>score: {{ score }}</li>
          <li>clicks: {{ clicks }}</li>
          <li>total: {{ total }}</li>
          <li>production: {{ production }}</li>
        </ul>
      </fieldset>

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
</style>

<script>

import Items from './services/Items.js'
import Txt from './services/Txt.js'
import BuyButton from './components/BuyButton'

export default {
  components: { BuyButton },
  data () {
    return {
      speed: 1,
      tickerInterval: null,
      state: {
        items: []
      },
      txt: Txt,
      availableItems: Items.list(),
      cheapestItem: Items.cheapest()
    }
  },
  computed: {
    score () {
      return this.$store.state.score
    },
    total () {
      return this.$store.state.total
    },
    clicks () {
      return this.$store.state.clicks
    },
    production () {
      return this.$store.state.production
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
    }
  },
  created () {
    this.state.total = this.state.score
    this.runGame()
  }
}
</script>
