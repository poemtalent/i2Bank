<template>
  <ion-card  v-for="card in cardList.data">
    <ion-grid>
      <ion-row>
        <ion-col size="4">
          <div class="card-type">
            I类
          </div>
        </ion-col>
        <ion-col size="8">
          <div class="card-num">{{desensitization(card.cardNum)}}</div>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          可用余额
        </ion-col>
        <ion-col>
          ¥{{card.balance}}
        </ion-col>
      </ion-row>
    </ion-grid>
  </ion-card>
</template>

<script lang="ts">
import {defineComponent, reactive} from 'vue';
import {IonCard, IonCol, IonGrid, IonRow} from "@ionic/vue";
import http from "@/hooks/http";
import desensitization from '@/hooks/filter';

export default defineComponent({
  name: 'FirstAccount',
  components: {
    IonGrid,
    IonRow,
    IonCol,
    IonCard,
  },
  setup(){
    const cardList = reactive({data: [{balance: '', cardNum: ''}]});


    async function getCardList() {
      const cardListResult = await http('/card/cardList')
      console.log('cardListResult', cardListResult)
      cardList.data = cardListResult.data.data;
      console.log('cardList.data', cardList.data);
    }

    async function init(){
      getCardList()
    }

    init()

    return{
      cardList,
      desensitization
    }
  }
});
</script>

<style scoped>
.card-type {
  width: 40px;
  line-height: 40px;
  border-radius: 20px;
  border: 1px #797979 solid;
  text-align: center;
}


card-num {
  line-height: 40px;
}

ion-col{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

</style>
