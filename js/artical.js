/**
 * Created by wanglei on 2016/1/18.
 */
var options = {
    pageIndex: 0,
    pageSize: 10
}
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
        $('.a-d-img .a-d-big-img').attr('src', info.image);
        var images = info.images;
        for (var i in images) {
            var image = images[i];
            if (i == 0) {
                $('.a-d-img-list ul').append('<li><img src="' + image.url + '" width="90" height="90" id="img"></li>');
            } else {
                $('.a-d-img-list ul').append('<li><img src="' + image.url + '" width="90" height="90"></li>')
            }
        }
        calPicList();

        $('#title').html(info.goodsBrand.name + ' ' + info.goodsCate.name + ' ' + info.title);
        $('#nowPrice').html(info.nowPrice);
        $('#price').html('吊牌价:' + info.price);
        var skus = info.skus;
        for (var i in skus) {
            var sku = skus[i];
            if (sku.name == '颗粒数') {
                $('#numbers').html(sku.value);
            } else if (sku.name == '租租建议年龄') {
                $('#ages').html('租租建议年龄:' + sku.value);
            } else if (sku.name == '型号') {
                $('#goodType').html(sku.value);
            }
        }
        $('#goodDesc').html(info.description);
        var relateds = info.relateds;
        for (var i in relateds) {
            var related = relateds[i];
            $('#related ul').append('<li><div class="l-l-in"><img src="' + related.image + '">' +
                '<h3>' + related.goodsBrand.name + ' ' + related.goodsCate.name + ' ' + related.title + '</h3>' +
                '<div class="l-l-detail"><p class="l-l-now-price"><span>￥' + related.nowPrice + '</span>/周</p>' +
                '<p class="l-l-pre-price">￥' + related.price + '</p></div></div></li>');
        }

    });
    getComments(id,0);
});

function calPicList() {
    var _lenght = $(".a-d-img-list ul li").length,
        _ulWidth = 103 * _lenght;
    $(".a-d-img-list ul").css("width", _ulWidth);

    $(".a-d-lt").click(function () {
        var _left = Util.removePx($(".a-d-img-list ul").css("left"));
        if (_left > (-_ulWidth + 360)) {
            $(".a-d-img-list ul").stop().animate({
                "left": _left - 105
            })
        }
    });

    $(".a-d-rt").click(function () {
        var _left = Util.removePx($(".a-d-img-list ul").css("left"));
        if (_left < 0) {
            $(".a-d-img-list ul").stop().animate({
                "left": _left + 105
            })
        }
    });

    $(".a-d-img-list ul li").click(function () {
        var _src = $(this).find("img").attr("src");
        $(".a-d-img").find(".a-d-big-img").attr("src", _src);
    });
}

function getComments(id, pageIndex) {
    $.getJSON('/api/goods/comment/' + id + '?pageIndex=' + pageIndex, function (res) {
        var comments = res.data.data;
        if(comments.length == 0){
            $('#comments ul').empty().append('此商品暂无评论');
            return;
        }
        var commentsView = '';
        $('#commentNum').html(res.data.total);
        laypage({
            cont: 'page1',
            pages: Math.ceil(res.total / options.pageSize), //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
            skin: 'yahei', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
            curr: 1,
            jump: function (e, first) { //触发分页后的回调
                if (!first) { //一定要加此判断，否则初始时会无限刷新
                    options.pageIndex = e.curr - 1;
                    getComments(id, options.pageIndex);
                }
            }
        });
        for(var i in comments){
            var comment = comments[i];
            console.log(comment);
            commentsView += '<li><div class="a-c-lf"><img src="'+comment.memberInfo.image+'">'+
                '<p>'+comment.memberInfo.name+'</p></div><div class="a-c-rt"><p>'+comment.content+'</p><div class="a-c-pics">';
            if(comment.image){
                commentsView +='<img src="'+comment.image+'">';
            }
            commentsView += '</div><span class="a-c-date">'+comment.createTime.substring(0,10)+'  时长：3周</span></div></li>';
        }
        $('#comments ul').empty().append(commentsView);
    });
}





