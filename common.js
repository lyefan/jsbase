/**
 * @author yeefan
 * @datetime 2014-10-27
 * @address sl.CBD
 * @Remark 基础公共JS库
 * @version 1.1.0
*/

/**
 * 返回Url根目录地址
 * @return Url根目录地址
 */
function getRootPath() {
    var strFullPath = window.document.location.href;
    var strPath = window.document.location.pathname;
    var pos = strFullPath.indexOf(strPath);
    var prePath = strFullPath.substring(0, pos);
    var postPath = strPath.substring(0, strPath.substr(1).indexOf('/') + 1);
    return (prePath + postPath);
}

/**
 * $Jquery获取数据
 * @param url
 * @param dataArray
 * @param type
 * @return
 */
function ajaxForData(url, dataArray, type) {
    url = getRootPath() + url;
    var str_returm = '';
    $.ajax({
        type: "POST",
        url: url,
        data: dataArray,
        dataType: type,
        success: function callback(data) {
            str_returm = data;
        },
        async: false//同步
    });
    return str_returm;
}

/**
 * 获取Url地址指定参数值
 * @param url地址
 * @param param  参数名称
 * @return 参数值
*/
function getParamForUrl(url, param) {
    //从url获取param
    if (url.indexOf("?") > 0) {
        var temp_url = url.substring(url.indexOf("?"), url.length);
        temp_url = temp_url.substring(temp_url.indexOf(param), temp_url.length);
        var pos_sta = temp_url.indexOf(param);
        if (pos_sta >= 0) { //
            pos_sta += param.length;
            var pos_end = temp_url.indexOf("&");
            if (-1 == pos_end)
                pos_end = temp_url.length;
            return temp_url.substring(pos_sta + 1, pos_end);
        }
    }
}

/**
 * 字符串属性方法（去除空格）
 * trim，去除左右空格
 * trimLeft，去除左空格
 * trimRight，去除右空格
 * trimAll，去除所有空格
 * 
 replaceAll，将查找替换所有的指定字符s1替换为s2
*/
String.prototype.trim = function () { return this.trimLeft().trimRight(); };

String.prototype.trimLeft = function () { return this.replace(/^[\s\xA0]+/, ""); };

String.prototype.trimRight = function () { return this.replace(/[\s\xA0]+$/, ""); };

String.prototype.trimAll = function () { return this.replace(/\s*/g, ""); };

String.prototype.replaceAll = function (s1, s2) { return this.replace(new RegExp(s1, "gm"), s2); };

/**
 * 禁止文本框输入空格
 * @param obj
 * @return 去除空格后的字符串
 */
function fbInputTrim(obj) {
    return obj.value = obj.value.replace(/(^\s*)|(\s*$)/g, "");
}

/**
 * 是否为整数
 * @param str
 * @return true/false
 */
