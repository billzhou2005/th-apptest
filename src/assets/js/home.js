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
        cards: { points: 0, suits: 0 }[3],
        cardsType: "Highcard",
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

            // get the seaID, assigned by back-end or [user slected(ToBeImplemente)]
            /* let i = 0
            for (i=0; i<6; i++) {
                if(this.roomShare.names[i] == localStorage.getItem("LoginUser")) {
                currentSeatID = i
                localStorage.setItem("seatID",currentSeatID)
                break
                }
            }*/
            startPoint = currentSeatID + 2
            if(startPoint > 5) {
                startPoint = startPoint - 6
            }

            if(rcvJson.type == "PLAYER") {
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
                this.player.cardsType = rcvJson.cardsType
                this.player.reserve = rcvJson.reserve

                this.roomPlayers[this.player.seatID].playerName = this.player.name
                this.roomPlayers[this.player.seatID].balance = this.player.balance
                this.roomPlayers[this.player.seatID].discard = this.player.discard
                this.roomPlayers[this.player.seatID].cardsType = this.player.cardsType
                this.roomPlayers[this.player.seatID].checkCard = this.player.checkCard
                this.roomPlayers[this.player.seatID].focus = this.player.focus
                console.log("roomPlayers", this.roomPlayers)

                let j = 0
                for (j=0; j<3; j++){
                  this.roomPlayers[this.player.seatID].playerCards[j].points = this.player.cards[j].points
                  this.roomPlayers[this.player.seatID].playerCards[j].suits = this.player.cards[j].suits
                }
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
            } else if (rcvJson.type == "ROOM") {
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
                if(this.roomShare.focusID < 9) {
                  this.roomPlayers[this.roomShare.focusID].focus = true
                  let i
                  for(i=0; i<9; i++) {
                    if(i != this.roomShare.focusID) {
                      this.roomPlayers[i].focus = false
                    }
                  }
                }

            } else {
                console.log("Not ROOM or PLAYER data")
            }


        } else {
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