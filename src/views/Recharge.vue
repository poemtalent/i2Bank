<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-back-button slot="start" text=""></ion-back-button>
        <ion-title>充值</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <key-board v-if="keyBoardShow" @submit="Rechange" @hideKeyboard="hideKeyboard"></key-board>
      <ion-list>
        <ion-item>
          <ion-label>选择卡片：</ion-label>
          <ion-select placeholder="选择卡片" value="0" @ionChange="cardChange" v-model="cardIndex">
            <ion-select-option :value="index" v-for="(card,index) in cardList.data" :key="index">
              {{ desensitization(card.cardNum) }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <div class="tips">
          该账号可用余额：{{ cardMoney }}元
        </div>
        <ion-item style="margin-top: 18px">
          <ion-label>请输入金额：¥</ion-label>
          <ion-input v-model="money" @keydown="updateMoney"></ion-input>
        </ion-item>
        <ion-item>
          <get-verify-code @emitCode="getCode" :phone="phone"></get-verify-code>
        </ion-item>
      </ion-list>
      <ion-button expand="block" fill="outline" shape="round" size="default" @click="showKeyboard">充值</ion-button>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import desensitization from '@/hooks/filter'
import {defineComponent, reactive, ref} from 'vue';
import {
  alertController,
  IonBackButton, IonButton, IonCol,
  IonContent, IonGrid,
  IonHeader, IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage, IonRow, IonSelect, IonSelectOption,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import validateMoney from '@/hooks/validateMoney'
import KeyBoard from "@/components/KeyBoard.vue";
import router from "@/router";
import http from "@/hooks/http";
import GetVerifyCode from "@/components/GetVerifyCode.vue";

export default defineComponent({
  name: 'Recharge',
  components: {
    GetVerifyCode,
    KeyBoard,
    IonButton,
    IonGrid,
    IonCol,
    IonRow,
    IonInput,
    IonSelectOption,
    IonSelect,
    IonItem,
    IonLabel,
    IonList,
    IonContent,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonPage,
  },
  setup() {
    const phone = ref('');
    const money = ref('');
    const keyBoardShow = ref(false);
    const code = ref();
    const cardList = reactive({data: [{balance: '', cardNum: ''}]});
    const cardIndex = ref(0);
    const cardMoney = ref('')
    const payAccount = ref('');
    const tipType = ref('');
    const tipsMessage = ref('');


    // 验证区
    function updateMoney(event: KeyboardEvent) {
      money.value = validateMoney(money.value, event);
    }

    // 弹框区

    async function tipMessageAlert() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: tipType.value,
            message: tipsMessage.value,
            buttons: [{
              text: '确认',
              handler: () => {
                if (tipsMessage.value==='操作成功'){
                  router.push({path: '/success', query:{content:'充值成功'}});
                }
              },
            }],
          });
      return alert.present();
    }


    function hideKeyboard() {
      keyBoardShow.value = false
    }

    function showKeyboard() {
      keyBoardShow.value = true;
    }

    // 业务区
    function getCode(verifyCode: any) {
      code.value = verifyCode;
      // console.log(code.value);
    }

    async function getCardList() {
      const cardListResult = await http('/card/cardList')
      console.log('cardListResult', cardListResult)
      cardList.data = cardListResult.data.data;
      console.log('cardList.data', cardList.data);
    }

    async function getPhone() {
      const phoneResult = await http('user/getAccount');
      console.log('phoneResult:', phoneResult);
      phone.value = phoneResult.data.data.account;
      console.log('phone.value', phone.value)
    }

    function cardChange() {
      payAccount.value = cardList.data[cardIndex.value].cardNum;
      cardMoney.value = cardList.data[cardIndex.value].balance;
    }

    // 校验验证码
    async function checkCode() {
      // 检测验证码是否正确
      const checkCode = new FormData();
      checkCode.append('account', phone.value);
      checkCode.append('code', code.value);
      const checkCodeResult = await http('/checkCode', checkCode);
      console.log('checkCodeResult', checkCodeResult.data);
      return checkCodeResult;
    }

    async function rechangeRequest(password: string) {
      const recharge = new FormData();
      recharge.append('cardNum', payAccount.value);
      recharge.append('money', money.value);
      recharge.append('password', password);
      const rechangeResult = await http('/card/recharge', recharge);
      console.log('rechangeResult', rechangeResult);
      return rechangeResult;
    }

    async function Rechange(password: string) {
      // 检测验证码是否正确
      const checkCodeResult: any = await checkCode();

      // 验证码检验成功
      if (checkCodeResult.data.code === '000000') {
        console.log('验证码校验成功');
        const rechangeResult = await rechangeRequest(password);

        // 充值成功
        if(rechangeResult.data.vbankResHead.code === '000000'){
          tipType.value='成功';
          tipsMessage.value = '操作成功';
          tipMessageAlert();
        }
        // 充值失败
        else {
          tipType.value='失败';
          tipsMessage.value = rechangeResult.data.vbankResHead.message;
          tipMessageAlert();
        }
      }
      // 失败弹出错误信息
      else {
        tipType.value = '错误';
        tipsMessage.value = checkCodeResult.data.msg;

        tipMessageAlert()
      }

      console.log('正在充值,密码为:', password);

      // router.push({path: 'success', query: {content: '充值成功'}});
    }

    async function init() {
      await getCardList();
      await getPhone();

      payAccount.value=cardList.data[0].cardNum
      console.log('test*****************', cardList.data[0].balance);
      cardMoney.value = cardList.data[0].balance;
      console.log('test*****************', cardList.data[0].balance);
    }

    init()
    return {
      money, updateMoney, keyBoardShow, hideKeyboard, showKeyboard, cardList, cardIndex,
      Rechange, phone, getCode, desensitization, cardChange, payAccount, cardMoney
    };
  }

});
</script>

<style scoped>

</style>
