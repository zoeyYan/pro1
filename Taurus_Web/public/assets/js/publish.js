var parmas = parseUrlParam(window.location.href);
var status=parmas.status;
var id=parmas.id;
var main={
	getMyAriticle:function(){
		var list = $(".art-container");
	    var page = list.data("page");
	    var size = list.data("size");
		var isfor = list.data("isfor");
		if(id==""){
			if (!isfor) {
				list.data("isfor",true);
					Net.getMyAriticle(STOCK_USER_ID,page,size,function(result){
						if(page==0&&result.length==0){
							$('.back').show();
						}else{
							$('.back').hide();
							list.data("isfor",false);	
							console.log(result);
							$(".art-container").handlebars($("#art-tmp"),result,true);
							list.data("page",page + 1);
							$(".a-del").on('click',function(){
								var article_id=$(this).attr("ariticleId");
								var self=$(this).parent();
								if(status!=0){
									main.deleAriticle(article_id,self);
								}							
							});	
						}
										
				});		
			}	
		}else{
			list.data("isfor",true);
					Net.getMyAriticle(id,page,size,function(result){
						if(page==0&result.length==0){
							$('.back').show();
						}else{
							$('.back').hide();
							list.data("isfor",false);	
							console.log(result);
							$(".art-container").handlebars($("#art-tmp"),result,true);
							list.data("page",page + 1);
							$(".a-del").on('click',function(){
								var article_id=$(this).attr("ariticleId");
								var self=$(this).parent();
								if(status!=0){
									main.deleAriticle(article_id,self);
								}							
							});		
						}
									
				});	
		}
		
	},
	deleAriticle:function(article_id,self){
		data = {"article_id":article_id};
	    swal({   title: "是否删除？",   type: "warning",   showCancelButton: true,   confirmButtonColor: "#DD6B55",   confirmButtonText: "确定",cancelButtonText: "取消",   closeOnConfirm: false }, function(){   
	        Net.postArticleDel(data,function(result){
	            $(".art-container").data("page",0);
	            self.remove();
	            swal("删除成功!")
	        })
	        
	    });
	},
	init:function(){
		this.getMyAriticle();
	}
};


$(function(){
	var data = [{title: "Jimmy"}, {title: "Sally"},{title:"alice"}];	
	main.init();
	
	$('.art-container').on('scroll',function(){	
    	if ($(this).scrollTop() + $(this).height() > $(this).height() + 10) {
            main.getMyAriticle();
         }
    });
})
