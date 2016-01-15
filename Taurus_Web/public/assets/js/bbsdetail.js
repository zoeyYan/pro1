var parmas = parseUrlParam(window.location.href);
var articleId=parmas.articleId;
var artId="";
var STOCK_USER_ID = "";
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
		 $('.onCommit').click(function(){
			  	$('.showCom').hide();
			  	$('.replyShow').show();
			  	$('.sendBtn_rp').click(function(){
					var falg=false;
					falg=vilidata();
					if(falg){
						postCommit();
						alert("评论成功");
						window.location.reload();
						$('.replyShow').hide();
						$('.showCom').show();
					}else{
						alert("评论失败!");
					}
		})
  		 });
		  $('.cancleBtn_rp').click(function(){
			  	$('.showCom').show();
			  	$('.replyShow').hide();
		  });
		 
	},
	getBlogInfo:function(){		
				Net.getBlogInfo(articleId,function(result){
				$('.headBolg').handlebars($("#blog-item"),result,true);
				var ctime=$('.time').attr('time');
				var now = new Date().getTime();
	            time =Math.floor((now - ctime)/60000);
		        if(time<=60){
		                   if(time>=0){
		                      $('.time').text(time+"分钟前");    
		                   }
		                   else{
		                       $('.time').text("0分钟前");  
		                   }
		        }else{
		                   if(time<1440){
		                       time=Math.floor(time/60)
		                       $('.time').text(time+"小时前");
		                   }
		                   else{
		                       time=Math.floor(time/1440)
		                       $('.time').text(time+"天前");
		                   }
		                   
		        }		        
		       
	            	var str=$('.contentInfo22222').html();
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
				   console.log(str);
				   $('.contentInfo').html(str);
          
		        $('.headImg').click(function(){
		        	var pId=$(this).attr("pid");
		        	if(pId==STOCK_USER_ID){
		        		window.location.href="myself.html";
		        	}else{
		        		window.location.href="member.html?id="+pId;
		        	}
		         });
				main.self();				
			})
		
		
	},
	fallShow:function(){
		 $(".container").on('scroll', function (e) {
           if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
               main.getCommitInfo();  
           }
         
      	});
      
	},
	getCommitInfo:function(){		
		var win = $(".container");
	    var list = $(".commitItem");
	    var page = win.data("page");
	    var size = win.data("size");
	    var isfor = win.data("isfor");
	    if (!isfor) {
	       win.data("isfor",true);
			        Net.getComment(articleId,page,size,function(result){
			        	console.log(result);
			            win.data("isfor",false);
			            if (result.length > 0) {
			                $(".commitItem").handlebars($("#comment-tmp"),result,true);
			                win.data("page",page + 1);
			                
				            $('.homeCommit').each(function(){
				            	var ctime=$(this).find('.bbsTime').attr('time');
								var now = new Date().getTime();
					            time =Math.floor((now - ctime)/60000);
					             if(time<=60){
					                   if(time>=0){
					                      $(this).find('.bbsTime').text(time+"分钟前");    
					                   }
					                   else{
					                       $(this).find('.bbsTime').text("0分钟前");  
					                   }
							        }else{
						                   if(time<1440){
						                       time=Math.floor(time/60)
						                       $(this).find('.bbsTime').text(time+"小时前");
						                   }
						                   else{
						                       time=Math.floor(time/1440)
						                       $(this).find('.bbsTime').text(time+"天前");
						                   }
							                   
							        }
				            })
				            
				            $('.bbsHeadImg').on('click',function(){
				            	var pId=$(this).attr("pId");
				            	if(pId==STOCK_USER_ID){
				 				  window.location.href="myself.html";
					 			}else{
					 				 window.location.href="member.html?id="+pId;
					 			}
				            });
					       
				            $.each($(".bbsHead"),function(i){
			                    item=$("#secondCommit-"+i);
			                    id=$(".bbsHead").eq(i).data("id");
			                    main.getCommitInfo2(id,item);	                   
			                });
			                 $('.mms').each(function(){
			                    	$(this).click(function(){
			                    			var ids=$(this).attr('artId');
			                    			$('.showCom').hide();
					  						$('.replyShow').show();
							  				$('.sendBtn_rp').click(function(){
							  					var falg=false;
												falg=vilidata();
												if(falg){
													postCommit2(ids);
													$('.showCom').show();
					  								$('.replyShow').hide();
					  								alert("评论成功！");
					  								window.location.reload();
												}else{
													alert("评论失败！");
												}
							  					
							  				})					  					
			                    	})
			                    })
			                
			            }
			        });
	    }
	},
	getCommitInfo2:function(id,item){
		  page=0;
		  size=30;
		  	  Net.getCom2(id,page,size,function(result){
			      if(result.length!==0){
			          item.handlebars($("#com2-tmp"),result);
			           $('.secondCommit').each(function(){
	               	 	var len=$(this).find('.bbsWords').length;
	               	 	$(this).parent().find('.bbsCommitNum').text(len);
	               	  });
			          $('.commitName').on('click',function(){			          	  
			          	  var pId=$(this).attr("pId");
				            	if(pId==STOCK_USER_ID){
				 				  window.location.href="myself.html";
					 			}else{
					 			 window.location.href="member.html?id="+pId;
					 	  }
			          })
			      }	  	  
		 	  });
		 
	},
	postPostThumb:function(id,val,self){
		   type=0;
		  Net.postPostThumb(type,id,val,function(result){
		      var count=self.find('.likeNum').text();
		      console.log(count);
		      self.find('.like').css({"animation": "bigsmall 1s alternate linear"},{"-webkit-animation": "bigsmall 1s alternate linear"});
		      self.find('.num').text(+count+1);		     
		  }); 
	},
	postPostThumb2:function(id,val,self){
		   type=1;
		  Net.postPostThumb(type,id,val,function(result){
		      var count=self.siblings().text();
		      self.css({"animation": "bigsmall 1s alternate linear"},{"-webkit-animation": "bigsmall 1s alternate linear"});
		      self.siblings().text(+count+1);		
		  }); 
	},
	init:function(){
		this.getBlogInfo();
		this.getCommitInfo();
		this.fallShow();
	}
};

$(function(){
    Net.getUserProfile(function(result){
         STOCK_USER_ID=result.id.accountId;
         main.init();
    });
  
  $("article").on("click",".upLike",function(){		
	    var id=$(this).attr("ariticleId");	    
	    self=$(this);
        var val="up";
        main.postPostThumb(id,val,self);
    });
  $('article').on('click','.bbsLikeLabel',function(){
  		var id=$(this).attr("artId");	    
	    self=$(this);
        var val="up";
        main.postPostThumb2(id,val,self);
  });
    
})
