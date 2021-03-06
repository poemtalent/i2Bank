<template>
  <ion-page>
    <ion-content id="test">
      <ion-searchbar placeholder="请输入搜索内容" showCancelButton="focus" cancel-button-text="取消"></ion-searchbar>
      <ion-slides pager="true" :options="slideOpts">
        <ion-slide>

          <img src="../../public/assets/icon/fund/swiper1.png">
        </ion-slide>
        <ion-slide>
          <img src="../../public/assets/icon/fund/swiper2.png" style="width: 100%;height: 30%;">
          <!--<ion-card>-->
          <!--<ion-grid>-->
          <!--<ion-row>-->
          <!--<ion-col size="5">-->
          <!--3.75%-->
          <!--</ion-col>-->
          <!--<ion-col size="7">-->
          <!--银行日日享-->
          <!--</ion-col>-->
          <!--</ion-row>-->
          <!--<ion-row>-->
          <!--<ion-col size="5">-->
          <!--业绩基准-->
          <!--</ion-col>-->
          <!--<ion-col size="7">-->
          <!--一元起购|最低持有360天-->
          <!--</ion-col>-->
          <!--</ion-row>-->
          <!--</ion-grid>-->
          <!--</ion-card>-->

        </ion-slide>
        <ion-slide>
          <img src="../../public/assets/icon/fund/swiper3.png">

        </ion-slide>
      </ion-slides>
      <ion-grid class="fun-menu">
        <ion-row>
          <ion-col size="3" @click="toMyAccount">
            <ion-img src="assets/img2/我的账户.png"></ion-img>
            <p>我的账户</p>
          </ion-col>
          <ion-col size="3" @click="toTransfer">
            <ion-img src="assets/img2/转账.png"></ion-img>
            <p>转账</p>
          </ion-col>
          <ion-col size="3" @click="toRecharge">
            <ion-img src="assets/img2/充值.png"></ion-img>
            <p>充值</p>
          </ion-col>
          <ion-col size="3" @click="toWithdraw">
            <ion-img src="assets/img2/提现.png"></ion-img>
            <p>提现</p>
          </ion-col>
        </ion-row>
        <ion-row>
          <ion-col size="3" @click="toBindCard">
            <ion-img src="assets/img2/绑卡.png"></ion-img>
            <p>绑卡</p>
          </ion-col>
          <ion-col size="3">
            <ion-img src="assets/img2/存款.png"></ion-img>
            <p>存款</p>
          </ion-col>
          <ion-col size="3">
            <ion-img src="assets/img2/信用卡.png"></ion-img>
            <p>信用卡</p>
          </ion-col>
          <ion-col size="3">
            <ion-img src="assets/img2/贷款.png"></ion-img>
            <p>贷款</p>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-item>热门推荐</ion-item>
      <ion-list>
        <ion-card>
          <ion-item>
            <ion-avatar slot="start">
              <img src="../../public/assets/icon/理财.jpg">
            </ion-avatar>
            <ion-label>
              <h2>银行日日享</h2>
              <h3>3.75%</h3>
              <p>一元起购|最低持有360天</p>
            </ion-label>
          </ion-item>
        </ion-card>


        <ion-item lines="none" class="class1">
          <ion-card>
            <ion-item>
              <ion-avatar slot="start">
                <img src="../../public/assets/icon/理财1.jpg">
              </ion-avatar>
              <ion-label>
                <h2>银行日日享</h2>
                <h3>3.75%</h3>
                <p>一元起购|最低持有360天</p>
              </ion-label>
            </ion-item>
          </ion-card>
        </ion-item>
        <ion-item class="class1">
          <ion-card>
            <ion-item>
              <ion-avatar slot="start">
                <img src="../../public/assets/icon/理财3.jpg">
              </ion-avatar>
              <ion-label>
                <h2>银行日日享</h2>
                <h3>3.75%</h3>
                <p>一元起购|最低持有360天</p>
              </ion-label>
            </ion-item>
          </ion-card>
        </ion-item>
      </ion-list>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {
  IonCard,
  IonCol,
  IonContent,
  IonGrid, IonImg,
  IonItem, IonList,
  IonPage,
  IonRow,
  IonSearchbar,
  IonSlide,
  IonSlides,
  IonLabel,
  IonAvatar, alertController,
} from "@ionic/vue";
import router from "@/router";
import http from "@/hooks/http";

