function postApply(data) {
    console.log(data);
    Net.postApply(data, function (result) {
        var num = result;
        console.log(num);
        if (num == 3) {
            alert("您提交次数已超过三次！不能再次提交！");
        } else {
            alert('提交成功！');
            window.location.href = "index.html";
        }
    });
}
 
function checkval(t) {
		    var re =  /[`~@#\$%\^\€\＊\₩\£\•\「」\&\*\(\)_\+<>"\{\}\\\/'\[\]]/im;//只能输入汉字和英文字母
		    if (re.test(t)) {
		        return true;
		    } else {

		        return false;
		    }
	} 
function checkval1(t) {
		    var re = /^[\u4e00-\u9fa5a-z]+$/gi;//只能输入汉字和英文字母
		    if (re.test(t)) {
		        return true;
		    } else {

		        return false;
		    }
	} 	
function validate() {
    var name = $.trim($('#name').val());
    console.log(name);
    var tel = $.trim($('#mobl').val().length);
    var phone = $.trim($('#mobl').val());
    console.log(phone);
    var age = $.trim($('#age').val());
    var reg = /^(1[0-2]\d|\d{1,2})$/;
    var myreg = /^1[3,5,8,4,7,6]\d{9}$/;
    var re = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
    var email = $.trim($('#eMl').val());
    var dataVD = $(".videoplay").attr('src');
    var pic1 = $("#block1").css("background-image");
    var pic2 = $("#block2").css("background-image");
    var linkurl = $.trim($('#link').val());
    var rezf=/[@#\$%\^&\*]+/g;
    var zhiye=$.trim($('#work').val().length);
    var zhiye1=$.trim($('#work').val());
    var jieshao=$.trim($('#intrd').val().length);
    var jieshao1=$.trim($('#intrd').val());
    console.log(jieshao1);
    var jiabin=$.trim($('#honored').val().length);
    var jiabin1=$.trim($('#honored').val());
    var sayWords=$.trim($('#say').val().length);
    var sayWords1=$.trim($('#say').val());
    var caiyi=$.trim($('#show').val().length);
    var caiyi1=$.trim($('#show').val());
    var techang=$.trim($('#heiGht').val().length);
    var techang1=$.trim($('#heiGht').val());
    var youdian=$.trim($('#intrdY').val().length);
    var youdian1=$.trim($('#intrdY').val());
    var shiqing=$.trim($('#thing').val().length);
    var shiqing1=$.trim($('#thing').val());
   	
    //姓名  
    if (name == "") {
        $('.namevad').addClass("changeCol");
        return false;
    } else {
    	if(!(checkval1(name))){
   			$('.namevad').addClass("changeCol");
   			return false;
   		}
   		$('.each').removeClass("changeCol");
        
    }
    if (name > 15) {
        return false;
    }
    //年纪
 
    if (age == "") {
        $('.agevad').addClass('changeCol');
        return false;
    } else {
        if (age < 0) {
            $('.agevad').addClass('changeCol');
            return false;
        } else {
            if (!reg.test(age)) {
                $('.agevad').addClass('changeCol');
                alert("您输入的有非法字符");
                return false;
            }
            $('.agevad').removeClass('changeCol');
        }
    }
    //电话
    if (tel == '') {
        $('.mobvad').addClass('changeCol');
        return false;
    } else {
        if (!myreg.test(phone)) {
            $('.mobvad').addClass('changeCol');
            return false;
        }
        if (tel > 12) {
            $('.mobvad').addClass('changeCol');
            return false;
        } else {
            $('.mobvad').removeClass('changeCol');
        }
 
    }
    //email
    if (email == "") {
        $('.eMail').addClass('changeCol');
        return false;
    } else {
        if (!re.test(email)) {
            $('.eMail').addClass('changeCol');
            return false;
        } else {
            $('.eMail').removeClass('changeCol');
        }
    } 
   	
   	if(jieshao>200){
   		$('.usintrd').addClass("changeCol");   		
        return false;
   	}else{
   		if((checkval(jieshao1))){
   			$('.usintrd').addClass("changeCol");
   			alert("您输入的有非法字符");
   			return false;
   			
   		}else{
   			$('.usintrd').removeClass("changeCol");
   		}
   	}
   	if(zhiye>30){
   		$('.job').addClass("changeCol");
        return false;
   	}else{
   		if((checkval(zhiye1))){
   			$('.job').addClass("changeCol");
   			alert("您输入的有非法字符");
   			return false;
   			
   		}else{
   			$('.job').removeClass("changeCol");
   		}
   		
   	}
   	if(jiabin>30){
   		$('.each').addClass("changeCol");
        return false;
   	}else{
   		if((checkval(jiabin1))){
   			$('.each').addClass("changeCol");
   			alert("您输入的有非法字符");
   			return false;
   		}
   		$('.each').removeClass("changeCol");
   	}
   	
   	if(sayWords>200){
   		$('.sayS').addClass("changeCol");
        return false;
   	}else{
   		if((checkval(sayWords1))){
   			$('.sayS').addClass("changeCol");
   			alert("您输入的有非法字符");
   			return false;
   		}
   		$('.sayS').removeClass("changeCol");
   	}
   	
   	if(caiyi>200){
   		$('.caiY').addClass("changeCol");
        return false;
   	}else{
   		if((checkval(caiyi1))){
   			$('.caiY').addClass("changeCol");	
   			alert("您输入的有非法字符");
   			return false;
   		}
   		$('.caiY').removeClass("changeCol");
   	}
   	
   	if(techang>200){
   		$('.teshu').addClass("changeCol");
        return false;
   	}else{
   		if((checkval(techang1))){
   			$('.teshu').addClass("changeCol");
   			alert("您输入的有非法字符");
   			return false;
   		}
   		$('.teshu').removeClass("changeCol");
   	}
   	
   	if(youdian>200){
   		$('.oneself').addClass("changeCol");
        return false;
   	}else{
   		if((checkval(youdian1))){
   			$('.oneself').addClass("changeCol");
   			alert("您输入的有非法字符");
   			return false;
   		}
   		$('.oneself').removeClass("changeCol");
   	}
   	
   	if(shiqing>200){
   		$('.ziji').addClass("changeCol");
        return false;
   	}else{
   		if((checkval(shiqing1))){
   			$('.ziji').addClass("changeCol");
   			alert("您输入的有非法字符");
   			return false;
   		}
   		$('.ziji').removeClass("changeCol");
   	}
    if (pic1 == "none") {
        $('#largePic').addClass('changeCol');
        return false;
    } else {
        $('#largePic').removeClass('changeCol');
    }
    if (pic2 == "none") {
        $('#smallPic').addClass('changeCol');
        return false;
    } else {
        $('#smallPic').removeClass('changeCol');
    }
 
    if (dataVD == null && linkurl == "") {
        $('.linkVd').addClass('changeCol');
        return false;
    } else {
        $('.linkVd').removeClass('changeCol');
 
    }
    return true;
}
$(function () {
    $('.option').blur(function () {
        var school = $(this).val();
        $('.backG').text(school);
    });
    $('.opTion').blur(function () {
        var qqq = $(this).val();
        $('.backGt').text(qqq);
    })
    $('.parT').blur(function () {
        var qqq = $(this).val();
        $('.back2gt').text(qqq);
    })
 
 
    var validateImgType = function (btn) {
        var f = btn.val();
        if (!/\.(jpg|jpeg|png|JPG|PNG)$/.test(f)) {
            setTimeout(function () {
                alert("图片类型必须是.jpeg,jpg,png中的一种");
            }, 500);
            return false;
        } else {
            return true;
        }
    }
    var fileUpload = function (btn, base64Img) {
        $.ajax({
            url: Api.APP_ADDR + "application/userPicture",
            type: 'post',
            　　　　data: {
                'base64Img': base64Img
            },
            　　success: function (result) {
                console.log(btn[0].id)
                if (btn[0].id == "submit1") {
                    image_url = result.imgUrl;
                } else {
                    image_url_s = result.imgUrl;
                }
                console.log(result.imgUrl)
                btn.next().css("background-image", "url(" + result.imgUrl + ")");
                result.base64 = null;　　　
            },
            error: function () {
                alert("图片上传失败！");
                $(".black").hide();
            }　　　
        });
    }
    var photo = $("#submit1,#submit2");
    photo.bind("change", function () {
        var btn = $(this);
        var falgImg = validateImgType(btn);
        if (falgImg) {
            console.log("---successful---");
            // 也可以传入图片路径：lrz('../demo.jpg', ...       
            lrz(this.files[0], {
                width: 300,
                // 压缩开始
                before: function () {
                    console.log('压缩开始');
                },
                // 压缩失败
                fail: function (err) {
                    console.error(err);
                },
                // 压缩结束（不论成功失败）
                always: function () {
                    console.log('压缩结束');
                },
                // 压缩成功
                done: function (results) {
                    // 你需要的数据都在这里，可以以字符串的形式传送base64给服务端转存为图片。
                    console.log(results);
                    fileUpload(btn, results.base64);
                }
            });
        }
    });
 
    var validateVideoType = function () {
        var g = $("#submit3").val();
        var videoinfo = $("#submit3")[0].files[0];
        var vdsize = videoinfo.size;
       
 
        if (!/\.(MP4|AVI|MOV|WMV|MKV|mp4|mov|wmv|mkv|avi|mp3)$/.test(g)) {
            setTimeout(function () {
                alert("视频类型必须是.MP4,AVI,MOV中的一种");
            }, 0);
            return false;
        } else {
            if (vdsize > 5242880) {
                setTimeout(function () {
                    alert("您上传的视频超过了上传标准大小，请在下方上传视频链接");
                }, 0);
                $('.black').hide();
                return false;
            } else {
                return true;
            }
 
        }
    }
    var video = $("#submit3")
    video.bind("change", function () {
        var flag = validateVideoType();
        if (flag) {
            videoUpload();
        }
    })
    var videoUpload = function () {
        $(".black").show();
        var formData = new FormData($("#submit3")[0].files[0]);
        var videodata = $("#submit3")[0].files[0];
        formData = videodata;
       
        var options = {
            type: 'POST',
            timeout: 0,
            delegation: true,
            dataType: 'JSON',
            url: Api.APP_ADDR + "activity/entry/upload",
            success: function (result) {
                var video_url = result.url;
                $(".videoplay").attr("src", video_url).show();
                $(".black").hide();
                $('.delect').show();
                $(".blockvideo").show();
                $(".blockvideo").css({
                    "background-color": "#000000"
                }).text("视频已上传成功");
                $(".videoplay").hide();
                //                  $('.delect').unbind().bind("click",function(){
                //                      $(".videoplay").hide();
                //                      $(".blockvideo").css("background","#000000").hide();
                //                      $('#submit3').val("");
                //                      $('.delect').hide();
                //                  });
            }
        };
        $("#videoform").ajaxSubmit(options);
    }
 
    $('.foot').bind("click", function () {
        var falg = false;
        falg = validate();
        if (falg) {
            var name1 = $("#name").val();
            var age1 = $("#age").val();
            var phone1 = $("#mobl").val();
            var mail1 = $("#eMl").val();
            var selfintroduce1 = $("#intrd").val();
            var career1 = $("#work").val();
            var education1 = $("#edu").val();
            var body1 = $("#bod").val();
            var type1 = $("#kind").val();
            var talent1 = $("#show").val();
            var habit1 = $("#heiGht").val();
            var advantage1 = $("#intrd").val();
            var impress1 = $("#thing").val();
            var guest1 = $("#honored").val();
            var words1 = $("#say").val();
            var video_url = $(".videoplay").attr("src");
            var linked = $("#link").val();
            var data = {
                video: video_url,
                largepic: image_url,
                smallpic: image_url_s,
                name: name1,
                age: age1,
                phone: phone1,
                mail: mail1,
                selfintroduce: selfintroduce1,
                career: career1,
                education: education1,
                body: body1,
                type: type1,
                talent: talent1,
                habit: habit1,
                advantage: advantage1,
                impress: impress1,
                jiabin: guest1,
                words: words1,
                videoUrl: linked
            };
            postApply(data);
        } else {
            var t = $('.changeCol').offset().top;
            $('html, body').animate({
                scrollTop: t
            }, 1000);
            alert("填写信息有误！")
        }
    });
});

