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
				$(window).scrollTop(0);
			    list.data("isfor",false);
				console.log(result);
				$('.serContent').handlebars($("#stock-item"),result,false);
				$('.serStockItem').on('click',function(){
					var name=$(this).find('.sertName').text();
					var num=$(this).find('.sertNum').text();				
					$(".serStock").hide();
					$(".editShow").show();
					var textVal = $("#target_rp").val();
					textVal += "@" + name + "."+num+" ";
					$("#target_rp").val(textVal);
					console.log(name);
					console.log(num);					
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
					$(".serStock").hide();
					$(".editShow").show();
					var textVal = $("#target_rp").val();
					textVal += "@" + name + "."+num+" ";
					$("#target_rp").val(textVal);				
				})
			});
		}	
	}	
}

$(function(){
	$('.stcok').click(function(){
		$('.editShow').slideUp();
		$('.serStock').slideDown();
		$('.searchTxt').focus();
	});
	$('.close').click(function(){
		$('.editShow').slideDown();
		$('.serStock').slideUp();
	})
	
	$('.searchTxt').on('input',	stockList);	
	$(document).on('scroll',function(){	
    	if ($(window).scrollTop() > $(this).height() - $(window).height()- 10 && $(window).scrollTop()!=0) {
            stockList2();
         }
    });
})
