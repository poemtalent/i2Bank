<template>
  <ion-page>
    <key-board v-if="keyBoardShow" @submit="buyProduct" @hideKeyboard="hideKeyboard"></key-board>
    <ion-header>
      <ion-toolbar>
        <ion-back-button style="color:grey;" slot="start"></ion-back-button>
        <ion-title style="color: #333333;background:white">赎回产品</ion-title>
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
              <div class="div2"><p style="font-size: 13px"></p>{{ productdata.name }}</div>
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
          <ion-label style="padding-left: 5px;">资金转入账户</ion-label>
          <!--<ion-select interface="popover">-->
          <!--<ion-select-option value="nes">余额</ion-select-option>-->
          <!--</ion-select>-->
          <p>余额</p>
        </ion-item>
        <p class="p2">该账号可用余额:{{ temp2.balance }}</p>
      </div>
      <div class="class3">赎回份数</div>
      <p class="p2">(共XX份)</p>
      <div class="input1" style="border: 1px solid #cccccc">
        <ion-item lines="none">
          <ion-textarea @ionChange="getTotalPrice" placeholder="请输入赎回的份数" style="text-align: center"
                        v-model="count"></ion-textarea>
        </ion-item>
      </div>

      <ion-grid class="class4">
        <ion-row>
          <ion-col>
            <div style="text-align: center;padding-top: 3px;">
              <div style="font-size: 18px;color:red">赎回总金额:{{ totalPrice }}</div>
            </div>
          </ion-col>
        </ion-row>
      </ion-grid>

      <p class="p1">点击确定即代表您本人已经阅读风险揭示，愿意承担投资风险。
      </p>
      <div class="full-width">
        <ion-button expand="full" color="secondary" @click="keybords()">确定
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
  IonButton, alertController
} from '@ionic/vue'
// import router from "../../router";
import KeyBoard from '@/components/KeyBoard.vue'
import {ref, reactive} from 'vue';
import http from "../../hooks/http";
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

    // const test = (password: string) => {
    //     console.log('支付密码为：', password)
    // }

    const hideKeyboard = () => {
      keyBoardShow.value = false
    }

    const keybords = () => {
      keyBoardShow.value = true
    }


    const products = router.currentRoute.value.query.products
    console.log('99', products)
    const data1 = new FormData();
    const temp = products!.toString()
    data1.append("pid", temp)

    const productdata = ref('')

    async function productsell() {
      const result = await http('/product/getPurchasedProductById', data1)
      productdata.value = result.data.data[0]
      price.value = result.data.data[0].unitPrice
      console.log(productdata.value)
    }

    productsell();

    const price = ref(0)
    const count = ref(0);
    const totalPrice = ref(0)

    function getTotalPrice() {
      totalPrice.value = price.value * count.value
    }


    const temp2 = ref('')

    async function buy1() {
      const result = await http('/card/getVcard')
      temp2.value = result.data.data[0]
      console.log(temp2.value)
    }

    buy1();


    // const money=ref('')
    // async function selled() {
    //     const result = await http('/card/getVcard')
    // }

    async function test(password: string) {
      const data2 = new FormData();
      data2.append("pid", temp)
      const temp2 = count.value!.toString()
      data2.append("sharesNum", temp2)
      data2.append("password", password)
      const result = await http('/product/sale', data2)
      console.log(result)
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
                if (tipsMessage.value === '赎回成功') {
                  router.push({path: '/success', query: {content: '赎回成功'}});
                }
              },
            }],
          });
      return alert.present();
    }

    async function buyProduct(password: string) {
      const saleProduct = new FormData();
      saleProduct.append('pid', temp);
      saleProduct.append('sharesNum', count.value.toString());
      saleProduct.append('password', password);
      const buyResult = await http('/product/sale', saleProduct);
      console.log('buyResult:', buyResult);
      if (buyResult.data.vbankResHead.code === '10030') {
        tipType.value = '成功';
        tipsMessage.value = '赎回成功'
        tipMessageAlert()
      } else {
        tipType.value = '错误';
        tipsMessage.value = buyResult.data.vbankResHead.message;
        tipMessageAlert()
      }
    }


    return {
      keyBoardShow,
      test,
      keybords,
      hideKeyboard,
      temp,
      productdata,
      temp2,
      price,
      count,
      totalPrice,
      getTotalPrice,
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
