
<template>
  <div class="join">
    <button class="joinButton" @click="joinMessage()">Player1 Join</button>
    <button class="joinButton" style="margin-left:10px;" @click="joinMessage(players[2])">Player2 Join</button>
    <button class="joinButton" style="margin-left:10px;" @click="joinMessage(players[4])">Player3 Join</button>
  </div>
  <div class="row-up">
    <div class="main-left">
      <div>
      <span>Player2  </span>
      <span v-if="countFocus[2]" style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span>
      </div>
      <form :action="sendMessage" @click.prevent="onSubmit">
        <label for="betvol">BetVol:   </label>
        <input v-model="players[2].betvol" type="text" >
        <input :disabled="!players[2].isActivated" type="submit" value="Player2 Send" @click="sendMessage(players[1])">
      </form>
    </div>
    <div class="main-right">
      <div>
      <span>Player3  </span>
      <span v-if="countFocus[4]" style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span>
      </div>
      <form :action="sendMessage" @click.prevent="onSubmit">
        <label for="betvol">BetVol:   </label>
        <input v-model="players[4].betvol" type="text" >
        <input :disabled="!players[4].isActivated" type="submit" value="Player3 Send" @click="sendMessage(players[2])"> <br><br>
      </form>
    </div>
  </div>

  <div class="row-middle">
      <div class="betvolTotal">
        <span class="betvolTotal">{{ players[0].betvol + players[2].betvol +players[4].betvol }}  </span>
      </div>
  </div>

  <div class="row-down">
    <div>
      <span>LoginUser  </span>
      <span v-if="countFocus[0]" style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span>
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
  <div>
    <button @click="testButton"> Test </button>
  </div>
</template>

<script>

// connType: NONE,JOINED,WAITING,BNEXT,TIMEOUT,CLOSE
// seatID: 0-8, 100:Invalid

let roomMsg = {
  "tID": 0,
  "msgType": "sendTest",
  "msgID": 0,
  "status": ["MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL"],
  "usID": 0,
  "fID": 0,
  "nickName": ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
  "bvol": [0,0,0,0,0,0,0,0,0,],
  "balance": [200000,200000,200000,200000,200000,200000,200000,200000,200000],
  "cardsPoints": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  "cardsSuits": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
}

// let player = {"userID": "c63p432n1fdk5k0aeta0", "nickName": "NONE", "status": "MANUAL", "seatID":100, "isActivated": false, "round":0, "betvol":0, "greeting":"Hi" }

export default {
  name: 'App',
  data() {
    return {
      players: [
        {userID: "c63p432n1fdk5k0aeta0", status: "MANUAL", seatID:0,connType: "NONE",isActivated: true,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta1", status: "MANUAL", seatID:100,connType: "NONE",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta2", status: "AUTO", seatID:2,connType: "NONE",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta3", status: "MANUAL", seatID:100,connType: "NONE",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta4", status: "AUTO", seatID:4,connType: "NONE",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta5", status: "MANUAL", seatID:100,connType: "NONE",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta6", status: "MANUAL", seatID:100,connType: "NONE",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta7", status: "MANUAL", seatID:100,connType: "NONE",isActivated: false,round:0, betvol:100,greeting:"Hi"},
        {userID: "c63p432n1fdk5k0aeta8", status: "MANUAL", seatID:100,connType: "NONE",isActivated: false,round:0, betvol:100,greeting:"Hi"}
      ],
      socket: null,
      rcvMessage: "",
      showMsg: true,
      tableID: 0,
      userID: "c63p432n1fdk5k0aeta1",
      selectedSeatID: 0,
      userStatus: "",
      betvolTotal: 50,
      counter: 0,
      countFocus: [false, false, false, false, false, false, false, false, false],
      countIndex: 0,
      testValue: 0
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

      // this.getCountFocus(player.seatID)
      // this.counter = 15
      player.isActivated = false
    },
    getCountFocus(seatID) {
      this.countFocus[seatID] = false
      // this.players.sort(this.sortSeatID)
      // console.log(this.players)
      let i = seatID
      do
      {
        i++
        if(i > 8) { i = 0 }
        if(this.players[i].seatID != 100) {
          if(this.players[i].connType != "NONE" || this.players[i].connType != "TIMEOUT" ||this.players[i].connType != "CLOSE") {
            this.countFocus[this.players[i].seatID] = true
            this.countIndex = this.players[i].seatID
            break
          }
        } else if (this.players[i].seatID == seatID) {
          this.countFocus[seatID] = false
          this.countIndex = seatID
          break
        }
      }
      while (i<9)
    },
    testButton() {
      this.testValue++
      console.log(this.testValue)
      if(this.testValue > 8) {
        this.testValue =0
      }
      this.getCountFocus(this.testValue)
      console.log(this.countFocus)
    },
    sortSeatID(a, b) {
      return a.seatID - b.seatID
    },

    acceptMsg(evt) {
      let rcvJson
      this.rcvMessage = evt.data
      try {
        rcvJson = JSON.parse(evt.data)
        console.log(rcvJson.rType, rcvJson.fID , rcvJson.usID)

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
    joinMessage() {
      console.log(roomMsg)
      this.socket.send(JSON.stringify(roomMsg))
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
