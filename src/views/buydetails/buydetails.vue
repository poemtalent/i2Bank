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
                            <h3 class="class3">{{temp1.rate}}</h3>
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
            </ion-grid>

            <ion-grid class="class5">
                <ion-row>
                    <ion-col>
                        <div style="position: relative;text-align: center;padding-top: 20px">
                            <p style="color:#333333">昨日收益（元）</p>
                            <p style="padding-top: 3px;font-size: 18px;">2.10</p>
                        </div>
                    </ion-col>
                    <ion-col>
                        <div style="position: relative;text-align: center;padding-top: 20px">
                            <p style="color:#333333">累计收益（元）</p>
                            <p style="padding-top: 3px;font-size: 18px;">{{temp1.totalEarnings}}</p>
                        </div>
                    </ion-col>
                </ion-row>
                <p style="padding-top: 20px;padding-left: 20px;font:20px border ">业绩走势</p>
                <!--<section class="chart-container">-->
                <!--<ion-row id="chart">-->
                <!--<canvas id="myChart"></canvas>-->
                <!--</ion-row>-->
                <!--</section>-->
                <div id="myChart" class="charp"></div>
            </ion-grid>

            <div class="full-width" @click="selled(temp1.pId)">
                <ion-button expand="full" color="secondary" style="letter-spacing: 10px;">赎回
                </ion-button>
            </div>
        </ion-content>
    </ion-page>


</template>

<script lang="ts">
    import * as echarts from 'echarts'
    import {inject, onMounted, ref} from "vue";
    // require('echarts/theme/macarons');
    import {
        IonPage,
        IonHeader,
        IonTitle,
        IonContent,
        IonBackButton,
        IonToolbar,
        IonIcon,
        IonGrid,
        IonRow,
        IonCol,
        IonButton,
    } from '@ionic/vue'
    import router from "../../router";
    import http from "../../hooks/http";

    export default {
        name: "buydetails.vue",
        components: {
            IonPage,
            IonHeader,
            IonTitle,
            IonContent,
            IonBackButton,
            IonToolbar,
            IonIcon,
            IonGrid,
            IonRow,
            IonCol,
            IonButton
        },

        // data(
        //     return{
        //
        // }
        // )
        setup() {

            // 请求后台
            const products = router.currentRoute.value.query.products
            console.log(products)
            const data1 = new FormData();
            const temp = products!.toString()
            data1.append("pid", temp)
            const temp1 = ref('')

            async function sell() {
                const result = await http('/product/getPurchasedProductById', data1)
                console.log(result)
                temp1.value = result.data.data[0]
                console.log(temp1.value)
            }

            sell();

            const selled = (products:any) => {
                console.log(products);
                router.push({path:"/sell",query:{products:products}})
            }
            const echarts: any = inject("ec");//引入
            onMounted(() => {//需要获取到element,所以是onMounted的Hook
                const myChart: any = echarts.init(document.getElementById("myChart"));
                // 绘制图表
                myChart.setOption({
                    tooltip: {},
                    xAxis: {
                        type: 'category',
                        data: ['两天内', '五天内', '一周内', '两周内', '三周内']
                    },
                    yAxis: {
                        type: 'value'
                    },
                    series: [{
                        data: [0.03, 0.1, 0.15, 0.09, 0.09],
                        type: 'line',
                        smooth: true
                    }]
                });
                window.onresize = function () {//自适应大小
                    myChart.resize();
                };
            });
            return {
                temp1,
                selled,
                echarts
            }

        },
        mounted() {
            console.log('aa');
        },


        methods: {
            sell() {
                router.push('/sell')
            }
        }

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
        width: 100%;
        background: white;
        position: relative;
        margin: 13px 0px;
    }

    .class3, .class4 {
        position: relative;
        width: 100%;
        color: red;
    }

    .class5 {
        width: 92%;
        background: #FFFFFF;
        position: relative;
        border: 1px solid #CCCCCC;
        border-radius: 10px 10px 10px 10px;
        left: 4%;
        margin: 13px 0px;
    }

    .p1 {
        position: relative;
        width: 100%;
        font-size: 16px;
        color: grey;
        top: -15px;
    }

    h3 {
        padding: 15px;
    }

    .full-width {
        position: absolute;
        bottom: 0px;
        width: 100%;
    }

    .charp {
        width: 330px;
        height: 300px;
    }

</style>