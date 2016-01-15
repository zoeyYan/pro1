var myWay={
	nav:function(){
	  $('header>span').click(function(){
	  	  $(this).addClass('addColor');
	  	  $(this).siblings().removeClass('addColor');
	  });
	},
	self:function(){
		console.log(1);
		$('.morning').find('.noTitle').each(function(){
			var height=$(this).height();
			if(height<27){
				$(this).css('padding-top','15px');
			}else{
				$(this).css('height','50px');
				$(this).siblings().css('padding-top','2px');
			}
		});		
		$('.morning').find('.title').each(function(){
			var height=$(this).height();
			if(height<27){
				$(this).css('padding-top','5px');
				$(this).css('margin-bottom','3px');
			}else{
				$(this).css('height','40px');
				$(this).css('margin-top','-2px');
			}
		})
	},
	tapNav:function(){
		$('header>span:first-child').click(function(){
			$('.morning').fadeIn();
			$('.afternoon').hide();
		});
		$('header>span:last-child').click(function(){
			$('.afternoon').fadeIn();
			$('.morning').hide();
			$('.afternoon').find('.noTitle').each(function(){
				var height=$(this).height();				
					if(height<27){
						$(this).css('padding-top','15px');
					}else{
						$(this).css('height','50px');
						$(this).siblings().css('padding-top','2px');
					}
			});
			$('.afternoon').find('.title').each(function(){
			var height=$(this).height();
			if(height<27){
				$(this).css('padding-top','5px');
				$(this).css('margin-bottom','3px');
			}else{
				$(this).css('height','40px');
				$(this).css('margin-top','-2px');
			}
		})
		});
	},
	itemMomoring:function(){		
		var morning="stock";
		var list = $(".morning");
	    var page = list.data("page");
	    var size = list.data("size");
    	var isfor = list.data("isfor");
    	if (!isfor) {
       	list.data("isfor",true);
        Net.getHotStrategy(morning,page,size,function(result){
            list.data("isfor",false);
            $(".morning").handlebars($("#article-item"),result.rows,true);
            myWay.self();
            list.data("page",page + 1);
            $('.time').each(function(){
            	var creatTime=$(this).attr('ctime');
            	var now = new Date().getTime();
            	time =Math.floor((now - creatTime)/60000);
            	if(time<=60){
                       if(time>=0){
                           $(this).text(time+"分钟前");    
                       }
                       else{
                            $(this).text("0分钟前");  
                       }
                }else{
                       if(time<1440){
                           time=Math.floor(time/60)
                           $(this).text(time+"小时前");
                       }
                       else{
                           time=Math.floor(time/1440)
                           $(this).text(time+"天前");
                       }                       
                   }
            });
    	 });   	 
    	 }
	},
	itemAfternoon:function(){
		var afternoon="stock1";
		var list = $(".afternoon");
	    var page = list.data("page");
	    var size = list.data("size");
    	var isfor = list.data("isfor");
    	if (!isfor) {
       	list.data("isfor",true);
        Net.getHotStrategy(afternoon,page,size,function(result){
            list.data("isfor",false);
            $(".afternoon").handlebars($("#article-item"),result.rows,true);           
            list.data("page",page + 1);
            $('.time').each(function(){
            	var creatTime=$(this).attr('ctime');
            	var now = new Date().getTime();
            	var time =Math.floor((now - creatTime)/60000);
            	if(time<=60){
                       if(time>=0){
                           $(this).text(time+"分钟前");    
                       }
                       else{
                            $(this).text("0分钟前");  
                       }
                }else{
                       if(time<1440){
                           time=Math.floor(time/60)
                           $(this).text(time+"小时前");
                       }
                       else{
                           time=Math.floor(time/1440)
                           $(this).text(time+"天前");
                       }                       
                   }
            });
    	 });   	 
    	 }
	},
	init:function(){
		this.itemMomoring();
		this.itemAfternoon();
		setInterval("myWay.self()",50);
		this.nav();		
		this.tapNav();
		
	}
};
$(function(){
	myWay.init();
    $('.morning').on('scroll',function(){
    	if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
           myWay.itemMomoring();    
         }
    });
	$('.afternoon').on('scroll',function(){
		if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
           myWay.itemAfternoon();    
         }
	});
	
	
})
