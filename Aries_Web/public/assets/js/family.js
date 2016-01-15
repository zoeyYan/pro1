function gettop () {
    var list = $(".container");
        Net.getTop(function(result){
            console.log(result);
            if (result.length > 0) {
                $(".container").handlebars($("#article-tmp"),result,true);
                l=parseInt($(".content").css("width"))/3;
                $(".image-view3>.img-item").css("height",l)
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
            getPlazaArticle ();
        })
}
function getPlazaArticle () {
    var list = $(".container");
    var page = list.data("page");
    var size = list.data("size");
    var isfor = list.data("isfor");
    if (!isfor) {
       list.data("isfor",true);
        Net.getPlazaArticle(page,size,function(result){
            console.log(result);
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


        })
    }
}

function getMyTheme (){
  var page = 0;
  var size = 5;
  Net.getMyTheme(FCWM_USER_ID,page,size,function(result){
      if(result.length>0){
          window.location.href="posted.html?status=1";
      }
      else
      {
          alert("请先加入圈子才能发帖哦！")
      }
  });
}
function getMyArticle(){
  var page = 0;
  var size = 100;
    Net.getMyArticle(FCWM_USER_ID,page,size,function(result){
        $.each(result,function(i) {
            if(result[i].is_new_comments==true){
                $("#new").show();
            }
        });
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
function postJoinTheme (){
    var id="ca77eacd-9a56-4344-a52a-14eb86f5a728";
    Net.postJoinTheme(id,function(result){
    });
}
function getSign (){
  Net.getSign(function(result){
      console.log(result);
      if(result){
        swal({   title: "签到成功",   text: "积分+1", confirmButtonColor: "#9100ba", showConfirmButton: false,  imageUrl: "assets/images/family/icon-crown.png",timer:1500 });
        postJoinTheme();
      }
  });
}
$(function(){
    getSign ();
    gettop();
    getMyArticle();
      $(".container").on('scroll', function (e) {
           if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
               getPlazaArticle();
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
    $(".hot").on("click",function(){
        window.location.href="hotgroup.html";
    });
    $(".me").on("click",function(){
        window.location.href="member.html";
    });
    $("footer").on("click",function(){
        getMyTheme ();
    });
})
