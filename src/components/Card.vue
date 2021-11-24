<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  width:40px;
  height:60px;
  color: #000;
  background-color: white;
  padding: 2px;
  border-style: solid;
  border-width: 1.2px;
  border-color: grey;
  margin: 2px 2px;
  float:left;
}
</style>

<template>
  <div class="card">
    <span>{{ points }}</span> <br>
    <span>{{ suits }}</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({  
  name: 'Card',
  props: {
    index: {
      type: Number,
      required: true
    },
    points: {
      type: Number,
      default: 0
    },
    suits: {
      type: Number,
      default: 0
    },
  }
})

</script>
