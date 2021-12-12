
<template>
<div class="main">
  <div class="main-left">
    <div class="usercontrol">
      <button class="primaryButton" @click="joinMessage()">Join</button>
      <button class="fourthButton"  @click="leaveMessage()">Leave</button>
    </div>
  </div>
  <div class="main-right">
    <div class="row-players">
      <Player
        v-for="player in players.slice(0,3)"
        :key="player.seatDID"
        v-bind="player"
      />
    </div>

    <div class="row-middle">
        <div class="item">
          <span class="betvolTotalLable">{{ roomShare.totalAmount }}  </span> <br>
        </div>
    </div>
    <div class="row-middle">
      <div class="discards" v-if="discardsShow">
        <Card
          v-for="card in discardsDisp"
          :key="card.index"
          v-bind="card"
        />
      </div>
    </div>

    <div class="row-players">
      <Player
        v-for="player in players.slice(3,6)"
        :key="player.seatDID"
        v-bind="player"
      />
    </div>

    <div class="bcontrol">
      <button class="circleBtn2" @click="bClearFunc()"><span >最小</span> </button>
      <button class="circleBtn3" @click="bAdd1()"><span >加注</span> </button>
      <button class="circleBtn4" @click="bAdd4()"><span >最大</span> </button>
      <input class="bVolInput" type="text" :value="currBvol" />
      <button class="secondaryButton" :disabled="!bControl" @click="bConfirm()">投注</button>
      <button :class="bFollowClass" @click="bFollowFunc()">跟</button>
      <button :class="bCompareClass" @click="bCompareFunc()">比上家</button>
      <button :class="bDiscardClass" @click="bDiscardFunc()">弃牌</button>
    </div>
  </div>

  <div class="msg-btm" >
  </div>
</div>
</template>

<script>
import home from "@/assets/js/home.js"

export default  {
  ...home
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  display: flex;
  justify-content: center;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
.main {
  width:100%;
  height:100%;
  justify-content: center;
}
.main-left {
  margin: 0px 0px;
  width:10%;
  height:600px;
  background:rgb(220, 220, 220);
  float: left;
  display: flex;
  justify-content: center;
}
.main-right {
  margin: 0px 0px;
  width:90%;
  background:rgb(255, 255, 255);
  float: left;
  justify-content: center;
}
.row-players {
  margin: 5px 0px;
  width:100%;
  height:120;
  background:rgb(255, 255, 255);
  display: flex;
  float: left;
  justify-content: center;
}
.row-middle {
  margin: auto auto;
  width:75%;
  height:100px;
  background:rgb(178, 198, 241);
  display: flex;
  justify-content: center;
  .item {
    margin-top: 40px;
    text-align: center;
    font-size: 2.6em;
  }

}
.middle-left {
  margin: 0px 0px;
  width:40%;
  background:rgb(220, 220, 220);
  float: left;
  display: flex;
  justify-content: center;
}
.middle-right {
  margin: 0px 0px;
  width:60%;
  background:rgb(220, 220, 220);
  float: left;
  justify-content: center;
}


.bcontrol {
  margin: 5px 5px;
  width:100%;
  height:120;
  background:rgb(255, 255, 255);
  float:left;
}


.msg-btm {
  margin-top: 20px;
  width:100%;
  height:100px;
  background:rgb(255, 255, 255);
  float:right;
}
.primaryButton {
  width: 60px;
  height: 40px;
  background: green;
  border: none;
  color: white;
  margin: 6px 3px;
  border-radius: 6px;
}
.secondaryButton {
  width: 60px;
  height: 40px;
  background: rgb(0, 45, 128);
  border: none;
  color: white;
  margin: 6px 3px;
  border-radius: 6px;
}
.thirdButton {
  width: 60px;
  height: 40px;
  background: rgb(124, 0, 128);
  border: none;
  color: white;
  margin: 6px 3px;
  border-radius: 6px;
}
.fourthButton {
  width: 60px;
  height: 40px;
  background: rgb(89, 92, 89);
  border: none;
  color: white;
  margin: 6px 3px;
  border-radius: 6px;
}
.circleBtn1 {
    width: 60px;
    height: 60px;
    border-radius:50%;
    background-color: rgb(161, 152, 152);
    border: 1px solid #d5d5d5;
}
.circleBtn2 {
    width: 60px;
    height: 60px;
    border-radius:50%;
    background-color: rgb(23, 161, 41);
    border: 1px solid #d5d5d5;
}
.circleBtn3 {
    width: 60px;
    height: 60px;
    border-radius:50%;
    background-color: rgb(0, 68, 255);
    border: 1px solid #d5d5d5;
}
.circleBtn4 {
    width: 60px;
    height: 60px;
    border-radius:50%;
    background-color: red;
    border: 1px solid #d5d5d5;
}
.circleBtn5 {
    width: 60px;
    height: 60px;
    border-radius:50%;
    background-color: rgb(255, 187, 0);
    border: 1px solid #d5d5d5;
}
.circleBtn6 {
    width: 60px;
    height: 60px;
    border-radius:50%;
    background-color: rgb(251, 255, 0);
    border: 1px solid #d5d5d5;
}
.bVolInput {
    margin:6px;
    text-align:center;
    font-size: 1.2em;
    width:80px;
    height:40px;
    border: 3px solid #000000;
}

button[disabled] {
  color: white !important;
  background: #666464 !important;
}
</style>
