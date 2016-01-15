var falg=false;
var actDetail = {
	  contentId : -1,
    activityId : -1,
    maxSelection : -1,
    /**
     * 生成youku播放器
     */
    showVideo : function (domid,vid){
      return new YKU.Player(domid,{
        client_id: 'b9d5fb8b8916ea49',
        vid: vid,
        show_related: false,
        styleid: '0'
      });
    },
    
    initVideo : function(){
      $(".youkuplayer").each(function(e){
        var self = $(this);
        var id = self.attr("id");
        var vid = self.data("vid");
        actDetail.showVideo(id,vid);
      });
    },
    
    setStatus : function(status) {
        switch (status) {
            case 0 : 
                $(".submit-btn").show();
                break;
            case 1 : 
                $(".pre-btn").show();
                break;
            case 2 : 
                $(".end-btn").show();
                break;
            default: 
                $(".pre-btn").show();
                break;
        }
    },
    getActivityIsvoted : function(id,status,callback) {
      Net.getActivityIsvoted(id,function(result){
        if (result.result == "true") {
          // window.location.href = "submit.html?id=" +id;
          $(".voted-btn").show();
        } else {
           actDetail.setStatus(status);
        }
        if (typeof callback == "function") {
          callback();
        }
      });
    },
    getActivityContent : function(id,status){
      Net.getActivityContent(id,function(result){
        falg=true;
      	actDetail.contentId=result.id;
      	actDetail.getActivityIsvoted(actDetail.contentId,result.activity.status,function(){
      	  $("body").show();
          $("#content").handlebars($("#content-tmp"),result);
          //actDetail.initVideo();
          if (result.choiceList.length > 19) {
            $(".item").addClass("item-3");
          }
          $(".banner .img-pic-real").css("background-image","url('"+result.img_url+"')");
          $(".state .s-text").text(result.introduction);
          actDetail.maxSelection = result.max_selection;
      	});
      });
    },
    
    init: function(id){
      actDetail.getActivityContent(id);
     
      //选择
      $(".row").on("click","input:checkbox",function(e){
        var checkboxs = $("input:checkbox:checked");
        var maxSelection = actDetail.maxSelection;
        if(checkboxs.length > maxSelection && maxSelection != -1) {
          e.preventDefault();
          alert("最多可以投"+maxSelection+"票");
        }
      });
      
      var flag = false;
      //提交
      $(document).on("click",".submit-btn",function(e){
        e.preventDefault();
        var data = {
            contentId : actDetail.contentId
        };
        var choiceId = [];
        var checkboxs = $("input:checkbox:checked");
        if (checkboxs.length == 0) {
          return alert("您没有选中的投票");
        }
        checkboxs.each(function(i,n){
          var self = $(this);
          choiceId.push(self.val());
        });
        data.choiceId = choiceId.join(",");
        console.log(data);
        if (flag) {
          return;
        }
        flag = true;
        Net.postActivityNewlist(data,function(result){
        	window.location.href="submit.html?id="+actDetail.contentId;
        });
      });
      
      //导航事件
      $(".nav-bar").on("click",".nav-btn",function(e){
      	if(falg){
      		$("#guestShow").addClass('addColor');
      	}else{
      		$("#guestShow").removeClass('addColor');	
      	}         
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
    }
};
$(function(){
  var parmas = parseUrlParam(window.location.href);
  var activityId = parmas.activityId;
  actDetail.init(activityId);
});