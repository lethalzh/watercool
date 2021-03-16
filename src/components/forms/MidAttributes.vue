<template>
    <el-dialog
            title="风机设置"
            :visible.sync="dialogVisible"
            :close-on-click-modal="false"
            width="1180px"
    >
        <div>

            <el-form  :model="fansForm" ref="fansFormdata" label-width="140px" :label-position="'left'" style="width: 100%;"  :inline="true" >
                <div  class="fanform">
                    <div v-for="(item,index) of fansForm.fans" :key="index" class="fanformitem" >
                        <div>
                            <div style="text-align: left;color:#67C23A"><h4>#第{{index+1}}个</h4> </div>
<!--                            <div style="position: relative; left: 215px;top:-20px">-->
<!--                                <i class="el-icon-close" @click.prevent="removeNozz(item)"></i>-->
<!--                            </div>-->
                        </div>

                            <el-form-item label="当前段号">
                                <el-input v-model.number="item.fanNum"   ></el-input>
                            </el-form-item>
                            <el-form-item label="辊道速度">
                                <el-input v-model.number="item.rollerSpeed"   ></el-input>
                            </el-form-item>
                            <el-form-item label="冷却方式" style="display: flex">
                                <el-select v-model="item.coolMethod" style="width: 50%;min-width: 120px">
                                    <el-option v-for="(re,ind) of reg" :label="re" :value="ind"></el-option>
                                </el-select>
                            </el-form-item>
                            <div v-if="item.coolMethod==0">
                                <el-form-item label="风机风量（10000m³/h）" >
                                    <el-input v-model.number="item.fanAir"   ></el-input>
                                </el-form-item>
                                <el-form-item label="风机开口度（°）" >
                                    <el-input v-model.number="item.fanOpenDegree"   ></el-input>
                                </el-form-item>
                                <el-form-item label="风机角度（°）" >
                                    <el-input v-model.number="item.fanAngle"   ></el-input>
                                </el-form-item>
                            </div>
                            <el-form-item label="换热系数/模型（W/m²*℃）" >
                                <el-input v-model.number="item.heatModel"   ></el-input>
                            </el-form-item>
                            <el-form-item label="风机状态">
                                <el-switch
                                        v-model="item.statu"
                                        active-text="开"
                                        inactive-text="关"
                                        active-color="#13ce66"
                                        inactive-color="#ff4949">
                                </el-switch>
                            </el-form-item>
                    </div>
                </div>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="subfansForm">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
    import VueDragResize from 'vue-drag-resize';
    export default {
        name: "MidAttributes",
        components:{VueDragResize},
        data() {
            return {
                dialogVisible: false,
                reg:['强制冷风','自然冷却','延迟冷却'],
                fansForm:{
                    fans:[],
                }
            };
        },
        methods:{
            chage(data){
                this.fansForm.fans=data;
                this.dialogVisible=true;

            },
            subfansForm(){
                console.log('----------', this.fansForm.fans)
                this.$parent.setFans(this.fansForm.fans)
                this.dialogVisible=false;
            }

        }
    }
</script>

<style scoped lang="scss">
.fanform{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .fanformitem{
        width: 23%;
        min-width: 250px;
        height: 100%;
        padding-left: 10px;
        margin: 10px 10px 0 0px;
        border:1px solid #eee;
        border-radius:30px;
        background-color: #E8F5FE;
        .el-input{
            width: 80px;
        }
    }
}
</style>