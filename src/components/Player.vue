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

</style>

<template>
    <div :class="[focus? 'one-thirdFocus': 'one-third']">
        <span> {{ playerName }}  </span> <br>
        <span> {{ balance }}  </span> <br>
        <span 
            class="counter"
            v-if="focus" 
        > {{ counter }} </span> <br>
    </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Player',
  methods: {
    sendMessage(bvol) {
    //  this.socket.send(JSON.stringify(msg))

      // this.getCountFocus(player.seatID)
      // this.counter = 15
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
