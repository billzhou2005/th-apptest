import Player from "@/components/Player.vue"

export default  {
  components: { Player },
  name: 'Home',
  data() {
    return {
        roomPlayers: [
            { index: 0, BEO: 0, playerName: "UNKNOWN", balance: 0, discard: true, cardsType: "TBD", checkCard: false, counter: 0, focus: false, playerCards: [ { index: 0, points: 0, suits: 0 }, { index: 1, points: 0, suits: 1 }, { index: 2, points: 0, suits: 2 },] },
            { index: 1, BEO: 0, playerName: "UNKNOWN", balance: 0, discard: true, cardsType: "TBD", checkCard: false, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
            { index: 2, BEO: 0, playerName: "UNKNOWN", balance: 0, discard: true, cardsType: "TBD", checkCard: false, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
            { index: 3, BEO: 0, playerName: "UNKNOWN", balance: 0, discard: true, cardsType: "TBD", checkCard: false, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
            { index: 4, BEO: 0, playerName: "UNKNOWN", balance: 0, discard: true, cardsType: "TBD", checkCard: false, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
            { index: 5, BEO: 0, playerName: "UNKNOWN", balance: 0, discard: true, cardsType: "TBD", checkCard: false, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
            { index: 6, BEO: 0, playerName: "UNKNOWN", balance: 0, discard: true, cardsType: "TBD", checkCard: false, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
            { index: 7, BEO: 0, playerName: "UNKNOWN", balance: 0, discard: true, cardsType: "TBD", checkCard: false, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
            { index: 8, BEO: 0, playerName: "UNKNOWN", balance: 0, discard: true, cardsType: "TBD", checkCard: false, counter: 0, focus: false, playerCards: [ { index: 0, points: 1, suits: 1 }, { index: 1, points: 2, suits: 1 }, { index: 2, points: 3, suits: 1 },] },
        ],
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
        checkCard: false,
        discard: true,
        betVol: 0,
        balance: 0,
        robot: false,
        reserve: "TBD",
      },
      roomShare: {
        type: "ROOM",
        rID: 0,
        status: "WAITING",
        gameRound: 0,
        betRound: 0,
        focusID: 0,
        compareID: 0,
        baseVol: 0,
        totalAmount: 0,
        lostSeat: 100,
        defendSeat: 0,
        reserve: "",
      },
      bCtlVol: [
        { ctrVol1:100, ctrVol2:200, ctrVol3:500, ctrVol4:1000, ctrVol5:2000, ctrVol6:5000},
        { ctrVol1:1000, ctrVol2:2000, ctrVol3:5000, ctrVol4:10000, ctrVol5:20000, ctrVol6:50000},
        { ctrVol1:10000, ctrVol2:20000, ctrVol3:50000, ctrVol4:100000, ctrVol5:200000, ctrVol6:500000},
      ],
      socket: null,
      rcvMessage: "",
      cardCheck: false,
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
      this.player.rID = 0
      this.player.msgType = "INITROOM"
      this.player.name = localStorage.getItem("LoginUser")
      this.socket.send(JSON.stringify(this.player))
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
        if(rcvJson.rID == parseInt(localStorage.getItem("RoomID"))) {

            // currentSeatID is bottom-middle, it is from back-end
            let currentSeatID = 0

            // display point = 0(top-left) match to ->back-end seatID
            let startPoint = 0

            startPoint = currentSeatID + 2
            if(startPoint > 5) {
                startPoint = startPoint - 6
            }
            // console.log(rcvJson.type,rcvJson)
            switch (rcvJson.type) {
              case "PLAYER":
                if(rcvJson.msgType !="INITROOM") {
                  console.log("PLAYER:", rcvJson)
                  this.player.pID = rcvJson.pID
                  this.player.msgType = rcvJson.msgType
                  this.player.name = rcvJson.name
                  this.player.seatID = rcvJson.seatID
                  this.player.seatDID = rcvJson.seatDID
                  this.player.betRound= rcvJson.betRound
                  this.player.focus = rcvJson.focus
                  this.player.checkCard = rcvJson.checkCard
                  this.player.discard = rcvJson.discard
                  this.player.betVol = rcvJson.betVol
                  this.player.balance = rcvJson.balance
                  this.player.robot = rcvJson.robot
                  this.player.cards = rcvJson.cards
                  this.player.reserve = rcvJson.reserve

                  let seatDID
                  seatDID = this.player.seatID
                  if(this.player.seatID == 3) {seatDID = 5}
                  if(this.player.seatID == 5) {seatDID = 3}

                  this.roomPlayers[seatDID].playerName = this.player.name
                  this.roomPlayers[seatDID].balance = this.player.balance
                  this.roomPlayers[seatDID].discard = this.player.discard
                  this.roomPlayers[seatDID].checkCard = this.player.checkCard
                  this.roomPlayers[seatDID].focus = this.player.focus
                  //console.log("roomPlayers", this.roomPlayers)
                  /*
                  // The room has 6 person in this test program
                  let j =0
                  let BEO =0
                  for(i=0;i<6;i++) {
                  BEO = this.roomPlayers[i].BEO
                  this.roomPlayers[i].cardType = this.cards.cardsTypes[BEO]
                  for(j=0;j<3;j++) {
                      this.roomPlayers[i].playerCards[j].points = this.cards.cardsPoints[3*BEO+j]
                      this.roomPlayers[i].playerCards[j].suits = this.cards.cardsSuits[3*BEO+j]
                  }

                  // init cardCheck
                  if(this.roomPlayers[i].playerName == localStorage.getItem("LoginUser")) {
                      this.cardCheck = true
                  }
                  } */
                }
              break
              case "ROOM":
                  this.roomShare.status = rcvJson.status
                  this.roomShare.gameRound = rcvJson.gameRound
                  this.roomShare.betRound = rcvJson.betRound
                  this.roomShare.focusID = rcvJson.focusID
                  this.roomShare.compareID = rcvJson.compareID
                  this.roomShare.baseVol = rcvJson.baseVol
                  this.roomShare.totalAmount = rcvJson.totalAmount
                  this.roomShare.lostSeat = rcvJson.lostSeat
                  this.roomShare.defendSeat = rcvJson.defendSeat
                  this.roomShare.reserve = rcvJson.reserve
                  console.log("roomShare", this.roomShare)

                  let seatDID
                  seatDID = this.roomShare.focusID
                  if(this.roomShare.focusID ==3) {
                    seatDID = 5
                  }
                  if(this.roomShare.focusID ==5) {
                    seatDID = 3
                  }
                  if(this.roomShare.focusID < 6) {
                    this.roomPlayers[seatDID].focus = true
                    let i
                    for(i=0; i<6; i++) {
                      if(i != seatDID) {
                        this.roomPlayers[i].focus = false
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
                    this.roomPlayers[i].playerName = rcvJson.players[5]
                    this.roomPlayers[i].balance = rcvJson.balances[5]
                    this.roomPlayers[i].discard = rcvJson.discards[5]
                  }else if(i == 5) {
                    this.roomPlayers[i].playerName = rcvJson.players[3]
                    this.roomPlayers[i].balance = rcvJson.balances[3]
                    this.roomPlayers[i].discard = rcvJson.discards[3]
                  }else{
                    this.roomPlayers[i].playerName = rcvJson.players[i]
                    this.roomPlayers[i].balance = rcvJson.balances[i]
                    this.roomPlayers[i].discard = rcvJson.discards[i]
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
                    this.roomPlayers[i].playerCards[j].points = rcvJson.points[3*seatDID + j]
                    this.roomPlayers[i].playerCards[j].suits = rcvJson.suits[3*seatDID + j]
                    this.roomPlayers[i].cardsType = rcvJson.cardsTypes[seatDID]
                  }
                }
                console.log("roomPlayers",this.roomPlayers)
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