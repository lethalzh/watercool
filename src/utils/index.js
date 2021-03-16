import {
    getState
} from "../store";
import dayjs from 'dayjs'
import _ from 'lodash'
/**
 * 格式化日期
 * @param {number} time
 * @param {string} option
 * @returns {string}
 */
export function formatTime(time, option) {
    if (('' + time).length === 10) {
        time = parseInt(time) * 1000
    } else {
        time = +time
    }
    const d = new Date(time)
    const now = Date.now()

    const diff = (now - d) / 1000

    if (diff < 30) {
        return '刚刚'
    } else if (diff < 3600) {
        // less 1 hour
        return Math.ceil(diff / 60) + '分钟前'
    } else if (diff < 3600 * 24) {
        return Math.ceil(diff / 3600) + '小时前'
    } else if (diff < 3600 * 24 * 2) {
        return '1天前'
    }
    if (option) {
        return parseTime(time, option)
    } else {
        return (
            d.getMonth() +
            1 +
            '月' +
            d.getDate() +
            '日' +
            d.getHours() +
            '时' +
            d.getMinutes() +
            '分'
        )
    }
}

/**
 * 获取url中的参数对象
 * @param {string} url
 * @returns {Object}
 */
export function getQueryObject(url) {
    url = url == null ? location.href : url
    var search = url.substring(url.lastIndexOf('?') + 1)
    if (search.indexOf("#") != -1)
        search = search.substring(0, search.indexOf("#"))
    const obj = {}
    const reg = /([^?&=]+)=([^?&=]*)/g
    search.replace(reg, (rs, $1, $2) => {
        const name = decodeURIComponent($1)
        let val = decodeURIComponent($2)
        val = String(val)
        obj[name] = val
        return rs
    })
    return obj
}

/**
 * 对象深拷贝
 * This is just a simple version of deep copy
 * Has a lot of edge cases bug
 * If you want to use a perfect deep copy, use lodash's _.cloneDeep
 * @param {Object} source
 * @returns {Object}
 */
export function deepClone(source) {
    if (!source && typeof source !== 'object') {
        throw new Error('error arguments', 'deepClone')
    }
    const targetObj = source.constructor === Array ? [] : {}
    Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === 'object') {
            targetObj[keys] = deepClone(source[keys])
        } else {
            targetObj[keys] = source[keys]
        }
    })
    return targetObj
}

/**
 * 创建随机码
 * @returns {string}
 */
export function createUniqueString() {
    const timestamp = new Date().getTime() + ''
    const randomNum = parseInt((1 + Math.random()) * 65536) + ''
    // id必须以字母开头
    var result = [];
    let n = 4; //随机生成4个字母
    for (var i = 0; i < n; i++) {
        //生成一个0到25的数字
        var ranNum = Math.ceil(Math.random() * 25);
        //大写字母'A'的ASCII是65,A~Z的ASCII码就是65 + 0~25;
        //然后调用String.fromCharCode()传入ASCII值返回相应的字符
        result += String.fromCharCode(65 + ranNum);
    }
    return (result + (+(randomNum + timestamp)).toString(32))
}

/**
 * 根据字段的值，将列表转为map，同值字段会存在覆盖
 * @param {Object} list
 * @param {Object} field 字段名 为null，表示以自身做key
 */
export function arrayToMap(list, field = null, vField = null) {
    var map = {}
    for (var i in list) {
        map[field ? (list[i][field] + "") : list[i]] = vField ? list[i][vField] : list[i]
    }
    return map
}

/**
 * map转 [{v:xx,n:xx}]的数组
 * @param {Object} map
 */
export function mapToOpsArray(map, keyField, valueField) {
    var list = []
    if (keyField && keyField.indexOf("|") != -1)
        keyField = keyField.split("|")
    else
        keyField = [keyField, keyField]
    if (valueField && valueField.indexOf("|") != -1)
        valueField = valueField.split("|")
    else
        valueField = [valueField, valueField]
    for (var i in map) {
        list.push({
            [keyField[1] || 'value']: keyField && typeof map[i] != 'string' ? map[i][keyField[0]] : (/^\d+$/.test(i) ? +i : i),
            [valueField[1] || 'label']: valueField && typeof map[i] != 'string' ? map[i][valueField[0]] : map[i]
        })
    }
    return list
}

