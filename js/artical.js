/**
 * Created by wanglei on 2016/1/18.
 */
$(function(){
    var _lenght = $(".a-d-img-list ul li").length,
        _ulWidth = 100 * _lenght;
    $(".a-d-img-list ul").css("width",_ulWidth);



    $(".a-d-lt").click(function(){
        var _left = Util.removePx($(".a-d-img-list ul").css("left"));
        if(_left > (-_ulWidth + 360)){
            $(".a-d-img-list ul").stop().animate({
                "left" : _left - 100
            })
        }
    });

    $(".a-d-rt").click(function(){
        var _left = Util.removePx($(".a-d-img-list ul").css("left"));
        if(_left < 0){
            $(".a-d-img-list ul").stop().animate({
                "left" : _left + 100
            })
        }
    });

    $(".a-d-img-list ul li").click(function(){
        var _src = $(this).find("img").attr("src");
        $(".a-d-img").find(".a-d-big-img").attr("src",_src);
    });


    //评论切换功能
    $(".a-de-tab ul li").click(function(){
        var _index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");

        if(_index == 0){
            $(".a-de-detail").show();
            $(".a-comment").hide();
        }else if(_index == 1){
            $(".a-de-detail").hide();
            $(".a-comment").show();
        }

    });

//    二维码显示

    $(".a-d-button button").click(function(event){
        var e = event || window.event;
        if(e || e.stopPropagation){
            e.stopPropagation();
        }else{
            e.cancelBubble = true;
        }


        var _display = $(".a-d-twocode").css("display");
        var _index = _display == "none" ? 0 : 1;
        if(_index == 0){
            $(".a-d-twocode").show(500);
        }else{
            $(".a-d-twocode").hide(500);
        }
    });

    $(document).click(function(){
        $(".a-d-twocode").hide(500)
    })

});





