var parmas = parseUrlParam(window.location.href);

function getEnterTheme (){
    var id=parmas.themeid;
    var list = $(".container");
    var page = list.data("page");
    var size = list.data("size");
    var isfor = list.data("isfor");
    if (!isfor) {
       list.data("isfor",true);
        Net.getEnterTheme(id,page,size,function(result){
            result=result.rows;
            list.data("isfor",false);
            if (result.length > 0) {
                $(".container").handlebars($("#article-tmp"),result,true);
                l=parseInt($(".content").css("width"))/3;
                $(".image-view3>.img-item").css("height",l)
                list.data("page",page + 1);
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
            }
        });

    }
}
function getInOrNot (){
    var id=parmas.themeid;
    Net.getInOrNot(id,function(result){
        console.log(result)
        isfor=$(".headerimg").data("isfor");
        if(!isfor){
            /*微信title start*/
            var $body = $('body');
            document.title = result.themeName;
            /*微信title end*/
            $(".homename").html(result.themeName);
            if(result.themeImageBase64){
                $("#blurImg").attr("src","data:image/jpg;base64,"+result.themeImageBase64);
            }
            else{
                $("#blurImg").attr("src",result.themeImage);
            }
            $(".head-portrait").css("background-image","url("+result.themeImage+")");
            $("header").attr("data-isfor","true");
            $("footer").attr("data-hot",result.hotPeople);
            if((result.hotPeople!==FCWM_USER_ID)&&result.hotPeople){
                $(".new").addClass("cur");
                $(".footer-cover").show();
            }
            else{
                if((result.hotPeople==FCWM_USER_ID)&&result.hotPeople){
                    postJoinTheme();
                    $(".add").hide();
                }
            }
        }
        if(result.inOrNot){
            $(".add").addClass("cur");
        }
    });
}
function postJoinTheme (){
    var id=parmas.themeid;
    Net.postJoinTheme(id,function(result){
        getInOrNot ();
        $(".add").addClass("cur");
    });
}
function postExitTheme (){
    var id=parmas.themeid;
    Net.postExitTheme(id,function(result){
        getInOrNot ();
        $(".add").removeClass("cur");
    });
}
function postPostThumb (id,val,self){
    type=0;
  Net.postPostThumb(type,id,val,function(result){
      var count=self.html();
      self.html(+count+1);
      console.log(result);
  });
}
$(function(){
    getInOrNot ();
    getEnterTheme();
    $(".container").on('scroll', function (e) {
           if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
               getEnterTheme();
           }
    });

    $(".container").on("click",".like",function(){
        var id=$(this).data("id");
        self=$(this);
        var val="up";
        postPostThumb (id,val,self);
    });
    $(".container").on("click",".unlike",function(){
        var id=$(this).data("id");
        self=$(this);
        var val="down";
        postPostThumb (id,val,self);
    });

//  var notice = [{"notice-txt":"新人报到处","link":"ada"},{"notice-txt":"公告","link":"adc"}]
//  $(".notice").handlebars($("#notice-tmp"),notice,true);

    $(".add").on("click",function(){
        if($(this).hasClass("cur")){
            postExitTheme ();
        }
        else{
            postJoinTheme ();
        }
    });
    $(".newart").bind("click",function(){
        hotid=$(this).data("hot");
        var sure=$(".add").hasClass("cur");
        if(sure){
            if((FCWM_USER_ID!==hotid)&&hotid){
                alert("红人圈只有本人才能发帖哟~");
            }
            else{
                window.location.href="posted.html?status=2&id="+parmas.themeid;
            }
        }
        else
        {
            alert("请加入本圈子再发帖哟~");
        }
    });
})
