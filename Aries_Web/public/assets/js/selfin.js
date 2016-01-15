var parmas = parseUrlParam(window.location.href);
var voteinfo = parmas.vote;
var status = parmas.status;
var openid = parmas.id;
var userId = parmas.userId;
var share_img=null;
var image_url='';
   function vote (id,self){
       self.attr("disabled","true");
      Net.getSelfVote(id,function(result){
          console.log(result);
          if(result.status==4){
              votenum=parseInt(self.parent().find(".total").html())+1;
              self.parent().find(".total").html(votenum);
              alert("投票成功!")
          }
          else{
              alert("您今日投票次数已用完，明日再来支持哦!");
          }
          self.removeAttr("disabled");
      },function(res){
          console.log(res);
      });
   }
   function voteinit(page,size){
      Net.getReadVote(page,size,function(result){
          var num_entries=result.total;
            $("#Pagination").pagination(num_entries, {
                num_edge_entries: 1, //边缘页数
                num_display_entries: 4, //主体页数
                callback: readvote,
                items_per_page: 1, //每页显示1项
                prev_text: "前一页",
                next_text: "后一页"
            });
          console.log(result);
      });
   }
   function wxfollow(){
      data={url:location.href};
      Net.postWxVerify(data,function(result){
          window.location.href=result;
      });
   }
   function getSearch(id) {
       var page=0;
       var size=40;
       Net.getVoteSearch(id,page,size,function(result){
           console.log(result.raws);
           if(result.raws.length!=0){
               $(".topboard").handlebars($("#vote-tmp"),result.raws)
           }else{
               $(".topboard").html("<p class='nosearch'>搜索无结果<p>");
           }
       },function(res){

       })
   }
   function follow(){
      var id=openid;
      Net.getWxFollow(id,function(result){
          followid=result.status;
          console.log(result.status);
      },function(res){
          console.log(res);
      });
   }
   function readvote(page_index,size){
      var size=8;
      Net.getReadVote(page_index,size,function(result){
          $(".topboard").handlebars($("#vote-tmp"),result.raws);
          console.log(result);
      });
   }
   function readme(){
      if (userId!=null) {
          id=userId;
      	  $(".shareme").addClass("joinus").removeClass("shareme");
      } else{
      	 id=FCWM_USER_ID;
      }
      Net.getReadMe(id,function(result){
        console.log(result);
        if (voteinfo==1||result.status==2) {
            $(".join").remove();
            $(".selfinfo").handlebars($("#me-tmp"),[result.vote]);
            share_img=result.vote.vote_img;
            $(".info p").eq(2).find("i").html(result.idx);
        } else{
            $(".selfinfo").remove();
        }
      });
   }
   var validateImgType=function(){
        var f=$('#photo').val();
        console.log(f);
        if(!/\.(jpg|jpeg|png|JPG|PNG)$/.test(f))
        {
            $(".black").hide();
            setTimeout(function () {
                alert("图片类型必须是.jpeg,jpg,png中的一种");
            }, 500);
          return false;
        }else{
          return true;
        }
    }

    var fileUpload=function(base64Img){
         $.ajax({
          url : Api.APP_ADDR + "application/userPicture",
          type : 'post',
    　　　　       data : {'base64Img' : base64Img},
    　　                 success: function(result){
          image_url=result.imgUrl;
          $('.addphoto').css({"background-image":"url("+result.imgUrl+")"});
          $('.addphoto').addClass("added");
    　　                    $(".black").hide();
    　　　                  },
          error: function(){
           console.error("upload error");
            alert("图片上传失败！");
            $(".black").hide();
          }
    　　　   });
    }
$(function(){
    if(status!=1){
        wxfollow();
    }else{
        follow();
    }

    readme();
    voteinit(0,8);
    $(".back").click(function(){
        $(".toptips").html("投票排行");
        $(".search_txt").val("");
        voteinit(0,8);
        $(".back").addClass("hidden");
        $(".pagecon").show();
    });
    $(".search").on("click",".search_btn",function(){
        $(".toptips").html("搜索结果");
        $(".pagecon").hide();
        $(".back").removeClass("hidden");
        var id = $(".search_txt").val();
        getSearch(id);
    });
   $(".selfinfo").on("click",".backhome",function(){
       window.location.href="selfie.html";
   });
    $(".topboard").on("click",".vote",function(){
        if (followid==1) {
            self=$(this);
            vote($(this).data("id"),self);
        } else{
          swal({ title:'',  text: "长按上方二维码,关注非常完美官微才能参与报名投票哦!",   imageUrl: "../images/selfie/code.jpg" });
        }
    })
    $(".selfinfo").on("click",".joinus",function(){
        if (followid==1) {
            window.location.href="selfin.html?vote=0&userId="+userId;
        } else{
          swal({ title:'',  text: "长按上方二维码,关注非常完美官微才能参与报名投票哦!",   imageUrl: "../images/selfie/code.jpg" });
        }
    });
    $(".selfinfo").on("click",".shareme",function(){
        $(".share").show();
    });
    $(".share").on("click",function(){
        $(".share").hide();
    });
    var myreg = /^1[3,5,8,4,7,6]\d{9}$/;

    var photo = $('#photo');
     photo.bind('change',function(){
        var falgImg=validateImgType();
        if(falgImg){
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
              fileUpload(results.base64);
            }
        });
        }
     });
     $(".submit").on("click",function(){
        if($(".name").val().length==0||$(".name").val()==' ')
         {
            alert('请输入有效的姓名！');
            return false;
         }
         if(!myreg.test($(".phone").val()))
         {
            alert('请输入有效的手机号码！');
            return false;
         }
        if(!$(".addphoto").hasClass("added"))
         {
            alert('请上传本人照片哦！');
            return false;
         }
         data={vote_name:$(".name").val(),vote_img:image_url,vote_phone:$(".phone").val()};
         console.log(data);
           Net.postVoteJoin(data,function(result){
               if(result.status==2){
                   alert("您已提交过，请勿重复提交!");
               }
               else {
                   window.location.href = "selfin.html?vote=1";
               }
           },function(e){
               alert("报名出错，请重试！");
           });
     });
     $(".selfinfo").on("click",".voteme",function(){
        if (followid==1) {
            self=$(this);
            vote($(this).data("id"),self);
        } else{
          swal({   text: "长按下方二维码,关注非常完美官微才能参与报名投票哦!",   imageUrl: "../images/selfie/code.jpg" });
        }
     });
});

