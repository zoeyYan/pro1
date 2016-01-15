  var parmas = parseUrlParam(window.location.href);
   var status = parmas.status;
   var openid = parmas.id;
   var followid=null;
   function vote (id,self){
       self.attr("disabled","false");
      Net.getSelfVote(id,function(result){
          console.log(result);
          if(result.status==4){
              votenum=parseInt(self.parent().find(".total").html())+1;
              self.parent().find(".total").html(votenum);
              alert("投票成功!")
          }
          else{
              alert("您今日投票次数已用完，明日再来支持哦!");
          }
          self.removeAttr("disabled");
      },function(res){
          console.log(res);
      });
   }
   function readme(){
      var id=FCWM_USER_ID;
      Net.getReadMe(id,function(result){
          console.log(result)
        if (result.status==2) {
//          $(".selfinfo").handlebars($("#me-tmp"),[result.vote]);
//          $(".info p").eq(2).find("i").html(result.idx);
//          $(".search_div").remove();
            $(".join").html("个人信息");
        }
      });
   }
   function voteinit(page,size){
      Net.getReadVote(page,size,function(result){
          var num_entries=result.total;
            $("#Pagination").pagination(num_entries, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                callback: readvote,
                items_per_page: 1, //每页显示1项
                prev_text: "前一页",
                next_text: "后一页"
            });
      });
   }
   function wxfollow(){
      data={url:location.href};
      Net.postWxVerify(data,function(result){
          window.location.href=result;
      });
   }
   function follow(){
      var id=openid;
      Net.getWxFollow(id,function(result){
          followid=result.status;
          console.log(result.status);
      },function(res){
          console.log(res);
      });
   }
   function readvote(page_index,size){
      var page=page_index;
      var size=8;
      Net.getReadVote(page,size,function(result){
          $(".topboard").handlebars($("#vote-tmp"),result.raws)
          console.log(result);
      });
   }
   function getSearch(id) {
       var page=0;
       var size=40;
       Net.getVoteSearch(id,page,size,function(result){
           if(result.raws.length!=0){
               $(".topboard").handlebars($("#vote-tmp"),result.raws)
           }else{
               $(".topboard").html("<p class='nosearch'>搜索无结果<p>");
           }
       },function(res){
           console.log(res);
       })
   }

$(function(){
    if(status!=1){
        wxfollow();
    }else{
        follow();
    }
    readme();
    voteinit(0,8);
    $(".board").on("click",".back",function(){
        $(".board .toptips").html("投票排行");
        voteinit(0,8);
        $(".back").addClass("hidden");
        $(".pagecon").show();
    });
    $(".search_div").on("click",".join",function(){
        if (followid==1) {
            window.location.href="selfin.html?vote=0";
        } else{
          swal({ title:'',  text: "长按上方二维码,关注非常完美官微才能参与报名投票哦!",   imageUrl: "assets/images/selfie/code.jpg" });
        }
    });

    $(".topboard").on("click",".vote",function(){
        if (followid==1) {
        	self=$(this);
            vote($(this).data("id"),self);
        } else{
          swal({  title:'', text: "长按上方二维码,关注非常完美官微才能参与报名投票哦!",   imageUrl: "assets/images/selfie/code.jpg"});
        }
    });
    $(".search").on("click",".search_btn",function(){
        $(".board .toptips").html("搜索结果");
        $(".pagecon").hide();
        $(".back").removeClass("hidden");
        var id = $(".search_txt").val();
        getSearch(id);
    });
});
//分享
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
            share.title='我正在参加最美自拍女神活动，快来帮我投票吧~';
            share.desc='我正在参加最美自拍女神活动，快来帮我投票吧~';
            share.imgUrl="http://fcwm.24-7.com.cn/assets/images/share/share-400.jpg";
            share.link=window.location.href.split("?")[0];
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
