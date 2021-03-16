<template>
    <div class="app-container">
        <el-button type="primary" @click="onClickDownDaily">txt导出</el-button>
    </div>
</template>

<script>
    export default {
        props:{
            tableData:{
                type:Object,
                default:{}
            }
        },
        data() {
            return {
                // tableData:[
                //     {id:1,name:'小明',age:18},
                //     {id:2,name:'小红',age:10},
                //     {id:3,name:'晓东',age:33}
                // ]
            }
        },
        created() {
        },
        methods: {
// txt文件导出
            onClickDownDaily() {
                console.log(this.tableData,'---------------------')
                let timestamp = Date.parse(new Date());
                let titarr=['Core','Median','Surface']
                var title = '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'+''+timestamp+''+'>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'
                var str=''
                for(let j= 0 ;j<3;j++){
                  //  str+=titarr[j]+'\r\n\r\n'
                    str+='line'+j+'\r\n\r\n'
                    for(let i in this.tableData['line'+j].x){
                        str+='X:'+this.tableData['line'+j].x[i]+'   '+'Y:'+this.tableData['line'+j].y[i]+'\r\n'
                    }
                }


                var allStr = title+'\r\n'+'\r\n'+str
                var export_blob = new Blob([allStr]);
                var save_link = document.createElement("a");
                save_link.href = window.URL.createObjectURL(export_blob);
                save_link.download =timestamp+'.txt';
                this.fakeClick(save_link);
            },
            fakeClick(obj) {
                var ev = document.createEvent("MouseEvents");
                ev.initMouseEvent(
                        "click",
                        true,
                        false,
                        window,
                        0,
                        0,
                        0,
                        0,
                        0,
                        false,
                        false,
                        false,
                        false,
                        0,
                        null
                );
                obj.dispatchEvent(ev);
            }
        }
    }
</script>

<style scoped>

</style>
