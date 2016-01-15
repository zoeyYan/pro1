var sex;
var falg=false;
var age;
var parmas = parseUrlParam(window.location.href);
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

    getUserAlbumById :　function(id){
      Net.getUserAlbumById(id,function(result){
        if (result.length == 0) {
          $("#default-photo").show();
        }
        $("#album").handlebars($("#album-tmp"),result);
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
        $("#rCl").text(result.money);
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
    getHonorById    :   function (id) {
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
      if (id != FCWM_USER_ID) {
        $(".delete").hide();
      } else {
        $(".delete").show();
        $(".add-photo").show();
      }
    status=parmas.status;
    switch(status)
    {
        case "1":
        if(id!==FCWM_USER_ID){
            member.getUserAlbumById(id);
        }
        else{
            member.getUserAlbum();
        }
        $("#album-tab").show();
        $("#gift-tab,#honor-tab").hide();
        $(".tab li").eq(0).addClass("active").siblings().removeClass("active");
        break;
        case "2":member.getGift();
        $("#gift-tab").show();
        $("#album-tab,#honor-tab").hide();
        $(".tab li").eq(1).addClass("active").siblings().removeClass("active");
        break;
        case "3":member.getHonorById(id);
        $("#honor-tab").show();
        $("#gift-tab,#album-tab").hide();
        $(".tab li").eq(2).addClass("active").siblings().removeClass("active");
        break;
    }
      //tab
      $(".tab").on("tap","li",function(e){
        var $this = $(this);
        if (!$this.hasClass("active")) {
          $this.siblings(".active").removeClass("active");
          $this.addClass("active");

          var tabId = $this.data("tab");
          var currtab = $("#"+tabId);
          currtab.show().siblings().hide();
        }
        var i = $(this).index();
        if(i==0){
            $("#album .alb-tmp").remove();
            if(id!==FCWM_USER_ID){
            member.getUserAlbumById(id);
            }
            else{
                member.getUserAlbum();
            }
        }
        if(i==1){
            member.getGift();
        }
        if(i==2){
            member.getHonorById(id);
        }
      });

      $(".add-photo").click(function() {
        var imgnum=$(".img-item").length;
        if (imgnum>=202)
          {
              alert("上传的照片已达到最大的数量！");
          }
          else
          {
            $("#file").click();
          }

      });
      //荣誉弹窗
      $(".honor-list").on("click",".honor-item",function(){
         var name=$(this).data("name");
         switch(name)
         {
             case "万人迷":
             swal({   title: "万人迷徽章",   text: "魅力值达到10000，就可以得到一枚万人迷徽章哦！", confirmButtonColor: "#9100ba", confirmButtonText: "我知道了",  imageUrl: "assets/images/member/wr.png" });
             break;
             case "魅力达人":
             swal({   title: "魅力达人徽章",   text: "魅力值达到1000，就可以得到一枚魅力达人徽章哦！", confirmButtonColor: "#9100ba", confirmButtonText: "我知道了", imageUrl: "assets/images/member/dr.png" });
             break;
             case "新人":
             swal({   title: "新人徽章",   text: "魅力值达到100，就可以得到一枚新人徽章哦！", confirmButtonColor: "#9100ba", confirmButtonText: "我知道了", imageUrl: "assets/images/member/xr.png" });
             break;
             case "小土豪":
             swal({   title: "小土豪徽章",   text: "财力值达到10000，就可以得到一枚小土豪徽章哦！", confirmButtonColor: "#9100ba", confirmButtonText: "我知道了", imageUrl: "assets/images/member/th.png" });
             break;
             case "小康":
             swal({   title: "小康徽章",   text: "财力值达到1000，就可以得到一枚小康徽章哦！", confirmButtonColor: "#9100ba", confirmButtonText: "我知道了", imageUrl: "assets/images/member/xk.png" });
             break;
             case "温饱":
             swal({   title: "温饱徽章",   text: "财力值达到50，就可以得到一枚温饱徽章哦！", confirmButtonColor: "#9100ba", confirmButtonText: "我知道了", imageUrl: "assets/images/member/wb.png" });
             break;
         }
      });
      $("#file").on("change",function(e){

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
                  member.fileUpload(results.base64);
                }
            });
          }
      });


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

      $(".delete").unbind().bind("click",function(){

            $(".delinfo").stop().fadeIn();
            event.stopPropagation();

        });
        $(".delinfo").unbind().bind("click",function(){
            event.stopPropagation();
            });

        $(".on").unbind().bind("click",function(){
            var id = $(".deleteImg").find(".img-pic-real").attr("data-id");
            member.deletePic(id);
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

    }
};



$(function(){

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
  var parmas = parseUrlParam(window.location.href);
  var id = parmas.id;
  var imgItem = ".img-item:not(:first)";
  if (id != FCWM_USER_ID) {
      imgItem = ".img-item";
  }
   $(imgItem).unbind().bind("click",function(){
     var imgUrl= $(this).find(".img-pic-real").css("background-image");
      $(this).addClass("deleteImg");
    $(".viewpic").stop().fadeIn();
    $(".imgbox").css("background-image",imgUrl);
    });
}

