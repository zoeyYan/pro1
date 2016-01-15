var parmas = parseUrlParam(window.location.href);
var articleId=parmas.articleId;
var main={
	getArticleInfo:function(){
		
	},	
	init:function(){
		this.getArticleInfo();
	}
};
$(function(){
	main.init();
	Net.getArticleInfo(articleId,function(result){
			var result=result;
			console.log(result);
			$('article').handlebars($("#article-item"),result,true);
			var time=$('.tips').attr('time');
			time=parseInt(time);
			var year=new Date(time).getFullYear();
			var month=new Date(time).getMonth()+1;
			var day=new Date(time).getDate();
			var minutes=new Date(time).getMinutes();
			var hour=new Date(time).getHours();
			$('.yearDay').text(year+"年"+month+"月"+day+"日");
			$('.minute').text(hour+":"+minutes);
	});
})
