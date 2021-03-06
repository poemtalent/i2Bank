<template>
  <ion-card>
    <ion-grid>
      <ion-row>
        <ion-col size="4">
          <div class="card-type">
            II类
          </div>
        </ion-col>
        <ion-col size="8">
          <div class="card-num">{{desensitization(card.data.vcardNum)}}</div>
        </ion-col>
      </ion-row>
      <ion-row>
        <ion-col>
          可用余额
        </ion-col>
        <ion-col>
          ¥{{card.data.balance}}
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
  name: 'EAccount',
  components: {
    IonCard,
    IonGrid,
    IonRow,
    IonCol
  },

  setup() {
    const card = reactive({data: {vcardNum:'',balance:''}});

    async function getECard() {
      const eCardResult = await http('/card/getVcard');
      console.log('eCardResult:', eCardResult)
      card.data = eCardResult.data.data[0];
      console.log(card.data,'card.data****************')
    }

    async function init(){
      await getECard()
    }

    init()
    return {card, desensitization}
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

ion-col {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
