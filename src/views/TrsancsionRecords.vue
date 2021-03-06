<template>

  <ion-page>
    <ion-header>
      <ion-toolbar color="secondary">
        <ion-back-button slot="start" text=""></ion-back-button>
        <ion-title>用户交易记录</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-card v-for="record in recordsList">
        <ion-grid>
          <ion-row>
            <ion-col size="5">
              交易类型：
            </ion-col>
            <ion-col size="7">
              {{record.type}}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="5">
              付款账户：
            </ion-col>
            <ion-col size="7">
              {{ record.outCard }}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="5">
              收款账户：
            </ion-col>
            <ion-col size="7">
              {{ record.inCard }}
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="5">
              交易金额：
            </ion-col>
            <ion-col size="7">
              {{record.money}} 元
            </ion-col>
          </ion-row>
          <ion-row>
            <ion-col size="5">
              交易时间：
            </ion-col>
            <ion-col size="7">
              {{record.time}}
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {
  IonBackButton,
  IonCard, IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from "@ionic/vue";
import http from "@/hooks/http";

export default defineComponent({
  name: 'TrsancsionRecords',
  components: {
    IonContent,
    IonCard,
    IonGrid,
    IonRow,
    IonCol,
    IonBackButton,
    IonTitle,
    IonToolbar,
    IonHeader,
    IonPage,
  },
  setup() {
    const recordsList = ref([{outCard:'',inCard:'',money:'',type:'',time:''}])
    async function getRecords() {
      const RecordsResult = await http('/user/personalRecords');
      console.log('RecordsResult.data.data:', RecordsResult.data.data)
      recordsList.value = RecordsResult.data.data

    }
    getRecords()

    return{
      recordsList
    }
  }
});
</script>

<style scoped>

</style>
