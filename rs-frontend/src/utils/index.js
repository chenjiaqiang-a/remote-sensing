export * from './paramMaps';

//防抖函数
export function debounce(func, delay) {
    let timer = null;
    return function (...args) {
        timer && clearTimeout(timer); //如果此时timer存在就清除timer
        timer = setTimeout(() => {
            func.apply(this, args);
        }, delay);
    };
}

//节流函数
export function throttle(fn, delay = 1000) {
    let lastTime = ''
    let timer = ''
    let interval = delay
    return function () {
        let args = arguments
        let nowTime = Date.now()
        if (lastTime && nowTime - lastTime < interval) {
            clearTimeout(timer)
            timer = setTimeout(() => {
                lastTime = nowTime
                fn.apply(this, args)
            }, interval)
        } else {
            lastTime = nowTime
            fn.apply(this, args)
        }
    }
}

export function saveImage(dataUrl, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}