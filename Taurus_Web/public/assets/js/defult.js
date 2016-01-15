var a = 0;
var i=0;
$(function(){
	$('.choose').bind('click',function(){
		var self = $(this);
		var inputVal=$(this).find("input[type='radio']:checked").val();
		
		console.log(inputVal);
		if(inputVal!=undefined){
			a += parseInt(inputVal);
			console.log(a);
			$(this).find('.cricle').append("<img src='assets/image/defultActive/right.png' />");
			var lastSit=$(this).parent().parent().index();
			i=lastSit;
			console.log(lastSit);
			if(lastSit<=8){
				setTimeout(function(){
					self.parent().parent().hide();
					self.parent().parent().next().show();
				},1000);
				
			}else{
				$(this).parent().parent().show();
				$(".sHare").show().css("z-index",99999)
			}
		}else if(inputVal==undefined){
			$(this).parent().parent().show();
		}
	})
	
})
