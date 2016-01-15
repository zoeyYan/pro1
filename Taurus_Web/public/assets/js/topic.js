var dl = function(id){
    return document.getElementById(id);
};
dl("btn").onclick = function(){
    var con = "请在这里输入话题";
    //转载文字
    dl("target_rp").value += "#"+con+"#";
    var l = dl("target_rp").value.length;
    console.log(l);
     var m = dl("target_rp").value;
    console.log(m);
    //创建选择区域	
    if(dl("target_rp").createTextRange){//IE浏览器
        var range = dl("target_rp").createTextRange();
        range.moveEnd("character",-l)         
        range.moveEnd("character",l-1);
        range.moveStart("character", l-1-con.length);
        range.select();
    }else{
        dl("target_rp").setSelectionRange(l-1-con.length,l-1);
        dl("target_rp").focus();
    }
};


$(function(){
	$('#facemasg').bind('click',function(){
		var str = $("#target_rp").val();
		var newSpan="<span id='changeFace'></span>";
		$('#target_rp').append(newSpan);
		$("#changeFace").append(replace_em(str)); 
	});	
})
function vilidata(){
	var titlelength=$('.title').val().length;
	console.log(titlelength);
	var targetlength=$('#target_rp').val().length;
	console.log(targetlength);
	if(titlelength>25){
		alert("您的标题超出了限定的字数");
		return false;
	}else if(titlelength==0){
		alert("请输入标题!");
		return false;
	};
	if(targetlength>200){
		alert('您的内容超出了限定的字数');
		return false;
	}else if(targetlength==0){
		alert('内容不能为空');
		return false;
	}
	else{
		return true;
	}
}



function validateImgType () {//判断图片类型
    var f=$('.img-add').val();
    console.log(f);
    if(!/\.(jpg|jpeg|png|JPG|PNG)$/.test(f))
    {
      alert("图片类型必须是.jpeg,jpg,png中的一种");
      return false;
    }else{
      return true;
    }       
};
function fileUpload(base64Img){//上传图片
    $(".black").show();
    $.ajax({
      url : Api.APP_ADDR + "application/userPicture",
      type : 'post',
　　　　      data : {'base64Img' : base64Img},
　　            success: function(result){
    　　   $(".black").hide();
    　　      result.base64 = null;
            div="<div class='album-item' style='background-image: url("+result.imgUrl+");'><i class='del'></i></div>";
            $(".album").prepend(div);
    　　　       },
          error: function(){
            console.error("upload error");
            setTimeout(function(){alert("上传图片失败！");},500);
            $(".black").hide();  
        }
    　  });
};
$(function(){
	//图片类型匹配后压缩图片
	$('.img-add').on("change",function(){
		if($(".album .album-item").length<9){
            var falgImg=validateImgType();
            if(falgImg){
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
       }else{
       			setTimeout(function(){alert("对不起，最多只能上传9张哦！");},500);
       };
	});
	$(".album").on("click",".del",function(){
          $(this).closest(".album-item").remove();
    });
});

function postTopic(){
		var article_name=$('.title').val();
		var content=replace_em($("#target_rp").val());;
		console.log(content);
		var image_url=[];
		var image_number=$(".album .album-item").length;
		 for(i=1;i<=8;i++){
	            imgurl=$(".album .album-item").eq(i-1).css("background-image");
	            console.log(imgurl);
	            if(imgurl){
	                  imgurl =imgurl.slice(4,-1);
	                  image_url[i]=imgurl;
	            }
	            else
	            {
	                image_url[i]=null;
	            }
          }
          var data={"article_name":article_name,"content":content,"image_number":image_number,"image_url1":image_url[1],"image_url2":image_url[2],"image_url3":image_url[3],"image_url4":image_url[4],"image_url5":image_url[5],"image_url6":image_url[6],"image_url7":image_url[7],"image_url8":image_url[8],"image_url9":image_url[9]};
          var textVal = $("#target_rp").val();
          var substr = textVal.match(/\.=?(\S*) /g);
		  var num = [];
		  var allTheme="";
		   if(substr!=null){
		   	  $.each(substr,function(){
				num.push(this.substr(1,this.length-2));
			  });
			  allTheme=num.join(".");
		   }else{
		   	  allTheme="stockDefault";
		   }
			
           Net.postArticleNew(allTheme,data,function(result){
	          	alert("发帖成功!");
	          	$(".black").hide();
	          	console.log(result);
	          	window.location.href="bbs.html";
          	  });
         
          
}

$(function(){
	$('.sendBtn').click(function(){
		var falg=false;
		falg=vilidata();
		console.log(falg)
		if(falg){
		   $(".black").show();	
           postTopic();

		}else{
			$(".black").hide();
		};
		
	})
})
 $(function(){ 
    $('#facemasg').qqFace({ 
    	id : 'facebox', //表情盒子的ID
        assign:'target_rp', //给输入框赋值 
        path: 'assets/image/face/'    //表情图片存放的路径 
    }); 
});
function replace_em(str){
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    str = str.replace(/\n/g,'<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g,"<img class='faceimg' src='assets/image/face/$1.gif' />");
    return str;
}
function replace_str(val){
    val = val.replace(/\&lt;/g,'<');
    val = val.replace(/\&gt;/g,'>');
    val = val.replace(/\n/g,'<br/>');
    return val;
}
