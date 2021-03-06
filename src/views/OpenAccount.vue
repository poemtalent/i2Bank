<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-back-button slot="start" text=""></ion-back-button>
        <ion-title>开户</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-item>
          <ion-label>请输入姓名：</ion-label>
          <ion-input v-model="name"></ion-input>
        </ion-item>
        <ion-item>
          <ion-label>请输入身份证号：</ion-label>
          <ion-input v-model="IDNumber" type="text" maxlength="18"></ion-input>
        </ion-item>
        <div class="tips" v-if="!IDNumFormat" v-show="isIDNumEmpty">
          身份证格式不正确
        </div>
        <ion-item>
          <ion-label>请输入手机号：</ion-label>
          <ion-input v-model="phone" type="tel" maxlength=11></ion-input>
        </ion-item>
        <div class="tips" v-if="!phoneFormat" v-show="isPhoneEmpty">
          手机号格式不正确
        </div>
      </ion-list>

      <div class="open-account" @click="toSettingPassword">
        <ion-button expand="block" fill="outline" shape="round">开户</ion-button>
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
    const name = ref('');
    const IDNumber = ref('');
    const phone = ref('');

    // 数据验证区
    const isIDNumEmpty = computed(() => {
      return IDNumber.value.length;
    })

    const IDNumFormat = computed(() => {
      const reg = /^[1-9]\d{5}(18|19|20|(3\d))\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;

      return reg.test(IDNumber.value);
    })

    const isPhoneEmpty = computed(() => {
      return phone.value.length;
    })

    const phoneFormat = computed(() => {
      const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/;

      return reg.test(phone.value);
    })

    async function toSettingPassword() {
      router.push({path: '/settingPassword', query: {phone: phone.value, IDNumber: IDNumber.value, name: name.value}});
    }


    // 值返回区
    return {
      toSettingPassword, name, IDNumber, phone, isIDNumEmpty, IDNumFormat, isPhoneEmpty, phoneFormat
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
