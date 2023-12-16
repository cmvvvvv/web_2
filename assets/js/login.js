$(function(){
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    $('#link_login').on('click',function(){
        $('.reg-box').hide()
        $('.login-box').show()
    })

    //获取from对象
    var form=layui.form
    var layer=layui.layer
    //自定义
    form.verify({
        pwd:[/^[\S]{6,12}$/,'密码必须6到12位，且不能出现空格'],
        repwd:function(value){
            var pwds=$('.reg-box [name=password]').val()
            if (pwds!==value){
                return'两次密码不一致' ;
            }

        }
    })
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        $.post('http://ajax.frontend.itheima.net/api/reguser',{
            username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()
        },function(res){
            if(res.status !==0){
                return console.log(res.message)
            }
            layer.msg('注册成功')
            $('#link_login').click()
        })
    })
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            url:'',
            method:'post',
            data:$(this).serialize(),
            success:function(res){
                if(res.status !==0){
                    return layer.mag('登陆失败')
                }
                layer.mag('登陆成功')
                localStorage.setItem('token',res.token)
                location.href='/index.html'
            }
        })
    })
})