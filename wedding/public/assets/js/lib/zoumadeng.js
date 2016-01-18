// JavaScript Document

$.lstzmd=function(box,scale,sudu,zhouqi,prev,next){
	
	var roli=box.find('li');
	if(roli.length<3){
		return false;	
	}
	var ln=roli.length;	
	var nclick=1;
	var biaozhi=true;
	
	var boxw=box.width(),
		boxh=box.height(),
		imgw=roli.width(),
		imgh=roli.height();
		borderl=roli.outerWidth()-imgw+50;
		bordert=roli.outerHeight()-imgh+50;
		console.log(imgw);
		console.log(imgh);
	
	var jjw=(boxw-imgw-borderl)/2;
	var aorder=new Array();
	var data=new Array();				
	inidata();
	
	var timer=null;
	play();	
	
	roli.click(function(){
		if(!biaozhi){
			return false;	
		}
		clearTimeout(timer);
		if(parseInt($(this).css('left'))>=jjw){
			nclick=1;
		}else{
			nclick=-1;
		}
		play();
	});	
	
	if(prev!=null && next!=null){	
		prev.click(function(){
			if(!biaozhi){
				return false;	
			}
			clearTimeout(timer);
			nclick=-1;
			play();
		});	
		
		next.click(function(){
			if(!biaozhi){
				return false;	
			}
			clearTimeout(timer);
			nclick=1;
			play();
		});	
	}
	
	function play(){		
		biaozhi=false;
		for(i=0; i<ln; i++){
			aorder[i]+=nclick;
			if(aorder[i]<0){
				aorder[i]=ln-1;
			}else if(aorder[i]>=ln){
				aorder[i]=0;
			}
			roli.eq(aorder[i]).attr('lstindex',data[i][0]).animate({width:data[i][1],height:data[i][2],top:data[i][3],left:data[i][4]+25},sudu);
		}
		
		setTimeout(function(){
			roli.each(function(){
				$(this).css('zIndex',$(this).attr('lstindex'));
			});
		},sudu/2.5);
		
		setTimeout(function(){
			biaozhi=true;	
		},sudu);
		
		//timer=setTimeout(play,zhouqi);
		nclick=1;
		
	}
	
	function inidata(){
		
		for(var j=0,a=0,b=ln>=5?2:1; j<=2*b; j++){
			a=Math.abs(j-b);
			data[j]=new Array(j>b?j%b:j,imgw*Math.pow(scale,a),imgh*Math.pow(scale,a));
			data[j].push((boxh-data[j][2]-bordert)/2);
		}
		data[0].push(0);
		data[b].push(jjw);
		data[Math.ceil(0.5*b)].push(jjw/3);
		data[2*b].push(boxw-data[2*b][1]-borderl);
		data[Math.ceil(1.5*b)].push(boxw-jjw/3-data[Math.ceil(1.5*b)][1]-borderl);
		
		while(j<ln){
			data.push(new Array(-1,0,0,boxh/2,boxw/2));
			j++;
		}
		
		for(a=0; a<j; a++){
			aorder[a]=a;
		}
	}
}	