/**
 * 提取数组中每个元素的field对应的值，然后返回值的新数组
 * @param datas
 * @param field
 * @returns {Array}
 */
export function getFieldValFromArray(datas, field) {
    var list = []
    for (var d of datas) {
        list.push(d[field])
    }
    return list
}

/**
 * 通过字典表，转译列表的字段
 * @param {Object} list  列表
 * @param {Object} field 用于转译的字段，其值对应字典表的key
 * @param {String} dictName 字典名
 * @param {Object} newField 转译后的值的存储字段，默认使用'fo_'+field
 */
export function fromatArrayDictField(list, field, dictName, newField, dictFieldName) {
    var signle = false
    if (!Array.isArray(list)) {
        list = [list]
        signle = true
    }
    for (var i in list) {
        list[i][newField || `fo_${field}`] = dictFieldName ?
            (getState('dict', dictName)[list[i][field]] ? getState('dict', dictName)[list[i][field]][dictFieldName] : '') :
            (getState('dict', dictName)[list[i][field]] || '')
    }
    return signle ? list[0] : list
}

/**
 * 格式化数组或对象的日期字段
 * @param {Object} list
 * @param {Object} field
 * @param {Object} newField
 */
export function fromatArrayTimeField(list, field, newField, format = 'YYYY-MM-DD hh:mm:ss') {
    var dayjs = require('dayjs')
    var signle = false
    if (!Array.isArray(list)) {
        list = [list]
        signle = true
    }
    for (var i in list) {
        list[i][newField || `fo_${field}`] = dayjs(list[i][field]).format(format)
    }
    return signle ? list[0] : list
}

/**
 * aes加密
 * @param content
 * @param cloud
 * @returns {string}
 */
export function encrypt(content, cloud) {
    var CryptoJS = require('crypto-js')
    // AES加密
    console.log(cloud ? $$vue.$settings.cloudAesKey : $$vue.$settings.aesKey)
    var key = CryptoJS.enc.Utf8.parse(cloud ? $$vue.$settings.cloudAesKey : $$vue.$settings.aesKey) // 与后台规定好的密码
    var encryptResult = CryptoJS.AES.encrypt(content, key, {
        mode: CryptoJS.mode.ECB, // 模式
        padding: CryptoJS.pad.Pkcs7 // 补全对齐   Pkcs7就是pkcs5padding
    })
    return encryptResult.toString()
}

/**
 * 根据某个key去掉对象数组中重复项
 * @param {Array,String}
 */
export function killObjRepeat(arr, property) {
    if (arr instanceof Array == false) return
    var filterObj = {}
    arr = arr.reduce((item, next) => {
        if (!filterObj[next[property]]) {
            filterObj[next[property]] = true
            item.push(next)
        }
        return item
    }, [])
    return arr
}

/**
 * 去掉对象中的指定的字段，或者去掉不包含指定字段的其他字段
 * @param obj  对象
 * @param fields  字段列表 string数组
 * @param exclud  是否是排除，默认false，表示去掉fields指定的字段，如果为true，表示去掉不再fields中的字段
 * @param clone 是否不修改原obj，而是clone新obj，再处理后返回
 * @returns {*}
 */
export function getDelFieldsObj(obj, fields, exclud = false, clone = true) {
    if (clone) {
        obj = deepClone(obj)
    }
    for (var i in obj) {
        var has = false
        for (var i2 in fields) {
            if (fields[i2] == i) {
                has = true
                break
            }
        }
        if (exclud && has) {
            delete obj[i]
        }
        if (!exclud && !has) {
            delete obj[i]
        }
    }
    return obj;
}

/**
 * 查询缓存，在查询后，会缓存在store中，下次调用直接返回, 缓存配置在cache.js中
 * @param apiModule 接口模块
 * @param api 接口
 * @param post   请求参数
 * @param dictVar  store中用于缓存的对象的字段名
 * @param dictObjKey  store中用于缓存的对象的指定字段的字段名
 * @returns {Promise<*>}
 */
