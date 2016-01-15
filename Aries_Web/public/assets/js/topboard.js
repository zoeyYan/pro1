
var topboard={
    
    getUsersInterestById :  function  (){
      Net.getUsersInterestById(id,function(result){
      	console.log(result);
        $("#eId").html(result.eId);
      });
    },
    
    getMonthRich        :   function()  {
        var itemList = $("#monthrichList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getMonthRich(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-money-tmp"),result,true);
                  itemList.data("page",page + 1);
                   $('.name').each(function(){
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
    getDayMan       :   function()  {
        var itemList = $("#daymanList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getDayMan(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-tmp"),result,true);
                  itemList.data("page",page + 1);
                   $('.name').each(function(){
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
    getWeekMan        :   function()  {
        var itemList = $("#weekmanList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getWeekMan(page,size,function(result){            	
                if (result.length > 0) {
                  itemList.handlebars($("#item-tmp"),result,true);                  
                  itemList.data("page",page + 1);
	               $('.name').each(function(){
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
    getMonthMan        :   function()  {
        var itemList = $("#monthmanList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getMonthMan(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-tmp"),result,true);
                  itemList.data("page",page + 1);
                  $('.name').each(function(){
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
    getDayWoman        :   function()  {
        var itemList = $("#daywoList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getDayWoman(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-tmp"),result,true);
                  itemList.data("page",page + 1);
                   $('.name').each(function(){
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
    getWeekWoman        :   function()  {
        var itemList = $("#weekwoList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getWeekWoman(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-tmp"),result,true);
                  itemList.data("page",page + 1);
                   $('.name').each(function(){
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
    getMonthWoman        :   function()  {
        var itemList = $("#monthwoList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getMonthWoman(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-tmp"),result,true);
                  itemList.data("page",page + 1);
                  $('.name').each(function(){
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
    getWeekNew        :   function()  {
        var itemList = $("#weeknewList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getWeekNew(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-tmp"),result,true);
                  itemList.data("page",page + 1);
                   $('.name').each(function(){
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
    getMonthNew        :   function()  {
        var itemList = $("#monthnewList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getMonthNew(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-tmp"),result,true);
                  itemList.data("page",page + 1);
                   $('.name').each(function(){
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
    getDayNew        :   function()  {
        var itemList = $("#daynewList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getDayNew(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-tmp"),result,true);
                  itemList.data("page",page + 1);
                   $('.name').each(function(){
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
    getWeekRich        :   function()  {
        var itemList = $("#weekrichList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getWeekRich(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-money-tmp"),result,true);
                  itemList.data("page",page + 1);
                   $('.name').each(function(){
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
    getDayRich        :   function()  {
        var itemList = $("#dayrichList");
        var page=itemList.data("page");
        var size=itemList.data("size");
        var isfor = itemList.data("isfor");
         if (!isfor) {
            itemList.data("isfor",true);
            Net.getDayRich(page,size,function(result){
                if (result.length > 0) {
                  itemList.handlebars($("#item-money-tmp"),result,true);
                  itemList.data("page",page + 1);
                   $('.name').each(function(){
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
                  console.log(result);
                  $('.name').each(function(){
		               	var label= $(this).attr('label');
		               	console.log(label);
		               	if(label=="true"){
		               		$(this).find('.label1').removeClass('hidden');
		               	}else{
		               		$(this).find('.label1').addClass('hidden');
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
    
    init :  function () {
        $(".content").find(".toplist").hide();
        $(".content").find(".day").eq(0).show();
        topboard.getDayMan();
        $("nav").on("click","li",function(){
            var i=$(this).index();
            $(this).addClass("cur").siblings().removeClass("cur");
            if(i==0)
            {
                $(".content").find(".toplist").hide();
                $(".content").find(".day").eq(0).show();
                topboard.getDayMan();
            }
            if(i==1)
            {
                $(".content").find(".toplist").hide();
                $(".content").find(".day").eq(1).show();
                topboard.getDayWoman();
            }
            if(i==2)
            {
                $(".content").find(".toplist").hide();
                $(".content").find(".day").eq(2).show();
                topboard.getDayRich();
            }
            if(i==3)
            {
                $(".content").find(".toplist").hide();
                $(".content").find(".day").eq(3).show();
                topboard.getDayNew();
            }
        });
        //瀑布流
//    $(window).on('scroll', function (e) {
//        if ($(document).scrollTop() + $(window).height() > $(document).height() - 10) {
//            var content = $(".content > .toplist:visible");
//            topboard[content.data("action")]();
//        }
//      });
        $("header").on("click","li",function(){
            var num = $(this).index();
            $(this).addClass("cur").siblings().removeClass("cur");
            if(num==0)
            {
                var now=$("nav ul li.cur").index();
                $(".content").find(".toplist").hide();
                $(".content").find(".day").eq(now).show();
                var content = $(".day").eq(now);
                $("nav").on("click","li",function(){
                    var i=$(this).index();
                    $(this).addClass("cur").siblings().removeClass("cur");
                    if(i==0)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".day").eq(0).show();
                        topboard.getDayMan();
                    }
                    if(i==1)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".day").eq(1).show();
                        topboard.getDayWoman();
                    }
                    if(i==2)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".day").eq(2).show();
                        topboard.getDayRich();
                    }
                    if(i==3)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".day").eq(3).show();
                        topboard.getDayNew();
                    }
                });
            }
            if(num==1)
            {
                
                var now=$("nav ul li.cur").index();
                $(".content").find(".toplist").hide();
                $(".content").find(".week").eq(now).show();
                var content = $(".week").eq(now);
                topboard[content.data("action")]();
                $("nav").on("click","li",function(){
                    var i=$(this).index();
                    $(this).addClass("cur").siblings().removeClass("cur");
                    if(i==0)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".week").eq(0).show();
                        topboard.getWeekMan();
                    }
                    if(i==1)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".week").eq(1).show();
                        topboard.getWeekWoman();
                    }
                    if(i==2)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".week").eq(2).show();
                        topboard.getWeekRich();
                    }
                    if(i==3)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".week").eq(3).show();
                        topboard.getWeekNew();
                    }
                });
            }
            if(num==2)
            {
                var now=$("nav ul li.cur").index();
                $(".content").find(".toplist").hide();
                $(".content").find(".month").eq(now).show();
                var content = $(".month").eq(now);
                topboard[content.data("action")]();
                $("nav").on("click","li",function(){
                    var i=$(this).index();
                    $(this).addClass("cur").siblings().removeClass("cur");
                    if(i==0)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".month").eq(0).show();
                        topboard.getMonthMan();
                    }
                    if(i==1)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".month").eq(1).show();
                        topboard.getMonthWoman();
                    }
                    if(i==2)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".month").eq(2).show();
                        topboard.getMonthRich();
                    }
                    if(i==3)
                    {
                        $(".content").find(".toplist").hide();
                        $(".content").find(".month").eq(3).show();
                        topboard.getMonthNew();
                    }
                });
            }
        });

      $(".search-top").on("click",".close",function(){
        $("body>div:not(.search-top,.fcwm-mask),header,nav").stop().fadeIn();
        $(".search-txt").val('');
        $(".contentlist").stop().fadeOut(); 
      });
      $(".contentlist").on("click",function(){
          $(".search-txt").val('');
      })
      $(".search-top").on("input",".search-txt",function(){
        var val=$(".search-txt").val();
        $("#search-list").data("page",0);
        if(val=='')
        {
            $(".contentlist").stop().fadeOut();
            $("body>div:not(.contentlist),header,nav").stop().fadeIn();
        }
        else{
            $(".contentlist").stop().fadeIn();
            $("body>div:not(.search-top,.contentlist,.fcwm-mask),header,nav").stop().fadeOut();
            $("#search-list").empty();
            topboard.getSearch();
        }
        
      });
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
      $(".fcwm-mask").on("click",function(e){
        $(".fcwm-mask").removeClass('active');
        $(".menu").removeClass("active");
        $(".nav-btn").removeClass("active");
      });
     
    }
    
    
};


$(function(){
    topboard.init(); 
    $(".contentlist").on('scroll', function (e) {
          var self = $(this);
          var content = $(".search-list ");
           if (self.scrollTop() + self.height() -20 == content.outerHeight() ) {
              topboard.getSearch();
           }
      }); 
});
