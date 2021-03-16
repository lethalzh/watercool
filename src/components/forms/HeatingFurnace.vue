<template>
    <div >
        <vuedraggable v-model="list" class="heating">
            <transition-group>
                <div :key="list[0]">
                    <div id="boxleft" :key="list[0]" class="heat0 heatbox">
                        <el-switch
                                v-model="formData.showCast"

                                active-text="连铸"
                                inactive-text="不连铸"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                        <el-switch
                                style="font-size: 16px"
                                v-model="formData.showHeat"
                                active-text="添加加热炉"
                                inactive-text="不添加加热炉"
                                active-color="#13ce66"
                                inactive-color="#ff4949">
                        </el-switch>
                    </div>
                    <div   v-if="formData.showHeat" class="heatbox" style="margin-top: 10px">
                        <div class="title"><h4>除鳞箱配置</h4></div>
                        <el-form ref="form" :model="formHeat" :label-position="'left'" label-width="165px">
                            <el-form-item label="距上一设备距离(m)" :rules="rules" prop="absolutem">
                                <el-input v-model.number="formHeat.absolutem"></el-input>
                            </el-form-item>
                            <el-form-item label="除鳞箱长度(mm)" :rules="rules" prop="length">
                                <el-input v-model.number="formHeat.length"></el-input>
                            </el-form-item>
                            <el-form-item label="喷嘴组数" :rules="rules">
                                <el-input v-model.number="formHeat.nozzleNumber" prop="nozzleNumber"></el-input>
                            </el-form-item>
                            <el-form-item label="水压(Mpa)" :rules="rules">
                                <el-input v-model.number="formHeat.waterPressure" prop="waterPressure"></el-input>
                            </el-form-item>
                            <el-form-item label="水量(m³/h)" :rules="rules">
                                <el-input v-model.number="formHeat.waterVolume" prop="waterVolume"></el-input>
                            </el-form-item>
                            <el-radio-group v-model="formHeat.radio" size="small" text-color="#606266">
                                <el-radio-button :label="1">换热模型</el-radio-button>
                                <el-radio-button :label="2">换热系数</el-radio-button><!--(W/(m²*℃))-->
                            </el-radio-group>
                            <el-form-item label="换热模型" v-if="formHeat.radio==1" :rules="rules" prop="hModel">
                                <el-input v-model.number="formHeat.hModel"></el-input>
                            </el-form-item>
                            <el-form-item label="换热系数" v-else :rules="rules" prop="hCoefficient">
                                <el-input v-model.number="formHeat.hCoefficient" readonly></el-input>
                            </el-form-item>

                            <!--                    <el-form-item label="" >-->
                            <!--                        <el-radio-group v-model="formHeat.resource" size="small" >-->
                            <!--                            <el-radio-button  :value="1"   label=""></el-radio-button>-->
                            <!--                            <el-radio-button  :value="2"   label=""></el-radio-button >-->
                            <!--                            <el-radio-button  :value="3"   label=""></el-radio-button >-->
                            <!--                        </el-radio-group>-->
                            <!--                    </el-form-item>-->
                            <!--                    <el-form-item label="轧机产线布置">-->
                            <!--                        <el-select v-model="formGloba.moldShape" >-->
                            <!--                            <el-option v-for="(sha,index) of Shapes" :label="sha" :value="index"></el-option>-->
                            <!--                        </el-select>-->
                            <!--                    </el-form-item>-->
                        </el-form>
                    </div>
                </div>

                <div id="boxcenter" :key="list[1]" class="box hcenter">
                    <div class="left-to-right-border"></div>
                    <div class="right-to-bottom-border"></div>
                    <div class="bottom-to-left-border"></div>
                    <div class="bottom-to-start-border"></div>
                    <Calculated-Attr ref="CalAt"></Calculated-Attr>
                    <div class="buttons">
                        <el-button type="primary" @click="prev()" disabled>上一步</el-button>
                        <el-button type="primary" @click="SubHeat()">下一步</el-button>
                    </div>
                </div>

                <div id="boxright" :key="list[2]" class="box hright" >
                    <div class="left-to-right-border"></div>
                    <div class="right-to-bottom-border"></div>
                    <div class="bottom-to-left-border"></div>
                    <div class="bottom-to-start-border"></div>
                    <Global-Attr ref="GloAt"></Global-Attr>
                </div>
            </transition-group>
        </vuedraggable>

    </div>
</template>

<script>
    import GlobalAttr from "@/components/forms/GlobalAttributes.vue"
    import CalculatedAttr from "@/components/forms/CalculatedAttributes.vue"
    import vuedraggable from 'vuedraggable';

    export default {
        name: "HeatingFurnace",
        components: {GlobalAttr, CalculatedAttr, vuedraggable},
        data() {
            return {
                list: [1,2,3],
                formData: {
                    showHeat: true,
                    showCast: false,
                    length:0,
                },
                formHeat: {
                    absolutem:0,
                    length: 300,
                    nozzleNumber: 1,
                    waterPressure: 20,
                    waterVolume: 40,
                    radio: 1,
                    hModel: 1,
                    hCoefficient: 3500,
                },
                rules: [{required: true, message: '不能为空'},
                    {type: 'number', message: '必须为数字值'},],
                list: [1, 2, 3]
            }
        },
        created(){
          this.$bus.$on('tosetData',(datas)=>{
              this.formData[datas.key] = datas.data;
          })

        },
        methods: {
            async SubHeat() {
                await this.$refs.GloAt.toData();
                await this.$refs.CalAt.toDataCal();
                if(!this.formData.showHeat){
                    this.formHeat.absolutem=0
                }

                        if (this.formData.showHeat) {
                            // if(this.formHeat.radio==1)
                            //     delete this.formHeat.hCoefficient
                            // else
                            //     delete this.formHeat.hModel
                            this.formData.length=this.formHeat.absolutem+this.formHeat.length/1000
                            this.formData['formHeat'] = this.formHeat;
                        }
                        else
                            this.formData.length=this.formHeat.length/1000;
                        this.$parent.next({key: 'otherData', data: this.formData});





            },
            setData(datas) {
                this.formData[datas.key] = datas.data;
                // console.log('datas',datas,this.formData)
            },
        },
        updated() {
            document.querySelector("#boxleft").style.order=this.list[0];
            document.querySelector("#boxcenter").style.order=this.list[1];
            document.querySelector("#boxright").style.order=this.list[2];
        },
    }
</script>

<style scoped lang="scss">
    @import '../../assets/myborder.scss';

    .buttons {
        text-align: center;
        margin: 70px 0 10px 0;
    }

    .heating {
        width: 68%;
        display: flex;
        justify-content: space-between;
        span:first-child{
            display: flex;
        }
        ::v-deep .el-switch__label * {
            line-height: 1;
            font-size: 16px;
            display: inline-block;
        }

        .heatbox {
            margin: 20px 10px 0 10px;
            padding: 10px;
            width: 20%;
            min-width: 250px;
            height: 390px;
            min-height: 390px;
            border-radius: 30px;
            background-color: rgba(153, 50, 204, 0.1);

            .el-input {
                width: 70px;
            }
        }

        .heat0 {
          font-size: 18px !important;
            font-weight: 500 !important;
            height: 10% !important;
            min-height: 60px;
        }

        .hcenter {
            margin: 20px 10px 0 10px;
            width: 20%;
            min-width: 250px;
            height: 390px;
            min-height: 380px;
        }

        .hright {
            width: 40%;
            min-width: 530px;
            min-height: 380px;
            height: 390px;
        }
    }
</style>
