<template>
    <div class="czjz">
        <div class="buttons">
            <div style="text-align: left;color:#479AC7"><h3>{{titles[flag]}}配置</h3></div>

        </div>

        <el-form :model="dynamicValidateForm"  ref="dynamicValidateForm" label-width="160px" class="demo-dynamic" :label-position="'left'">

            <div class="formd">
                <div   v-for="(domain, index) in dynamicValidateForm.domains" class="formdiv" :key="index+'r'">
                    <div>
                        <div class="buttons" v-if="flag<3&&resource==1">
                            编号: {{domain.rollnumber}}{{domain.rollnumber%2?'V':'H'}}
                        </div>
                        <div class="buttons" v-else-if="flag<3&&resource==0">
                            编号: {{domain.rollnumber}}{{domain.rollnumber%2?'H':'V'}}
                        </div>
                        <div class="buttons" v-else>
                            编号: {{domain.rollnumber}}#
                        </div>
                        <div style="position: relative; left: 230px;top:-30px">
                            <i class="el-icon-close" @click.prevent="removeDomain(domain)"></i>
                        </div>
                    </div>


<!--                    <el-form-item label="相对位置(m)"  :prop="'domains.' + index + '.absolutem'" :rules="rules">-->
<!--                        <el-input v-model.number="domain.absolutem"></el-input>-->
<!--                    </el-form-item>-->
                    <el-form-item label="绝对位置(m)"  :prop="'domains.' + index + '.absolutem'" :rules="rea">
                        <el-input v-model.number="domain.absolutem"></el-input>
                    </el-form-item>
                    <el-form-item label="与上一设备间隔(m)" >
                        <el-input v-model.number="domain.relativem" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="轧辊直径(mm)"  :prop="'domains.' + index + '.RollerDiameter'" :rules="rules">
                        <el-input v-model.number="domain.RollerDiameter"></el-input>
                    </el-form-item>
                    <el-form-item label="延伸系数(%)"  :prop="'domains.' + index + '.ExtensionFactor'" :rules="rules">
                        <el-input v-model.number="domain.ExtensionFactor"></el-input>
                    </el-form-item>
                    <el-form-item label="形变系数(%)"  :prop="'domains.' + index + '.DeformationCoefficient'" :rules="rules">
                        <el-input v-model.number="domain.DeformationCoefficient"></el-input>
                    </el-form-item>
                    <el-form-item label="抗拉强度(Mpa)"  :prop="'domains.' + index + '.TensileStrength'" :rules="rules">
                        <el-input v-model.number="domain.TensileStrength"></el-input>
                    </el-form-item>
                    <div class="buttons">
<!--                         v-if="dynamicValidateForm.domains.length==index+1"-->
                            <el-button  @click="removeDomain(domain)" >删除</el-button>
                    </div>
                </div>
            </div>
                <div class="buttons btm">
                    <el-button type="primary" @click="prev">上一步</el-button>
                    <el-button type="primary" @click="addDomain">新增轧机</el-button>
                    <el-button type="primary" @click="submitForm('dynamicValidateForm')">下一步并保存</el-button>
                </div>
        </el-form>
        </div>

</template>

