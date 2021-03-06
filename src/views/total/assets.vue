<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-back-button style="color:gray;" slot="start"></ion-back-button>
        <ion-title style="color: #333333;background: white">资产详情</ion-title>
        <ion-icon slot="end" name="ellipsis-horizontal-sharp" style="color: white;">
        </ion-icon>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <div id="myChart" class="charp"></div>
      <ion-grid>
        <ion-row>
          <ion-col style="padding-left: 40px;padding-top: 43px;">
            <div>总资产:</div>
          </ion-col>
          <ion-col style="padding-top: 43px;margin-left: -190px;">
            <div>{{ temp.totalAssets }}元</div>
          </ion-col>
          <!--<ion-col style="padding-top: 42px;">-->
          <!--<div>总负债:</div>-->
          <!--</ion-col>-->
          <!--<ion-col style="padding-top: 44px;">-->
          <!--<div>200.89元</div>-->
          <!--</ion-col>-->
        </ion-row>

        <ion-row>
          <ion-col style="padding-top: 23px;padding-left: 40px;">
            <div>电子账户余额:</div>
          </ion-col>
          <ion-col style="padding-top: 23px;margin-left: -20px;" class="class1">
            <div>{{ temp.vcardTotalAssets }}元</div>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col style="padding-top: 23px;padding-left: 40px;">
            <div>一类账户余额:</div>
          </ion-col>
          <ion-col style="padding-top: 23px;margin-left: -20px;" class="class1">
            <div>{{ temp.cardTotalAssets }}</div>
          </ion-col>
        </ion-row>

        <ion-row>
          <ion-col style="padding-top: 23px;padding-left: 40px;">
            <div>理财产品总值:</div>
          </ion-col>
          <ion-col style="padding-top: 23px;margin-left: -20px;" class="class1">
            <div>{{ temp.purchasedTotalAssets }}元</div>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ion-content>
  </ion-page>

</template>

<script lang="ts">
import * as echarts from 'echarts'
import {inject, onMounted, ref} from "vue";
import {
  IonHeader,
  IonToolbar,
  IonBackButton,
  IonTitle,
  IonIcon,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonPage,
} from '@ionic/vue'
import http from "@/hooks/http";
import router from "../../router";

export default {
  name: "assets.vue",
  components: {
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonIcon,
    IonContent,
    IonPage,
    IonGrid,
    IonRow,
    IonCol,
  },

  setup() {
    const echarts: any = inject("ec");//引入
    onMounted(() => {//需要获取到element,所以是onMounted的Hook
      const myChart: any = echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        legend: {
          top: 'bottom'
        },
        toolbox: {
          show: true,

        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: ['50%', '75%'],
            data: [
              {value: Number(bankCard.value), name: '电子账户'},
              {value: Number(cardTwo.value), name: '银行卡'},
              {value: Number(test1.value), name: '理财产品'},
              // {value: 30, name: '负债(信用卡+贷款)'},
            ]
          }
        ]

      });
      window.onresize = function () {//自适应大小
        myChart.resize();
      };
    });

    //   请求后台
    const ionViewWillEnter = () => {
      temp.value = router.currentRoute.value.query;
      cardTwo.value = router.currentRoute.value.query.cardTotalAssets as string;
      bankCard.value = router.currentRoute.value.query.vcardTotalAssets as string;
      test1.value = router.currentRoute.value.query.purchasedTotalAssets as string;
      console.log(temp.value);
      console.log('IIIIIIIIIIIIIIII里面');
    }
    const temp = ref({});
    const cardTwo = ref('');
    const bankCard = ref('');
    const test1 = ref('');

    console.log('外面***********')
    async function total() {
      const result = await http('/user/totalAssets')
      console.log('8437509**********', result)
      // temp.value=result.data.totalAssetsMap
      // test.value=result.data.totalAssetsMap.cardTotalAssets
      // console.log(temp.value)
      // console.log(typeof test.value)
      //  const test1=parseInt(test.value)
      console.log(test1)
    }

    total();
    return {
      temp,
      cardTwo,
      test1,
      ionViewWillEnter,
      bankCard
    };

  },
  mounted() {
    console.log('aa');
  },
}
</script>

<style scoped>
* {
  margin: 0px;
  padding: 0px;
}

.charp {
  width: 330px;
  height: 300px;
}

.class1 {
  position: relative;
  left: -45px;
}


</style>
