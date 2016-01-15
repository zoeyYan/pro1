var main={
	selfImg:function(){		
		$('.close').bind('click',function(){
			$('.searchHead').css('position','inherit');
			$('.searchContent').css('padding-top','0px');
			$('.search').slideUp();
			$('.main').slideDown();
		
		});
	},
	selfMiddle:function(){
		
	},
	init:function(){
		this.selfImg();
	}
};
$(function(){
	main.init();
})