function isInt(str) {
    var ex = /^[1-9]*[1-9][0-9]*$/;
    if (ex.test(str)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证身份证
 * @param str 验证的身份证号码
 * @return 通过返回true 失败返回false
 */
function checkCardNum(str) {
    var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
    if (reg.test(str)) {
        return true;
    } else {
        return false;
    }
}

/**
 * 验证手机号码[手机号与联系电话]
 * @param str 验证的手机号码
 * @return 通过返回true 失败返回false
 */
function checkPhoneNum(str) {
    var mobile = /1[3-8]+\d{9}/, phone = /^0\d{2,3}-?\d{7,8}$/;
    return mobile.test(str) || phone.test(str);
}

/**
 * 验证邮箱
 * @param str 邮箱
 * @return 通过返回true 失败返回false
 */
function isEmail(str) {
    return new RegExp("^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$").test(str);
}

/**
 * 正则表达式验证集合
*/
var validateRegExp = {
    decmal: "^([+-]?)\\d*\\.\\d+$", //浮点数
    decmal1: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*$", //正浮点数
    decmal2: "^-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*)$", //负浮点数
    decmal3: "^-?([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0)$", //浮点数
    decmal4: "^[1-9]\\d*.\\d*|0.\\d*[1-9]\\d*|0?.0+|0$", //非负浮点数（正浮点数 + 0）
    decmal5: "^(-([1-9]\\d*.\\d*|0.\\d*[1-9]\\d*))|0?.0+|0$", //非正浮点数（负浮点数 + 0）
    intege: "^-?[1-9]\\d*$", //整数
    intege1: "^[1-9]\\d*$", //正整数
    intege2: "^-[1-9]\\d*$", //负整数
    num: "^([+-]?)\\d*\\.?\\d+$", //数字
    num1: "^[1-9]\\d*|0$", //正数（正整数 + 0）
    num2: "^-[1-9]\\d*|0$", //负数（负整数 + 0）
    ascii: "^[\\x00-\\xFF]+$", //仅ACSII字符
    chinese: "^[\\u4e00-\\u9fa5]+$", //仅中文
    color: "^[a-fA-F0-9]{6}$", //颜色
    date: "^\\d{4}(\\-|\\/|\.)\\d{1,2}\\1\\d{1,2}$", //日期
    email: "^\\w+((-\\w+)|(\\.\\w+))*\\@[A-Za-z0-9]+((\\.|-)[A-Za-z0-9]+)*\\.[A-Za-z0-9]+$", //邮件
    idcard: "^[1-9]([0-9]{14}|[0-9]{17})$", //身份证
    ip4: "^(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)\\.(25[0-5]|2[0-4]\\d|[0-1]\\d{2}|[1-9]?\\d)$", //ip地址
    letter: "^[A-Za-z]+$", //字母
    letter_l: "^[a-z]+$", //小写字母
    letter_u: "^[A-Z]+$", //大写字母
    mobile: "^0?(13|15|17|18|14)[0-9]{9}$", //手机
    notempty: "^\\S+$", //非空
    password: "^.*[A-Za-z0-9\\w_-]+.*$", //密码
    fullNumber: "^[0-9]+$", //数字
    picture: "(.*)\\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$", //图片
    qq: "^[1-9]*[1-9][0-9]*$", //QQ号码
    rar: "(.*)\\.(rar|zip|7zip|tgz)$", //压缩文件
    tel: "^[0-9\-()（）]{7,18}$", //电话号码的函数(包括验证国内区号,国际区号,分机号)
    url: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&=]*)?$", //url
    username: "^[A-Za-z0-9_\\-\\u4e00-\\u9fa5]+$", //户名
    deptname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$", //单位名
    zipcode: "^\\d{6}$", //邮编
    realname: "^[A-Za-z\\u4e00-\\u9fa5]+$", // 真实姓名
    companyname: "^[A-Za-z0-9_()（）\\-\\u4e00-\\u9fa5]+$",
    companyaddr: "^[A-Za-z0-9_()（）\\#\\-\\u4e00-\\u9fa5]+$",
    companysite: "^http[s]?:\\/\\/([\\w-]+\\.)+[\\w-]+([\\w-./?%&#=]*)?$",
    xls: "(.*)\\.(xls|xlsx)$",
	webImg: "(.*)\\.(jpg|jpeg|gif|png|bmp)$",	//web图片
};

/**
 * 休眠
 * @param numberMillis（毫秒）
 */
function sleepm(numberMillis) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime) return;
    }
}

function sleepm(numberMillis,url) {
    var now = new Date();
    var exitTime = now.getTime() + numberMillis;
    while (true) {
        now = new Date();
        if (now.getTime() > exitTime) break;
    }
    window.location.href = url;
}

/**
 * 返回密码强度级别值
 * @param value（输入密码参数值）
 */
function pwdLevel(value) {
    var pattern_1 = /^.*([\W_])+.*$/i;
    var pattern_2 = /^.*([a-zA-Z])+.*$/i;
    var pattern_3 = /^.*([0-9])+.*$/i;
    var level = 0;
    if (value.length > 10) {
        level++;
    }
    if (pattern_1.test(value)) {
        level++;
    }
    if (pattern_2.test(value)) {
        level++;
    }
    if (pattern_3.test(value)) {
        level++;
    }
    if (level > 3) {
        level = 3;
    }
    return level;
}

/**
 * 弱密码集合
 */
