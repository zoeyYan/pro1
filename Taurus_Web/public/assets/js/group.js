var parmas = parseUrlParam(window.location.href);
var theme_id=parmas.theme_id;
function unique(arr) {
	    var resultA = [], hash = {};
	    for (var i = 0, elem; (elem = arr[i]) != null; i++) {
	        if (!hash[elem]) {
	            resultA.push(elem);
	            hash[elem] = true;
	        }
	    }
	    console.log(resultA);
	    return resultA;
}
var main={
	self:function(){
		var height=$('.itemImg').width();
		$('.itemImg').css('height',height);	
	},
	getTopicInfo:function(){
		var list = $(".topicItem");
	    var page = list.data("page");
	    var size = list.data("size");
    	var isfor = list.data("isfor");
    	if (!isfor) {
       	list.data("isfor",true);
        Net.getEnterTheme(theme_id,page,size,function(result){
        	var result=result.rows;
        	var stock=result[0].theme_id;
        	var engNum=stock.replace(/[^a-z]+/ig,"");
        	var aNum=stock.replace(/[^0-9]+/ig,"");
        	$('#engNum').text(engNum);
        	$("#aNum").text(aNum);
        	$('.grStockName').text(result[0].theme_name);
            list.data("isfor",false);
            $(".topicItem").handlebars($("#article-topic"),result,true);
            for(var i=0;i<result.length;i++){
            	var chContent=result[i].content;
            	var substr = chContent.match(/\@=?(\S*)/g);
            	chContent=substr+chContent;
            	var reg = /(.)(?=.*\1)/g;
            	var lastWord=chContent.replace(reg, "");
            	console.log(lastWord);
            }
            main.self();
            list.data("page",page + 1);
            $('.themeName').on('click',function(e){
            	e.stopPropagation();            	
            });            
            $('.itemBg').on('click',function(){
            	var articleId=$(this).attr("articleId");
            	window.location.href="bbsdetail.html?articleId="+articleId;
            });
            $('.upLike').on('click',function(e){
		        e.stopPropagation();
		        var id=$(this).attr("ariticleId");	    
			    self=$(this);
		        var val="up";
		        main.postPostThumb(id,val,self);
    		});
            $('.stockInfo').each(function(j){
            	var str=$(this).parent().find('.stockInfo2222').html();
               	res = str.match(/#.*?#/g);
                res3=str.match(/@.*? /g); 
                console.log(res3);
                if(res3!=null){
                	res3=unique(res3);
                }           
        		if(res!=null){
        			for(var i=0;i<res.length;i++){
    					str=str.replace(res[i],"<span class='mmsTopic'>"+res[i]+"</span>");
    				}
        		}
        		if(res3!=null){        			
        			for(var i=0;i<res3.length;i++){
        				var reg=new RegExp(res3[i],'g');
        				str=str.replace(reg,"<span class='mmsStock'>"+res3[i]+"</span>")
        			}
        		}
				$(this).html(str);
            });
            $('.time').each(function(){
            	var creatTime=$(this).attr('ctime');
            	var now = new Date().getTime();
            	var time =Math.floor((now - creatTime)/60000);
            	if(time<=60){
                       if(time>=0){
                           $(this).text(time+"分钟前");    
                       }
                       else{
                            $(this).text("0分钟前");  
                       }
                }else{
                       if(time<1440){
                           time=Math.floor(time/60)
                           $(this).text(time+"小时前");
                       }
                       else{
                           time=Math.floor(time/1440)
                           $(this).text(time+"天前");
                       }                       
                   }
            });
            $.each($(".homeCommit"),function(i){
		           self=$(".homeCommit").eq(i).find(".commitFirst");
		           val=self.html();
		           val=replace_str(val);
		           self.html(val);
      		});
    	 });   	 
    	 }
	},
	postPostThumb:function(id,val,self){
		   type=0;
		  Net.postPostThumb(type,id,val,function(result){
		      var count=self.find('.likeNum').text();
		      self.find('.like').css({"animation": "bigsmall 1s alternate linear"},{"-webkit-animation": "bigsmall 1s alternate linear"});
		      self.find('.num').text(+count+1);		     
		  }); 
	},
	groupInfo:function(){
		Net.getInOrNot(theme_id,function(result){
		    if(result){
		       $('.add').show();
		    }else{
		       $('.exit').show();	
		    }
		});		
		$('.exit').click(function(){
			$(this).hide();
			$(this).siblings().show();
				
			Net.postJoinTheme(theme_id,function(result){
			});
		});
		$('.add').click(function(){
			$(this).hide();
			$(this).siblings().show();
			Net.postExitTheme(theme_id,function(result){
				
			})
		})
		
	},
	init:function(){
		this.groupInfo();
		this.getTopicInfo();		
	}
}
$(function(){
	 main.init();
	$(window).scroll(function(){
	　　var scrollTop = $(this).scrollTop();
	　　var scrollHeight = $(document).height();
	　　var windowHeight = $(this).height();
	　　if(scrollTop + windowHeight == scrollHeight){
	　　　  main.getTopicInfo();
	　　}
	});
	$("article").on("click",".upLike",function(){		
	    var id=$(this).attr("ariticleId");	    
	    self=$(this);
        var val="up";
        main.postPostThumb(id,val,self);
    });
});
