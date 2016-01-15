 var bloomingMenu = new BloomingMenu({
			      startAngle:  180,
			      endAngle: 270,
			      radius: 100,
			      itemsNum: 3,
			      right: 8,
			      bottom: 50,
			      itemAnimationDelay: 0.08
			    })
			    bloomingMenu.render();
// Prevents "elastic scrolling" on Safari
document.addEventListener('touchmove', function(event) {
  'use strict'
//event.preventDefault(); what's worng?
})
$(function(){
	$('.blooming-menu__item:nth-of-type(1)').bind('click',function(){
		window.location.href='topic.html';
	});
	$('.blooming-menu__item:nth-of-type(2)').bind('click',function(){
		window.location.href='index.html';
//		$('.main').slideUp(function(){
//			$('.searchHead').css('position','absolute');
//			$('.searchContent').css('padding-top','55px');
//		});
//		$('.search').slideDown(function(){
//			var height=$('.scBlogitemImg').width();
//			$('.scBlogitemImg').css('height',height);
//			$('.search').find('.sctitle').each(function(){
//				var height=$(this).height();
//				if(height<27){
//					$(this).css('padding-top','5px');
//					$(this).css('margin-bottom','3px');
//				}else{
//					$(this).css('height','45px');
//					$(this).css('margin-top','-2px');
//				}
//			});
//			$('.search').find('.scnoTitle').each(function(){
//				var height=$(this).height();
//				console.log(height);
//				if(height<27){
//					$(this).css('padding-top','15px');
//				}else{
//					$(this).css('height','50px');
//					$(this).siblings().css('padding-top','2px');
//				}
//			});
//
//		});
	});
	$('.blooming-menu__item:nth-of-type(3)').bind('click',function(){
		window.location.href='ordercommon.html';
	});
});
