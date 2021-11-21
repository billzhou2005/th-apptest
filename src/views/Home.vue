
<template>
  <div class="usercontrol">
    <button class="confirmButton" @click="joinMessage()">Join</button>
    <button class="confirmButton" style="margin-left:10px;" @click="leaveMessage()">Leave</button>
  </div>
  <div class="row-players">
    <Player 
      v-for="player in playersGroup.slice(0,3)"
      :key="player.index"
      v-bind="player"
    />
  </div>

  <div class="row-middle">
      <div class="betvolTotal">
        <span class="betvolTotal">{{ roomMsg.balance }}  </span>
      </div>
  </div>

  <div class="row-players">
    <Player 
      v-for="player in playersGroup.slice(3,6)"
      :key="player.index"
      v-bind="player"
    />
  </div>

  <div class="msg-btm" >
    <label>Message in a WebSocket</label>
    <p>
      {{ rcvMessage }}
    </p>
    <button @click="WebSocketClose">CloseWS</button>
    <button @click="testButton"> Test </button>
  </div>
</template>

<script>

import Player from "@/components/Player.vue"

export default  {
  components: { Player },
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
      playersGroup: [
        { index: 0, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false },
        { index: 1, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false },
        { index: 2, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false },
        { index: 3, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false },
        { index: 4, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false },
        { index: 5, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false },
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
      countFocus: [true, false, false, false, false, false, false, false, false],
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

          let currentSeatID = 0
          let startPoint = 0

          let i = 0
          for (i=0; i<6; i++) {
            if(this.roomMsg.names[i] == "LoginU") {
              currentSeatID = i
              break
            }
          }

          startPoint = currentSeatID + 2
          if(startPoint > 5) {
            startPoint = startPoint - 6
          }

          let j = 0
          for (i=0; i<6; i++) {
            j = i
            if(i == 3) { j = 5 }
            if(i == 5) { j = 3 }
            this.playersGroup[j].playerName = this.roomMsg.names[startPoint]
            this.playersGroup[j].balance = this.roomMsg.balances[startPoint]
            this.playersGroup[j].focus = this.countFocus[startPoint]
            this.playersGroup[j].bvol = this.roomMsg.bvol
            this.playersGroup[j].counter = this.counter
            startPoint++
            if(startPoint > 5) {
              startPoint = 0
            }
          }
          
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
    },
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

.row-players {
  margin: 5px 5px;
  width:100%;
  height:120;
  background:rgb(255, 255, 255);
  float:left;
}
.row-middle {
  margin: 5px 5px;
  width:95%;
  height:200px;
  background:rgb(178, 198, 241);
  float:left;
  .betvolTotal {
    margin-top: 80px;
  }
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
