<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-back-button style="color:gray;" slot="start"></ion-back-button>
                <ion-title style="color: #333333;background: white">产品详情</ion-title>
                <ion-icon slot="end" name="ellipsis-horizontal-sharp" style="color: white;">
                </ion-icon>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-grid>
                <h3 style="text-align: center">{{temp1.name}}</h3>
                <ion-row>
                    <ion-col>
                        <div style="position: relative;text-align: center">
                            <h3 class="class4">{{temp1.rate}}</h3>
                            <p class="p1">业绩基准</p>
                        </div>
                    </ion-col>
                    <ion-col>
                        <div style="position: relative;text-align: center">
                            <h3 class="class4">360天</h3>
                            <p class="p1">最低持有天数</p>
                        </div>
                    </ion-col>
                </ion-row>
                <p style="padding-left: 15px">交易规则</p>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px;">首点起点金额</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">{{temp1.originAmount}}</p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px">递增起点金额</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">{{temp1.increaseAmount}}</p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px;padding-bottom: 15px">单笔最高金额</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">{{temp1.singleMaxAmount}}</p>
                    </ion-col>
                </ion-row>

            </ion-grid>

            <ion-grid>
                <p style="padding-left: 15px;padding-top:15px;">产品信息</p>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px;">销售地区</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">{{temp1.area}}</p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px">收益类型</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">{{temp1.type}}</p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px">产品期限</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">{{temp1.timeLimite}}</p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px;">募集方式</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">{{temp1.collectType}}</p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px;">投资性质</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">固定收益类</p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px;">参考价格</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">0.00元</p>
                    </ion-col>
                </ion-row>

                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px;">风险等级</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">{{temp1.risk}}</p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px;">币种</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">人民币</p>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col size="6">
                        <p class="p2" style="padding-left: 15px;padding-bottom: 15px;">产品代码</p>
                    </ion-col>
                    <ion-col size="6">
                        <p class="p3">AD180988</p>
                    </ion-col>
                </ion-row>
            </ion-grid>

            <section>
                <ion-button expand="block" @click="buy(temp1.PId)">购买</ion-button>
            </section>

        </ion-content>
    </ion-page>
</template>

<script lang="ts">
    import {
        IonPage,
        IonContent,
        IonToolbar,
        IonBackButton,
        IonTitle,
        IonHeader,
        IonIcon,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
    } from '@ionic/vue'
    import router from "../../router";
    import http from "@/hooks/http";
    import {ref} from "vue"

    export default {
        components: {
            IonPage,
            IonContent,
            IonBackButton,
            IonToolbar,
            IonTitle,
            IonHeader,
            IonIcon,
            IonGrid,
            IonRow,
            IonCol,
            IonButton
        },

        setup() {
            const item = ref('');
            const productId = router.currentRoute.value.query.productId
            console.log(productId)
            const data1 = new FormData();
            // ! 表示忽略为null
            // .toString 表示把前面 productId转化为字符串
            const temp = productId!.toString()
            data1.append("pid", temp)
            const temp1 = ref('')
            async function test() {
                const result = await http('/product/getProductById', data1);
                temp1.value = result.data.data[0]
                console.log('999', temp1.value)
            }

            test();

            const buy = (myid: any) => {
                console.log('111')
                console.log(myid)
                router.push({path: '/buy', query: {myid: myid}})
            }
            return {
                item,
                productId,
                temp1,
                buy
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

    ion-grid {
        width: 90%;
        background: white;
        position: relative;
        left: 5%;
        border-radius: 10px 10px 10px 10px;
        border: 1px solid #cccccc;
        margin: 13px 0px;
    }

    .class3, .class4 {
        position: relative;
        width: 100%;
        color: red;
    }

    .p1 {
        position: relative;
        width: 100%;
        font-size: 16px;
        color: grey;
        top: -15px;
    }

    .p2, .p3 {
        padding-top: 18px;
        color: #A9A9A9;
        font-size: 14px;
    }

    .p3 {
        color: #606060;
    }

    h3 {
        padding: 15px;
    }

    ion-button {
        letter-spacing: 10px;
        font-weight: bolder;
        position: relative;

    }

    section {
        position: relative;
        bottom: 0px;
    }

</style>