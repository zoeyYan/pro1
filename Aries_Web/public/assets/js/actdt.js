var parmas = parseUrlParam(window.location.href);
function getActdt (id){
    Net.getActdt(id,function(result){
        console.log(result.web);
        result=[result];
        $(".container").handlebars($("#article-tmp"),result,true);
        /*微信title start*/
        var $body = $('body');
        document.title = result[0].title;
        if(!result[0].title){
            document.title="活动详情";
        }
        // hack在微信等webview中无法修改document.title的情况
        var $iframe = $('<iframe src="/favicon.ico"></iframe>').on('load', function() {
            setTimeout(function() {
                $iframe.off('load').remove();
            }, 0)
        }).appendTo($body);
        /*微信title end*/
    });
}
$(function(){
    getActdt (parmas.id);
});
