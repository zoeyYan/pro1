$(function(){
//	var height=window.screen.height;
//	$('.main-swiper').css('height',height);	
	Net.getHotList(function(data){
		var page1=[];
		page1=data;
		console.log(page1);
		var time=Math.ceil(page1.length/3);
	console.log("time---------"+time);
	var changePage = [];
		for(var i=0,len=page1.length;i<len;i+=3){
		   changePage.push(page1.slice(i,i+3));		   
		}
	var all=[];
	for(var i=0;i<time;i++){
		all.push({"time":i,"data":changePage[0]});
	}	
	var result={"data":all};	
	setData("#data-second","#dataInfo",result);	
	adaptPage();
		for(var j=0;j<time;j++){			
			for(var i=0;i<changePage[j].length;i++){
			    num=i+1;
				$("#time"+j).find('.content').append("<div class='item'>"
					+"<div class='head'><img src=''>"+"</div>"
						+"<div class='info'>"
						  +"<p class='list'>红人榜"+"</p>"
						  +"<p><span class='name dot'></span><span class='dot'>&middot;</span><span class='sign dot'></span></p>"
						  +"<p class='arrow'><img src='assets/images/selfdetail/arrow-right.png'></p>"						  
						+"</div>"
						+"<div class='clear'></div>"
					+"</div>");
			}	
		}
//		console.log(page1);
		for(var i=0;i<page1.length;i++){
			$('.name').eq(i).text(page1[i].name);
			$('.sign').eq(i).text(page1[i].words);
			$('.head>img').eq(i).attr('src',page1[i].picUrl);	
			$('.content').find('.item').eq(i).attr('data-num',page1[i].id);
		}	
			var mainSwiper = $(".main-swiper").swiper({
		    direction: 'vertical', //horizontal
		    loop : false 
		  }); 
		$(".swiper-container .item").on('click',function(){
            id=$(this).data('num');
            switch(id){
                case 1:
                window.location.href='http://fcwm.24-7.com.cn/assets/recommend.html#page/page_13853534097181';
                break;
                case 2:
                window.location.href='http://fcwm.24-7.com.cn/assets/recommend-zxz.html#page/page_13853534097181';
                break;
                case 3:
                window.location.href='http://fcwm.24-7.com.cn/assets/recommend-qys.html#page/page_13853534097181';
                break;
                case 4:
                window.location.href='http://fcwm.24-7.com.cn/assets/recommend-skj.html#page/page_13853534097181';
                break;
                default:
                window.location.href='selfdetail.html?id='+id;
                break;
            }
		});
	});

})
