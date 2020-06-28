$(document).ready(function() {

    $('body').fadeIn('fast');

    // svg_img to inline_svg converter
    $('.icon').each(function() {
        var $img = $(this);
        var imgClass = $img.attr('class');
        var imgURL = $img.attr('src');
        $.get(imgURL, function(data) {
            var $svg = $(data).find('svg');
            if (typeof imgClass !== 'undefined') {
                $svg = $svg.attr('class', imgClass + ' replaced-svg');
            }
            $svg = $svg.removeAttr('xmlns:a');
            if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
            }
            $img.replaceWith($svg);
        }, 'xml');
    });


    $('.stars').each(function(){
        var $rating = $(this).find('.rating').attr('data-rating');
        var i = 0;
        $(this).find('.star').each(function(){
            if( i < $rating){
                $(this).addClass('active');
            }
            i++;
        })
    })
    var wrapW = $('.wrap').width();
    var catW = wrapW - (wrapW / 100 * 20);
    $('.catalog-panel-list_item_block').width(catW);
$(window).resize(function(){
    wrapW = $('.wrap').width();
    catW = wrapW - (wrapW / 100 * 20);
    $('.catalog-panel-list_item_block').width(catW);
})





//catalog start
$('.menuLine-catalogButton').click(function() {
        if ($('.catalog').is(':hidden')) {
            $('.catalog').slideDown('fast');
            $(this).addClass('active');
            $('.menuLine-catalogButton_icon').addClass('close');
            $('.overlay').fadeIn('fast');
        } else {
            $('.catalog').slideUp('fast');
            $(this).removeClass('active');
            $('.menuLine-catalogButton_icon').removeClass('close');
            $('.overlay').fadeOut();
        }
    });
$('.overlay').click(function() {
    $('.catalog').slideUp('fast');
            $('.menuLine-catalogButton').removeClass('active');
            $('.menuLine-catalogButton_icon').removeClass('close');
            $('.overlay').fadeOut();
})
//catalog end
//catalog start
    /*$('.catalog_category-link:first').addClass('active');

    
        $('.catalog_overlay').click(function() {
        $(this).fadeOut('fast');
        $('.catalog').slideUp('fast');
        $('.menuLine-catalogButton_icon').removeClass('close');
        $('.menuLine-catalogButton').removeClass('active');
        $('.header-ui_auth-popup').slideUp('fast');
        $('.header-ui_minicart-popup').slideUp('fast');
    });

    $('.catalog_category-link').hover(function() {
        $(this).addClass('active');
        $('.catalog_category-link').not(this).removeClass('active');
        var resid = $(this).attr('res');
        $('#' + resid).css('display', 'flex');
        $('.catalog_section > ul').not('#' + resid).css('display', 'none');
    });*/
//catalog end

//carousel start
$('.mainBanner_slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: false
});
/*
$('.mainBanner_slider').owlCarousel({
            loop: true,
            nav: false,
            lazyLoad: true,
            autoplay: true,
            autoplayTimeout: 5500,
            smartSpeed: 1000,
            autoplayHoverPause: true,
            dots: true,
            responsiveClass: true,
            items: 1
        });

    var sliders = $('.carousel-products');
    var loop;
    $.each(sliders, function(){
        var srlen = $(this).find('.product').length;
        var vdlen = $(this).find('.vendorlink').length;
        if (srlen > 6 || vdlen > 6 ){ loop = true;}
        else { loop = false; }
        $(this).owlCarousel({
            loop: loop,
            margin: 5,
            nav: false,
            lazyLoad: true,
            autoplay: true,
            autoplayTimeout: 5500,
            smartSpeed: 1000,
            autoplayHoverPause: true,
            dots: false,
            responsiveClass: true,
            responsive : {
                0 : {
                    items: 1
                },
                813 : {
                    items: 4
                },
                1025 : {
                    items: 5
                },
                1370 :{
                    items: 6
                }
            }
        });
    })

var tagline = {
    loop: loop,
    margin: 5,
    nav: false,
    lazyLoad: true,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    autoplayHoverPause: true,
    dots: false,
    responsiveClass: true,
    responsive : {
        0 : {
            items: 2
        },
        812 : {
            items: 3
        },
        1024 : {
            items: 4
        },
        1367 :{
            items: 5
        }
    } 
}
*/
//$('.tagline-block').owlCarousel(tagline);
//carousel control
    $('.mainBanner_ctrl.prev').on('click',function(){
        $('.mainBanner_slider').slick('slickPrev');
    })
    $('.mainBanner_ctrl.next').on('click',function(){
        $('.mainBanner_slider').slick('slickNext');
    })


    $('.navbar-ctrl_prev').on('click',function(){
        $(this).closest('.navbar').next('.carousel-products').trigger("prev.owl.carousel");
    })
    $('.navbar-ctrl_next').on('click',function(){
        $(this).closest('.navbar').next('.carousel-products').trigger("next.owl.carousel");
    })

     $('.tagline_btn').on('click',function(){
        if($(this).closest('.tagline').find('.tagline-block').hasClass('open')){
            $(this).closest('.tagline').find('.tagline-block').toggleClass('open');
            $(this).closest('.tagline').find('.tagline-block').owlCarousel(tagline);
            $(this).text('Все категории');
        }
        else{
            $(this).closest('.tagline').find('.tagline-block').trigger('destroy.owl.carousel');
            $(this).closest('.tagline').find('.tagline-block').toggleClass('open');
            $(this).text('Скрыть');   
        }
        
     })
