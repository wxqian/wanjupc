/**
 * Created by wanglei on 2016/1/15.
 */

$(function(){
    $(".h-h-name").click(function(){
        $(".h-h-nav-list").slideToggle();
    });

    $(".h-nav-list ul li").click(function(){
        $(this).addClass("active").siblings().removeClass("active");
    });
});
