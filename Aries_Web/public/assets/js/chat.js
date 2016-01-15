var ws = null;
var userId = "";
var parmas = parseUrlParam(window.location.href);
var status=parmas.status;
if(status==0){
	$(".chat-box").hide();
	$('.fans').hide();
	$('.gift').show();
	$('.tab').find('li').removeClass('active');
	$('.tab').find('li:last').addClass('active');
	$('.in-box').hide();
	$('.pay').show();
	$('.panel').css({'bottom':'0px'});
	$('.chatinfo').hide();
}
//


//是否自动滚动
var isRolling = true;

//功能是否弹出
var isAction = false;

var toUser = "";
var toUserId = "";
function connection (id){
  if(window.WebSocket != undefined) {
    message({data:{kind:"waiting"}});
    ws = new WebSocket(WS_ADDR.format(id));
    ws.onopen = open;
    ws.onclose = close;
    ws.onerror  = error;
    ws.onmessage = message;
  } else {
    message({data:{kind:"nosupport"}});
  }
}
function open (e) {
  console.log("open--------");
  message({data:{kind:"open"}});

}
function close () {
  console.log("close--------");
  ws = null;
  message({data:{kind:"close"}});
  swal("聊天室连接已断开，请重新进入！");
  $(".freenum").eq(0).text(0);
  
}
function error () {
  //出错
  console.log("error--------");
  ws = null;
  message({data:{kind:"error"}});
}
function sendMsg (message) {
  ws.send(JSON.stringify({text: message,toUserId: toUserId, toUser: toUser}));
}
var _top=0;
function init_screen(){
        self=$(".d_show div:last-child");
        var _left=$(".d_show").width()+8;
        var eleft=self.width();
        var _height=$(".d_show").height();
        if(_top>=_height){
            _top=0;
        }
        self.css({left:_left,top:_top,color:getReandomColor()});
        var time=8000;
       
        self.animate({left:"-"+eleft+"px"},time,function(){});
        self.show();
        _top=_top+20;
        
}
  function istatus (){
      if (result.isOnline) {
        var timer = setInterval(function(){
              if ($("#status").length > 0) {
                $("#status").html("在线中");
                clearInterval(timer);
              }
        },10);
        } else {
        var timer = setInterval(function(){
              if ($("#status").length > 0) {
                $("#status").html("离线");
                clearInterval(timer);
              }
        },10);    
      }
  }
