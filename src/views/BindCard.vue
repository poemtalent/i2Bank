<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-back-button defaultHref="/" slot="start" text=""></ion-back-button>
        <ion-title>绑卡</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <key-board v-if="keyBoardShow" @submit="bindCard" @hideKeyboard="hideKeyboard"></key-board>
      <ion-list>
        <ion-item>
          <ion-label>请输入您的姓名：</ion-label>
          <ion-input v-model="name" @ionBlur="matchUserCardNum"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>请输入银行卡号：</ion-label>
          <ion-input type="number" v-model="cardNum" @ionBlur="matchUserCardNum"></ion-input>
        </ion-item>
        <div class="tips" v-if="!matchShow" v-show="cardNum.length">
          姓名卡号不匹配
        </div>
        <ion-item>
          <ion-label>预留手机号：</ion-label>
          <ion-input type="tel" maxlength=11 v-model="phone"></ion-input>
        </ion-item>
        <ion-item>
          <get-verify-code @emitCode="getCode" :phone="phone"></get-verify-code>
        </ion-item>
      </ion-list>
      <ion-button expand="block" fill="outline" shape="round" size="default" @click="showKeyboard">绑卡</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {
  alertController,
  IonBackButton, IonButton, IonCol,
  IonContent, IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage, IonRow, IonTitle,
  IonToolbar
} from "@ionic/vue";
import KeyBoard from "@/components/KeyBoard.vue";
import GetVerifyCode from "@/components/GetVerifyCode.vue";
import http from "@/hooks/http";
import router from "@/router";

export default defineComponent({
  name: 'BindCard',
  components: {
    GetVerifyCode,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonLabel,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonHeader,
    IonInput,
    IonItem,
    IonList,
    IonContent,
    KeyBoard,
    IonPage,
  },
  setup() {
    const keyBoardShow = ref(false);
    const name = ref('');
    const cardNum = ref('');
    const phone = ref('');
    const code = ref('');
    const matchShow = ref(false);
    const tipType = ref('');
    const tipsMessage = ref('');


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
                if (tipsMessage.value==='绑卡成功'){
                  router.push({path: '/success', query:{content:'绑卡成功'}});
                }
              },
            }],
          });
      return alert.present();
    }

    async function matchUserCardNum(){
      const match =  new FormData();
      match.append('userName', name.value);
      match.append('cardNum', cardNum.value);
      console.log('........................');
      const matchResult = await http('/card/matchCardName', match);
      console.log('matchResult', matchResult);
      // 如果匹配
      if (matchResult.data.vbankResHead.code==='00000'){
        matchShow.value = true;
      }
      else {
        matchShow.value = false;
      }
    }


    // 确认绑卡逻辑在这里
    async function bindCard(password: string) {
      console.log('正在进行绑卡操作，密码为：', password);
      const bindCard =  new FormData();
      bindCard.append('user.userName', name.value);
      bindCard.append('user.cardNum', cardNum.value);
      bindCard.append('user.phone', phone.value);
      bindCard.append('user.password', password);
      const bindCardRequest = await http('/user/bind',bindCard)
      console.log('bindCardRequest:', bindCardRequest)

      // 绑卡成功
      if(bindCardRequest.data.vbankResHead.code==='000000'){
        tipType.value = '成功';
        tipsMessage.value = '绑卡成功';
        tipMessageAlert()
      }

      else{
        tipType.value='失败';
        tipsMessage.value = bindCardRequest.data.vbankResHead.message;
        tipMessageAlert()
      }

    }

    function hideKeyboard() {
      keyBoardShow.value = false
    }

    function showKeyboard() {
      keyBoardShow.value = true;
    }

    function getCode(verifyCode: any) {
      code.value = verifyCode;
      console.log(code.value);
    }
    return {name, cardNum, phone, bindCard, hideKeyboard, keyBoardShow, showKeyboard, getCode, matchUserCardNum, matchShow};
  }
});
</script>

<style scoped>

</style>
