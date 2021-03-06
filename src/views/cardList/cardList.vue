<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-back-button style="color:grey;" slot="start"></ion-back-button>
                <ion-title style="color: #333333;background:white">卡列表</ion-title>
                <ion-icon slot="end" name="ellipsis-horizontal-sharp" style="color: white;">
                </ion-icon>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ion-list  v-for="item in temp1" >
                <ion-card class="card1">
                    <ion-card-content>
                        <ion-row style="margin-bottom: 4%">
                            <h2 style="font-size: 18px;margin-left:17%;font-weight: 700;color: black">{{item.bankName}}</h2>
                            <ion-col style="margin-left: 3%;margin-top: -1%">
                                <img class="class2"  src="../../../public/assets/icon/睁眼1.png" @click="btn1()" v-if="myeye1">
                                <img class="class2" src="../../../public/assets/icon/眼睛1.png" @click="btn1" v-else>
                            </ion-col>
                        </ion-row>
                        <h2 style="letter-spacing: 1px;margin-left:15%;font-size:20px;line-height: 30px;color: black">
                            <strong v-if="myeye1">{{item.cardNum}}</strong>
                            <strong v-else>{{filter(item.cardNum)}}</strong>
                        </h2>
                        <ion-label>
                            <strong style="color: black;margin-left: 12%">
                                <ion-label style="color: black;padding-left: 7px;" >余额</ion-label>&nbsp;
                                <ion-label style="font-weight: 700" v-if="myeye1">{{item.balance}}</ion-label>
                                <ion-label style="font-weight: 700" v-else>{{money}}</ion-label>
                            </strong>
                        </ion-label>
                    </ion-card-content>
                </ion-card>
            </ion-list>

        </ion-content>
    </ion-page>

</template>

<script lang="ts">
    import {
        IonPage,
        IonHeader,
        IonToolbar,
        IonBackButton,
        IonTitle,
        IonIcon,
        IonContent,
        IonList,
        IonCardContent,
        IonRow,
        IonCol,
        IonLabel,
        IonCard

    } from '@ionic/vue'
    import {eyeOff, eye} from 'ionicons/icons';
    import {ref, computed} from 'vue';
    import filter from '@/hooks/filter';
    import http from "../../hooks/http";

    export default {
        name: "cardList.vue",
        components: {
            IonPage,
            IonHeader,
            IonToolbar,
            IonBackButton,
            IonTitle,
            IonIcon,
            IonContent,
            IonList,
            IonCardContent,
            IonRow,
            IonCol,
            IonLabel,
            IonCard
        },
        setup() {

            // const test = computed(() => {
            //     return filter(temp2.value);
            // })
            const myeye = ref(false);
            const btn = () => {
                myeye.value = !myeye.value;
            }
            const myeye1 = ref(false);
            const btn1 = () => {
                myeye1.value = !myeye1.value;
            }

            const money = ref('*****');
            
            //请求后台

            const temp1=ref('');
            const temp2=ref('');
            async function myself1() {
                const result =  await http('/card/cardList');
                temp1.value = result.data.data
                temp2.value=result.data.data[0].cardNum
                console.log(result)
                console.log(temp2.value)
                console.log(temp1.value)
            }
            myself1();
            return {
                eyeOff,
                eye,
                filter,
                myeye,
                btn,
                myeye1,
                btn1,
                money,
                temp1,
                temp2
            }
        },
    }
</script>

<style scoped>


   .class2{
       position: relative;
       left:10px;
       width:23px;
       height: 23px;
   }
    .card1 {
        width: 86%;
        padding: 0% 0% 5% 0%;
        margin-left: 8%;
        float: left;
        font-family: KaiTi, serif;
        background-image: url("../../../public/assets/icon/4.png");
    }

</style>