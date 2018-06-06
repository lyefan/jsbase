/*!
 * jQuery Validation Plugin v1.13.1
 *
 * http://jqueryvalidation.org/
 *
 * Copyright (c) 2014 J?rn Zaefferer
 * Released under the MIT license
 */
(function (factory) {
    if (typeof define === "function" && define.amd) {
        define(["jquery", "./jquery.validate"], factory);
    } else {
        factory(jQuery);
    }
}(function ($) {

    (function () {
		String.prototype.trimAll = function () { return this.replace(/\s*/g, ""); };
	
        function stripHtml(value) {
            // remove html tags and space chars
            return value.replace(/<.[^<>]*?>/g, " ").replace(/&nbsp;|&#160;/gi, " ")
            // remove punctuation
            .replace(/[.(),;:!?%#$'\"_+=\/\-“”’]*/g, "");
        }

        $.validator.addMethod("maxWords", function (value, element, params) {
            return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length <= params;
        }, $.validator.format("Please enter {0} words or less."));

        $.validator.addMethod("minWords", function (value, element, params) {
            return this.optional(element) || stripHtml(value).match(/\b\w+\b/g).length >= params;
        }, $.validator.format("Please enter at least {0} words."));

        $.validator.addMethod("rangeWords", function (value, element, params) {
            var valueStripped = stripHtml(value),
                regex = /\b\w+\b/g;
            return this.optional(element) || valueStripped.match(regex).length >= params[0] && valueStripped.match(regex).length <= params[1];
        }, $.validator.format("Please enter between {0} and {1} words."));

    }());


    //中文验证
    $.validator.addMethod("chinese", function (value, element) {
		if (value == "") return true;
        return this.optional(element) || /^[u4e00-u9fa5]+$/.test(value);
    }, "请输入中文字符");

    //下拉框验证(请选择)
    $.validator.addMethod("selectedNone", function (value, element) {
        if (value=="-1") {
            return false;
        }
        return true;
    },"请必须选择一项");

    //字节长度验证 例如：byteRangeLength：[6,18]
    $.validator.addMethod("byteRangeLength", function (value, element, params) {
        var length = value.length;
        for (var i = 0; i < value.length ; i++) {
            if(value.charCodeAt(i) > 127){
                length++;
            }
        }
        return this.optional(element) || (length >= params[0] && length <=params[1]);
    }, $.validator.format("请确保输入值在{0}-{1}个字符之间（一个中文算两个字符）"));

    //密码长度验证I 例如：pwdLength：[6,18]
    $.validator.addMethod("pwdLength", function (value, element, params) {
        var length = value.length;
        for (var i = 0; i < value.length ; i++) {
            if (value.charCodeAt(i) > 127) {
                length++;
            }
        }
        return this.optional(element) || (length >= params[0] && length <= params[1]);
    }, $.validator.format("请输入密码长度在{0}-{1}个字符之间（一个中文算两个字符）"));

    //密码格式验证
    $.validator.addMethod("pwdFormat", function (value, element) {
        return this.optional(element) || /^.*([\W_a-zA-z0-9-])+.*$/i.test(value);
    }, $.validator.format("密码只能由英文、数字及标点符号组成"));

	//字符格式验证
    $.validator.addMethod("stringCheck", function (value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
    }, "只能包括中文字、英文字母、数字和下划线");

	//密码格式验证
    $.validator.addMethod("pwdCheck", function (value, element) {
        var realLength = 0, len = value.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = value.charCodeAt(i);
            if (charCode < 32 || charCode > 126) return false;

        }
        return true;
    }, "只能包括英文字母、数字和下划线及半角标点符号");

    //身份证号码验证 
    $.validator.addMethod("isIdCardNo", function (value, element) {
		if(value == "") return true;
        return this.optional(element) || /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(value);
    }, "请输入您正确的身份证号码");

    // 手机号码验证       
    $.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        if (value == "") return true;
        var mobile = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "请正确输入您的手机号码");

    //邮箱验证I       
    $.validator.addMethod("isEmail", function (value, element) {
		if(value == "") return true;
        var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return this.optional(element) || email.test(value);
    }, "请正确输入您的邮箱");

    // 电话号码验证       
    $.validator.addMethod("isTel", function (value, element) {
        var tel = /^\d{3,4}-?\d{7,9}$/;    //电话号码格式010-12345678  
        if (value == "") return true;
        return this.optional(element) || (tel.test(value));
    }, "请正确输入您的电话号码");

    // 联系电话(手机/电话皆可)验证   
    $.validator.addMethod("isPhone", function (value, element) {
		if(value == "") return true;
        var length = value.length;
        var mobile = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;   //13、15开头 /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/
        var tel = /^\d{3,4}-?\d{7,9}$/;
        return this.optional(element) || (tel.test(value) || mobile.test(value));

    }, "请正确输入您的联系电话");

    // 邮政编码验证 
    $.validator.addMethod("isZipCode", function (value, element) {
		if(value == "") return true;
        var tel = /^[0-9]{6}$/;
        return this.optional(element) || (tel.test(value));
    }, "请正确填写您的邮政编码");

    // 视频格式验证（mp4/mpeg4）
    $.validator.addMethod("isVideo", function (value, element) {
		if(value == "") return true;
        var video = /\.mp4$|\.mpeg4$/i;
        return this.optional(element) || (video.test(value));
    }, "请选择上传符合格式要求的视频文件（如：.mp4、.mpeg4）");
    
    // 图片格式验证
    $.validator.addMethod("isImgExt", function (value, element) {
		if(value == "") return true;
        var img = /^(.*)\.(jpg|jpeg|gif|png|bmp)$/;
        return this.optional(element) || (img.test(value));
    }, "请选择上传符合格式要求的图片文件（如：.jpg/jpeg、.png、.gif、bmp）");

    // 数码验证
    $.validator.addMethod("isVirCode", function (value, element) {
		if(value == "") return true;
        var patrn = /^\d{11,22}$/;
        return this.optional(element) || (patrn.test(value.trimAll()));
    }, "请输入符合要求格式的数码");

    //自定义邮箱验证II
    $.validator.addMethod("is2Email", function (value, element) {
        var email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (value == "") return true;
        return this.optional(element) || (email.test(value));
    }, "请正确输入您的邮箱");
}));
