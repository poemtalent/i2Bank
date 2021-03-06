<template>
  <ion-page>
    <ion-content>
      <div class="welcome">
        欢迎您来到网上银行
      </div>
      <div class="logo-container">
        <ion-avatar class="center">
          <ion-img src="assets/shapes.svg" alt="alt"></ion-img>
        </ion-avatar>
      </div>
      <ion-item>
        <ion-avatar>
          <ion-img src="assets/img2/手机号.png"></ion-img>
        </ion-avatar>
        <ion-input placeholder="请输入手机号" v-model="phone" type="tel" maxlength=11></ion-input>
      </ion-item>
      <div v-if="verifyFormat" v-show="phoneRequired">
        <span class="tips">手机号格式不正确</span>
      </div>
      <ion-item>
        <ion-avatar>
          <ion-img src="assets/img2/密码.png"></ion-img>
        </ion-avatar>
        <ion-input placeholder="请输入密码" type="password" v-model="password" maxlength=18></ion-input>
      </ion-item>
      <div v-if="!passwordFormat" v-show="passwordRequired">
        <span class="tips">密码为6-18位，数字，字母，符号至少两种集合</span>
      </div>
      <ion-item>
        <get-verify-code @emitCode="getCode" :phone="phone"></get-verify-code>
      </ion-item>
      <div class="login">
        <ion-button expand="block" fill="outline" shape="round" size="default" @click="login">登录</ion-button>
      </div>
      <div class="option">
        <span>忘记密码？</span>
        <span @click="toRegister">还未注册？</span>
      </div>
    </ion-content>
  </ion-page>

</template>

<script lang="ts">

import {computed, defineComponent, ref} from 'vue';
import {
  IonGrid,
  IonCol,
  IonRow,
  IonAvatar,
  IonImg,
  IonButton,
  IonContent,
  IonInput,
  IonItem,
  IonPage, alertController,
} from "@ionic/vue";
import router from "@/router";
import http from "@/hooks/http";
import GetVerifyCode from "@/components/GetVerifyCode.vue";

