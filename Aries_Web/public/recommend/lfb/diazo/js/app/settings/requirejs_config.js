if(typeof path=="undefined") path={};
if(typeof shim=='undefined') shim={};
requirejs.config({
	baseUrl:web_url,
	waitSeconds:100,
	paths:path,
	shim:shim,
	//urlArgs: "t=" +  (new Date()).getTime(),
	config:{
        text: {
            useXhr: function (url, protocol, hostname, port) {
                return true;
            }
        }
	}
});
requirejs.onError = function (err) {
    console.log(err.requireType);
    if (err.requireType === 'timeout') {
        console.log('modules加载超时，请试着重新刷新页面: ' + err.requireModules);
    }
    //document.body.removeChild(prewait);	
    alert('Module'+ err.requireModules+' 加载错误，请试着刷新页面!');
};
var launch_timer=null;//用来统计加载事件的计时器
function _testSpeed(file,fileSize,callback){//用来获取用户的网络速度，以此作为网站下载传输时间的依据 
    var imageAddr = file + "?n=" + Math.random();
    var startTime, endTime;
    var downloadSize = fileSize;
    var download = new Image();
    download.onload = function () {
        endTime = (new Date()).getTime();
        showResults();
    }
    startTime = (new Date()).getTime();
    download.src = imageAddr;
    
    function showResults() {
        var duration = (endTime - startTime) / 1000;
        var bitsLoaded = downloadSize * 8;
        var speedBps = (bitsLoaded / duration).toFixed(2);
        var speedKbps = (speedBps / 1024).toFixed(2);
        var speedMbps = (speedKbps / 1024).toFixed(2);
        console.log(speedBps);
        if(callback){
            callback(speedBps);
        }
        // alert("Your connection speed is: \n" + 
               // speedBps + " bps\n"   + 
               // speedKbps + " kbps\n" + 
               // speedMbps + " Mbps\n" );
    }        
}
if(!(window.console && console.log)) {//fix IE that not support console
  console = {
    log: function(){},
    debug: function(){},
    info: function(){},
    warn: function(){},
    error: function(){}
  };
}
var launch_close=function(){
    if(launch_timer){
        window.clearInterval(launch_timer);
        document.getElementById('prewaitbar').style.width=String(100)+"%";
        $('.prewait progress').remove('active');
    } 
    setTimeout(function(){
        $('.prewait').hide();
        $('.doc-layout').show();        
    },1000);
}
if(document.getElementById('prewaitbar')) _testSpeed(web_url+'diazo/img/logo-epub360.png',5000,function(bps){
    var t=1672864/bps*1000;//js加载时间推测 
    console.log(t);
    launch_checker=function(){
        timer+=100;
        var percentage=timer/t;
        if(percentage>0.8){
            percentage=0.8;
            window.clearInterval(launch_timer);
        }
        if(document.getElementById('prewaitbar')) document.getElementById('prewaitbar').style.width=String(percentage*100)+"%";
    }
    var timer=0;//清零
    if(document.getElementById('prewaitbar')) launch_timer=window.setInterval(launch_checker,100);
    //startMain();
});