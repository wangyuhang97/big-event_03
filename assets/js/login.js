$(function() {
    //// 去  注册 去  登录 的点击事件
    $('#login-a').on('click',function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#reg-a').on('click',function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    ////
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pwd:[/^[\S]{6,12}$/,"密码必须为6-12位，且不能出现空格"],
        repwd:function(value) {
            var pwd = $('.reg-box [name=password]').val()
            if(value !== pwd) {
                return '俩次密码输入不一致'
            }

        }
    })
//// 监听 form 表单的提交事件 
    $('.reg-box form').on('submit',function(e) {
        e.preventDefault()
        var data = {username:$('.reg-box [name=username]').val(),
                    password:$('.reg-box [name=password]').val()}
        $.ajax({
            method:'POST',
            url:'/api/reguser',
            data:data,
            success:function(res) {
                if(res.status !== 0) {return layer.msg(res.message)}
                layer.msg(res.message)
                $('#reg-a').click()
            }
        })
    })
    $('.login-box form').on('submit',function(e) {
        e.preventDefault()
        var data = {username:$('.login-box [name=username]').val(),
                    password:$('.login-box [name=password]').val()}
        $.ajax({
            method:'POST',
            url:'/api/login',
            data:data,
            success:function(res) {
                if(res.status !== 0){return layer.msg(res.message)}
                layer.msg(res.message)
                location.href = '/index.html'
                localStorage.setItem('token',res.token)
            }
        })
    })
})