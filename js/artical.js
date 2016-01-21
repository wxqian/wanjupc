/**
 * Created by wanglei on 2016/1/18.
 */
$(function () {

    //评论切换功能
    $(".a-de-tab ul li").click(function () {
        var _index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");

        if (_index == 0) {
            $(".a-de-detail").show();
            $(".a-comment").hide();
        } else if (_index == 1) {
            $(".a-de-detail").hide();
            $(".a-comment").show();
        }

    });

//    二维码显示

    $(".a-d-button button").click(function (event) {
        var e = event || window.event;
        if (e || e.stopPropagation) {
            e.stopPropagation();
        } else {
            e.cancelBubble = true;
        }

        var _display = $(".a-d-twocode").css("display");
        var _index = _display == "none" ? 0 : 1;
        if (_index == 0) {
            $(".a-d-twocode").show(500);
        } else {
            $(".a-d-twocode").hide(500);
        }
    });

    $(document).click(function () {
        $(".a-d-twocode").hide(500)
    });

    var idParams = location.search.match(/id=(\d+)/);
    var id = idParams[1];

    $.getJSON('/api/goods/info/' + id, function (res) {
        var info = res.data;
        $('.a-d-img .a-d-big-img').attr('src',info.image);
        var images = info.images;
        for(var i in images){
            var image = images[i];
            if(i == 0){
                $('.a-d-img-list ul').append('<li><img src="'+image.url+'" width="90" height="90" id="img"></li>');
            }else{
                $('.a-d-img-list ul').append('<li><img src="'+image.url+'" width="90" height="90"></li>')
            }
        }
        var _lenght = $(".a-d-img-list ul li").length,
            _ulWidth = 100 * _lenght;
        $(".a-d-img-list ul").css("width", _ulWidth);

        $(".a-d-lt").click(function () {
            var _left = Util.removePx($(".a-d-img-list ul").css("left"));
            if (_left > (-_ulWidth + 360)) {
                $(".a-d-img-list ul").stop().animate({
                    "left": _left - 100
                })
            }
        });

        $(".a-d-rt").click(function () {
            var _left = Util.removePx($(".a-d-img-list ul").css("left"));
            if (_left < 0) {
                $(".a-d-img-list ul").stop().animate({
                    "left": _left + 100
                })
            }
        });

        $(".a-d-img-list ul li").click(function () {
            var _src = $(this).find("img").attr("src");
            $(".a-d-img").find(".a-d-big-img").attr("src", _src);
        });
    });
});





