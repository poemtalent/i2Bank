<template>
  <ion-grid>
    <ion-row>
      <ion-col size="7">
        <ion-input placeholder="请输入验证码" type="tel" maxlength=6 minlength=6 v-model="code"
                   @ionChange="emitCode"></ion-input>
      </ion-col>
      <ion-col size="5">
        <ion-button expand="block" :disabled="disable" fill="outline" shape="round" size="default"
                    @click="getVerifyCode">{{
            buttonMessage
          }}
        </ion-button>
      </ion-col>
    </ion-row>
  </ion-grid>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
import {IonButton, IonCol, IonGrid, IonInput, IonRow} from "@ionic/vue";
import http from "@/hooks/http";

export default defineComponent({
  name: 'GetVerifyCode',
  components: {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonInput,
  },
  props: [
    'phone'
  ]
  ,
  data() {
    let buttonMessage = '获取手机验证码';
    let disable = false;
    let code: string = '';
    return {
      buttonMessage,
      disable,
      code
    }
  },

  methods: {
    emitCode: function () {
      this.$emit('emitCode', this.code);
    },
    getVerifyCode: function () {
      let counter = 60;
      this.disable = true;
      // 发起手机验证码请求
      const formData = new FormData();
      console.log('phone:', this.phone);
      formData.append("account", this.phone);
      const result = http('/getCode', formData);
      console.log(result);

      let getCode = setInterval(() => {
        counter--;
        this.buttonMessage = counter + 'S后重发';
        if (counter === 0) {
          this.disable = false;
          this.buttonMessage = '获取手机验证码';
          clearInterval(getCode);
        }

      }, 1000)
    }
  }
});
</script>

<style scoped>

</style>
