<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-back-button style="color:grey;" slot="start"></ion-back-button>
        <ion-title style="color: #333333;background:white">个人信息</ion-title>
        <ion-icon slot="end" name="ellipsis-horizontal-sharp" style="color: white;">
        </ion-icon>
      </ion-toolbar>
    </ion-header>

    <ion-content>
      <ion-grid>
        <div>
          <ion-row>
            <div class="div1">
              <ion-col size="3">
                <span style="color: red;padding-right: 8px;font-size: 18px;">*</span> 姓名
              </ion-col>
            </div>
            <div class="div2">
              <ion-col size="3" style="letter-spacing: 2px;">
                {{ temp.name }}
              </ion-col>
            </div>
            <div class="div3">
              <ion-col size="3">
              </ion-col>
            </div>
          </ion-row>
        </div>

        <div>
          <ion-row>
            <div class="div1">
              <ion-col size="3">
                <span style="color: red;padding-right: 8px;font-size: 18px;">*</span> 性别
              </ion-col>
            </div>
            <div class="div2">
              <ion-col size="3">
                {{ temp.gender }}
              </ion-col>
            </div>
          </ion-row>
        </div>


        <div>
          <ion-row>
            <div class="div1">
              <ion-col size="3">
                <span style="color: red;padding-right: 8px;font-size: 18px;">*</span>国籍
              </ion-col>
            </div>
            <div class="div2">
              <ion-col size="3" style="letter-spacing: 2px">
                {{ temp.nationality }}
              </ion-col>
            </div>
          </ion-row>
        </div>
        <div>
          <ion-row>
            <div class="div1">
              <ion-col size="3">
                <span style="color: red;padding-right: 3px;font-size: 18px;">*</span> 证件类型
              </ion-col>
            </div>
            <div class="div8">
              <ion-col size="3" style="letter-spacing: 2px;">
                {{ temp.cert_type }}
              </ion-col>
            </div>
          </ion-row>
        </div>

        <div>
          <ion-row>
            <div class="div1">
              <ion-col size="3">
                <span style="color: red;padding-right: 6px;font-size: 18px;">*</span>证件号码
              </ion-col>
            </div>
            <div class="div8">
              <ion-col size="3">
                {{ temp.cert_num }}
              </ion-col>
            </div>
          </ion-row>
        </div>

        <div>
          <ion-row>
            <div class="div1">
              <ion-col size="3" style="padding-left: 3px;">
                我的星级
              </ion-col>
            </div>
            <div class="div4">
              <ion-col size="3">
              </ion-col>
            </div>
            <div class="div5">
              <ion-col size="3">
              </ion-col>
            </div>
          </ion-row>
        </div>

        <div>
          <ion-row>
            <div class="div1">
              <ion-col size="3" style="padding-left: 3px;">
                快贷二维码
              </ion-col>
            </div>
            <div class="div6">
              <ion-col size="3">
              </ion-col>
            </div>
            <div class="div7">
              <ion-col size="3">
              </ion-col>
            </div>
          </ion-row>
        </div>

        <div>
          <ion-row>
            <div class="div1" style="padding-right: 10px;">
              <ion-col size="9">
                <ion-input type="number" value="" v-model="test.phone">手机号码：</ion-input>
              </ion-col>
            </div>
            <div class="div8">
              <ion-col size="9">

              </ion-col>
            </div>
          </ion-row>
        </div>


        <div>
          <ion-row>
            <div class="div1">
              <!--<div v-for="(key, values, index) in address">{{key}}, {{ values}} , {{index}}</div>-->
              <span>联系地址：</span>
              <select name="province" id="province" v-model="data2">
                <option v-for="item in provices" selected="selected">{{ item }}</option>
              </select>

              <select>
                <option v-for="citys in cityitem" selected="selected">{{ citys }}</option>
              </select>
            </div>
          </ion-row>
        </div>


        <div>
          <ion-row>
            <div class="div1">
              <ion-input v-model="test.address">详细地址：</ion-input>
            </div>
            <div class="div9">
              <ion-col size="3">
              </ion-col>
            </div>
          </ion-row>
        </div>
      </ion-grid>

      <div class="full-width" @click="update()">
        <ion-button expand="full" color="secondary" style="letter-spacing: 5px;" @click="presentAlert">修改
        </ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonToolbar,
  IonHeader,
  IonIcon,
  IonBackButton,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonInput,
  IonButton,
  alertController,
} from '@ionic/vue'
import {defineComponent, ref, computed, reactive} from 'vue';
import http from "../../hooks/http";
import router from "@/router";

