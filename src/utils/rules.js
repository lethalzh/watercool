export default {
    rules: {
        fileId: [
            {
                required: true,
                message: '文件上传没有成功或当前没有文件',
                trigger: 'blur'
            }
        ],
        rename: [{required: true, message: '请输入姓名', trigger: 'blur'}]
    },
    //活动表单配置
    activityFormRules: {
        huodongName: [{required: true, message: '请输入'}],
        contactPerson: [{required: true, message: '请输入'}],
        contactTel: [{required: true, message: '请输入'}],
        svcStartTime: [{required: true, message: '请输入'}],
        svcEndTime: [{required: true, message: '请输入'}],
        assessStart: [{required: true, message: '请输入'}],
        assessEnd: [{required: true, message: '请输入'}],
        svcTimelong: [{required: true, message: '请输入'}],
        // svcRegion: [{required: true, message: '请选择行政区'}],
        svcAddr: [{required: true, message: '请输入'}],
        needVolunMin: [{required: true, message: '请输入'}],
        needVolunMax: [{required: true, message: '请输入'}],
        huodongDesc: [{required: true, message: '请输入'}],
        baomingRequire: [{required: true, message: '请选择'}],
    }
}
