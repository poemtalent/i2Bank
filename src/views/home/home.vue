<template>
  <ion-page>
    <ion-header>
      <ion-router-outlet id="main"></ion-router-outlet>
  <div class="head">
    <ion-grid>
      <ion-row>
        <ion-col size="1">
          <img src="../../../public/assets/icon/_menu.png" @click="openPersonMenu()">
        </ion-col>
        <ion-col size="9">
          <ion-searchbar></ion-searchbar>
        </ion-col>
        <ion-col size="1">
          <img src="../../../public/assets/icon/语音识别.png">
        </ion-col>
        <ion-col size="1">
          <img src="../../../public/assets/icon/加1.png">
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>
</ion-header>

<ion-content>
  <div>
    <ion-slides>
      <ion-slide>
        <div class="slide">
          <div style="font-size: 16px;padding-bottom: 13%;">总资产</div>
          <div style="font-size: 16px">¥{{totalBalance}}</div>
        </div>
      </ion-slide>

      <ion-slide v-for="(card,index) in cards" :key="index">
        <div class="slide">
          <div style="font-size: 16px;padding-bottom: 8%;"><span>卡号：</span>{{card.num}}</div>
          <div style="font-size: 16px;"><span style="letter-spacing: 3px;">余额</span>￥{{card.balance}}</div>
        </div>
      </ion-slide>
    </ion-slides>

    <ion-grid class="grid-first">
      <ion-row >
        <ion-col size="3" style="padding-left: 5%;" >
          <img src="../../../public/assets/icon/wealth.png">
          <p style="font-size: 14px">龙财富</p>
        </ion-col>
        <ion-col size="3" routerLink="/transfer-account"  style="padding-left: 5%;" >
          <img src="../../../public/assets/icon/transferAccount.png">
          <p style="font-size: 14px">转账</p>
        </ion-col>
        <ion-col size="3" style="padding-left: 5%;">
          <img src="../../../public/assets/icon/loan.png">
          <p style="font-size: 14px">快贷</p>
        </ion-col>
        <ion-col size="3" style="padding-left: 5%;">
          <img src="../../../public/assets/icon/payment.png">
          <p style="font-size: 14px">龙支付</p>
        </ion-col>
      </ion-row>
    </ion-grid>
  </div>

  <ion-grid class="grid-second">
    <ion-row >
      <ion-col size="3" style="padding-left: 5%;">
        <img src="../../../public/assets/icon/账户.png">
        <p style="margin:-4px 0px;font-size: 14px;" >账户</p>
      </ion-col>
      <ion-col size="3" style="padding-left: 5%;">
        <img src="../../../public/assets/icon/网点服务.png" style="width: 25px;height: 25px">
        <p style="margin:4px 0px;font-size: 14px;">网点服务</p>
      </ion-col>
      <ion-col size="3" style="padding-left: 5%;">
        <img src="../../../public/assets/icon/理财产品.png" style="width: 25px;height: 25px">
        <p style="margin:4px 0px;font-size: 14px;">理财产品</p>
      </ion-col>
      <ion-col size="3" style="padding-left: 5%;">
        <img src="../../../public/assets/icon/小微快贷.png" style="width: 25px;height: 25px">
        <p style="margin:4px 0px;font-size: 14px;">小微快贷</p>
      </ion-col>
    </ion-row>
  </ion-grid>

  <hr>

  <ion-grid class="grid-second" style="margin: -2px;">
    <ion-row>
      <ion-col size="3" style="padding-left: 5%;">
        <img src="../../../public/assets/icon/_宝贝.png" >
        <p style="margin:4px 0px;font-size: 14px;">龙宝</p>
      </ion-col>
      <ion-col size="3" routerLink="/bind-card" style="padding-left: 5%;">
        <img src="../../../public/assets/icon/一键绑卡.png" style="width: 30px;height: 30px;">
        <p style="margin:4px 0px;font-size: 14px;">一键绑卡</p>
      </ion-col>
      <ion-col size="3" style="padding-left: 5%;">
        <img src="../../../public/assets/icon/商务.png" style="width: 30px;height: 30px;">
        <p style="margin:4px 0px;font-size: 14px;">善融商务</p>
      </ion-col>
      <ion-col size="3" style="padding-left: 5%;">
        <img src="../../../public/assets/icon/加.png" style="width: 30px;height: 30px" >
        <p style="margin:4px 0px;font-size: 14px;">更多</p>
      </ion-col>
    </ion-row>
  </ion-grid>

