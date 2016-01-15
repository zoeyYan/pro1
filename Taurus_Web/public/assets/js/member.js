var parmas = parseUrlParam(window.location.href);
var acoundId=parmas.id;
//计算年龄
function  ages(str)   
  {   
        var   r   =   str.match(/^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/);     
        if(r==null)return   false;     
        var   d=   new   Date(r[1],   r[3]-1,   r[4]);     
        if   (d.getFullYear()==r[1]&&(d.getMonth()+1)==r[3]&&d.getDate()==r[4])   
        {   
              var   Y   =   new   Date().getFullYear();   
              return((Y-r[1]));   
        }   
        return("输入的日期格式错误！");   
  }   
var main={
	changeFoucus:function(){
		Net.getUsersInterestIsfan(acoundId,function(result){
			 if(result){
			 	$('.isFocus').show();
			 	$('.noFocus').hide();			 	
			 }else{
			 	$('.isFocus').hide();
			 	$('.noFocus').show();
			 }
		});
			$('.noFocus').click(function(){
				main.interst();
				
			});
      $(".isFocus").click(function(){
      	main.uninterst();
      	
      });
	},
	self:function(){
		 $('.prefer').bind('click',function(){
		 			window.location.href='prefer.html?acountId='+acoundId;
		 });
		 $('.recommand').bind('click',function(){
		 			window.location.href='recommend.html?status=0'+"&id="+acoundId;
		 });
	},
	getInfo:function(){
		Net.getOthersInfo(acoundId,function(result){
			console.log(result);
			var head_image=result.head_image;
			var head_imgbase64=result.head_imgbase64;
			var age=result.birthday;
			var sex=result.sex;
			var showId=result.is_verified;
			if(showId){
				$('.vLabel').show();
				$('.name').addClass('floatLeft');
			}else{
				$('.vLabel').hide();
				$('.name').removeClass('floatLeft');
			}
			age=new Date(age).Format("yyyy-MM-dd");
			age=ages(age);	
			if(head_image==null||head_image==""){
				$('.headLeft').css("background-image","url(assets/image/setting/default-avatar.jpg)");
			}
			else{
					$('.headLeft').css("background-image","url("+result.head_image+")");
			}
			if(age==null){
				$('.age').hide();
			}else{
				$('.age').text(age+"岁");
			}
			if(sex==null){
				$('.sex').hide();
			}else if(sex==0){
				$('.sex').text("男,");
			}else{
				$('.sex').text("女,");
			}
			$('.name').text(result.name);
			$('.id').text(result.search_id);
		});
			Net.getOthersInterst(acoundId,function(result){
				$('.focus').text(result.rId);
				$('.fans').text(result.eId);
			});
		
	},
	interst:function(){
		Net.postUsersInterest(acoundId,function(result){
			$('.noFocus').hide();
			$('.isFocus').show();
			var fansNum=$('.fans').text();
			$('.fans').text(+fansNum+1);
		});
	},
	uninterst:function(){
		Net.deleteUsersInterest(acoundId,function(){
			 $(".noFocus").show();
			 $('.isFocus').hide();
			 var fansNum=$('.fans').text();
			 $('.fans').text(+fansNum-1);
		});
	},
	allIncome:function(){
		Net.getUserRecommandRecord(acoundId,function(result){
			if(result.length>0){
				 var result=result[0].total;
				  if(result<0){
				 	  $('.allRate').addClass('bColor');
					 }else{
					 	  $('.addRate').removeClass('bColor');
					 }
				 $('.allRate').text(result+"%");
			}else{
				 $('.allRate').text("0%");
			}
			
		})
	},
	myScore:function(){
		 Net.getMyScore(acoundId,function(result){
		 	 if(result!==""||result!==null){
		 	 	 $('.score').text(result.point);
		 	 }else{
		 	 	 $('.score').text("0");
		 	 }
		 });
	},
	init:function(){
		this.changeFoucus();
		this.self();
		this.getInfo();
		this.allIncome();
		this.myScore();
	}
};
$(function(){
	main.init();
	$('.topic').bind('click',function(){
		window.location.href='publish.html?status=0&id='+acoundId;
	});
	$('.circle').bind("click",function(){
		window.location.href="mygroup.html?id="+acoundId;
	})
	
})
