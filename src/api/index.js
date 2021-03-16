
/* 加载modules下所有的接口文件 */
var moduleFiles = require.context('./modules', true, /\.js$/)
var mockDataModuleFiles = require.context('./mock-data', true, /\.js$/)
const apiFuns = {}
moduleFiles.keys().map(function (modulePath) {
    var moduleName = modulePath.substr(modulePath.lastIndexOf('/') + 1, modulePath.length - 5)
    if(moduleName=='index')
    return
    console.log("api模块>>>", moduleName);
    apiFuns[moduleName] = {};
    var apis = moduleFiles(modulePath)
    var mockData = null
    try {
        var moduleFilePath = `./${moduleName}.js`
        mockData = mockDataModuleFiles(moduleFilePath).default
        console.log("mock模块文件读取成功>>>", moduleName, mockData);
    } catch (error) {
    }
    // 将api配置转换为rest接口处理对象
    for (let apiName in apis) {
        let fun = apis[apiName]
        apiFuns[moduleName][apiName] = function to(...p) {
            if (!mockData || mockData.disabled)
                return fun.apply(this,p).then(data => {
                    return [null, data]
                }).catch(err => {
                    return [err]
                });
            else {
                console.log("返回mock数据>>>>>>", moduleName, apiName)
                return new Promise(function (resolve, reject) { resolve(mockData[apiName]) }).then(data => {
                    return [null, data]
                })
            }
        }
        // console.log("api模块", moduleName, "方法>>>", apiName);
    }
})
export default apiFuns;