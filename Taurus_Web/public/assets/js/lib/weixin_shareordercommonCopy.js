(function($){
  var key="";	
  var _APP_WX_SIGNATURE = "http://testfcwm.24-7.com.cn/js/signature";
  var appid = '',
      appsecret = '',
      nonceStr = '',
      timestamp = '',
      signature = '',
      shareBy='',
      desc='';
      url = location.origin + location.pathname + location.search,
      share = {
        title:    "《第一财经》股市天天向上", // 分享标题
        desc:     "",  // 分享描述
        imgUrl:   link_pack.APP_link + link_pack.assets + "image/common/logo-share.jpg",   // 分享图标
        link:     "",                                    // 分享链接
        type:     '',                                                      // 分享类型,music、video或link，不填默认为link
        dataUrl:  '',                                                      // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
        	//	var url = window.location.search ? () : (window.location.href + "?url="+shareBy);
        	  var search=window.location.search;
        		if(search==""){
        			url=window.location.href + "?shareBy="+shareBy;
        		}else{
        			url=window.location.href + "&shareBy="+shareBy;
        		}
        	  data={url:url};
            Net.postSharePoint(data,function(result){
            	 if(result){
            		swal({   title: "分享成功",   text: "积分+1", confirmButtonColor: "#9100ba", showConfirmButton: false,  imageUrl: "assets/image/common/sign-pig.png",timer:1500  });
            	 }
            	 
            })
          
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        },
        trigger: function(){
    		$.ajax({
    			type:"get",
    			url:Api.GET_ORDERCOM_BYDAY.format(0,5),
    			async:false,//为同步，true为异步;
    			success:function(res){
    			  key=res[0].sum_income;
    			}
    		});
    			if(key==""){
    				share.desc="等待你来挑战!"; 
	    		}else{
	    			share.desc="今日荐股平民级的最高收益率为：" + key + "%。快来挑战!"; 
	    		}
    		
        }
        
      };
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
	      shareBy=data.shareBy;
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
