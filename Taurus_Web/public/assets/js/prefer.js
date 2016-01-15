var parmas = parseUrlParam(window.location.href);
var acountId=parmas.acountId;
//var name=userName;
var myWay={
	self:function(){
//		var height=$('.headContainer').height();
//		$('.headContainer').css('line-height',height+"px");
	},
	item:function(){
		var data={
			"allData":[
			 {"time":"201500102","name":"浦发银行","stockNum":"666666","openPrice":"10.15","closedPrice":"11.12","floatRate":"20.00"},
			 {"time":"201500103","name":"浦发银行","stockNum":"666666","openPrice":"10.15","closedPrice":"11.12","floatRate":"22.00"},
			 {"time":"201500104","name":"浦发银行","stockNum":"666666","openPrice":"10.15","closedPrice":"11.12","floatRate":"19.00"},
			 {"time":"201500105","name":"浦发银行","stockNum":"666666","openPrice":"10.15","closedPrice":"11.12","floatRate":"19.00"},
			 {"time":"201500104","name":"浦发银行","stockNum":"666666","openPrice":"10.15","closedPrice":"11.12","floatRate":"19.00"},
			 {"time":"201500105","name":"浦发银行","stockNum":"666666","openPrice":"10.15","closedPrice":"11.12","floatRate":"19.00"}
			]
		}
		var result=data.allData;
		$(".containner").handlebars($("#article-item"),result,true);
		$('section').each(function(i){
			var flag=i%2;
			if(flag==1){
				$(this).addClass('addColor');
			}			
		});
	},
	getRecordSelf:function(){
		Net.getUserRecommandRecord(acountId,function(result){
			if(result.length==0){
				$('.proceeds').text(0);
				$('.mainUp').text(0);
				$('.mainDown').text(0);
				$('.mainNum').text(0);
				$('.mainIncome').text(0+"%");
			}else{
			var totalLast=result[0].total;
			var up=result[0].up;
			var down=result[0].down;
			var num=result[0].num;
			var averageIncomeLast=result[0].averageIncome;
			if(totalLast<0){
				$('.allBg').addClass('cColor');
			}else{
				$('.allBg').removeClass('cColor');
			}
			$('.proceeds').text(totalLast);
			$('.mainUp').text(up);
			$('.mainDown').text(down);
			$('.mainNum').text(num);
			$('.mainIncome').text(averageIncomeLast+"%");
			var data=result;
			console.log(data);
			$(".containner").handlebars($("#article-item"),result,true);
			$('section').each(function(i){
				var time=$(this).find('.date').attr('crTime');
				var time=parseInt(time);
				var chYear=new Date(time).getFullYear();
				var chMonth=new Date(time).getMonth()+1;
				var chDay=new Date(time).getDate();
				if(chDay<10){
					chDay="0"+chDay;
				}
				if(chMonth<10){
					chMonth="0"+chMonth;
				}
				$(this).find('.date').text(chYear+""+chMonth+""+chDay);
				var flag=i%2;
				if(flag==1){
					$(this).addClass('addColor');
				}			
			});
			$('.priceFloat').each(function(){
				var income=$(this).attr('income');
				if(income<0){
					$(this).addClass('bColor');
				}else{
					$(this).removeClass('.bColor');
				}
			});			
			}
			
		});
		Net.getUserProfileById(acountId,function(res){
			var userName=res.name;
//			alert(userName);
			$('.name').text(userName);
		});
	},
	init:function(){
		this.self();
		this.getRecordSelf();
	}
}
$(function(){
	myWay.init();
	$('.overCover').click(function(){
		$(this).hide();
	});
	$('.reBtn').click(function(){
		$('.overCover').show();
	});
});
