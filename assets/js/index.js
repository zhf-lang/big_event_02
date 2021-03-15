
$(function () {
    textavaterInfo();
    // console.log($('.textavater'));

    // 退出
    $('#btnLogout').on('click', function () {
        layer.confirm('确定要退出?', {icon: 3, title:'提示'}, function(index){
            //do something
            localStorage.removeItem('token');
            location.href="/login.html"
            layer.close(index);
          });
    })
})

function textavaterInfo() {

    $.ajax({
        url: '/my/userinfo',
        type: 'get',

        success: (res) => {
            // console.log(res.data);
            if (res.status !== 0) {
                return layui.layer.msg(res.message,{icon:5})
            }
            layui.layer.msg(res.message,{icon:6})
            getUserInfo(res.data);
        }
    })
}

function getUserInfo(user) {
    
    let name = user.nickname || user.username;
    $('#welcome').html("欢迎&nbsp;&nbsp;"+name);
    
    if (user.user_pic !== null) {
        $('.layui-nav-img').show().prop('src', user.user_pic)
        $('.textavater').hide();
    } else {
        $('.layui-nav-img').hide();
        $('.textavater').html(name[0].toUpperCase());
    }
}