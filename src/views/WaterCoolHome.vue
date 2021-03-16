
<template>
    <div>
        <router-view></router-view>
        <div v-if="show" class="coolmode">
            <div class="logo"><img :src="logo" style="width: 8vw;height: 7vh;"/></div>
            <div class="imgs">
                <div class="bghr"></div>
                <transition-group name="test">
                    <div v-if="showCast" key="cc1">
                        <el-tooltip class="item" effect="dark" content="连铸" placement="top">
                            <img :src="lianzhu" height="63" width="79" @click="toStep(0,2)"/>
                        </el-tooltip>
                    </div>
                    <div v-else class="hr" @click="toStep(0,2)" key="cc2"></div>
                </transition-group>
                <transition-group name="test">
                    <div v-if="showHeat" class="item" key="cc3">
                        <img :src="jrl" height="170" width="210" @click="toStep(0,2)"/>
                        <div>加热炉</div>
                        <!--                    <p> 长度：{{LengthArr[0]||0}}</p>-->
                    </div>
                    <div class="hr" style="width: 210px" v-else-if="LengthArr[0]==0" key="cc4"></div>
                </transition-group>
                <transition-group
                        enter-active-class="animate__animated animate__bounceInLeft"
                        leave-active-class="animate__animated animate__bounceOutLeft">
                    <div class="item" key="cc5">
                        <!--                    height="140" width="285"-->
                        <img :src="resource==1?lpcz:(resource==2?nzcz:plcz)" height="95" width="190" @click="toStep(1,2)"/>
                        <div><p>粗轧机组</p>
                            <!--                    <p>长度:{{LengthArr[1]||0}}</p>-->
                        </div>
                    </div>
                </transition-group>
                <transition
                        enter-active-class="animate__animated animate__fadeInDown"
                        leave-active-class="animate__animated animate__fadeOutDown">
                    <el-tooltip class="item" effect="dark" content="飞剪#1" placement="top">
                        <img :src="fj" height="46" width="40" @click="toStep(10,2)"/>
                    </el-tooltip>
                </transition>

                <transition-group
                        enter-active-class="animate__animated animate__bounceInLeft"
                        leave-active-class="animate__animated animate__bounceOutLeft">
                    <div class="item" key="cc7">
                        <img :src="resource==1?lpzz:(resource==2?nzzz:plzz)" height="95" width="190" @click="toStep(2,2)"/>
                        <div><p>中轧机组</p>
                            <!--                    <p>:{{LengthArr[2]||0}}</p>-->
                        </div>
                    </div>
                </transition-group>


                <transition-group
                        enter-active-class="animate__animated animate__zoomInLeft"
                        leave-active-class="animate__animated animate__zoomOutRight"
                >
                    <div class="item" key="cc9">
                        <img :src="sx" height="45" width="130" @click="toStep(3,2)"/>
                        <div><p>预精轧前水箱</p>
                            <!--                    <p>长度:{{LengthArr[3]||0}}</p>-->
                        </div>
                    </div>
                </transition-group>
                <transition-group
                        enter-active-class="animate__animated animate__bounceInUp"
                        leave-active-class="animate__animated animate__bounceOutDown">
                    <div class="item" key="cc11">
                        <img :src="resource==1?lpyjz:(resource==2?nzcz:plcz)" height="95" width="190" @click="toStep(4,2)"/>
                        <div><p>预精轧机组</p>
                            <!--                    <p>长度:{{LengthArr[4]||0}}</p>-->
                        </div>
                    </div>
                </transition-group>


                <transition-group
                        enter-active-class="animate__animated animate__zoomInLeft"
                        leave-active-class="animate__animated animate__zoomOutRight"
                >
                    <div class="item" key="cc13">
                        <img :src="sx" height="45" width="130" @click="toStep(5,2)"/>
                        <div><p>精轧前水箱</p>
                            <!--                    <p>长度:{{LengthArr[5]||0}}</p>-->
                        </div>
                    </div>
                </transition-group>

                <transition-group
                        enter-active-class="animate__animated animate__bounceInRight"
                        leave-active-class="animate__animated animate__bounceOutRight">
                    <div class="item" key="cc15">
                        <img :src="zhaji2" height="80" width="240" @click="toStep(6,2)"/>
                        <div><p>精轧机组</p>
                            <!--                    <p>长度:{{LengthArr[6]||0}}</p>-->
                        </div>
                    </div>
                </transition-group>


                <transition-group
                        enter-active-class="animate__animated animate__zoomInLeft"
                        leave-active-class="animate__animated animate__zoomOutRight"
                >
                    <div class="item" key="cc17">
                        <img :src="sx" height="45" width="130" @click="toStep(7,2)"/>
                        <div><p>精轧后水箱</p>
                            <!--                    <p>长度:{{LengthArr[7]||0}}</p>-->
                        </div>
                    </div>
                </transition-group>
                <transition
                        enter-active-class="animate__animated animate__fadeInDown"
                        leave-active-class="animate__animated animate__fadeOutDown">
                    <el-tooltip class="item" effect="dark" content="飞剪#2" placement="top">
                        <img :src="fj" height="46" width="40" @click="toStep(10,2)"/>
                    </el-tooltip>
                </transition>
                <transition-group
                        enter-active-class="animate__animated animate__bounceInRight"
                        leave-active-class="animate__animated animate__bounceOutRight">
                    <div class="item" key="cc9">
                        <img :src="zhaji3" height="75" width="75" @click="toStep(8,2)"/>
                        <div><p>减定径机组</p>
                            <!--                    <p>长度:{{LengthArr[8]||0}}</p>-->
                        </div>
                    </div>
                </transition-group>
                <transition-group
                        enter-active-class="animate__animated animate__zoomInLeft"
                        leave-active-class="animate__animated animate__zoomOutRight">
                    <div class="item" key="cc21">
                        <img :src="sx" height="45" width="130" @click="toStep(9,2)"/>
                        <div><p>减定径后水箱</p>
                            <!--                    <p>长度:{{LengthArr[9]||0}}</p>-->
                        </div>
                    </div>
                </transition-group>

                <transition
                        enter-active-class="animate__animated animate__fadeInDown"
                        leave-active-class="animate__animated animate__fadeOutDown">
                    <el-tooltip class="item" effect="dark" content="飞剪#3" placement="top">
                        <img :src="fj" height="46" width="40" @click="toStep(10,2)"/>
                    </el-tooltip>
                </transition>

                <transition
                        enter-active-class="animate__animated animate__rotateIn"
                        leave-active-class="animate__animated animate__rotateOut">
                    <el-tooltip class="item" effect="dark" content="吐丝机" placement="top">
                        <img :src="tsj" height="75" width="75" @click="toStep(11,2)"/>
                    </el-tooltip>
                </transition>
            </div>
            <span class="linesum">当前产线长度：{{sum}}</span>
            <el-steps :active="active" simple>
                <el-step v-for="(step,index) of steps " :title="step" :key="index" @click.native="toStep(index,2)"></el-step>
            </el-steps>

            <div class="comp">
                <Heating-Furnace v-show="active==0"></Heating-Furnace>                  <!-- 全局配置_计算配置-->
                <!--            <keep-alive>-->
                <Rolling-Mill v-show="active==1" :active="active" :flag="0" :start="LengthArr[0]"
                              :resource="resource"></Rolling-Mill>                        <!-- 粗轧机组-->
                <!--            </keep-alive>-->
                <!--            <keep-alive>-->
                <Rolling-Mill v-show="active==2" :active="active" :flag="1" :start="LengthArr[1]"
                              :resource="resource"></Rolling-Mill>              <!--中轧机组-->
                <!--            </keep-alive>-->
                <Water-Tank-Attr v-show="active==3" :active="active" :watAbs="LengthArr[2]"></Water-Tank-Attr>
                <!-- 预精轧前水箱-->
                <Rolling-Mill v-show="active==4" :active="active" :flag="2" :resource="resource"
                              :start="LengthArr[3]"></Rolling-Mill>              <!-- 预精轧机组-->
                <Water-Tank-Attr v-show="active==5" :active="active" :watIndex="1" :watAbs="LengthArr[4]"></Water-Tank-Attr>
                <!-- 精轧前水箱-->
                <Rolling-Mill v-show="active==6" :active="active" :flag="3" :resource="resource"
                              :start="LengthArr[5]"></Rolling-Mill>              <!-- 精轧机组-->
                <Water-Tank-Attr v-show="active==7" :active="active" :watIndex="2" :watAbs="LengthArr[6]"></Water-Tank-Attr>
                <!-- 精轧后水箱-->

                <Rolling-Mill v-show="active==8" :active="active" :flag="4" :resource="resource"
                              :start="LengthArr[7]"></Rolling-Mill>              <!-- 减定径机组-->

                <Water-Tank-Attr v-show="active==9" :active="active" :watIndex="3" :watAbs="LengthArr[8]"></Water-Tank-Attr>
                <!-- 减定径后水箱-->

                <Fly-Shear v-show="active==10"></Fly-Shear>                              <!-- 1-3#飞剪-->
                <Air-Cool-Lay v-show="active==11"></Air-Cool-Lay>                       <!-- 吐丝机_风冷线-->

            </div>
            <div v-if="active==12">
                <div class="account" v-loading="loading" element-loading-text="计算中"
                     element-loading-spinner="el-icon-loading">
                    <div class="title"><h2>填写情况</h2></div>
                    <table style="width: 90%; text-align: center" v-if="flag">
                        <tr>
                            <th v-for="(sep,index) of steptTIitle" :key="index+'tab'">{{sep}}</th>
                        </tr>
                        <tr>
                            <td v-for="(tag,index) of tableTags" :key="index+'tab'"  v-model="tableTags" @click="toStep(index+1)">
                                <el-tag
                                        :key="index"
                                        size="medium"
                                        :type="tag?'success':'warning'" style="padding: 0 10px 0 10px">
                                    {{tag?'已填写':'未填写'}}
                                </el-tag>
                            </td>
                        </tr>
                    </table>

                    <div class="task">任务名:<el-input v-model="task_name"></el-input></div>

                    <div class="buttons">
                        <el-button type="primary" @click="toStep(0)">返回第一步</el-button>
                        <el-button type="primary" @click="toApi()">提交数据查看状态列表</el-button>
                        <!--                    <el-button type="primary" @click="toApi()">计算温度曲线</el-button>-->

                    </div>

                </div>
                <!--            <el-button type="primary" @click="toApi()">计算温度曲线</el-button>-->
            </div><!-- 完成-->
            <div class="fixedBox" >
                <i ref="fixedicon" :class="showUpDwon?'el-icon-caret-bottom fixedicon':'el-icon-caret-top fixedicon'" @click="showBtn"></i>
                <div class="fixedbtm1" ref="fixedbtm">
                    <div >
                        <el-button type="primary" size="medium" @click="clickHandle()">查看任务列表</el-button>
                    </div>
                    <div>
                        <a type="primary" size="medium"  :href="$getState('user','TohomeUrl')" class="abtn">返回主页</a>
                    </div>

                </div>
            </div>

        </div>
    </div>
