var falg=false;
var activity = {

   getActivity : function (){

     var activeList = $("#activeList");
     var isfor = activeList.data("isfor");
     var page = activeList.data("page");
     var size = activeList.data("size");
     if (!isfor) {
       activeList.data("isfor",true);

       Net.getActivity(page,size,function(result){
         activeList.data("isfor",false);
         if (result.length > 0) {
           activeList.handlebars($("#activeList-tmp"),result,true);
           activeList.data("page",page + 1);

          //秀活动倒计时
          var i;
          var num;
          var l=$(".cover-box li").length;
          var now=new Date().getTime();
          for(i=0;i<l;i++){
            if($(".cover-box li").eq(i).hasClass("addinfo")){}
            else{
                var stime = $(".cover-box li").eq(i).data("starttime");
                var etime = $(".cover-box li").eq(i).data("endtime");
                var sday = Math.ceil(stime/86400000)-Math.ceil(now/86400000);
                var eday = Math.ceil(etime/86400000)-Math.ceil(now/86400000);
                $(".cover-box li").eq(i).addClass("addinfo");
                if (sday>0){
                    $(".cover-box li").eq(i).find(".img-thumb").append('<p class="time">距离开始还有<em class="days">'+sday+'</em>天</p><a class="detail" href="#">点击查看详情</a>');
                }
                if(eday==0){
                    $(".cover-box li").eq(i).find(".processing").append('<span class="actInfo" style="padding-right:5px">即将结束</span>');
                }
                if(eday<3&&eday>0){
                    $(".cover-box li").eq(i).find(".processing").append('<span class="actInfo">剩<em class="surplus">'+eday+'</em>天</span>');
                }
                else{
                    if(eday>=3){
                        $(".cover-box li").eq(i).find(".processing").append('<span class="actInfo">进行中</span>');
                        }
                    }

            }
          }
         }
       });
     }
   },

   init : function (){
     activity.getActivity();
       falg=true;
     //加载更多
     $(window).on('scroll', function (e) {
       if ($(document).scrollTop() + $(window).height() > $(document).height() - 10) {
         activity.getActivity();
       }
     });

     //导航事件
      $(".nav-bar").on("click",".nav-btn",function(e){
         if(falg){
            $('#actShow').addClass('addColor');
         }else{
            $('#actShow').removeClass('addColor');
         }


         $('#actShow').addClass('addColor');

         $(this).siblings().find('p').removeClass('addColor');
         $(this).find('p').addClass('addColor');
         var href = $(this).find('p').attr("href");
         if (href) {
           window.location.href=href;
         }
        var self = $(this);
        var menu = self.find(".menu");

        $(".menu").not(menu).removeClass("active");
        $(".nav-btn").not(self).removeClass("active");

        if (self.hasClass("active")) {
          $(".fcwm-mask").removeClass('active');
          menu.removeClass("active");
          self.removeClass("active");
        } else {
          $(".fcwm-mask").addClass('active');
          menu.addClass("active");
          self.addClass("active");
        }
      });

      $(".fcwm-mask").on("click",function(e){
        $(".fcwm-mask").removeClass('active');
        $(".menu").removeClass("active");
        $(".nav-btn").removeClass("active");
      });

      $(document).on("click",".link",function(e) {
        e.preventDefault();
        var self = $(this);
        var href = self.attr("href");
        var id = self.data("id");
        var web = self.data("web");
        var type = self.data("type");
        var status= self.data("status");
        var contentId = self.data("contentid");
        if (href !== "#") {
            if(status==2){
                if (type == 0) {
                   window.location.href = "submit.html?id=" + contentId;
                } else {
                   alert("活动已经结束，感谢您的参与！");
                }

            } else {
//              if(status==1){
//                  alert("活动还未开始，dingnaixinden");
//              }
               switch (type) {
                case 0 :
                  Net.getIsvoted(id,function(result){
                    if (result.result == "true") {
                      window.location.href = "submit.html?id=" + result.contentId;
                    } else {
                        if(web=='1'){
                            window.location.href = "actdt.html?id="+id;
                        }else{
                            window.location.href = href;
                        }
                    }
                  });
                  break;
                default :
                  if(web=='1'){
                        window.location.href = "actdt.html?id="+id;
                    }else{
                        window.location.href = href;
                    }
                  break;
              }
            }

        }
      });



   }
};

$(function(){
  activity.init();
});
