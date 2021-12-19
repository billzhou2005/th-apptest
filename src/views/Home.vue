<template>
  <div class="main">
    <span style="inputLable"> 用 户 名： </span>
    <input class="userInput" v-model="player.username" placeholder="请输入用户名"> <br>
    <span class="inputLable">登录密码：</span>
    <input class="userInput" v-model="player.passwd1" type="password" placeholder="请输入您的密码" > <br>
    <button class="primaryButton" @click="login()">登录</button>
    <router-link to="/register"> --->注册 </router-link>
  </div>
</template>

<script>
import axios from "axios"
export default {
  name: 'Home',
  data() {
    return {
      info: null,
      player: {
        username: "",
        telephone: "",
        passwd1: "",
        passwd2: "",
      }
    }
  },
  methods: {
    logon() {
      console.log(this.player)
      if(this.player.username.length < 5) {
        alert("用户名必须大于4个字符")
      }
      if(this.player.telephone.length == 11) {
        let tel = parseInt(this.player.telephone)
        if(tel > 10000000000) {
          console.log(tel)
        } else {
          alert("手机号码输入只能为数字")
        }
      } else {
        alert("手机号码不为11位")
      }

      if(this.player.passwd1.length > 5 && this.player.passwd1.length < 11) {
        if(this.player.passwd1 != this.player.passwd2) {
          alert("两次密码输入不一致")
        } else {
          console.log(this.player.passwd1)
        }
      } else {
        alert("密码必须6-10个字符")
      }

    },
    login() {
      if(this.player.username.length == 0) {
        alert("用户名不能为空")
        return
      }
      let baseUrl = 'http://140.143.149.188:8080/username/'
      baseUrl += this.player.username
      axios.get(baseUrl)
              .then( response => {
                      this.info = response.data
                      if(this.info.length == 1) {
                        console.log(this.info)
                        if(this.player.passwd1 == this.info[0].passwd) {
                          console.log("准备进入 room ....")
                        } else {
                          alert("用户名或密码错")
                        }

                      } else {
                        console.log(this.info)
                        alert("用户名不存在或错误")
                        return
                      }
              }).catch( error => {
                      console.log(error)
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

.primaryButton {
  width: 100px;
  height: 40px;
  background: green;
  border: none;
  color: white;
  margin: 6px 20px;
  border-radius: 6px;
}
.secondaryButton {
  width: 100px;
  height: 40px;
  background: rgb(0, 45, 128);
  border: none;
  color: white;
  margin: 6px 3px;
  border-radius: 6px;
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
