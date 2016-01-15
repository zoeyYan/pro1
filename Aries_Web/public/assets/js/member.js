var sex;
var falg=false;
var age;
var parmas = parseUrlParam(window.location.href);
function getMyArticle(){
  var page = 0;
  var size = 100;
    Net.getMyArticle(FCWM_USER_ID,page,size,function(result){
        console.log(result[0]);
        $.each(result,function(i) {
            if(result[i].is_new_comments==true){
                $("#new").show();
            }
        });
    });
}
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

var validateImgType=function(){
	    var f=document.getElementById('file').value;
	    console.log(f);
	    if(!/\.(jpg|jpeg|png|JPG|PNG)$/.test(f))
        {
          alert("图片类型必须是.jpeg,jpg,png中的一种")
          return false;
        }else{
          return true;
        }	    
	}
var member = {
    getUserProfile :　function(){
      Net.getUserProfile(function(result){
        var parmas = parseUrlParam(window.location.href);
        var id = parmas.id;
        falg=true;
        sex=result.sex;
        console.log(result);
        $(".fanslink").attr("href","fanslist.html?id="+result.id.accountId+"&status=0");
        $(".intlink").attr("href","fanslist.html?id="+result.id.accountId+"&status=1");
        $("#header").handlebars($("#header-tmp"),result,true);
         age=result.birthday;       
         age=new Date(age).Format("yyyy-MM-dd");
         age=ages(age);
        var mms=result.constellation;
        if(sex==null){
          $(".sex").hide();
        }else if(sex==1){
          $(".sex").attr('src','assets/images/setting/woman.png');
        }else if(sex==0){
          $('.sex').attr('src','assets/images/setting/man.png');
        }
        if(mms==null){
          $('.mms').hide();
        }
        if(age==null){ 
           $('.ageHide').hide();
        }else{
          $('.realAge').text(age);	
        }
        $(".add-photo").show();
        var selfInfo = $.trim($("#selfInfo").html());
        if (!selfInfo) {
          $("#selfInfo").html("个人信息未填写");
        }
        var label=$('.p-code').attr('label');
        console.log(label);
        $("#setting").attr("href","setting.html");

        var baseWidth=320;
		var width=window.screen.width;
		var strWidth=width-baseWidth;
		console.log(strWidth);
		if(strWidth>0)
		{
			$(".p-name").css('width','170px');
		}else{
		   $(".p-name").css('width','158px');			
		}
        //------
        if(label=="true"){
        	$(".label").removeClass('hidden');
        }else{
            $('.label').addClass('hidden');
        }

		
        //进入聊天室
        $("#chat").click(function(e){
          window.location.href = "chat.html?id=" + result.id.accountId;
        });
        //充值
        $("#gold").click(function(e){
          window.location.href = "recharge.html?id=" + result.id.accountId;
      	});

      });
    },
    getUserAlbum :　function(){
      Net.getUserAlbum(function(result){
        $("#album").handlebars($("#album-tmp"),result,true);   
        zoomImg();
      });
    },
    getUsersInterest :　function(){
      Net.getUsersInterest(function(result){
        $("#eId").html(result.eId);
        $("#rId").html(result.rId);
      });
    },
    getSignNum:function(id){
        Net.getSignNum(id,function(result){  
            $("#rCl").html(result.sign_charm);
        });
    },
    getUserProfileById :　function(id){
      Net.getUserProfileById(id,function(result){      	
      	$('.nav-btn>p').removeClass('addColor');
        console.log(result);
         sex=result.sex;
         age=result.birthday;       
         age=new Date(age).Format("yyyy-MM-dd");
         age=ages(age);
         console.log(age);
        var mms=result.constellation;     
        $("#header").handlebars($("#header-tmp"),result);
        var selfInfo = $.trim($("#selfInfo").html());        
        $('.send-btn').click(function(){
          	window.location.href='chat.html?id='+ result.id.accountId+'&status='+0;
  		});
  		
        if(sex==null){
          $(".sex").hide();
        }else if(sex==1){
          $(".sex").attr('src','assets/images/setting/woman.png');
        }else if(sex==0){
          $('.sex').attr('src','assets/images/setting/man.png');
        }
        
        if (!selfInfo) {
          $("#selfInfo").html("个人信息未填写");
        }
        if(mms==null){
          $('.mms').hide();
        }
        if(age==null){ 
           $('.ageHide').hide();
        }else{
           $('.realAge').text(age); 	
        }
        var baseWidth=320;
		var width=window.screen.width;
		var strWidth=width-baseWidth;
		console.log(strWidth);
		if(strWidth>0)
		{
			$(".p-name").css('width','170px');
		}else{
		   $(".p-name").css('width','158px');			
		}
        
        var label=$('.p-code').attr('label');
        console.log(label);
//      label=false;
//     label="true";
        if(label=="true"){
        	$(".label").removeClass('hidden');
        }else{
            $('.label').addClass('hidden');
        }
        member.getIsfan(id);

        //进入聊天室
        $("#chat").click(function(e){
          window.location.href = "chat.html?id=" + result.id.accountId;
        });

      });
    },
    getUserAlbumById :　function(id){
      Net.getUserAlbumById(id,function(result){
        if (result.length == 0) {
          $("#default-photo").show();
        }
        $("#album").handlebars($("#album-tmp"),result,true);
        zoomImg();
      });
    },
    getUsersInterestById :　function(id){
      Net.getUsersInterestById(id,function(result){
      	
        console.log(result);
//      falg=true;
        $("#eId").html(result.eId);
        $("#rId").html(result.rId);
      });
    },
    
    interest :　function(id){
      Net.postUsersInterest(id,function(result){
        $(".focus-btn").hide();
        $(".un-focus-btn").show();
      });
    },
    
    unInterest :　function(id){
      Net.deleteUsersInterest(id,function(result){
        $(".focus-btn").show();
        $(".un-focus-btn").hide();
      });
    },
    
    deletePic :　function(id){
      Net.postUserAlbumDel(id,function(result){
          $(".deleteImg").remove();
      });
    },
    
    getChatroomPeoplenum :　function(roomId){
      Net.getChatroomPeoplenum(roomId,function(result){
        $("#chat-count").html(result || 0);
      });
    },
    
    getIsfan : function(id){
      Net.getUsersInterestIsfan(id,function(result){
      	$('.send-btn').show();
        if (result) {
          $(".un-focus-btn").show();
        } else {
          $(".focus-btn").show();
        }
      });
    },
    
    fileUpload : function(base64Img){
        $(".black").show();
        $.ajax({
          url : Api.APP_ADDR + "application/userPicture",
          type : 'post',
　　　　         data : {'base64Img' : base64Img},
　　         	  success: function(result){
    　　	 $(".black").hide();
    　　	    result.base64 = null;
            member.saveImg (result.imgUrl);
//          zoomImg();       
    　　　          },
          error: function(){
            console.error("upload error");
            alert("上传图片失败！");        
            $(".black").hide();  
          }
    　　　   });
    },
    
    saveImg : function(imgUrl){
      Net.postUsersAlbumNew (imgUrl,function(result){
        $("#album").handlebars($("#album-tmp"),[result],true);
        zoomImg();
      }); 
    },
    getMoney : function(){
      Net.getMoney (function(result){
      	console.log(result);
      	$("#gold-count").text(result.money);
      }); 
    },
    getGift : function(id){
      var parmas = parseUrlParam(window.location.href);
      var userId = parmas.id;
      if(userId){
      	Net.getGift (userId,function(result){
	      	$("#gift-list").handlebars($("#gift-tmp"),result);
	      });
      }
      else
      {
      	  Net.getGift (FCWM_USER_ID,function(result){
	      	$("#gift-list").handlebars($("#gift-tmp"),result);
	      });
      }
 
    },
    getCharm : function(id){
      var parmas = parseUrlParam(window.location.href);
      var userId = parmas.id;
      if(userId){
        Net.getCharm (userId,function(result){
            if(result){
                $("#rMl").text(result);  
            }
            else{
                $("#rMl").text(0);
            }
          });
      }
      else
      {
          Net.getCharm (FCWM_USER_ID,function(result){
            if(result){
                $("#rMl").text(result);  
            }
            else{
                $("#rMl").text(0);
            }
          });
      }
 
    },
	getHonorById	:	function (id) {
      var parmas = parseUrlParam(window.location.href);
      var userId = parmas.id;
      if(userId){
      	Net.getHonorById (userId,function(result){
      	    console.log(result)
	      	$("#honor-list").handlebars($("#honor-tmp"),result);
	      });
      }
      else
      {
      	  Net.getHonorById (FCWM_USER_ID,function(result){
      	      console.log(result)
	      	$("#honor-list").handlebars($("#honor-tmp"),result);
	      });
      }
	},
    init : function(id){
        member.getCharm(id);
        member.getSignNum(id);
      if (id != FCWM_USER_ID) {
        member.getUserProfileById(id);  
        member.getUsersInterestById(id); 
        $("#chat-title").html("和Ta聊天");
        $(".myalbum").html("Ta的相册");
        $(".mygifts").html("Ta的礼物");
        $(".myhonor").html("Ta的荣誉");
        $(".mygroup").html("Ta加入的圈子");
        $(".myart").html("Ta发表的话题");
        $(".mygov").html("Ta的收藏");
        $("#gold,#save").hide();
        $("#new").hide();
        $("#chat").css({"margin-bottom":"1rem","border-bottom":"1px solid #eaeaea"});
      } else {
        member.getUserProfile();  
        member.getUsersInterest();  
        $("#chat-title").html("我的聊天室");
      } 
      //tab
        $("#theme").click(function(e){
          window.location.href = "hotgroup.html?user="+parmas.id;
        });
        //文章
        $("#atricle").click(function(e){
          window.location.href = "mytheme.html?id=1&user="+parmas.id;
        });
        $("#save").click(function(e){
          window.location.href = "mytheme.html?id=2";
        });
        $("#albums").click(function(e){
          window.location.href = "others.html?id="+id+"&status=1";
        });
        $("#gifts").click(function(e){
          window.location.href = "others.html?id="+id+"&status=2";
        });
        $("#charms").click(function(e){
          window.location.href = "others.html?id="+id+"&status=3";
        });	
      member.getChatroomPeoplenum(id || FCWM_USER_ID);
      
      $("#header").on("click",".focus-btn",function(e){
        member.interest(id);
        var eId = $("#eId");
        var count = eId.html();
        eId.html(+count +　1);
      });
      $("#header").on("click",".un-focus-btn",function(e){
        member.unInterest(id);
        var eId = $("#eId");
        var count = eId.html();
        eId.html(+count -　1);
      });
        
      //导航事件
      $(".nav-bar").on("click",".nav-btn",function(e){
         if(falg){
           $('#guestShow').addClass('addColor');
         }else{
           $('#guestShow').removeClass('addColor');
         }        
         
         $(this).siblings().find('p').removeClass('addColor');
         $(this).find('p').addClass('addColor');
         var href = $(this).find('p').attr("href");
         if (href) {
           window.location.href=href;
            $(this).find('p').addClass('addColor');
         }
        var self = $(this);
        var menu = self.find(".menu");
        
        $(".menu").not(menu).removeClass("active");
        $(".nav-btn").not(self).removeClass("active");
        
        if (self.hasClass("active")) {
          $(".fcwm-mask").removeClass('active');
          menu.removeClass("active");
          self.removeClass("active");
        } else {
          $(".fcwm-mask").addClass('active');
          menu.addClass("active");
          self.addClass("active");
        }
      });
      
      $(".fcwm-mask").on("click",function(e){
        $(".fcwm-mask").removeClass('active');
        $(".menu").removeClass("active");
        $(".nav-btn").removeClass("active");
      });
    }
};



$(function(){
	getMyArticle();
  var parmas = parseUrlParam(window.location.href);
  var id = parmas.id;
  var hasProp = false;  
  for (var prop in parmas){  
      hasProp = true;  
  }
  if (!id) {
    if (hasProp) {
        Math.ceil(Math.random()*1000000)
        
      window.location.href = window.location.href + "&id=" + FCWM_USER_ID;
    } else {
      window.location.href = window.location.href + "?id=" + FCWM_USER_ID;
    }
  }
  member.init(id);
	
});

function zoomImg () {
   $(".img-item:not(:first)").unbind().bind("click",function(){
     var imgUrl= $(this).find(".img-pic-real").css("background-image");
      $(this).addClass("deleteImg");
    $(".viewpic").stop().fadeIn();
    $(".imgbox").css("background-image",imgUrl);
    });
}

