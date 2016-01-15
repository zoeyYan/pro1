/**
 * 解析URL参数。
 * @param url
 * @returns 解析后的键值对。
 */
function parseUrlParam(url) {
	if (typeof url == 'undefined' || 
			typeof url == undefined) { 
		return {};
	}

	var index = -1;
	if ((index = url.indexOf('#')) < 0) {
		index = url.indexOf('?');
	}
	
	if (index < 0) {
		return {};
	}

	var params = {};
	var entries = url.substring(index+1).split('&');
	
	$.each(entries, function(index, item) {
		if (item.indexOf('=') >= 0) {
			var keyValue=item.split('=');
			params[keyValue[0]] = keyValue[1];
		}
	});
	
	return params;
}

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
/**
 *取字节长度
 */
String.prototype.lengthB = function( ){
    var b = 0, l = this.length;
    if( l ){
        for( var i = 0; i < l; i ++ ){
            if(this.charCodeAt( i ) > 255 ){
                b += 2;
            }else{
                b ++ ;
            }
        }
        return b;
    }else{
        return 0;
    }
};
String.prototype.replaceAll = function(s1,s2){ 
  return this.replace(new RegExp(s1,"gm"),s2); 
};
/**
 *设置cookie 
 */
function setCookie(c_name, value, expiredays) {
  var exdate = new Date();
  exdate.setDate(exdate.getDate() + expiredays);
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}

/**
 * 获取cookie
 */
function getCookie(c_name) {
  if (document.cookie.length > 0) {
    c_start = document.cookie.indexOf(c_name + "=");
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1;
      c_end = document.cookie.indexOf(";", c_start);
      if (c_end == -1)
        c_end = document.cookie.length;
      return unescape(document.cookie.substring(c_start, c_end));
    }
  }
  return "";
}

/**
 *解决跨越ajax请求不带cookie
 */
$.ajaxSetup({
    xhrFields: {
       withCredentials: true
    },
    crossDomain: true
});

/**
 *是否是微信端 
 */
function isWeiXin() {
  var ua = window.navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == 'micromessenger') {
    return true;
  } else {
    return false;
  }
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
//rgba: 0,0,0,.5
CanvasRenderingContext2D.prototype.sector = function(rgba,angle) {
  var canves = this.canvas;
  var width = canves.width;
  var height = canves.height;
  this.clearRect(0,0,width,height);
  this.fillStyle  = "rgba("+rgba+")";
  // 开始一条新路径
  this.beginPath();
  // 移动到圆心
  this.moveTo(width / 2, height / 2);
  // 绘制圆弧
  this.arc(width / 2, height / 2, width / 2, -Math.PI/2, -Math.PI/2 + angle/180*Math.PI);
  // 闭合路径
  this.closePath();
  
  this.fill();
  return this;
};
/**
 * 获取openId 
 */

var openId = sessionStorage.getItem("openId");
//var openId = "openId";
if (!openId) {
  var search = window.location.search;
  openId = parseUrlParam(search).t;
  if (!openId) {
     window.location.href = "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5c1344f317e71789&redirect_uri=http://wx.cloudcross.net/oauth2/callback?url=" + location.href + "&response_type=code&scope=snsapi_base&state=1#wechat_redirect";
  } else {
    sessionStorage.setItem("openId",openId);
  }
}
var location_href = window.location.href.replaceAll("&t="+openId,"").replaceAll("\\?t="+openId,"");
if (location_href != window.location.href) {
  window.location.replace(location_href);
}