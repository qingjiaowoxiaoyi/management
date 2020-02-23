<template>
    <div class="container">
        <form action="#" class="login-form">
          <h2 style="margin-top: 45px; margin-bottom: 15px;">后 台 登 录</h2>
          <input
            type="text"
            name="username"
            placeholder="用户名"
            v-model="account"
          />
          <input
            type="password"
            name="password"
            placeholder="密码"
            v-model="password"
          />
          <button type="button" @click="handleSubmit">登录</button>
        </form>
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { get,post,put,deletefn } from '@/api/axios';
import axios from 'axios';
@Component({
  components: {
    
  },
})

export default class Login extends Vue {
  account:any='';//账号
  password:any='';//密码

  handleSubmit(){
    const loading = this.$Loading;
    loading.start();
    // post('http://127.0.0.1:3000/admin/login',{account:this.account,password:this.password})
    axios.post('http://127.0.0.1:3000/admin/login',{account:this.account,password:this.password})
    .then((res) => {
      if(res.data.code !== '1'){
        this.$Message.error(res.data.msg);
      } else {
        localStorage.setItem('tokenName', (res as any).data.token);
        this.$Message.info("登入成功");
        this.$router.push("/home"); // 登入成功后跳到首页
      }
    })
    .catch(err => {
       this.$Message.error("登入失败，请检查帐号与密码");
    })
    .finally(() => {
      loading.finish();
    });
  }
}
</script>

<style scoped>
html,
body {
  margin: 0;
  font-family: "PingFang SC", "Microsoft Yahei",
    sans-serif;
}

.container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  /* background: url("https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3453&q=80")
    fixed no-repeat; */
  background: url('../assets/photo-1542273917363-3b1817f69a2d.jpg')
    fixed no-repeat;  
  background-size: cover;
}

.login-form {
  width: 420px;
  height: 400px;
  display: flex;
  flex-direction: column;
  padding: 40px;
  text-align: center;
  position: relative;
  z-index: 100;
  background: inherit;
  border-radius: 18px;
  overflow: hidden; /* 隐藏多余的模糊效果 */
}

.login-form::before {
  content: "";
  width: calc(100% + 20px);
  height: calc(100% + 20px);
  position: absolute;
  top: -10px;
  left: -10px;
  overflow: hidden;
  background: inherit;
  box-shadow: inset 0 0 0 200px
    rgba(255, 255, 255, 0.25);
  filter: blur(6px);
  z-index: -1;
}

.login-form h2 {
  font-size: 18px;
  font-weight: 400;
  color: #3d5245;
}

.login-form input,
.login-form button {
  margin: 6px 0;
  height: 36px;
  border: none;
  background-color: rgba(255, 255, 255, 0.3);
  border-radius: 4px;
  padding: 0 14px;
  color: #3d5245;
}

.login-form input::placeholder {
  color: #3d5245;
}

/* 补充，取消选中高亮蓝框 */
.login-form button:focus,
.login-form input:focus {
  outline: 0;
}

.login-form button {
  margin-top: 24px;
  background-color: rgba(57, 88, 69, 0.4);
  color: white;
  position: relative;
  overflow: hidden;
  cursor: pointer;
  transition: 0.4s;
}

.login-form button:hover {
  background-color: rgba(12, 80, 38, 0.67);
}

.login-form button:focus {
  outline: 0;
}

.login-form button::before,
.login-form button::after {
  content: "";
  display: block;
  width: 80px;
  height: 100%;
  background: rgba(179, 255, 210, 0.5);
  opacity: 0.5;
  position: absolute;
  top: 0;
  left: 0;
  transform: skewX(-15deg);
  filter: blur(30px);
  overflow: hidden;
  transform: translateX(-100px);
}

.login-form button::after {
  width: 40px;
  background: rgba(179, 255, 210, 0.3);
  left: 60px;
  opacity: 0;
  filter: blur(5px);
}

.login-form button:hover::before {
  transition: 1s;
  transform: translateX(320px);
  opacity: 0.7;
}

.login-form button:hover::after {
  transition: 1s;
  transform: translateX(320px);
  opacity: 1;
}

</style>
