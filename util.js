(function () {	/*global jQuery, window, HUI*/

/**
 * @namespace HUI.util
 */
 
     'use strict';

    var hui = window.HUI = window.HUI || {};

    hui.util = hui.util || {};

    /** 
     * @name hui.util.format
     * 格式化一个字符串。
     * Usage：
     * format("foo#{0}bar#{1}blah#{2}", "str1", "str2", "str3")
     * format("foo#{name}bar#{value}blah#{desc}", {
     *   name: 'Daniel',
     *   value: 'Yes',
     *   desc: 'description'
     * });
     * @param {String} source 原始pattern
     * @param {Object|String} opts 格式化参数
     * @return {String}
     */
    hui.util.format = function(source, opts) {
        source = String(source);
        var data = Array.prototype.slice.call(arguments, 1),
            toString = Object.prototype.toString;
        if (data.length) {
            data = (data.length == 1 ?
                /*  Object.prototype.toString.call(null) == '[object Object]' */
                (opts !== null && (/\[object (Array|Object)\]/.test(toString.call(opts))) ? opts : data) : data);
            return source.replace(/#\{(.+?)\}/g, function(match, key) {
                var parts = key.split('.'),
                    part = parts.shift(),
                    cur = data,
                    variable;
                while (part) {
                    if (cur[part] !== undefined) {
                        cur = cur[part];
                    } else {
                        cur = undefined;
                        break;
                    }
                    part = parts.shift();
                }
                variable = cur;

                if ('[object Function]' === toString.call(variable)) {
                    variable = variable(key);
                }
                return (undefined === variable ? '' : variable);
            });
        }
        return source;
    };

    /** 
     * @name hui.util.sortBy
     * 对对象数组进行排序。
     * Usage：
     * sortBy([{name:"Daniel"}, {name: "Alice"}], 'name', 'desc');
     * @param {Array} list 对象数组
     * @param {String} field 字段
     * @param {String} order 正序还是倒序，默认是正序。
     * @return {Array}
     */
    hui.util.sortBy = function(list, field, order) {
        if (list && list.sort && list.length) {
            list.sort(function(a, b) {
                var m, n;
                m = String(a[field]).toLowerCase();
                n = String(b[field]).toLowerCase();

                if (String(parseInt('0' + m, 10)) == m && String(parseInt('0' + n, 10)) == n) {
                    m = parseInt(m, 10);
                    n = parseInt(n, 10);
                } else {
                    if (m > n) {
                        m = 1;
                        n = -m;
                    } else if (m < n) {
                        m = -1;
                        n = -m;
                    } else {
                        m = 1;
                        n = m;
                    }
                }
                return (order == 'desc' ? n - m : m - n);
            });
        }
        return list;
    };

    /** 
     * @name hui.util.inherits
     * 实现原型链继承
     * Usage：
     * inherits(ConstructorA, ConstructorB);
     * @param {function} child 子构造函数
     * @param {function} parent 父构造函数
     */
    hui.util.inherits = function(child, parent) {
        var clazz = new Function();
        clazz.prototype = parent.prototype;

        var childProperty = child.prototype;
        child.prototype = new clazz();

        for (var key in childProperty) {
            if (childProperty.hasOwnProperty(key)) {
                child.prototype[key] = childProperty[key];
            }
        }

        child.prototype.constructor = child;

        child.superClass = parent;
    };

    /** 
     * @name hui.util.clone
     * 实现深度数组clone
     * @param {Any} source
     * @param {Array} oldArr
     * @param {Array} newArr
     * @return {Any}
     */
    hui.util.clone = function(source, oldArr, newArr) {
        if (typeof source === 'undefined') {
            return undefined;
        }
        if (typeof JSON !== 'undefined') {
            return JSON.parse(JSON.stringify(source));
        }

        var result = source,
            i,
            len,
            j,
            len2,
            exist = -1;
        oldArr = oldArr || [];
        newArr = newArr || [];

        if (source instanceof Date) {
            result = new Date(source.getTime());
        } else if ((source instanceof Array) || (Object.prototype.toString.call(source) == '[object Object]')) {
            for (j = 0, len2 = oldArr.length; j < len2; j++) {
                if (oldArr[j] == source) {
                    exist = j;
                    break;
                }
            }
            if (exist != -1) {
                result = newArr[exist];
                exist = -1;
            } else {
                if (source instanceof Array) {
                    result = [];
                    oldArr.push(source);
                    newArr.push(result);
                    var resultLen = 0;
                    for (i = 0, len = source.length; i < len; i++) {
                        result[resultLen++] = hui.util.clone(source[i], oldArr, newArr);
                    }
                } else if (!!source && Object.prototype.toString.call(source) == '[object Object]') {
                    result = {};
                    oldArr.push(source);
                    newArr.push(result);
                    for (i in source) {
                        if (source.hasOwnProperty(i)) {
                            result[i] = hui.util.clone(source[i], oldArr, newArr);
                        }
                    }
                }
            }
        }

        return result;
    };

    /** 
     * @name hui.util.getCookie
     * 根据cookie的键值获取cookie的值。
     * @param {string} name cookie键值
     * @return {string}
     */
    hui.util.getCookie = function(name) {
        var start = document.cookie.indexOf(name + '=');
        var len = start + name.length + 1;
        if ((!start) && (name != document.cookie.substring(0, name.length))) {
            return undefined;
        }
        if (start == -1) return undefined;
        var end = document.cookie.indexOf(';', len);
        if (end == -1) end = document.cookie.length;
        return unescape(document.cookie.substring(len, end));
    };

    /** 
     * @name hui.util.setCookie
     * 设置cookie的值。
     * @param {string} name cookie键值
     * @param {string} value  cookie值
     * @param {number} expires  失效时间，以天计
     * @param {string} [path]  设置cookie所在目录
     * @param {string} [domain]  设置cookie所在域
     * @param {string} [secure]  设置https only的cookie
     */
    hui.util.setCookie = function(name, value, expires, path, domain, secure) {
        expires = expires || 24 * 60 * 60 * 1000;
        var expires_date = new Date((new Date()).getTime() + (expires));
        document.cookie = name + '=' + escape(value) + ((expires) ? ';expires=' + expires_date.toGMTString() : '') + /*expires.toGMTString()*/
            ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ((secure) ? ';secure' : '');
    };

    /** 
     * @name hui.util.removeCookie
     * 根据cookie的键值移除cookie的值。
     * @param {string} name cookie键值
     * @return {string}
     */
    hui.util.removeCookie = function(name, path, domain) {
        if (hui.util.getCookie(name)) document.cookie = name + '=' + ((path) ? ';path=' + path : '') + ((domain) ? ';domain=' + domain : '') + ';expires=Thu, 01-Jan-1970 00:00:01 GMT';
    };

    /** 
     * @name hui.util.formatDate
     * 得到格式化的时间字符串
     * Usage：
     * formatDate(new Date, "yyyy-MM-dd HH:mm:ss");
     * @param {Date} date 时间
     * @param {String} fmt 格式
     * @return {string}
     */
    hui.util.formatDate = function(date, fmt) {
        if (!date) date = new Date();
        fmt = fmt || 'yyyy-MM-dd HH:mm';
        var o = {
            'M+': date.getMonth() + 1,
            'd+': date.getDate(),
            'h+': date.getHours() % 12 === 0 ? 12 : date.getHours() % 12,
            'H+': date.getHours(),
            'm+': date.getMinutes(),
            's+': date.getSeconds(),
            'q+': Math.floor((date.getMonth() + 3) / 3),
            'S': date.getMilliseconds()
        };
        var week = {
            '0': '/u65e5',
            '1': '/u4e00',
            '2': '/u4e8c',
            '3': '/u4e09',
            '4': '/u56db',
            '5': '/u4e94',
            '6': '/u516d'
        };
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
        }
        if (/(E+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? '/u661f/u671f' : '/u5468') : '') + week[date.getDay() + '']);
        }
        for (var k in o) {
            if (o.hasOwnProperty(k) && new RegExp('(' + k + ')').test(fmt)) {
                fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)));
            }
        }
        return fmt;
    };

    /** 
     * @name hui.util.parseDate
     * 根据时间字符串得到日期格式
     * Usage：
     * parseDate('2006-1-1') return new Date(2006,0,1)
     * parseDate(' 2006-1-1 ') return new Date(2006,0,1)
     * parseDate('2006-1-1 15:14:16') return new Date(2006,0,1,15,14,16)
     * parseDate(' 2006-1-1 15:14:16 ') return new Date(2006,0,1,15,14,16);
     * @param {String} str 原始时间字符串
     * @return {Date}
     */
    hui.util.parseDate = function(str) {
        str = String(str).replace(/^[\s\xa0]+|[\s\xa0]+$/ig, '');
        var results = null;

        //ÃëÊý #9744242680 
        results = str.match(/^ *(\d{10}) *$/);
        if (results && results.length > 0)
            return new Date(parseInt(str, 10) * 1000);

        //ºÁÃëÊý #9744242682765 
        results = str.match(/^ *(\d{13}) *$/);
        if (results && results.length > 0)
            return new Date(parseInt(str, 10));

        //20110608 
        results = str.match(/^ *(\d{4})(\d{2})(\d{2}) *$/);
        if (results && results.length > 3)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));

        //20110608 1010 
        results = str.match(/^ *(\d{4})(\d{2})(\d{2}) +(\d{2})(\d{2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10));

        //2011-06-08 
        results = str.match(/^ *(\d{4})[\._\-\/\\](\d{1,2})[\._\-\/\\](\d{1,2}) *$/);
        if (results && results.length > 3)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10));

        //2011-06-08 10:10 
        results = str.match(/^ *(\d{4})[\._\-\/\\](\d{1,2})[\._\-\/\\](\d{1,2}) +(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10));

        //2011-06-08 10:10:10 
        results = str.match(/^ *(\d{4})[\._\-\/\\](\d{1,2})[\._\-\/\\](\d{1,2}) +(\d{1,2}):(\d{1,2}):(\d{1,2}) *$/);
        if (results && results.length > 6)
            return new Date(parseInt(results[1], 10), parseInt(results[2], 10) - 1, parseInt(results[3], 10), parseInt(results[4], 10), parseInt(results[5], 10), parseInt(results[6], 10));

        return (new Date(str));
    };

    /** 
     * @name hui.util.encode
     * URL编码
     * 弥补encodeURIComponent不能编码单引号的问题
     * Usage：
     * encode("? %");
     * @param {String} str
     * @return {string}
     */
    hui.util.encode = function(str, decode) {
        str = String(str);
        // encodeURIComponent not encode ' 
        var fr = '%| |&|;|=|+|<|>|,|"|\'|#|/|\\|\n|\r|\t'.split('|'),
            to = '%25|%20|%26|%3B|%3D|%2B|%3C|%3E|%2C|%22|%27|%23|%2F|%5C|%0A|%0D|%09'.split('|');
        if (decode == 'decode') {
            for (var i = fr.length - 1; i > -1; i--) {
                str = str.replace(new RegExp('\\' + to[i], 'ig'), fr[i]);
            }
        } else {
            for (var i = 0, l = fr.length; i < l; i++) {
                str = str.replace(new RegExp('\\' + fr[i], 'ig'), to[i]);
            }
        }
        return str;
    };

    /** 
     * @name hui.util.decode
     * URL解码
     * Usage：
     * decode("%25%27");
     * @param {String} str
     * @return {string}
     */
    hui.util.decode = function(str) {
        return this.encode(str, 'decode');
    };

}());