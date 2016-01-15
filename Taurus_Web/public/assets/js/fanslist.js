var parmas = parseUrlParam(window.location.href);
var id=parmas.id;
var path=parmas.path;
var height=window.screen.height;
$(".content").css("height",height);
if(path==1){
		$(".fan").removeClass("bkGcolor");
		$('.att').addClass("bkGcolor");
		$('.ifans').show();
		$('.fans').hide();
	}else{
		$(".att").removeClass("bkGcolor");
		$(".fan").addClass("bkGcolor");
		$(".fans").show();
		$('.ifans').hide();
	}
function getFansList(id,page,size){
  	 var fanslist = $(".fans");
     var isfor = fanslist.data("isfor");
     var page = fanslist.data("page");
     var size = fanslist.data("size");
     if(!isfor){
     	 fanslist.data("isfor",true);
     	Net.getFansListAll(id,page,size,function(result){     	   
     	    console.log(result);
     	    fanslist.data("isfor",false);
     	    if(result.length>0){
     	    	fanslist.handlebars($("#fans-tmp"),result,true);
     	    	fanslist.data("page",page + 1);
     	    	$('.isFans').each(function(){
     	    		var isfans=$(this).attr('isfans');
     	    		var is_verified=$(this).attr('is_verified');
     	    		if(isfans=="true"){
     	    			$(this).find(".focused").show();
     	    			$(this).find('.focus').hide();
     	    		}else{
     	    			$(this).find(".focus").show();
     	    			$(this).find(".focused").hide();
     	    		}
     	    		if(is_verified=="true"){
     	    			$(this).find('.fansLogo').removeClass('addHide');;
     	    		}else{
     	    			$(this).find('.fansLogo').addClass('addHide');
     	    		}
     	    	});     	    	
     	    	$('.fansBtns').on('click',function(){
     	    		console.log("focus");
					$(this).hide();
					$(this).siblings().show();
					var mms=$(this).attr('mms');
					Net.postUsersInterest(mms,function(result){
						console.log(result);
					});
				});
				$('.fansBtned').on('click',function(){
					console.log("focused");
					$(this).hide();
					$(this).siblings().show();
					var mms=$(this).attr('mms');
					Net.deleteUsersInterest(mms,function(result){
						console.log(result);
					});
				})
     	    }
     	});
     }
    
}

function getIntList(id,page,size){
	var fanslist = $(".ifans");
     var isfor = fanslist.data("isfor");
     var page = fanslist.data("page");
     var size = fanslist.data("size");
     if(!isfor){
     	 fanslist.data("isfor",true);
     	Net.getIntList(id,page,size,function(result){     	   
     	    console.log(result);
     	    fanslist.data("isfor",false);
     	    if(result.length>0){
     	    	fanslist.handlebars($("#fans-tmp2"),result,true);
     	    	fanslist.data("page",page + 1);
     	    	$('.ifansBtns').on('click',function(){
					$(this).addClass('hidden');
					$(this).next().removeClass('hidden');
					var mms=$(this).attr('mms');
					Net.postUsersInterest(mms,function(result){
						console.log(result);
					});
				});
				$('.ifansBtned').on('click',function(){
					$(this).addClass('hidden');
					$(this).prev().removeClass('hidden');
					var mms=$(this).attr('mms');
					Net.deleteUsersInterest(mms,function(result){
						console.log(result);
					});
				});
				$('.isFansed').each(function(){
					var is_verified=$(this).attr('is_verified');
					if(is_verified=="true"){
						$(this).find('.ifansLogo').removeClass('addHide');
					}else{
						$(this).find('.ifansLogo').addClass('addHide');
					}
				});
     	    }
     	});
     }
}

$(function(){
	getFansList(id);
	getIntList(id);
	$('.fan').on("click",function(){
		$('.ifans').hide();
		$('.fans').show();
		$(this).addClass('bkGcolor');
        $(this).siblings().removeClass('bkGcolor');
	})
	$('.att').on("click",function(){
		$('.fans').hide();
		$('.ifans').show();
		$(this).addClass('bkGcolor');
        $(this).siblings().removeClass('bkGcolor');
	})	
	$('.content').on('scroll',function(){
		getFansList(id);
	});
	$('.content').on('scroll',function(){
		getIntList(id);
	});
});