function stockList(){
	var words=$(".searchTxt").val();
	wLen=words.length;
	if(wLen>0){
		var list = $(".serContent");
		list.data("page",0);
		var page = list.data("page");
	    var size = list.data("size");
		var isfor = list.data("isfor");		
		if (!isfor) {
			list.data("isfor",true);
			Net.getListStock(words,page,size,function(result){
			    list.data("isfor",false);
			    $('.serContent').scrollTop(0);
				console.log(result);
				$('.serContent').handlebars($("#stock-item"),result,false);
				$('.serStockItem').on('click',function(){
					var name=$(this).find('.sertName').text();
					var num=$(this).find('.sertNum').text();
					console.log(name);
					console.log(num);
					$('.inputArea').val(name+num);
					$('.serStock').slideUp();
					$('.reShow').slideDown();
					$('#stockName').text(name);
					$("#stockNum").text(num);
					
				})
			});
		}	
	}	
}

function stockList2(){
	var words=$(".searchTxt").val();
	wLen=words.length;
	if(wLen>0){
		var list = $(".serContent");
	    var page = list.data("page");
	    var size = list.data("size");
		var isfor = list.data("isfor");
		if (!isfor) {
			list.data("isfor",true);
			Net.getListStock(words,page,size,function(result){
			    list.data("isfor",false);
				console.log(result);
				$('.serContent').handlebars($("#stock-item"),result,true);
				list.data("page",page + 1);
				$('.serStockItem').on('click',function(){
					var name=$(this).find('.sertName').text();
					var num=$(this).find('.sertNum').text();
					console.log(name);
					console.log(num);
					$('.inputArea').val(name+num);
					$('.serStock').slideUp();
					$('.reShow').slideDown();
					$('#stockName').text(name);
					$("#stockNum").text(num);
					
				})
			});
		}	
	}	
}


$(function(){
	$('.searchTxt').on('input',	stockList);	
	$('.serContent').on('scroll',function(){		
    	if ($(this).scrollTop() + $(this).height() > $(this).height() + 10 && $('.serContent').scrollTop()!=0) {
            stockList2();
         }
    });
})
