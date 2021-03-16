<template>
    <div class="water">
        <el-form :model="formWat" ref="formWater" label-width="150px" :label-position="'left'" style="width: 90%">
            <div style="text-align: left;color:#9370DB"><h3>{{title[watIndex]}}</h3></div>
            <div class="titlefrom">
                <div>
                    类型:
                    <el-select v-model="formWat.type">
                        <el-option v-for="(ste,index) of WatTypes" :label="ste" :value="index"></el-option>
                    </el-select>
                </div>
                <div>
                    换热模型:
                    <el-select v-model="formWat.heatModel">
                        <el-option v-for="(ste,index) of WatheatModels" :label="ste" :value="index"></el-option>
                    </el-select>
                </div>
                  <div>
                      换热模型-修正参数:
                      <el-input v-model="formWat.heatFixParameter"></el-input>
                  </div>
                <div>
                   修正参数:
                    <el-input v-model="formWat.heat"></el-input>
                </div>
                <div>
                    换热系数:
                    <el-input v-model="formWat.heat"></el-input>
                </div>
            </div>

            <div style="display: flex;flex-wrap: wrap">
                <div v-for="(wat,index) of formWat.watBox" :key="index+'w'" class="waterbox">
                    <div>
                        <div style="text-align: center;font-family: times new roman;"><h4>编号:{{wat.watnumber}}#</h4>
                        </div>
                        <div style="position: relative; left: 200px;top:-20px">
                            <i class="el-icon-close" @click.prevent="removeWaterBox(wat)"></i>
                        </div>
                    </div>

                    <el-form-item label="绝对位置(m)" :rules="rea" :prop="'watBox.'+index+'.absolutem'">
                        <el-input v-model.number="wat.absolutem"></el-input>
                    </el-form-item>
                    <el-form-item label="水箱长度(m)" :rules="rules" :prop="'watBox.'+index+'.waterTankLength'">
                        <el-input v-model.number="wat.waterTankLength"></el-input>
                    </el-form-item>
                    <el-form-item label="冷却水温(℃)" :rules="rules" :prop="'watBox.'+index+'.coolWaterTemperature'">
                        <el-input v-model.number="wat.coolWaterTemperature"></el-input>
                    </el-form-item>
                    <el-form-item label="冷却水量(m³/h)" :rules="rules" :prop="'watBox.'+index+'.coolWater'">
                        <el-input v-model.number="wat.coolWater"></el-input>
                    </el-form-item>
                    <el-form-item label="冷却水压(mpa)" :rules="rules" :prop="'watBox.'+index+'.coolingWaterPressure'">
                        <el-input v-model.number="wat.coolingWaterPressure"></el-input>
                    </el-form-item>
                    <el-form-item label="喷嘴设置" required>
                        <el-button type="primary" @click="tonozzle(wat.nozzDatas,index)" size="small">喷嘴设置</el-button>
                    </el-form-item>
                    <div class="buttons">
<!--                        v-if="formWat.watBox.length==index+1"-->
                        <el-button @click.prevent="removeWaterBox(wat)">删除
                        </el-button>
                    </div>
                </div>
            </div>
            <div class="btm">
                <el-button type="primary" @click="prev">上一步</el-button>
                <el-button type="primary" @click="addWaterBox">添加水箱</el-button>
                <el-button type="primary" @click="SubWaterBox('formWater')">下一步并保存</el-button>
            </div>
        </el-form>
        <nozzle-Set ref="nset"></nozzle-Set>
    </div>
</template>

