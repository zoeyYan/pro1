var parmas = parseUrlParam(window.location.href);
function getMyTheme (){
  var page = 0;
  var size = 100;
  if(parmas.user){
      id=parmas.user;
  }
  else{
      id=FCWM_USER_ID;
  }
    Net.getMyTheme(id,page,size,function(result){
      console.log(result)
      $(".me").handlebars($("#me-tmp"),result,true);
      $.each(result,function(i){
          delId=result[i].theme_id;
          for(var n=0,l=$(".alli").length;n<l;n++){
              if($(".alli").eq(n).data("id")==delId){
                  $(".alli").eq(n).remove();
              }
          }
      })
    })
}
function getTheme (){
  var page = 0;
  var size = 100;
  Net.getTheme(page,size,function(result){
      console.log(result)
      $(".more").handlebars($("#more-tmp"),result,true);
      $(".group").handlebars($("#group-tmp"),result,true);
      getMyTheme();
  }); 
}
function postJoinTheme (id,self){
    Net.postJoinTheme(id,function(result){
        self.addClass("dui");
    });
}
function postExitTheme (id,self){
    Net.postExitTheme(id,function(result){
        self.removeClass("dui");
    });
}
$(function(){
    if(parmas.user){
        $(".other").hide();
    }
    getTheme();
    $(".content").on("click",".icon",function(){
        self=$(this);
        id=self.data("id")
        if($(this).hasClass("dui")){
            postExitTheme (id,self);
        }
        else{
            postJoinTheme (id,self);
        }
    });
})
