# watercool
使用vue+element ui+vuex+axio+echarts

## Project setup  第一次进入安装依赖
```
npm install
```

### Compiles and hot-reloads for development   运行项目
```
npm run dev
```

### Compiles and minifies for production  打包 文件在dist
```
npm run build
```

api 访问方式this.$apis.xx.xx()

vuex this.$getState('xx','xxx') 获取 xx：store文件夹里面的文件 xxx:变量名 
          $setState('xx','xxx',xxx) 设置



文件导入 提交前端->解析文件数据分块->放入vuex中—>所有组件进入时获取vuex中数据

导出 outPut.vue

AirCoolLay.vue 风冷线 《=  MidAttributes.vue 中段参数

FlyShear.vue 飞剪

HeatingFurnace.vue 除鳞箱 《=  CalculatedAttributes.vue  计算属性 《=   GlobalAttributes.vue  全局属性
 WaterTankAttributes.vue  水箱   《=      nozzleForm.vue 水箱喷嘴
 
 RollingMill.vue 轧机   
 
 TemperatureCurve.vue 温度曲线
 