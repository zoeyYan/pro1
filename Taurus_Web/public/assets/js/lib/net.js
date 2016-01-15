
var link_pack={
   APP_link  :"http://stock.24-7.com.cn/",
//    APP_link  :"http://stocktest.24-7.com.cn/",
   assets: "assets/",
//链接指向index；
    links: "index.html",
    //链接指向ask.html
    linkask: "ask.html",

}
var Api={

	 APP_ADDR                    : "http://galaxy214.24-7.com.cn/", 
//	 APP_ADDR                    : "http://testfcwm.24-7.com.cn/", 
//	 APP_ADDR					 :"http://192.168.10.78:9000/",	 
	  //登陆(微信)
     POST_LOGIN_WITH_APP      	 : "account/loginWithApp/7248d7fc-1fab-45a6-87fe-5b57e03ac425",
     //报名直通车
     POST_APPLY					 : "stock/entry/new",
     //首页广告栏
     GET_HOME_BANNER			 :"banner/small",
     //视频
     GET_BANNER_VIDEO            :"banner/video",
     //制定的视频
     GET_LAGRGE_VIDEO            :"banner/large",
     //热门策略
     GET_HOT_STRATEGY            :"plaza/theme/enter/{0}/{1}/{2}",     
     //获取地区
     GET_GEO_ADDRESS			 :"geo/address/{0}/{1}",
     //id获取个人资料
     GET_USER_PROFILE_Id	:"users/profile/{0}",
     //获取个人资料
     GET_USER_PROFILE  	        : "users/profile",
    //修改设置数据
    POST_USERS_PROFILE_CURRENT    :"users/profile/current",  
    //获取首页操盘手数据
	GET_USERS_INFO				:"users/readAll",
	//获取其它人个人资料
	GET_OTHERS_INFO				:"users/profile/{0}",
	  //获取关注数
    GET_USERS_INTEREST            :"users/interest/number",    
    //获取关注数
    GET_USERS_INTEREST_BY_ID      :"users/interest/number/{0}",
     //关注
    POST_USERS_INTEREST           :"users/interest/new",    
    //取消关注
    DELETE_USERS_INTEREST         :"users/interest/cancellation/{0}",
    //查询关系
    GET_USERS_INTEREST_ISFAN      :"users/interest/isfan/{0}",
    //查看策略/文章详情页
    GET_ARTICLE_INFO			  :"plaza/theme/articleRead/{0}",
    //社区首页数据
    GET_BBS_INFO				   :"plaza/article/readAll/{0}/{1}",
    //社区帖子详情
    GET_ARTICLE_READ			  :"plaza/theme/articleRead/{0}",
     //评论
    POST_COMMENT_NEW       :"plaza/comment/post",
     //二级回复
    GET_COM2    :"plaza/commentLevel2/readAll/{0}/{1}/{2}",
    //二级回复
    POST_COM2    :"plaza/commentLevel2/post",
    //读评论 
    GET_COMMENT       :"plaza/comment/readAll/{0}/{1}/{2}",
    //评论
    POST_COMMENT_NEW       :"plaza/comment/post",
    //点赞
    POST_THUMB     :"plaza/article/thumb/{0}/{1}/{2}",
     //发帖
    POST_ARTICLE_NEW       :"stock/article/post/{0}",
     //删帖
    POST_ARTICLE_DEL       :"plaza/article/delete",
    //用户的荐股记录
    GET_UESR_RECOMMAND_RECORD :"stock/recommend/readById/{0}",
    //排行榜周榜(元老汇)
    GET_ORDER_BYWEEK	   :"stock/week/{0}/{1}",
    //排行榜日榜(元老汇)
    GET_ORDER_BYDAY		   :"stock/day/{0}/{1}",
    //排行榜月榜(元老汇)
    GET_ORDER_BYMONTH	   :"stock/month/{0}/{1}",
    //排行榜(平民级)
    GET_ORDERCOM_BYDAY    :"stock/dayCommon/{0}/{1}",
    GET_OREDERCOM_BYWEEK  :"stock/weekCommon/{0}/{1}",
    GET_ORDERCOM_BYMONTH  :"stock/monthCommon/{0}/{1}",
    //搜索股票列表
    GET_LIST_STOCK		  :"stock/like/{0}/{1}/{2}",
    //自己的帖子
    GET_MY_ARTICLE     :"plaza/article/readMyself/{0}/{1}/{2}",
    //我要荐股
    GET_MY_RECOMMAND   :"stock/recommend/new/{0}",
    //登陆
    GET_MY_LOGIN	   :"stock/sign/today",
    //分享
    POST_STOCK_SHARE_POINT :"stock/share/point",
   //进入圈子
    GET_ENTER_THEME        :"plaza/theme/enter/{0}/{1}/{2}",
    //加入圈子
    POST_JOIN_THEME         :"plaza/theme/join/{0}",
     //查看我的圈子
    GET_MY_THEME        :"plaza/theme/myTheme/{0}/{1}/{2}",
    //退出圈子
    POST_EXIT_THEME     :"plaza/theme/exit/{0}",
    //查询圈子状态
    GET_INORNOT     :"stock/theme/isInOrNot/{0}",
    //获取积分
    GET_MY_SOCRE     :"stock/point/read/{0}",
    //查看我的圈子
    GET_MY_THEME        :"plaza/theme/myTheme/{0}/{1}/{2}",
    //查看今日荐股记录
   GET_MY_RECORD_TODAY	:"stock/recommend/readToday/{0}",
   //分享
   POST_STOCK_SHARE_POINT :"stock/share/point",
    //粉丝列表
	GET_FANS_LIST				:"users/interest/other/{0}/{1}/{2}",	
	//关注列表
    GET_INT_LIST               :"users/interest/me/{0}/{1}/{2}", 
    GET_FANS_LISTALL           :"stock/interest/other/{0}/{1}/{2}",
}
/**
 * 在每个API地址前加上APP_ADDR
 */