//随机获取颜色值
function getReandomColor(){
    return '#'+(function(h){
    return new Array(7-h.length).join("0")+h
    })((Math.random()*0x1000000<<0).toString(16))
}
function message (event) {
  var parmas = parseUrlParam(window.location.href);
  var id = parmas.id;
  result = event.data;
  console.log(event.data);
  if (typeof result === "string") {
    result = JSON.parse(result);
  }
  if(result.kind==="draw"){
      if(userId==FCWM_USER_ID){
         if(result.value==1){
              $(".startdraw").show();
              $(".startgrey").hide();
          } 
      }
      else{
          if(result.value==0){
              $(".wait,.btn-mask1").show();
              $(".draw,.btn-mask").hide();
          }
          else{
              $(".draw,.btn-mask").show();
              $(".wait,.btn-mask1").hide();
          }
      }
  }
  result.time = result.time ? result.time : new Date().Format("hh:mm");
  //是否是自己
  result.isMe = result.userId == FCWM_USER_ID ? true : false;
  result.toIsMe = result.toUserId == FCWM_USER_ID ? true : false;
  //@房主
  result.toIsOwners = result.toUserId == userId ? true : false;
  //@我
  if (result.toIsMe) {}
    if(!result.userId){
          $("#chatinfo").html('');
          $("#chatinfo").handlebars($("#record-chat"),result,true);
    }
    if (isRolling && !isAction) {
        $(".chat-box").animate({scrollTop:$(".chat-box").height()+1000},300);
    }
    if(result.kind === "system"){
        var message=result.msg;
        var div="<dt class='time'>"+result.time+"</dt>"+"<dd class='msg' style='color: #c213ca;'>"+message+"</dd>";
        $("#record").append(div);
    }
    if(result.kind === "draw"){
        var message=result.msg;
        var div="<dt class='time'>"+result.time+"</dt>"+"<dd class='msg' style='color: red;'>"+message+"</dd>";
        $("#record").append(div);
    }
    if(result.kind === "close"){
        var div="<dt class='time'>"+result.time+"</dt><dd class='msg'><span class='error'>----人好像有点多(点击重新连接)----</span></dd>";
        $("#record").append(div);
    }
    if(result.kind === "nosupport"){
        var div="<dt class='time'>"+result.time+"</dt><dd class='msg'><span class='nosupport'>----您的手机不支持聊天----</span></dd>";
        $("#record").append(div);
    }
    if(result.kind === "open"){
        var div="<dt class='time'>"+result.time+"</dt><dd class='msg'><span class='open'>----连接成功----</span></dd>";
        $("#record").append(div);
    }
    if(result.kind === "waiting"){
        var div="<dt class='time'>"+result.time+"</dt><dd class='msg'><span class='waiting'>----正在连接请稍等----</span></dd>";
        $("#record").append(div);
    }
    if (result.kind === "tm") {
        $("#eId").html(result.peopleNum || 0);
        var txt=result.message;
        var divdm="<div class='context'>"+txt+"</div>";
        $(".d_show").append(divdm); 
        init_screen();
        deletedm ();
    }
   if (result.kind === "join"||result.kind === "quit") {
        istatus ();
        $("#chatinfo").html('');
        $("#chatinfo").handlebars($("#record-chat"),result,true);
        $("#eId").html(result.peopleNum || 0);
  }
  if (result.kind === "history") {
    istatus ();
    result.kind = "talk";
    $("#eId").html(result.peopleNum || 0);
  }
   if (result.kind === "talk") {
     istatus ();
     $("#eId").html(result.peopleNum || 0); 
     $("#record").handlebars($("#record-tmp"),result,true);
   }
   var dth = $("#record").outerHeight();
    if(dth>=600){
          $(".time").eq(0).remove();
          $(".msg").eq(0).remove();
    };
}
function getUserProfile (id){
  Net.getUserProfileById(id,function(result){
    $("#header").handlebars($("#header-tmp"),result);
     var label=$('.hide-title').attr('label');
//	 label="true";
	 if(label=="true"){
	 	$('.label').removeClass('hidden');
	 }else{
	 	$('.label').addClass('hidden');
	 }
  });
}
function deletedm (){
    var dmle=parseInt($(".d_show div").eq(0).css("left"))-10;
    var dmw=$(".d_show div").eq(0).width();
    if(dmle<=(-dmw)){
        $(".d_show div").eq(0).remove();
    }
}
function getUsersInterestById (id){
  Net.getUsersInterestById(id,function(result){
    $("#rId").html(result.rId);
  });
}
function getStartDraw (){
  Net.getStartDraw(function(result){
      console.log("嘉宾"+result)
  });
}
function getDraw (id){
  Net.getDraw(id,function(result){
      console.log("粉丝"+result)
  });
}
//function getIsSend (){
//
//}
function getGiftTable (){
    var size=1;
    var page=0;
  Net.getGiftTable(page,size,function(result){
      console.log(result)
      $(".gift-list").handlebars($("#gift-tmp"),result,true);
      Net.getIsSend(function(result){
          if(result.numberForToday<=3){
              $(".freenum").eq(0).text(3-result.numberForToday);
          }
          else{
              $(".freenum").eq(0).text(0);
          }
      });
      function add (){
          var n=$(".freenum").eq(0).text();
          if(n<9){
            n++;
            $(".freenum").eq(0).text(n);  
            if (tiemr == null) {
              countdown();
            }
          }
          else{
            $(".freenum").eq(0).text(n);
          }
          if (n==9 && tiemr) {
            clearInterval(tiemr);
            tiemr = null;
          }
        };
        
        var canvas = $("#canvas")[0];
        var ctx = canvas.getContext('2d');
        var angle = 0;
        function countdown(){
          tiemr = setInterval(function(){
            angle += Math.ceil(360 / 60);
            if (angle > 360) {
              add();
              angle = 0;
            }
            ctx.sector("212,4,3,1",angle);
          },1000);
        };
        
        countdown();
        if($(".gift-list>li").find(".select"))
         {
             var giftid=$(".select").closest('.gift-info').data("giftid");
             $(".foot-2").attr("data-giftid",giftid);
         }
  });
}
function getMoney (){
  Net.getMoney (function(result){
  }); 
}
function interest (id,self){
  Net.postUsersInterest(id,function(result){
      self.hide();
      self.next(".uninterest").show();
  });
}
function unInterest(id,self){
  Net.deleteUsersInterest(id,function(result){
      self.hide();
      self.prev(".interest").show();
  });
}
function getIsfan(id){
  Net.getUsersInterestIsfan(id,function(result){
    if (result) {
      $(".interest").hide();
      $(".uninterest").show();
    } else {
      $(".uninterest").hide();
      $(".interest").show();
    }
  });
}
function getonlinepeople (id,page,size){
	 var fanslist = $("#fans-item");
	 var page = fanslist.data("page");
	 var size = fanslist.data("size");
	 var isfor = fanslist.data("isfor"); 
     var id = fanslist.data("id");
	  if (!isfor) {
	    fanslist.data("isfor",true);
        Net.getonlinepeople(id,page,size,function(result){
         if (result.length > 0) {
             fanslist.data("isfor",false);
             fanslist.data("page",page);
             fanslist.handlebars($("#fans-tmp"),result,true);
             for(var n=0;n<$(".fans-item").length;n++){
                  var infoid=$(".fans-item").eq(n).find(".info").data("id");
                  if(infoid==FCWM_USER_ID){
                        $(".fans-item").eq(n).find(".fun").remove();
                        $(".fans-item").eq(n).find("em").remove();
                     }          
              }
         }
       });      
	  }
}

