<template>
    <div class="cal">
        <div class="title"><h3>计算属性配置</h3></div>
        <el-form ref="form" :model="formCal" label-width="150px" :label-position="'left'" class="calform">
            <el-form-item label="计算收敛精度" prop="precision" :rules="rules">
                <el-input v-model.number="formCal.precision"></el-input>
            </el-form-item>
            <el-form-item label="径向网格数量" prop="xnum" :rules="rules">
                <el-input v-model.number="formCal.xnum"></el-input>
            </el-form-item>
            <el-form-item label="轴向网格数量" prop="ynum" :rules="rules">
                <el-input v-model.number="formCal.ynum"></el-input>
            </el-form-item>
            <el-form-item label="水箱计算步长" prop="waterStride" :rules="rules">
                <el-input v-model.number="formCal.waterStride"></el-input>
            </el-form-item>
            <el-form-item label="轧制计算步长" prop="rollingStride" :rules="rules">
                <el-input v-model.number="formCal.rollingStride"></el-input>
            </el-form-item>
            <el-form-item label="空冷计算步长" prop="airStride" :rules="rules">
                <el-input  v-model.number="formCal.airStride"></el-input>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "CalculatedAttributes",
        data(){
            return {
                formCal:{
                    precision:0.0001,
                    xnum:50,
                    ynum:50,
                    waterStride:400,
                    rollingStride:10,
                    airStride:50
                },
                rules:[{ required: true, message: '不能为空'},
                    { type: 'number', message: '必须为数字值'},]
            }
        },
        // created(){
        //     this.$bus.$on('subCalul',()=>{
        //         this.$setState('dict','dataInfo',this.formCal)
        //         let a=this.$getState('dict','dataInfo')
        //         return (this.formCal,a);
        //     })
        // },
        methods:{
            toDataCal(){
                // this.$parent.setData({key:'formCal',data:this.formCal})
                this.$bus.$emit("tosetData",{key:'formCal',data:this.formCal})
            }
        }
    }
</script>

<style scoped lang="scss">
.cal{
    .calform{
        margin-top: 25px;
    }
    .el-input{
        width: 80px;
    }
}
</style>