export async function queryCacheData(apiModule, api, post, dictVar, dictObjKey) {
    var datas = $$vue.$getState('cache', dictVar)
    if (!datas || (dictObjKey ? !dictVar[dictObjKey] : false)) {
        $$vue.$api[apiModule][api](post || {}).then(res => {
            if (!res)
                return null
            else {
                if (dictObjKey) {
                    datas = datas || {}
                    datas[dictObjKey] = res.data
                } else {
                    datas = res.data
                }
                $$vue.$setState('cache', dictVar, datas)
                return dictObjKey ? datas[dictObjKey] : datas
            }
        })
    } else {
        return dictObjKey ? datas[dictObjKey] : datas
    }
}

/**
 * 获取最近N天的时间戳
 * @param {string} number
 * @returns {Array}
 */
export function recentDays(number = 0, includeToday = true) {
    if (Number.isSafeInteger(Math.abs(number))) {
        let NumberDaysBefore = Date.now() - (includeToday ? number : number + 1) * 24 * 60 * 60 * 1000
        return [dayjs(NumberDaysBefore).format('YYYYMMDDHHmmss'), dayjs(includeToday ? Date.now() : Date.now() - 24 * 60 * 60 * 1000).format('YYYYMMDDHHmmss')]
    } else {
        return [dayjs(Date.now() - 24 * 60 * 60 * 1000).format('YYYYMMDDHHmmss'), dayjs().format('YYYYMMDDHHmmss')]
    }
}

/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
    const search = url.split('?')[1]
    if (!search) {
        return {}
    }
    return JSON.parse(
        '{"' +
        decodeURIComponent(search)
        .replace(/"/g, '\\"')
        .replace(/&/g, '","')
        .replace(/=/g, '":"')
        .replace(/\+/g, ' ') +
        '"}'
    )
}

/**
 * @param {Object} instance
 * @returns {void}
 */
export function redrawChartsWhenResize(instance) {
    if (typeof instance.resize !== "function") throw new Error("请确认传入了正确的charts实例")
    let resizeChart = () => {
        instance.resize()
    }
    window.addEventListener('resize', resizeChart)
    // 注销事件与注册事件放在一起 提高可读性
    this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('resize', resizeChart)
    })
}

export function formatPicPath(pic) {
    if (!pic)
        return ''
    if (pic.indexOf("http") != -1)
        return pic
    else
        return `${process.env.VUE_APP_BASE_API}/safety/file/downFile/${pic}`
}
//下载图片
export function downloadCanvas(canvasClass = null, url) {
    if (!canvasClass) {
        document.querySelectorAll('canvas').forEach(ins => {
            const base64 = ins.toDataURL()
            const el = document.createElement('a')
            el.download = "下载"
            el.href = base64
            el.click()
        })
    }
}

// 过滤字段
export function filterField(aimObject, fields = ['pageNum', 'pageSize']) {
    let cloneObject = _.cloneDeep(aimObject)
    if (Object.prototype.toString.call(aimObject) !== "[object Object]" || !Array.isArray(fields)) {
        return aimObject
    }
    for (let key in cloneObject) {
        if (!fields.includes(key))
            delete cloneObject[key]
    }
    return cloneObject
}

//格式化违规类型种类
export function formatViolationType(id, obj) {
    let ViolationTypes = window.$$vue.$dictOpts.violationType
    let length = ViolationTypes.length
    let str = " "
    for (let i = 0; i < length; i++) {
        if (parseInt(ViolationTypes[i].key) === id) {
            str = ViolationTypes[i].value
        } else {
            for (let i = 0; i < length; i++) {
                for (let j = i + 1; j < length; j++) {
                    if (parseInt(ViolationTypes[i].key) + parseInt(ViolationTypes[j].key) === id) {
                        str = ViolationTypes[i].value + " " + ViolationTypes[j].value
                    } else {
                        for (let i = 0; i < length; i++) {
                            for (let j = i + 1; j < length; j++) {
                                for (let k = j + 1; k < length; k++) {
                                    if (parseInt(ViolationTypes[i].key) + parseInt(ViolationTypes[j].key) + parseInt(ViolationTypes[k].key) === id)
                                        str = ViolationTypes[i].value + " " + ViolationTypes[j].value + " " + ViolationTypes[k].value
                                }
                            }
                        }
                    }
                }
            }
        }
    }
    return str
}

