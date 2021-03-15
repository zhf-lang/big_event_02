$(function () {
    let form = layui.form;
    form.verify({
        nickname: function (value) {
            if (value < 1 || value > 6) {
                return '请输入1-6位的字符';
            }
        }
    });

    initUserInfo();
    // 渲染
    function initUserInfo() {
        $.ajax({
            url: '/my/userinfo',
            type: 'get',

            success: (res) => {
                // console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                form.val("initUser", res.data);
            }
        })

    }

    //重置
    $('#btnReset').on('click', function (e) {
        e.preventDefault();
        initUserInfo();
    })

    // 提交
    $('.layui-form').on('submit', function (e) {
        e.preventDefault();
        $.ajax({
            url: '/my/userinfo',
            type: 'post',
            data: $(this).serialize(),
            success: (res) => {
                console.log(res);
                if (res.status != 0) {
                    return layui.layer.msg(res.message, { icon: 5 })
                }
                layui.layer.msg('恭喜你修改成功', { icon: 6 })
                // initUserInfo();
                window.parent.textavaterInfo();
            }
        })
    })

})