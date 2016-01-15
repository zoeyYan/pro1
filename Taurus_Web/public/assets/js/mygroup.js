var parmas = parseUrlParam(window.location.href);
var mId=parmas.mId;
var ids=parmas.id;
console.log(ids);
var id="";
if(mId){
	id=mId;
}else{
	id=ids;
}

var main={
	getMyTheme:function(){
		Net.getMyTheme(id,0,100,function(result){
			console.log(result);
			 if(result.length>0){
			 	 $('.cirContent').show();
			 	 $(".nothing").hide();
			 	 $(".item").handlebars($("#circle-item"),result,true);
			 }else{
			 	$(".nothing").show();
			 	$('.cirContent').hide();
			 }
			
		})
	},
	init:function(){
		this.getMyTheme();
	},
};
$(function(){
	main.init();
});
