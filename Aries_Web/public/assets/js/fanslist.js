var parmas = parseUrlParam(window.location.href);
var id =parmas.id;
var status =parmas.status;
if(status==1)
{
    $('.fans').addClass('hidden');
    $('.ifans').removeClass('hidden');
    $('.att').addClass('line');
    $('.fan').removeClass('line');  
    $(".fans-item").remove();
    getIntList(id);
}
function getFansList (id,page,size){
    var fanslist = $("#fans-item");
     var isfor = fanslist.data("isfor");
     var page = fanslist.data("page");
     var size = fanslist.data("size");
     if (!isfor) {
       fanslist.data("isfor",true);
       Net.getFansList(id,page,size,function(result){
         console.log(result)
         fanslist.data("isfor",false);
         if (result.length > 0) {
           fanslist.handlebars($("#fans-tmp"),result,true);
           fanslist.data("page",page + 1);
           console.log(result);
           $('.info').each(function(){
		               	var label= $(this).attr('label');
		               	if(label=="true"){
		               		$(this).find('.label').removeClass('hidden');
		               	}else{
		               		$(this).find('.label').addClass('hidden');
		               	}	               	
	       })
             for(var n=0;n<$(".fans-item").length;n++){
                  var infoid=$(".fans-item").eq(n).find(".info").data("id");
                  if(infoid==FCWM_USER_ID){
                        $(".fans-item").eq(n).find(".fun").remove();
                        $(".fans-item").eq(n).find("em").remove();
                     }          
              }
         }
       });
     }
}
function getIntList (id,page,size){
    var fanslist = $("#int-item");
     var isfor = fanslist.data("isfor");
     var page = fanslist.data("page");
     var size = fanslist.data("size");
     if (!isfor) {
       fanslist.data("isfor",true);
       Net.getIntList(id,page,size,function(result){
         console.log(result)
         fanslist.data("isfor",false);
         if (result.length > 0) {
           fanslist.handlebars($("#int-tmp"),result,true);
           fanslist.data("page",page + 1);
           $('.info').each(function(){
		               	var label= $(this).attr('label');
		               	if(label=="true"){
		               		$(this).find('.label').removeClass('hidden');
		               	}else{
		               		$(this).find('.label').addClass('hidden');
		               	}	               	
	       })
             for(var n=0;n<$(".fans-item").length;n++){
                  var infoid=$(".fans-item").eq(n).find(".info").data("id");
                  if(infoid==FCWM_USER_ID){
                        $(".fans-item").eq(n).find(".fun").remove();
                        $(".fans-item").eq(n).find("em").remove();
                     }          
              }
         }
       });
     }
     
}
function unInterest(id,self){
  Net.deleteUsersInterest(id,function(result){
      self.hide();
      self.prev(".interest").show();
  });
}
function interest (id,self){
  Net.postUsersInterest(id,function(result){
      self.hide();
      self.next(".uninterest").show();
  });
}
function getIsfan(id){
  Net.getUsersInterestIsfan(id,function(result){
    if (result) {
      $(".interest").hide();
      $(".uninterest").show();
    } else {
      $(".uninterest").hide();
      $(".interest").show();
    }
  });
}

$(function(){
        //瀑布流
    if($(".fans").css("display")=="block"){
      $(".panel").on('scroll', function (e) {
           if ($(this).scrollTop() + $(this).height() > $(this).height() - 10) {
               getFansList(id);
           }
      });            
    }
    if($(".ifans").css("display")=="block"){
      $(".panel").on('scroll', function (e) {
           if ($(this).scrollTop() + $(this).height() > $(this).height() - 10) {
               getIntList(id);
           }
      });            
    }
    getFansList(id);
  //粉丝列表按钮
    $(".fans,.ifans").on("click",".info",function(){
        var id= $(this).data("id");
        getIsfan(id);
        $("#fans-item,#int-item").find(".fun").stop().slideUp(300);
        $(this).next().stop().slideToggle(300);
    });
    $(".fans,.ifans").on("click",".interest",function(){
        var self = $(this);
        var id= $(this).data("id");
        interest(id,self);
    });
    $(".fans,.ifans").on("click",".uninterest",function(){
        var self = $(this);
        var id= $(this).data("id");
        unInterest(id,self);
    });
	$('.fan').on("click",function(){
		$('.ifans').addClass('hidden');
		$('.fans').removeClass('hidden');
		$(this).addClass('line');
        $(this).siblings().removeClass('line');
        $(".fans-item").remove();
        $("#fans-item").data("page","0");
        getFansList(id);
	})
	$('.att').on("click",function(){
		$('.fans').addClass('hidden');
		$('.ifans').removeClass('hidden');
		$(this).addClass('line');
        $(this).siblings().removeClass('line');
        $(".fans-item").remove();
        $("#int-item").data("page","0");
        getIntList(id);
	})
})
