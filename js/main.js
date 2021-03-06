/*

[Main Script]

Project     : SMM24 - Multipurpose Social Media Management and Marketing HTML Template
Author      : themelooks.com
Author URI  : https://themeforest.net/user/themelooks

*/

;(function ($) {
    "use strict";
    
    /* ------------------------------------------------------------------------- *
     * COMMON VARIABLES
     * ------------------------------------------------------------------------- */
    var $wn = $(window),
        $body = $('body');
    
    /* ------------------------------------------------------------------------- *
     * CHECK DATA
     * ------------------------------------------------------------------------- */
    var checkData = function (data, value) {
        return typeof data === 'undefined' ? value : data;
    };

    $(function () {
        /* ------------------------------------------------------------------------- *
         * BACKGROUND IMAGE
         * ------------------------------------------------------------------------- */
        var $bgImg = $('[data-bg-img]');
        
        $bgImg.each(function () {
            var $t = $(this);

            $t.css('background-image', 'url(' + $t.data('bg-img') + ')').addClass('bg--img bg--overlay').attr('data-rjs', 2).removeAttr('data-bg-img');
        });

        /* ------------------------------------------------------------------------- *
         * RETINAJS
         * ------------------------------------------------------------------------- */
        $('img').attr('data-rjs', 2);

        retinajs();
        
        /* ------------------------------------------------------------------------- *
         * STICKY
         * ------------------------------------------------------------------------- */
        var $sticky = $('[data-trigger="sticky"]');
        
        $sticky.each(function () {
            $(this).sticky({
                zIndex: 999
            });
        });

        /* ------------------------------------------------------------------------- *
         * BANNER SECTION
         * ------------------------------------------------------------------------- */
        var $banner = $('.banner--section'),
            $bannerSlider = $banner.find('.banner--slider');

        $bannerSlider.on('initialized.owl.carousel', function (e) {
            var $el = $( e.currentTarget );

            $el.css( 'height', $el.outerHeight() );
        });

        /* ------------------------------------------------------------------------- *
         * OWL CAROUSEL
         * ------------------------------------------------------------------------- */
        var $owlCarousel = $('.owl-carousel');
        
        $owlCarousel.each(function () {
            var $t = $(this);
            
            $t.owlCarousel({
                items: checkData( $t.data('owl-items'), 1 ),
                margin: checkData( $t.data('owl-margin'), 0 ),
                loop: checkData( $t.data('owl-loop'), true ),
                autoplay: checkData( $t.data('owl-autoplay'), true ),
                smartSpeed: checkData( $t.data('owl-speed'), 1200 ),
                autoplaySpeed: 1600,
                mouseDrag: checkData( $t.data('owl-drag'), true ),
                nav: checkData( $t.data('owl-nav'), false ),
                navText: ['', ''],
                dots: checkData( $t.data('owl-dots'), false ),
                responsive: checkData( $t.data('owl-responsive'), {} )
            });
        });
        
        /* ------------------------------------------------------------------------- *
         * MAGNIFIC POPUP
         * ------------------------------------------------------------------------- */
        var $popupImg = $('[data-popup="img"]');
        
        if ( $popupImg.length ) {
            $popupImg.magnificPopup({
                type: 'image'
            });
        }

        var $popupVideo = $('[data-popup="video"]');
        
        if ( $popupVideo.length ) {
            $popupVideo.magnificPopup({
                type: 'iframe'
            });
        }
        
        /* ------------------------------------------------------------------------- *
         * FORM VALIDATION
         * ------------------------------------------------------------------------- */
        var $formValidation = $('[data-form="validate"]');
        
        $formValidation.each(function () {
            var $t = $(this);
            
            $t.validate({
                errorPlacement: function () {
                    return true;
                }
            });
        });
        
        /* ------------------------------------------------------------------------- *
         * FORM AJAX
         * ------------------------------------------------------------------------- */
        var $ajaxForm = $('[data-form="ajax"]');
        
        $ajaxForm.each(function () {
            var $form = $(this),
                $formStatus = $form.find('.status');
            
            $form.validate({
                errorPlacement: function () {
                    return true;
                },
                submitHandler: function (el) {
                    var $form = $(el),
                        formUrl = $form.attr('action'),
                        formData = $form.serialize();

                    $.post(formUrl, formData, function (res) {
                        $formStatus.show().html(res).delay(3000).fadeOut('show');
                    });
                }
            });
        });
        
        /* ------------------------------------------------------------------------- *
         * COUNTER UP
         * ------------------------------------------------------------------------- */
        var $counterUp = $('[data-counter-up="numbers"]');
            
        if ( $counterUp.length ) {
            $counterUp.counterUp({
                delay: 10,
                time: 1000
            });
        }
        
        /* -------------------------------------------------------------------------*
         * COUNTDOWN
         * -------------------------------------------------------------------------*/
        var $countDown = $('[data-countdown]');
            
        $countDown.each(function () {
            var $t = $(this);
            
            $t.countdown($t.data('countdown'), function(e) {
                $(this).html( '<ul>' + e.strftime('<li><strong>%D</strong><span>Day</span></li><li><strong>%H</strong><span>Hour</span></li><li><strong>%M</strong><span>Min</span></li><li><strong>%S</strong><span>Sec</span></li>') + '</ul>' );
            });
        });
        
        /* ------------------------------------------------------------------------- *
         * SPINNER
         * ------------------------------------------------------------------------- */
        var $spinner = $('[data-trigger="spinner"]');

        $spinner.each(function () {
            var $t = $(this);

            $t.spinner({
                min: $t.data('min'),
                max: $t.data('max')
            });
        });

        /* ------------------------------------------------------------------------- *
         * PRICING SECTION
         * ------------------------------------------------------------------------- */
        var $pricing = $('.pricing--section'),
            $pricingItem = $pricing.find('.pricing--item');

        $pricing
            .on('mouseenter', '.pricing--item:not(.active)', function () {
                var $t = $(this);

                $pricingItem.find('.features').slideUp(function () {
                    $(this).parents('.pricing--item').removeClass('active');
                });

                $t.find('.features').slideDown(function () {
                    $(this).parents('.pricing--item').addClass('active').parents('.AdjustRow').isotope({layoutMode: 'fitRows'});
                });
            });

        /* ------------------------------------------------------------------------- *
         * PRICING TABLE SECTION
         * ------------------------------------------------------------------------- */
        var $pricingTable = $('.pricing-table--section'),
            $pricingTableItem = $pricingTable.find('.pricing-table--item'),
            $pricingTableItemHeader = $pricingTableItem.children('.header'),
            pricingTableItemHeaderH = 0,
            $pricingTableItemFeatures = $pricingTableItem.children('.features');

        $pricingTableItemHeader.each(function (e) {
            var $t = $(this);

            if ( $t.outerHeight() > pricingTableItemHeaderH ) {
                pricingTableItemHeaderH = $t.outerHeight()
            }

            if ( e === ( $pricingTableItemHeader.length - 1 ) ) {
                $pricingTableItemHeader.css('height', pricingTableItemHeaderH);
            }
        });

        $pricingTableItemFeatures.find('.nav > li')
            .on('mouseenter', function (e) {
                var $t = $(this);

                $pricingTableItemFeatures.each(function () {
                    $(this).find('.nav > li').eq( $t.index() ).addClass('hovered');
                });
            })
            .on('mouseleave', function (e) {
                $pricingTableItemFeatures.find('.nav > li').removeClass('hovered');
            });

        /* ------------------------------------------------------------------------- *
         * PRODUCTS SECTION
         * ------------------------------------------------------------------------- */
        var $products = $('.products--section'),
            $productSingleImg = $products.find('.product-single--img');

        $productSingleImg.on('click', '[data-toggle="tab"]', function () {
            $(this).parent('.item').addClass('active').parent('.owl-item').siblings().children('.item').removeClass('active');
        });

        
        var $productRatingSelect = $('#productRatingSelect');
        
        if ( $productRatingSelect.length ) {
            $productRatingSelect.barrating({
                theme: 'fontawesome-stars-o',
                hoverState: false
            });
        }

        /* ------------------------------------------------------------------------- *
         * CHECKOUT SECTION
         * ------------------------------------------------------------------------- */
        var $checkout = $('.checkout--section');
        
        $checkout.on('click', '.checkout--info-toggle', function (e) {
            e.preventDefault();

            var $t = $(this);

            $t.toggleClass('active').parent('p').parent('.title').siblings('.checkout--info-form').slideToggle();
        });

        /* ------------------------------------------------------------------------- *
         * TEAM SECTION
         * ------------------------------------------------------------------------- */
        var $team = $('.team--section'),
            $teamMemberInfo = $team.find('.team--member .info');

        $teamMemberInfo.each(function () {
            var $t = $(this);

            $t.parent('.team--member').css( 'padding-bottom', $t.outerHeight() );
        });

        /* ------------------------------------------------------------------------- *
         * MAP
         * ------------------------------------------------------------------------- */
        var $map = $('#map'),
            setMap = function () {
                var map = new google.maps.Map($map[0], {
                    center: {lat: $map.data('map-latitude'), lng: $map.data('map-longitude')},
                    zoom: $map.data('map-zoom'),
                    scrollwheel: false,
                    disableDefaultUI: true,
                    zoomControl: true,
                    styles: [{"featureType":"landscape","stylers":[{"hue":"#FFBB00"},{"saturation":43.400000000000006},{"lightness":37.599999999999994},{"gamma":1}]},{"featureType":"road.highway","stylers":[{"hue":"#FFC200"},{"saturation":-61.8},{"lightness":45.599999999999994},{"gamma":1}]},{"featureType":"road.arterial","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"water","stylers":[{"hue":"#0078FF"},{"saturation":-13.200000000000003},{"lightness":2.4000000000000057},{"gamma":1}]},{"featureType":"poi","stylers":[{"hue":"#00FF6A"},{"saturation":-1.0989010989011234},{"lightness":11.200000000000017},{"gamma":1}]}]
                });
                
                if ( typeof $map.data('map-marker') !== 'undefined' ) {
                    var data = $map.data('map-marker'),
                        i = 0;

                    for ( i; i < data.length; i++ ) {
                        new google.maps.Marker({
                            position: {lat: data[i][0], lng: data[i][1]},
                            map: map,
                            animation: google.maps.Animation.DROP,
                            draggable: true
                        });
                    }
                }
            };
        
        if ( $map.length ) {
            setMap();
        }

        /* ------------------------------------------------------------------------- *
         * FOOTER SECTION
         * ------------------------------------------------------------------------- */
        var $footer = $('.footer--section'),
            $footerWidgetTitle = $footer.find('.widget--title'),
            $footerWidgetLogo = $footer.find('.widget--logo');

        if ( $footerWidgetLogo.length && $footerWidgetLogo.outerHeight() > $footerWidgetTitle.outerHeight() ) {
            $footerWidgetTitle.css( 'margin-top', $footerWidgetLogo.outerHeight() - $footerWidgetTitle.outerHeight() );
        }

        /* ------------------------------------------------------------------------- *
         * BACK TO TOP BUTTON
         * ------------------------------------------------------------------------- */
        var $backToTop = $('.back-to-top-btn');

        $backToTop.on('click', 'a', function (e) {
            e.preventDefault();

            $('html, body').animate({
                scrollTop: 0
            }, 1200);
        });

        /* ------------------------------------------------------------------------- *
         * COLOR SWITCHER
         * ------------------------------------------------------------------------- */
        if ( typeof $.cColorSwitcher !== "undefined" ) {
            $.cColorSwitcher({
                'switcherTitle': 'Main Colors',
                'switcherColors': [{
                    bgColor: '#179ea8',
                    filepath: 'css/colors/color-1.css'
                }, {
                    bgColor: '#82b440',
                    filepath: 'css/colors/color-2.css'
                }, {
                    bgColor: '#ff5252',
                    filepath: 'css/colors/color-3.css'
                }, {
                    bgColor: '#e91e63',
                    filepath: 'css/colors/color-4.css'
                }, {
                    bgColor: '#f69323',
                    filepath: 'css/colors/color-5.css'
                }, {
                    bgColor: '#FC5143',
                    filepath: 'css/colors/color-6.css'
                }, {
                    bgColor: '#00B249',
                    filepath: 'css/colors/color-7.css'
                }, {
                    bgColor: '#D48B91',
                    filepath: 'css/colors/color-8.css'
                }, {
                    bgColor: '#8CBEB2',
                    filepath: 'css/colors/color-9.css'
                }, {
                    bgColor: '#119ee6',
                    filepath: 'css/colors/color-10.css'
                }],
                'switcherTarget': $('#changeColorScheme')
            });
        }
    });
    
    $wn.on('load', function () {
        /* ------------------------------------------------------------------------- *
         * BODY SCROLLING
         * ------------------------------------------------------------------------- */
        var isBodyScrolling = function () {
            if ( $wn.scrollTop() > 1 ) {
                $body.addClass('isScrolling');
            } else {
                $body.removeClass('isScrolling');
            }
        };

        isBodyScrolling();
        $wn.on('scroll', isBodyScrolling);

        /* ------------------------------------------------------------------------- *
         * ADJUST ROW
         * ------------------------------------------------------------------------- */
        var $adjustRow = $('.AdjustRow');
        
        if ( $adjustRow.length ) {
            $adjustRow.isotope({layoutMode: 'fitRows'});
        }
        
        /* ------------------------------------------------------------------------- *
         * GALLERY SECTION
         * ------------------------------------------------------------------------- */
        var $gallery = $('.gallery--section'),
            $galleryFilterMenu = $gallery.find('.gallery--filter-menu'),
            $galleryFilterItems = $gallery.find('.gallery--items');

        if ( $galleryFilterItems.length ) {
            $galleryFilterItems.isotope({
                animationEngine: 'best-available',
                itemSelector: '.gallery--item'
            });
        }

        $galleryFilterMenu.on('click', 'li', function (e) {
            e.preventDefault();

            var $t = $(this),
                f = $t.data('target'),
                s = (f !== '*') ? '[data-cat~="'+ f +'"]' : f;

            $galleryFilterItems.isotope({
                filter: s
            });
            
            $t.addClass('active').siblings().removeClass('active');
        });
        
        /* ------------------------------------------------------------------------- *
         * PRELOADER
         * ------------------------------------------------------------------------- */
        var $preloader = $('#preloader');

        if ( $preloader.length ) {
            $preloader.fadeOut('slow');
        }
    });

})(jQuery);
