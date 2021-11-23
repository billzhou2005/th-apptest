<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.card {
  width:40px;
  height:60px;
  color: #000;
  background-color: white;
  border-style: solid;
  border-width: 1.2px;
  border-color: grey;
  margin: 2px 2px;
  float:left;
}
</style>

<template>
  <div class="card">
    <span>10</span> <br>
    <span>Suits</span>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({  
  name: 'Card',
  props: {
    msg: String
  }
})

</script>
