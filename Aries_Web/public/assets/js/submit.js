var submit = {
    getList : function(id) {
      Net.getActivityList(id,function(result){
        console.log(result);
        $("#list").handlebars($("#list-tmp"),result);
        submit.barAnimo();
      });
    },
    
    barAnimo : function() {
      var standard = $(".bar:first");
      var standardNum = standard.data("num");
      if (standardNum == 0) {
        standard.width("1");
      } else {
        standard.width("100%");
      }
      $(".bar:not(:first)").each(function(index) {
        var $this = $(this);
        var w = ( $this.data("num") / (standardNum || 1) ) * 100;
        $this.width((w == 0 ? 1 : w) + "%");
      });
    },
    
    init: function(id){
      submit.getList(id);
    }
};
$(function(){
  var parmas = parseUrlParam(window.location.href);
  var contentId = parmas.id;
  submit.init(contentId);
});