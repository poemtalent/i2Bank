<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title style="color: white;background:#09B6F2">我的</ion-title>
        <ion-icon :icon="notifications" slot="end" style="color:white;width: 22px;height: 22px;"></ion-icon>
        <ion-icon :icon="power" style="color:white;width: 22px;height: 22px;" @click="out()"></ion-icon>
      </ion-toolbar>

    </ion-header>
    <ion-content>
      <ion-item lines="none" style="--background:#09B6F2;padding-bottom: 10px;">
        <ion-avatar slot="start" style="width: 58px;height: 58px;" @click="personal()">
          <img src="../../../public/assets/icon/2.jpg" style="padding-bottom: 3px;">
        </ion-avatar>
        <ion-label>
          <h2 style="padding-left: 20px;color: white;letter-spacing: 2px;">你好!{{ temp.name }}</h2>
        </ion-label>
      </ion-item>

      <ion-card>
        <ion-card-content style="margin: 0px;padding: 0px">
          <div class="container">
            <div @click="buyed()">
              <img class="img2" src="../../../public/assets/icon/fund/touzi.png">
              <div style="color: #707070;font-size: 12px;">开户</div>
            </div>
            <div @click="card()">
              <img class="img1" src="../../../public/assets/icon/银行卡.png">
              <div style="color: #707070;font-size: 12px;">银行卡</div>
            </div>
            <div @click="toRecord">
              <img class="img3" src="../../../public/assets/icon/客服.png">
              <div style="color: #707070;font-size: 12px;">交易记录</div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <div class="span1" @click="total1()">
        <span>资产总值</span>
        <span class="span2">></span>
      </div>


      <ul style="background-color:white;margin: 0px;padding: 0px;">
        <li style="list-style-type: none">
          <ion-row>
            <ion-col>
              <div>
                <span class="class7">我的资产:</span>
                <p style="position: relative;top:150px;padding-left: 55px;">￥{{ temp3.totalAssets }}</p>
              </div>
            </ion-col>
          </ion-row>
        </li>
      </ul>

      <div class="span1" style="padding-top: 20px;" @click="cardList()">
        <span>卡列表</span>
        <span class="span3">></span>
      </div>

      <ul style="background-color:white;margin: 0px">
        <li style="list-style-type: none">
          <ion-row>
            <ion-col size="9">
              <div>
                <span class="class6" style="font-size: 16px">{{ temp1.bankName }}</span>
                <div class="div2">
                  <img src="../../../public/assets/icon/睁眼1.png" @click="btn()" v-if="myeye">
                  <img src="../../../public/assets/icon/眼睛1.png" @click="btn()" v-else>
                </div>
              </div>
            </ion-col>
            <ion-col size="9">
              <div style="padding-top: 20px;">
                <span class="class3" style="font-size: 15px" v-if="myeye">{{ temp2 }}</span>
                <span class="class3" style="font-size: 15px" v-else>{{ test }}</span>
                <p style="position: relative;top:90px;left:210px;font-size: 15px" @click="btn()" v-if="myeye">
                  可用余额：{{ temp1.balance }}</p>
                <p style="position: relative;top:90px;left:210px;font-size: 15px" @click="btn()" v-else>
                  可用余额：{{ money }}</p>
              </div>
            </ion-col>
          </ion-row>
        </li>
      </ul>

      <div class="span1" style="padding-top: 20px;" @click="credit()">
        <span>信用卡列表</span>
        <p class="span4">></p>
      </div>

      <ul style="background-color:white;margin: 0px">
        <li style="list-style-type: none">
          <ion-row>
            <ion-col size="9">
              <span class="class6" style="font-size: 16px">艾融信用卡</span>
              <div class="div1">
                <img src="../../../public/assets/icon/睁眼1.png" @click="btn1()" v-if="myeye1">
                <img src="../../../public/assets/icon/眼睛1.png" @click="btn1()" v-else>
              </div>
            </ion-col>
            <ion-col size="9">
              <div style="padding-top: 20px;">
                <span class="class3" style="font-size: 15px" v-if="myeye1">{{ temp2 }}</span>
                <span class="class3" style="font-size: 15px" v-else>{{ test }}</span>
                <p style="position: relative;top:90px;left:210px;font-size: 15px" @click="btn1()" v-if="myeye1">
                  剩余可用：45.00</p>
                <p style="position: relative;top:90px;left:210px;font-size: 15px" @click="btn1()" v-else>
                  可用余额：{{ money }}</p>
              </div>
            </ion-col>
          </ion-row>
        </li>
      </ul>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonIcon,
  IonItem,
  IonAvatar,
  IonLabel,
  IonCard,
  IonCardContent,
  // IonGrid,
  IonRow,
  IonCol,
  //IonImg,

} from '@ionic/vue';

