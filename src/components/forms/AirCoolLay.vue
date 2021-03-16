<template>
    <div class="airlay">
        <div class="airform box">
            <div class="title"><h5>吐丝机-风冷线配置</h5></div>
            <el-form ref="airform" :model="formAirLay" label-width="180px" :label-position="'left'">
                <el-form-item label="吐丝机倾角(°)" :rules="rules" prop="layAngle">
                    <el-input v-model.number="formAirLay.layAngle"></el-input>
                </el-form-item>
                <hr>
                <el-form-item label="风冷线长度(m)">
                    <el-input v-model.number="formAirLay.length" disabled></el-input>
                </el-form-item>
                <el-form-item label="风机数量(台)" :rules="rules" prop="fansNum">
                    <el-input v-model.number="formAirLay.fansNum" ></el-input>
                </el-form-item>
                <el-form-item label="首段冷却段长度(m)" :rules="rules" prop="airStar.length">
                    <el-input v-model.number="formAirLay.airStar.length" style="width: 35%"></el-input>
                    <el-button type="primary"  size="medium" @click="showFlag1=!showFlag1">首段冷却属性</el-button>
                </el-form-item>
                <fieldset v-if="showFlag1" class="box4" style="position: absolute;left: -80%;top:35%;width: 250px;">
                    <legend>首段冷却属性</legend>
                    <div> <el-form-item label="冷却段换热模型/换热系数 W/(m²*℃)" >
                        <el-input v-model.number="formAirLay.airStar.heatModel"></el-input>
                    </el-form-item>
                        <el-form-item label="冷却段轧辊速度(m/s)" >
                            <el-input v-model.number="formAirLay.airStar.rollSpeed"></el-input>
                        </el-form-item></div>
                </fieldset>

                <el-form-item label="中段冷却段长度(m)" :rules="rules" prop="airMid.NLength">
                    <el-input v-model.number="formAirLay.airMid.NLength"  style="width: 35%"></el-input>
                </el-form-item>
                <el-form-item label="中段冷却段段数" :rules="rules" prop="airMid.Num">
                    <el-input v-model.number="formAirLay.airMid.Num"  style="width: 35%"></el-input>
                    <el-button v-if="yanz()" type="primary" @click="showFans()">设置</el-button>
                </el-form-item>
                <el-form-item label="尾段冷却段长度(m)" :rules="rules" prop="airEnd.length">
                    <el-input v-model.number="formAirLay.airEnd.length" style="width: 35%"></el-input>
                    <el-button type="primary"  size="medium" @click="showFlag2=!showFlag2">尾段冷却属性</el-button>
                </el-form-item>
                <fieldset v-if="showFlag2" class="box4" style="position: absolute;left: 105%;top:35%;width: 250px;">
                    <legend>尾段冷却属性</legend>
                    <div> <el-form-item label="冷却段换热模型/换热系数 W/(m²*℃)" >
                        <el-input v-model.number="formAirLay.airEnd.heatModel"></el-input>
                    </el-form-item>
                        <el-form-item label="冷却段轧辊速度(m/s)">
                            <el-input v-model.number="formAirLay.airEnd.rollSpeed"></el-input>
                        </el-form-item></div>
                </fieldset>
            </el-form>
            <div class="buttons">
                <el-button type="primary" @click="prev()">上一步</el-button>
                <el-button type="primary" @click="SubLay('airform')">下一步</el-button>
            </div>
        </div>

        <Mid-Attributes ref="toFans"></Mid-Attributes>
    </div>
</template>

<script>
    import MidAttributes from "@/components/forms/MidAttributes.vue"
    export default {
        name: "AirCoolLay",
        components:{MidAttributes},
        data(){
            return {
                formAirLay:{
                    layAngle:20,
                    fansNum:14,
                    length:0,
                    airStar:{
                        length:5,
                        heatModel:500,
                        rollSpeed:0.3
                    },
                    airMid:{
                        NLength:9,
                        Num:9,
                        fans:[],
                    },
                    airEnd:{
                        length:5,
                        heatModel:500,
                        rollSpeed:0.3
                    }
                },
                showFlag1:true,showFlag2:true,
                rules:[{ required: true, message: '不能为空'},
                    { type: 'number', message: '必须为数字值'},]
            }
        },
        methods:{
            getLength(){
                let Slen=parseInt(this.formAirLay.airStar.length);
                let Elen=parseInt(this.formAirLay.airEnd.length);
                let Mlen=parseInt(this.formAirLay.airMid.NLength );
                let Mn=parseInt(this.formAirLay.airMid.Num);
                this.formAirLay.length =  Slen + Elen + Mlen* Mn;
            },
            SubLay(formname){
                this.$refs[formname].validate((valid) => {
                    if (valid) {
                        this.$parent.next({key:'formAirLay',data:this.formAirLay})
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            prev(){
                this.$parent.previous()
            },
            showFans(){
                let num = this.formAirLay.fansNum
                let mnum = this.formAirLay.airMid.Num
                this.formAirLay.airMid.fans=[];
                let j=1;
                for(let i=0;i< num;i++){
                    if(j>mnum) j=1;
                    this.formAirLay.airMid.fans.push({
                        fanNum:j,
                        rollerSpeed:0.3,
                        coolMethod:1,
                        fanAir:21,
                        fanOpenDegree:100,
                        fanAngle:90,
                        heatModel:500,
                        statu:true,
                    })
                    j++;
                }
                this.formAirLay.airMid.fans.sort((a,b)=>{
                    return  a.fanNum-b.fanNum
                })
                this.$refs.toFans.chage(this.formAirLay.airMid.fans)
            },
            yanz(){
               return (typeof (parseInt(this.formAirLay.airMid.Num)))=='number'
            },
            setFans(data){
                this.formAirLay.airMid.fans=data;
            }
        },
        updated() {
            this.getLength();
            this.yanz();
        }
    }
</script>

<style scoped lang="scss">
@import '../../assets/myborder.scss';
.airlay{
    margin-top: 20px;
    width: 100%;
    display: flex;
    justify-content: center;
    .airform{
        width: 20%;
        min-width:375px;
    }
}
.buttons{
    text-align: center;
    margin: 10px 0 10px 0;
}
</style>