(function($){
  var _APP_WX_SIGNATURE = "http://testfcwm.24-7.com.cn/js/signature";
  var appid = '',
      appsecret = '',
      nonceStr = '',
      timestamp = '',
      signature = '',
      desc='';
      url = location.origin + location.pathname + location.search,
      share = {
        title:    "《第一财经》股市天天向上", // 分享标题
        desc:     "你知道今天的牛股吗",  // 分享描述
        imgUrl:   link_pack.APP_link + link_pack.assets + "image/common/person.png",   // 分享图标
        link:     link_pack.APP_link + link_pack.linkask,                                             // 分享链接
        type:     '',                                                      // 分享类型,music、video或link，不填默认为link
        dataUrl:  '',                                                      // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
        	var search=window.location.search;
        		if(search==""){
        			url=window.location.href + "?shareBy="+shareBy;
        		}else{
        			url=window.location.href + "&shareBy="+shareBy;
        		}
        	data={url:url};
          Net.postSharePoint(data,function(result){
            	
          });
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        },
        trigger: function(){
        if(score==""){
        	share.title="《第一财经》股市天天向上";
					share.desc="你知道今天的牛股吗";
        }else if(score<=20&&score>14){
					share.title="您拥有百分之九十的叱咤股海的能力";
					share.desc="你就是最强能力者。";
				}else if(score<=14&&score>9){
					share.title="您拥有百分之七十的炉火纯青的股市造诣";
					share.desc="就是任性，跟着感觉走。";
				}else if(score>0&&score<=9){
					share.title="您在股市一夜暴富的能力为百分之三十";
					share.desc="视人民币如粪土，谁爱捞谁去捞吧。";
			  }
    }
   },
  //取签名
  $.ajax({
	    url: _APP_WX_SIGNATURE,
	    type: "post",
	    data: {"url":url},
	    dataType: "json",
	    success: function(data) {
	      signature = data.signature;
	      nonceStr = data.nonceStr;
	      timestamp = data.timestamp;
	      appid=data.appId;
	      url = data.url;        
	      wx.config({
	        debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
	        appId: appid, // 必填，公众号的唯一标识
	        timestamp: timestamp , // 必填，生成签名的时间戳
	        nonceStr: nonceStr, // 必填，生成签名的随机串
	        signature: signature,// 必填，签名，见附录1
	        jsApiList: ['onMenuShareTimeline',
	                    'onMenuShareAppMessage'                    ]
	      });
      }
  });
  
  wx.ready(function(){
    wx.onMenuShareTimeline(share);
    wx.onMenuShareAppMessage(share);
  });  
})(jQuery);
