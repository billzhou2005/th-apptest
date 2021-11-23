<style lang="scss" scoped>
.one-third{
  width:30%;
  height:100px;
  background:rgb(246, 255, 192);
  float:left;
  border-style: solid;
  border-color: gray;
  padding: 10px;
  margin: 3px 3px;
}

.one-thirdFocus{
  width:30%;
  height:100px;
  background:rgb(246, 255, 192);
  float:left;
  border-style: solid;
  border-color: blue;
  padding: 10px;
  margin: 3px 3px;
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


</style>

<template>
  <div :class="[focus? 'one-thirdFocus': 'one-third']">
    <div class="up-left">
      <span> {{ playerName }}  </span> <br>
      <span> {{ balance }}  </span> <br>
    </div>
    <div class="up-right">
      <span
          class="counter"
          v-if="focus"
      > {{ counter }} </span> <br>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Player',
  methods: {
    sendMessage(bvol) {
      bvol = 0
    }
  },
  props: {
    index: {
      type: Number,
      required: true
    },
    playerName: {
      type: String,
      default: 'UNKNOWN'
    },
    balance: {
      type: Number,
      default: 0
    },
    bvol: {
      type: Number,
      default: 0
    },
    counter: {
      type: Number,
      default: 0
    },
    focus: {
      type: Boolean,
      default: false
    },
  }
})
</script>
