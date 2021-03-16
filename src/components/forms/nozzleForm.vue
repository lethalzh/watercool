<template>
    <el-dialog
            title="喷嘴设置"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="80%"
            :before-close="handleClose"
          >
        <div>
            <el-form  :model="nozzleForm" ref="nozzleFormdata" label-width="140px" :label-position="'left'" style="width: 100%;">
                <div  class="nozzlebox">
                    <div v-for="(item,index) of nozzleForm.nozzles" :key="index" class="nozzleitem">
                        <div>
                            <div style="text-align: left;color:#67C23A"><h4>{{index+1}}#喷嘴</h4> </div>
                            <div style="position: relative; left: 215px;top:-20px">
                                <i class="el-icon-close" @click.prevent="removeNozz(item)"></i>
                            </div>
                        </div>

                        <el-form-item label="喷嘴直径（mm）">
                            <el-select v-model="item.nozzleDiameter"  >
                                <el-option  v-for="(nozzleDiameter,id) of nozzleDiameters" :label="nozzleDiameter" :value="nozzleDiameter"></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="环缝宽度（mm）">
                            <el-select v-model="item.ringWidth">
                                <el-option v-for="(ringWidth,id) of ringWidths" :label="ringWidth" :value="ringWidth" ></el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="喷嘴角度（°）" >
                            <el-input v-model.number="item.nozzleAngle"  style="width: 80px"></el-input>
                        </el-form-item>
                        <el-form-item label="喷嘴状态">
                            <el-switch
                                    v-model="item.nozzleStatus"
                                    active-text="开"
                                    inactive-text="关"
                                    active-color="#13ce66"
                                    inactive-color="#ff4949">
                            </el-switch>
                        </el-form-item>
<!--                        <div class="buttons">-->
<!--                            <el-button v-if="index&&nozzleForm.nozzles.length==index+1" @click.prevent="removeNozz(item)">删除喷嘴</el-button>-->
<!--                        </div>-->
                    </div>
                </div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button @click="addNozz">添加喷嘴</el-button>
            <el-button type="primary" @click="handleClose">确 定</el-button>
        </span>
    </el-dialog>
</template>
<script>
    export default {
        name: "nozzleForm",
        // props:{
        //     nozzDatas:{
        //         type:Array,
        //         default:[  {
        //             nozzleDiameter:30,
        //             ringWidth:1.5,
        //             nozzleAngle:30,
        //             nozzleStatus:true
        //         }]
        //     },
        // },
        data() {
            return {
                dialogVisible: false,
                nozzleDiameters:[10.5,12,14,16,18,20,22,25,28,30,32,35,40],
                ringWidths:[0.5,1.5,2.0,2.5,3.0],
                nozzleForm:{
                    nozzles:[]
                }
            };
        },
        methods:{
            chage(datas){
                this.nozzleForm.nozzles=datas
                this.dialogVisible=true;
            },
            handleClose(){
                //this.$forceUpdate()
                this.dialogVisible = false;
                this.$parent.updataForm(this.nozzleForm.nozzles)
            },
            removeNozz(item) {
                var index = this.nozzleForm.nozzles.indexOf(item)
                if (index !== -1) {
                    this.nozzleForm.nozzles.splice(index, 1)
                }
            },
            addNozz() {
                console.log(typeof this.nozzleForm.nozzles)
                this.nozzleForm.nozzles.push({
                    nozzleDiameter:30,
                    ringWidth:1.5,
                    nozzleAngle:30,
                    nozzleStatus:true
                });

            }
        }
    }
</script>

<style scoped lang="scss">
    .nozzlebox{
        display: flex;
        flex-wrap: wrap;
       // justify-content: center;
        width: 100%;
        .nozzleitem{
            height: 100%;
            width: 16%;
            min-width: 230px;
            padding: 10px;
            margin: 0 20px 15px 15px;
            border:1px solid #A9C9E2;
            border-radius:30px;
            background-color:#E8F5FE;
            background-clip: padding-box;
            box-shadow: 0 0 7px 7px #E8F5FE;
            .el-select{
                width: 100px;
            }
        }
    }
    @media(min-width: 1024px) {
        .el-select{
            width: 80px !important;
        }
    }
</style>