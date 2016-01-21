var conditions = {
    pageIndex: 0,
    pageSize: 8
}
$(document).ready(function () {
    var query = location.search;
    var title = decodeURI(query.substring(query.indexOf('=') + 1));
    conditions['title'] = title;
    getGoods();
});

function searchTitle() {
    var title = $('#queryCode').val();
    if (title != '' && title != undefined) {
        conditions['title'] = title;
    } else {
        alert('请输入您想要查找的玩具名称');
    }
    getGoods();
}

function getGoods() {
    $.ajax({
        url: '/api/goods/search',
        type: 'post',
        data: conditions,
        dataType: 'json',
        success: function (res) {
            var goods = res.data;
            if (goods.total == 0) {
                $('#searchTitle').html(conditions.title);
                $('#title').html(conditions.title);
                $('#searchNone').show();
                if ($('#hot').css('display') == 'none') {
                    getRecomendGoods('/api/goods/recommends', 'recommend');
                    getRecomendGoods('/api/goods/hots', 'hot');
                    $('#hot').show();
                    $('#recommend').show();
                    $('#searchResult').hide();
                }
            } else {
                var goodViews = '';
                var searchGoods = goods.data;
                for (var i in searchGoods) {
                    var good = searchGoods[i];
                    goodViews += '<li data="' + good.id + '"><div class="l-l-in"><img src="' + good.image + '"><h3 title="' + good.goodsBrand["name"] + ' ' + good.goodsCate["name"] + ' ' + good.title + '">' + good.goodsBrand["name"] + ' ' + good.goodsCate["name"] + ' ' + good.title + '</h3>' +
                        '<div class="l-l-detail"><p class="l-l-now-price"><span>￥' + good.nowPrice + '</span>/周</p><p class="l-l-pre-price">￥' + good.price + '</p>' +
                        '</div></div></li>';
                }
                $('#searchResult #resultTitle').html(conditions.title);
                $('#searchResult #goodsNum').html(goods.total);
                $('#searchResult ul').empty().append(goodViews);
                $('#searchResult ul li').click(function () {
                    console.log($(this))
                    //location.href = '/artical.html?id=' + $(this).attr('data');
                });
                $('#hot').hide();
                $('#recommend').hide();
                $('#searchNone').hide();
                $('#searchResult').show();
            }

        },
        error: function () {
            $('#searchTitle').html(conditions.title);
            $('#title').html(conditions.title);
            $('#searchNone').show();
            if ($('#hot').css('display') == 'none') {
                getRecomendGoods('/api/goods/recommends', 'recommend');
                getRecomendGoods('/api/goods/hots', 'hot');
                $('#hot').show();
                $('#recommend').show();
                $('#searchResult').hide();
            }
        }
    });
}

function getRecomendGoods(url, selector) {
    $.getJSON(url, function (res) {
        var goods = res.data;
        if (selector == 'hot') {
            goods = goods.data;
        }
        $('#' + selector + ' ul').empty();
        for (var i in goods) {
            var good = goods[i];
            $('#' + selector + ' ul').append('<li data="' + good.id + '"><div class="l-l-in"><img src="' + good.image + '">' +
                '<h3 title="' + good.goodsBrand["name"] + ' ' + good.goodsCate["name"] + ' ' + good.title + '">' + good.goodsBrand["name"] + ' ' + good.goodsCate["name"] + ' ' + good.title + '</h3><div class="l-l-detail">' +
                '<p class="l-l-now-price"><span>￥' + good.nowPrice + '</span>/周</p><p class="l-l-pre-price">￥' + good.price + '</p></div></div></li>');
        }
        $('#hot,#recommend ul li').click(function () {
            location.href = '/artical.html?id=' + $(this).attr('data');
        });
    });
}