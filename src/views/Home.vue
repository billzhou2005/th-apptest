
<template>
  <div class="usercontrol">
    <button class="confirmButton" @click="joinMessage()">Join</button>
    <button class="confirmButton" style="margin-left:10px;" @click="leaveMessage()">Leave</button>
  </div>
  <div class="row-up">
    <div class="one-third">
      <span> {{ roomMsg.names[0] }}  </span> <br>
      <span> {{ roomMsg.balances[0] }}  </span> <br>
      <span 
        v-if="countFocus[roomMsg.fID]" 
        style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span> <br>
      <label for="betvol">BetVol:   </label> 
      <input v-model="roomMsg.bvol" type="text" > <br>
      <button 
        :disabled="!countFocus[0]"
        class="confirmButton" 
        style="margin-top:10px;" 
        @click="sendMessage(roomMsg.bvol)"> Confirm </button>
    </div>
    <div class="one-third">
      <span> {{ roomMsg.names[1] }}  </span> <br>
      <span> {{ roomMsg.balances[1] }}  </span> <br>
      <span 
        v-if="countFocus[roomMsg.fID]" 
        style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span> <br>
      <label for="betvol">BetVol:   </label> 
      <input v-model="roomMsg.bvol" type="text" > <br>
      <button 
        :disabled="!countFocus[1]"
        class="confirmButton" 
        style="margin-top:10px;" 
        @click="sendMessage(roomMsg.bvol)"> Confirm </button>
    </div>
    <div class="one-third">
      <span> {{ roomMsg.names[2] }}  </span> <br>
      <span> {{ roomMsg.balances[2] }}  </span> <br>
      <span 
        v-if="countFocus[roomMsg.fID]" 
        style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span> <br>
      <label for="betvol">BetVol:   </label> 
      <input v-model="roomMsg.bvol" type="text" > <br>
      <button 
        :disabled="!countFocus[2]"
        class="confirmButton" 
        style="margin-top:10px;" 
        @click="sendMessage(roomMsg.bvol)"> Confirm </button>
    </div>
  </div>

  <div class="row-middle">
      <div class="betvolTotal">
        <span class="betvolTotal">{{ roomMsg.balance }}  </span>
      </div>
  </div>

  <div class="row-down">
    <div>
      <span>{{ roomMsg.names[3] }}  </span> <br>
      <span> {{ roomMsg.balances[3] }}  </span>
      <span v-if="countFocus[roomMsg.fID]" style="margin-left:10px; color:red;font-size:24px"> {{ counter }} </span>
    </div>
    <form :action="sendMessage" @click.prevent="onSubmit">
      <label for="betvol">BetVol:   </label>
      <input v-model="roomMsg.bvol" type="text" >
      <input :disabled="!countFocus[roomMsg.fID]" type="submit" value="Player1 Send" @click="sendMessage(roomMsg.bvol)"> <br><br>
    </form>

  </div>
  <div class="msg-btm" >
    <label>Message in a WebSocket</label>
    <p>
      {{ rcvMessage }}
    </p>
    <button @click="WebSocketClose">CloseWS</button>
    <button @click="testButton"> Test </button>
    <SimpleButton >外边框按钮</SimpleButton>
  </div>
</template>

<script>
import SimpleButton from '../components/SimpleButton.vue'


export default {
  components: { SimpleButton },
  name: 'App',
  data() {
    return {
      // msgType-init: NONE
      // msgType-Send: JOINED,WAITING,BNEXT,TIMEOUT,CLOSE,LEAVE
      // msgType-Received: Assigned,RNEW,BNEXT,RDONE (RNEW: Round new)
      // seatID: 0-8, >8-all
      roomMsg: {
        "tID": 0,
        "name": "loginU",
        "msgType": "RNEW",
        "reserve": "TBD",
        "seatID": 0,
        "bvol": 0,
        "balance": 0,
        "fID": 0,
        "status": ["MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL"],
        "types": ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
        "names": ["TBD","TBD","TBD","TBD","TBD","TBD","TBD","TBD","TBD"],
        "balances": [0,0,0,0,0,0,0,0,0],
      },
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
      testValue: 0,
      btncolors: [
        "gray",
        "yellow",
        "orange",
        "red",
        "green",
        "teal",
        "blue",
        "indigo",
        "purple",
        "pink"
      ],
      btnsizes: ["lg", "md", "sm"]
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

      }
    }, 1000)
  },
  methods: {
    sendMessage(bvol) {
    //  this.socket.send(JSON.stringify(msg))

      // this.getCountFocus(player.seatID)
      // this.counter = 15
      bvol = 0
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
        if(rcvJson.tID == 0) {
          this.roomMsg.name = rcvJson.name
          this.roomMsg.msgType = rcvJson.msgType
          this.roomMsg.reserve =rcvJson.reserve
          this.roomMsg.seatID = rcvJson.seatID
          this.roomMsg.bvol = rcvJson.bvol
          this.roomMsg.balance = rcvJson.balance
          this.roomMsg.fID = rcvJson.fID
          this.roomMsg.status = rcvJson.status
          this.roomMsg.names = rcvJson.names
          this.roomMsg.balances = rcvJson.balances
          console.log("Room data arrived:")
          console.log(this.roomMsg)
        } else {
          console.log("Cards data:")
          console.log(rcvJson)
        }
      } catch(e) {
        console.log("error message", e.message)
      }
    },
    WebSocketClose() {
    //  this.socket.send(JSON.stringify(msg))
      this.socket.close()
    },
    joinMessage() {
      this.roomMsg.tID = 0
      this.roomMsg.msgType = "JOIN"
      this.roomMsg.name = "LoginU"
      this.roomMsg.balance = 150000
      this.socket.send(JSON.stringify(this.roomMsg))
    },
    leaveMessage() {
      this.roomMsg.tID = 0
      this.roomMsg.msgType = "LEAVE"
      this.roomMsg.name = "LoginU"
      this.socket.send(JSON.stringify(this.roomMsg))
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
.one-third{
  width:30%;
  height:110px;
  background:rgb(246, 255, 192);
  float:left;
  border-style: solid;
  border-color: gray;
  margin: 3px 3px;
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
.confirmButton {
  color:blue;
}

</style>
