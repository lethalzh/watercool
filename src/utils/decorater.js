// 防抖装饰器 stage-2 代码  
export function debounce(delay) {
    let timer = null
	// 工厂函数 接受一个delay参数
    return function(target, key, descriptor) {
        const aimFunction = descriptor.value
        descriptor.value = function() {
            let args
            if(timer) clearTimeout(timer)
            args = [...arguments].slice(1)
            timer = setTimeout(()=> {
                aimFunction.apply(this, args)
                timer = null
            }, delay) 
        }
    }
}

/**
 * 只适用于elementui的加载动画
 * @param {Node} node 
 * @param {String} message 
 */
export function loading(node, message) {
    return function(target, key, descriptor) {
        const fn = descriptor.value
        descriptor.value = async function(...args) {
            if(!!node) {
                document.querySelector(node).setAttribute('element-loading-text', message)
            }
            this.loading = true
            try {
                await fn.apply(this, args)
            } catch(err) {
                console.error(err)
            } finally {
                this.loading = false
            }
        }
    }
}