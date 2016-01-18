/**
 * Created by wanglei on 2016/1/18.
 */

$(function(){
    $.getJSON("data/data.json",function(data){
        console.log(data);
        $.each(data["cates"],function(index,esc){
            console.log(esc);
            $(".l-c-sub").append('<a data-id="'+esc["id"]+'">'+esc["cate"]+'</a>');

        });
        $.each(data["ages"],function(index,esc){
            $(".l-a-sub").append('<a data-id="'+esc["id"]+'">'+esc["age"]+'</a>');
        });

        $(".l-catena a").click(function(){
            $(".l-catena").find(".active").removeClass("active");
            $(this).addClass("active");
        });
        $(".l-ages a").click(function(){
            $(".l-ages").find(".active").removeClass("active");
            $(this).addClass("active");
        });

    });

});