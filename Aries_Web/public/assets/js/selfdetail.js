var parmas = parseUrlParam(window.location.href);
var count = null;
function peoplepic (count){
      Net.getHotpeoplePic(count,function(result){
      var data={"data":result};
        setData("#data-second","#dataInfo",data);
        var lengthB=result.length;  
        adaptPage();
        //主页swiper
          var mainSwiper = $(".main-swiper").swiper({
            direction: 'vertical', //horizontal
            loop : true,   
                onTransitionEnd:function(s){
                    if(lengthB==s.activeIndex||s.activeIndex==0){
                           console.log(s.activeIndex);
                             $('.pagebg').css('z-index','99');
                             $('.morebtn').show();
                           $('.pagebg').click(function(){
                             window.location.href='allstar.com';
                           });
                    }else{
                        $('.pagebg>img').unbind();
                        $('.morebtn').hide();
                    };
                }   
        
  }); 
  });
};
function peoplemp3(count){
  Net.getHotMusic(count,function(result){
    console.log(result);
      var link=result[0].mainUrl;
      var music=result[0].musicUrl;
      var name=result[0].name;
      $('title').text(name);
      $('audio').attr('src',music);
      $('.btnArea').find('img').eq(0).click(function(){
         window.location.href="allstar.html";
      });
      $('.btnArea').find('img').eq(1).click(function(){
         window.location.href=link;
      });
  })  
};
$(function(){
  $('.home>img').click(function(){
    window.location.href="index.html";
  });
  //音频播放
  $audio = $("audio");
  $("#playbtn").click(function(){
    if ($audio[0].paused) {
      $audio[0].play();
      $(this).children().attr("src","assets/images/selfdetail/btn-speaker.png");
      } else {
      $audio[0].pause();
      $(this).children().attr("src","assets/images/selfdetail/btn-nspeaker.png");
     }
  });
  if(parmas.id){
    count=parmas.id;
    peoplepic(count);
    peoplemp3(count);
    Net.getHotList(function(data){
          $.each(data,function(i,v){
             if (data[i].id==parmas.id) {
                  $(".share-avatar").eq(0).attr("src",data[i].picUrl);
             } 
          });
      });
  }
  else{
      Net.getHotList(function(data){
          count=data[data.length-1].id;
          $(".share-avatar").eq(0).attr("src",data[data.length-1].picUrl);
          peoplepic(count);
          peoplemp3(count);
      });
      
  }
});
