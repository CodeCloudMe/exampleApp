/* ---------------------------------------------
 common scripts
 --------------------------------------------- */

;(function () {

    "use strict"; // use strict to start

    /* ---------------------------------------------
     tb preloader init
     --------------------------------------------- */
    $(window).on('load', function() {
        $("body").imagesLoaded(function(){
            $(".tb-preloader-wave").fadeOut();
            $("#tb-preloader").delay(200).fadeOut("slow").remove();
        });
    });

    /* ---------------------------------------------
     WOW init
     --------------------------------------------- */
    if (typeof WOW == "function")
    new WOW().init();

    $(document).ready(function () {

        /* ---------------------------------------------
         top nav init
         --------------------------------------------- */

        $('#first-menu').easyPie();

        /* ---------------------------------------------
         add sticky
         --------------------------------------------- */


        $(window).scroll(function () {
            var wSize = $(window).width();
            if (wSize > 800 && $(this).scrollTop() > 1) {
                $('#header').addClass("sticky");
                $('#second-menu').easyPie();
            }
            else {
                $('#header').removeClass("sticky");
            }
        });

        /* ---------------------------------------------
         toggle bar
         --------------------------------------------- */

        $('.toggle-bar').on('click', function () {
            $(this).toggleClass('exit');
            $(this).next().toggleClass('nav-show')
        });


        /* ---------------------------------------------
         retina fix
         --------------------------------------------- */
        if (window.devicePixelRatio > 1) {
            $(".retina").imagesLoaded(function () {
                $(".retina").each(function () {
                    var src = $(this).attr("src").replace(".", "@2x.");
                    var h = $(this).height();
                    var w = $(this).width();
                    $(this).attr("src", src).css({height: h, width: 'auto'});
                });
            });
        }
        ;


        /* ---------------------------------------------
         Progress bars
         --------------------------------------------- */

        function animateProgressbar(pb) {
            if ($.fn.visible && $(pb).visible() && ! $(pb).hasClass('animated')) {
                $(pb).css('width', $(pb).attr("aria-valuenow") + "%");
                $(pb).addClass('animated');
            }
        }

        function initProgressBar() {
            var progressBar = $(".progress-bar");
            progressBar.each(function () {
                animateProgressbar(this);
            });
        }

        initProgressBar();

        $(window).on("scroll", function () {
            initProgressBar();
        });

        /* ---------------------------------------------
         Fun facts
         --------------------------------------------- */
        function animateFacts(fact) {
            if($.fn.visible && $(fact).visible() && ! $(fact).hasClass('animated') ) {
                $(fact).animateNumber({
                    number: parseInt($(fact).data('target'),10),
                }, 2000);
                $(fact).addClass('animated');
            }
        }

        function initFunFacts() {
            var funFacts = $('.fun-box').find('.value');
            funFacts.each(function() {
                animateFacts(this);
            });
        }
        
        initFunFacts();

        $(window).on("scroll", function () {
            initFunFacts();
        });

        /* ---------------------------------------------
         testimonial
         --------------------------------------------- */

        if ($.fn.owlCarousel) {

            $("#testimonial-feed").owlCarousel({
                autoPlay: 3000, //Set AutoPlay to 3 seconds
                items: 1,
                navigation : true,
                pagination: false,
                itemsDesktop : [1000,3], //5 items between 1000px and 901px
                itemsDesktopSmall : [900,2], // betweem 900px and 601px
                itemsTablet: [600,2], //2 items between 600 and 0
                itemsMobile : [479,1] // itemsMobile disabled - inherit from itemsTablet option
            });

        }

        /* ---------------------------------------------
         portfolio filtering
         --------------------------------------------- */

        var $portfolio = $('.portfolio');
        if ($.fn.imagesLoaded && $portfolio.length > 0) {
            imagesLoaded($portfolio, function () {
                $portfolio.isotope({
                    itemSelector: '.portfolio-item',
                    filter: '*'
                });
                $(window).trigger("resize");
            });
        }

        $('.portfolio-filter').on('click', 'a', function (e) {
            e.preventDefault();
            $(this).parent().addClass('active').siblings().removeClass('active');
            var filterValue = $(this).attr('data-filter');
            $portfolio.isotope({filter: filterValue});
        });

        /* ---------------------------------------------
         Back To Top
         --------------------------------------------- */
        $('body').append('<a id="tb-scroll-to-top" data-scroll class="tb-scroll-to-top-hide" href="#"><i class="fa fa-angle-up"></i></a>');

        var tbScrollBack = $('#tb-scroll-to-top');
        $(window).on('scroll', function() {
            if($(this).scrollTop() > 250 ) {
                tbScrollBack
                .addClass('tb-scroll-to-top-show')
                .removeClass('tb-scroll-to-top-hide');
            } else {
                tbScrollBack
                .addClass('tb-scroll-to-top-hide')
                .removeClass('tb-scroll-to-top-show');
            }
        });

        tbScrollBack.on('click', function(e){
            e.preventDefault();
            $('html,body').animate({
                scrollTop: 0
            }, 400 );
        });

    });

})(jQuery);