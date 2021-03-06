<template>
    <ion-header>
        <ion-toolbar>
            <ion-back-button style="color:gray;" slot="start"></ion-back-button>
            <ion-title style="color: #333333;background: white">资产详情</ion-title>
            <ion-icon slot="end" name="ellipsis-horizontal-sharp" style="color: white;">
            </ion-icon>
        </ion-toolbar>
        <ion-content>

            <!--<div id="Chart" class="charp" style="width: 200px;height: 100px;"></div>-->
            <section class="chart-container">
                <ion-row id="Chart">
                    <canvas id="chartPie"></canvas>
                </ion-row>
            </section>

        </ion-content>
    </ion-header>
</template>

<script lang="ts">
    import * as echarts from 'echarts'
    import { inject, onMounted } from "vue";
    import {
        IonHeader,
        IonToolbar,
        IonBackButton,
        IonTitle,
        IonIcon,
        IonContent,
        IonRow
    } from '@ionic/vue'
    export default {
        name: "assets.vue",
        components:{
            IonHeader,
            IonToolbar,
            IonBackButton,
            IonTitle,
            IonIcon,
            IonContent,
            IonRow
        },

        setup(){
            const echarts: any = inject("ec");//引入
            onMounted(() => {//需要获取到element,所以是onMounted的Hook
                const myChart: any = echarts.init(document.getElementById("chartPie"));
                // 绘制图表
                myChart.setOption({
                    tooltip: {
                        trigger: 'item'
                    },
                    legend: {
                        top: '5%',
                        left: 'center'
                    },
                    series: [
                        {
                            name: '访问来源',
                            type: 'pie',
                            radius: ['40%', '70%'],
                            avoidLabelOverlap: false,
                            label: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                label: {
                                    show: true,
                                    fontSize: '40',
                                    fontWeight: 'bold'
                                }
                            },
                            labelLine: {
                                show: false
                            },
                            data: [
                                {value: 1048, name: '搜索引擎'},
                                {value: 735, name: '直接访问'},
                                {value: 580, name: '邮件营销'},
                                {value: 484, name: '联盟广告'},
                                {value: 300, name: '视频广告'}
                            ]
                        }
                    ]
                });
                window.onresize = function () {//自适应大小
                    myChart.resize();
                };
            });

        },
        mounted() {
            console.log('aa');
        },
    }
</script>

<style scoped>

    /*.charp{*/
    /*width:100%;*/
    /*height: 300px;*/
    /*}*/

    .chart-container {
        width: 100%;
        float: left;
    }

    #chartPie {
        width: 100%;
        height: auto;
    }
</style>