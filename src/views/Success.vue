<template>
  <ion-page>
    <ion-content>
      <div class="container">
        <ion-img src="assets/img2/成功.png"></ion-img>
        <div class="withdraw">{{ contextType }}</div>
        <div class="button" @click="confirm">
          <div>完成</div>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {IonContent, IonImg, IonPage} from "@ionic/vue";
import router from "@/router";
import {useRoute} from 'vue-router'

export default defineComponent({
  name: 'Success',
  components: {
    IonContent,
    IonImg,
    IonPage,
  },
  setup() {
    const contextType = ref('成功');

    // const route = useRoute();

    function confirm() {
      router.push('/')
    }

   // function init(){
   //   console.log('success page',route.query.content)
   //   if (typeof route.query.content === 'string') {
   //     contextType.value = route.query.content
   //   }
   // }
   //
   // init()
    return {confirm, contextType}
  },
  ionViewWillEnter(){
    this.contextType = this.$route.query.content!.toString()
  },
  mounted() {
    // console.log('mounted', this, typeof this.$route.query.content);
    // if(typeof this.$route.query.content === "string"){
    //   this.contextType = this.$route.query.content
    // }
  },
});
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

ion-img {
  width: 30%;
  flex: 5;
}

.withdraw {
  flex: 4;
  color: #003DFF;
  font-size: 25px;
}

.button {
  flex: 3;
}

.button > div {
  background-color: #00CC00;
  color: white;
  font-size: 35px;
  padding: 10px 30px;
}
</style>
