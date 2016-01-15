 $(".menu").on("click",".menuBtn",function(e){      	
        var self = $(this);
        var menu = self.find(".nav");      
        $(".nav").not(menu).removeClass("active");
        $(".menuBtn").not(self).removeClass("active");        
        if (self.hasClass("active")) {
          $(".fcwm-mask").removeClass('active');	
          menu.removeClass("active");
          self.removeClass("active");
        } else {
          $(".fcwm-mask").addClass('active');	
          menu.addClass("active");
          self.addClass("active");
        }     
});