<template>
    <div>
<!--        <router-view></router-view>-->
        <div class="queue">
            <div class="title"><h2>状态列表</h2></div>
            <el-pagination style="text-align: center;margin-bottom: 15px"
                           background
                           :page-size="15"
                           @current-change="resSize"
                           layout="total,prev, pager, next"
                           :total="total">
            </el-pagination>
            <el-table
                    :data="tableData"
                    stripe
                    style="margin: 0 auto;width: 1250px">
                <el-table-column
                        prop="id"
                        label="序号"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="task_name"
                        label="任务名"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="json_file"
                        width="250"
                        label="提交的数据">
                </el-table-column>
                <el-table-column
                        prop="created_at"
                        label="创建时间"
                        width="200">
                </el-table-column>
                <el-table-column
                        prop="result_file"
                        label="结果状态"
                        width="200">
                    <template slot-scope="scope">
                        <el-tag v-if="scope.row.result_file=='Calculating...'"  type="warning">{{scope.row.result_file}}</el-tag>
                        <div v-else>{{scope.row.result_file}}</div>
                    </template>
                </el-table-column>
                <el-table-column
                        prop="result_file"
                        label="查看数据"
                        width="200">
                    <template slot-scope="scope">
                        <el-button  type="primary" @click="getSheetData(scope)">查看曲线</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="fixedBox" >
                <i ref="fixedicon" :class="showUpDwon?'el-icon-caret-bottom fixedicon':'el-icon-caret-top fixedicon'" @click="showBtn"></i>
                <div class="fixedbtm1" ref="fixedbtm">
                    <div>
                        <button type="primary" size="medium"  @click="clickHandle2" class="abtn">返回输入页</button>
                    </div>
                    <div>
                        <a type="primary" size="medium"  :href="$getState('user','TohomeUrl')" class="abtn">返回主页</a>
                    </div>
                </div>
            </div>

        </div>
        <router-view></router-view>
    </div>

</template>

<script>


    export default {
        name: 'Queue',

        data() {
            return {
                flag:false,
                tableData: [],
                page: 1,
                total:0,
                showUpDwon:true,
                // seriesData:{},
            }
        },
        methods: {
            async getTabls() {
                let [err, res] = await this.$apis.company.getWatercoolTable({page: this.page});
                if (res?.count >=0) {
                    this.total=res.count
                    this.tableData = res.results;
                    for(let i of  this.tableData){
                        let arr1 = i.json_file.split('/')
                        i.json_file=arr1[arr1.length-1];
                        let arr2 = i.result_file.split('/')
                        i.result_file=arr2[arr2.length-1];
                    }
                } else {
                    this.$message({
                        type: 'warning',
                        message: '接口访问失败'
                    });
                }
            },
            async getSheetData(file){
                let [err,res]= await  this.$apis.company.getWatercoolSheet({result_file:file.row.result_file})
                if(res.msg!=="result_file false"){
                    this.seriesData=res.msg
                    localStorage.clear();
                    localStorage.setItem("seriesData",JSON.stringify(this.seriesData));
                    this.$router.push({path:'/water_cool_sheet/'})
                    // let routeUrl = this.$router.resolve({
                    //             path: "/water_cool_sheet",
                    //         });
                    // window.open(routeUrl.href, '_blank');
                }else {
                        this.$message({
                            message: '数据计算中或者数据计算失败',
                            type: 'warning'
                        });
                }
            },
            resSize(val){
                    this.page=val;
                    this.getTabls();
            },
            showBtn(){
                let btn=this.$refs.fixedbtm
                let icon =this.$refs.fixedicon
                btn.style.display=btn.style.display=="block"?'none':'block'
                this.showUpDwon=!this.showUpDwon
                //icon.style.display=btn.style.display=="block"?'none':'block'
            },
            clickHandle(){
                // window.history.back()
                this.$router.push({path:'/database_table/'})
            },
            clickHandle2(){
                // window.history.back()
                this.$router.push({path:'/cooling_calculation_vue/'})
            },

        },
        created() {
            this.getTabls();
            let docArr = document.getElementsByTagName('*')
            console.log([...new Set(docArr)])
        }
    }
</script>
<style lang="scss" scoped>
    @import '../assets/fixedBox.scss';
    .queue {
        .title {
            text-align: center;
            margin-bottom: 20px;

        }
    }

</style>