<script>
    export default {
        name: "czjz",
        props:{
            active:{type:Number},
            start:{type:Number,default:0},
            flag:{type:Number},
            stride:{type:Number,default:4},
            resource:{type:Number,default:1},
        },
        data() {
            var validate = (rule, value, callback) => {
                let start;
                let arr= rule.field.split('.');
                if(arr[1]==0)
                    start=this.start;
                else
                    start=this.dynamicValidateForm.domains[arr[1]-1].absolutem
                if (value-start<=0) {
                    console.log(rule,value,'aa',arr,this.dynamicValidateForm.domains[arr[1]].absolutem)
                    callback(new Error('位置错误'));
                } else {
                    callback();
                }
            };
            return {
                titles:['粗轧机组','中轧机组','预精轧机组','精轧机组','减定径机组'],
                totitle:['RoughRoll','MediumRoll','PreFinishRoll','FinishRoll','ReducedRoll'],
                num:1,
                dynamicValidateForm: {
                    domains: [],
                    length:0,
                },
                rea:[{validator:validate,trigger: 'blur',required: true,}],
                rules:[{ required: true, message: '不能为空'},
                    { type: 'number', message: '必须为数字值'},
                  //  {  pattern: /^(0|[1-9]\d?\d?|1000)$/, message:'必须为0-1000'}
                    ]
            };
        },
        watch:{
            active:{
                handler:function(){
                    this.resetNUM()
                }
            },

        },
        created(){
            if(this.$getState('dict',this.totitle[this.flag]).length!=0)
                this.dynamicValidateForm.domains=this.$getState('dict',this.totitle[this.flag])
            else {
                this.addDomain()
            }
            this.resetNUM()

        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let le=this.dynamicValidateForm.domains.length
                        if(le!=0){
                            this.dynamicValidateForm.length=this.dynamicValidateForm.domains[le-1].absolutem;
                            this.$setState('dict',this.totitle[this.flag],this.dynamicValidateForm.domains)
                        } else
                            this.dynamicValidateForm.length=this.start
                        this.$parent.next({key:this.totitle[this.flag],data:this.dynamicValidateForm})
                       // console.log(this.dynamicValidateForm,'+++++++++++',valid, this.dynamicValidateForm.length)
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            removeDomain(item) {
                var index = this.dynamicValidateForm.domains.indexOf(item)
                if (index !== -1) {
                    this.dynamicValidateForm.domains.splice(index, 1)
                }
                this.resetNUM()
                this.updaAbsm()

            },
            addDomain() {
                this.dynamicValidateForm.length=this.start+this.stride*(this.dynamicValidateForm.domains.length)
                if(this.flag>0){
                    this.dynamicValidateForm.length+=this.stride
                }
                this.dynamicValidateForm.domains.push({
                    rollnumber:0,
                    relativem:0,
                    absolutem: null,
                    RollerDiameter:610,
                    ExtensionFactor:120,
                    DeformationCoefficient:200,
                    TensileStrength:200
                });
                this.$setState('dict',this.totitle[this.flag],this.dynamicValidateForm.domains)
                this.resetNUM()

            },
            updaAbsm(){
                let n=this.start;
                for(let i of this.dynamicValidateForm.domains){
                    i.relativem=(i.absolutem-n).toFixed(2);
                    // if(i.relativem<=0)
                    //     this.$message({
                    //         message: '编号'+i.rollnumber+'轧机绝对位置有误',
                    //         type: 'warning'
                    //     });
                    n=i.absolutem;i
                }
            },
            prev(){
                this.$parent.previous()
            },
            resetNUM(){
                let j= 1;
                for(let i=0;i<this.flag;i++){
                    j+=this.$getState('dict',this.totitle[i]).length
                   // console.log(i,j,'iiiiii',this.$getState('dict',this.totitle[i]).length)
                }
                let le=this.$getState('dict',this.totitle[this.flag]).length

                this.dynamicValidateForm.domains=this.$getState('dict',this.totitle[this.flag])
                for(let t of this.dynamicValidateForm.domains){
                   t.rollnumber=j++;
                }

            }
        },
        updated() {
            this.updaAbsm();
        },
        destroyed() {
            this.$setState('dict',this.totitle[this.flag],this.dynamicValidateForm.domains)
            console.log(this.$getState('dict',this.totitle[this.flag]),'destroyed')
        }
    }
</script>

<style lang="scss" scoped>
    .czjz{
        width: 80%;
    }
    .buttons{
        text-align: center;
        margin: 10px 0 10px 0;
        font-family: times new roman;
    }
    .btm{
        position: fixed;
        bottom: 0;
        left: 46%;
    }
    .formd{
        display: flex;
        flex-wrap: wrap;
    }
    .formdiv{
        width: 16%;
        min-width: 248px;
        height: 100%;
        margin: 20px 25px 0 0;
        padding: 10px 18px 5px 10px;
        /*border:1px solid #cee3e9;*/
        /*background:#f1f7f9;*/
        border:1px solid #5C9CC0;
        border-radius:30px;
        background-color:#cee3e9;
        box-shadow: 0 0 7px 7px #cee3e9;
    }
    /*@media (min-width: 1024px){*/
    /*    .formdiv{width: 250px}*/
    /*} !*>=1024的设备*!*/

</style>