var image_url=''; 
function getUserAlbum (){
  Net.getUserAlbum(function(result){
    $("#album").handlebars($("#album-tmp"),result,true);   
    zoomImg();
  });
}
function zoomImg () {
   $(".img-item:not(:first)").unbind().bind("click",function(){
     var imgUrl= $(this).find(".img-pic-real").css("background-image");
      $(this).addClass("deleteImg");
    $(".viewpic").stop().fadeIn();
    $(".imgbox").css("background-image",imgUrl);
    });
}
function saveImg(imgUrl){
  Net.postUsersAlbumNew (imgUrl,function(result){
    $("#album").handlebars($("#album-tmp"),[result],true);
    zoomImg();
  }); 
}
function deletePic(id){
  Net.postUserAlbumDel(id,function(result){
      $(".deleteImg").remove();
  });
}
function fileUpload(base64Img){
        $(".black").show();
        $.ajax({
          url : Api.APP_ADDR + "application/userPicture",
          type : 'post',
　　　　         data : {'base64Img' : base64Img},
　　            success: function(result){
    　　     $(".black").hide();
    　　      result.base64 = null;
            saveImg (result.imgUrl);
    　　　          },
          error: function(){
            console.error("upload error");
            alert("上传图片失败！");        
            $(".black").hide();  
          }
    　　　   });
}
var validateImgType=function(f){
    console.log(f);
    if(!/\.(jpg|jpeg|png|JPG|PNG)$/.test(f))
    {
      alert("图片类型必须是.jpeg,jpg,png中的一种")
      return false;
    }else{
      return true;
    }       
}
$(function(){
	
	
	var fileUploadhead=function(base64Img){
		 $.ajax({
          url : Api.APP_ADDR + "application/userPicture",
          type : 'post',
    　　　　       data : {'base64Img' : base64Img},
    　　                 success: function(result){
    	  console.log(result);
    	  image_url=result.imgUrl;
    	  $('.head>img').attr('src',image_url);
    　　                    $(".black").hide(); 
          result.base64 = null;
    　　　                  },
          error: function(){
           console.error("upload error");
            alert("图片上传失败！");
            $(".black").hide(); 
          }
    　　　   });
	}	
	var photo = $('#photo');
     photo.on('change',function(){
        var f=$('#photo').val();
     	var falgImg=validateImgType(f);
     	if(falgImg){
     		console.log('---successful---');
     		$('.black').show();
     	 // 也可以传入图片路径：lrz('../demo.jpg', ...     	 
        lrz(this.files[0], {
            width:300,           
            // 压缩开始
            before: function() {
                console.log('压缩开始');
            },
            // 压缩失败
            fail: function(err) {
                console.error(err);
            },
            // 压缩结束（不论成功失败）
            always: function() {
                console.log('压缩结束');
            },
            // 压缩成功
            done: function (results) {
              // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
              console.log(results); 
              fileUploadhead(results.base64);
            }
        });
     	}	
     	
     })
})

