<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-back-button style="color:grey;" slot="start"></ion-back-button>
                <ion-title style="color: #333333;background:white">信用卡列表</ion-title>
                <ion-icon slot="end" name="ellipsis-horizontal-sharp" style="color: white;">
                </ion-icon>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <ul style="background-color:white;margin: 0px">
                <li style="list-style-type: none">
                    <ion-row>
                        <ion-col class="class1">
                            <span>艾融银行</span>
                            <img class="class2" src="../../../public/assets/icon/睁眼1.png" @click="btn()" v-if="myeye">
                            <img class="class2" src="../../../public/assets/icon/眼睛1.png" @click="btn" v-else>
                        </ion-col>
                        <ion-col class="class3">
                            <span @click="btn()" v-if="myeye">{{account}}</span>
                            <span @click="btn()" v-else>{{test}}</span>
                            <span style="padding-top: 7px;" @click="btn()" v-if="myeye">可用余额:￥500.00</span>
                            <span style="padding-top: 7px;" @click="btn()" v-else>可用余额：{{money}}</span>

                        </ion-col>
                    </ion-row>
                </li>
            </ul>

            <ul class="bg" style="background-color:white;margin: 15px 0px;">
                <li style="list-style-type: none">
                    <ion-row>
                        <ion-col class="class4">
                            <img class="class2"  src="../../../public/assets/icon/睁眼1.png" @click="btn1()" v-if="myeye1">
                            <img class="class2" src="../../../public/assets/icon/眼睛1.png" @click="btn1" v-else>
                        </ion-col>
                        <ion-col class="class3">
                            <span @click="btn1()" v-if="myeye1">{{account}}</span>
                            <span @click="btn1()" v-else>{{test}}</span>
                            <span style="padding-top: 7px;" @click="btn1()" v-if="myeye1">可用余额:￥500.00</span>
                            <span style="padding-top: 7px;" @click="btn1()" v-else>可用余额：{{money}}</span>
                        </ion-col>
                    </ion-row>
                </li>
            </ul>

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
        IonRow,
        IonCol
    } from '@ionic/vue'
    import {eyeOff, eye} from 'ionicons/icons';
    import {ref, computed} from 'vue';
    import filter from '@/hooks/filter';

    export default {
        name: "credit.vue",
        components: {
            IonPage,
            IonHeader,
            IonToolbar,
            IonBackButton,
            IonTitle,
            IonIcon,
            IonContent,
            IonRow,
            IonCol
        },
        setup() {
            const account = ref('3243555678932456789');
            const test = computed(() => {
                return filter(account.value);
            })
            const myeye = ref(false);
            const btn = () => {
                myeye.value = !myeye.value;
            }
            const myeye1 = ref(false);
            const btn1 = () => {
                myeye1.value = !myeye1.value;
            }

            const money = ref('*****')

            return {
                eyeOff,
                eye,
                account,
                test,
                myeye,
                btn,
                myeye1,
                btn1,
                money
            }
        },
    }
</script>

<style scoped>

    ul {
        background: url("../../../public/assets/icon/4.png");
        position: relative;
        width: 92%;
        height: 125px;
        border: 1px solid #cccccc;
        border-radius: 10px 10px 10px 10px;
        top: 40px;
        margin: 15px 0px;
        left: 4%;
    }

    .bg {
        background: url("../../../public/assets/icon/5.jpg");
    }

    .class1{
        position: relative;
        left:30px;
        top:5px;
        font-weight: bolder;
    }

    .class2{
        position: relative;
        top:8px;
        left:20px;
        width:23px;
        height: 23px;
    }

    .class3{
        position: relative;
        top:65px;
        left:-110px;
        font-weight: bolder;
    }
    .class4{
        position: relative;
        left:110px;
        top:5px;
    }
</style>