//carousel end

//to Top button start
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.totop').fadeIn().css('display','flex');
        } else {
            $('.totop').fadeOut();
        }
    });
    
    $('.totop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
//to Top button end

$('.btn_show').on('click',function(){
    $(this).next('.hidden').slideDown();
    $(this).hide();
})
$('.btn_hide').on('click',function(){
    $(this).closest('div').find('.hidden').slideUp();
    $(this).closest('div').find('.btn_show').show();
})


//popup window start

    $('.popup_open').on('click',function(e){
        e.preventDefault();
        $('.popup[data-popup="'+$(this).attr('data-popup')+'"]').fadeIn().css('display','flex');
    })
    $('.popup_close, .popup_overlay').on('click',function(){
        $(this).closest('.popup').fadeOut();
    })
//popup window end

//productPage start
    // Gallery start
    var $wd = $(window).width();
        if (jQuery().slick) {
            var tgThumbs = $('.productPage_gallery_thumbs img').length - 1;
            if (tgThumbs == 0) {
                tgThumbs = 1;
            }
            if (tgThumbs > 3) {
                tgThumbs = 3;
            }

            $('.productPage_gallery_slider').slick({
                infinite: true,
                slidesToShow: 1,
                arrows: false,
                fade: true,
                autoplay: true,
                autoplaySpeed: 5000,
                asNavFor: '.productPage_gallery_thumbs'
            });
            $('.productPage_gallery_thumbs').slick({
                infinite: true,
                asNavFor: '.productPage_gallery_slider',
                arrows: false,
                vertical: true,
                verticalSwiping: true,
                slidesToShow: tgThumbs,
                focusOnSelect: true,
                autoplay: true,
                autoplaySpeed: 5000,
                centerMode: true,
            });
            $('.productPage_gallery_slider').magnificPopup({
                delegate: 'a',
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                removalDelay: 300,
                image: {
                    verticalFit: true,
                },
                gallery: {
                    enabled: true,
                    tCounter: '<span class="mfp-counter">%curr% из %total%</span>'
                },
                zoom: {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                    opener: function(element) {
                        return element.find('img');
                    }
                }
            });
        };
    //Gallery end
//productPage end

// Блок "Количество" - start
function quantityProducts() {
    var $quantityArrowMinus = $(".btn_range.minus");
    var $quantityArrowPlus = $(".btn_range.plus");
    var $quantityNum = $(".productPage-buyblock_range");

    $quantityArrowMinus.click(quantityMinus);
    $quantityArrowPlus.click(quantityPlus);

    function quantityMinus() {
        if ($quantityNum.val() > 1) {
            $quantityNum.val(+$quantityNum.val() - 1);
        }
    }

    function quantityPlus() {
        $quantityNum.val(+$quantityNum.val() + 1);
    }
};
// Блок "Количество" - end

//tabs start   
if ($(".productPage_tabs")) {
        var i = 1;
        $(".productPage_tabs ul li:first").addClass('active_tab');
        $(".productPage_tabs ul li").each(function() {
            if (i <= $('.productPage_tabs_tab').length) {
                $(this).attr('tab_control', 'tabs-' + i);
                i++;
            }
        });
        $('.productPage_tabs_tab:first').show();
        $('.productPage_tabs_tab').not(':first').hide();

        $(".productPage_tabs > ul li").on('click', function() {
            event.preventDefault();
            var tabid = $(this).attr('tab_control');
            $(this).addClass('active_tab');
            $(".productPage_tabs ul li").not(this).removeClass('active_tab');
            $('#' + tabid).show();
            $('.productPage_tabs_tab').not('#' + tabid).hide();
        });
    }

});