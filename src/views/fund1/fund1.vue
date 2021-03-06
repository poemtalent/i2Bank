<template>
  <ion-page>
    <ion-header>
      <ion-searchbar placeholder="请输入理财产品名称" v-model="data.search"></ion-searchbar>
      <ion-icon :icon="notifications" slot="end" style="color:white;width: 22px;height: 22px;"></ion-icon>
      <ion-button size="small" color="none" class="btn1" @click="test1()">搜索</ion-button>

    </ion-header>

    <ion-content>
      <div class="bg"></div>

      <ion-col style="padding-left: 10%;color: white">
        <img src="../../../public/assets/icon/收益.png">
        <div class="div1">总资产:￥{{temp.totalAssets}}</div>
      </ion-col>

      <ion-card class="card1">
        <ion-card-content>
          <div class="container">
            <div @click="buyed()">
              <img class="img2" src="../../../public/assets/icon/fund/jiaoyi.png">
              <div style="color: #707070;font-size: 12px;">已购产品</div>
            </div>
            <div>
              <img class="img1" src="../../../public/assets/icon/fund/shouyi.png">
              <div style="color: #707070;font-size: 12px;">收益明细</div>
            </div>
            <div>
              <img class="img3" src="../../../public/assets/icon/fund/fenxin.png">
              <div style="color: #707070;font-size: 12px;">我的定投</div>
            </div>
          </div>
        </ion-card-content>
      </ion-card>

      <div class="slot">
        <ion-item lines="none">
          <ion-label style="font-size: 14px">按收益率排行</ion-label>
          <ion-select interface="popover" style="font-size: 14px">
            <ion-select-option value="">无</ion-select-option>
            <ion-select-option value="1">0-2天</ion-select-option>
            <ion-select-option value="2">3-5天</ion-select-option>
            <ion-select-option value="3">一周内</ion-select-option>
            <ion-select-option value="4">两周内</ion-select-option>
            <ion-select-option value="5">一月内</ion-select-option>
          </ion-select>
        </ion-item>

        <ion-item lines="none">
          <ion-label style="font-size: 14px">按风险排行</ion-label>
          <ion-select interface="popover" style="font-size: 14px">
            <ion-select-option value="">低-高</ion-select-option>
            <ion-select-option value="1">高-低</ion-select-option>
          </ion-select>
        </ion-item>
      </div>

      <ion-card class="card2">
        <ion-item lines="none" @click="btn(item.PId)" v-for="item in items" :key="item.PId">
          <div style="float:left;padding-left: 10px;margin-top: 25px;">
            <div style="font-size: 18px">{{ item.name }}</div>
            <div style="color: red">{{ item.rate }}</div>
            <p style="font-size: 14px;color:grey">业绩基准</p>
          </div>

          <ion-label style="margin-left: 120px;margin-top: 30px;">
            <h3>活期</h3>
            <p style="font-size: 14px;color:grey">1元起购|低风险</p>
          </ion-label>
        </ion-item>
      </ion-card>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {notifications} from 'ionicons/icons';
import {ref, reactive} from 'vue'
import {
  IonPage,
  IonHeader,
  IonSearchbar,
  IonButton,
  IonIcon,
  IonContent,
  IonItem,
  IonLabel,
  IonCard,
  IonCardContent,
  // IonCardContent,
  IonList,
  IonGrid,
  IonRow,
  IonCol,
  IonSelect,
  IonSelectOption,

} from '@ionic/vue'
import router from "../../router";
import http from "@/hooks/http";

export default {
  name: "Tab2",
  components: {
    IonPage,
    IonIcon,
    IonHeader,
    IonSearchbar,
    IonButton,
    IonContent,
    IonItem,
    IonLabel,
    IonCard,
    IonCardContent,
    // IonCardContent
    IonGrid,
    IonList,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
  },

  setup() {
    const items = ref('');
    const data = reactive({
      search: ''
    })

    //请求后台
    async function test() {
      const result = await http('/product/productList');

      items.value = result.data.data;
      console.log(items.value)
    }

    test();
    const temp = ref('')

    async function total() {
      const result = await http('/user/totalAssets')
      temp.value = result.data.totalAssetsMap
      console.log(temp.value)
    }

    total();

    // 关键字搜索

    async function test1() {
      const data1 = new FormData();
      data1.append("key", data.search);
      console.log('ssf', data.search)
      const result = await http('/product/searchProduct', data1);
      console.log(result)
      // items.value = result.data.data;
      // console.log(items.value)
    }

    // test1();


    const btn = (productId: any) => {
      console.log('123')
      console.log(productId)
      router.push({path: '/productdetail', query: {productId: productId}})

    }


    return {
      notifications,
      items,
      btn,
      data,
      test1,
      temp
    }
  },

  methods: {
    buyed() {
      router.push('/buyed')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

.bg {
  background: url(../../../public/assets/icon/fund/bg.png);
  height: 25%;
  width: 100%;
}

ion-header {
  background-color: #09B6F2;
}

ion-searchbar {
  display: flex;
  width: 75%;
  margin: 0px;
  padding: 0px;
  height: 30px;
  top: 8px;
  left: 2%;
  background-color: white;
  border-radius: 20px 20px 20px 20px;
}

ion-select {
  width: 120px;
  height: 20px;
  border: 1px solid black;
  /*border-radius: 10px 10px 10px 10px;*/
}

.btn1 {
  border: 1px solid white;
  border-radius: 35px;
  color: white;
  font-size: 14px;
  letter-spacing: 2px;
  width: 45px;
  height: 22px;
  position: absolute;
  left: 79%;
  top: 14px;
}

img {
  width: 25px;
  height: 25px;
}

ion-col {
  position: relative;
  top: -110px;
}

.div1 {
  padding-left: 70px;
  margin-top: -28px;
}

.card1 {
  position: absolute;
  top: 90px;
  width: 90%;
  left: 5%;
  right: 5%;
}

.card2 {
  margin-top: 10px;
  /*padding: 7px;*/
  width: 92%;
  margin-left: 3%;
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

.slot {
  width: 100%;
  height: 35px;
  background-color: white;
  display: flex;

}


</style>
