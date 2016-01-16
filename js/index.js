/**
 * Created by wanglei on 2016/1/15.
 */

$(function(){

    var _index = 0;                     //当前计数

    $(".i-e-top-tap ul li").click(function(){

        var t_index = $(this).index(),
            _this = this;
        $(_this).addClass("active").siblings().removeClass("active");
        if(t_index == 0){
            $(".i-e-question").show();
            $(".i-e-zulin").hide();
        }else{
            $(".i-e-question").hide();
            $(".i-e-zulin").show();
        }
    });


    $(".i-e-q-lf li").on("mouseenter",function(){

        _index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");

        $(".i-e-q-rt ul li").eq(_index).fadeIn().siblings().fadeOut();
    })

});