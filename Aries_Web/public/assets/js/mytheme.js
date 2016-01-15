var parmas = parseUrlParam(window.location.href);
function getMyArticle(){
  if(parmas.user){
      id=parmas.user;
  }
  else{
      id=FCWM_USER_ID;
  }
  var list = $(".art-container");
  var page = list.data("page");
  var size = list.data("size");
  var isfor = list.data("isfor");
  if (!isfor) {
       list.data("isfor",true);
          Net.getMyArticle(id,page,size,function(result){
              if(page==0&&result.length == 0){
                  $(".back").show();
              }else{
                  $(".back").hide();
                  list.data("isfor",false);
                  if (result.length > 0) {
                      $(".art-container").handlebars($("#art-tmp"),result,true);
                      list.data("page",page + 1);
                  }
              }
              if(parmas.user!==FCWM_USER_ID){
                  $(".a-del,.true,.new").hide();
              }
              
          });
      }
}
function getSave(){
  var list = $(".art-container");
  var page = list.data("page");
  var size = list.data("size");
  var isfor = list.data("isfor");
  if (!isfor) {
       list.data("isfor",true);
          Net.getSave(page,size,function(result){
              if(page==0&&result.length == 0){
                  $(".back p").html("还没有任何贴子哦，赶快去加入圈子，开始收藏吧。")
                  $(".back").show();
              }else{
                  $(".back").hide();
                  list.data("isfor",false);
                  if (result.length > 0) {
                      $(".art-container").handlebars($("#save-tmp"),result,true);
                      list.data("page",page + 1);
                  }
              }
          });
      }
}
function postSave (id,val,self){
    swal({   title: "是否删除？",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "确定",cancelButtonText: "取消",   closeOnConfirm: false }, function(){   
        Net.postSave(id,val,function(result){
            $(".art-container").data("page",0);
            self.remove();
            swal("删除成功!")
        })
    });
}
//删除帖子
function postArticleDel (article_id,self) {
    data = {"article_id":article_id};
    swal({   title: "是否删除？",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "确定",cancelButtonText: "取消",   closeOnConfirm: false }, function(){   
        Net.postArticleDel(data,function(result){
            $(".art-container").data("page",0);
            self.remove();
            swal("删除成功!")
        })
        
    });
        
}
$(function(){
    id=parmas.id;
    switch(id)
    {
        case "1":getMyArticle();
        /*微信title start*/
       if(parmas.user!==FCWM_USER_ID){
           var $body = $('body');
            document.title = "话题";
            $(".back p").html("还没有任何贴子哦!");
       }else{
           var $body = $('body');
            document.title = "话题";
       }
        
        /*微信title end*/
        break;
        case "2":getSave();
        /*微信title start*/
        var $body = $('body');
        document.title = "收藏";
        /*微信title end*/
        break;
    }
    if(parmas.user!==FCWM_USER_ID){
        $(".a-del,.new").hide();
    }
    $(".art-container").on('scroll', function (e) {
           if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
               
               if(id==1){
                   getMyArticle();
               }else{
                   getSave();
               }
           }
      });
    $(".art-container").on("click",".artcon",function(){
        self = $(this).closest(".art-item");
        window.location.href="article.html?articleid="+self.data("id");
        event.stopPropagation();
    })
    $(".art-container").on("click",".a-del",function(){
        self = $(this).closest(".art-item");
        var article_id=self.data("id");
        id=parmas.id;
        switch(id)
        {
            case "1":postArticleDel(article_id,self);
            break;
            case "2":
            val="delete";
            postSave(article_id,val,self);
            break;
        }
    })
});