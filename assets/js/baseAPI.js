
let baseURL = "http://api-breakingnews-web.itheima.net";

$.ajaxPrefilter(function (option) {
    option.url = baseURL + option.url;

    if (option.url.indexOf('/my/')) {
        option.headers= {
            Authorization: localStorage.getItem('token')
        }
        
        option.complete = function (res) {
            console.log(res);
           let obj= res.responseJSON
            if (obj.status != 0&&obj.message==='身份认证失败！') {
                localStorage.removeItem('token');
                location.href = '/login.html';
            }
        }
    }
})