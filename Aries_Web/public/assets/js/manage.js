$(function(){
    $(".g-data").on("change",function(){
        theme_class=$(".g-data").val();
        if(theme_class=="0"){
            $(".hot").show();
        }
        else{
            $(".hot").hide();
        }
    })
    
    $(".create").on("click",function(){
        postProgramTitleNew ();
    });
    $(".addprogram").on("click",function(){
        window.location.href="addman.html" + "?t=admin";
    });   
    $(".img-add").on("change",function(){
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
      }); 
      $(".ok").on("click",function(){
            theme_class=$(".g-data").val();
            hotid=$(".hot").val();
            if(theme_class=="0"&&hotid==''){
                alert("请输入嘉宾ID")
            }
            else{
                postThemeCreate();
            }
        });
})
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
    console.log(result.imgUrl)
            $(".group-img").attr("data-url",result.imgUrl);
            $(".group-img").css("background-image","url("+result.imgUrl+")");
    　　　       },
          error: function(){
            console.error("upload error");
            setTimeout(function(){alert("上传图片失败！");},500);
            $(".black").hide();  
        }
    　  });
}
function postThemeCreate (){
    
    var theme_name=$(".g-name").val();
    var theme_class=$(".g-data").val();
    var theme_image=$(".group-img").data("url");
    hotid=$(".hot").val();
    if(theme_image==''||theme_name==''||theme_class=='2'||theme_name.length>6||theme_image==null)
    {
        alert("信息有误，请审核！");
    }
    else{
        $(".black").show();
        var data={"theme_name":theme_name,"theme_class":theme_class,"theme_image":theme_image,"hot_people":hotid};
        Net.postThemeCreate(data,function(result){
            alert("添加成功！");
            $(".g-name").val('');
            $(".g-data").val('2');
            $(".group-img").data('');
            $(".group-img").css("background-image","");
            $(".hot").val('');
            $(".black").hide();
        },function(){
            $(".black").hide();
            alert("圈子创建重复！");
        });
    }
    
}
function postProgramTitleNew (){
    var is_online=$(".isonline").val();
    var title=$(".title").val();
    var time=$(".time").val();
    alert(time)
    var data={"app_id":"34536418-d6b2-451f-a400-4f0e284c9497","title":title,"show_time":time,"is_online":is_online}
    Net.postProgramTitleNew(data,function(result){
        
        alert("添加成功！")
    });
}