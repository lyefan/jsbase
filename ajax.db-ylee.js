/**
 * @author yeefan
 * @datetime 2015-01-26
 * @address sl.CBD
 * @Remark 基础公共JS库
 * @version 1.0.0
*/

/**
 * $Jquery获取数据
 * @param url
 * @param dataArray，数据集合或对象
 * @param type，数据类型
 * @return data，服务器返回数据对象
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