function postGiftGive (gift_Id,star_Id,gift_number){
	var gift_Id=$(".foot-2").data("giftid");
	var star_Id=$(".foot-2").data("starid");
	var gift_number = parseInt($(".givenum").text());
	var subnum= parseInt($(".freenum").eq(0).text());
    if(subnum==0){
        swal("已无该礼物，请在聊天室休息休息，系统将在一分钟后自动赠您一朵鲜花！");
        $(".givenum").text(1);
    }
    else{
    if(gift_Id==undefined)
        {swal("请选择礼物！");}
        else{
            if(gift_number>0){
                if(star_Id==FCWM_USER_ID){
                    swal("对不起，只能给自己喜欢的嘉宾哦!");
                }
                else{
                   if(gift_number>subnum)
                   {
                        swal("超出该礼物的最大数量！");
                        $(".givenum").text(1);
                    }
                   else
                    {
                        Net.postGiftGive(gift_Id,star_Id,gift_number,function(result){
                            if (tiemr == null) {
                                function add (){
                                  var n=$(".freenum").eq(0).text();
                                  if(n<9){
                                    n++;
                                    $(".freenum").eq(0).text(n);  
                                    if (tiemr == null) {
                                      countdown();
                                    }
                                  }
                                  else{
                                    $(".freenum").eq(0).text(n);
                                  }
                                  if (n==9 && tiemr) {
                                    clearInterval(tiemr);
                                    tiemr = null;
                                  }
                                };
                              var canvas = $("#canvas")[0];
                                var ctx = canvas.getContext('2d');
                                
                                var angle = 0;
                                function countdown(){
                                  tiemr = setInterval(function(){
                                    angle += Math.ceil(360 / 60);
                                    if (angle > 360) {
                                      add();
                                      angle = 0;
                                    }
                                    ctx.sector("212,4,3,1",angle);
                                  },1000);
                                };
                                
                                countdown();
                            }
                            subnum=subnum-gift_number;
                            $(".freenum").eq(0).text(subnum);
                            swal("已送出");
                         },function(e){
                            swal("对不起，赠送出错，请耐心等候系统赠送的礼物！"); 
                            $(".freenum").eq(0).text(0);
                         });
                    }
                }     
            }
            else
            {
                swal("请输入正确的数量！");
            }
        }
    }

}

