/**
 * @returns 返回Unix时间戳。
 */
function strToJson(str){ 
		var json = eval('(' + str + ')'); 
		return json; 
} 
function getTimestamp() {
	var timestamp = new Date().getTime();
	Net.getServerTime(function(data){
		if (data) {
			timestamp = data.serverTime;
		}
	});
	
	return timestamp;
}

/**
 *解决跨越ajax请求不带cookie
 */
$.ajaxSetup({
    xhrFields: {
       withCredentials: true
    }
});

/** 
 * 格式化输入字符串
 * 用法: "hello{0}".format('world')；返回'hello world'
 * **/
String.prototype.format= function(){
  var args = arguments;
  return this.replace(/\{(\d+)\}/g,function(s,i){
    return args[i];
  });
};

$.fn.serializeObject = function()  
{  
   var o = {};  
   var a = this.serializeArray();  
   $.each(a, function() {  
       if (o[this.name]) {  
           if (!o[this.name].push) {  
               o[this.name] = [o[this.name]];  
           }  
           o[this.name].push(this.value || '');  
       } else {  
           o[this.name] = this.value || '';  
       }  
   });  
   return o;  
};  

/**
 * 解析URL参数。
 * 
 * @param url
 * @returns 解析后的键值对。
 */
function parseUrlParam(url) {
	if (typeof url == 'undefined' || 
			typeof url == undefined) { 
		return {};
	}

	var index = -1
	if ((index = url.indexOf('#')) < 0) {
		index = url.indexOf('?');
	}
	
	if (index < 0) {
		console.log('[debug]url<'+url+'>无效或者当中不包含参数。');
		return {};
	}

	var params = {};
	var entries = url.substring(index+1).split('&');
	console.log('[debug]url参数：' + entries);
	
	$.each(entries, function(index, item) {
		if (item.indexOf('=') >= 0) {
			var keyValue=item.split('=')
			params[keyValue[0]] = keyValue[1];
		}
	});
	
	return params;
}

Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
};