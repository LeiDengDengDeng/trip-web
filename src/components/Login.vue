<template>
  <div class="wrap">
    <div class="login-form">
      <img src="../assets/timg.jpeg" style="width:100%;"/>
      <Divider/>
      <div style="margin-top: 20px;">
        <div><b style="color: red;">* </b>用户名：</div>
        <Input prefix="ios-contact" v-model="username" placeholder="请输入用户名" style="width: 100%;margin-top: 5px;"/>
      </div>
      <div style="margin-top: 20px;">
        <div><b style="color: red;">* </b>密码：</div>
        <Input type="password" prefix="ios-lock-outline" v-model="password" placeholder="请输入密码"
               style="width: 100%;margin-top: 5px;"/>
      </div>
      <div style="margin-top: 30px;">
        <Button type="success" style="width: 100%;" @click="loginBtnClick">登录</Button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  methods: {
    loginBtnClick () {
      if (this.username === 'root' && this.password === '123456') {
        this.$router.push({path: '/index'})
      } else {
        this.$Message.error('用户名或密码错误')
      }
    }
  },
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>

<style scoped>
  .wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    background-color: #f8f8f9;
  }

  .login-form {
    padding: 20px 30px;
    text-align: left;
    width: 25%;
    height: 60%;
    margin-top: 100px;
    background-color: #fff;
    box-shadow: 0 1px 1px 0 rgba(0, 0, 0, .1);
  }
</style>
