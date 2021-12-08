
<template>
<div class="main">
  <div class="main-left">
    <div class="usercontrol">
      <button class="secondaryButton" @click="joinMessage()">Join</button>
      <button class="fourthButton"  @click="leaveMessage()">Leave</button>
      <button class="thirdButton"  @click="newRoundTest()">NewRound</button>
      <button class="primaryButton"  @click="roomTestFunc()">Room Test</button>
    </div>
  </div>
  <div class="main-right">
    <div class="row-players">
      <Player
        v-for="player in roomPlayers.slice(0,3)"
        :key="player.index"
        v-bind="player"
      />
    </div>

    <div class="row-middle">
        <div class="item">
          <span class="betvolTotalLable">{{ roomShare.totalAmount }}  </span> <br>
        </div>
    </div>
    <div class="row-middle">
        <div class="item">
          <span class="currBvolLable">{{ currBvol }}  </span>
        </div>
    </div>

    <div class="row-players">
      <Player
        v-for="player in roomPlayers.slice(3,6)"
        :key="player.index"
        v-bind="player"
      />
    </div>

    <div class="bcontrol">
      <button class="circleBtn1" @click="bAdd1()"><span >壹千</span> </button>
      <button class="circleBtn2" @click="bAdd2()"><span >贰千</span> </button>
      <button class="circleBtn3" @click="bAdd3()"><span >伍千</span> </button>
      <button class="circleBtn4" @click="bAdd4()"><span >壹万</span> </button>
      <button class="circleBtn5" @click="bAdd5()"><span >贰万</span> </button>
      <button class="circleBtn6" @click="bAdd6()"><span >伍万</span> </button>

      <button class="primaryButton" @click="bConfirm()">确定</button>
      <button v-show="cardCheck" class="secondaryButton" @click="bCheckOwnCards()">看牌</button>
    </div>
  </div>

  <div class="msg-btm" >
    <label>Message in a WebSocket</label>
    <p>
      {{ rcvMessage }}
    </p>
    <button @click="WebSocketClose">CloseWS</button>
    <button @click="testButton"> Test </button>
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
  width: 80px;
  height: 40px;
  background: green;
  border: none;
  color: white;
  margin: 6px 10px;
  border-radius: 6px;
}
.secondaryButton {
  width: 80px;
  height: 40px;
  background: rgb(0, 45, 128);
  border: none;
  color: white;
  margin: 6px 10px;
  border-radius: 6px;
}
.thirdButton {
  width: 80px;
  height: 40px;
  background: rgb(124, 0, 128);
  border: none;
  color: white;
  margin: 6px 10px;
  border-radius: 6px;
}
.fourthButton {
  width: 80px;
  height: 40px;
  background: rgb(89, 92, 89);
  border: none;
  color: white;
  margin: 6px 10px;
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
</style>
