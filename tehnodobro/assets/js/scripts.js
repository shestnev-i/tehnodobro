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
function catWrap() {
    var wrapW = $('.catalog').width();
    var pnW;
    wrapW <= 1024 ? pnW=30 : pnW=20;
    var catW = wrapW - (wrapW / 100 * pnW) - 2;
    $('.menu-panel').width(Math.floor(catW));
}
catWrap();
$(window).resize(function(){
    catWrap();
});


$('.header-item__form').find('input').on('keyup click',function(){
    $(this).val().length > 2 ? $('.header-item__list').addClass('active') : $('.header-item__list').removeClass('active');
})
$(document).mouseup(function (e){
    var el = $('.header-item__list');
    if (!el.is(e.target) && el.has(e.target).length === 0) { 
        el.removeClass('active');
    }
});


//burger

    $('.burger').click(function () {
        $(this).toggleClass('active');
    });

//burger end



//mobile catalog
    $('.js-menu-item').on('click',function(e){
        if ($(this).next().hasClass('js-submenu') && $(window).width()<= 820){
            e.preventDefault();
            $(this).next().addClass('active');  
        }
    })

    $('.menu-panel-header__back').on('click',function(){
        $(this).closest('.js-submenu').removeClass('active');
    })
//mobile catalog end

//catalog start
$('.menuLine-catalogButton').click(function() {
        if ($('.catalog').is(':hidden')) {
            $('.catalog').slideDown('fast');
            $(this).addClass('active');
            $('.menuLine-catalogButton_icon').addClass('close');
            $('.catalog-overlay').fadeIn();
        } else {
            $('.catalog').slideUp('fast');
            $(this).removeClass('active');
            $('.menuLine-catalogButton_icon').removeClass('close');
            $('.catalog-overlay').fadeOut();
        }
    });
$(document).mouseup(function (e){
    if ($(window).width() >= 820){
        var el = $('.catalog');
        if (!el.is(e.target) && el.has(e.target).length === 0) { 
            el.slideUp();
            $('.menuLine-catalogButton_icon').removeClass('close');
            $('.catalog-overlay').fadeOut();
        }
    }
});
//catalog end

//carousel start
$('.mainBanner_slider').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    arrows: false,
    fade: true,
    cssEase: 'linear',
    lazyLoad: 'ondemand',
    autoplay: true,
    autoplaySpeed: 2000
});
$('.contactPage_block.gallery').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    dots: false,
    arrows: false,
    fade: true,
    cssEase: 'linear',
    lazyLoad: 'ondemand',
    autoplay: true,
    autoplaySpeed: 2000
});
    var sliders = $('.carousel-products');
    $.each(sliders, function(){
        $(this).owlCarousel({
            loop: true,
            margin: 10,
            nav: false,
            dots: false,
            lazyLoad: true,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000,
            autoplayHoverPause: true,
            responsiveClass: true,
            responsiveBaseElement: ".carousel-products",
            responsive: {
                0 : {
                    items: 1.27
                },
                640 : {
                    items: 3
                },
                1000 : {
                    items: 4
                },
                1370 : {
                    items: 6
                }
            }
        })
    })

var tagline = {
    loop: true,
    nav: false,
    dots: false,
    margin: 10,
    autoplay: true,
    autoplayTimeout: 5000,
    smartSpeed: 1000,
    responsiveClass: true,
    responsive:{
        0:{
            items:1
        },
        420:{
            items:2
        },
        820:{
            items:3
        },
        1366:{
            items:5
        }
    }
}
$('.tagline-block').owlCarousel(tagline);
//carousel control
    $('.mainBanner_ctrl.prev').on('click',function(){
        $('.mainBanner_slider').slick('slickPrev');
    })
    $('.mainBanner_ctrl.next').on('click',function(){
        $('.mainBanner_slider').slick('slickNext');
    })

    $('.navbar-ctrl_prev').on('click',function(){
        $(this).closest('.navbar').next('.carousel-products').trigger('prev.owl.carousel');
    })
    $('.navbar-ctrl_next').on('click',function(){
        $(this).closest('.navbar').next('.carousel-products').trigger('next.owl.carousel');
    })

     $('.tagline_btn').on('click',function(){
         let tagbtn = $(this).attr('data-text');
         if(!tagbtn){tagbtn="Все категории"}
        if($(this).closest('.tagline').hasClass('open')){
            $(this).closest('.tagline').toggleClass('open');
            $(this).closest('.tagline').find('.tagline-block').owlCarousel(tagline);
            $(this).text(tagbtn);
        }
        else{
            $(this).closest('.tagline').find('.tagline-block').trigger('destroy.owl.carousel');
            $(this).closest('.tagline').toggleClass('open');
            $(this).text('Скрыть');   
        }
     })
