(function($){
  var _APP_WX_SIGNATURE = "http://galaxy.24-7.com.cn/js/signature";
  var appid = '',
      appsecret = '',
      nonceStr = '',
      timestamp = '',
      signature = '',
      desc='';
      url = location.origin + location.pathname + location.search,
      share = {
        title:    "", // 分享标题
        desc:     "",  // 分享描述
        imgUrl:   "",   // 分享图标
        link:     "",                                             // 分享链接
        type:     '',                                                      // 分享类型,music、video或link，不填默认为link
        dataUrl:  '',                                                      // 如果type是music或video，则要提供数据链接，默认为空
        success: function () { 
            // 用户确认分享后执行的回调函数
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        },
        trigger: function(res){
              share.title=document.title;
              share.desc=document.title;
              share.imgUrl=$(".share-avatar").attr("src");
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
          wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: appid, // 必填，公众号的唯一标识
            timestamp: timestamp , // 必填，生成签名的时间戳
            nonceStr: nonceStr, // 必填，生成签名的随机串
            signature: signature,// 必填，签名，见附录1
            jsApiList: ['onMenuShareTimeline',
                        'onMenuShareAppMessage'                        ]
          });
       }
  });
  
  wx.ready(function(){
    wx.onMenuShareTimeline(share);
    wx.onMenuShareAppMessage(share);
  });  
})(jQuery);