export default defineComponent({
  name: 'Home',
  components: {
    IonItem,
    IonImg,
    IonList,
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
    IonSlides,
    IonSlide,
    IonContent,
    IonSearchbar,
    IonPage,
    IonLabel,
    IonAvatar,

  },
  setup() {
    const tipType = ref('');
    const tipsMessage = ref('');


    async function tipMessageAlert() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: tipType.value,
            message: tipsMessage.value,
            buttons: [{
              text: '否',
              handler: () => {

              },
            },
              {
                text: '是',
                handler: () => {
                  if (tipsMessage.value === '是否前往开户') {
                    router.push('/openAccount')
                  } else if (tipsMessage.value === '是否前往绑卡') {
                    router.push('/bindCard')
                  }
                },
              }],
          });
      return alert.present();
    }

    const slideOpts = ref({
      autoplay: {
        delay: 2000,
        stopOnLastSlide: false,
        disableOnInteraction: false,

      },
      loop: true,
    });

    // 是否已开户
    async function isOpened() {
      console.log('isOpened**********', localStorage.getItem('token'))
      const openResult = await http('user/isOpened');
      console.log('openResult:', openResult);
      if (openResult.data.vbankResHead.code != '0') {
        tipType.value = '未开户';
        tipsMessage.value = '是否前往开户'
        return false
      } else return true;
    }

    // 是否已绑卡
    async function isBind() {
      const bindResult = await http('user/isBind');
      console.log('bindResult:', bindResult)
      if (bindResult.data.vbankResHead.code != '0') {
        return false;
      } else return true
    }

    function toMyAccount() {
      router.push({path: '/myAccount'});
    }


    async function toBindCard() {
      const boolOpen = await isOpened();
      if (!boolOpen) {
        tipMessageAlert()
      }
      else{
        router.push({path: '/bindCard'})
      }

    }

    async function toTransfer() {
      const boolOpen = await isOpened();
      const boolBind = await isBind();
      if (!boolOpen) {
        tipMessageAlert()
      } else if (!boolBind) {
        tipType.value = '未绑卡';
        tipsMessage.value = '是否前往绑卡'
        tipMessageAlert()
      } else {
        console.log('**********************')
        router.push('/transfer')
      }
    }

    async function toRecharge() {
      const boolOpen = await isOpened();
      const boolBind = await isBind();
      if (!boolOpen) {
        tipMessageAlert()
      } else if (!boolBind) {
        tipType.value = '未绑卡';
        tipsMessage.value = '是否前往绑卡'
        tipMessageAlert()
      } else {
        console.log('**********************')
        router.push('/recharge')
      }

    }

    async function toWithdraw() {
      const boolOpen = await isOpened();
      const boolBind = await isBind();
      if (!boolOpen) {
        tipMessageAlert()
      } else if (!boolBind) {
        tipType.value = '未绑卡';
        tipsMessage.value = '是否前往绑卡'
        tipMessageAlert()
      } else {
        console.log('**********************')
        router.push('/withdraw')
      }
    }

    return {slideOpts, toMyAccount, toBindCard, toTransfer, toRecharge, toWithdraw};
  }

});
</script>

<style scoped>
ion-card {
  width: 100%;
}

.fun-menu {
  font-size: 14px;
  text-align: center;
}

.fun-menu p {
  margin-top: 0;
}

.fun-menu ion-img {
  margin: auto;
  width: 25px;
}

.class1 {
  margin: -35px -20px;
}

</style>
