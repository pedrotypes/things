<template>
    <div>
        <div class="panel state">
            <p class="summary">
                <span v-if="state.clicks > 0 || state.score > 0">
                    I have
                    <span v-if="state.score == 1">a {{ txt.currency }}.</span>
                    <span v-else>{{ state.score }} {{ txt.currency_plural }}.</span>
                </span>

                <span v-if="state.production > 0">
                    Adding {{ state.production }} {{ txt.currency_plural }}/s.
                </span>

                &nbsp;
            </p>

            <button class="main-action" @click="pick()">
                <span v-if="state.clicks == 0">oh look, a</span>
                <span v-else>pick up another</span> {{ txt.currency }}!
            </button>
        </div>

        <div
            class="panel store"
            v-if="state.score >= cheapestItem.baseCost || state.items.length > 0"
        >
            <p>
                I can make useful stuff!
            </p>
            <ul>
                <li v-for="(item, itemId) in availableItems" v-if="item.unlocked">
                    <buy-button
                        v-bind:itemId="itemId"
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

    import Items from '../services/Items.js';
    import Txt from '../services/Txt.js';

    export default {
        data() {
            return {
                speed: 1,
                tickerInterval: null,
                state: {
                    score: 0,
                    total: 0,
                    production: 0,
                    items: [],
                    clicks: 0
                },
                txt: Txt,
                availableItems: Items.list(),
                cheapestItem: Items.cheapest()
            }
        },
        methods: {
            tick() {
                this.state.score += this.state.production
                this.state.total += this.state.production
                Items.unlock(this.state);
            },

            pick() {
                this.state.clicks++;
                this.state.score++;
                this.state.total++;
                Items.unlock(this.state);
            },

            setSpeed(speed) {
                this.speed = speed;
                this.runGame();
            },

            runGame() {
                this.pauseGame(); // clears interval

                this.tickerInterval = setInterval(function() {
                    this.tick()
                }.bind(this), 1000 / this.speed);
            },

            pauseGame() {
                if (this.tickerInterval) {
                    window.clearInterval(this.tickerInterval);
                };
            }
        },
        created: function () {
            this.state.total = this.state.score;
            this.runGame();
        }
    }
</script>
