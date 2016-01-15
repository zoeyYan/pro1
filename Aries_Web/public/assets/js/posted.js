var parmas = parseUrlParam(window.location.href);
var dl = function(id){
    return document.getElementById(id);
};
function validateImgType () {
    var f=$('.img-add').val();
    console.log(f);
    if(!/\.(jpg|jpeg|png|JPG|PNG)$/.test(f))
    {
      setTimeout(function(){alert("图片类型必须是.jpeg,jpg,png中的一种");},500);
      return false;
    }else{
      return true;
    }
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
            div="<div class='album-item' style='background-image: url("+result.imgUrl+");'><i class='del'></i></div>";
            $(".album").prepend(div);
    　　　       },
          error: function(){
            console.error("upload error");
            setTimeout(function(){alert("上传图片失败！");},500);
            $(".black").hide();
        }
    　  });
}
function getMyTheme (){
  var page = 0;
  var size = 100;
  Net.getMyTheme(FCWM_USER_ID,page,size,function(result){
      console.log(result)
      $(".selgroup").handlebars($("#sel-tmp"),result,true);
      if(parmas.id){
          $(".selgroup").val(parmas.id);
      }
  });
}
function postArticleNew (data){

  Net.postArticleNew (data,function(result){
      console.log(result)
      data=[];
      var theme_id=$(".selgroup").val();
      console.log(data)
      $(".black").hide();
      alert("发帖成功，积分加+1，正在返回上一页！");
      if(parmas.status==1){
          window.location.href="family.html?digit="+Math.ceil(Math.random()*1000);
      }
      else{
          window.location.href="home.html?digit="+Math.ceil(Math.random()*1000)+"&themeid="+theme_id;
      }

  });
}
$(function(){
    dl("btn").onclick = function(){
        var con = "请在这里输入链接";
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
    getMyTheme();

    $(".img-add").on("change",function(){
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
        }
        else
        {
            setTimeout(function(){alert("对不起，最多只能上传9张哦！");},500);
        }
      });
      $(".album").on("click",".del",function(){
          $(this).closest(".album-item").remove();
      });
      $("footer").on("click",".send",function(){
          var article_name=$(".title").val();
          var nameL=$(".title").val().length;
          var image_number=$(".album .album-item").length;
          var theme_id=$(".selgroup").val();
          var hotid=$(".selgroup option:selected").data("id");
          var content = $(".text").val();
          var newcontent ='';
          var image_url=[];
          var linkArry=new Array();
          if(theme_id==0){
              alert("请选择发帖的圈子");
          }
          else{
              if(hotid!==FCWM_USER_ID&&hotid){
                  alert("红人圈只能本人发帖哦！");
              }
              else{
                  if(article_name==''||nameL>25){
                  alert("帖子标题有误，请重新输入！");
                  }
                  else{
                      if(content=='#请在这里输入链接#'||content==''){
                          alert("请输入帖子内容");
                      }
                      else{
                          if(content.length>512){
                              alert("字数超出512个了哟!")
                          }
                          else{
                              $(".black").show();
                              for(i=1;i<=8;i++){
                                    imgurl=$(".album .album-item").eq(i-1).css("background-image");
                                    if(imgurl){
                                          imgurl =imgurl.slice(4,-1);
                                          image_url[i]=imgurl;
                                    }
                                    else
                                    {
                                        image_url[i]=null;
                                    }
                              }
                              linkArry=content.split('#');
                              for(i=0;i<=linkArry.length-1;i++){
                                  if(i%2==1){
                                      if(linkArry[i].split('http').length<=1){
                                          linkArry[i]="<a href='http://"+linkArry[i]+"'>"+linkArry[i]+"</a>";
                                      }else{
                                          linkArry[i]="<a href='"+linkArry[i]+"'>"+linkArry[i]+"</a>";
                                      }

                                  }
                                  newcontent+=linkArry[i];
                              }
                              var data={"article_name":article_name,"theme_id":theme_id,"content":newcontent,"image_number":image_number,"image_url1":image_url[1],"image_url2":image_url[2],"image_url3":image_url[3],"image_url4":image_url[4],"image_url5":image_url[5],"image_url6":image_url[6],"image_url7":image_url[7],"image_url8":image_url[8],"image_url9":image_url[9]};
                              postArticleNew (data);
                              //console.log(content)
                          }

                      }
                  }
              }

          }

      });
});
