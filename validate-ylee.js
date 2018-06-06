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
            .replace(/[.(),;:!?%#$'\"_+=\/\-������]*/g, "");
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


    //������֤
    $.validator.addMethod("chinese", function (value, element) {
		if (value == "") return true;
        return this.optional(element) || /^[u4e00-u9fa5]+$/.test(value);
    }, "�����������ַ�");

    //��������֤(��ѡ��)
    $.validator.addMethod("selectedNone", function (value, element) {
        if (value=="-1") {
            return false;
        }
        return true;
    },"�����ѡ��һ��");

    //�ֽڳ�����֤ ���磺byteRangeLength��[6,18]
    $.validator.addMethod("byteRangeLength", function (value, element, params) {
        var length = value.length;
        for (var i = 0; i < value.length ; i++) {
            if(value.charCodeAt(i) > 127){
                length++;
            }
        }
        return this.optional(element) || (length >= params[0] && length <=params[1]);
    }, $.validator.format("��ȷ������ֵ��{0}-{1}���ַ�֮�䣨һ�������������ַ���"));

    //���볤����֤I ���磺pwdLength��[6,18]
    $.validator.addMethod("pwdLength", function (value, element, params) {
        var length = value.length;
        for (var i = 0; i < value.length ; i++) {
            if (value.charCodeAt(i) > 127) {
                length++;
            }
        }
        return this.optional(element) || (length >= params[0] && length <= params[1]);
    }, $.validator.format("���������볤����{0}-{1}���ַ�֮�䣨һ�������������ַ���"));

    //�����ʽ��֤
    $.validator.addMethod("pwdFormat", function (value, element) {
        return this.optional(element) || /^.*([\W_a-zA-z0-9-])+.*$/i.test(value);
    }, $.validator.format("����ֻ����Ӣ�ġ����ּ����������"));

	//�ַ���ʽ��֤
    $.validator.addMethod("stringCheck", function (value, element) {
        return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
    }, "ֻ�ܰ��������֡�Ӣ����ĸ�����ֺ��»���");

	//�����ʽ��֤
    $.validator.addMethod("pwdCheck", function (value, element) {
        var realLength = 0, len = value.length, charCode = -1;
        for (var i = 0; i < len; i++) {
            charCode = value.charCodeAt(i);
            if (charCode < 32 || charCode > 126) return false;

        }
        return true;
    }, "ֻ�ܰ���Ӣ����ĸ�����ֺ��»��߼���Ǳ�����");

    //���֤������֤ 
    $.validator.addMethod("isIdCardNo", function (value, element) {
		if(value == "") return true;
        return this.optional(element) || /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/.test(value);
    }, "����������ȷ�����֤����");

    // �ֻ�������֤       
    $.validator.addMethod("isMobile", function (value, element) {
        var length = value.length;
        if (value == "") return true;
        var mobile = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;
        return this.optional(element) || (length == 11 && mobile.test(value));
    }, "����ȷ���������ֻ�����");

    //������֤I       
    $.validator.addMethod("isEmail", function (value, element) {
		if(value == "") return true;
        var email = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        return this.optional(element) || email.test(value);
    }, "����ȷ������������");

    // �绰������֤       
    $.validator.addMethod("isTel", function (value, element) {
        var tel = /^\d{3,4}-?\d{7,9}$/;    //�绰�����ʽ010-12345678  
        if (value == "") return true;
        return this.optional(element) || (tel.test(value));
    }, "����ȷ�������ĵ绰����");

    // ��ϵ�绰(�ֻ�/�绰�Կ�)��֤   
    $.validator.addMethod("isPhone", function (value, element) {
		if(value == "") return true;
        var length = value.length;
        var mobile = /^(((1[0-9]{1}[0-9]{1}))+\d{8})$/;   //13��15��ͷ /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/
        var tel = /^\d{3,4}-?\d{7,9}$/;
        return this.optional(element) || (tel.test(value) || mobile.test(value));

    }, "����ȷ����������ϵ�绰");

    // ����������֤ 
    $.validator.addMethod("isZipCode", function (value, element) {
		if(value == "") return true;
        var tel = /^[0-9]{6}$/;
        return this.optional(element) || (tel.test(value));
    }, "����ȷ��д������������");

    // ��Ƶ��ʽ��֤��mp4/mpeg4��
    $.validator.addMethod("isVideo", function (value, element) {
		if(value == "") return true;
        var video = /\.mp4$|\.mpeg4$/i;
        return this.optional(element) || (video.test(value));
    }, "��ѡ���ϴ����ϸ�ʽҪ�����Ƶ�ļ����磺.mp4��.mpeg4��");
    
    // ͼƬ��ʽ��֤
    $.validator.addMethod("isImgExt", function (value, element) {
		if(value == "") return true;
        var img = /^(.*)\.(jpg|jpeg|gif|png|bmp)$/;
        return this.optional(element) || (img.test(value));
    }, "��ѡ���ϴ����ϸ�ʽҪ���ͼƬ�ļ����磺.jpg/jpeg��.png��.gif��bmp��");

    // ������֤
    $.validator.addMethod("isVirCode", function (value, element) {
		if(value == "") return true;
        var patrn = /^\d{11,22}$/;
        return this.optional(element) || (patrn.test(value.trimAll()));
    }, "���������Ҫ���ʽ������");

    //�Զ���������֤II
    $.validator.addMethod("is2Email", function (value, element) {
        var email = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
        if (value == "") return true;
        return this.optional(element) || (email.test(value));
    }, "����ȷ������������");
}));
