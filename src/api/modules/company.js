import request from '@/utils/request'

export function setWatercool(params){
	return request({
		url: '/cooling_calculation/task_calculation/',
		method: 'post',
		params,
	})
}


export function getWatercoolTable(params){
	return request({
		url: '/cooling_calculation/cooling_task/',
		method: 'get',
		params,
	})
}

export function getWatercoolSheet(params){
	return request({
		url: 'cooling_calculation/cooling_task_single/',
		method: 'get',
		params,
	})
}
// //获取
// export function getCompanyInfo(params) {
// 	var id = params.companyNo
//     return request({
//         url: '/safety/company/get-company/{companyNo}',
//         method: 'get',
//         params,
// 		urlParam: {companyNo:id}
//     })
// }












