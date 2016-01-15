var main={  
	 initVideoSwiper : function(){
	 var mySwiper = new Swiper('#video-swiper', {
			direction : 'horizontal',
			loop:true,
			pagination : '.swiper-pagination',
			paginationClickable :true
   		})
	},
	 /**
     * 获取video
     */
    getHomeVideo : function(){
       Net.getLargeVideo(function(result){
       	$("#video-wrapper").handlebars($("#video-slide-tmp"),result);
       });
        var date={
        	"video":[
       {"id": "100B620D-C841-ECE6-2C59-A56B622DAAA7","link": "null","type":"2","url":"http://player.youku.com/embed/XMTMzNDMxODczNg=="},
       {"id": "100B620D-C841-ECE6-2C59-A56B622DAAA7","link": "null","type":"2","url":"http://player.youku.com/embed/XMTMzNDMxODczNg=="},
       {"id": "100B620D-C841-ECE6-2C59-A56B622DAAA7","link": "null","type":"2","url":"http://player.youku.com/embed/XMTMzNDMxODczNg=="} 
        	]
        }
        var result=date.video;
//      $("#video-wrapper").handlebars($("#video-slide-tmp"),result);
        main.initVideoSwiper();
    },
    /***
     * 解决首页播放
     * **/
    shakeSlide:function(){
    	 $(".swiper-pagination").on("click",function(e){
	        var self = $(this).hide();
	        setTimeout(function(){
	          self.show();
	        },4000);
	  	});          
    },    
    getSmallVideo:function(){
    	Net.getSmallVideo(function(result){
    		console.log(result);
    		$(".content").handlebars($("#video-small-tmp"),result);
    	});
    	
    },
	init:function(){
		this.getHomeVideo();
		this.shakeSlide();
		this.getSmallVideo();
	}
}
$(function(){
	main.init();
	 
});
