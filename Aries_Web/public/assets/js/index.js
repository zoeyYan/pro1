var MYMAIN = {
	/**
	 * 登录
	 */
	loginWithApp : function (username,callback){
		var data = {
			username: username,
			type : 1
		};
		Net.loginWithApp(data,function(result){
			if (typeof callback == "function") {
				callback();
			}
		});
	},
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
    /**
     * 初始化youku播放器
     */
    initVideo : function(){
      var videoSlide = $("#video-wrapper .swiper-slide");
      videoSlide.each(function(){
        var self = $(this);
        var id = self.attr("id");
        var vid = self.data("vid");
        MYMAIN.showVideo(id,vid);
      });
    },
    
    /**
     * 初始化video swiper
     */
    initVideoSwiper : function(){
      return new Swiper('#video-swiper',{
        pagination: '.swiper-pagination',
        paginationClickable: true,
        bulletClass : "swiper-pagination-purple",
        bulletActiveClass : "swiper-pagination-purple-active"
      });
    },
    /**
     * 初始化广告条swiper
     */
    initAdSwiper : function(){
      return new Swiper('.ad-swiper',{
        direction: 'vertical',
        autoplay: 3000
      });
    },
    /**
     * 初始化广告条swiper
     */
    getAd : function(){
      Net.getBannerSmall(function(result){
        $("#ad-wrapper").handlebars($("#ad-wrapper-tmp"),result);
        if (result.length) {
          $(".ad-swiper").show();
          $(".ad-swiper").find("img").eq(0).on("load",function(){
            var height = $(this).height();
            $(".ad-swiper").height(height);
            MYMAIN.initAdSwiper();
          });
        }
      });
    },
    
    /**
     * 获取首页video
     */
    getHomeVideo : function(){
      Net.getHomeVideo(function(result){
        $("#video-wrapper").handlebars($("#video-slide-tmp"),result);
        //MYMAIN.initVideo();
        MYMAIN.initVideoSwiper();
      });
    },
    
    /**
     * 初始化活动列表
     */
    
    getProgramTitle : function(callback){
      Net.getProgramTitle(function(result){
        $("#activeList").handlebars($("#activeList-tmp"),result);
        $("#guest").handlebars($("#guest-tmp"),result);
        
        if (typeof callback === "function") {
          callback();
        }
      });
    },
    
    /**
     * 加载嘉宾头像
     */
    getProgramContent : function(programId){
      var guestBox = $("#guest-box-"+programId);
      var isfor = guestBox.data("isfor");
      var page = guestBox.data("page");
      var size = guestBox.data("size");
      if (!isfor) {
        guestBox.data("isfor",true);        
        Net.getProgramContent(programId,function(result){
          guestBox.data("isfor",false);
          guestBox.data("init",true);
          if (result.length > 0) {
            guestBox.find(".img-row").handlebars($("#guest-box-tmp"),result,true);
            guestBox.data("page",page + 1);            
    		$('.img-name').each(function(){
               	var label= $(this).attr('label');
               	if(label=="true"){
               		$(this).find('.label').removeClass('hidden');
               	}else{
               		$(this).find('.label').addClass('hidden');
               	}	               	
            })
          }
        });
      }
      
    },
    getSearch : function(){
        var itemList = $("#search-list");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var id=$(".search-txt").val();
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getSearch(id,page,size,function(result){
//              $(".s-num").html(result.length);
                itemList.data("isfor",false);
                if (result.length > 0) {
                  $(".search-num").html('');
                  itemList.handlebars($("#list-tmp"),result,true);
                  itemList.data("page",page + 1);
                  console.log("+++++++"+result.length);
                  var width=window.screen.width;
				      if(width<400){
				      	$('.list-item').css('height','125px');				      	
				      }else{
				      	$('.list-item').css('height','145px');
				      }
                  $('.name').each(function(){
		               	var label= $(this).attr('label');
		               	if(label=="true"){
		               		$(this).find('.label').removeClass('hidden');
		               	}else{
		               		$(this).find('.label').addClass('hidden');
		               	}	               	
            	  })
                  
                  }
                if(page==0&&result==''){
                  $(".search-num").html("没有找到结果，请重新输入");
                }
//              flag = true;
            });
          } 
    },
    
    init : function(){
      this.getAd();
      this.getHomeVideo();
      this.getProgramTitle(function(){
        $(".select-hide").trigger("change.mymain");
      });
      
      //切换活动
      $("#activeList").on("change.mymain",function(e){
        var self = $(this);
        var programId = self.val();
        var option = self.find("option:selected");
        self.siblings(".select-show").text(option.text());
        
        $(".guest").hide();
        var guestBox = $("#guest-box-"+programId).fadeIn(200);
        //嘉宾头像一次都未加载过
        if (!guestBox.data("init")) {
          MYMAIN.getProgramContent(programId);
        }
      });
      
      $(".swiper-pagination").on("tap",function(e){
        var self = $(this).hide();
        setTimeout(function(){
          self.show();
        },400);
      });
      //加载更多(目前不需要瀑布流)
      /*
      $(window).on('scroll', function (e) {
              if ($(document).scrollTop() + $(window).height() > $(document).height() - 10) {
                var programId = $("#activeList").val();
                MYMAIN.getProgramContent(programId);
              }
            });
      */
      
      //导航事件
      $(".nav-bar").on("click",".nav-btn",function(e){
      	
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
      $(".container").on("click",".search",function(){
        $(".search-box").stop().slideDown();
        $("body>div:not(.search-box)").fadeOut();
      });
      $(".search-box").on("click",".close",function(){
        $("body>div:not(.search-box,.mask,.pace)").fadeIn();
        $(".search-box").stop().slideUp(); 
        $(".search-txt").val('');
        $(".content").stop().fadeOut(); 
      });
      $(".content").on("click",function(){
          $(".search-txt").val('');
      })
      $(".search-box").on("input",".search-txt",function(){
        var val=$(".search-txt").val();
        $(".search-num").html('');
        $("#search-list").data("page",0);
        if(val=='')
        {
            $(".content").stop().fadeOut(); 
        }
        else{
            $(".content").stop().fadeIn();
            $("#search-list").empty();
            MYMAIN.getSearch();
        }
        
      });

      $(".fcwm-mask").on("click",function(e){
        $(".fcwm-mask").removeClass('active');
        $(".menu").removeClass("active");
        $(".nav-btn").removeClass("active");
      });
    }
};

var flag = true;
$(function(){
	   MYMAIN.init();
	  $(".content").on('scroll', function (e) {
	      var self = $(this);
	      var content = $(".search-list ");
           if (self.scrollTop() + self.height() - 20 == content.outerHeight() ) {
                     MYMAIN.getSearch();
           }
      });      
});
