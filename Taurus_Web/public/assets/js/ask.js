var baseHeigt=document.body.clientHeight;
//alert(baseHeigt);
if(baseHeigt<=519){
	$('.people>img').css('width',"70%");
}

var aaa="";
var indexof="";
var score=0;
$(function(){
	//动画动作
//	$('.titleImg').animo( { animation: 'bounce' ,duration : 3},function(){
		$('.ready').show().animo({animation: 'shake',duration : 1});
//	});	
	//重复执行动画
    setInterval("$('.ready').animo({animation: 'shake',duration : 1})",5000);
    $('.ready').bind('click',function(){
   		$('.beginning').hide(function(){
			$('.content').show().animo({ animation: 'bounceIn',duration : 1})	
   		})
    });
	$('.choose').click(function(){
		var inputval=$(this).find("input[type=radio]").val();
		aaa=inputval;
//		alert(inputval);
		var indexone=$(this).parent().index();
		indexof=indexone;
		if(inputval!==""){
			$(this).find('.circle').removeClass('hidden');
			$(this).siblings().find('.circle').addClass('hidden');
			$(this).find('input').attr("checked","checked");
		}
	});	

	$('.result').click(function(){
		if(choosed()){
			$(".selected").next().addClass("selected");
			$(".selected").prev().removeClass("selected");
			score +=parseInt(aaa);
			console.log(score);
			if(indexof==4&&aaa!==""){
				$('.btn').addClass('hidden');
				$('.result').css("opacity",100);
				$('.result').unbind('click');
				$(".selected").next().removeClass("selected");
				if(score>0&&score<=9){
					$('.scoreOne').show();
					$('.result').hide();
					$('.scoreTwo').hide();
					$('.scoreThree').hide();
					effectOne();
				}else if(score<=14&&score>9){
					$('.scoreTwo').show();
					$('.result').hide();
					$('.scoreOne').hide();
					$('.scoreThree').hide();
					effectOne();
				}else if(score<=20&&score>14){
					$('.scoreThree').show();
					$('.scoreTwo').hide();
					$('.scoreOne').hide();
					$('.result').hide();
					effectOne();
				};
			}
		}else{
			$(".selected").addClass("selected");
		}
	})
	//replay
	$('.replay').click(function(){
		window.location.reload();
	});
	$('.sharelink').click(function(){
		$('.sharefriend').show();
	});
	$('.sharefriend').click(function(){
		$(this).hide();
	})
})
function effectOne(){
	$('.personR').show().animo( { animation: 'fadeIn'},function(){
		$('.exponent1').show().css("opacity",100).animo({animation: 'fadeIn'},function(){
			$('.explain').show().css("opacity",100).animo({animation : 'fadeIn'},function(){
				$('.shareBtn').show().css("opacity",100).animo({animation : 'fadeIn'});
			})
		});
	});	
}
//判断是否下一题
function choosed(){
	var choosedval = $(".selected").find("input[type='radio']:checked").length;
//	alert(choosedval);
	if(choosedval == 0){
		alert("答案不能为空哦");
		return false;
	}
	return true;
}
