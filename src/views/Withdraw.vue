<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-back-button slot="start" text=""></ion-back-button>
        <ion-title>提现</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <key-board v-if="keyBoardShow" @submit="withDraw" @hideKeyboard="hideKeyboard"></key-board>
      <ion-list>
        <ion-item>
          <ion-label>选择卡片：</ion-label>
          <ion-select placeholder="选择卡片" value="0" @ionChange="cardChange" v-model="cardIndex">
            <ion-select-option :value="index" v-for="(card,index) in cardList.data" :key="index">
              {{ card.bankName }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <div class="tips">
          该账号可用余额：{{ cardMoney }}元
        </div>
        <ion-item style="margin-top: 18px">
          <ion-label>请输入提现金额：¥</ion-label>
          <ion-input v-model="money" @keydown="updateMoney"></ion-input>
        </ion-item>
        <ion-item>收款卡号：{{ payeeAccount }}</ion-item>
        <ion-item>
          <get-verify-code @emitCode="getCode" :phone="phone"></get-verify-code>
        </ion-item>
      </ion-list>
      <ion-button expand="block" fill="outline" shape="round" size="default" @click="showKeyboard">确认提现</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import desensitization from '@/hooks/filter'
import {defineComponent, reactive, ref} from 'vue';
import {
  IonSelect,
  IonBackButton,
  IonButton,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar, IonSelectOption, IonInput, IonContent, IonGrid, IonRow, IonCol, alertController
} from "@ionic/vue";
import KeyBoard from "@/components/KeyBoard.vue";
import validateMoney from "@/hooks/validateMoney";
import router from "@/router";
import GetVerifyCode from "@/components/GetVerifyCode.vue";
import http from "@/hooks/http";

export default defineComponent({
  name: 'Withdraw',
  components: {
    GetVerifyCode,
    IonGrid,
    IonRow,
    IonCol,
    KeyBoard,
    IonSelect,
    IonSelectOption,
    IonInput,
    IonContent,
    IonLabel,
    IonList,
    IonItem,
    IonButton,
    IonPage,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle
  },
  setup() {
    const money = ref('');
    const keyBoardShow = ref(false);
    const code = ref('');
    const cardList = reactive({data: [{balance: '', cardNum: ''}]});
    const phone = ref('');
    const payeeAccount = ref('');
    const cardIndex = ref(0);
    const cardMoney = ref('');
    const tipType = ref('');
    const tipsMessage = ref('');


    function updateMoney(event: KeyboardEvent) {
      money.value = validateMoney(money.value, event);
    }

    function hideKeyboard() {
      keyBoardShow.value = false
    }

    function showKeyboard() {
      keyBoardShow.value = true;
    }

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
                  router.push({path: '/success', query:{content:'提现成功'}});
                }
              },
            }],
          });
      return alert.present();
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
      payeeAccount.value = cardList.data[cardIndex.value].cardNum;
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

    async function withDrawRequest(password: string){
      const withDraw = new FormData();
      console.log(`payeeAccount:${payeeAccount.value}--money:${money.value}--password:${password}`)
      withDraw.append('cardNum', payeeAccount.value);
      withDraw.append('money', money.value);
      withDraw.append('password', password);
      const withDrawResult = await http('/card/withdraw',withDraw);
      return withDrawResult
    }

    async function withDraw(password: string) {
      // 检测验证码是否正确
      const checkCodeResult: any = await checkCode();

      // 验证码检验成功
      if (checkCodeResult.data.code === '000000') {
        console.log('验证码校验成功');
        const withDrawResult = await withDrawRequest(password);
        console.log('withDrawResult',withDrawResult);

        // 提现成功
        if (withDrawResult.data.vbankResHead.code === '000000') {
          tipType.value = '成功';
          tipsMessage.value = '操作成功';
          tipMessageAlert();
        }
        // 提现失败
        else {
          tipType.value = '失败';
          tipsMessage.value = withDrawResult.data.vbankResHead.message;
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

      payeeAccount.value = cardList.data[0].cardNum
      console.log('test*****************', cardList.data[0].balance);
      cardMoney.value = cardList.data[0].balance;
      console.log('test*****************', cardList.data[0].balance);
    }

    init()
    return {
      money, updateMoney, keyBoardShow, hideKeyboard, showKeyboard, withDraw, getCode, getCardList,
      getPhone, cardChange, phone, desensitization, cardList, cardIndex, cardMoney, payeeAccount
    };
  },
});
</script>


<style scoped>

</style>
