<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-back-button slot="start" text=""></ion-back-button>
        <ion-title>转账</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <key-board v-if="keyBoardShow" @submit="transfer" @hideKeyboard="hideKeyboard"></key-board>
      <ion-list>
        <ion-item>
          <ion-label>收款人姓名：</ion-label>
          <ion-input v-model="name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>收款人账号：</ion-label>
          <ion-input v-model="payeeAccount"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>收款人开户行：</ion-label>
          <ion-input v-model="payeeBank"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>选择付款账号：</ion-label>
          <ion-select placeholder="选择卡片" value="0" @ionChange="cardChange" v-model="cardIndex">
            <ion-select-option :value="index" v-for="(card,index) in cardList.data" :key="index">
              {{ desensitization(card.cardNum) }}
            </ion-select-option>
          </ion-select>
        </ion-item>
        <div class="tips">
          该卡可用余额：{{ cardMoney }}元
        </div>
        <ion-item style="margin-top: 18px">
          <ion-label>转账金额：¥</ion-label>
          <ion-input v-model="money" @keydown="updateMoney" @ionBlur="serviceFare"></ion-input>
        </ion-item>
        <div class="tips">
          手续费：{{ fare }}元
        </div>
        <ion-item style="margin-top: 18px">
          <get-verify-code @emitCode="getCode" :phone="phone"></get-verify-code>
        </ion-item>
      </ion-list>
      <ion-button expand="block" fill="outline" shape="round" size="default" @click="showKeyboard">确认转账</ion-button>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import desensitization from '@/hooks/filter';
import {defineComponent, ref, reactive} from 'vue';
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
import http from "@/hooks/http";
import GetVerifyCode from "@/components/GetVerifyCode.vue";

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
    const name = ref('');
    const payeeAccount = ref('');
    const payAccount = ref('');
    const payeeBank = ref('');
    const money = ref('');

    const keyBoardShow = ref(false);
    const tipType = ref('');
    const tipsMessage = ref('');
    const code = ref('');
    const phone = ref('');
    const cardList = reactive({data: [{balance: '', cardNum: ''}]});
    const cardIndex = ref(0);
    const cardMoney = ref('');
    const fare = ref('');

    function updateMoney(event: KeyboardEvent) {
      money.value = validateMoney(money.value, event);
    }

    function hideKeyboard() {
      keyBoardShow.value = false
    }

    function showKeyboard() {
      keyBoardShow.value = true;
    }

    function cardChange() {
      payAccount.value = cardList.data[cardIndex.value].cardNum;
      cardMoney.value = cardList.data[cardIndex.value].balance;
    }

    // 错误信息弹出框
    async function tipMessageAlert() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: tipType.value,
            message: tipsMessage.value,
            buttons: [{
              text: '确认',
              handler: () => {
                if (tipsMessage.value === '操作成功') {
                  router.push({path: '/success', query: {content: '转账成功'}});
                }
              },
            }],
          });
      return alert.present();
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

    function getCode(verifyCode: any) {
      code.value = verifyCode;
      // console.log(code.value);
    }

    async function getPhone() {
      const phoneResult = await http('user/getAccount');
      console.log('phoneResult:', phoneResult);
      phone.value = phoneResult.data.data.account;
      console.log('phone.value', phone.value)
    }

    async function transfer(password: string) {
      // 检测验证码是否正确
      const checkCodeResult: any = await checkCode();

      // 验证码检验成功
      if (checkCodeResult.data.code === '000000') {
        console.log('验证码校验成功');
        transferRequest(password);
      }
      // 失败弹出错误信息
      else {
        tipType.value = '错误';
        tipsMessage.value = checkCodeResult.data.msg;

        tipMessageAlert()
      }
    }

    async function serviceFare() {
      const charge = new FormData();
      console.log('付款：',payAccount.value);
      charge.append('card.inCard', payeeAccount.value);
      charge.append('card.outCard', payAccount.value);
      charge.append('card.money', money.value);
      const getServiceCharge = await http('/card/getServiceCharge', charge)

      console.log('getServiceCharge', getServiceCharge);
      if(getServiceCharge.data.vbankResHead.code === '000000'){
        fare.value=getServiceCharge.data.getServiceChargeMap.serviceCharge;
      }
    }

    async function transferRequest(password: string) {
      console.log('正在提现,密码为:', password);
      const transfer = new FormData();
      transfer.append('outCard', payAccount.value);
      transfer.append('inCard', payeeAccount.value);
      transfer.append('money', money.value);
      transfer.append('password', password);
      transfer.append('bankName', payeeBank.value);
      transfer.append('ownerName', name.value);
      const transferRequest = await http('/card/transfer', transfer)
      console.log('transferRequest:', transferRequest)
      // 提现成功
      if (transferRequest.data.vbankResHead.code === '000000') {
        tipType.value = '成功';
        tipsMessage.value = '操作成功';
        tipMessageAlert();
      } else {
        tipType.value = '失败';
        tipsMessage.value = transferRequest.data.vbankResHead.message;
        tipMessageAlert();
      }
      // router.push({path: '/Success', query: {content: '转账成功'}});
    }

    async function getCardList() {
      const cardListResult = await http('/card/cardList')
      console.log('cardListResult', cardListResult)
      cardList.data = cardListResult.data.data;
      console.log('cardList.data', cardList.data);
    }

    async function init() {
      await getCardList();
      await getPhone();
      payAccount.value = cardList.data[0].cardNum;
      console.log('test*****************', cardList.data[0].balance);
      cardMoney.value = cardList.data[0].balance;
      console.log('test*****************', cardList.data[0].balance);
    }

    init()
    return {
      money, updateMoney, keyBoardShow, hideKeyboard, showKeyboard, transfer, name,
      payeeAccount, payeeBank, payAccount, phone, getCode, cardList, desensitization, cardChange,
      cardIndex, cardMoney, serviceFare, fare
    };
  }
});
</script>


<style scoped>

</style>
