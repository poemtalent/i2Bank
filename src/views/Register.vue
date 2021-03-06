<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-back-button slot="start" text=""></ion-back-button>
      </ion-toolbar>
    </ion-header>
    <ion-content class="content">
      <div class="welcome">欢迎您注册网上银行</div>
      <ion-item>
        <ion-label>
          请输入手机号：
        </ion-label>
        <ion-input v-model="phone" type="tel" maxlength=11 @blur="isRegisted"></ion-input>
      </ion-item>
      <div v-if="phoneShow" v-show="phoneRequired">
        <span class="tips">手机号已注册</span>
      </div>
      <div v-if="verifyFormat" v-show="phoneRequired">
        <span class="tips">手机号格式不正确</span>
      </div>
      <ion-item>
        <ion-label>
          请设置密码：
        </ion-label>
        <ion-input v-model="password" type="password" maxlength=18 minlength=6></ion-input>
      </ion-item>
      <div v-if="!passwordFormat" v-show="passwordRequired">
        <span class="tips">密码为6-18位，数字，字母，符号至少两种集合</span>
      </div>
      <ion-item>
        <ion-label>
          再次输入密码：
        </ion-label>
        <ion-input v-model="rePassword" type="password" maxlength=18 minlength=6></ion-input>
      </ion-item>
      <div v-if="!rePasswordValidate" v-show="rePasswordRequired">
        <span class="tips">两次密码不一致</span>
      </div>
      <ion-item>
        <get-verify-code @emitCode="getCode" :phone="phone"></get-verify-code>
      </ion-item>
      <div class="register">
        <ion-button expand="block" fill="outline" shape="round" size="default" @click="register">注册</ion-button>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, ref, computed} from 'vue';
import {
  alertController,
  IonBackButton, IonButton, IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonRow,
  IonToolbar
} from "@ionic/vue";
import router from "@/router";
import http from "@/hooks/http";
import GetVerifyCode from "@/components/GetVerifyCode.vue";

export default defineComponent({
  name: 'Register',
  components: {
    GetVerifyCode,
    IonGrid,
    IonRow,
    IonCol,
    IonButton,
    IonInput,
    IonItem,
    IonLabel,
    IonToolbar,
    IonBackButton,
    IonPage,
    IonHeader,
    IonContent,
  },

  setup() {
    const phone = ref('');
    const phoneShow = ref(false);
    const password = ref('');
    const rePassword = ref('');
    const code = ref('');
    const tipType = ref('')
    const tipsMessage = ref('未知错误');

// 验证区***************
    const verifyFormat = computed(() => {
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;
      const result = reg.test(phone.value);

      return !result;
    });
    const isRegisted = computed(() => {
      const usedResult = isPhoneUsed();
      console.log('****************',usedResult)
      if (usedResult) {
        return true;
      }
      return false;
    });

    const phoneRequired = computed(() => {
      return phone.value.length;
    });

    const passwordRequired = computed(() => {
      return password.value.length;
    });

    const passwordFormat = computed(() => {
      const reg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![-=+_.,]+$)[\da-zA-Z-=+_.,]{6,18}$/;
      const result = reg.test(password.value);
      return result;
    });

    const rePasswordRequired = computed(() => {
      return rePassword.value.length;
    });

    const rePasswordValidate = computed(() => {
      return password.value === rePassword.value;
    });

    async function isPhoneUsed() {
      const register = new FormData();
      register.append('account', phone.value);
      const useResult = await http('user/isRegister', register);
      console.log('useResult', useResult);
      // 未注册
      if (useResult.data.vbankResHead.code === '010103') {
        phoneShow.value=true
      } else {
        tipType.value = '错误';
        tipsMessage.value = useResult.data.vbankResHead.message;
        phoneShow.value = false
      }
    }

    // 弹出框
    async function tipMessageAlert() {
      const alert = await alertController
          .create({
            cssClass: 'my-custom-class',
            header: tipType.value,
            message: tipsMessage.value,
            buttons: [{
              text: '确认',
              handler: () => {
              },
            }],
          });
      return alert.present();
    }


    // 业务区*******************

    // 将输入框的验证码传给父组件
    function getCode(verifyCode: any) {
      code.value = verifyCode;
      // console.log(code.value);
    }

    async function checkCode() {
      // 检测验证码是否正确
      const checkCode = new FormData();
      checkCode.append('account', phone.value);
      checkCode.append('code', code.value);
      const checkCodeResult = await http('/checkCode', checkCode);
      console.log('checkCodeResult内部函数中：', checkCodeResult);
      return checkCodeResult;
    }

    async function requestRegister() {
      const checkCode = new FormData();
      checkCode.append('user.account', phone.value);
      console.log('手机号:', phone.value)
      checkCode.append('user.password', password.value);
      console.log('密码:', password.value)
      checkCode.append('user.rePassword', rePassword.value);
      console.log('重复密码:', rePassword.value)
      const registerResult = await http('/user/register', checkCode);
      return registerResult;
    }


    async function register() {
      // 验证验证码是否正确
      const checkCodeResult: any = await checkCode();
      console.log('checkCodeResult', checkCodeResult.data.code);
      if (checkCodeResult.data.code === '000000') {
        console.log('验证码正确**********');
        const registerResult: any = await requestRegister();
        console.log('registerResult.data', registerResult.data);

        // 注册成功
        if (registerResult.data.vbankResHead.code === '000000') {
          console.log('注册成功');
          router.push('/login');
        }
        // 注册失败
        else {
          tipType.value = '注册失败';
          // console.log('registerResult.data.message',registerResult.data.vbankResHead.message)
          tipsMessage.value = registerResult.data.vbankResHead.message;
          tipMessageAlert();
        }

      } else {
        console.log('验证码错误**************');
        tipType.value = '错误';
        tipsMessage.value = '验证码错误';
        tipMessageAlert();
      }
    }

    return {
      phone,
      phoneShow,
      verifyFormat,
      isRegisted,
      phoneRequired,
      password,
      passwordRequired,
      passwordFormat,
      rePassword,
      rePasswordRequired,
      rePasswordValidate,
      register,
      code,
      getCode,
    };
  }
});
</script>

<style scoped>
.welcome {
  margin: 50px 0;
  font-size: 25px;
  font-weight: bolder;
  text-align: center;
  font-family: 华文楷体, Serif;
}

.register {
  width: 60%;
  margin: 30px auto;
}

ion-item {
  margin-top: 30px;
}

.tips {
  float: right;
  font-size: 10px;
  color: #FF0042;
  margin-right: 20px;
}
</style>
