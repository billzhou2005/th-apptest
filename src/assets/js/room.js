import Player from "@/components/Player.vue"
import Card from '@/components/Card.vue'

export default  {
  components: { Player, Card },
  name: 'Home',
  data() {
    return {
        player: {
        type: "PLAYER",
        rID: 0,
        pID: "e968cccc",
        msgType: "JOIN",
        name: "UNKNOWN",
        seatID: 100,
        seatDID: 100,
        betRound: 0,
        focus: false,
        hasCard: false,
        showCard: false,
        discard: true,
        betVol: 0,
        balance: 0,
        allin: false,
        robot: false,
        cardsType:"UNKNOWN",
        cards:[ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },],
        reserve: "TBD",
      },
      players: [
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 0, betRound: 0, focus: false, hasCard: false, showCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 1, betRound: 0, focus: false, hasCard: false, showCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 2, betRound: 0, focus: false, hasCard: false, showCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 3, betRound: 0, focus: false, hasCard: false, showCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 4, betRound: 0, focus: false, hasCard: false, showCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 5, betRound: 0, focus: false, hasCard: false, showCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 6, betRound: 0, focus: false, hasCard: false, showCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 7, betRound: 0, focus: false, hasCard: false, showCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 8, betRound: 0, focus: false, hasCard: false, showCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
      ],
      roomShare: {
        type: "ROOM",
        rID: 0,
        status: "WAITING",
        gameRound: 0,
        betRound: 0,
        focusID: 0,
        compareID: 0,
        minVol: 0,
        maxVol: 0,
        totalAmount: 0,
        lostSeat: 100,
        defendSeat: 0,
        reserve: "",
      },
      bCtlVol: [
        { ctrVol1:100, ctrVol2:200, ctrVol3:500, ctrVol4:1000, ctrVol5:2000, ctrVol6:5000},
        { ctrVol1:1000, ctrVol2:2000, ctrVol3:5000, ctrVol4:10000, ctrVol5:20000, ctrVol6:50000},
        { ctrVol1:10000, ctrVol2:20000, ctrVol3:50000, ctrVol4:200000, ctrVol5:500000, ctrVol6:1000000},
      ],
      discardsDisp:[ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },],
      discardsShow: false,
      socket: null,
      cardCheck: false,
      tableID: 0,
      userID: "c63p432n1fdk5k0aeta1",
      selectedSeatID: 0,
      userStatus: "",
      betvolTotal: 0,
      bControl:false,
      bFollow: false,
      bCompare: false,
      bFollowAny: false,
      bDiscard: false,
      bFollowClass: "fourthButton",
      bFollowAnyClass: "fourthButton",
      bDiscardClass: "fourthButton",
      bCompareClass: "fourthButton",
      bCounter: 0,
      bTimeout: false,
      currBvol:0,
      counter: 0,
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
      this.player.rID = 0
      this.player.msgType = "INITROOM"
      this.player.name = localStorage.getItem("LoginUser")
      this.socket.send(JSON.stringify(this.player))
    }
    this.socket.onmessage = (evt) => {
        this.acceptMsg(evt)
    }
    setInterval(() => {
      if (this.bCounter > 0) {
        this.bCounter--
        if (this.bCounter == 0) {
          this.bTimeout = true
          this.player.msgType = "TIMEOUT"
          this.player.betVol = 0
          if(this.player.name != "UNKNOWN" && this.player.seatDID != 100) {
            this.socket.send(JSON.stringify(this.player))
          }
        }
        console.log("Login User operation:", this.bCounter, this.bTimeout)
        if(!this.bTimeout && this.player.name != "UNKNOWN" && this.player.seatID != 100) {
          if(this.bFollow) {
            this.player.msgType = "FOLLOWING"
            if(this.player.balance > this.roomShare.minVol) {
              this.player.betVol = this.roomShare.minVol
              this.player.allin = false
            } else {
              this.player.betVol = this.player.balance
              this.player.allin = true
            }
            this.bFollowFunc()
            this.socket.send(JSON.stringify(this.player))
            this.bCounter = 0
          }
          if (this.bCompare) {
            this.player.msgType = "COMPARING"
            if(this.player.balance > this.roomShare.minVol) {
              this.player.betVol = this.roomShare.minVol
              this.player.allin = false
            } else {
              this.player.betVol = this.player.balance
              this.player.allin = true
            }
            this.bCompareFunc()
            this.socket.send(JSON.stringify(this.player))
            this.bCounter = 0
          }
          if (this.bDiscard) {
            this.player.msgType = "DISCARDING"
            this.player.betVol = 0
            this.bDiscardFunc()
            this.socket.send(JSON.stringify(this.player))
            this.bCounter = 0
          }
        } else {
          console.log(this.bTimeout, this.player.name, this.player.seatID)
        }
      }
    }, 1000)
  },
  methods: {
    bAdd1() {
      this.currBvol += this.bCtlVol[2].ctrVol1
      if (this.currBvol > this.roomShare.maxVol) {
        this.currBvol = this.roomShare.maxVol
      }
      if (this.currBvol > this.player.balance) {
        this.currBvol = this.player.balance
        this.player.allin = true
      }
    },
    bAdd4() {
      this.currBvol += this.bCtlVol[2].ctrVol4
      if (this.currBvol > this.roomShare.maxVol) {
        this.currBvol = this.roomShare.maxVol
      }
      if (this.currBvol > this.player.balance) {
        this.currBvol = this.player.balance
        this.player.allin = true
      }
    },

    bClearFunc(){
      this.currBvol = this.roomShare.minVol
    },
    bConfirm() {
      this.bCounter = 0
      this.player.betVol = this.currBvol
      this.player.msgType = "BCONFIRMING"
      console.log(this.player.name, this.player.msgType)
      this.socket.send(JSON.stringify(this.player))
    },
    bFollowFunc(){
      this.bFollow = !this.bFollow
      if (this.bFollow) {
        this.bFollowClass = "primaryButton"
        this.bDiscard = false
        this.bCompare = false
        this.bDiscardClass = "fourthButton"
        this.bCompareClass = "fourthButton"
      }
      else {
        this.bFollowClass = "fourthButton"
      }
    },
    bCompareFunc(){
      this.bCompare = !this.bCompare
      if(this.bCompare) {
        this.bFollow = false
        this.bDiscard = false
        this.bCompareClass = "thirdButton"
        this.bFollowClass = "fourthButton"
        this.bDiscardClass = "fourthButton"
      } else {
        this.bCompareClass = "fourthButton"
      }
    },
    bDiscardFunc() {
      this.bDiscard = !this.bDiscard
      if(this.bDiscard) {
        this.bDiscardClass = "thirdButton"
        this.bFollow = false
        this.bCompare = false
        this.bFollowClass = "fourthButton"
        this.bCompareClass = "fourthButton"
      } else {
        this.bDiscardClass = "fourthButton"
      }
    },

    acceptMsg(evt) {
      try {
        let rcvMsg
        let i = 0
        rcvMsg = JSON.parse(evt.data)
        console.log("Received:", rcvMsg)
        if(rcvMsg.rID == parseInt(localStorage.getItem("RoomID"))) {
            switch (rcvMsg.type) {
              case "PLAYER":
                switch(rcvMsg.msgType) {
                  case "BCONFIRMING":
                  case "FOLLOWING":
                  case "DISCARDING":
                  case "JOINING":
                  case "LEAVEING":
                  case "COMPARING":
                  case "INITROOM":
                    console.log("Self msg:", )
                  break
                  default:
                    console.log("Player:", rcvMsg.name, rcvMsg.msgType)

                    for(i=0;i<6;i++) {
                      if(rcvMsg.name == this.players[i].name){
                        this.players[i] = rcvMsg
                        if(rcvMsg.name == this.player.name) {
                          this.player = rcvMsg
                        }

                        if(rcvMsg.discard == true) {
                          this.discardsDisp = rcvMsg.cards
                          this.discardsShow = true
                        } else {
                          this.discardsShow = false
                        }
                      }
                    }
                    console.log("this.players:", this.players)
                }
              break
              case "ROOM":
                  this.roomShare = rcvMsg
                  console.log("roomShare", this.roomShare)

                  this.currBvol = this.roomShare.minVol
                  for(i=0;i<6;i++) {
                    if(this.roomShare.focusID == this.players[i].seatID) {
                      this.players[i].focus = true
                      if (this.players[i].name == this.player.name && this.player.hasCard) {
                        this.bControl = true
                        this.bCounter = 10
                        this.bTimeout = false
                      } else {
                        this.bControl = false
                      }
                    } else {
                      this.players[i].focus = false
                    }
                  }
                break
              case "INITROOM":
                this.bTimeout = false
                console.log("InitRoom:", rcvMsg)
                let initRoom = rcvMsg
                let loginUserSeatID = this.getLoginUserSeatID(initRoom)
                console.log("LoginUserSeatID", loginUserSeatID)
                let startSeatID = 0
                if(loginUserSeatID != 100) {
                  startSeatID = loginUserSeatID + 2
                  if(startSeatID >= 6) { startSeatID -= 6 }
                }

                let seatDID = 0
                for(i=0; i<6; i++) {
                  seatDID = i
                  if(seatDID == 3) {
                    this.players[5].seatID = startSeatID
                    this.players[5].seatDID = 5
                  } else if (seatDID == 5) {
                    this.players[3].seatID = startSeatID
                    this.players[3].seatDID = 3
                  } else {
                    this.players[seatDID].seatID = startSeatID
                    this.players[seatDID].seatDID = seatDID
                  }
                  startSeatID++
                  if(startSeatID >=6) { startSeatID = 0 }
                }

                this.roomShare.totalAmount = initRoom.totalAmount
                for(i=0; i<6; i++) {
                  this.players[i].name = initRoom.players[this.players[i].seatID]
                  this.players[i].balance = initRoom.balances[this.players[i].seatID]
                  this.players[i].hasCard = initRoom.hasCards[this.players[i].seatID]
                  this.players[i].discard = initRoom.discards[this.players[i].seatID]

                  if(this.players[i].name == localStorage.getItem("LoginUser") && this.players[i].hasCard) {
                    this.players[i].showCard = true
                    this.player = this.players[i]
                  }else {
                    this.players[i].showCard = false
                  }
                }
              break
              case "CARDS":
                console.log("CARDS", rcvMsg)
                let j
                for (i=0;i<9;i++) {
                  let seatID
                  seatID = this.players[i].seatID
                  for (j=0;j<3;j++) {
                    this.players[i].cards[j].points = rcvMsg.points[3*seatID + j]
                    this.players[i].cards[j].suits = rcvMsg.suits[3*seatID + j]
                    this.players[i].cardsType = rcvMsg.cardsTypes[seatID]
                  }
                }
              break
              default:
                console.log("Data Ignored:", rcvMsg)
            }
        } else{
          console.log("Other room data, ignored!")
          console.log(rcvMsg)
        }
      } catch(e) {
        console.log("error message", e.message)
      }
    },
    WebSocketClose() {
    //  this.socket.send(JSON.stringify(msg))
      this.socket.close()
    },
    getLoginUserSeatID(initRoom) {
      let i = 0
      let seatID = 100
      for(i=0;i<6;i++) {
        if(initRoom.players[i] == localStorage.getItem("LoginUser")) {
          seatID = i
        }
      }
      return seatID
    },
    joinMessage() {
      this.player.rID = 0
      this.player.msgType = "JOINING"
      this.player.robot = false
      this.player.name = localStorage.getItem("LoginUser")
      this.player.balance = parseInt(localStorage.getItem("Balance"))
      this.socket.send(JSON.stringify(this.player))
    },
    leaveMessage() {
      this.player.rID = 0
      this.player.msgType = "LEAVING"
      this.player.name = localStorage.getItem("LoginUser")
      this.player.seatDID = 100
      this.player.focus = false
      this.player.discard = true
      this.player.betVol = 0
      this.socket.send(JSON.stringify(this.player))
    },
  }
}