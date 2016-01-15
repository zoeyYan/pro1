var user_url;
var user_name;
var user_sex;
var user_birth;
var user_address;
var flagchang=false;
var a=false;
var vidateImgType=function(){
		var f=$('.headImg').val();
	    if(!/\.(jpg|jpeg|png|JPG|PNG)$/.test(f))
        {
          setTimeout("alert('图片类型必须是.jpeg,jpg,png中的一种')",1000);         
          return false;
        }else{
          return true;
        }	    
};
var fileUpload=function(base64Img){
		 $.ajax({
          url : Api.APP_ADDR + "application/userPicture",
          type : 'post',
    　　　　	  data :{'base64Img' : base64Img},
    	  success:function(result){
    	  	 $('.black').hide();
    	     user_url=result.imgUrl;
    	     $('.headUrl').css("background-image","url("+user_url+")");
    	  },
    	  error:function(){
    	  	 $('.black').hide();
    	  	console.log("error");
    	  }
    	 });
};	
function getArea(){
      	var lat=$(".areaBtn").data("lat");
  		var lng=$(".areaBtn").data("lng");  	
      	Net.getGeoAddress(lat,lng,function(result){
      		var area=result;
      		console.log(area);
			if(!area["city"]){
	      		var area=(area["country"]+"，"+area["province"]).replace(/\"/g, "");	
	      	}
	      	else{
	      		var area=(area["country"]+"，"+area["province"]+"，"+area["city"]).replace(/\"/g, "");
	      	}
	       $('.showArea').text(area);
	       $('.area').val(area);
	    });
};
var main={
	self:function(){
	    $('section').each(function(){
	    	$(this).bind('click',function(){
	    		$(this).find('.info>p').hide();
	    		$(this).find('.typeIn').show();
	    	});
	    });
	},
	Upload:function(){
	  var pohto=$('.headImg');
	  pohto.on('change',function(){
	  	var flag=vidateImgType();
	  	if(flag){
	  			$('.black').show();
		  		lrz(this.files[0], {
	            width:300,           
	            before: function() {
	                console.log('压缩开始');
	            },
	            fail: function(err) {
	                console.error(err);
	            },
	            always: function() {
	                console.log('压缩结束');
	            },
	            done: function (results) {
	              console.log(results); 
	              fileUpload(results.base64);
	            }
	        });
	  	}	  	 
	  });
	},
	getUserProfile:function(){
		var changefalg=false;
		$('.sex').bind('blur',function(){
			$(this).parent().hide();
			$(this).parent().siblings().show();
			var sex=$('.sex').val();
			if(sex==2){
				
			}else if(sex==0){
				$('#sex').text('男');
			}else{
				$('#sex').text('女');
			}			
		});
		
		$('.birthday').bind('blur',function(){
			var birthd=$(this).val();
			$(this).parent().siblings().show();
			$(this).hide();
			$("#birth").text(birthd);
		});
		
		
		var userInfo={};
		Net.getUserProfile(function(result){
			console.log(result);
			user_name=result.name;			
			user_sex=result.sex;			
			user_url=result.head_image;
			user_birth=result.birthday;
			user_address=result.address;			
			birth=new Date(user_birth).Format("yyyy-MM-dd");
			console.log(user_url);
			if(user_sex==0){
				$('#sex').text("男");
			}else if(user_sex==1){
				$('#sex').text("女");
			}
			if(user_url==null||user_url==""){
				console.log("success");
				$('.headUrl').css("background-image","url(assets/image/setting/default-avatar.jpg)");
			}else{
				$('.headUrl').css("background-image","url("+user_url+")");
			}
			
			$('#ID').text(result.search_id);
			
			$("#name").text(user_name);
			$("#birth").text(birth);
			$('.showArea').text(user_address);
			$('.name').val(user_name);
			$('.birthday').val(birth);
			$('.area').val(user_address);
			$('footer>p').bind('click',function(){
						var cname=$('.name').val();
						var curl=$('.headUrl').css("background-image","url()");
						var csex=$('.sex').val();
						var carea=$('.area').val();
						var cbirth=$('.birthday').val();
						console.log(cname);
						console.log(curl);				
						console.log(carea);
						console.log(cbirth);
						userInfo.head_image=user_url;
						userInfo.name=cname;
						userInfo.address=carea;	
						userInfo.birthday=cbirth;
						if(csex==2){
							userInfo.sex=user_sex;
						}else{
							userInfo.sex=csex;
						}
						console.log(userInfo);
						var cnameLen=cname.length;
						if(cnameLen<16){
							Net.modifyInfo(userInfo,function(result){
						    	console.log(result);
						    	window.location.href='myself.html';
					    	});
						}else{
							alert("您输入的名字过长!")
						}
			})
			
		})
	},
	getAddress:function(){
		$('.areaBtn').bind('click',function(){
			if(confirm("是否定位获取位置")){
				if (navigator.geolocation)
					    {
					    navigator.geolocation.getCurrentPosition(showPosition);
					    	function showPosition(position)
							  {
							  	$(".nationtxt").val("");
							  	var la = parseFloat(position.coords.latitude);
							  	var ln = parseFloat(position.coords.longitude);
				
								var lat=$(".areaBtn").data("lat",la);
						    	var lng=$(".areaBtn").data("lng",ln);
								getArea();
							  }
					    }
				}else{
					$('.areaBtn').unbind();
					$(this).find('.typeIn').show();
				}
		});
	},
	
	init:function(){
		this.getUserProfile();
		this.self();		
		this.Upload();
		this.getAddress();
	}
}


$(function(){
	main.init();	
});
