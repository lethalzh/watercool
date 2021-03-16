<template>
        <div>
            <div class="title">
                <h1>Water Cooling</h1>
<!--                <img src="../../assets/imgs/CISDI.png"  class="logo" height="50" width="125"/>-->
            </div>
            <div class="temper">
                <div class="sheet" ref="TemperatureCurve">
                </div>
                <div ref="colorGauge" class="gauge">
                </div>
            </div>
            <div class="fixedBox" >
                <i ref="fixedicon" :class="showUpDwon?'el-icon-caret-bottom fixedicon':'el-icon-caret-top fixedicon'" @click="showBtn"></i>
                <div class="fixedbtm2" ref="fixedbtm">
                    <div >
                        <el-button type="primary" size="medium" @click="clickHandle2()">返回输入界面</el-button>
                    </div>
                    <div >
                        <el-button type="primary" size="medium" @click="clickHandle()">查看任务列表</el-button>
                    </div>
                    <div>
                        <a type="primary" size="medium"  :href="$getState('user','TohomeUrl')" class="abtn">返回主页</a>
                    </div>
                </div>
            </div>
            <outPut :tableData="seriesData"></outPut>
            <router-view></router-view>
        </div>
</template>

<script>
    import outPut from "@/components/forms/outPut.vue"
    export default {
        name: "TemperatureCurve.vue",
        components:{outPut},
        // props:{
        //     seriesData:{type:Object,default:{}}
        // },
        data(){
            return {
                dialogVisible:false,
                showUpDwon:true,
                seriesData:{},
                option : {
                    title: {
                        text: 'Water cooling temperature curve'
                    },
                    tooltip: {
                        trigger: 'axis'
                    },
                    legend: {
                        data: ['Core', 'Median', 'Surface'],
                        itemHeight:14,
                        textStyle:{
                            fontSize:14
                        }
                    },
                    grid: {
                        left: '3%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        show: true,
                        itemSize :16,
                        feature: {
                            dataZoom: {
                                yAxisIndex: "none"
                            },
                            dataView: {
                                readOnly: false
                            },
                            magicType: {
                                type: ["line", "bar"]
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    xAxis: {
                        name:'Distance[M]',
                        nameTextStyle:{
                            fontSize :15,
                            align:'left'
                        },
                        type: 'category',
                        boundaryGap: false,
                        data: []
                    },
                    yAxis: {
                        name:'Temperature[℃]',
                        // nameLocation:'center',
                        nameTextStyle:{
                            fontSize :15,
                            align:'left'
                        },
                        type: 'value'
                    },
                    series: [
                        {
                            name: 'Core',
                            type: 'line',
                            data: [],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: 'Median',
                            type: 'line',
                            data: [],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        },
                        {
                            name: 'Surface',
                            type: 'line',
                            data: [],
                            markPoint: {
                                data: [
                                    {type: 'max', name: '最大值'},
                                    {type: 'min', name: '最小值'}
                                ]
                            },
                            markLine: {
                                data: [
                                    {type: 'average', name: '平均值'}
                                ]
                            }
                        }
                    ]
                },
                gauge:{
                    tooltip: {
                        formatter: '{a}'
                    },
                    toolbox: {
                        show: true,
                        itemSize :16,
                        feature: {
                            dataView: {
                                readOnly: false
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    series:
                        {
                            min: 0,
                            max: 1800,
                            name: '温度',
                            type: 'gauge',
                            detail: {formatter: '{value}'},
                            data: [{value: 0, name: '温度'}],
                            axisLine: {
                                lineStyle: {
                                    color: [
                                        [0.15, '#7B68EE'],
                                        [0.3, '#00BFFF'],
                                        [0.45, '#FF00FF'],
                                        [0.6, '#FF0000'],
                                        [0.8, '#DC143C'],
                                        [1, '#9400D3'],
                                    ],
                                    width: 15
                                }
                            },
                        }

                }
            }
        },
        created(){
            this.seriesData=JSON.parse(localStorage.getItem("seriesData"))
            let {line0}=this.seriesData;
            let {line1}=this.seriesData;
            let {line2}=this.seriesData;
            this.option.xAxis.data=line0.x;
            this.option.series[0].data=line0.y;
            this.option.series[1].data=line1.y;
            this.option.series[2].data=line2.y;
            // console.log( this.option)
        },
        mounted(){
            let myChart = this.$echarts.init(this.$refs.TemperatureCurve)
            let gaugeChart=this.$echarts.init(this.$refs.colorGauge);
            myChart.setOption(this.option)
            gaugeChart.setOption(this.gauge, true);
            let that=this
             myChart.on('click',function(param) {
                let x = param.x;
                let y = param.y;
                console.log(param.value)
                 that.gauge.series.data[0].value=param.value||result[1].toFixed(0);
                     gaugeChart.setOption(that.gauge, true);
                 console.log(result)
            });


        },
        methods:{
            clickHandle(){
                // window.history.back()
                this.$router.push({path:'/database_table/'})
            },
            clickHandle2(){
                // window.history.back()
                this.$router.push({path:'/cooling_calculation_vue/'})
            },
            showBtn(){
                let btn=this.$refs.fixedbtm
                let icon =this.$refs.fixedicon
                btn.style.display=btn.style.display=="block"?'none':'block'
                this.showUpDwon=!this.showUpDwon
                //icon.style.display=btn.style.display=="block"?'none':'block'
            },
        }
    }
</script>

<style scoped lang="scss">
    @import '../../assets/fixedBox.scss';
    .title{
        text-align: center;
        .logo {
            position: absolute;
            right: 4vw;
            top: 1.5%
        }
    }
    .temper{
        display: flex;
        margin-top: 40px;
    }
    .sheet {
         height: 400px;
         width: 70%;
     }
    .gauge {
        margin-left: 30px;
        height: 400px;
        width: 25%;
    }
    .fixedbtm{
        position: fixed;
        bottom: 45%;
        right: 40px;
    }
</style>