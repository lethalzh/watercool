<template>
    <div class="globalattr">
        <div class="title"><h3>全局属性配置</h3></div>
        <el-form ref="form" :model="formGloba" :label-position="'left'" label-width="140px">
            <div style="display: flex;margin-top: 25px">
                <div>
                    <el-form-item label="轧线长度（m）" :rules="rules" prop="rollLineLength">
                        <el-input v-model.number="formGloba.rollLineLength" ></el-input>
<!--                        <el-input-number v-model.number="formGloba.rollLineLength" controls-position="right" ></el-input-number>-->
                    </el-form-item>
                    <el-form-item label="钢  种">
                        <el-select v-model="formGloba.calculateSteel" @change="getSele()">
                            <el-option v-for="(steel,index) of Steels" :label="steel.name" :value="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="钢种牌号">
                        <el-select v-model="formGloba.steelGrade">
                            <el-option v-for="(ste,index) of setArr" :label="ste" :value="index"></el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item label="产线布置">
                        <el-select v-model="formGloba.resource" @change="setmoldShape()">
                            <el-option v-for="(res,index) of resources" :label="res" :value="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="铸坯形状">
<!--                        <el-input v-model.number="formGloba.moldShape" readonly></el-input>-->
                        <el-select v-model="formGloba.moldShape">
                            <el-option v-for="(sha,index) of Shapes" :label="sha" :value="index"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="铸胚尺寸(m)">
                        <div style="display:flex;">
                            <el-input v-model.number="formGloba.castBlankSize[0]" style="width: 70px"></el-input>
                            *
                            <el-input v-model.number="formGloba.castBlankSize[1]" style="width: 70px"></el-input>
                        </div>
                    </el-form-item>
                </div>
                <div>
                    <el-form-item label="铸坯截面(mm²)" :rules="rules" prop="crossSectionCast">
                        <el-input v-model.number="formGloba.crossSectionCast"></el-input>
                    </el-form-item>
                    <el-form-item label="铸坯温度(℃)" :rules="rules" prop="castTemperature">
                        <el-input v-model.number="formGloba.castTemperature"></el-input>
                    </el-form-item>
                    <el-form-item label="铸坯长度(m)" :rules="rules" prop="castBlankLength">
                        <el-input v-model.number="formGloba.castBlankLength"></el-input>
                    </el-form-item>
                    <el-form-item label="环境温度(℃)" :rules="rules" prop="ambientTemperature">
                        <el-input v-model.number="formGloba.ambientTemperature"></el-input>
                    </el-form-item>
                    <el-form-item label="入口速度(m/s)" :rules="rules" prop="entranceVelocity">
                        <el-input v-model.number="formGloba.entranceVelocity"></el-input>
                    </el-form-item>
                </div>
            </div>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "GlobalAttributes",
        data() {
            return {
                formGloba: {
                    rollLineLength: 400,
                    calculateSteel: 1,
                    steelGrade: 1,
                    moldShape: 1,
                    castBlankSize: [160, 160],
                    crossSectionCast: 25600,
                    castTemperature: 1000,
                    castBlankLength: 12.0,
                    ambientTemperature: 40,
                    entranceVelocity: 0.20,
                    resource: 1
                },
                resources: this.$getState('dict', 'Proline'),
                Steels: this.$getState('dict', 'Steel'),
                steArr: [],
                Shapes: this.$getState('dict', 'steelShape'),
                rules: [{required: true, message: '不能为空'},
                    {type: 'number', message: '必须为数字值'},]
            }
        },
        created() {
            this.getSele();
            this.setmoldShape();
        },
        methods: {
            toData() {
                // this.$parent.setData({key: 'formGloba', data: this.formGloba})
                this.$bus.$emit('tosetData',{key: 'formGloba', data: this.formGloba})
            },
            getSele() {
                this.setArr = this.Steels[this.formGloba.calculateSteel].id;
            },
            setmoldShape() {
                this.formGloba.moldShape = this.formGloba.resource;
            }

        }
    }
</script>

<style scoped type="scss">
    .globalattr {
        width: 100%;
    }

    .el-input {
        width: 80px;
    }
    .el-select{
        width: 125px;
    }
    @media (min-width: 1024px) {

    }
</style>