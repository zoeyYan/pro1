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
        imgUrl:   link_pack.APP_link + link_pack.assets + "image/common/logo-share.jpg",   // 分享图标
        link:      link_pack.APP_link + link_pack.links,                                    // 分享链接
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
          $('.sHare').hide();
          $(".select").hide();
          if(i<9){
          	alert("您的题目未答完，请继续答题");
          	$('.select').show();
          }else{
          	if(a>=35&&i==9){
						$('#Highscore').show();
						$('.explain').html("您的分数:"+a +"<br/>"+"恭喜你！你的投资情商非常高，努努力，你将成为中国的巴菲特。");
						}else if(35>a && a>=25 && i==9){
							$('#Finescore').show();
							$('.explain').html("您的分数:"+a +"<br/>"+"你有轻微的投资心理疾病，有时会出现一些失误，但都不会给你的财富带来致命的伤害。只要你能更好的控制情绪，多翻翻《钱经》杂志，你的投资行为会达到更高的境界。");
						}else if(25>a && a>=5 && i==9){
							$('#Middlescore').show();
							$('.explain').html("您的分数:"+a +"<br/>"+"你有很严重的投资心理疾病，如果你在投资方面不加节制的话，有可能让你倾家荡产。你其实并不太适合自己做投资，把钱交给专家让他们帮你打理吧，或者买一些收益低、风险小的保本产品。");
						}else if(5>a && a>=0 && i==9){
							$('#lowscore').show();
							$('.explain').html("您的分数:"+a + "<br/>"+"对不起，我们无能为力了，你需要做的是去医院看大夫。或者好好看下“股市天天向上”微信号，跟着股神好好学习下。");
						}
          }
          
        },
        cancel: function () { 
            // 用户取消分享后执行的回调函数
        },
        trigger: function(res){
						share.title="您的分数:"+a;
						if(a>35){
							share.desc="不服来战，中国的巴菲特非你莫属";
						}else if(35>a && a>=25){
							share.desc="不服来战，再努努力，中国的下一个巴菲特就是你";
						}else if(25>a && a>=5){
							share.desc="不服来战，使出吃奶的劲你就是巴菲特第二";
						}else if(5>a && a>=0){
							share.desc="不服来战，算了吧，是时候该回家卖红薯吧"
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
