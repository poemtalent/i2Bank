<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-back-button slot="start" text=""></ion-back-button>
        <ion-title>确认支付密码</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>请设置支付密码：</ion-label>
          <ion-input v-model="password" type="tel" maxlength=6 minlength=6></ion-input>
        </ion-item>
        <div class="tips" v-if="!passwordFormat" v-show="isPasswordEmpty">
          请输入6位数字
        </div>
        <ion-item>
          <ion-label>确认支付密码：</ion-label>
          <ion-input v-model="rePassword" type="tel" maxlength=6 minlength=6></ion-input>
        </ion-item>
      </ion-list>
      <div class="tips" v-if="!isSame" v-show="isRePasswordEmpty">
        两次密码不一致
      </div>

      <div class="open-account">
        <ion-button expand="block" fill="outline" shape="round" @click="conOpen">确认开户</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {computed, defineComponent, ref} from 'vue';
import {
  alertController,
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonInput, IonItem, IonLabel,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import router from "@/router";
import http from "@/hooks/http";

export default defineComponent({
  name: 'OpenAccount',
  components: {
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonHeader,
    IonToolbar,
    IonBackButton,
    IonTitle,
    IonContent,
    IonPage,
  },
  setup() {
    const password = ref('');
    const rePassword = ref('');
    const tipType = ref('您的电子账号为：');
    const tipsMessage = ref('62135078954354645') //用于显示错误信息，以及开户成功的账号回显信息
    const name = ref<string>('');
    const phone = ref('');
    const IDNum = ref('');
    if (typeof router.currentRoute.value.query.name === 'string'){
      name.value = router.currentRoute.value.query.name
    }
    if (typeof router.currentRoute.value.query.phone === 'string'){
      phone.value = router.currentRoute.value.query.phone
    }
    if (typeof router.currentRoute.value.query.IDNumber === 'string'){
      IDNum.value = router.currentRoute.value.query.IDNumber
    }



    // 验证区********************
    const isPasswordEmpty = computed(() => {
      return password.value.length;
    })

    const passwordFormat = computed(() => {
      const reg = /^[0-9]{6}$/;
      return reg.test(password.value);
    })

    const isRePasswordEmpty = computed(() => {
      return rePassword.value.length;
    })

    const isSame = computed(() => {
      return password.value === rePassword.value;
    })

    // 提示框区************************
    async function isToBind() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: '是否前往绑卡',
            buttons: [
              {
                text: '否',
                role: 'cancel',
                cssClass: 'secondary',
                handler: () => {
                  //前往首页
                  router.push('/');
                },
              },
              {
                text: '是',
                handler: () => {
                  // 前往绑卡
                  router.push('/bindCard');
                },
              },
            ],
          });
      return alert.present();
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
                if (tipType.value === '成功'){
                  // 询问是否前往绑卡
                  isToBind()
                }
              },
            }],
          });
      return alert.present();
    }

    // 交互区*******************
    async function conOpen() { //确认开户
      // 向后端发送请求，获取返回值，tipMessageAlert会根据返回值决定显示的内容
      const open = new FormData();
      open.append('user.name', name.value);
      open.append('user.idNum', IDNum.value);
      open.append('user.phone', phone.value);
      open.append('user.password', password.value);
      open.append('user.rePassword', rePassword.value);

      console.log('正在开户')
      const openAccountResult = await http('/user/open', open);
      console.log('openAccountResult.data:', openAccountResult.data);

      // 开户成功
      if(openAccountResult.data.vbankResHead.code === '000000'){
        tipType.value = '成功';
        tipsMessage.value = '您的电子账户为：' + openAccountResult.data.vcard.vcardNum;
        tipMessageAlert()
      }
      // 开户失败
      else{
        tipType.value = '错误'
        tipsMessage.value = openAccountResult.data.vbankResHead.message
        tipMessageAlert()
      }
    }

    return {
      password, rePassword, isPasswordEmpty, passwordFormat, isRePasswordEmpty, isSame, conOpen,
    }
  }
});
</script>
<style scoped>
.open-account {
  width: 70%;
  margin: 50px auto;
}

</style>
