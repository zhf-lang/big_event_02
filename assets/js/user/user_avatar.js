$(window).on('load', function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)

    //点击上传
    $('#btnChooseImg').on('click', function () {
        $('#file').click();
    })

    // 裁剪
    $('#file').on('change', function (e) {
        var file = e.target.files[0];
        if (!file) return layui.layer.msg('请选择要上传的图片', { icon: 5 });
        var newImgURL = URL.createObjectURL(file);
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', newImgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
        
          
    })

    // 确定上传
    $('#btnUpload').on('click', function () {
        var dataURL = $image
        .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
          width: 100,
          height: 100
        })
        .toDataURL('image/png')     
    $.ajax({
        url: '/my/update/avatar',
        type: 'post',
        data: {avatar:dataURL},
        success: (res) => {
            console.log(res);
            if (res.status != 0) {
                return layui.layer.msg(res.message, { icon: 5 });
            }
            window.parent.textavaterInfo();
        }
    })
    })
})