var weakPwdArray = ["123456", "123456789", "111111", "5201314", "12345678", "123123", "password", "1314520", "123321", "7758521", "1234567", "5211314", "666666", "520520", "woaini", "520131", "11111111", "888888", "hotmail.com", "112233", "123654", "654321", "1234567890", "a123456", "88888888", "163.com", "000000", "yahoo.com.cn", "sohu.com", "yahoo.cn", "111222tianya", "163.COM", "tom.com", "139.com", "wangyut2", "pp.com", "yahoo.com", "147258369", "123123123", "147258", "987654321", "100200", "zxcvbnm", "123456a", "521521", "7758258", "111222", "110110", "1314521", "11111111", "12345678", "a321654", "111111", "123123", "5201314", "00000000", "q123456", "123123123", "aaaaaa", "a123456789", "qq123456", "11112222", "woaini1314", "a123123", "a111111", "123321", "a5201314", "z123456", "liuchang", "a000000", "1314520", "asd123", "88888888", "1234567890", "7758521", "1234567", "woaini520", "147258369", "123456789a", "woaini123", "q1q1q1q1", "a12345678", "qwe123", "123456q", "121212", "asdasd", "999999", "1111111", "123698745", "137900", "159357", "iloveyou", "222222", "31415926", "123456", "111111", "123456789", "123123", "9958123", "woaini521", "5201314", "18n28n24a5", "abc123", "password", "123qwe", "123456789", "12345678", "11111111", "dearbook", "00000000", "123123123", "1234567890", "88888888", "111111111", "147258369", "987654321", "aaaaaaaa", "1111111111", "66666666", "a123456789", "11223344", "1qaz2wsx", "xiazhili", "789456123", "password", "87654321", "qqqqqqqq", "000000000", "qwertyuiop", "qq123456", "iloveyou", "31415926", "12344321", "0000000000", "asdfghjkl", "1q2w3e4r", "123456abc", "0123456789", "123654789", "12121212", "qazwsxedc", "abcd1234", "12341234", "110110110", "asdasdasd", "123456", "22222222", "123321123", "abc123456", "a12345678", "123456123", "a1234567", "1234qwer", "qwertyui", "123456789a", "qq.com", "369369", "163.com", "ohwe1zvq", "xiekai1121", "19860210", "1984130", "81251310", "502058", "162534", "690929", "601445", "1814325", "as1230", "zz123456", "280213676", "198773", "4861111", "328658", "19890608", "198428", "880126", "6516415", "111213", "195561", "780525", "6586123", "caonima99", "168816", "123654987", "qq776491", "hahabaobao", "198541", "540707", "leqing123", "5403693", "123456", "123456789", "111111", "5201314", "123123", "12345678", "1314520", "123321", "7758521", "1234567", "5211314", "520520", "woaini", "520131", "666666", "RAND#a#8", "hotmail.com", "112233", "123654", "888888", "654321", "1234567890", "a123456"];

//验证规则
var validateRules = {
    isNull: function (str) {
        return (str == "" || typeof str != "string");
    },
    betweenLength: function (str, _min, _max) {
        return (str.length >= _min && str.length <= _max);
    },
    isUid: function (str) {
        return new RegExp(validateRegExp.username).test(str);
    },
    fullNumberName: function (str) {
        return new RegExp(validateRegExp.fullNumber).test(str);
    },
    isPwd: function (str) {
        return /^.*([\W_a-zA-z0-9-])+.*$/i.test(str);
    },
    isPwdRepeat: function (str1, str2) {
        return (str1 == str2);
    },
    isEmail: function (str) {
        return new RegExp(validateRegExp.email).test(str);
    },
    isTel: function (str) {
        return new RegExp(validateRegExp.tel).test(str);
    },
    isMobile: function (str) {
        return new RegExp(validateRegExp.mobile).test(str);
    },
    checkType: function (element) {
        return (element.attr("type") == "checkbox" || element.attr("type") == "radio" || element.attr("rel") == "select");
    },
    isRealName: function (str) {
        return new RegExp(validateRegExp.realname).test(str);
    },
    isCompanyname: function (str) {
        return new RegExp(validateRegExp.companyname).test(str);
    },
    isCompanyaddr: function (str) {
        return new RegExp(validateRegExp.companyaddr).test(str);
    },
    isCompanysite: function (str) {
        return new RegExp(validateRegExp.companysite).test(str);
    },
    simplePwd: function (str) {
        return pwdLevel(str) == 1;
    },
    weakPwd: function (str) {
        for (var i = 0; i < weakPwdArray.length; i++) {
            if (weakPwdArray[i] == str) {
                return true;
            }
        }
        return false;
    }
};

/**
* 根据设备跳转Web/Wap网页
* @param 移动Web/Wap网址
*/
function CheckEquipmentGoto(mobileUrl) {
    var ua = navigator.userAgent.toLowerCase(),
        iphone = (ua.match(/iphone/i) == "iphone"),
        android = (ua.match(/android/i) == "android"),
        channel = window.location.hostname.split(".")[0],
        loc = window.location;
    if (loc.search.indexOf("s=noRedirect") == -1 && (iphone || android)) {
        //loc.href = "http://3g.163.com/touch/@channel@/".replace("@channel@",channel);  //mobileUrl
        loc.href = "@mobileUrl@/@channel@/".replace("@channel@", channel).replace("@mobileUrl@", mobileUrl);
    }
}

/**
 * js日志控制台输出，调试
 * @param n 日志信息内容
*/
function log(n){
	try{
		console.log(n);
	}catch(e){
	}
}










