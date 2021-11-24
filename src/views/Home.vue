
<template>
  <div class="usercontrol">
    <button class="secondaryButton" @click="joinMessage()">Join</button>
    <button class="fourthButton"  @click="leaveMessage()">Leave</button>
  </div>
  <div class="row-players">
    <Player
      v-for="player in playersGroup.slice(0,3)"
      :key="player.index"
      v-bind="player"
    />
  </div>

  <div class="row-middle">
      <div class="item">
        <span class="betvolTotalLable">{{ roomMsg.balance }}  </span> <br>
      </div>
  </div>
  <div class="row-middle">
      <div class="item">
        <span class="currBvolLable">{{ currBvol }}  </span>
      </div>
  </div>

  <div class="row-players">
    <Player
      v-for="player in playersGroup.slice(3,6)"
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
        "name": "UNKNOWN",
        "msgType": "RNEW",
        "reserve": "TBD",
        "seatID": 0,
        "bvol": 1000,
        "balance": 0,
        "fID": 0,
        "status": ["MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL","MANUAL"],
        "types": ["NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE","NONE"],
        "names": ["TBD","TBD","TBD","TBD","TBD","TBD","TBD","TBD","TBD"],
        "balances": [0,0,0,0,0,0,0,0,0],
      },
      cards: {
        "tID": 0,
        "cardsName": "UNKNOWN",
        "cardsPoints": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        "cardsSuits": [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        "cardsTypes": ["TBD","TBD","TBD","TBD","TBD","TBD","TBD","TBD","TBD"],
      },
      playersGroup: [
        { index: 0, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false, playerCards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },] },
        { index: 1, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
        { index: 2, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
        { index: 3, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
        { index: 4, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
        { index: 5, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
        { index: 6, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
        { index: 7, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
        { index: 8, playerName: "UNKNOWN", balance: 0, bvol: 0, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
      ],
      bCtlVol: [
        { ctrVol1:100, ctrVol2:200, ctrVol3:500, ctrVol4:1000, ctrVol5:2000, ctrVol6:5000},
        { ctrVol1:1000, ctrVol2:2000, ctrVol3:5000, ctrVol4:10000, ctrVol5:20000, ctrVol6:50000},
        { ctrVol1:10000, ctrVol2:20000, ctrVol3:50000, ctrVol4:100000, ctrVol5:200000, ctrVol6:500000},
      ],
      socket: null,
      rcvMessage: "",
      showMsg: true,
      tableID: 0,
      userID: "c63p432n1fdk5k0aeta1",
      selectedSeatID: 0,
      userStatus: "",
      betvolTotal: 0,
      currBvol:0,
      counter: 0,
      countFocus: [false, false, false, true, false, false, false, false, false],
      countIndex: 0,
      testValue: 0
    }
  },
  mounted() {
    localStorage.setItem("LoginUser","dev21666")
    localStorage.setItem("Balance","320000")
    localStorage.setItem("RoomID","0")

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
    bAdd1() {
      this.currBvol += this.bCtlVol[1].ctrVol1
      console.log(this.currBvol)
    },
    bAdd2() {
      this.currBvol += this.bCtlVol[1].ctrVol2
    },
    bAdd3() {
      this.currBvol += this.bCtlVol[1].ctrVol3
    },
    bAdd4() {
      this.currBvol += this.bCtlVol[1].ctrVol4
    },
    bAdd5() {
      this.currBvol += this.bCtlVol[1].ctrVol5
    },
    bAdd6() {
      this.currBvol += this.bCtlVol[1].ctrVol6
    },
    bConfirm() {
      this.currBvol = 0
      console.log(this.currBvol)
    },

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
        if(rcvJson.tID == parseInt(localStorage.getItem("RoomID"))) {
          let currentSeatID = 0
          let startPoint = 0

          // get the seaID, assigned by back-end or user slected(TBI)
          let i = 0
          for (i=0; i<6; i++) {
            if(this.roomMsg.names[i] == localStorage.getItem("LoginUser")) {
              currentSeatID = i
              localStorage.setItem("seatID",currentSeatID)
              break
            }
          }

          // TOP player Line(0,1,2): startPoint is first player as the left-top
          // Bottom player Line(5,4,3):
          startPoint = currentSeatID + 2
          if(startPoint > 5) {
            startPoint = startPoint - 6
          }
          
          if(rcvJson.cardsName == "jhCards") {
            this.cards.tID = rcvJson.tID
            this.cards.cardsName =rcvJson.cardsName
            this.cards.cardsPoints = rcvJson.cardsPoints
            this.cards.cardsSuits = rcvJson.cardsSuits
            this.cards.cardsTypes = rcvJson.cardsTypes
            console.log("Cards data received:")
            console.log(this.cards)
          } else {
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
            console.log("Room data received:")
            console.log(this.roomMsg)

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
          }

        } else {
          console.log("Other room data, ignored!")
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
      this.roomMsg.name = localStorage.getItem("LoginUser")
      this.roomMsg.balance = parseInt(localStorage.getItem("Balance"))
      this.socket.send(JSON.stringify(this.roomMsg))
    },
    leaveMessage() {
      this.roomMsg.tID = 0
      this.roomMsg.msgType = "LEAVE"
      this.roomMsg.name = localStorage.getItem("LoginUser")
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
  display: flex;
  justify-content: center;
  text-align: center;
  color: #2c3e50;
  margin-top: 20px;
}

.row-players {
  margin: 5px 0px;
  width:100%;
  height:120;
  background:rgb(255, 255, 255);
  display: flex;
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
