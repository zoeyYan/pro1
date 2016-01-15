function postApply(data) {
    console.log(data);
    Net.postApply(data, function (result) {
        var num = result;
        console.log(num);
        if (num == 3) {
        	$(".black").hide();
            alert("您提交次数已超过三次！不能再次提交！");
            window.location.href = "index.html"; 	
        } else {
            alert('提交成功！');
            window.location.href = "index.html";
        }
    });
}
function myreset(){
	$('#reset').bind('click',function(){
		window.location.reload();
	});
}
myreset();
var flag=false;
var a=false;
var b=false;
var c=false;
var d=false;
var e=false;
var f=false;
var g=false;
var h=false;
var i=false;
var j=false;
var k=false;
var l=false;
var m=false;
var n=false;
function getAreaID() {
		var area = 0;
		 if ($("#seachcity").val() != "0") {
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

function checkval(t) {
		    var re =  /[`~@#\$%\^\€\＊\₩\£\•\「」\&\*\(\)_\+<>"\{\}\\\/'\[\]]/im;//去非法字符
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
function vilidata(){
	console.log(flag)
	$('#name1').bind('blur',function(){
		var nameval=$.trim($('#name1').val());
		var namelength=$.trim($('#name1').val().length);
		if(nameval==""){
			$('#nameReminder').show();
			a= false;
		}else if(!checkval1(nameval)){
			$('#nameReminder').show();
			a= false;
		}else if(namelength>15){
			$('#nameReminder').show();
			a=  false;
		}else{
			$('#nameReminder').hide();
			a= true;
			console.log(a)
		}
	});
	$('#sex').bind('blur',function(){
		var sexval=$.trim($(this).val());
		console.log(sexval);
		if(sexval==""||sexval==0){
			$('#sexReminder').show();
			b= false;
		}else{
			$('#sexReminder').hide();
			b= true;
		}
	});
	$('#age').bind('blur',function(){
		var ageval=$.trim($(this).val());
		var r=/^[1-9]\d?(\.[1-9])?$/;
		if(ageval==""){
			$('#ageReminder').show();
			c= false;
		}else if(!r.test(ageval)){
			$('#ageReminder').show();
			c= false;
		}else{
			$('#ageReminder').hide();
			c= true;
		};
	});
	$('#seachprov').bind('blur',function(){
		var seachprovval=$.trim($(this).val());
		var item = document.getElementById("seachprov"); 
		var text = item.options[item.selectedIndex].text; 
		console.log(text);
//		console.log(seachprovval);
		if(seachprovval==""||seachprovval==0){
			$('#cityReminder').show();
			d= false;
		}else{
			$('#cityReminder').hide();
			d= true;
			
		}
	});
	$('#seachcity').bind('blur',function(){
		var seachcityval=$.trim($(this).val());
		var item = document.getElementById("seachcity"); 
		var text = item.options[item.selectedIndex].text; 
		console.log(text);
//		console.log(seachcityval);
		if(seachcityval==""||seachcityval==0){
			$('#cityReminder').show();
			e= false;
		}else{
			$('#cityReminder').hide();
			e= true;
			
		}
	});
//	$('#edu').bind('blur',function(){
//		var eduval=$.trim($(this).val());
//		if(eduval==""||eduval==0){
//			$('#eduReminder').show();
//			f= false;
//		}else{
//			$('#eduReminder').hide();
//			f= true;
//			
//		}
//	});
	$('#phone').bind('blur',function(){
		var myreg = /^1[3,5,8,4,7,6]\d{9}$/;
		var phoneval=$.trim($(this).val());
		var phonelength=$.trim($(this).val().length);
		if(phoneval==""){
			$('#phoneReminder').show();
			g= false;
		}else if(phonelength>12){
			$('#phoneReminder').show();
			g= false;
		}else if(!myreg.test(phoneval)){
			$('#phoneReminder').show();
			g= false;
		}
		else{
			$('#phoneReminder').hide();
			g= true;
			
		}
	});
	$('#email').bind('blur',function(){
		var re = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
		var emailval=$.trim($(this).val());
		if(emailval==""){
			$('#emailReminder').show();
			h= false;
		}else if(!re.test(emailval)){
			$('#emailReminder').show();
			h= false;
		}
		else{
			$('#emailReminder').hide();
			h= true;
			
		}
	});
//	$('#marry').bind('blur',function(){
//		var marryval=$.trim($(this).val());
//		if(marryval==""||marryval==0){
//			$('#marryReminder').show();
//			i= false;
//			
//		}else{
//			$('#marryReminder').hide();
//			i= true;
//			
//		}
//	});
	$('#ways').bind('blur',function(){
		var waysval=$.trim($(this).val());
		var wayslength=$.trim($(this).val().length);
		if(waysval==""){
			$('#waysReminder').show();
			j= false;
		}else if(checkval(waysval)){
			$('#waysReminder').show();
			j= false;
		}else if(wayslength>200){
			$('#waysReminder').show();
			j= false;
		}
		else{
			$('#waysReminder').hide();
			j= true;
			
		}
	})
//	$('#experience').bind('blur',function(){
//		var experienceval=$.trim($(this).val());
//		var experiencelength=$.trim($(this).val().length);
//		if(experienceval==""){
//			$('#expReminder').show();
//			k= false;
//		}else if(checkval(experienceval)){
//			$('#expReminder').show();
//			k= false;
//		}else if(experiencelength>200){
//			$('#expReminder').show();
//			k= false;
//		}
//		else{
//			$('#expReminder').hide();
//			k= true;
//			
//		}
//	});
//	$('#myself').bind('blur',function(){
//		var myselfval=$.trim($(this).val());
//		var myselflength=$.trim($(this).val().length);
//		if(myselfval==""){
//			$('#myselfReminder').show();
//			l= false;
//		}else if(checkval(myselfval)){
//			$('#myselfReminder').show();
//			l= false;
//		}else if(myselflength>200){
//			$('#myselfReminder').show();
//			l= false;
//		}
//		else{
//			$('#myselfReminder').hide();
//			l= true;
//			
//		}
//	});
//	$('#opinoin').bind('blur',function(){
//		var opinoinval=$.trim($(this).val());
//		var opinoinlength=$.trim($(this).val().length);
//		if(opinoinval==""){
//			$('#opinoinReminder').show();
//			m= false;
//		}else if(checkval(opinoinval)){
//			$('#opinoinReminder').show();
//			m= false;
//		}else if(opinoinlength>200){
//			$('#opinoinReminder').show();
//			m= false;
//		}
//		else{
//			$('#opinoinReminder').hide();
//			m= true;
//			
//		}
//	});
//	$('#selfExperience').bind('blur',function(){
//		var selfExperienceval=$.trim($(this).val());
//		var selfExperiencelength=$.trim($(this).val().length);
//		if(selfExperienceval==""){
//			$('#selfexpRenminder').show();
//			n= false;
//		}else if(checkval(selfExperienceval)){
//			$('#selfexpRenminder').show();
//			n= false;
//		}else if(selfExperiencelength>200){
//			$('#selfexpRenminder').show();
//			n= false;
//		}
//		else{
//			$('#selfexpRenminder').hide();
//			n= true;
//		}
//	});
	flag=a & b & c & d & e & g & h & j
	console.log(flag)
	return flag;	
}; 	

vilidata();
$('#submit').bind('click',function(){
			flag=vilidata();
			console.log(flag);
			if(flag){
				$(".black").show();
				var name1=$("#name1").val();
				var	sex1=$("#sex").val();
				var item = document.getElementById("seachprov"); 
				var text1 = item.options[item.selectedIndex].text;
				var item1 = document.getElementById("seachcity"); 
				var text2 = item1.options[item1.selectedIndex].text;
				var province1=text1;
				var city1=text2;
				var phone1=$('#phone').val();
				var mail1=$('#email').val();
				var make_money1=$('#ways').val();
				var age1=$('#age').val();
				var data = {
                 name: name1,
				 sex: sex1,
				 age:age1,
				 province: province1,  
				 city: city1,          
				 phone :phone1,
				 mail : mail1,           
				 makeMoney :make_money1,                         
            };
            postApply(data);
			}else{
				$(".black").hide();
				alert("请填写正确信息");
				if(a==false){$('#nameReminder').show();};
				if(b==false){$('#sexReminder').show();};
				if(c==false){$('#ageReminder').show();};
				if(d==false){$('#cityReminder').show();};
				if(e==false){$('#cityReminder').show();};
				if(g==false){$('#phoneReminder').show();};
				if(h==false){$('#emailReminder').show();};
				if(j==false){$('#waysReminder').show();};
			}
		});
$(function(){
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
});
