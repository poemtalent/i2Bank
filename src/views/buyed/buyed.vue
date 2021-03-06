<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-back-button style="color:grey;" slot="start"></ion-back-button>
                <ion-title style="background: white">已购产品</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-card class="card2" v-for="i in temp">
                <ion-item lines="none" @click="buydetails(i.pId)" >
                    <div style="float: left;padding-left: 20px;">
                        <div style="font-size: 18px">{{i.productName}}</div>
                        <div style="color: red;padding-top: 7px;" >{{i.rate}}</div>
                        <!--<p style="font-size: 14px;color:grey">业绩基准</p>-->
                    </div>

                    <ion-label style="margin-left: 120px;margin-top: 30px;">
                        <h3 style="padding-top: 7px;padding-left: 10px;">{{i.risk}}</h3>
                        <!--<p style="font-size: 14px;color:grey">1元起购|低风险</p>-->
                    </ion-label>
                </ion-item>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import {
        IonPage,
        IonHeader,
        IonTitle,
        IonContent,
        IonBackButton,
        IonToolbar,
        IonCard,
        IonItem,
        IonLabel,
    } from '@ionic/vue'
    import router from "../../router";
    import http from "@/hooks/http";
    import {ref} from "vue"

    export default {
        name: "buyed",
        components: {
            IonPage,
            IonHeader,
            IonTitle,
            IonContent,
            IonBackButton,
            IonToolbar,
            IonCard,
            IonItem,
            IonLabel,
        },

        setup() {
            const temp = ref('')
            async function buyed() {
                const result = await http('/product/purchasedInfo')
                temp.value = result.data.data
                console.log('12345',temp.value)
                console.log(result)
            }
            buyed();



            const buydetails = (products:any) => {
                console.log(products);
                router.push({path:'/buydetails',query:{products:products}})
            }

            return {
                temp,
                buydetails
            }
        },
    }
</script>

<style scoped>
    * {
        margin: 0px;
        padding: 0px;
    }

    ion-content {
        position: relative;
        --background: white;
    }

    .card2 {
        margin-top: 25px;
        padding: 7px;
        width: 92%;
        margin-left: 4%;
    }


</style>