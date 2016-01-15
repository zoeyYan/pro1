var main={
	nav:function(){
		$('header>span').bind('click',function(){
			$(this).addClass('navBg');
			$(this).siblings().removeClass('navBg');
		});
		$('header span:nth-child(1)').bind('click',function(){
			$('.dayList').show();
			$('.weekList').hide();
			$('.monthList').hide();
		});
		$('header span:nth-child(2)').bind('click',function(){
			$('.dayList').hide();
			$('.weekList').show();
			$('.monthList').hide();
		});
		$('header span:nth-child(3)').bind('click',function(){
			$('.dayList').hide();
			$('.weekList').hide();
			$('.monthList').show();
		});
	},
	getOrderByDay:function(){
		var list = $(".dayList");
	    var page = list.data("page");
	    var size = list.data("size");
    	var isfor = list.data("isfor");
    	if (!isfor) {
    	    list.data("isfor",true);
		    		Net.getOrdercomByDay(page,size,function(result){
		    			list.data("isfor",false);
						console.log(result);
						$(".dayList").handlebars($("#article-item1"),result,true);
						list.data("page",page + 1);
						$('.dayList').find(".vIcon").each(function(i){
							if(i==0){
								$(this).parent().parent().find('.label').addClass('labelFirst');
								var pos=$(this).parent().parent().find('.label').attr('order');
								if(pos<0){
								    $(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
								$(this).parent().parent().find('.itemInfo').addClass('first');
							}else if(i==1){
								var pos=$(this).parent().parent().find('.label').attr('order');
								if(pos<0){
								    $(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
								$(this).parent().parent().find('.label').addClass('labelSecond');
								$(this).parent().parent().find('.itemInfo').addClass('second');
							}else if(i==2){
								var pos=$(this).parent().parent().find('.label').attr('order');
								if(pos<0){
								    $(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
								$(this).parent().parent().find('.label').addClass('labelThird');
								$(this).parent().parent().find('.itemInfo').addClass('third');
							}else if(i>2){
								var pos=$(this).parent().parent().find('.label').attr('order');
								console.log("month"+pos);
								if(pos<0){
									$(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
							}							
							var isValid=$(this).attr('isValid');
						 	if(isValid=="true"){
						 		$(this).removeClass('hidden');
						 	}else{
						 		$(this).addClass('hidden');
				 	     	}
						});
				 		$('.dayList').find('section').on('click',function(){
				 			var pId=$(this).attr('accountId');
				 			if(pId==STOCK_USER_ID){
				 				  window.location.href="myself.html";
				 			}else{
				 				 window.location.href="member.html?id="+pId;
				 			}
				 		})
					});
    	}
	
	},
	getOrderByWeek:function(){
		var list = $(".weekList");
	    var page = list.data("page");
	    var size = list.data("size");
    	var isfor = list.data("isfor");
    	if (!isfor) {
    	    list.data("isfor",true);    	      
		    		Net.getOrdercomByWeek(page,size,function(result){
		    			list.data("isfor",false);
						console.log(result);
						$(".weekList").handlebars($("#article-item2"),result,true);
						list.data("page",page + 1);
						$('.weekList').find(".vIcon").each(function(j){
							if(j==0){
								$(this).parent().parent().find('.label').addClass('labelFirst');
								var pos=$(this).parent().parent().find('.label').attr('order');
								if(pos<0){
								    $(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
								$(this).parent().parent().find('.itemInfo').addClass('first');
							}else if(j==1){
								var pos=$(this).parent().parent().find('.label').attr('order');
								if(pos<0){
								    $(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
								$(this).parent().parent().find('.label').addClass('labelSecond');
								$(this).parent().parent().find('.itemInfo').addClass('second');
							}else if(j==2){
								var pos=$(this).parent().parent().find('.label').attr('order');
								if(pos<0){
								    $(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
								$(this).parent().parent().find('.label').addClass('labelThird');
								$(this).parent().parent().find('.itemInfo').addClass('third');
							}else if(j>2){
								var pos=$(this).parent().parent().find('.label').attr('order');
								console.log("month"+pos);
								if(pos<0){
									$(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
							}							
							var isValid=$(this).attr('isValid');
						 	if(isValid=="true"){
						 		$(this).removeClass('hidden');
						 	}else{
						 		$(this).addClass('hidden');
				 	     	}
						});
							$('.weekList').find('section').on('click',function(){
						 			var pId=$(this).attr('accountId');
						 			if(pId==STOCK_USER_ID){
						 				  window.location.href="myself.html";
						 			}else{
						 				 window.location.href="member.html?id="+pId;
						 			}
					 		});
					});	
    	}
	},
	getOrderByMonth:function(){
		var list = $(".monthList");
	    var page = list.data("page");
	    var size = list.data("size");
    	var isfor = list.data("isfor");
    	if (!isfor) {
    	    list.data("isfor",true);
		    		Net.getOrdercomByMonth(page,size,function(result){
		    			list.data("isfor",false);
						console.log(result);
						$(".monthList").handlebars($("#article-item3"),result,true);
						list.data("page",page + 1);
						$('.monthList').find(".vIcon").each(function(k){
							if(k==0){
								$(this).parent().parent().find('.label').addClass('labelFirst');
								var pos=$(this).parent().parent().find('.label').attr('order');
								if(pos<0){
								    $(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
								$(this).parent().parent().find('.itemInfo').addClass('first');
							}else if(k==1){
								var pos=$(this).parent().parent().find('.label').attr('order');
								if(pos<0){
								    $(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
								$(this).parent().parent().find('.label').addClass('labelSecond');
								$(this).parent().parent().find('.itemInfo').addClass('second');
							}else if(k==2){
								var pos=$(this).parent().parent().find('.label').attr('order');
								if(pos<0){
								    $(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
								$(this).parent().parent().find('.label').addClass('labelThird');
								$(this).parent().parent().find('.itemInfo').addClass('third');
							}else if(k>2){
								var pos=$(this).parent().parent().find('.label').attr('order');
								console.log("month"+pos);
								if(pos<0){
									$(this).parent().parent().find('.itemInfo').addClass('cColor');
								}
							}							
							var isValid=$(this).attr('isValid');
						 	if(isValid=="true"){
						 		$(this).removeClass('hidden');
						 	}else{
						 		$(this).addClass('hidden');
				 	     	}
						});
						$('.monthList').find('section').on('click',function(){
						 			var pId=$(this).attr('accountId');
						 			if(pId==STOCK_USER_ID){
						 				  window.location.href="myself.html";
						 			}else{
						 				 window.location.href="member.html?id="+pId;
						 			}
					 	});
			    	});			
    	}
	},
	fallShow:function(){
		$('.dayList').on('scroll',function(){
			 if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
	           main.getOrderByDay();
	         }
    	});
    	$('.weekList').on('scroll',function(){
			 if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
	           main.getOrderByWeek();
	         }
    	});
    	$('.monthList').on('scroll',function(){
			 if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
	           main.getOrderByMonth();
	         }
    	});
	},
	init:function(){
		this.nav();
		this.getOrderByDay();
		this.getOrderByWeek();
		this.getOrderByMonth();
		this.fallShow();
	}
}
$(function(){
	main.init();
	
})
