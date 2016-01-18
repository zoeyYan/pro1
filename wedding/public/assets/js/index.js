var twoChoose;
var numberChoose;
var sh=null;
var abc;
var one=false;
var loadTime;
//自适应
adaptPage();
$(window).resize(function() {
	adaptPage();
});
var bmg = {
	changeClass: function (target,id) {
		var className = $(target).attr('class');
		var ids = document.getElementById(id);
		(className == 'on')
				? $(target).removeClass('on').addClass('off')
				: $(target).removeClass('off').addClass('on');
		(className == 'on')
				? ids.pause()
				: ids.play();
	},
	play:function(){
		document.getElementById('media').play();
	}
}
bmg.play();
$(function(){
	var preload = [];
	var imgNum = 0;
	$("img").each(function() {
		preload.push($(this).attr("src"));
	});
	$.imgpreload(preload, {
		each: function() {
			var status = $(this).data('loaded') ? 'success' : 'error';
			if (status == "success") {
				var v = (parseFloat(++imgNum) / preload.length).toFixed(2);
				var g = v * 100;
				v = v * 100 - 10;
				//console.log(parseFloat(++imgNum) / preload.length);
				$('.went').animate({
					width: g + "%"
				}, 50);
			}
		},

		all: function() {
			$('.loading').fadeOut();
			loadEnd();
		}
	})

})
function loadEnd(){
	var swiper = new Swiper('.swiper-container', {
		pagination: '.swiper-pagination',
		direction: 'vertical',
		noSwiping : true,
		noSwipingClass : 'stop-swiping',
		preloadImages:true,
		freeMode : false,
		onSlideChangeEnd: function(swiper){
			if(swiper.activeIndex==1){
				$('.tie').show();
				$('.tie').animo({ animation:'slideInDownN'},function(){
					$('.matter,.matterTwo').show();
					$('.matter,.matterTwo').animo({animation:'flash'},function(){
						$('.flower1').show();
						setTimeout("$('.flower2').show();",1000)
						$('.flower1').animo({animation:'flowerOne',iterate: 'infinite', duration:2});
						setTimeout("$('.flower2').animo({animation:'flowertwo',iterate: 'infinite', duration: 2.5})",1500)

					});
				});
			}
			if(swiper.activeIndex==2){
				slideone(swiper);
			}
			if(swiper.activeIndex==3){
				slidetwo(swiper);
			}
		}
	});
	$('#svgb,#svgc').animo({animation:'rollIn'});
	$('#svgd,#svga').animo({ animation: 'rollInR'},function(){
		$('#svga,.paperCutleft').animo({ animation: 'pulse',iterate: 'infinite',keep: true,duration: 3});
		$('#svgb,.paperCutright').animo({ animation: 'pulse',iterate: "infinite",keep: true,duration: 3});
		$('#svgc').animo({ animation: 'pulse',iterate: "infinite",keep: true,duration: 3});
		$('#svgd').animo({ animation: 'pulse',iterate: "infinite",keep: true,duration: 3});
		$('.happy').removeClass('hidden');
		$('.happy').animo({ animation:'slideInDown'});
		$('.arrows').removeClass('hidden');
		$('.arrows').animo({ animation:'slideInUp'},function(){
			$('.arrows').animo({animation:'updown',iterate: 'infinite',duration:1.6});
			$('.heart').removeClass('hidden');
			$('.heart').animo({animation:'flash'});
			//获取
			$('.happyWord').bind('scrollstart', function(event) {
				$('.happyWord').animo({animation:'slideOutUp'},function(){
					$('.heart').css("top",0);
					$('.happyWord').hide();
					$('#svga').animo({ animation: 'rollOut',duration:2},function(){
						$('#svga,#svgb').hide();
					});
					$('#svgb').animo({ animation: 'rollOutL',duration:2},function(){
						$('.contentWo,.creak,.lead').show();
						$('.contentWo').animo({ animation: 'fireup'},function(){
							$('.match').show();
							$('.tip').show();
							$('.tip').animo({animation:'bounce',iterate: "infinite",duration: 2,keep:true})
							touch.on('#target', 'touchstart', function(ev){
								ev.preventDefault();
							});

							var target = document.getElementById("target");
							var dx, dy;

							touch.on('#target', 'drag', function(ev){
								dx = dx || 0;
								dy = dy || 0;
								var offx = dx + ev.x + "px";
								var offy = dy + ev.y + "px";
								this.style.webkitTransform = "translate3d(" + offx + "," + offy + ",0)";
								//console.log(offy);
								if(parseFloat(offx)>-92.5&&parseFloat(offx)<-15.35&&parseFloat(offy)>88&&parseFloat(offy)<152){
									$('.match').hide();
									$('.tip').hide();
									//点燃引线的效果
									$('.fireP').show();
									$('.fireP').animo({ animation:'fireburn'},function(){
										$('.fireP').hide();
										$('.fireTwo,.boom').show();
										$('.fireTwo').animo({animation:'opacityone', duration:1.5},function(){
											$('.fireOther').show();
											$('.fireOther').animo({animation:'opacityone', duration:1.5},function(){
												$('.blingstar').show();
												$('.blingstar').animo({animation:'flash', duration:5,iterate: "infinite"})
												$('.wordEnglish').show();
												$('.wordEnglish').animo({ animation:'upTodown', duration:3,keep:true},function(){

												});
												$('.one').removeClass('stop-swiping');
											});
										})
									});
									$('.lead').animo({animation:'leadshort',duration:1},function(){
										$('.lead').hide();
									});
								}
							});

							touch.on('#target', 'dragend', function(ev){
								dx += ev.x;
								dy += ev.y;
							});
						});
					});
				});

			});

		});
	});
	var defaults = {
			speed: 300,
			timer: 4000,
			autoSlider: false,
			hasNav: true,
			pauseOnHover: true,
			navLeftTxt: '&lt;',
			navRightTxt: '&gt;',
			//zIndex:20,
			ease: 'linear',
		},
		as = $('#papers').paperSlider(defaults);
	$.lstzmd($('#carrousel'),0.8,300,1000,$('#carrousel_prev'),$('#carrousel_next'));

	$('.click_write').bind('click',function(){
		$('.click_write').hide();
		$('.textwrite').show().focus();
	});
	$('.textwrite').bind('blur',function(){
		var textVal=$('.textwrite').val();
		if(textVal==""){
			$('.fourpartTwo').hide();
			$('.submitAll').hide();
			$('.pagefive').show();
		}
		else{
			$('.submitAll').show();
			$('.pagefive').hide();
			$('.submit').click(function(){
				$('.fourPartOne').hide();
				$('.fourpartTwo').show();
				five();
			});
		};
	})

	$('.chooseOne').bind('click',function(){
		$(this).find('.heart_choose').removeClass('hidden');
		$(this).siblings().find('.heart_choose').addClass('hidden');
		$(this).find('input').attr("checked","checked");
		$(this).siblings().find('input').attr('checked',false)
		var bbb=$(this).find("input[type=radio]").val();
		twoChoose=bbb;
		console.log(twoChoose);
		if(twoChoose==0){
			$('.one1_number3').show();
			$('.one1').unbind('click');
			$('.amount').hide();
		}else{
			ccc();
		}
	});

	$('.formSubmit').bind('click',function(){
		var falg=false;
		falg=vilate();
		console.log(falg);
		if(falg){
			alert("right");
			$('.fourpartTwo').hide();
			$('.blurbg').show();
		}else{
			alert("输入错误");
		}
	});
}
function five(){
	$('.pagefive').bind('scrollstart',function(){
		//$('.datapage').addClass('stop-swiping');
		$('.fourPartOne').hide();
		$('.fourpartTwo').show();
		$('.tieTwo').animo( { animation: ['slideInUp'], duration: 2 },function(){
			$('.tieTwo').bind('scrollstart',function(){
				$('.fourPartOne').show();
				$('.fourpartTwo').hide();
			});
		});
	});
}
five();
function vilate(){
	console.log(twoChoose)
	if(twoChoose==undefined&&numberChoose==undefined){
		alert("请选择");
		return false;
	}else if(twoChoose==1&&numberChoose==undefined){
		alert("请选择人数");
		return false;
	}
	return true;
}
function ccc(){
	if(twoChoose==1){
		console.log(twoChoose);
		$('.one1_number3').hide();
		$('.amount').show();
		$('.one1').bind('click',function(){
			$(this).find('.one1_number2').show();
			$(this).siblings().find('.one1_number2').hide();
			$(this).siblings().find('.one1_number1').show();
			$(this).find('.one1_number1').hide();
			var aaa=$(this).find('input[type=radio]').val();
			numberChoose=aaa;
			console.log(numberChoose);
		});
	}
}
function slideone(swiper){
	/*
	 * js判断左右滑动
	 * */
	var startX = 0;
	var endX = 0;
	var startY = 0;
	var endY = 0;
	var touchstartEvent = function(e){
		e.preventDefault();
		var touch = e.targetTouches[0];
		startX = endX = touch.pageX;
		startY = endY = touch.pageY;
	};
	var touchmoveEvent = function(e){
		e.preventDefault();
		var touch = e.targetTouches[0];
		endX = touch.pageX;
		endY =touch.pageY;
	};
	var touchendEvent = function(e){
		e.preventDefault();
		if (startX - endX > 50) {
			e.stopPropagation();
			$('.ps-nav-prev').click();
		}else if(endX - startX > 50) {
			e.stopPropagation();
			$('.ps-nav-next').click();
		}
		if (startY - endY > 100) {
			e.stopPropagation();
			swiper.slideNext();

		}else if(endY - startY>100){
			e.stopPropagation();
			swiper.slidePrev();

		}

	};
	for(var i=0;i<4;i++){
		$(".frame")[i].addEventListener('touchstart', touchstartEvent);
		$(".frame")[i].addEventListener('touchmove',  touchmoveEvent);
		$(".frame")[i].addEventListener('touchend', touchendEvent);
	}
}
function slidetwo(swiper){
	/*
	 * js判断左右滑动
	 * */
	var startX = 0;
	var endX = 0;
	var startY = 0;
	var endY = 0;
	var touchstartEvent = function(e){
		e.preventDefault();
		var touch = e.targetTouches[0];
		startX = endX = touch.pageX;
		startY = endY = touch.pageY;
	};
	var touchmoveEvent = function(e){
		e.preventDefault();
		var touch = e.targetTouches[0];
		endX = touch.pageX;
		endY =touch.pageY;
	};
	var touchendEvent = function(e){
		e.preventDefault();
		if (startX - endX > 50) {
			e.stopPropagation();
			$('#carrousel_prev').click();
		}else if(endX - startX > 50) {
			e.stopPropagation();
			$('#carrousel_next').click();
		}
		if (startY - endY > 100) {
			e.stopPropagation();
			swiper.slideNext();

		}else if(endY - startY>100){
			e.stopPropagation();
			swiper.slidePrev();

		}

	};
	for(var i=0;i<3;i++){
		$(".rotator-item")[i].addEventListener('touchstart', touchstartEvent);
		$(".rotator-item")[i].addEventListener('touchmove',  touchmoveEvent);
		$(".rotator-item")[i].addEventListener('touchend', touchendEvent);
	}
}
