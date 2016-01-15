var dl = function(id){
    return document.getElementById(id);
};
dl("btn_rp").onclick = function(){
    var con = "请在这里输入话题";
    //转载文字
    dl("target_rp").value += "#"+con+"#";
     var l = dl("target_rp").value.length;
    console.log(l);
//  dl("aaa").css("width","l")
    //创建选择区域	
    if(dl("target_rp").createTextRange){//IE浏览器
        var range = dl("target_rp").createTextRange();
        range.moveEnd("character",-l)         
        //range.moveStart("character",-l)              
        range.moveEnd("character",l-1);
        range.moveStart("character", l-1-con.length);
        range.select();
         dl("target_rp").width(l);
    }else{
        dl("target_rp").setSelectionRange(l-1-con.length,l-1);
        dl("target_rp").focus();
       
    }
};

$(function(){ 
    $('#facemasg_rp').qqFace({ 
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



function vilidata(){
	var targetlength=$('#target_rp').val().length;
	if(targetlength==0){
		alert("内容不能为空");
		return false
	}else if(targetlength>200){
		alert("您输入的内容超过字数限制");
		return false
	}else{
		return true
	}
};
$(function(){
	$('#facemasg_rp').bind('click',function(){
		var str = $("#target_rp").val();
		var newSpan="<span id='changeFace'></span>";
		$('#target_rp').append(newSpan);
		$("#changeFace_rp").append(replace_em(str)); 
	})
	
});
function postCommit(){
 var  comments_content=replace_em($("#target_rp").val());
 var data={};
 data.article_id=articleId;
 data.content=comments_content;
 Net.postCommentNew(data,function(result){
 	var result=[result];
 	$(".commitItem").handlebars($("#comment-tmp"),result,true);
		    $.each($(".commitItem"),function(i){
                   self=$(".commitItem").eq(i).find(".bbsTime");
                   var create = self.data("time");
                   var now = new Date().getTime();
                   time =Math.floor((now - create)/60000) ;
                   if(time<=60){
                       if(time>=0){
                           self.html(time+"分钟前");    
                       }
                       else{
                           self.html("0分钟前");  
                       }
                   }
                   else
                   {
                       if(time<1440){
                           time=Math.floor(time/60)
                           self.html(time+"小时前");
                       }
                       else{
                           time=Math.floor(time/1440)
                           self.html(time+"天前");
                       }
                       
                   }
                   
                });
 	
 });
}
function postCommit2(a){
	 var  comments_content=replace_em($("#target_rp").val());
	 var data={};
	 data.comments=a;
	 data.content=comments_content;
	Net.postCom2(data,function(result){
		console.log(result);
		$.each($(".homeCommit"),function(i){
           self=$(".homeCommit").eq(i).find(".secondCommit");
           val=self.html();
           val=replace_str(val);
           self.html(val);
      });
	});
	 
}