/**
 * 按位运算的枚举转换 返回一个指定分隔符的字符串
 * @param {Object} dictObj 枚举表
 * @param {Number} value 后端返回枚举值
 * @param {string} separate 分隔符
 * @param {string} result 结果 此参数为递归时传入
 * @returns {string}
 */

export function dictByBit(dictObj, value, separate = '、', result = "") {
    if (Object.prototype.toString.call(dictObj) != "[object Object]") return ''

    let dictLocation = []
    Object.keys(dictObj).forEach(bit => {
        dictLocation.push(bit)
    })
    if (dictObj[value]) {
        return (result ? (result + separate) : '') + dictObj[value]
    }
    for (let i = 1; i < 1024; i++) {
        if (value >> i === 1) {
            let afterMove = value - dictLocation[i]
            return dictByBit(dictObj, afterMove, separate, (result ? (result + separate) : '') + dictObj[dictLocation[i]])
        }
    }
}

/**
 * 接收一个对象 默认去掉其中非0以外falsey值 用于向后端发送参数过滤无效搜索值
 * @param {Object} params
 * @param {Array} include
 * @param {Boolean} deepClone
 * @returns {Object}
 */

export function deleteFalsyField(params = {}, except = [null, undefined, false, ""], deepClone = true) {
    if (Object.prototype.toString.call(params) !== "[object Object]") return params
    let cloneParams
    if (deepClone)
        cloneParams = _.cloneDeep(params)
    else
        cloneParams = params
    Object.keys(cloneParams).forEach(key => {
        if (except.includes(cloneParams[key])) {
            delete cloneParams[key]
        }
    })
    return cloneParams
}
//通过身份证号计算年龄和性别
export function analyzeIDCard(IDCard) {
    var sexAndAge = {}
    // 获取用户身份证号码
    // var userCard = IDCard.replace(/\s/g, "");//正则去掉字符串中所有空格
    var userCard = IDCard
    // 如果身份证号码为undefind则返回空
    if (!userCard) {
        return sexAndAge
    }
    // 获取性别
    if (parseInt(userCard.substr(16, 1)) % 2 == 1) {
        sexAndAge.sex = '1（男）'
    } else {
        sexAndAge.sex = '2（女）'
    }
    // 获取出生年月日
    // userCard.substring(6,10) + "-" + userCard.substring(10,12) + "-" + userCard.substring(12,14);
    var yearBirth = userCard.substring(6, 10)
    var monthBirth = userCard.substring(10, 12)
    var dayBirth = userCard.substring(12, 14)
    // 获取当前年月日并计算年龄
    var myDate = new Date()
    var monthNow = myDate.getMonth() + 1
    var dayNow = myDate.getDay()
    var age = myDate.getFullYear() - yearBirth
    if (monthNow < monthBirth || (monthNow == monthBirth && dayNow < dayBirth)) {
        age--
    }
    // 得到年龄
    sexAndAge.age = age
    // 返回性别和年龄
    return sexAndAge
}
// 查询籍贯
export async function formatRegion(id) {
    const [err, res] = await this.$apis.company.regionDetail({
        regionId: id

    });
    // var data = null
    if (res) {
        return res.areaName
    }
    // return data
}

/**
 * 清空对象value 保留key
 * @param obj
 */
export function clearValue(obj) {
    Object.keys(obj).forEach(key => {
        if (typeof obj[key] == 'object') {
            this.clearValue(obj[key])
        } else {
            obj[key] = '';
        }
    });
}

/**
 *
 * 是否安装了flash
 */
export function flashChecker() {
    var hasFlash = 0; //是否安装了flash
    var flashVersion = 0; //flash版本
    if (document.all) {
        var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
        if (swf) {
            hasFlash = 1;
            VSwf = swf.GetVariable("$version");
            flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
        }
    } else {
        if (navigator.plugins && navigator.plugins.length > 0) {
            var swf = navigator.plugins["Shockwave Flash"];
            if (swf) {
                hasFlash = 1;
                var words = swf.description.split(" ");
                for (var i = 0; i < words.length; ++i) {
                    if (isNaN(parseInt(words[i]))) {
                        continue;
                    }
                    flashVersion = parseInt(words[i]);
                }
            }
        }
    }
    return {
        hasFlash,
        flashVersion
    }
}