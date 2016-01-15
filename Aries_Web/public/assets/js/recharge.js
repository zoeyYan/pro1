var money={};
function postMoney (data) {

	Net.postMoney(data,function(result){
		console.log(result);
		alert("充值成功");
		history.go(-1);
	});
}
function getMoney (){
  Net.getMoney (function(result){
  	console.log(result);
  	$(".have").text(result.money);
  }); 
}
$(function(){
	getMoney();
	var parmas = parseUrlParam(window.location.href);
	userId = parmas.id;
	$(".charge").on("click",function(){
		var money=$(".charge").data("charge");
		postMoney(money);
	});
	$("p:not(:first)").on("click",function(){
		var value = $(this).data("value");
		$(".charge").attr("data-charge",value);
	  	$(this).siblings().find(".chose").remove();
	  	$(this).append("<span class='chose'></span>");
	  });
})
