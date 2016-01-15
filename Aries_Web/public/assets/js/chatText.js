var openId = 1806111110;
var roomId = "";
var i = 1000;
var globalWs = null;
function connection (){
  $.ajax({
    async:false,
    url : "http://galaxy.24-7.com.cn/account/loginWithApp/34536418-d6b2-451f-a400-4f0e284c9497",
    // url : "http://192.168.10.244:9000/account/loginWithApp/34536418-d6b2-451f-a400-4f0e284c9497",
    type: "post",
    data : {username: "ol-" +(openId++),type: 1},
    success : function(){
      if(window.WebSocket != undefined) {
        var ws = globalWs = new WebSocket("ws://galaxy.24-7.com.cn/chatRoom/join?userId=" + roomId);
        // var ws = new WebSocket("ws://galaxy.24-7.com.cn/chatRoom/join?userId=" + roomId);
        ws.onopen = open;
        ws.onclose = close;
        ws.onerror  = error;
        ws.onmessage = message;
              
      }
    }
  });
}
function open (e) {
  globalWs.send(JSON.stringify({text: "你好帅你好帅你好帅",toUserId: "", toUser: ""}));
  if (i--) {
    setTimeout(function(){
      connection();
    },1000);
  }
  $("#count").html(+$("#count").html() + 1);
 
}
function close () {
  console.log("close--------");
}
function error () {
  console.log("error--------");
}

function message (event) {
  var result = JSON.parse(event.data);
  console.log(result.peopleNum);
}
$(function(){
  var parmas = parseUrlParam(window.location.href);
  roomId = parmas.id;
  connection();  
});