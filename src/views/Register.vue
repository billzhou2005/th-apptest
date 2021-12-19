<template>
  <div class="main">
    <span style="inputLable"> 用 户 名： </span>
    <input class="userInput" v-model="player.username" placeholder="请输入用户名"> <br>
    <span class="inputLable"> 手 机 号： </span>
    <input class="userInput" v-model="player.telephone" placeholder="请输入手机号"> <br>
    <span class="inputLable">登录密码：</span>
    <input class="userInput" v-model="player.passwd" type="password" placeholder="请输入您的密码:6-16个字符" > <br>
    <span class="inputLable">重复密码：</span>
    <input class="userInput" v-model="passwdCompare" type="password" placeholder="请再次输入您的密码" > <br>
    <button :class="duplicatedClass" :disabled= "bNameDuplicated" @click="logon()">注册</button>
    <button class="duplicatedCheck" @click="bCheckNameDuplicated">检查重名</button>
  </div>
</template>

<script>
import axios from "axios"
import router from "../router"

export default {
  name: 'Home',
  data() {
    return {
      info: null,
      player: {
        username: "",
        passwd: "",
        telephone: "",
      },
      passwdCompare: "",
      bNameDuplicated: true,
      duplicatedClass: "fourthButton",
    }
  },
  methods: {
    logon() {
      let bName = false, bTel =false, bPasswd = false
      if(this.player.username.length < 5) {
        alert("用户名必须大于4个字符")
        bName = false
      } else {
        bName = true
      }

      if(this.player.telephone.length == 11) {
        let tel = parseInt(this.player.telephone)
        if(tel > 10000000000) {
          bTel = true
        } else {
          alert("手机号码输入只能为数字")
          bTel = false
        }
      } else {
        alert("手机号码不为11位")
        bTel = false
      }

      if(this.player.passwd.length > 5 && this.player.passwd.length < 11) {
        if(this.player.passwd != this.passwdCompare) {
          alert("两次密码输入不一致")
          bPasswd = false
        } else {
          bPasswd = true
        }
      } else {
        alert("密码必须6-10个字符")
        bPasswd = false
      }
      console.log(this.player)
      if(bName && bTel && bPasswd) {
        console.log("Ready for sending", bName, bTel, bPasswd)
        axios.post('http://140.143.149.188:8080/users', this.player)
              .then( response => {
                      this.info = response.data
                      console.log(this.info)
                      alert("注册成功！")
                      router.push('/')
              }).catch( error => {
                      this.bNameDuplicated = true
                      this.duplicatedClass = "fourthButton"
                      console.log(error)
                      alert("用户名可能已经被注册！")
              })
      }else {
        alert("注册失败！")
      }
    },
    bCheckNameDuplicated() {
      let baseUrl = 'http://140.143.149.188:8080/username/'
      baseUrl += this.player.username
      axios.get(baseUrl)
              .then( response => {
                      this.info = response.data;
                      console.log(this.info)
                      if(this.info.length > 0) {
                        this.bNameDuplicated = true
                        this.duplicatedClass = "fourthButton"
                        alert("用户名已经被使用，重新填写")
                      }
                      else {
                        this.bNameDuplicated = false
                        this.duplicatedClass = "secondaryButton"
                      }
              }).catch( error => {
                      console.log(error);
              })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.main {
  width:100%;
  height:100%;
  justify-content: center;
}

.fourthButton {
  width: 60px;
  height: 40px;
  background: rgb(89, 92, 89);
  border: none;
  color: white;
  margin: 6px 10px;
  border-radius: 6px;
}
.secondaryButton {
  width: 100px;
  height: 40px;
  background: rgb(0, 45, 128);
  border: none;
  color: white;
  margin: 6px 10px;
  border-radius: 6px;
}
.duplicatedCheck {
  color: red;
}
.inputLable {
    width:100px;
    height:40px;
}

.userInput {
    margin:6px;
    text-align:center;
    font-size: 1em;
    width:300px;
    height:40px;
    border: 2px solid #ccbdbd;
}
.password{
    position: relative;
}
.password .n-txtCss{
    width:90% !important;
}
.password .fa{
    position: absolute;
    right: 10px;
    top:15px;
    font-size: 20px;
    cursor: pointer;
}
</style>