//carousel end

//to Top button start
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.totop_btn').fadeIn().css('display','flex');
        } else {
            $('.totop_btn').fadeOut();
        }
    });
    $('.totop_btn').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 500);
        return false;
    });
    var $topEl = $('.footer');
    function inViewport($el) {
        var elH = $el.outerHeight(),
            H = $(window).height(),
            r = $el[0].getBoundingClientRect(), t=r.top, b=r.bottom,
            ww;
        $(window).width()< 820 ? ww = 70 : ww = 0;
            
        return Math.max(ww, t>0? Math.min(elH, H-t) : (b<H?b:H));
    }

    $(window).on("scroll resize", function(){
        $('.totop').css('bottom',''+ inViewport($topEl) +'px');
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
            $('.contactPage_block.gallery').magnificPopup({
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
            $('.blogpage-product__image').magnificPopup({
                delegate: 'a',
                type: 'image',
                closeOnContentClick: false,
                closeBtnInside: false,
                removalDelay: 300,
                image: {
                    verticalFit: true,
                },
                zoom: {
                    enabled: true,
                    duration: 300, // don't foget to change the duration also in CSS
                    opener: function (element) {
                        return element.find('img');
                    }
                }
            });
        };
    //Gallery end
//productPage end

// Блок "Количество" - start
$('.btn_range.minus').on('click', function(){
    var range = $(this).next(); 
    if(range.val() > 1){
        range.val(+range.val() - 1);  
    }
})
$('.btn_range.plus').on('click', function(){
    var range = $(this).prev();
    range.val(+range.val() + 1);
})

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
    var filterRange = $('.prodcat_filter_slider');
    $.each(filterRange, function(){
        var rangeMin = $(this).find('input[filter-range="min"]').attr('value');
        var rangeMax = $(this).find('input[filter-range="max"]').attr('value');
        $(this).find('.prodcat_filter_slider_range').slider({
              range: true,
              min: + rangeMin,
              max: + rangeMax,
              values: [ rangeMin, rangeMax ],
              slide: function( event, ui ) {
                $(this).parent().find('input[filter-range="min"]').val( ui.values[ 0 ] );
                $(this).parent().find('input[filter-range="max"]').val( ui.values[ 1 ] );
              }
            });
            
            $('input[filter-range="min"]').on('change',function(){
                var thval = $(this).val();
                var rmin;
                if (parseInt(thval) < parseInt(rangeMin)) { rmin = 0; }
                else if (parseInt(thval) > parseInt(rangeMax)) { rmin = rangeMax; }
                else { rmin = thval; };
                $(this).closest('.prodcat_filter_slider').find('.prodcat_filter_slider_range').slider("values", 0, rmin);
                $(this).val(rmin);
            });

            $('input[filter-range="max"]').on('change',function(){
                var thval = $(this).val();
                var rmax;
                if (parseInt(thval) > parseInt(rangeMax)) { rmax = rangeMax; }
                else if (parseInt(thval) < parseInt(rangeMin)) { rmax = rangeMin; }
                else { rmax = thval; };
                $(this).closest('.prodcat_filter_slider').find('.prodcat_filter_slider_range').slider("values", 1, rmax);
                $(this).val(rmax);
            });

        });

    $('.prodcat_filter_top').on('click', function(){
        $(this).next().slideToggle();
        $(this).find('.prodcat_filter_ancer').toggleClass('close');
    })
//compare start

$('.comparePage_head_btns').find('.prev').on('click',function(){
    var item = Math.ceil($('.comparePage_item').width());
    var pos = $('.comparePage_row').css("left").replace('px', '');
    $('.comparePage_row').animate({left: "+=" + item},500, "linear"); 
})
$('.comparePage_head_btns').find('.next').on('click',function(){
    var item = $('.comparePage_item').width();
    $('.comparePage_row').animate({left: "-=" + item},500, "linear");
})
if($('.comparePage_row').width() > $('.wrap').width()){
        $('.comparePage').addClass('slider');
        $('.comparePage_head_btns').fadeIn().css('display','flex');
    }
else{
        $('.comparePage').removeClass('slider');
        $('.comparePage_head_btns').fadeOut();
    }

//compare end


//reviewTabs

    $('.reviewPage_control_item').on('click',function(){
        if($(this).hasClass('active') === false){
            $(this).addClass('active');
            $('.reviewPage_control_item').not(this).removeClass('active');
            $('.reviewPage_list_block[reviewId="'+$(this).attr('reviewId')+'"]').addClass('active');
            $('.reviewPage_list_block[reviewId="'+$('.reviewPage_control_item').not(this).attr('reviewId')+'"]').removeClass('active');
        }
    })

//reviewTabs end


if($wd < 1024){
    $('.catalog-panel-list_item').on('click',function(){
        $(this).find('.catalog-panel-list_item_block').slideToggle();
        $(this).find('.catalog-panel-list_item_link').toggleClass('linked');

        $('.catalog-panel-list_item').not(this).find('.catalog-panel-list_item_block').slideUp();
    })
}

$(document).mouseup(function (e){
    var el = $('.menuLine-menu li');
    if (!el.is(e.target) && el.has(e.target).length === 0) { 
        $('.menuLine-menu_sub').removeClass('open');
    }
});



//comment_stars start
$('.comments-form-item_stars span').on('click',function(){
    $('.comments-form-item_stars input').val($(this).attr('data-rating'));
    $('.comments-form-item_stars input').change();
})

$('.comments-form-item_stars input').on('change',function(){
    var svalue = $(this).val();
    $('.comments-form-item_stars span').each(function(){
        if ($(this).attr('data-rating') <= svalue){
            $(this).addClass('active');
        }
        else{
            $(this).removeClass('active');   
        }
    })
})
//comment_stars end


//prodcat_btn start

    $('.prodcat_top_btn').on('click',function(){
        $('.prodcat-sidebar').toggleClass('open');
        $('.prodcat-overlay').fadeToggle();
    })
    $('.prodcat-overlay').on('click',function(){
        $('.prodcat-sidebar').toggleClass('open');
        $('.prodcat-overlay').fadeToggle();
    })
    $('.prodcat_btns button').on('click',function(){
        $('.prodcat-sidebar').removeClass('open');
        $('.prodcat-overlay').fadeOut();
    })

    $('.prodcat-sidebar__close').on('click', function () {
        $('.prodcat-sidebar').removeClass('open');
        $('.prodcat-overlay').fadeOut();
    })

//prodcat_btn end


//topsort start

    $('.prodcat_top_block_sort_link').on('click',function(){
        $(this).next().toggleClass('open');
        $('.prodcat_top_block_sort_link').not(this).next().removeClass('open');
    })
    $('.prodcat_top_block_sort_list_item').on('click',function(){
        $(this).parent().prev().find('.prodcat_top_block_sort_link_title').text($(this).text());
        $(this).parent().removeClass('open');
    })
    $(document).mouseup(function (e){
        var el = $('.prodcat_top_block_sort_link');
        if (!el.is(e.target) && el.has(e.target).length === 0) { 
            el.next().removeClass('open');
        }
    });
    

$('.prodcat_top_sort').on('click',function(){
    $(this).toggleClass('active');
    $('.prodcat_top_block').slideToggle();
})

//topsort end

//opportunity tabs
    $('.opportunity__item').on('click',function () {
        var vacid = $(this).attr('data-item');
        $(this).addClass('selected');
        $('.opportunity__item').not(this).removeClass('selected');
        $('.opportunity__tab').removeClass('selected');
        $('.opportunity__tab[data-info="'+ vacid +'"]').addClass('selected');
        if ($(window).width() <= 640){
            var wel = ($('.opportunity__tab[data-info="' + vacid + '"]').offset().top) - 20;
            $('body,html').animate({ scrollTop: wel }, 500);
        }
    })
//opportunity_end

//open mobileCatalog

    $('.btn--mcat').on('click', function(){
        $('.js-aside').toggleClass('active');
    })

//open mobileCatalog end


//toc possition
    function tocPoss(element) {
        var rect = element.getBoundingClientRect();
        return (
            rect.top <= 0
        );
    }

    $(window).scroll(function () {
        $(".blogpage-body__section").each(function (index, element) {
            if (tocPoss(element)) {
                let toc_id = $(this).attr('id');
                $(".toc__item a").each(function () {
                    let toc_link = $(this).attr('href').replace('#','');
                    if (toc_link == toc_id){
                        $(this).addClass('toc__item--view');
                        $(".toc__item a").not(this).removeClass('toc__item--view');
                    }
                })
            }
        })
    })
//toc possition end



});