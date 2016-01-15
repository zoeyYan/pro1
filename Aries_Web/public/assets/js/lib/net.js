/**
 * 数据请求地址
 */
// var WS_ADDR = "ws://120.131.81.63:8090/chatRoom/join?userId={0}";
      var WS_ADDR = "ws://galaxy.24-7.com.cn/chatRoom/join?userId={0}";
//var WS_ADDR = "ws://testfcwm.24-7.com.cn/chatRoom/join?userId={0}";
// var WS_ADDR = "ws://192.168.1.184:9000/chatRoom/join?userId={0}";
   var Api = {    
    //服务器地址
  
//  APP_ADDR                    : "http://testfcwm.24-7.com.cn/", 
          APP_ADDR                 : "http://galaxy.24-7.com.cn/",
//     APP_ADDR                    : "http://120.131.81.63:8090/",  
//     APP_ADDR                    : "http://192.168.1.184:9000/",  

    //注册
    GET_ACCOUNT_REGISTRATION 	  : "account/registration",
    
    //聊天
    GET_CHATROOM_JOIN 	        : "chatRoom/join/{0}/{1}",
   
    //登陆
    GET_LOGIN               	: "account/login",
    
    //登陆(微信)
    POST_LOGIN_WITH_APP      	: "account/loginWithApp/34536418-d6b2-451f-a400-4f0e284c9497",
    
    //获取首页视频
    GET_HOME_VIDEO           	: "banner/video",
    
    //获取首页活动列表
    GET_PROGRAM_TITLE          	: "program/title",
    
    //新建首页活动列表
    POST_PROGRAM_TITLE_NEW           : "program/title/new",
    
    //添加活动列表下嘉宾
    POST_PROGRAM_CONTENT_NEW         : "program/content/new",
    
    //获取活动列表下嘉宾图片
    GET_PROGRAM_CONTENT         : "program/content/account/{0}",
    
    //获取活动列表
    GET_ACTIVITY         	      : "activity/{0}/{1}",
    
    //获取活动列表
    GET_ACTIVITY_CONTENT   	    : "activity/content/{0}",
    
    //投票
    POST_ACTIVITY_NEWLIST  	    : "activity/result/newList",
    
    //添加用户图片
    POST_APPLICATION_USERPICTURE : "application/userPicture",
    
    //保存用户图片
    POST_USERS_ALBUM_NEW      : "users/album/new",
    
    //个人资料
    GET_USER_PROFILE  	        : "users/profile",
    
    //个人相册
    GET_USER_ALBUM  	          : "users/album",
    
    //其他个人资料
    GET_USER_PROFILE_ID  	        : "users/profile/{0}",
    
    //其他个人相册
    GET_USER_ALBUM_ID  	          : "users/album/{0}",
    
    //修改设置数据
    POST_USERS_PROFILE_CURRENT    :"users/profile/current",
    
    //广告条
    GET_BANNER_SMALL              :"banner/small",
    
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
    
    //获取国籍
    
    GET_GEO_ADDRESS 		      :"geo/address/{0}/{1}",

    GET_USERS_INTEREST_ISFAN      :"users/interest/isfan/{0}",
    
    //是否投票根据contentId查询
    GET_ACTIVITY_ISVOTED          :"activity/result/isvoted/{0}",
    
    //是否投票根据activityId查询
    GET_ISVOTED                   :"activity/isvoted/{0}",
    
    //删除图片
    POST_UESR_ALBUM_Del           :"users/album/{0}",
    //投票结果
    GET_ACTIVITY_LIST             :"activity/result/list/{0}",
    
    //在线人数
    GET_CHATROOM_PEOPLENUM        :"chatRoom/peopleNum/{0}",

    //粉丝列表
	GET_FANS_LIST				:"users/interest/other/{0}/{1}/{2}",
	
	//关注列表
    GET_INT_LIST               :"users/interest/me/{0}/{1}/{2}",
	
	//荣誉
	GET_HONOR_BY_ID				:"users/honor/{0}",
	
	//查看礼物
	GET_GIFT_INFO				:"users/gift/read/{0}",
	//查看礼物列表
    GET_GIFT_TABLE               :"users/gift/gifttable/{0}/{1}",
	
	//送礼物
	POST_GIFT_GIVE				:"users/gift/give/{0}/{1}/{2}", //:gift_Id/:star_Id/:gift_number
	
	//查询金币
	GET_MONEY					:"users/money/read",

	//日榜男神
	GET_DAYMAN					:"user/hotPeople/daymanlist/{0}/{1}",

	//周榜男神
	GET_WEEKMAN					:"user/hotPeople/weekmanlist/{0}/{1}",

	//月榜男神
	GET_MONTHMAN					:"user/hotPeople/monthmanlist/{0}/{1}",

	//日榜女神
	GET_DAYWOMAN					:"user/hotPeople/daywomanlist/{0}/{1}",

	//周榜女神
	GET_WEEKWOMAN					:"user/hotPeople/weekwomanlist/{0}/{1}",

	//月榜女神
	GET_MONTHWOMAN					:"user/hotPeople/monthwomanlist/{0}/{1}",


	//日榜新人
	GET_DAYNEWBIE					:"user/hotPeople/daynewbielist/{0}/{1}",

	//周榜新人
	GET_WEEKNEWBIE				:"user/hotPeople/weeknewbielist/{0}/{1}",

	//月榜新人
	GET_MONTHNEWBIE					:"user/hotPeople/monthnewbielist/{0}/{1}",

	//日榜富豪
	GET_DAYRICH					:"user/hotPeople/dayrichlist/{0}/{1}",

	//周榜富豪
	GET_WEEKRICH					:"user/hotPeople/weekrichlist/{0}/{1}",

	//月榜富豪
	GET_MONTHRICH					:"user/hotPeople/monthrichlist/{0}/{1}",
	
	//充值金币
	POST_MONEY					:"users/money/save/{0}",
	
	//魅力
    GET_CHARM                  :"users/charm/{0}",
    
    //判断礼物送过
    GET_ISSEND                  :"users/gift/issendgifttoday",
        
    //在线人数
    GET_ONLINEPEOPLE              :"chatRoom/onlinePeople/{0}/{1}/{2}",
    
   //搜索
	GET_SEARCH           :   "users/profile/search/{0}/{1}/{2}",
	//粉丝按钮
    GET_DRAW           :   "chatRoom/draw/{0}",
    //嘉宾按钮
    GET_STARTDRAW           :   "chatRoom/startDraw",
    //粉丝明信片信息
    POST_FANSINFO       :"users/address/new",
    //报名
    POST_APPLY        :"activity/entry/new",
    //上传报名照片
    POST_APPLYPH		:"application/userPicture",
     //上传报名视频
    POST_APPLYVD		:"activity/entry/upload",
    //聊天室公告
    GET_CHATINFO       :"chatroom/announcement",
    //读帖子
    GET_COMMENT       :"plaza/comment/readAll/{0}/{1}/{2}",
    //发帖
    POST_ARTICLE_NEW       :"plaza/article/post",
    //删帖
    POST_ARTICLE_DEL       :"plaza/article/delete",
    //评论
    POST_COMMENT_NEW       :"plaza/comment/post",
    //删评论
    POST_COMMENT_DEL       :"plaza/comment/delete",
    //广场
    GET_PLAZA_ARTICLE       :"plaza/article/readAll/{0}/{1}",
    //帖子详情
    GET_ARTICLE       :"plaza/theme/articleRead/{0}",
    //加入圈子
    POST_JOIN_THEME         :"plaza/theme/join/{0}",
    //进入圈子
    GET_ENTER_THEME        :"plaza/theme/enter/{0}/{1}/{2}",
    //查看我的圈子
    GET_MY_THEME        :"plaza/theme/myTheme/{0}/{1}/{2}",
    //查看所有圈子
    GET_THEME        :"plaza/theme/view/{0}/{1}",
    //退出圈子
    POST_EXIT_THEME     :"plaza/theme/exit/{0}",
    //查询圈子状态
    GET_INORNOT     :"plaza/theme/isInOrNot/{0}",
	//查询签到
    GET_SIGN     :"plaza/sign/signIn?time="+(new Date().getTime()),
    //创建圈子
    POST_THEME_CREATE     :"plaza/theme/create",
    //自己的帖子
    GET_MY_ARTICLE     :"plaza/article/readMyself/{0}/{1}/{2}",
    //点赞
    POST_THUMB     :"plaza/article/thumb/{0}/{1}/{2}",
    //收藏
    POST_SAVE     :"plaza/article/collections/post/{0}/{1}",
    //获取收藏列表
    GET_SAVE     :"plaza/article/collections/get/{0}/{1}",
    //是否收藏
    GET_IS_COLLECTED    :"plaza/article/collections/isCollected/{0}",
    //二级回复
    GET_COM2    :"plaza/commentLevel2/readAll/{0}/{1}/{2}",
    //二级回复
    POST_COM2    :"plaza/commentLevel2/post",
    //获取红人推荐图片
    GET_HOTPEOPLE_PIC:"hotPeople/pic/{0}",
    //获取红人推荐背景音乐
    GET_HOT_MUSIC:"hotPeople/mp3/{0}",
    //获取红人推荐列表
    GET_HOT_LIST:"hotPeople/rank/list",
    //读取置顶
    GET_TOP:"plaza/article/readTop",
    //读取签到积分
    GET_SignNum:"plaza/sign/read/{0}",
    //读取活动
    GET_Actdetail:"activity/read/{0}",
    //参加自拍
    POST_VOTEJOIN   :   "selfvote/join",
    //自拍投票
    GET_SELFVOTE    :   "selfvote/vote/{0}",
    //自拍信息
    GET_SELFREADVOTE    :   "selfvote/readvote/{0}/{1}",
    //我的自拍信息
    GET_SELFREADME    :   "selfvote/readme/{0}",
    //微信id
    GET_WXVERIFY    :   "selfvote/verify",
    //微信关注
    GET_WXFOLLOW    :   "selfvote/follow/{0}",
    //投票搜索
    GET_VOTESEARCH    :   "selfvote/search/{0}/{1}/{2}"
};
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

