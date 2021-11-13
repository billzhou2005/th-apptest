
<template>
  <div class="join">
    <button class="joinButton" @click="joinMessage(players[0])">Player1 Join</button>
    <button class="joinButton" style="margin-left:10px;" @click="joinMessage(players[1])">Player2 Join</button>
    <button class="joinButton" style="margin-left:10px;" @click="joinMessage(players[2])">Player3 Join</button>
  </div>
  <div class="row-up">
    <div class="main-left">
      <div>
      <span>Player2  </span>
      <span v-if="players[1].isActivated" style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span>
      </div>
      <form :action="sendMessage" @click.prevent="onSubmit">
        <label for="betvol">BetVol:   </label>
        <input v-model="players[1].betvol" type="text" > 
        <input :disabled="!players[1].isActivated" type="submit" value="Player2 Send" @click="sendMessage(players[1])"> 
      </form>
    </div>
    <div class="main-right">
      <div>
      <span>Player3  </span>
      <span v-if="players[2].isActivated" style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span>
      </div>
      <form :action="sendMessage" @click.prevent="onSubmit">
        <label for="betvol">BetVol:   </label>
        <input v-model="players[2].betvol" type="text" > 
        <input :disabled="!players[2].isActivated" type="submit" value="Player3 Send" @click="sendMessage(players[2])"> <br><br>
      </form>
    </div>
  </div>

  <div class="row-middle">
      <div class="betvolTotal">
        <span class="betvolTotal">{{ players[0].betvol + players[1].betvol +players[2].betvol }}  </span>
      </div>
  </div>

  <div class="row-down">
    <div>
      <span>LoginUser  </span>
      <span v-if="players[0].isActivated" style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span>
    </div>
    <form :action="sendMessage" @click.prevent="onSubmit">
      <label for="betvol">BetVol:   </label>
      <input v-model="players[0].betvol" type="text" >
      <input :disabled="!players[0].isActivated" type="submit" value="Player1 Send" @click="sendMessage(players[0])"> <br><br>
    </form>

  </div>
  <div class="msg-btm" >
    <label>Message in a WebSocket</label>
    <p>
      {{ rcvMessage }}
    </p>
    <button @click="WebSocketClose">CloseWS</button>
  </div>
</template>

<script>
let msg = {
  "tableID": 0,
  "userID": "c63p432n1fdk5k0aeta0",
  "status": 'MANUAL',
  "seatID": 0,
  "connType": 'JOINED',
  "isActivated": false,
  "round": 0,
  "betvol": 0,
  "greeting": 'Hi'
}

// connType: NONE,JOINED,WAITING,ACTIVATE,BNEXT,TIMEOUT,CLOSE

export default {
  name: 'App',
  data() {
    return {
      players: [
        {userID: "c63p432n1fdk5k0aeta0", status: "MANUAL", seatID:0,connType: "JOINED",isActivated: true,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta1", status: "AUTO", seatID:2,connType: "JOINED",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta2", status: "AUTO", seatID:4,connType: "JOINED",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta3", status: "MANUAL", seatID:1,connType: "JOINED",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta4", status: "MANUAL", seatID:3,connType: "JOINED",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta5", status: "MANUAL", seatID:5,connType: "JOINED",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta6", status: "MANUAL", seatID:6,connType: "JOINED",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta7", status: "MANUAL", seatID:7,connType: "JOINED",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta8", status: "MANUAL", seatID:8,connType: "JOINED",isActivated: false,round:0, betvol:100,greeting:"Hi"}
      ],
      socket: null,
      rcvMessage: "",
      showMsg: true,
      tableID: 0,
      userID: "c63p432n1fdk5k0aeta1",
      seatID: 0,
      userStatus: "",
      betvolTotal: 50,
      counter: 0
    }
  },
  mounted() {
    this.socket = new WebSocket("ws://140.143.149.188:9080/ws")
    this.socket.onclose = () => {
      console.log("Connection closed")
    }
    this.socket.onerror = () => {
      console.log("Connection error")
    }
    this.socket.onopen = () => {
      console.log("Connection success")
    //  msg.connType = "JOINED"
    //  msg.status = "WAITING"
    //  this.socket.send(JSON.stringify(msg))
    }
    this.socket.onmessage = (evt) => {
        this.acceptMsg(evt)
    }
    
    setInterval(() => {
      if (this.counter > 0) {
        this.counter--
        if(this.counter === 0 && this.players[0].isActivated==true ) {
          this.players[0].isActivated = false

          msg.status = this.players[0].status 
          msg.userID = this.players[0].userID
          msg.seatID = parseInt(this.players[0].seatID)
          msg.connType = "TIMEOUT"
          msg.isActivated = this.players[0].isActivated
          msg.betvol = parseInt(this.players[0].betvol)
          msg.round = parseInt(this.players[0].round)
          msg.greeting = this.players[0].greeting

          this.socket.send(JSON.stringify(msg))
        }
      } 
    }, 1000)
  },
  methods: {
    sendMessage(player) {
      msg.tableID = parseInt(this.tableID)
      msg.status = player.status 
      msg.userID = player.userID
      msg.seatID = parseInt(player.seatID)
      msg.connType = "BNEXT"
      msg.isActivated = player.isActivated
      msg.betvol = parseInt(player.betvol)
      msg.round = parseInt(player.round)
      msg.greeting = player.greeting
      this.socket.send(JSON.stringify(msg))
      if(player.seatID ===0 ) {
        this.counter = 40
        player.isActivated = false
      }
    },
    acceptMsg(evt) {
      let rcvJson
      this.rcvMessage = evt.data
      try {
        rcvJson = JSON.parse(evt.data)
        console.log(rcvJson.userID, rcvJson.status, rcvJson.betvol)
        if(rcvJson.seatID === 4) {
          this.players[0].isActivated = true
          this.counter = 40
        } 
      } catch(e) {
        console.log("error message", e.message)
      }
    },
    WebSocketClose() {
      msg.tableID = parseInt(this.tableID) 
      msg.userID = this.userID
      msg.connType = "CLOSE"
      this.socket.send(JSON.stringify(msg))
      this.socket.close()
    },
    joinMessage(player) {
      msg.userID = player.userID
      msg.status = player.status
      msg.seatID = player.seatID
      msg.connType = "JOINED"
      msg.isActivated = player.isActivated
      msg.round = player.round
      msg.betvol = player.betvol
      msg.greeting = player.greeting
      this.socket.send(JSON.stringify(msg))
    }
  }
}
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}
div {
  padding-top: 5px;
  padding-bottom: 5px;
}
.main-left{
  width:50%;
  height:100px;
  background:rgb(246, 255, 192);
  float:left;
}
.main-right{
  width:50%;
  height:100px;
  background:pink;
  float:right;
}
.row-middle {
  margin: 5px;
  width:100%;
  height:200px;
  background:rgb(178, 198, 241);
  float:right;
}
.row-middle {
  margin-top: 5px;
  width:100%;
  height:200px;
  background:rgb(178, 198, 241);
  .betvolTotal {
    margin-top: 80px;
  }
}
.row-down {
  margin-top: 5px;
  width:100%;
  height:100px;
  background:rgb(185, 241, 184);
  float:right;
}
.msg-btm {
  margin-top: 20px;
  width:100%;
  height:100px;
  background:rgb(255, 255, 255);
  float:right;
}
.joinButton {
  color:blue;
}

</style>
