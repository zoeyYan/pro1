var self_acountId="";
var STOCK_USER_ID="";
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
	getSetting:function(){
		 $('.focusBtn').bind('click',function(){
    	  window.location.href='setting.html';
      });
	},
	getSelfInfo:function(){
		Net.getUserProfile(function(result){
			self_acountId=result.id.accountId;
			STOCK_USER_ID=result.id.accountId;
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
			Net.getOthersInterst(self_acountId,function(result){
				$('.focus').text(result.rId);
				$('.fans').text(result.eId);
			});
			$('.prefer').bind('click',function(){
				window.location.href="prefer.html?acountId="+self_acountId;
			});
			
			main.allIncome();
      main.MyScore();
     
		})
	},
	allIncome:function(){
		Net.getUserRecommandRecord(STOCK_USER_ID,function(result){
			if(result.length>0){
				 var result=result[0].total;
				 $('.allRate').text(result+"%");
				 if(result<0){
				 	  $('.allRate').addClass('bColor');
				 }else{
				 	  $('.addRate').removeClass('bColor');
				 }
			}else{
				 $('.allRate').text("0%");
			}
			
		})
	},
	MyScore:function(){
     Net.getMyScore(STOCK_USER_ID,function(result){
     	  if(result!==null&&result!==""){
     	  	 $('.score').text(result.point);
     	  }else{
     	  	 $('.score').text("0"); 
     	  }
     })
	},
	init:function(){
		this.getSelfInfo();
		this.getSetting();
	}
};
$(function(){
    main.init();
    $('.topic').bind('click',function(){
			window.location.href='publish.html?id='+STOCK_USER_ID;
		});
		$(".circle").bind('click',function(){
			window.location.href="mygroup.html?mId="+STOCK_USER_ID;
		})
		$('.fansBtn').click(function(){
      	window.location.href="fanslist.html?id="+STOCK_USER_ID+"&path=0";
    });
    $('.foucusBtn').click(function(){
      	window.location.href="fanslist.html?id="+STOCK_USER_ID+"&path=1";
    });
});
