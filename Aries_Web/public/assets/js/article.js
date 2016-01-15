var parmas = parseUrlParam(window.location.href);
console.log(parmas.articleid)
function getArticle () {
    var id = parmas.articleid;
    Net.getArticle(id,function(result){
        var result=[result];
        console.log(result);
        /*微信title start*/
        var $body = $('body');
        document.title = result[0].article_name;
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
        setTimeout(function() {
        $iframe.off('load').remove();
        }, 0)
        }).appendTo($body);
        /*微信title end*/
        $(".article-con").handlebars($("#article-tmp"),result,true);
        $.each($(".article"),function(i){
           self=$(".article").eq(i).find("p.time");
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
        var imgVal=$(".img-item").eq(0).attr("src")
        if(imgVal){
            $(".shareimg").remove();
        }
    },function(){
        alert("对不起，此贴已被删除！正在返回");
        history.go(-1);
    })
}
function postSave (id,val){
  Net.postSave(id,val,function(result){
      console.log(result);
  });
}
function getCom2 (id,se){
    page=0;
    size=30;
  Net.getCom2(id,page,size,function(result){
      if(result.length!==0){
          se.handlebars($("#com2-tmp"),result,true);
      }
  });
}
function postCom2 (){
    com_id = $("#message").attr("data-id");
    commentsL=$(".message").val().length;
    comments_content=replace_em($(".message").val());
    if(comments_content==''){
        alert("评论不能为空哦！");
        $(".black").hide();
    }else{
        if(commentsL>100){
            alert("超过字数限制了哦！");
            $(".black").hide();
        }
        else{
            var data = {"comments":com_id,"content":comments_content};
            console.log(data)
            Net.postCom2(data,function(result){
                console.log(result)
                var result=[result];
                $(".index2").handlebars($("#com2-tmp"),result,true);
                $(".message").val('');
                $(".black").hide();
                $("#message").attr("placeholder","100字以内哦！");
                $("#message").attr("data-id",'');
                $(".index2").removeClass("index2");
                count=$(".comnum").html();
                $(".comnum").html(+count+1);
                $(".black").hide();
                alert("评论成功，积分加+1！");
            });
        }

    }
}
function postCommentNew () {
    article_id = parmas.articleid;
    commentsL=$(".message").val().length;
    comments_content=replace_em($(".message").val());
    if(comments_content==''){
        alert("评论不能为空哦！");
        $(".black").hide();
    }else{
        if(commentsL>100){
            alert("超过字数限制了哦！");
            $(".black").hide();
        }
        else{
            var data = {"article_id":article_id,"content":comments_content}
            Net.postCommentNew(data,function(result){
                var result=[result];
                $(".comment-con").handlebars($("#comment-tmp"),result,true);
                $.each($(".comment-item"),function(i){
                   self=$(".comment-item").eq(i).find("p.com-con");
                   val=self.html();
                   val=replace_str(val);
                   self.html(val);
                });
                $.each($(".comment-item"),function(i){
                   self=$(".comment-item").eq(i).find("p.time");
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
                $(".message").val('');
                count=$(".comnum").html();
                $(".comnum").html(+count+1);
                $(".info:last").append("<div class='newcom'>New</div>")
                $(".black").hide();
                alert("评论成功，积分加+1！");
            });
        }

    }

}

function getComment () {
    var id =parmas.articleid;
    var win = $(".container");
    var list = $(".comment-con");
    var page = win.data("page");
    var size = win.data("size");
    var isfor = win.data("isfor");
    if (!isfor) {
       win.data("isfor",true);
        Net.getComment(id,page,size,function(result){
            console.log(result);
            win.data("isfor",false);
            if (result.length > 0) {
                $(".comment-con").handlebars($("#comment-tmp"),result,true);
                win.data("page",page + 1);
                $.each($(".comment-item"),function(i){
                    se=$(".comment-item").eq(i);
                    id=$(".comment-item").eq(i).data("id");
                    getCom2(id,se)
                });
                $.each($(".comment-item"),function(i){
                   self=$(".comment-item").eq(i).find("p.time");
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
                   $('.index').eq(i).html((i+1)+'楼');
                });
            }
        })
    }
}

function getIsCollected (id){
  Net.getIsCollected(id,function(result){
      $(".fav").addClass("cur");
  });
}
function postPostThumb (type,id,val,self){
  Net.postPostThumb(type,id,val,function(result){
      var count=self.html();
      self.html(+count+1);
      console.log(result);
  });
}
function replace_em(str){
    str = str.replace(/\</g,'&lt;');
    str = str.replace(/\>/g,'&gt;');
    str = str.replace(/\n/g,'<br/>');
    str = str.replace(/\[em_([0-9]*)\]/g,"<img class='faceimg' src='assets/images/face/$1.gif' />");
    return str;
}
function replace_str(val){
    val = val.replace(/\&lt;/g,'<');
    val = val.replace(/\&gt;/g,'>');
    val = val.replace(/\n/g,'<br/>');
    return val;
}
$(function(){
    getArticle();
    getComment();
      $(".container").on('scroll', function (e) {
           if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
               getComment();
           }
      });
    //收藏
    getIsCollected (parmas.articleid);
    $(".container").on("click",".fav",function(){
        id=$(this).data("id");

        if($(this).hasClass("cur")){
            $(this).removeClass("cur");
            val="delete";
            postSave(id,val);
        }else{
            val="add";
            postSave(id,val);
            $(this).addClass("cur");
        }
    });
    $(".container").on("click",".arlike",function(){
        var id=$(this).data("id");
        self=$(this);
        var val="up";
        type=0;
        postPostThumb (type,id,val,self);
    });
    $(".container").on("click",".arunlike",function(){
        var id=$(this).data("id");
        self=$(this);
        var val="down";
        type=0;
        postPostThumb (type,id,val,self);
    });
    $(".container").on("click",".comlike",function(){
        var id=$(this).data("id");
        self=$(this);
        var val="up";
        type=1;
        postPostThumb (type,id,val,self);
    });
    $(".container").on("click",".comunlike",function(){
        var id=$(this).data("id");
        self=$(this);
        var val="down";
        type=1;
        postPostThumb (type,id,val,self);
    });
    $(".comment-con").on("click",".com2com",function(){
        $(this).closest(".recom").prev(".comment-item").addClass("index2");
        val=$(this).data("id");
        name=$(this).data("name")
       $("#message").attr("data-id",val);
       $("#message").attr("placeholder","@"+name);
       event.stopPropagation();
    });
    $(".container").on("click",function(){
        $(".index2").removeClass("index2");
        $("#message").attr("placeholder","100字以内哦！");
        $("#message").attr("data-id",'');
    });
//表情插件
    $('.face').qqFace({
        id : 'facebox', //表情盒子的ID
        assign:'message', //给那个控件赋值
        path:'assets/images/face/'    //表情存放的路径
    });
    $(".msg").on("click",".send",function(){
        $(".black").show();
        var str = $("#message").val();
        val=$(".index2").length;
        if(val==0){
            postCommentNew();
        }
        else
        {
            postCom2();
        }
    });
})
