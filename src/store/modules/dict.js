import {
    values
} from "lodash";

/**
 * 枚举对象
 *
 */
export default {
    RoughRoll: [],
    MediumRoll: [],
    PreFinishRoll: [],
    FinishRoll: [],
    ReducedRoll: [],

    PrefinishWaterTank: [],
    FrontWaterFinish: [],
    RearWaterTankFinish: [],
    ReducedRearWaterTank: [],
    Wnum:1,
    Rnum: 1,
    Steel:[
        {name:'建筑用钢',id:['HPB300','HRB400','HRB400E','HRB500','HRB500E', 'HRB600']},
        {name:'弹簧钢',id:['65Mn','60Si2Mn','55SiCr','55SiCrV','50CrV','60Si2CrVAT']},
        {name:'轴承钢',id:['GCr15','GCr18Mo','G20CrNi2MoA']},
        {name:'帘线钢',id:['82LX','92LX']},
        {name:'冷镦钢',id:['20MnTiB','35K','ML35Mn','20MnB','SCM435']},
        {name:'不锈钢',id:['06Cr19Ni10','06Cr17Ni12Mo2','10Cr17','12Cr13','20Cr13',' 14Cr17Ni2','42Cr9Si2','40Cr10Si2Mo','022Cr23Ni5Mo3N']},
        {name:'工具钢',id:['T8','T10']},
        {name:'普碳钢',id:['Q195','Q235','Q355']},
        {name:'齿轮钢',id:['20CrNiMo','20CrMnTiH','42CrMo']},
        {name:'焊接用钢',id:['H08A','H10MnSiMoTiB']},
        {name:'低合金钢',id:[]},
        {name:'易切削钢',id:['Y15','Y40Mn']},
        {name:'非调质钢',id:['49MnVS3','35MnVS']},
        {name:'合金结构钢',id:['20CrMnTi','25MnV','30CrMnTi','40Cr','40CrMo']},
        {name:'碳素结构钢',id:['20','45','65','70']},
        {name:'切割钢丝',id:['82LX-S','86LX-S','92LX-S']},
        {name:'镀锌钢丝',id:['82MnQL','87MnQL','90SiQL']},
    ],
    steelShape:["方坯","矩形坯","圆坯"],
    Proline:['平—立交替轧制','立—平交替轧制','扭转轧制'],
    WatheatModel:["隆键模型","经典模型","修正模型"],
    WatType:["摩根式","达涅利式","西马克式","巴登式","其他形式"],
    // 文件类型
    fileType: {
        '1': 'excel文件',
        '2': '图片',
        '3': 'apk文件',
        '0': '其它'
    },
    echartUrl: {
        url: 'https://cdn.jsdelivr.net/npm/echarts@4.9.0/dist/echarts.min.js'
    },
    ledgerType: null,
    ledgerStat: null,
    ledgerCycleType: null,
    ledgerDealWay: null,
    ledgerReportWay: null,
    devStat: null,
    factoryType: null,
    msgType: null,
    msgSubType: null,
    msgSendType: null,
    mapKey: null,
    idCardORC: null,
    role: null,
    efaceStatus: null,
    mtypes: null,
    cameraRunStat: {
        1: "在线",
        2: "离线"
    }
}