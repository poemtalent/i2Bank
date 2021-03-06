<template>
    <ion-page>
        <ion-header>
            <ion-back-button style="color:grey"></ion-back-button>
        </ion-header>
    </ion-page>
    <ion-content>
        <div class="div1">
            <img  src="../../../public/assets/icon/头像.png">
        </div>
        <p class="p1">购买成功</p>

        <ion-button  color="none" >完成
        </ion-button>
    </ion-content>
</template>

<script lang="ts">
    import {
        IonPage,
        IonHeader,
        IonBackButton,
        IonContent,
        IonButton,
    } from '@ionic/vue'
    export default {
        name: "successed.vue",
        components:{
            IonPage,
            IonHeader,
            IonBackButton,
            IonContent,
            IonButton,
        }
    }
</script>

<style scoped>

    .div1{
        width: 400px;
        height: 400px;
        display: table-cell; /*主要是这个属性*/
        vertical-align: middle;
        text-align: center;
    }

    .div1 img{
        width:120px;
        height:120px;
    }

    .p1{
        position: relative;
        top:-142px;
        color:#0494FD;
        font-size: 24px;
        font-weight: bolder;
        text-align: center;
    }

    ion-button{
        width:150px;
        height: 50px;
        background: #0494FD;
       position: relative;
        left:30%;
        letter-spacing: 5px;
        font-size: 20px;
    }
</style>