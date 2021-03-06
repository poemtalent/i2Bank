<template>
  <ion-page>
    <key-board v-if="keyBoardShow" @submit="buyProduct" @hideKeyboard="hideKeyboard"></key-board>
    <ion-header>
      <ion-toolbar>
        <ion-back-button style="color:grey;" slot="start"></ion-back-button>
        <ion-title style="color: #333333;background:white">购买产品</ion-title>
        <ion-icon slot="end" name="ellipsis-horizontal-sharp" style="color: white;">
        </ion-icon>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid style="padding-top: 10px; padding-left: 10px;">
        <ion-row>
          <ion-col>
            <div class="class1">
              <div class="div1">产品名称</div>
              <div class="div2"><p style="font-size: 13px">{{ temp1.name }}</p></div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid style="padding-top: 10px; padding-left: 10px;">
        <ion-row>
          <ion-col>
            <div class="class1">
              <div class="div1">收益特点</div>
              <div class="div2">非保本浮动利益</div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <ion-grid style="padding-top: 10px; padding-left: 10px;">
        <ion-row>
          <ion-col>
            <div class="class1">
              <div class="div1">支付方式</div>
              <div class="div2">一次</div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>
      <div class="class2">
        <ion-item lines="none">
          <ion-label style="padding-left: 5px;"> 选择账户</ion-label>
          <!--<ion-select interface="popover">-->
          <!--<ion-select-option value="nes">余额</ion-select-option>-->
          <!--</ion-select>-->
          <p>余额</p>
        </ion-item>
        <p class="p2">该账号可用余额:{{ temp2.balance }}</p>
      </div>
      <div class="class3">购买份数</div>
      <div class="input1" style="border: 1px solid #cccccc">
        <ion-item lines="none">
          <ion-textarea @ionChange="getTotalPrice" placeholder="请输入购买的份数" style="text-align: center"
                        v-model="count"></ion-textarea>
        </ion-item>
      </div>

      <ion-grid class="class4">
        <ion-row>
          <ion-col>
            <div style="text-align: center;padding-top: 10px;">
              <div style="font-size: 18px;color:red">所需金额:{{ totalPrice }}</div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <p class="p1">点击确定即代表您本人已经阅读风险揭示，愿意承担投资风险。
      </p>
      <div class="full-width">
        <ion-button expand="full" color="secondary" @click="keybord()">确定
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonTitle,
  IonHeader,
  IonContent,
  IonToolbar,
  IonIcon,
  IonBackButton,
  IonRow,
  IonGrid,
  IonCol,
  IonItem,
  IonLabel,
  IonSelectOption,
  IonSelect,
  IonTextarea,
  IonButton, alertController,
} from '@ionic/vue'
//import router from "../../router";

import KeyBoard from '@/components/KeyBoard.vue'
import {ref, computed, reactive} from 'vue';
import validateMoney from '@/hooks/validateMoney';
import http from "@/hooks/http";
import router from "../../router";

export default {
  name: "buy.vue",
  components: {
    KeyBoard,
    IonPage,
    IonTitle,
    IonHeader,
    IonContent,
    IonToolbar,
    IonIcon,
    IonBackButton,
    IonRow,
    IonGrid,
    IonCol,
    IonItem,
    IonLabel,
    IonSelectOption,
    IonSelect,
    IonTextarea,
    IonButton
  },
  setup() {
    const keyBoardShow = ref(false);


    const hideKeyboard = () => {
      keyBoardShow.value = false
    }

    const keybord = () => {
      keyBoardShow.value = true
    }

    //请求后台
    const myid = router.currentRoute.value.query.myid
    console.log(myid)
    const data1 = new FormData();
    const temp = myid!.toString()
    data1.append("pid", temp)
    const temp1 = ref('')

    const price = ref(0)
    const count = ref(0);
    const totalPrice = ref(0)

    function getTotalPrice() {
      totalPrice.value = price.value * count.value
    }

    const tipType = ref('');
    const tipsMessage = ref('');


    async function tipMessageAlert() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: tipType.value,
            message: tipsMessage.value,
            buttons: [{
              text: '确认',
              handler: () => {
                if (tipsMessage.value==='购买成功'){
                  router.push({path: '/success', query:{content:'购买成功'}});
                }
              },
            }],
          });
      return alert.present();
    }

    async function buyProduct(password:string){
      const buyProduct = new FormData();
      buyProduct.append('pid', temp);
      buyProduct.append('sharesNum', count.value.toString());
      buyProduct.append('password', password);
      const buyResult = await http('/product/purchase',buyProduct);
      console.log('buyResult:', buyResult);
      if(buyResult.data.vbankResHead.code==='000000'){
        tipType.value='成功';
        tipsMessage.value='购买成功'
        tipMessageAlert()
      }
      else {
        tipType.value='错误';
        tipsMessage.value=buyResult.data.vbankResHead.message;
        tipMessageAlert()
      }
    }



    async function buy() {
      const result = await http('/product/getProductById', data1)
      temp1.value = result.data.data[0]
      price.value = result.data.data[0].unitPrice
      console.log(temp1.value)
      return result
    }
    buy()

    const temp2 = ref('')

    async function buy1() {
      const result = await http('/card/getVcard')
      temp2.value = result.data.data[0]
      console.log(temp2.value)
    }

    buy1();

    async function test(password: string) {
      const data2 = new FormData();
      data2.append("pid", temp)
      const temp2 = count.value!.toString()
      data2.append("sharesNum", temp2)
      data2.append("password", password)
      // console.log('78789',data.num);
      const result = await http('/product/purchase', data2)
      console.log(result)
    }

    return {
      keyBoardShow,
      test,
      hideKeyboard,
      keybord,
      temp1,
      temp2,
      price,
      totalPrice,
      getTotalPrice,
      count,
      buyProduct
    }
  }
}

</script>

<style scoped>

* {
  margin: 0px;
  padding: 0px;
}

ion-content {
  position: relative;
  --background: #ffffff;
}

ion-row {
  position: relative;
}

.class1 {
  width: 100%;
  height: 50px;
}

.class2 {
  position: absolute;
  top: 180px;
  width: 100%;
}

.class3 {
  position: absolute;
  top: 270px;
  left: 38%;
  font-size: 18px;
}

.class4 {
  position: relative;
  top: 180px;
}

.div1 {
  display: inline-block;
  position: absolute;
  width: 25%;
  height: 50px;
  color: #373838;
  line-height: 50px;
  font-size: 14px;
  font-weight: bolder;
  text-align: center;
}

.div2 {
  display: inline-block;
  width: 75%;
  display: flex;
  position: absolute;
  left: 25%;
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  color: #666666;
  word-wrap: break-word;
  font-weight: bolder;
}

.input1 {
  display: flex;
  position: absolute;
  top: 300px;
  left: 70px;
}

.p1 {
  position: absolute;
  top: 435px;
  font-size: 13px;
  color: #696969;
}

.p2 {
  display: flex;
  justify-content: flex-end;
  color: red;
  font-size: 14px;
  padding-top: 5px;
}

.full-width {
  position: absolute;
  bottom: 100px;
  width: 100%;
}


</style>
