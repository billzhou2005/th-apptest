<style lang="scss" scoped>
.one-third{
  width:30%;
  height:110px;
  background:rgb(246, 255, 192);
  float:left;
  border-style: solid;
  border-color: gray;
  margin: 3px 3px;
}

</style>

<template>
    <div class="one-third">
        <span> {{ playerName }}  </span> <br>
        <span> {{ balance }}  </span> <br>
        <label for="betvol">BetVol:   </label> 
        <input v-model="bvol" type="text" > <br>
        <button 
        :disabled="!focus"
        style="margin-top:10px;" 
        @click="sendMessage(bvol)"> Confirm </button>
        <span 
        v-if="focus" 
        style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span> <br>
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
