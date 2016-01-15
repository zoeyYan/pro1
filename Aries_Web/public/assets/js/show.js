+$(function(){
	var params = parseUrlParam(window.location.href);
	var activityId=params.activityId;
 /**
   * 动态添加数据
   * templateEle: 模板
   * ele： 要插入的结点
   * context: 数据
   * isAppend: 是否追加
   */
  var setData = function(templateEle,ele,context,isAppend){
  	console.log(context);
    //用jquery获取模板
    var tpl   =  $(templateEle).html();
    //预编译模板
    var template = Handlebars.compile(tpl);
    //匹配json内容
    var html = template(context);
    //输入模板
    if (isAppend) {
      $(ele).append(html);
    } else{
      $(ele).html(html);
    }
  }		
 //***************************
  function getAreaID() {
		var area = 0;
		if ($("#seachdistrict").val() != "0") {
			area = $("#seachdistrict").val();
		} else if ($("#seachcity").val() != "0") {
			area = $("#seachcity").val();
		} else {
			area = $("#seachprov").val();
		}
		return area;
	}

	function showAreaID() {
		//地区码
		var areaID = getAreaID();
		//地区名
		var areaName = getAreaNamebyID(areaID);
		alert("您选择的地区码：" + areaID + "      地区名：" + areaName);
	}

	//根据地区码查询地区名
	function getAreaNamebyID(areaID) {
		var areaName = "";
		if (areaID.length == 2) {
			areaName = area_array[areaID];
		} else if (areaID.length == 4) {
			var index1 = areaID.substring(0, 2);
			areaName = area_array[index1] + " " + sub_array[index1][areaID];
		} else if (areaID.length == 6) {
			var index1 = areaID.substring(0, 2);
			var index2 = areaID.substring(0, 4);
			areaName = area_array[index1] + " " + sub_array[index1][index2] + " " + sub_arr[index2][areaID];
		}
		return areaName;
	}

    initComplexArea('seachprov', 'seachcity', 'seachdistrict', area_array, sub_array, '0', '0', '0');
		$('.imfor').click(function(){
  		  	console.log("-----------");
  		  	$('.backgrond').show();
  		  	$('.popBoder').show();
  		  })
  		  $('.closed').click(function(){
  		  	$('.backgrond').hide();
  		  	$('.popBoder').hide();
  		  })
		
	    $('.add1').bind('blur',function(){
	    	var province=$('.add1').val();
	    	var provalue=$('.add1').find("option[value="+province+"]").text();
	    	$("#province").text(provalue);	    	
	    });
	    $('.add2').bind('blur',function(){
	    	 var city=$('.add2').val();
	    	 var cityvalue=$('.add2').find("option[value="+city+"]").text();
	    	 $('#city').text(cityvalue);
	    });
	     $('.add3').bind('blur',function(){
	    	var area=$('.add3').val();
	    	var areavalue=$('.add3').find("option[value="+area+"]").text();
	    	$('#area').text(areavalue);
	    });
		
		
	    var validate=function(){
	    	var name=$('#name').val().length;
	    	var tel=$('#tel').val();
	    	var myreg = /^1[3,5,8,4,7,6]\d{9}$/;
	    	var pwd=$("#password").val();
	    	var province=$('.add1').val();
	    	var city=$(".add2").val();
	    	var areamore=$("#areamore").val();
	    	if(name==0){
	    		alert('请输入姓名');
	    		return false;	    		
	    	}
	    	if(tel==''){
	    		alert('请输入手机号码！');
	    		return false;
	    	}else if(!myreg.test(tel)){
	    		alert('请输入正确的手机号码！');
	    		return false;
	    	}
	    	if(pwd==''){
	    		alert('请输入邮编！');
	    		return false;
	    	}
	    	if(province==0||city==0){
	    		alert("请输入地址！");
	    		return false;
	    	}
	    	if(areamore==''){
	    		alert('请输入详细地址！');
	    		return false;
	    	}
	    	return true;
	    }
  //
  function strToJson(str){ 
	var json = eval('(' + str + ')'); 
	return json; 
	} 
	    $('.send').click(function(){
	    	var name=$("#name").val();
	    	var tel=$("#tel").val();
	    	var pwd=$("#password").val();
	    	var province=$('.add1').val();
	    	var provalue=$('.add1').find("option[value="+province+"]").text();
	    	var city=$('.add2').val();
	    	var cityvalue=$('.add2').find("option[value="+city+"]").text();
	    	var area=$('.add3').val();
	    	var areavalue=$('.add3').find("option[value="+area+"]").text();
	    	var infomore=$("#areamore").val();
	    	var address=provalue+cityvalue+areavalue+infomore;
	    	var info={};
	    	info.name=name;
	    	info.phone_number=tel;
	    	info.code=pwd;
	    	info.address=address;
	    	console.log(info);
	    	if(validate()){
	    		console.log(1111);
	    		Net.addFansInfo(info,function(result){
	    			console.log(result);
	    			$('.backgrond').hide();
  		  			$('.popBoder').hide();
	    		})
	    	}else{
	    		console.log("error");
	    	}
	    });
	      Net.getActivityContent(activityId,function(result){
	      	var resinfo=result.choiceList;
	      	console.log(resinfo);
	      	var infoDetail=[];
	      	for(var i=0;i<resinfo.length;i++){
	      		var addjson=strToJson(resinfo[i].description);
	      		infoDetail.push(addjson);	      		
	      	}
	      	console.log(infoDetail);
	      	var resultInfo={"data":infoDetail};
            setData("#data-second","#datainfo",resultInfo);
            var height=document.body.scrollHeight;
	  		  console.log(height);
	  		  $('.backgrond').css("height",height+50);
	  		  var mms="jinlei,status,type";
	      });  	
	   	 
          
  		  
  		  
})