<ion-slides pager="true">
        <ion-slide>
            <div class="slide">
                <img src="../../../public/assets/icon/fund/swiper1.png"/>
            </div>
        </ion-slide>
        <ion-slide>
            <div class="slide">
                <img src="../../../public/assets/icon/fund/swiper2.png"/>
            </div>
        </ion-slide>
    </ion-slides>

  <ion-row>
    <ion-col>
      <div>
        <img src="../../../public/assets/icon/xinyongka.png" >
      </div>
    </ion-col>
  </ion-row>
  <ion-row>
    <ion-col>
      <div>
        <img src="../../../public/assets/icon/longzhifu.png" >
      </div>
    </ion-col>
  </ion-row>
</ion-content>

<ion-menu side="start" menu-id="first" content-id="main">
  <ion-header>
    <ion-toolbar color="secondary">
      <ion-title>我的</ion-title>
    </ion-toolbar>

  </ion-header>
  <ion-content>
    <ion-list>
      <ion-item>
        <div>
          <ion-avatar><img src="../../../public/assets/icon/头像.png"></ion-avatar>
          <ion-label routerLink="">{{}}</ion-label>
        </div>
      </ion-item>

      <ion-item>
        <ion-avatar><img src="../../../public/assets/icon/充值.png"  style="width: 30px;height: 30px;"></ion-avatar>
        <ion-button routerLink="/recharge">充值</ion-button>
        <ion-button routerLink="/withdraw">提现</ion-button>
      </ion-item>

      <ion-item routerLink="/personal">
        <ion-avatar><img src="../../../public/assets/icon/personInfo.png"  style="width: 30px;height: 30px;"></ion-avatar>
        <ion-label>个人信息查询</ion-label>
      </ion-item>
      <ion-item>
        <ion-avatar><img src="../../../public/assets/icon/交易记录.png"  style="width: 30px;height: 30px;"></ion-avatar>
        <ion-label>交易记录查询</ion-label>
      </ion-item>
      <ion-item>
        <ion-avatar><img src="../../../public/assets/icon/设置.png"  style="width: 30px;height: 30px;"></ion-avatar>
        <ion-label>设置</ion-label>
      </ion-item>
      <ion-item>
        <ion-avatar><img src="../../../public/assets/icon/安全中心.png"  style="width: 30px;height: 30px;"></ion-avatar>
        <ion-label>安全中心</ion-label>
      </ion-item>
      <ion-item routerLink="/login">
        <ion-avatar><img src="../../../public/assets/icon/退出登录.png" style="width: 30px;height: 30px;"></ion-avatar>
        <ion-label>退出登录</ion-label>
      </ion-item>
    </ion-list>
  </ion-content>
</ion-menu>

  </ion-page>
</template>

<script lang="ts">
import {
  IonContent,
  IonHeader,
  IonItem,
  IonGrid,
  IonRow,
  IonCol,
  IonList,
  IonMenu,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  menuController,
  IonSlides,
  IonSlide,
  IonSearchbar,
  IonAvatar,
  IonLabel,
  IonButton,
  IonPage,

    } from '@ionic/vue';
import router from "../../router";
//import ExploreContainer from '@/components/ExploreContainer.vue';

export default {

  data(){
    return{

    }
  },
  methods:{
    openPersonMenu() {
        console.log('openPersonMenu');
        menuController.enable(true, 'first');
        menuController.open('first');
    }
  },
  name: 'Tab1',
  components: {
    IonContent,
    IonHeader,
    IonItem,
    IonGrid,
    IonRow,
    IonCol,
    IonList,
    IonMenu,
    IonRouterOutlet,
    IonTitle,
    IonToolbar,
    IonSlides,
    IonSlide,
    IonSearchbar,
    IonAvatar,
    IonLabel,
    IonButton,
    IonPage,
  }
}

</script>
<style scoped>

.head{
  background-color: #37AEE8;
}
.head ion-col{
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.my-custom-menu {
  --width: 500px;
}

ion-icon {
  color: blue;
}

ion-content > div{
  background-color:  #37AEE8;
  color: white;
}

ion-contention-grid{
  text-align: center;
}

.grid-first img{
  width: 30px;
  height: 30px;
}

.grid-second img{
  width: 32px;
  height: 32px;
}

hr{
  background-color: lightgray;
  margin: 0px;
  padding: 0px;
}
</style>