var Net = {
    loginWithApp : function(data,callback){
      $.ajax({
        async:false,
        url  : Api.POST_LOGIN_WITH_APP,
        type : "post",
        data : data,
        success : callback
      });
    },
    
    getHomeVideo : function(callback){
      $.get(Api.GET_HOME_VIDEO,callback);
    },
    
    getChatroomJoin : function(id,name,callback){
      $.get(Api.GET_CHATROOM_JOIN.format(id,name),callback);
    },
    
    getProgramTitle : function(callback){
      $.get(Api.GET_PROGRAM_TITLE,callback);
    },
    
    postProgramTitleNew : function(data,callback){
      $.post(Api.POST_PROGRAM_TITLE_NEW,data,callback);
    },
    
    postProgramContent : function(programId,callback){
      $.post(Api.POST_PROGRAM_CONTENT_NEW.format(programId),callback);
    },
    
    getProgramContent : function(programId,callback){
      $.get(Api.GET_PROGRAM_CONTENT.format(programId),callback);
    },
    
    getActivity : function(page,size,callback){
      $.get(Api.GET_ACTIVITY.format(page,size),callback);
    },
    
    getActivityContent : function(activityId,callback){
      $.get(Api.GET_ACTIVITY_CONTENT.format(activityId),callback);
    },
    
    postActivityNewlist : function(data,callback){
      $.post(Api.POST_ACTIVITY_NEWLIST,data,callback);
    },
    getUserProfile : function(callback){
      $.get(Api.GET_USER_PROFILE,callback);
    },
    getUserAlbum : function(callback){
      $.get(Api.GET_USER_ALBUM,callback);
    },
    getUserProfileById : function(id,callback){
      $.get(Api.GET_USER_PROFILE_ID.format(id),callback);
    },
    getUserAlbumById : function(id,callback){
      $.get(Api.GET_USER_ALBUM_ID.format(id),callback);
    },
    
    getUserProfile  :   function(callback){
      $.get(Api.GET_USER_PROFILE,callback);	
    },
    AddUserPicture	:    function(callback){
    	$.post(Api.POST_APPLICATION_USERPICTURE,callback);
    },
    ModifyUsersInfo  :   function(data,callback,errorback){
        $.ajax({
            data:data,
            url:Api.POST_USERS_PROFILE_CURRENT,
        	type:"post",
        	success:callback,
        	error:errorback
        });
//  	$.post(Api.POST_USERS_PROFILE_CURRENT,data,callback);
    },
    
    getBannerSmall  :   function(callback){
    	$.get(Api.GET_BANNER_SMALL,callback);
    },
    getGiftTable  :   function(size,page,callback){
        $.get(Api.GET_GIFT_TABLE.format(size,page),callback);
    },
    getUsersInterest  :   function(callback){
    	$.get(Api.GET_USERS_INTEREST,callback);
    },
    
    getUsersInterestById  :   function(id,callback){
    	$.get(Api.GET_USERS_INTEREST_BY_ID.format(id),callback);
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

    getUsersNation  :     function(lat,lng,callback){
    	$.get(Api.GET_GEO_ADDRESS.format(lat,lng),callback);

    },
    postUsersAlbumNew  :   function(imgUrl,callback){
    	$.post(Api.POST_USERS_ALBUM_NEW,{"imgUrl":imgUrl},callback);
    },
    
    getActivityIsvoted  :   function(contentId,callback){
    	$.get(Api.GET_ACTIVITY_ISVOTED.format(contentId),callback);
    },
    
    getIsvoted  :   function(activityId,callback){
    	$.get(Api.GET_ISVOTED.format(activityId),callback);
    },
    
    getActivityList  :   function(contentId,callback){
    	$.get(Api.GET_ACTIVITY_LIST.format(contentId),callback);

    },
    getChatroomPeoplenum  :   function(roomId,callback){
    	$.get(Api.GET_CHATROOM_PEOPLENUM.format(roomId),callback);
    },
    postUserAlbumDel	:	function(id,callback){
    	$.post(Api.POST_UESR_ALBUM_Del.format(id),callback);
    },
    getFansList  :   function(id,page,size,callback){
    	$.get(Api.GET_FANS_LIST.format(id,page,size),callback);
    },
    getIntList  :   function(id,page,size,callback){
    $.get(Api.GET_INT_LIST.format(id,page,size),callback);
    },
    getHonorById  :   function(id,callback){
    	$.get(Api.GET_HONOR_BY_ID.format(id),callback);
    },
    getGift  :   function(id,callback){
    	$.get(Api.GET_GIFT_INFO.format(id),callback);
    },
    postGiftGive  :   function(gift_Id,star_Id,gift_number,callback,errorback){
        $.ajax({
            url : Api.POST_GIFT_GIVE.format(gift_Id,star_Id,gift_number),
            type: "post",
            success : callback,
            error: errorback
        });
    },
    getMoney  :   function(callback){
    	$.get(Api.GET_MONEY,callback);
    },
    postMoney  :   function(data,callback){
    	$.post(Api.POST_MONEY.format(data),callback);
    },
    getDayMan  :   function(page,size,callback){
		$.get(Api.GET_DAYMAN.format(page,size),callback);
    },
    getWeekMan  :   function(page,size,callback){
		$.get(Api.GET_WEEKMAN.format(page,size),callback);
    },
    getMonthMan  :   function(page,size,callback){
		$.get(Api.GET_MONTHMAN.format(page,size),callback);
    },
    getDayWoman  :   function(page,size,callback){
		$.get(Api.GET_DAYWOMAN.format(page,size),callback);
    },
    getWeekWoman  :   function(page,size,callback){
		$.get(Api.GET_WEEKWOMAN.format(page,size),callback);
    },
    getMonthWoman  :   function(page,size,callback){
		$.get(Api.GET_MONTHWOMAN.format(page,size),callback);
    }, 
    getDayNew  :   function(page,size,callback){
		$.get(Api.GET_DAYNEWBIE.format(page,size),callback);
    },
    getWeekNew  :   function(page,size,callback){
		$.get(Api.GET_WEEKNEWBIE.format(page,size),callback);
    },
    getMonthNew  :   function(page,size,callback){
		$.get(Api.GET_MONTHNEWBIE.format(page,size),callback);
    },
    getDayRich  :   function(page,size,callback){
		$.get(Api.GET_DAYRICH.format(page,size),callback);
    },
    getWeekRich  :   function(page,size,callback){
		$.get(Api.GET_WEEKRICH.format(page,size),callback);
    },
    getMonthRich  :   function(page,size,callback){
		$.get(Api.GET_MONTHRICH.format(page,size),callback);
    },
    getCharm  :   function(id,callback){
        $.get(Api.GET_CHARM.format(id),callback);
    },
    getIsSend  :   function(callback){
        $.get(Api.GET_ISSEND,callback);
    },
    
    getonlinepeople  :   function(id,page,size,callback){
        $.get(Api.GET_ONLINEPEOPLE.format(id,page,size),callback);
    },
    getSearch  :   function(id,page,size,callback){
        $.get(Api.GET_SEARCH.format(id,page,size),callback);
    },
    getStartDraw  :   function(callback){
        $.get(Api.GET_STARTDRAW,callback);
    },
    getDraw  :   function(id,callback){
        $.get(Api.GET_DRAW.format(id),callback);
    },
    addFansInfo: function(data,callback){
    	$.post(Api.POST_FANSINFO,data,callback);
    },
    postApply: function(data,callback){
        $.post(Api.POST_APPLY,data,callback);
    },
    postApplyph: function(data,callback){
    	$.post(Api.POST_APPLYPH,data,callback)
    },//////////////////////////////////////////////////////////////////////
    postApplyDV: function(data,callback){
    	$.post(Api.POST_APPLYVD,data,callback)
    },//////////////////////////////////////////////////////////////////////
    getPlazaArticle: function(page,size,callback){
        $.get(Api.GET_PLAZA_ARTICLE.format(page,size),callback);
    },
    postArticleNew: function(data,callback){
        $.post(Api.POST_ARTICLE_NEW,data,callback);
    },
    postCommentNew: function(data,callback){
        $.post(Api.POST_COMMENT_NEW,data,callback);
    },
    postArticleDel: function(data,callback){
        $.post(Api.POST_ARTICLE_DEL,data,callback);
    },
    postCommentDel: function(data,callback){
        $.post(Api.POST_COMMENT_DEL,data,callback);
    },
    getArticle: function(id,callback,errorback){
        $.ajax({
            url:Api.GET_ARTICLE.format(id),
            type: "get",
            success:callback,
            error:errorback
        })
    },
    postJoinTheme: function(id,callback){
        $.post(Api.POST_JOIN_THEME.format(id),callback);
    },
    getEnterTheme: function(id,page,size,callback){
        $.get(Api.GET_ENTER_THEME.format(id,page,size),callback);
    },
    getMyTheme: function(id,page,size,callback){
        $.get(Api.GET_MY_THEME.format(id,page,size),callback);
    },
    getTheme: function(page,size,callback){
        $.get(Api.GET_THEME.format(page,size),callback);
    },
    postExitTheme: function(id,callback){
        $.post(Api.POST_EXIT_THEME.format(id),callback);
    },
    getInOrNot: function(id,callback){
        $.get(Api.GET_INORNOT.format(id),callback);
    },
    getComment: function(id,page,size,callback){
        $.get(Api.GET_COMMENT.format(id,page,size),callback);
    },
    getSign: function(callback){
        $.get(Api.GET_SIGN,callback);
    },
    postThemeCreate: function(data,callback,errorback){
        $.ajax({
        	type:"post",
        	url:Api.POST_THEME_CREATE,
        	data:data,
        	success:callback,
        	error:errorback
        });
        
    },
    getMyArticle: function(id,page,size,callback){
        $.get(Api.GET_MY_ARTICLE.format(id,page,size),callback);
    },
    postPostThumb: function(type,id,val,callback){
        $.post(Api.POST_THUMB.format(type,id,val),callback);
    },
    postSave: function(id,val,callback){
        $.post(Api.POST_SAVE.format(id,val),callback);
    },
    getSave: function(page,size,callback){
        $.get(Api.GET_SAVE.format(page,size),callback);
    },
    getIsCollected: function(id,callback){
        $.get(Api.GET_IS_COLLECTED.format(id),callback);
    },
    getCom2: function(id,page,size,callback){
        $.get(Api.GET_COM2.format(id,page,size),callback);
    },
    postCom2: function(data,callback){
        $.post(Api.POST_COM2,data,callback);
    },
    getHotpeoplePic:function(count,callback){
    	$.get(Api.GET_HOTPEOPLE_PIC.format(count),callback);
    },
    getHotMusic:function(count,callback){
    	$.get(Api.GET_HOT_MUSIC.format(count),callback);
    },
    getHotList:function(callback){
    	$.get(Api.GET_HOT_LIST,callback);
    },
    getTop:function(callback){
        $.get(Api.GET_TOP,callback);
    },
    getSignNum:function(id,callback){
        $.get(Api.GET_SignNum.format(id),callback);
    },
    getActdt:function(id,callback){
        $.get(Api.GET_Actdetail.format(id),callback);
    },
    postVoteJoin:function(data,callback,errcallback){
        $.post(Api.POST_VOTEJOIN,data,callback).fail(errcallback);
    },
    getSelfVote:function(id,callback,errcallback){
        $.get(Api.GET_SELFVOTE.format(id),callback).fail(errcallback);
    },
    getReadVote:function(page,size,callback){
        $.get(Api.GET_SELFREADVOTE.format(page,size),callback);
    },
    getReadMe:function(id,callback){
        $.get(Api.GET_SELFREADME.format(id),callback);
    },
    postWxVerify:function(data,callback){
        $.post(Api.GET_WXVERIFY,data,callback);
    },
    getWxFollow:function(id,callback,errcallback){
        $.get(Api.GET_WXFOLLOW.format(id),callback).fail(errcallback);
    },
    getVoteSearch:function(id,page,size,callback,errcallback){
        $.get(Api.GET_VOTESEARCH.format(id,page,size),callback).fail(errcallback);
    }
};
var FCWM_USER_ID = "";
Net.loginWithApp({username: openId,type: 1},function(result){FCWM_USER_ID = result.id;});







