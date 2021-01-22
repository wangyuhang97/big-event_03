var baseURL = 'http://api-breakingnews-web.itheima.net'
//// 在发送AJAX之前，会触发
$.ajaxPrefilter(function(pa) {
    ////拼接对应环境的URL地址
    pa.url = baseURL + pa.url

    //// 给有权限的路径接口，添加头信息
         //// indexOf('/my/') 查询是否包含 /my/ 字符 (有该字符返回位置，没有则返回 -1)
           // 查询pa 的 url 属性中是否包含 /my/ 字符 (有/my/的路径是需要访问权限的)
    if(pa.url.indexOf('/my/') !== -1) {
        pa.headers = {
            Authorization:localStorage.getItem('token')||''
        }
    }

    // 3.登录拦截
     pa.complete = function(pa) {
         var obj = pa.responseJSON
         if(obj.status !== 0 && obj.message === '身份认证失败！') {
         //// 1 . 强制清空 token
         localStorage.removeItem('token')
         //// 2 . 强制跳转到登录页
         location.href = '/login.html'
    }
     }
})