$(function(){
  var parmas = parseUrlParam(window.location.href);
  userId = parmas.id;
  getUserProfile(userId);
  $("#fans-item").attr("data-id",userId);
  connection(userId);
  getUsersInterestById(userId);
  getGiftTable();
//getIsSend();
  if(userId==FCWM_USER_ID)
  {
      $(".tab li").css("width","49.9%");
      $(".tab li").eq(2).remove();
      $(".gift").remove();
      $(".draw,.btn-mask").remove();
      $(".wait,.btn-mask1").remove();
      $(".startdraw").show();
  }
  else{
      $(".startdraw").remove();
      $(".startgrey").remove();
      $(".wait,.btn-mask1").show();
  }
//getMoney();
  //瀑布流

    var mySwiper = new Swiper('.swiper-container',{
    observer:true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents:true//修改swiper的父元素时，自动初始化swiper
    });
  //粉丝列表按钮
    $("#fans-item").on("click",".info",function(){
        var id= $(this).data("id");
        getIsfan(id);
        $("#fans-item").find(".fun").stop().slideUp(300);
        $(this).next().stop().slideToggle(300);
    });
    $("#fans-item").on("click",".interest",function(){
        var self = $(this);
        var id= $(this).data("id");
        interest(id,self);
    });
    $("#fans-item").on("click",".uninterest",function(){
        var self = $(this);
        var id= $(this).data("id");
        unInterest(id,self);
    });
    
  $("#send").click(function(e){
    var input = $("#inText");
    var text = $.trim(input.val());
    var txtNum=input.val().length;
    
    if (txtNum >30) {
      var textinfo = input.val();
      swal("超出30字数限制咯！");
      input.val(text);
    } else {
        if (text != "") {
          input.val("");
          input.removeAttr("style");
          sendMsg(text);
        } else {
          swal("不能发送空信息");
        }
    }
  });
  //房主id
  $(".foot-2").attr("data-starid",userId);
  
  //让输入框不要被键盘挡住
  $("#inText").focus(function(){
    setTimeout(function(){
      $(window).scrollTop($(window).height());
    },100);
  });
  
  //输入框自动变高
  $("#inText").on("input",function(){
    var self = $(this);
    self.innerHeight(self[0].scrollHeight);
  });
  
  //重新连接
  $(document).on("click.reconnection",".close, .error",function(e){
    if (ws == null) {
      connection(userId);
    }
  });
  
  //@
  $("#record").on("click.dialogue",".master, .other",function(e){
    e.stopPropagation();
    var self = $(this);
    toUserId = self.data("id");
    toUser = self.data("name");   
    var offset = self.offset();
    var width = self.outerWidth();
    var height = self.outerHeight();
    
    var action = $(".action");
    
    var setTop = offset.top + height + 5;
    var setLeft = offset.left - 45 + width / 2;
    action.show().offset({top: setTop,left: setLeft});
    isAction = true;
  });
  
  $(".action").on("click",".dialogue",function(){
      $("#inText").attr("placeholder","对"+toUser+"说：");
    $(".action").hide();
    isAction = false;
  });
  
  $(".action").on("click",".home",function(){
    window.location.href = "member.html?id=" + toUserId;
    $(".action").hide();
    isAction = false;
  });
  
  $(".chat-box").on("click.clear",function(e){
    toUserId = toUser = "";
    $("#inText").attr("placeholder","对大家说：");
    $(".action").hide();
    isAction = false;
  });
  
  $(".chat-box").on("scroll",function(e){
    if (isAction) {
      
    }
  });

  //nav 点击切换
  $(".tab").on("tap","li",function(e){
  	var pl = $(".fans-item").length;
    var fl = $("#eId").html();
  	$(this).addClass("active").siblings().removeClass("active");
  	var i = $(this).index();
  	if(i==0){
  	    $(".chatinfo").show();
  		$(".in-box").show();
  		$(".content").css({"bottom":"5rem","border-bottom":"0.1rem solid #eaeaea",});
  		$(".content>div").eq(i).show().siblings().hide();
  		if (isRolling && !isAction) {
            $(".panel").animate({scrollTop:$(".chat-box").height()},300);
          }
  	}
  	else{
  	    $(".chatinfo").hide();
  	    $(".action").hide();
  		$(".content>div").eq(i).show().siblings().hide();
  		$(".in-box").hide();
  		$(".content").css({"bottom":"0","border-bottom":"0",});
  	}
  	if(i==1)
  	{
//   $("#fans-item").data("page",0);
//   $("#fans-item").empty();
//   var parmas = parseUrlParam(window.location.href);
//   userId = parmas.id;
//   getonlinepeople(userId);
         $("#fans").hide();
//   $("#fans-item").data("page",0);
//   $("#fans-item").empty();
//   var parmas = parseUrlParam(window.location.href);
//   userId = parmas.id;
//   getonlinepeople(userId);
//      if(pl>=fl){
//      	$(".addlist").hide();
//      }
//      else{
//      	$(".addlist").show();
//      }
  	}
  	if(i!=2){ 
  		$(".gift-message").hide();
  		$(".give-btn").toggleClass("down");
  	}
  });
  	
	$(".give-btn").on("click",function(){
		var othernum= $(".othernum").val();
  		var givenum=$(".givenum").text();
		$(this).toggleClass("down");
		if(othernum=='')
		{
			$(".otherinfo").show();
		  	$(".othernum").hide();		
		}
		else{
			$(".givenum").text(othernum);
		}
		$(".gift-message").stop().fadeToggle();
	 });
	 //判断鲜花自动选择或其他礼物
     if($(".gift-list li").find(".select"))
         {
             var giftid=$(this).find(".gift-info").data("giftid");
             $(".foot-2").attr("data-giftid",giftid);
         }
      $(".gift-list li").on("click",function(){
        var giftid=$(this).find(".gift-info").data("giftid");
        
        $(this).siblings().find(".select").remove();
        $(this).append("<i class='select'></i>");
        $(".foot-2").attr("data-giftid",giftid);
      });
      $(".other").on("click",function(){
        $(".otherinfo").hide();
        $(".othernum").show();
        
      });
	  $(".foot-2").on("click",function(){
	  	postGiftGive();
	  });
	  $(".info-list li").on("click",function(){
	  	var givenums=$(this).find(".give-num").text();
	  	$(".givenum").text(givenums);
	  });
	  $(".othernum").on("input",function(){
	  	$(".givenum").text($(".othernum").val());
	  });
	  
        var pl = $(".fans-item").length;
        var fl = $("#eId").html();

        $(".addlist").on('click', function (e) {
        	var pl = $(".fans-item").length;
        	var fl = $("#eId").html();
			var pg=Math.floor(pl/10);
			var fg=Math.floor(fl/10);
			var i;
			if(fl>pl){
				for(i=pg*10;i<pl;i++){
					$(".fans-item").eq(i).remove();
				}
	            $("#fans-item").data("page",pg);
	            getonlinepeople();
			}
			else{
				if(fl=pl){}else{
					$(".fans-item").remove();
					$("#fans-item").data("page",0);
					getonlinepeople();
				}
				
			}
			 

        });  
        $(".startdraw").on("click",function(){
            getStartDraw();
            $(".startgrey").show();
            $(".startdraw").hide();
        });
        $(".btn-mask").on("click",function(){
            getDraw(userId);
        });
        //弹幕
        $("#dm_btn,.d_del").on("click",function(){
            $("#dm_btn,.d_del,.dm").toggle(1000);
        });
        setInterval("deletedm()",10);
  //移除“我”绑定的事件(这里没有移除掉，所以在页面上做了处理，如果是我的话不会加上其他的class样式)
  /*$("#record").off("click.dialogue",".me");*/
  
});


    
