<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-back-button @click="back" slot="start" text=""></ion-back-button>
        <ion-title>账户列表</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-segment color="secondary" value="FirstAccount" scrollable="true">
        <ion-segment-button value="FirstAccount" @click="isFirstAccount">
          <ion-label>一类账户</ion-label>
        </ion-segment-button>
        <ion-segment-button value="EAccount" @click="isEAccount">
          <ion-label>电子账户</ion-label>
        </ion-segment-button>
      </ion-segment>
      <div>
       <component :is="componentName"></component>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {
  IonBackButton,
  IonSegment,
  IonSegmentButton,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar, IonLabel
} from "@ionic/vue";
import router from "@/router";
import FirstAccount from "@/components/FirstAccount.vue";
import EAccount from "@/components/EAccount.vue";
import http from "@/hooks/http";

export default defineComponent({
  name: 'MyAccount',
  components: {
    IonLabel,
    FirstAccount,
    EAccount,
    IonSegmentButton,
    IonSegment,
    IonTitle,
    IonToolbar,
    IonBackButton,
    IonHeader,
    IonContent,
    IonPage,
  },
  setup(){
    const componentName = ref('FirstAccount');
    function back() {
      router.go(-1);
    }

    function isFirstAccount(){
      componentName.value = 'FirstAccount';
    }
    function isEAccount(){
      componentName.value = 'EAccount';
    }

    return {back, componentName, isFirstAccount, isEAccount};
  }
});
</script>

<style scoped>

</style>