export default defineComponent({
  name: "personal.vue",
  components: {
    IonPage,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonContent,
    IonHeader,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
    IonButton
  },

  setup() {
    const data = ['北京', '河北', '河南', '广东', '广西', '四川', '上海']
    const data1 = {
      北京: ['北京'],
      河北: ['石家庄', '保定市', '秦皇岛', '唐山市', '邯郸市', ' 邢台市', '沧州市', '承德市', '廊坊市', '衡水市', '张家口'],
      河南: ['郑州市', '洛阳市', '焦作市', '商丘市', '信阳市', '  新乡市', '安阳市', '开封市', '平顶山', '三门峡', '濮阳市'],
      广东: ['广州市', '江门市', ' 佛山市', '汕头市', '湛江市', '韶关市', '中山市', '珠海市', '茂名市', '肇庆市', '阳江市', '惠州市', '潮州市', '揭阳市', '清远市', '东莞市'],
      广西: ['南宁市', '贺州市', '柳州市', '桂林市', '梧州市', '北海市', '玉林市', '钦州市', '百色市', '防城港', '贵港市', '河池市', '崇左市', '来宾市'],
      四川: ['乐山市', '雅安市', '广安市', '南充市', '自贡市', '泸州市', '内江市', '宜宾市', '广元市', '达州市', '资阳市', '绵阳市', '眉山市', '巴中市', '攀枝花', '遂宁市', '德阳市'],
      上海: ['上海市']
    }
    const provices = ref(data);
    console.log(provices.value)
    const citys: any = reactive(data1);
    console.log(citys)

    const data2 = ref('')
    const cityitem = computed(() => {
      const data3 = data2.value;
      return citys[data3];
    })

    const test = reactive({
      phone: '',
      address: ''
    })

    //请求后台
    const temp = ref('');

    async function myself() {
      const result = await http('/user/getPersonInfo');
      temp.value = result.data.getPersonInfoMap
      console.log(temp.value)
    }

    myself();

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
                router.push('/')
              },
            }],
          });
      return alert.present();
    }

    async function update(password: string) {
        const data = new FormData()
        data.append('user.phone', test.phone)
        data.append('user.address', test.address)
        const updateResult = await http('/user/updatePersonInfo', data)
      console.log('updateResult:', updateResult);
      if (updateResult.data.vbankResHead.code === '000000') {
        tipType.value = '成功';
        tipsMessage.value = '修改成功'
        tipMessageAlert()
      } else {
        tipType.value = '错误';
        tipsMessage.value = updateResult.data.vbankResHead.message;
        tipMessageAlert()
      }
    }

    // async function update() {
    //   const data = new FormData()
    //   console.log('999', test.phone)
    //   console.log('222', test.address)
    //   data.append('user.phone', test.phone)
    //   data.append('user.address', test.address)
    //   const result = await http('/user/updatePersonInfo', data)
    //   console.log(result)
    // }



    return {
      provices,
      citys,
      data2,
      cityitem,
      temp,
      data,
      test,
      update,
    }

  },

  // watch: {
  //     myProvince: function () {
  //         const temp = this.myProvince;
  //         console.log(temp);
  //         //shi.value= address.value[temp];
  //     }
  // },
})


</script>

<style scoped>

* {
  margin: 0px;
  padding: 0px;
}

ion-content {
  position: relative;
  --background: #EEEEEE;
}

ion-grid {
  background-color: white;
}

ion-row {
  background-color: white;
  width: 100%;
  height: 50px;
  line-height: 50px;
  border-bottom: 1px solid #E6E6E6;
}

ion-col {
  font-size: 14px;
}

.div1 {
  padding-left: 2%;
  color: #333333;
}

.div2, .div8 {
  padding-left: 27%;
  color: #666666;
}

.div8 {
  padding-left: 19%;
}

.div3 {
  padding-left: 35%;
  background: url(../../../public/assets/icon/touxiang.png) no-repeat;
  position: relative;
  top: 10px;
  left: 30%;
}

.div4 {
  padding-left: 30%;
  background: url(../../../public/assets/icon/xingji.png) no-repeat;
  position: relative;
  top: 10px;
  left: 24%;
}

.div5, .div7, .div9 {
  padding-left: 30%;
  background: url(../../../public/assets/icon/right.png) no-repeat;
  position: relative;
  top: 10px;
  left: 40%;
}

.div6 {
  padding-left: 30%;
  position: relative;
  top: 10px;
  left: 20%;
  background: url(../../../public/assets/icon/erweima.png) no-repeat;
}

.div7 {
  padding-left: 30%;
  top: 10px;
  left: 35%;
}

.div9 {
  padding-left: 30%;
  top: 10px;
  left: 61%;
}

.full-width {
  position: absolute;
  bottom: 30px;
  width: 100%;
}


</style>