export default defineComponent({

  name: 'Login',
  components: {
    GetVerifyCode,
    IonGrid,
    IonRow,
    IonCol,
    IonAvatar,
    IonImg,
    IonButton,
    IonContent,
    IonPage,
    IonItem,
    IonInput
  },
  setup() {
    const phone = ref('');
    const password = ref('');
    const code = ref('');
    const tipType = ref('');
    const tipsMessage = ref('')

    // 验证区********************
    const verifyFormat = computed(() => {
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      const result = reg.test(phone.value);

      return !result;
    });

    const phoneRequired = computed(() => {
      return phone.value.length;
    });

    const passwordRequired = computed(() => {
      return password.value.length;
    });

    const passwordFormat = computed(() => {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![-=+_.,]+$)[\da-zA-Z-=+_.,]{6,18}$/;
      const result = reg.test(password.value);
      return result;
    });

    // 弹出框区*****************

    // //开户弹出框
    // async function isToOpen() {
    //   const alert = await alertController
    //       .create({
    //         cssClass: 'my-custom-class',
    //         header: '是否前往开户',
    //         buttons: [
    //           {
    //             text: '否',
    //             role: 'cancel',
    //             cssClass: 'secondary',
    //             handler: () => {
    //               //前往首页
    //               router.push('/');
    //             },
    //           },
    //           {
    //             text: '是',
    //             handler: () => {
    //               // 前往开户
    //               router.push('/openAccount');
    //             },
    //           },
    //         ],
    //       });
    //   return alert.present();
    // }
    //
    // //绑卡弹出框
    // async function isToBind() {
    //   const alert = await alertController
    //       .create({
    //         cssClass: 'my-custom-class',
    //         header: '是否前往绑卡',
    //         buttons: [
    //           {
    //             text: '否',
    //             role: 'cancel',
    //             cssClass: 'secondary',
    //             handler: () => {
    //               //前往首页
    //               router.push('/');
    //             },
    //           },
    //           {
    //             text: '是',
    //             handler: () => {
    //               // 前往绑卡
    //               router.push('/bindCard');
    //             },
    //           },
    //         ],
    //       });
    //   return alert.present();
    // }

    //错误信息弹出框
    async function tipMessageAlert() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: tipType.value,
            message: tipsMessage.value,
            buttons: [{
              text: '确认',
              handler: () => {
              },
            }],
          });
      return alert.present();
    }
    async function tipsWithCancel(url:string) {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: tipType.value,
            message: tipsMessage.value,
            buttons: [{
              text: '否',
              handler: () => {
                router.push('/')
              },
            },
              {
                text: '是',
                handler: () => {
                  console.log(url,'url**********')
                  router.push(url)
                },
              }],
          });
      return alert.present();
    }

    // 获取验证码
    function getCode(verifyCode: any) {
      code.value = verifyCode;
      // console.log(code.value);
    }

    // 校验验证码
    async function checkCode(){
      // 检测验证码是否正确
      const checkCode = new FormData();
      checkCode.append('account', phone.value);
      checkCode.append('code', code.value);
      const checkCodeResult = await http('/checkCode', checkCode);
      console.log('checkCodeResult', checkCodeResult.data);
      return checkCodeResult;
    }


    // 是否已开户
    async function isOpened(){
      console.log('isOpened**********', localStorage.getItem('token'))
      const openResult = await http('user/isOpened');
      return openResult
    }

    // 是否已绑卡
    async function isBind(){
      const bindResult = await http('user/isBind');
      return bindResult
    }

    // 登录请求
    async function requestLogin(){
      const loginData = new FormData();
      loginData.append("account", phone.value);
      loginData.append("password", password.value);

      const loginResult = await http('/user/login', loginData);
      console.log('loginResult',loginResult);
      // 登录成功
      if(loginResult.data.vbankResHead.code === '000000'){
        localStorage.setItem('token', loginResult.data.data.token);
        // 验证是否开户
        const isOpenedResult = await isOpened();
        console.log('isOpenedResult',isOpenedResult)

        // 未开户
        if(isOpenedResult.data.vbankResHead.code === '1'){
          tipType.value = '未开户';
          tipsMessage.value = '是否前往开户';
          tipsWithCancel('/openAccount');
        }
      // 已开户
        else{
          const bindResult = await isBind();
          console.log('bindResult',bindResult);
          // 未绑卡
          if(bindResult.data.vbankResHead.code === '1'){
            tipType.value = '未绑卡';
            console.log(tipType.value,'***********tipType');
            tipsMessage.value = '是否前往绑卡';
            tipsWithCancel('/bindCard');
          }
          else {
            router.push('/')
          }


          // 已绑卡
        }
      }

      // 登录失败
      else{
        // 弹出错误信息
        tipType.value = '登录错误';
        tipsMessage.value = loginResult.data.vbankResHead.message;
        tipMessageAlert()
      }
    }

    // 点击登录
    async function login() {
      // 检测验证码是否正确
      const checkCodeResult:any = await checkCode();

      // 验证码检验成功
      if (checkCodeResult.data.code === '000000') {
        console.log('验证码校验成功');
        requestLogin();
      }
      // 失败弹出错误信息
      else {
        tipType.value = '错误';
        tipsMessage.value = checkCodeResult.data.msg;

        tipMessageAlert()
      }
    }

    // 前往注册
    function toRegister() {
      router.push({path: '/register'});
    }


    return {toRegister, phone, verifyFormat, phoneRequired, password, passwordRequired, passwordFormat, login, getCode};
  }
});
</script>

<style scoped>
.logo-container {
  margin-bottom: 50px;
}

.center {
  border: #8A8A8A solid 2px;
  width: 100px;
  height: 100px;
  margin: auto;
}

.welcome {
  margin: 50px 0;
  font-size: 25px;
  font-weight: bolder;
  text-align: center;
  font-family: 华文楷体, Serif;
}

ion-item > ion-avatar {
  margin-right: 20px;
}

.login {
  width: 60%;
  margin: 30px auto;
}

.option {
  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  color: #3880FF;
}

.tips {
  float: right;
  font-size: 10px;
  color: #FF0042;
  margin-right: 20px;
}

ion-item {
  margin-top: 20px;
}
</style>