</template>
<script>
    import WaterTankAttr from "@/components/forms/WaterTankAttributes.vue"
    import GlobalAttr from "@/components/forms/GlobalAttributes.vue"
    import CalculatedAttr from "@/components/forms/CalculatedAttributes.vue"
    import FlyShear from "@/components/forms/FlyShear.vue"
    import RollingMill from "@/components/forms/RollingMill.vue"
    import HeatingFurnace from "@/components/forms/HeatingFurnace.vue"
    import AirCoolLay from "@/components/forms/AirCoolLay.vue"
    import TemperatureCurve from "@/components/forms/TemperatureCurve.vue"



    import Logo from '@/assets/imgs/CISDI.png'
    import f12 from '@/assets/imgs/12.png'
    import Zhaji1 from '@/assets/imgs/zhajiG1.png'
    import Zhajilip from '@/assets/imgs/zhajilip.png'
    import Szhaji from '@/assets/imgs/szhaji.png'
    import Lp2 from '@/assets/imgs/lp2.png'
    import Tsj from '@/assets/imgs/tsj.png'
    import Fj from '@/assets/imgs/1fj.png'
    import Jrl from '@/assets/imgs/jrl.png'
    import Sx from '@/assets/imgs/sx01.png'
    import Lianzhu from '@/assets/imgs/lianzhu.png'
    import Zhaji2 from '@/assets/imgs/zjimgs/jinzha.png'
    import lpcz from '@/assets/imgs/zjimgs/lpcz.png'
    import lpyjz from '@/assets/imgs/zjimgs/lpyjz.png'
    import lpzz from '@/assets/imgs/zjimgs/lpzz.png'
    import Zhaji3 from '@/assets/imgs/zjimgs/jdjz.png'
    import plcz from '@/assets/imgs/zjimgs/plcz.png'
    import plzz from '@/assets/imgs/zjimgs/plzz.png'
    import nzcz from '@/assets/imgs/zjimgs/nzcz.png'
    import nzzz from '@/assets/imgs/zjimgs/nzzz.png'

    export default {
        components: {
            GlobalAttr, CalculatedAttr, WaterTankAttr,
            FlyShear, RollingMill, HeatingFurnace, AirCoolLay, TemperatureCurve
        },
        data() {
            return {
                lpcz: lpcz, lpyjz: lpyjz, lpzz: lpzz, plzz: plzz, plcz: plcz, nzzz: nzzz, nzcz: nzcz,
                logo: Logo, zhaji1: Zhaji1, zhaji2: Zhaji2, zhaji3: Zhaji3, lianzhu: Lianzhu, fj: Fj, jrl: Jrl,
                sx: Sx, tsj: Tsj, zhajilip: Zhajilip, lp2: Lp2, f11: f12, szhaji: Szhaji,
                loading: false,
                showHeat: true,
                showCast: false,
                showUpDwon:true,
                sum: 0,
                show:true,
                flag: false,
                active: 0,
                resource: 1,
                LengthArr: [],
                apiToData: {},
                task_name:'',
                steptTIitle: ['粗轧机组', '中轧机组', '预精轧前水箱', '预精轧机组', '精轧前水箱', '精轧机组', '精轧后水箱', '减定径机组', '减定径后水箱'],
                steps: ['全局配置/计算配置', '粗轧机组', '中轧机组', '预精轧前水箱', '预精轧机组', '精轧前水箱', '精轧机组', '精轧后水箱', '减定径机组', '减定径后水箱', '飞剪', '吐丝机_风冷线', '完成'],
                seriesData: {},
                tableData: [],
                tableTags: [true, true, true, true, true, true, true, true, true]
            }
        },
        updated() {
            this.resapiToData()
            if (this.active == 12) {
                this.flag = true;
            }
        },
        methods: {
            async toApi() {
                if(this.task_name==''){
                    this.$message({
                        type: 'warning',
                        message:'任务名不能为空'
                    });
                }
                else {
                    let task_name=this.task_name
                    let [err, res] = await this.$apis.company.setWatercool({data: this.apiToData,task_name:task_name})

                    if(res?.msg=="True"){
                        this.$router.push({path:'/database_table/'})
                        // let routeUrl = this.$router.resolve({
                        //     path: "/database_table",
                        // });
                        // window.open(routeUrl.href, '_blank');
                    } else{
                        this.$message({
                            type: 'info',
                            message:"任务名重复"
                        });
                    }
                }

                //  // let res = true
                // let [err, res] = await this.$apis.company.setWatercool({data: this.apiToData,task_name:'123456'})
                // if (res) {
                //       this.seriesData=res;
                //     // this.loading = false
                //     //this.seriesData = this.seriesData;
                //     localStorage.clear();
                //     localStorage.setItem("seriesData",JSON.stringify(this.seriesData));
                //     let routeUrl = this.$router.resolve({
                //         path: "/water_cool_sheet",
                //         // params: {cc: this.seriesData},
                //         // query: {aa: JSON.stringify(this.seriesData)}
                //     });
                //     window.open(routeUrl.href, '_blank');
                // } else {
                //     this.$message({
                //         message: '接口访问错误',
                //         type: 'warning'
                //     });
                // }
            },
            next(datas) {
                this.apiToData[datas.key] = datas.data;
                if (this.active == 0) {
                    this.showHeat = datas.data.showHeat
                    this.showCast = datas.data.showCast
                    this.resource = datas.data.formGloba.resource
                    console.log(datas.data)

                    // if(this.showHeat)
                    //     this.LengthArr[this.active] = (datas.data.formHeat.length / 1000)
                    // else
                    //     this.LengthArr[this.active]=datas.data.length
                }
                this.LengthArr[this.active] = (datas.data.length)
                if (typeof this.LengthArr[this.active] != 'object')
                    this.sum = this.LengthArr[this.active]
                console.log('Bigdata', this.apiToData, '-----------------', this.LengthArr, '---', this.sum)
                if (this.active == this.steps.length) return;
                this.active++;
            },
            previous() {
                if (this.active == 0) return
                this.LengthArr.pop();
                this.active--
            },
            toStep(n,stepFlag=1) {
                if(stepFlag!=1){
                    this.$confirm('检测到未保存的内容，是否在离开页面前保存修改？', '确认信息', {
                        distinguishCancelAndClose: true,
                        confirmButtonText: '保存',
                        cancelButtonText: '放弃修改'
                    })
                        .then(() => {
                            this.$message({
                                type: 'success',
                                message: '点击下一步保存'
                            });
                        })
                        .catch(action => {
                            this.$message({
                                type: 'info',
                                message: action === 'cancel'
                                    ? '放弃保存并离开页面'
                                    : '停留在当前页面'
                            })
                            this.active = n;
                        });
                }else
                    this.active = n;

            },
            resapiToData() {
                let Etitle = ['RoughRoll', 'MediumRoll', 'PrefinishWaterTank', 'PreFinishRoll', 'FrontWaterFinish', 'FinishRoll', 'RearWaterTankFinish', 'ReducedRoll', 'ReducedRearWaterTank']
                let apiToDataKey = [];
                for (let i in this.apiToData)
                    apiToDataKey.push(i)
                for (let i in Etitle) {
                    this.tableTags[i] = apiToDataKey.indexOf(Etitle[i]) > -1

                }
            },
            clickHandle(){
                // window.history.back()
                this.$router.push({path:'/database_table/'})
            },
            toHome(){
                this.$router.replace({path:'/'});
            },
            showBtn(){
                let btn=this.$refs.fixedbtm
                let icon =this.$refs.fixedicon
                btn.style.display=btn.style.display=="block"?'none':'block'
                this.showUpDwon=!this.showUpDwon
                //icon.style.display=btn.style.display=="block"?'none':'block'
            }
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/fixedBox.scss';
    * {
        padding: 0;
        margin: 0;
    }

    .el-button--medium {
        padding: 10px 20px !important;
    }

    .hr {
        background-color: red;
        margin-top: 5px;
        height: 4px;
        width: 3vw;
    }

    .linesum {
        font-size: 18px;
        font-weight: 500;
        color: #9370DB;
    }

    .logo {
        position: absolute;
        right: 4vw;
        top: 1.5%
    }

    .coolmode {
        .imgs {
            height: 270px;
            background-color: #f1f7f9; //#A020F0;
            overflow: auto;
            display: flex;
            align-items: center;

            .bghr {
                position: absolute;
                margin-top: 5px;
                margin-left: 3%;
                background-color: red;
                height: 4px;
                width: 92%;
            }

            .item {
                position: relative;
                font-size: 14px;

                div {
                    position: absolute;
                    bottom: -35px;
                    left: 20%;
                }
            }
        }

        .comp {
            display: flex;
            justify-content: center;
        }
        .account{
            margin-top: 20px;
            height: 200px;
            /*display: flex;*/
            /*justify-content: center;*/
            .title{
                text-align: center;
                margin-bottom: 20px;

            }
            .buttons {
                text-align: center;
                margin: 10px 0 10px 0;
            }
        }
        .task{
            text-align: center;
            margin-top: 15px;
            .el-input{
                width: 250px;
            }
        }
    }





    table
    {
        border-collapse: collapse;
        margin: 0 auto;
        text-align: center;
    }
    table td, table th
    {
        border: 1px solid #cad9ea;
        color: #666;
        height: 35px;
    }
    table thead th
    {
        background-color: #CCE8EB;
        width: 100px;
    }
    table tr:nth-child(odd)
    {
        background: #fff;
    }
    table tr:nth-child(even)
    {
        background: #F5FAFA;
    }

    .test-enter, .test-leave-to {
        opacity: 0;
    }

    .test-enter-to, .test-leave {
        opacity: 1;
    }

    .test-enter-active, .test-leave-active {
        transition: all 2s;
    }

</style>