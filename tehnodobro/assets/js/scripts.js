$(document).ready(function () {
    //dynamic margin
    const wrap = 1200;
    $(window).on('load resize', function () {
        if ($(window).width() > 500) {
            let fs = $(window).width();
            let pd = (fs - wrap) / 2;
            $('.column--pdright').css('padding-right', pd)
            $('.column--pdleft').css('padding-left', pd)
        }
        else{
            $('.column--pdright').css('padding-right', 0)
            $('.column--pdleft').css('padding-left', 0)
        }
    })

    //dynamic margin end


});