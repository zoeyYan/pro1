/**
   * 动态添加数据
   * templateEle: 模板
   * ele： 要插入的结点
   * context: 数据
   * isAppend: 是否追加
   */
  var setData = function(templateEle,ele,context,isAppend){
    //用jquery获取模板
    var tpl   =  $(templateEle).html();
    //预编译模板
    var template = Handlebars.compile(tpl);
    //匹配json内容
    var html = template(context);
    //输入模板
    if (isAppend) {
      $(ele).append(html);
    } else{
      $(ele).html(html);
    }
  }	