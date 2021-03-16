/**
 * vuex的module的门面
 */
var storeMap = {}


/* 加载modules下所有的接口文件 */
var moduleFiles = require.context('./modules', true, /\.js$/)
moduleFiles.keys().map(function(modulePath) {
    var moduleName = modulePath.substr(modulePath.lastIndexOf('/') + 1, modulePath.length - 5)
    var stores = moduleFiles(modulePath).default
    var store = {namespaced:true, state:{},mutations:{}}
    for(let i in stores){
        store.state[i]=stores[i]
        store.mutations[`set${i[0].toUpperCase()}${i.substr(1)}`]=function(states, params) {
		    states[i] = params
		}
    }
    storeMap[moduleName] = store
})
export default storeMap
