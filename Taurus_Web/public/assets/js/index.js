var main={	
	self:function(){
	},
	
	viBanner:function(){
		var mySwiper = new Swiper('.vibanner', {
			autoplay: 3000,//可选选项，自动滑动
			direction : 'horizontal',
			loop:true,
			pagination : '.swiper-pagination',
			paginationClickable :true
   		})
	},
	getBanner:function(){
		Net.getHomeBanner(function(result){
		  var result=result;
		  $(".addBanner").handlebars($("#banner-item"),result,true);
		  main.viBanner();
		  main.self();
		});
	},
	getPlayer:function(){
		Net.getUsersInfo(function(result){
			var data=result;
			$('.content').handlebars($("#player-item"),data,true);			
			$('.item').on('click',function(){
				var id=$(this).attr("id");
				var showId=$(this).attr('showMore');
				if(showId==1){
					if(id==STOCK_USER_ID){
					window.location.href="myself.html";
					}else{
						window.location.href='member.html?id='+id;
					}
				}else{
					console.log("No click");
				}
			});
			$('.vLabel').each(function(){
				var showLabel=$(this).attr('is_verified');
				if(showLabel=="true"){
					$(this).show();
				}else{
					$(this).hide();
				}
			})
		});
	},
	getLogin:function(){
		Net.getMyLogin(function(result){
			
		});
	},
	getPreferInfo:function(){
	   $('.prefer').click(function(){
	   	  window.location.href="prefer.html?acountId="+STOCK_USER_ID;
	   });
	},
	init:function(){
//	    this.getLogin();
		this.getBanner();
		this.getPlayer();
		this.getPreferInfo();
	}
}
$(function(){
	main.init();
})
