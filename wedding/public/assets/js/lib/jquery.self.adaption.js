;(function(){

  window.adaptPage = function(site){

    //页面默认大小
    var pageW = 640;
    var pageH = 1012;
    var win = $(window);
    var ww = win.width();
    var wh = win.height();

    //缩放比例
    var zoomBg = 1;
    var zoomPg = 1;

    var zoomW =  ww / pageW;
    var zoomH =  wh / pageH;
    console.log(zoomW);
    console.log(zoomH);
    //保证页面内容在页面上全部显示
    zoomPg = zoomBg = Math.min(zoomW, zoomH);
    console.log(zoomPg);

    //如果设备的宽小于高时，防止页面留白
    if (ww < wh) {
      zoomBg = Math.max(zoomW, zoomH);
    }

    var contentMarginTop = (wh - pageH * zoomPg) / 2;
    var bgMarginTop = (wh - pageH * zoomBg) / 2;
    $(".pagebg").css("transform","scale("+zoomBg+")");
    $(".pagecontent").css("transform","scale("+zoomPg+")");
    if (site === 'top') {
      $(".pagebg").css("marginTop",(-pageH) / 2 - bgMarginTop);
      $(".pagecontent").css("marginTop",(-pageH) / 2 - contentMarginTop);
    } else if (site === 'bottom'){
      $(".pagebg").css("marginTop",(-pageH) / 2 + bgMarginTop);
      $(".pagecontent").css("marginTop",(-pageH) / 2 + contentMarginTop);
    }
  }
})(jQuery);