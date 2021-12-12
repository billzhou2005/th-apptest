<style lang="scss" scoped>
.one-third{
  width:20%;
  height:130px;
  background:rgb(246, 255, 192);
  float:left;
  border-style: solid;
  border-color: gray;
  border-radius: 15px;
  padding: 10px;
  margin: 5px 10px;
}

.one-thirdFocus{
  width:20%;
  height:130px;
  background:rgb(246, 255, 192);
  float:left;
  border-style: solid;
  border-color: blue;
  border-radius: 15px;
  padding: 10px;
  margin: 5px 10px;
  .counter {
      padding: 20px;
      color:red;
      font-size:3em;
  }
}

.up-left{
  width:50%;
  height:50%;
  float:left;
}
.up-right{
  width:50%;
  height:50%;
  float:left;
  color:red;
  font-size:0.8em;
}
.down-cards{
  height:50%;
  float:left;
}
</style>

<template>
  <div :class="[focus? 'one-thirdFocus': 'one-third']">
    <div class="up-left">
      <span> {{ name }}  </span> <br>
      <span> {{ balance }}  </span> <br>
    </div>
    <div class="up-right">
      <span
          class="counter"
          v-if="focus"
      > {{ counter }} </span> <br>
    </div>
    <div v-show="hasCard" class="down-cards">
      <div v-if="showCard" >
        <Card
          v-for="card in cards"
          :key="card.index"
          v-bind="card"
        />
      </div>
      <div v-else >
        <CardBack
          v-for="card in cards"
          :key="card.index"
          v-bind="card"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent, watch, reactive } from 'vue'
import Card from '@/components/Card.vue'
import CardBack from '@/components/CardBack.vue'

export default defineComponent({
  components: { Card, CardBack },
  name: 'Player',
  mounted() {
    setInterval(() => {
      if (this.counter > 0) {
        this.counter--
        if (this.counter == 0) {
          this.counter = 10
        }
      }
    }, 1000)
  },

  data () {
    return {
      counter: 6,
    }
  },


  props: {
    showCard: {
      type: Boolean,
      default: false
    },
    seatDID: {
      type: Number,
      required: true
    },
    name: {
      type: String,
      default: 'UNKNOWN'
    },
    balance: {
      type: Number,
      default: 0
    },
    cardsType: {
      type: String,
      default: 0
    },
    discard: {
      type: Boolean,
      default: false
    },
    hasCard: {
      type: Boolean,
      default: false
    },
    focus: {
      type: Boolean,
      default: false
    },
    cards: {
      type: Array,
      default: [
        { index: 0, points: 1, suits: 1 },
        { index: 1, points: 2, suits: 1 },
        { index: 2, points: 3, suits: 1 },
      ],
    }
  }
})
</script>
