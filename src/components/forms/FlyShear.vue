<template>
    <div class="flyshear">
            <div  >
                <el-form  :model="shearForm" ref="shearFlyForm"  label-width="160px" :label-position="'left'">
                    <div  class="FlyShearbox">
                        <div v-for="(item,index) of shearForm.shear" :key="index" class="shearitem">
                            <div>
                                <div style="text-align: left;color:#67C23A">
                                    <h5 v-if="index<3">飞剪#{{index+1}}</h5>
                                    <h5 v-else>其他飞剪</h5>
                                </div>
                                <div style="position: relative; left: 220px;top:-20px" v-if="index>=3">
                                    <i class="el-icon-close" @click.prevent="removeShear(item)"></i>
                                </div>
                            </div>

                                <el-form-item label="剪头长度（mm）" :prop="'shear.'+index+'.cutHeadLength'" :rules="rules">
                                    <el-input v-model.number="item.cutHeadLength" style="width: 85%"></el-input>
                                </el-form-item>
                                <el-form-item label="剪尾长度（mm）" :prop="'shear.'+index+'.tailLength'" :rules="rules">
                                    <el-input v-model.number="item.tailLength"  style="width: 85%"></el-input>
                                </el-form-item>
                                <el-form-item label="成品直径（mm）"  :prop="'shear.'+index+'.finishDiameter'" :rules="rules">
                                    <el-input v-model.number="item.finishDiameter"  style="width: 85%"></el-input>
                                </el-form-item>
                                <div class="buttons">
                                    <el-button v-if="index>2" @click.prevent="removeShear(item)">删除飞剪</el-button>
                                </div>
                        </div>
                    </div>
                </el-form>
            </div>
            <div style="text-align: center">
                <el-button type="primary" @click="prev">上一步</el-button>
                <el-button type="primary" @click="addShear">添加飞剪</el-button>
                <el-button type="primary" @click="SubFly">下一步</el-button>
                <!--                <el-button @click="resetForm(`FlyForm${shearNub}`)">重置</el-button>-->
            </div>

    </div>
</template>

<script>
    export default {
        name: "FlyShear",
        props:{
           // shearNub:{default:1}
        },
        data(){
            return {
                shearForm: {
                    shear: [{cutHeadLength: 10, tailLength: 10, finishDiameter: 5},
                         {cutHeadLength: 80, tailLength: 50, finishDiameter: 55},
                         {cutHeadLength: 22, tailLength: 20, finishDiameter: 25}],
                    length:[8,7,6]
                },
                rules:[{ required: true, message: '不能为空'},
                    { type: 'number', message: '必须为数字值'},
                   // {  pattern: /^(0|[1-9]\d?\d?|1000)$/, message:'必须为0-1000'}
                    ]
            }
        },
        methods:{
            resetForm(formName) {
                console.log(formName,"formName");
                this.$refs[formName].resetFields();
            },
            addShear(){
                this.shearForm.shear.push(
                    {cutHeadLength: 0, tailLength: 0, finishDiameter: 5}
                )
            },
            removeShear(item){
                var index = this.shearForm.shear.indexOf(item)
                if (index !== -1) {
                    this.shearForm.shear.splice(index, 1)
                }
            },
            SubFly(){
                let name='shearFlyForm'
                    this.$refs[name].validate((valid)=>{
                        if(valid){
                            //console.log('val',this.shearForm)
                            this.$parent.next({key:'shearFlyForm',data:this.shearForm});
                        }
                    })
            },
            prev(){
                this.$parent.previous()
            }
        }
    }
</script>

<style scoped lang="scss">

.flyshear{
    margin-top: 20px;
    width: 80%;
}
.buttons{
    text-align: center;
    margin: 10px 0 10px 0;
}
.FlyShearbox{
    display: flex;
    width: 100%;
    flex-wrap:wrap;
    .shearitem{
        width: 16%;
        height: 100%;
        min-width: 225px;
        margin:  10px 15px 10px;
        padding: 10px;
        border:1px solid #A9C9E2;
        background-color:#E8F5FE;
        background-clip: padding-box;
        box-shadow: 0 0 7px 7px #E8F5FE;
    }
}

 /*@media (min-width: 1024px)  {*/
 /*    .FlyShearbox{*/
 /*        .shearitem{*/
 /*            width: 225px;*/
 /*        }*/
 /*    }*/
 /*   }*/
</style>