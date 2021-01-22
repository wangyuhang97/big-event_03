$(function() {
    var layer = layui.layer
    // alert(123)
    getUserInfo()
    //// 封装获取用户信息的 ajax 函数
//     nickname: "大航"
// user_pic: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQA"
// username:
    function getUserInfo() {
        $.ajax({
            method:'GET',
            url:'/my/userinfo',
            success:function(res) {
                if(res.status !== 0) {
                    return layer.msg(res.message)
                } render(res.data)
                
            }
        })
    }
    function render(user) {
        var name = user.nickname || user.username
        $('#welcome').html('欢迎：' + name)
        if(user.user_pic !== null) {
            $('.layui-nav-img').attr('src',user.user_pic)
            $('.text-avatar').hide()
        } else {
            $('.layui-nav-img').hide()
            var text = name[0].toUpperCase()
            $('.text-avatar').html(text).show()
        }
    }
    //// 退出功能
    $('#btnLogout').on('click',function() {
        layer.confirm('是否确认退出登录？', {icon: 3, title:'提示'}, function(index){
            console.log(123);
            // 清空本地 token
            localStorage.removeItem('token')
            // 页面跳转
            location.href = "/login.html"
            //// 关闭 confirm 询问框
            layer.close(index);
          });

    })
})