$(function(){
    getUserAlbum();
    $("#file").on("change",function(e){
        var f=$('#file').val();
        var flagImg=validateImgType(f);
        if(flagImg){
            $('.black').show();
            // 也可以传入图片路径：lrz('../demo.jpg', ...
        lrz(this.files[0], {
            // 压缩开始
            width:500,     
            before: function() {
                console.log('压缩开始');
            },
            // 压缩失败
            fail: function(err) {
                console.error(err);
                alert("请选择正确的图片");
            },
            // 压缩结束（不论成功失败）
            always: function() {
                console.log('压缩结束');
            },
            // 压缩成功
            done: function (results) {
              // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
              console.log(results); 
              fileUpload(results.base64);
            }
        });
      }       
    }); 
    $(".add-photo").click(function() {
            $("#file").click();              
      });
    $(".delete").unbind().bind("click",function(){

        $(".delinfo").stop().fadeIn();
        event.stopPropagation();
        
    });
    $(".delinfo").unbind().bind("click",function(){
        event.stopPropagation();
        });
    
    $(".on").unbind().bind("click",function(){
        var id = $(".deleteImg").find(".img-pic-real").attr("data-id");
        deletePic(id);
        $(".deleteImg").remove();
        $(".viewpic").stop().fadeOut();
        $(".delinfo").stop().fadeOut();
    });
    $(".off").unbind().bind("click",function(){
        $(".delinfo").stop().fadeOut();
    });
    $(".viewpic").bind("click",function(){
        $(".imgbox").css("background-image","");
        $(this).stop().fadeOut();
        $(".deleteImg").removeClass("deleteImg");

    });
  　  function getArea(){
  		var lat=$(".country").data("lat");
  		var lng=$(".country").data("lng");
      	Net.getUsersNation(lat,lng,function(result){
	      	var area= result;
	      	console.log(area);
	      	if(!area["city"]){
	      		var area=(area["country"]+"，"+area["province"]).replace(/\"/g, "");	
	      	}
	      	else{
	      		var area=(area["country"]+"，"+area["province"]+"，"+area["city"]).replace(/\"/g, "");
	      	}
	      	
	      	$("#nation").text(area);
	      });
	}
	//tem插件	
  var width = window.screen.width;
  var  height=document.body.clientHeight;
  $('body').css('height',height);
  $('.transIcon').css('width', width);
  $('#file').css('width',width);
  //点击控制
$("section").bind("click", function() {
   	 $(this).find('.hidden').removeClass('hidden');
   	 $(this).find('p').addClass('hidden');
});
$(".country").unbind().bind("click",function(){
	$(".country").unbind();
	$(this).find('.hidden').removeClass('hidden');
	$(this).find('p').addClass('hidden');
//	$("#nation").text()=$(".nationtxt").val();
  });

  var userInfo={};
  var mms;
  var constellationId;
 //国籍 
 Net.getUserProfile(function(result) { 
      console.log(result);
      name = result.name;
      age = result.birthday;
      age=new Date(age).Format("yyyy-MM-dd");
      sex=result.sex;    
      startflag=result.constellation;
      address=result.address;     

      if(startflag!=null){
      	 constellation = result.constellation.name;
      	 constellationId=result.constellation.id;
      }else{
      	 constellation='';
      }           
      career = result.career;
      idiograph = result.idiograph;
      search_id = result.search_id;
      oldImageUrl=result.head_image;
     $('.nametxt').val(name);    
	 $('.agetxt').val(age);
	 $('.jobtxt').val(career);
	 $('.signtxt').val(idiograph);
		 
	//View Data Performance
	  $('.head>img').attr('src',oldImageUrl);	  
      $('#userId').text(search_id);
      if(sex==null){
//    	$('#gender').text(1);
      }else if(sex==0){
      	$('#gender').text("男");
      }else{
      	$('#gender').text("女");
      }      
      $('#name').text(name);
      $('#age').text(age);
      $('#constellation').text(constellation);
      $('#career').text(career);
      $('#nation').text(address);
      $('#signtxt').text(idiograph);      
    });
    
    
    
    //提交submit info
       $(".subRight>p").click(function() {
      		var mms=$('#sec01').val();
      	    var uname=$('.nametxt').val();
         	var uage=$('.agetxt').val();
         	var guest=$('#sec04').val();
         	var ucareer=$('.jobtxt').val();
         	var uconstellation=$('.constellationtxt').val();
	       	var address=$('.nationtxt').val();
				if(address=="")
				{
					var address=$('#nation').text();
				}
				else{
					var address=$('.nationtxt').val();
				}


         	var uidiograph=$('.signtxt').val();
         	var uusex=$("#sec00").val();

         	if(uname==''){
         		userInfo.name='';
         	}else{
         		userInfo.name=uname;
         	}
            if(guest==1){
                userInfo.is_verified=false;
            }
            else{
                userInfo.is_verified=true;
            }
            console.log(userInfo.is_verified)
         	if(uusex==2){
         		userInfo.sex=sex;
         	}else{
         		
         		userInfo.sex=uusex;
         	}
         	if(uage==''){
         		userInfo.birthday=age;
         	}else{
         		userInfo.birthday=uage;
         	} if(ucareer==''){
         		userInfo.career=career;
         	}else{
         		userInfo.career=ucareer;
         	} 
         	if(uidiograph==''){
         		userInfo.idiograph=idiograph;
         	}else{
         		userInfo.idiograph=uidiograph;
         	}
         	console.log(mms);
         	userInfo.constellation_id = mms;
         	userInfo.address=address; 
         	console.log(image_url);
         	if(image_url==''){
         		userInfo.head_image=oldImageUrl;
         	}else{
         		userInfo.head_image=image_url;
         	}

         	// 设置个性签名字数限制         	 

         	var validate=function(){
         	 	var nameNum=$('.nametxt').val().length;
         	 	var jobNum=$('.jobtxt').val().length; 
         	 	var addNum=$('.nationtxt').val().length;
         	 	var fixNum =  $('.signtxt').val().lengthB();
         	 	var uage=$('.agetxt').val();
         		uage=new Date(uage).getTime();
         		var now=new Date().getTime();
         		console.log(nameNum);
         	 	if(uage>now){
         	 		alert("生日应小于当前日期！");
         	 		return false;
         	 	}
         	 	if(nameNum>15){
         	 		alert("姓名请输入15个字以内！");
         	 		return false;
         	 	}
         	 	if(nameNum<=0){
                    alert("姓名不能为空！");
                    return false;
                }
				if(addNum>20){
		        	alert("地区请输入20字以内！");
		        	return false;
		        }
         	 	if(jobNum>10){
         	 		alert("职业请输入在10个字以内！");
         	 		return false;
         	 	}
		        if(fixNum>48){
		        	alert("个性签名请输入24字以内！");
		        	return false;
		        }
		        else{
			        	return true;
			        }
         	 	
         	 }
         	 var falg=validate();
         	 if(falg){
         	     data=userInfo;
         	 	 Net.ModifyUsersInfo(data,function(result){
                    window.location.href = "member.html";
               },function(e){
                   alert("请输入正确的姓名格式!");
               });
         	 }

    });
});

