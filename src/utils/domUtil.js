import config from '@/config/defaultSettings'
// 设置文档title
export const setDocumentTitle = function (title) {
  document.title = title
  // 获取浏览器版本信息
  const ua = navigator.userAgent
  // eslint-disable-next-line
  const regex = /\bMicroMessenger\/([\d\.]+)/
  // 判断是否是微信浏览器打开并且是ios设备
  // ios设备下微信浏览器首次加载页面初始化title后，就再也不监听 document.title的change事件，因此只使用document.title来修改，不会有效果
  if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
    // 加载一个空的iframe然后删除
    const i = document.createElement('iframe')
    i.src = '/favicon.ico'
    i.style.display = 'none'
    i.onload = function () {
      // 加载完成
      setTimeout(function () {
        i.remove()
      }, 9)
    }
    document.body.appendChild(i)
  }
}

export const domTitle = config.title
