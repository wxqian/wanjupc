/**
 * Created by wanglei on 2016/1/18.
 */
var options = {
    'cate': undefined,
    'age': undefined,
    'price': undefined,
    'page': 1
};
$(function () {
    var query = location.search;
    var cate = query.match(/cate=(\d+)/);
    if (cate) {
        options['cate'] = cate[1];
    }
    $.getJSON('/api/goods/cates', function (res) {
        var cates = res.data;
        for (var i in cates) {
            var _cate = cates[i];
            $(".l-c-sub").append('<a href="javascript:search(' + _cate["id"] + ',\'cate\');">' + _cate["name"] + '</a>');
            if (cate && cate[1] == _cate.id) {
                $(".l-catena").find(".active").removeClass("active");
                $('.l-catena a:last').addClass("active");
            }
        }
        $(".l-catena a").click(function () {
            $(".l-catena").find(".active").removeClass("active");
            $(this).addClass("active");
        });
    });
    $.getJSON('/api/goods/ages', function (res) {
        var ages = res.data;
        for (var i in ages) {
            var age = ages[i];
            $(".l-a-sub").append('<a href="javascript:search(' + age["id"] + ',\'age\');">' + age["name"] + '</a>');
        }
        $(".l-ages a").click(function () {
            $(".l-ages").find(".active").removeClass("active");
            $(this).addClass("active");
        });
    });

    $('.l-defaultSort a').click(function () {
        $('.l-defaultSort').find('.active').removeClass('active');
        $(this).addClass('active');
    });
    getGoods();
});

function getGoods() {
    var conditions = {
        pageIndex: options.page - 1,
        pageSize: 20
    };
    for (var i in options) {
        if (i != 'page' && options[i] != undefined) {
            conditions[i] = options[i];
        }
    }
    $.ajax({
        url: '/api/goods/search',
        type: 'post',
        data: conditions,
        dataType: 'json',
        success: function (res) {
            var goods = res.data;
            laypage({
                cont: 'page',
                pages: Math.ceil(goods.total / goods.pageSize), //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
                skin: 'yahei', //加载内置皮肤，也可以直接赋值16进制颜色值，如:#c00
                curr: options.page,
                jump: function (e, first) { //触发分页后的回调
                    if (!first) { //一定要加此判断，否则初始时会无限刷新
                        options.page = e.curr;
                        getGoods();
                    }
                }
            });
            if (goods.total == 0) {
                //无商品处理
            } else {
                var goodViews = '';
                var searchGoods = goods.data;
                for (var i in searchGoods) {
                    var good = searchGoods[i];
                    goodViews += '<li data="' + good.id + '"><div class="l-l-in"><img src="' + good.image + '"><h3 title="' + good.goodsBrand["name"] + ' ' + good.goodsCate["name"] + ' ' + good.title + '">' + good.goodsBrand["name"] + ' ' + good.goodsCate["name"] + ' ' + good.title + '</h3>' +
                        '<div class="l-l-detail"><p class="l-l-now-price"><span>￥' + good.nowPrice + '</span>/周</p><p class="l-l-pre-price">￥' + good.price + '</p>' +
                        '</div></div></li>';
                }
                $('.l-list ul').empty().append(goodViews);
                $('.l-list ul li').click(function () {
                    location.href = '/artical.html?id=' + $(this).attr('data');
                });
            }
        },
        error: function (res) {
        }
    });
}
function search(id, type) {
    if (id == -1) {
        options[type] = undefined;
    } else {
        options[type] = id;
    }
    getGoods();
}


function searchTitle() {
    var queryCode = $('#queryCode').val();
    console.log(queryCode);
    if (queryCode != "" && queryCode != undefined) {
        location.href = '/search.html?title=' + queryCode;
    } else {
        alert('请输入您想要查找的玩具名称');
    }
}