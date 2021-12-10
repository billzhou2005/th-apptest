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
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 0, betRound: 0, focus: false, hasCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 1, betRound: 0, focus: false, hasCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 2, betRound: 0, focus: false, hasCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 3, betRound: 0, focus: false, hasCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 4, betRound: 0, focus: false, hasCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 5, betRound: 0, focus: false, hasCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 6, betRound: 0, focus: false, hasCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 7, betRound: 0, focus: false, hasCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
        { type: "PLAYER", rID: 0, pID: "e968cccc", msgType: "JOIN", name: "UNKNOWN", seatID: 100, seatDID: 8, betRound: 0, focus: false, hasCard: false, discard: true, betVol: 0, balance: 0, allin: false, robot: false, reserve: "TBD", cardsType:"UNKNOWN", cards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },]},
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
      rcvMessage: "",
      cardCheck: false,
      tableID: 0,
      userID: "c63p432n1fdk5k0aeta1",
      selectedSeatID: 0,
      userStatus: "",
      betvolTotal: 0,
      bControl:false,
      bFollow: false,
      bFollowAny: false,
      bFollowClass: "fourthButton",
      bFollowAnyClass: "fourthButton",
      currBvol:0,
      counter: 0,
      countIndex: 0,
      testValue: 0
    }
  },
  mounted() {
    localStorage.setItem("LoginUser","dev21666")
    localStorage.setItem("Balance","2000000")
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
      this.player.rID = 0
      this.player.msgType = "INITROOM"
      this.player.name = localStorage.getItem("LoginUser")
      this.socket.send(JSON.stringify(this.player))
    }
    this.socket.onmessage = (evt) => {
        this.acceptMsg(evt)
    }
  },
  methods: {
    bRest() {
      this.currBvol = this.roomShare.minVol
    },
    bAdd1() {
      this.currBvol += this.bCtlVol[2].ctrVol1
      if (this.currBvol > this.roomShare.maxVol) {
        this.currBvol = this.roomShare.maxVol
      }
    },
    bAdd2() {
      this.currBvol += this.bCtlVol[2].ctrVol2
      if (this.currBvol > this.roomShare.maxVol) {
        this.currBvol = this.roomShare.maxVol
      }
    },
    bAdd3() {
      this.currBvol += this.bCtlVol[2].ctrVol3
      if (this.currBvol > this.roomShare.maxVol) {
        this.currBvol = this.roomShare.maxVol
      }
    },
    bAdd4() {
      this.currBvol += this.bCtlVol[2].ctrVol4
      if (this.currBvol > this.roomShare.maxVol) {
        this.currBvol = this.roomShare.maxVol
      }
    },
    bAdd5() {
      this.currBvol += this.bCtlVol[2].ctrVol5
      if (this.currBvol > this.roomShare.maxVol) {
        this.currBvol = this.roomShare.maxVol
      }
    },
    bAdd6() {
      this.currBvol += this.bCtlVol[2].ctrVol6
      if (this.currBvol > this.roomShare.maxVol) {
        this.currBvol = this.roomShare.maxVol
      }
    },
    bClearFunc(){
      this.currBvol = this.roomShare.minVol
    },
    bConfirm() {
      console.log(this.currBvol)
    },
    bFollowFunc(){
      this.bFollow = !this.bFollow
      if (this.bFollow) {
        this.bFollowAny = false
        this.bFollowClass = "primaryButton"
        this.bFollowAnyClass = "fourthButton"
      }
      else {
        this.bFollowClass = "fourthButton"
      }
    },
    bFollowAnyFunc(){
      this.bFollowAny = !this.bFollowAny
      if (this.bFollowAny) {
        this.bFollow = false
        this.bFollowClass = "fourthButton"
        this.bFollowAnyClass = "primaryButton"
      } else {
        this.bFollowAnyClass = "fourthButton"
      }
    },
    bCheckOwnCards() {
      this.roomShare.tID = parseInt(localStorage.getItem("RoomID"))
      this.roomShare.name = localStorage.getItem("LoginUser")
      this.roomShare.msgType = "CHECKCARDS"
      this.cardCheck = false

      console.log(this.roomShare)
      this.socket.send(JSON.stringify(this.roomShare))
    },

    sendMessage(bvol) {
    //  this.socket.send(JSON.stringify(msg))

      // this.getCountFocus(player.seatID)
      // this.counter = 15
      bvol = 0
    },
    sortSeatID(a, b) {
      return a.seatID - b.seatID
    },

    acceptMsg(evt) {
      let rcvJson
      this.rcvMessage = evt.data
      try {
        rcvJson = JSON.parse(evt.data)
        if(rcvJson.rID == parseInt(localStorage.getItem("RoomID"))) {
            let currentSeatID = 0
            let startPoint = 0

            startPoint = currentSeatID + 2
            if(startPoint > 5) {
                startPoint = startPoint - 6
            }
            // console.log(rcvJson.type,rcvJson)
            switch (rcvJson.type) {
              case "PLAYER":
                switch (rcvJson.msgType) {
                  case "INITROOM":
                  case "JOIN":
                    console.log("Self Msg:", rcvJson)
                    break
                  default:
                    this.player = rcvJson
                    let seatID = rcvJson.seatID
                    if(this.player.seatID == 3) {seatID = 5}
                    if(this.player.seatID == 5) {seatID = 3}
                    this.players[seatID] = rcvJson

                    console.log("Player:", this.player)
                    if (this.player.name == localStorage.getItem("LoginUser") && this.player.focus == true) {
                      this.bControl = true
                    }
                    else {
                      this.bControl = false
                    }
                    if(this.player.discard == true) {
                      this.discardsDisp = this.player.cards
                      this.discardsShow = true
                    } else {
                      this.discardsShow = false
                    }
                  }
              break
              case "ROOM":
                  this.roomShare = rcvJson
                  console.log("roomShare", this.roomShare)
                  this.currBvol = rcvJson.minVol

                  let seatDID
                  seatDID = this.roomShare.focusID
                  if(this.roomShare.focusID ==3) {
                    seatDID = 5
                  }
                  if(this.roomShare.focusID ==5) {
                    seatDID = 3
                  }
                  if(this.roomShare.focusID < 6) {
                    this.players[seatDID].focus = true
                    let i
                    for(i=0; i<6; i++) {
                      if(i != seatDID) {
                        this.players[i].focus = false
                      }
                    }
                  }
                break
              case "INITROOM":
                console.log("InitRoom:", rcvJson)
                let i
                this.roomShare.totalAmount = rcvJson.totalAmount
                for(i=0; i<6; i++) {
                  if(i == 3) {
                    this.players[i].name = rcvJson.players[5]
                    this.players[i].balance = rcvJson.balances[5]
                    this.players[i].hasCard = rcvJson.hasCards[5]
                    this.players[i].discard = rcvJson.discards[5]
                  }else if(i == 5) {
                    this.players[i].name = rcvJson.players[3]
                    this.players[i].balance = rcvJson.balances[3]
                    this.players[i].hasCard = rcvJson.hasCards[3]
                    this.players[i].discard = rcvJson.discards[3]
                  }else{
                    this.players[i].name = rcvJson.players[i]
                    this.players[i].balance = rcvJson.balances[i]
                    this.players[i].hasCard = rcvJson.hasCards[i]
                    this.players[i].discard = rcvJson.discards[i]
                  }
                }
              break
              case "CARDS":
                console.log("CARDS", rcvJson)
                let j
                for (i=0;i<9;i++) {
                  let seatDID
                  seatDID = i
                  if(i == 3) {seatDID =5}
                  if(i == 5) {seatDID =3}
                  for (j=0;j<3;j++) {
                    this.players[i].cards[j].points = rcvJson.points[3*seatDID + j]
                    this.players[i].cards[j].suits = rcvJson.suits[3*seatDID + j]
                    this.players[i].cardsType = rcvJson.cardsTypes[seatDID]
                  }
                }
              break
              default:
                console.log("Data Ignored:", rcvJson)
            }
        } else{
          console.log("Other room data, ignored!")
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
      this.player.rID = 0
      this.player.msgType = "JOIN"
      this.player.discard = true
      this.player.name = localStorage.getItem("LoginUser")
      this.player.balance = parseInt(localStorage.getItem("Balance"))
      this.socket.send(JSON.stringify(this.player))
    },
    leaveMessage() {
      this.player.rID = 0
      this.player.msgType = "LEAVE"
      this.player.name = localStorage.getItem("LoginUser")
      this.player.seatDID = 100
      this.player.focus = false
      this.player.discard = true
      this.player.betVol = 0
      this.socket.send(JSON.stringify(this.player))
    },
    roomTestFunc() {
      this.socket.send(JSON.stringify(this.roomTest))
    },
    newRoundTest() {
      this.roomShare.msgType = "NEWROUND"
      this.socket.send(JSON.stringify(this.roomShare))
    },
  }
}