import {notifications, power, eyeOff, eye} from 'ionicons/icons';
import router from "../../router";
import {ref, computed} from 'vue';
import filter from '@/hooks/filter';
import http from "@/hooks/http";

export default {
  // data() {
  //     return {}
  // },

  name: 'Tab3',
  components: {
    IonPage,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonIcon,
    IonItem,
    IonAvatar,
    IonLabel,
    IonCard,
    IonCardContent,
    // IonGrid,
    IonRow,
    IonCol,
    //IonImg
  },
  setup() {
    const test = computed(() => {
      return filter(temp2.value);
    })
    console.log('99990', test)
    const myeye = ref(false);
    const btn = () => {
      myeye.value = !myeye.value;
    }
    const myeye1 = ref(false);
    const btn1 = () => {
      myeye1.value = !myeye1.value;
    }

    const money = ref('*****');

    //请求后台
    const temp = ref('');

    async function myself() {
      const result = await http('/user/getPersonInfo');
      temp.value = result.data.getPersonInfoMap
      console.log(temp.value)
    }

    myself();

    const temp1 = ref({});
    const temp2 = ref('');

    async function myself1() {
      const result = await http('/card/cardList');
      temp1.value = result.data.data[0]
      temp2.value = result.data.data[0].cardNum
      console.log(temp2.value)
      console.log(temp1.value)
    }

    myself1();

    //   请求后台
    const temp3 = ref({})

    async function total() {
      const result = await http('/user/totalAssets')
      temp3.value = result.data.totalAssetsMap
      console.log('temp3', temp3.value)
    }

    total();

    const total1 = () => {
      router.push({path: "/total", query: temp3.value})
    }
    function toRecord(){
      router.push('/userRecords')
    }

    return {
      toRecord,
      notifications,
      power,
      eyeOff,
      eye,
      test,
      myeye,
      btn,
      myeye1,
      btn1,
      money,
      temp,
      temp1,
      temp2,
      temp3,
      total1
    }
  },
  methods: {
    personal() {
      router.push('/personal')
    },
    cardList() {
      router.push('/cardList')
    },
    credit() {
      router.push('/credit')
    },
    card() {
      router.push('/cardList')
    },

    out() {
      router.push('/login')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

ion-card {
  position: relative;
  width: 90%;
  left: 5%;
  right: 5%;
  padding: 0px;
}

.container {
  height: 50px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  background-color: white;
}

.img1, .img2, .img3 {
  width: 25px;
  height: 25px;
}

ion-col {
  position: relative;
  top: -110px;
}

.class3, .class6, .class7 {
  position: relative;
  top: 110px;
  width: 40%;
  padding-left: 20px;
  font-size: 18px;
}

.class6 {
  top: 130px;
}

.class7 {
  top: 135px;
}

ul {
  position: relative;
  width: 92%;
  height: 100px;
  border: 1px solid #cccccc;
  border-radius: 10px 10px 10px 10px;
  top: 25px;
  margin: 15px 0px;
  left: 4%;
}

.span1 {
  display: flex;
  position: relative;
  top: 19px;
  left: 5%;
  font-size: 18px;
}

.span2, .span3, .span4 {
  position: relative;
  left: 65%;
}

.span3 {
  left: 70%;
}

.span4 {
  left: 61%;
}

.div1, .div2 {
  width: 23px;
  height: 23px;
  position: relative;
  top: 109px;
  left: 120px;
}
</style>