for (var i in Api) {
  if (i !== "APP_ADDR") {
    Api[i] = Api.APP_ADDR + Api[i];
  }
}

/**
 * 封装请求方法
 */
var Net={
	 loginWithApp : function(data,callback){
      $.ajax({
        async:false,
        url  : Api.POST_LOGIN_WITH_APP,       
        type : "post",
        data : data,
        success : callback
      });
   },
	 postApply:function(data,callback){
//	 	$.post(Api.POST_APPLY,data,callback);
		$.ajax({
			url:Api.POST_APPLY,
			type:"post",
			xhrFields: {
             withCredentials: true
            },
			data:data,
			success: callback
		})
	 },
	 getHomeBanner:function(callback){
	 	$.ajax({
	 		url:Api.GET_HOME_BANNER,
	 		type:"get",
	 		xhrFields: {
            withCredentials: true
            },
	 		success:callback
	 	});
	 },
	 getHotStrategy:function(periods,page,size,callback){
	 	$.get(Api.GET_HOT_STRATEGY.format(periods,page,size),callback);
	 },
	 getGeoAddress:function(lat,lng,callback){
	 	$.get(Api.GET_GEO_ADDRESS.format(lat,lng),callback);
	 },
	 getUserProfileById:function(id,callback){
//	    $.ajax({
//	    	type:"get",
//	    	url:Api.GET_USER_PROFILE,
//	    	async:true,
//	    	success : callback
//	    });
        $.get(Api.GET_USER_PROFILE_Id.format(id),callback);
	 },
	 getUserProfile:function(callback){
	    $.ajax({
	    	type:"get",
	    	url:Api.GET_USER_PROFILE,
	    	async:true,
	    	success : callback
	    });
//      $.get(Api.GET_USER_PROFILE.format(id),callback);
	 },
	 modifyInfo:function(data,callback){
     	$.ajax({
     		url:Api.POST_USERS_PROFILE_CURRENT,
     		type:"post",
     		success:callback,
     		data:data,
     		xhrFields: {
            withCredentials: true
            }
     	})
     },
     getUsersInfo:function(callback){
//   	$.get(Api.GET_USERS_INFO,callback);
		$.ajax({
			url:Api.GET_USERS_INFO,
			type:"get",
			xhrFields: {
            withCredentials: true
            },
			success:callback
		})
     },
     getOthersInfo:function(data,callback){
//   	$.get(Api.GET_OTHERS_INFO.format(data),callback);
		$.ajax({
			url:Api.GET_OTHERS_INFO.format(data),
			type:"get",
			data:data,
			xhrFields: {
            withCredentials: true
            },
			success:callback
		});
     },
     getOthersInterst:function(data,callback){
     	$.get(Api.GET_USERS_INTEREST_BY_ID.format(data),callback);
	    
     },
     postUsersInterest  :   function(id,callback){
    	$.post(Api.POST_USERS_INTEREST,{"interesteeId":id},callback);
    },    
    deleteUsersInterest  :   function(id,callback){
    	$.post(Api.DELETE_USERS_INTEREST.format(id),callback);
    },
    getUsersInterestIsfan  :   function(id,callback){
    	$.get(Api.GET_USERS_INTEREST_ISFAN.format(id),callback);
    },
    getArticleInfo: function(data,callback){
    	$.get(Api.GET_ARTICLE_INFO.format(data),callback)
    },
    getBbsInfo: function(page,size,callback){
    	$.get(Api.GET_BBS_INFO.format(page,size),callback);
    },
    getBlogInfo:function(data,callback){
    	$.get(Api.GET_ARTICLE_READ.format(data),callback);
    },
    postCommentNew: function(data,callback){
        $.post(Api.POST_COMMENT_NEW,data,callback);
    },
    getCom2: function(id,page,size,callback){
        $.get(Api.GET_COM2.format(id,page,size),callback);
    },
    getComment: function(id,page,size,callback){
        $.get(Api.GET_COMMENT.format(id,page,size),callback);
    },
    postCommentNew: function(data,callback){
        $.post(Api.POST_COMMENT_NEW,data,callback);
    },
    postCom2: function(data,callback){
        $.post(Api.POST_COM2,data,callback);
    },
    postArticleNew: function(num,data,callback){
        $.post(Api.POST_ARTICLE_NEW.format(num),data,callback);
    },
    postArticleDel: function(data,callback){
        $.post(Api.POST_ARTICLE_DEL,data,callback);
    },
    postPostThumb: function(type,id,val,callback){
        $.post(Api.POST_THUMB.format(type,id,val),callback);
    },
    getUserRecommandRecord:function(id,callback){
    	$.get(Api.GET_UESR_RECOMMAND_RECORD.format(id),callback);
    },
    getOrderByMonth:function(page,size,callback){
    	$.get(Api.GET_ORDER_BYMONTH.format(page,size),callback);
    },
    getOrderByWeek:function(page,size,callback){
    	$.get(Api.GET_ORDER_BYWEEK.format(page,size),callback);
    },
    getOrderByDay:function(page,size,callback){
    	$.get(Api.GET_ORDER_BYDAY.format(page,size),callback);
    },
    getOrdercomByMonth:function(page,size,callback){
    	$.get(Api.GET_ORDERCOM_BYMONTH.format(page,size),callback);
    },
    getOrdercomByWeek:function(page,size,callback){
    	$.get(Api.GET_OREDERCOM_BYWEEK.format(page,size),callback);
    },
    getOrdercomByDay:function(page,size,callback){
    	$.get(Api.GET_ORDERCOM_BYDAY.format(page,size),callback);
    },
    getListStock:function(words,page,size,callback){
    	$.get(Api.GET_LIST_STOCK.format(words,page,size),callback);
    },
    getMyAriticle:function(id,page,size,callback){
    	$.get(Api.GET_MY_ARTICLE.format(id,page,size),callback);
    },
    getMyRecommand:function(data,callback){
//  	$.get(Api.GET_MY_RECOMMAND.format(data),callback);
			$.ajax({
				type:"get",
				url:Api.GET_MY_RECOMMAND.format(data),
				async:true,
				success:callback,
				error:function(){
					alert("推荐失败！请检查您的网络连接!");
				}
			});
    },
    getMyLogin:function(callback){
    	$.ajax({
             url:Api.GET_MY_LOGIN,
             type:"get",
             xhrFields: {
             withCredentials: true
             },
             success:callback
        });
    },
    getGroupInfo:function(words,page,size,callback){
    	$.get(Api.GET_GROUP_INFO.format(words,page,size),callback);
    },
    getEnterTheme: function(id,page,size,callback){
        $.get(Api.GET_ENTER_THEME.format(id,page,size),callback);
    },
    postJoinTheme: function(id,callback){
        $.post(Api.POST_JOIN_THEME.format(id),callback);
    },
    getMyTheme: function(id,page,size,callback){
        $.get(Api.GET_MY_THEME.format(id,page,size),callback);
    },
    postExitTheme: function(id,callback){
        $.post(Api.POST_EXIT_THEME.format(id),callback);
    },
    getInOrNot: function(id,callback){
        $.get(Api.GET_INORNOT.format(id),callback);
    },
    getMyScore:function(id,callback){
    	$.get(Api.GET_MY_SOCRE.format(id),callback);
    },
    getSmallVideo:function(callback){
    	$.get(Api.GET_BANNER_VIDEO,callback);
    },
    getLargeVideo:function(callback){
    	$.get(Api.GET_LAGRGE_VIDEO,callback);
    },
    getMyTheme: function(id,page,size,callback){
        $.get(Api.GET_MY_THEME.format(id,page,size),callback);
    },
    getMyRecordToday:function(id,callback){
    	$.get(Api.GET_MY_RECORD_TODAY.format(id),callback);
    },
    postSharePoint:function(data,callback){
    	$.post(Api.POST_STOCK_SHARE_POINT,data,callback);
    },
    getFansList  :   function(id,page,size,callback){
    	$.get(Api.GET_FANS_LIST.format(id,page,size),callback);
    },
    getIntList  :   function(id,page,size,callback){
    $.get(Api.GET_INT_LIST.format(id,page,size),callback);
    },
    getFansListAll:function(id,page,size,callback){
    	$.get(Api.GET_FANS_LISTALL.format(id,page,size),callback);
    }
};
var STOCK_USER_ID = "";
Net.getUserProfile(function(result){	
	 STOCK_USER_ID=result.id.accountId;
});
//Net.loginWithApp({username: openId,type: 1},function(result){STOCK_USER_ID = result.id; console.log(STOCK_USER_ID)});