<script>
    import nozzleSet from "@/components/forms/nozzleForm.vue"

    export default {
        name: "WaterTankAttributes",
        components: {nozzleSet},
        props: {
            watIndex: {
                default: 0, type: Number
            },
            watAbs: {
                default: 0,
            }
        },
        data() {
            var validate = (rule, value, callback) => {
                let start;
                let arr= rule.field.split('.');
                if(arr[1]==0)
                    start=this.watAbs;
                else
                    start=this.formWat.watBox[arr[1]-1].absolutem+this.formWat.watBox[arr[1]-1].waterTankLength
                if (value-start<=0) {
                    callback(new Error('位置错误'));
                } else {
                    callback();
                }
            };
            return {
                title: ['预精轧间水箱', '精轧机前水箱', '精轧机后水箱', '减定径后水箱'],
                aipsTitle: ['PrefinishWaterTank', 'FrontWaterFinish', 'RearWaterTankFinish', 'ReducedRearWaterTank'],
                arrinde: null,
                WatheatModels: this.$getState('dict', 'WatheatModel'),
                WatTypes: this.$getState('dict', 'WatType'),
                formWat: {
                    watBox: [],
                    type: 0,
                    heatModel: 0,
                    heatFixParameter: 1,
                    length: 0,
                },
                rea:[{validator:validate,trigger: 'blur',required: true,}],
                rules: [{required: true, message: '不能为空'},
                    {type: 'number', message: '必须为数字值'},]
            }
        },
        created() {
            if (this.$getState('dict', this.aipsTitle[this.watIndex]).length != 0)
                this.formWat.watBox = this.$getState('dict', this.aipsTitle[this.watIndex])
            else {
                this.addWaterBox()
            }
            this.resetNUM()
        },
        methods: {
            tonozzle(data, inde) {
                this.index = inde
                this.$refs.nset.chage(data);
            },
            updataForm(data) {
                this.formWat.watBox[this.index].nozzDatas = data;
            },
            addWaterBox() {
                this.formWat.watBox.push({
                    watnumber: 0,
                    absolutem: null,
                    waterTankLength: null,
                    coolWaterTemperature: null,
                    coolWater: null,
                    coolingWaterPressure: null,
                    nozzDatas: [{
                        nozzleDiameter: 30,
                        ringWidth: 1.5,
                        nozzleAngle: 30,
                        nozzleStatus: true
                    }],
                })
                this.$setState('dict', this.aipsTitle[this.watIndex], this.formWat.watBox)
                this.resetNUM()
            },
            removeWaterBox(item) {
                var index = this.formWat.watBox.indexOf(item)
                if (index !== -1) {
                    this.formWat.watBox.splice(index, 1)
                }
                this.resetNUM()
            },
            SubWaterBox(formname) {
                this.$refs[formname].validate((valid) => {
                    if (valid) {
                        let le = this.formWat.watBox.length
                        if (le != 0) {
                            this.formWat.length = this.formWat.watBox[le - 1].absolutem+this.formWat.watBox[le - 1].waterTankLength
                            this.$setState('dict', this.aipsTitle[this.watIndex], this.formWat.watBox);
                        }else {
                            this.formWat.length=this.watAbs;
                        }
                        this.$parent.next({key: this.aipsTitle[this.watIndex], data: this.formWat})
                        // console.log(this.dynamicValidateForm,'+++++++++++',valid, this.maxsize)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            prev() {
                this.$parent.previous()
            },
            resetNUM() {
                let j = 1;
                for (let i = 0; i < this.watIndex; i++) {
                    j += this.$getState('dict', this.aipsTitle[i]).length
                }
                let le = this.$getState('dict', this.aipsTitle[this.watIndex]).length
                let k = 0;
                this.formWat.watBox = this.$getState('dict', this.aipsTitle[this.watIndex])
                for (let t of this.formWat.watBox) {
                    t.watnumber = j++;
                }

            }
        },
        destroyed() {
            this.$setState('dict', this.aipsTitle[this.watIndex], this.formWat.watBox);
        }
    }
</script>

<style scoped lang="scss">
    .buttons {
        text-align: center;
        margin: 10px 0 10px 0;
    }
    .btm{
        position: fixed;
        bottom: 0;
        left: 46%;
    }

    .water {
        width: 80%;
        display: flex;
        justify-content: center;

        .el-select {
            width: 130px;
        }

        .titlefrom {
            display: flex;
            margin: 10px 0 10px;
            div{
                margin: 0 10px 0 10px;
                .el-input{
                    width: 60px;
                }
            }
            .el-form-item {
                margin-left: 12px !important;
            }
        }

        .waterbox {
            // width: 20%;
            width: 230px;
            height: 100%;
            margin: 0 11px 15px 11px;
            padding: 10px;
            border: 1px solid #cee3e9;
            border-radius:30px;
            background: rgba(0,0,255,0.1);
            box-shadow: 0 0 7px 7px #f1f7f9;

            .el-input {
                width: 60px;
            }
        }
    }

</style>