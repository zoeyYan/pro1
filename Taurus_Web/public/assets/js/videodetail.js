var parmas = parseUrlParam(window.location.href);
var source=parmas.source;
$(function(){
	$("#source").attr('src',source);
})
