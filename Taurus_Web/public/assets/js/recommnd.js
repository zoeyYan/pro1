var parmas = parseUrlParam(window.location.href);
var status=parmas.status;
var id=parmas.id;
var STOCK_USER_ID = "";
var myWay={
	getMyStatus:function(){
		Net.getMyRecordToday(STOCK_USER_ID,function(result){
		    console.log(result);
		    var timeJudge=result.timeJudge;
//		    timeJudge=1;
		    if(timeJudge==1){
		    	$('.recommand,.modify').removeClass("chGray");
		    }else{
		    	$('.modify').unbind();
		    	$('.inputArea').unbind();
		    	$('.recommand').unbind();
		    	$('.recommand').addClass("chGray");
		    	$('.modify').addClass('chGray');
		    }
		    var isOn=result.stockRecommend.stock;		    
			if(isOn==null){
				console.log("null");
				$('.recommandStock').show();
			}else{
				var name=result.stockRecommend.stock.stockName;
				var num=result.stockRecommend.stock.id;
				$('.recommandStock').hide();
				$('.showStock').show();
				$('#stockName').text(name);
				$('#stockNum').text(num);
			}
		})
	},
	getOthersStock:function(){
		Net.getMyRecordToday(id,function(result){
			$('.modify').addClass('chGray');
		    console.log(result);
		    var timeJudge=result.timeJudge;
		    if(timeJudge==1){
		    	$('.recommand').removeClass("chGray");
		    }else{
		    	$('.modify').unbind();
		    	$('.inputArea').unbind();
		    	$('.recommand').unbind();
		    	$('.recommand').addClass("chGray");
		    }
		    var isOn=result.stockRecommend.stock;
			if(isOn==null){
				console.log("null");
				$('.nullrecommand').show();
			}else{
				var name=result.stockRecommend.stock.stockName;
				var num=result.stockRecommend.stock.id;
				$('.nullrecommand').hide();
				$('.showStock').show();
				$('#stockName').text(name);
				$('#stockNum').text(num);
			}
		})
	},
	submit:function(){
		if(status!=0){
			$('.recommand').bind('click',function(){
			var len=$('.inputArea').val().length;
			if(len==0){
				$('.tipsInfo').addClass('red');
			}else{
				$('.tipsInfo').removeClass('red');
				$('.recommandStock').hide();
//				$('.showStock').show();
				var num=$('#stockNum').text();
				Net.getMyRecommand(num,function(result){
					console.log(result);
					$('.showStock').show();
			    });
			}
			});		
			$('.modify').bind('click',function(){
				$('.showStock').hide();
				$('.recommandStock').show();			
			});	
		}else{
			$('.recommand').unbind();
			$('.modify').hide();
		}
		
	},
	chose:function(){
		if(status!=0){
			myWay.getMyStatus();
			$('.inputArea').on('click',function(){
				$('.reShow').slideUp();
				$('.serStock').slideDown();
				$('.searchTxt').focus();
				$('.close').bind('click',function(){
					$('.serStock').slideUp();
					$('.reShow').slideDown();
				})
			});
		}else{
			myWay.getOthersStock();
			$('.inputArea').unbind();
		}
	},
	init:function(){
		this.submit();
		this.chose();

	}
}
$(function(){
    Net.getUserProfile(function(result){
         STOCK_USER_ID=result.id.accountId;
         myWay.init();
    });
})
