export default {
    getUrlParam(that, pathUrl) {
        var name, value;
        var str = location.href; //取得整个地址栏
        var path = str;
        var num = str.indexOf("?");
        if (num > 0) {
            this.path = str.substr(0, num);
        }
        str = str.substr(num + 1); //取得所有参数   stringvar.substr(start [, length ]
        var arr = str.split("&"); //各个参数放到数组里
        let json = {};
        for (var i = 0; i < arr.length; i++) {
            num = arr[i].indexOf("=");
            if (num > 0) {
                name = arr[i].substring(0, num);
                value = arr[i].substr(num + 1);
                json[name] = value;
            }
        }
        if (arr.length == 1) {
            return;
        }
        if (json.corpId && json.userId) {
            sessionStorage["corpId"]  =  json.corpId
            sessionStorage['userId']  =  json.userId
            return
        }
        sessionStorage["token"] = json.token
        sessionStorage['userName'] = json.username
        sessionStorage['headPortrait'] = json.avatar
            // that.$router.push({ path: pathUrl })
    }
}