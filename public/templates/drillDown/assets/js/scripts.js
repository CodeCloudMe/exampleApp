/*===================================================================================*/
/*	OWL CAROUSEL
/*===================================================================================*/

$(document).ready(function () {

	var dragging = true;
	var owlElementID = '#wide-slider';

	function fadeInReset() {
        if (!dragging) {
            $(owlElementID + " .caption .fadeIn-1, " + owlElementID + " .caption .fadeIn-2, " + owlElementID + " .caption .fadeIn-3").stop().delay(800).animate({ opacity: 0 }, { duration: 400, easing: "easeInCubic" });
        }
        else {
            $(owlElementID + " .caption .fadeIn-1, " + owlElementID + " .caption .fadeIn-2, " + owlElementID + " .caption .fadeIn-3").css({ opacity: 0 });
        }
    }
    
    function fadeInDownReset() {
        if (!dragging) {
            $(owlElementID + " .caption .fadeInDown-1, " + owlElementID + " .caption .fadeInDown-2, " + owlElementID + " .caption .fadeInDown-3").stop().delay(800).animate({ opacity: 0, top: "-15px" }, { duration: 400, easing: "easeInCubic" });
        }
        else {
            $(owlElementID + " .caption .fadeInDown-1, " + owlElementID + " .caption .fadeInDown-2, " + owlElementID + " .caption .fadeInDown-3").css({ opacity: 0, top: "-15px" });
        }
    }
    
    function fadeInUpReset() {
        if (!dragging) {
            $(owlElementID + " .caption .fadeInUp-1, " + owlElementID + " .caption .fadeInUp-2, " + owlElementID + " .caption .fadeInUp-3").stop().delay(800).animate({ opacity: 0, top: "15px" }, { duration: 400, easing: "easeInCubic" });
        }
        else {
            $(owlElementID + " .caption .fadeInUp-1, " + owlElementID + " .caption .fadeInUp-2, " + owlElementID + " .caption .fadeInUp-3").css({ opacity: 0, top: "15px" });
        }
    }
    
    function fadeInLeftReset() {
        if (!dragging) {
            $(owlElementID + " .caption .fadeInLeft-1, " + owlElementID + " .caption .fadeInLeft-2, " + owlElementID + " .caption .fadeInLeft-3").stop().delay(800).animate({ opacity: 0, left: "15px" }, { duration: 400, easing: "easeInCubic" });
        }
        else {
            $(owlElementID + " .caption .fadeInLeft-1, " + owlElementID + " .caption .fadeInLeft-2, " + owlElementID + " .caption .fadeInLeft-3").css({ opacity: 0, left: "15px" });
        }
    }
    
    function fadeInRightReset() {
        if (!dragging) {
            $(owlElementID + " .caption .fadeInRight-1, " + owlElementID + " .caption .fadeInRight-2, " + owlElementID + " .caption .fadeInRight-3").stop().delay(800).animate({ opacity: 0, left: "-15px" }, { duration: 400, easing: "easeInCubic" });
        }
        else {
            $(owlElementID + " .caption .fadeInRight-1, " + owlElementID + " .caption .fadeInRight-2, " + owlElementID + " .caption .fadeInRight-3").css({ opacity: 0, left: "-15px" });
        }
    }
    
    function fadeIn() {
        $(owlElementID + " .active .caption .fadeIn-1").stop().delay(500).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
        $(owlElementID + " .active .caption .fadeIn-2").stop().delay(700).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
        $(owlElementID + " .active .caption .fadeIn-3").stop().delay(1000).animate({ opacity: 1 }, { duration: 800, easing: "easeOutCubic" });
    }
    
    function fadeInDown() {
        $(owlElementID + " .active .caption .fadeInDown-1").stop().delay(500).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
        $(owlElementID + " .active .caption .fadeInDown-2").stop().delay(700).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
        $(owlElementID + " .active .caption .fadeInDown-3").stop().delay(1000).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
    }
    
    function fadeInUp() {
        $(owlElementID + " .active .caption .fadeInUp-1").stop().delay(500).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
        $(owlElementID + " .active .caption .fadeInUp-2").stop().delay(700).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
        $(owlElementID + " .active .caption .fadeInUp-3").stop().delay(1000).animate({ opacity: 1, top: "0" }, { duration: 800, easing: "easeOutCubic" });
    }
    
    function fadeInLeft() {
        $(owlElementID + " .active .caption .fadeInLeft-1").stop().delay(500).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
        $(owlElementID + " .active .caption .fadeInLeft-2").stop().delay(700).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
        $(owlElementID + " .active .caption .fadeInLeft-3").stop().delay(1000).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
    }
    
    function fadeInRight() {
        $(owlElementID + " .active .caption .fadeInRight-1").stop().delay(500).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
        $(owlElementID + " .active .caption .fadeInRight-2").stop().delay(700).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
        $(owlElementID + " .active .caption .fadeInRight-3").stop().delay(1000).animate({ opacity: 1, left: "0" }, { duration: 800, easing: "easeOutCubic" });
    }

    $('#wide-slider').owlCarousel({
		
		autoPlay: 5000,
        stopOnHover: true,
        navigation: true,
        pagination: true,
        singleItem: true,
        addClassActive: true,
        transitionStyle: "fade",
        lazyLoad : true,

		afterInit: function() {
            fadeIn();
            fadeInDown();
            fadeInUp();
            fadeInLeft();
            fadeInRight();
        },
            
        afterMove: function() {
            fadeIn();
            fadeInDown();
            fadeInUp();
            fadeInLeft();
            fadeInRight();
            
        },
        
        afterUpdate: function() {
            fadeIn();
            fadeInDown();
            fadeInUp();
            fadeInLeft();
            fadeInRight();
        },
        
        startDragging: function() {
            dragging = true;
        },
        
        afterAction: function() {
            fadeInReset();
            fadeInDownReset();
            fadeInUpReset();
            fadeInLeftReset();
            fadeInRightReset();
            dragging = false;

        }
	});
	
	$('.prod-slider-4').owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		itemsCustom : [
			[0, 1],
			[450, 1],
			[600, 1],
			[700, 2],
			[1000, 4],
			[1200, 4],
			[1400, 4],
			[1600, 4]
		],
		navigationText: ["", ""]
	});

	$('.prod-slider-5').owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		itemsCustom : [
			[0, 1],
			[450, 1],
			[600, 1],
			[700, 2],
			[1000, 5],
			[1200, 5],
			[1400, 5],
			[1600, 5]
		],
		navigationText: ["", ""]
	});

	$('#logo-slider').owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400
	});

	$('#facet-slider').owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		singleItem: true,
		navigationText: ["", ""]
	});

	$('.prod-slider-small').owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		itemsCustom : [
			[0, 1],
			[450, 1],
			[600, 1],
			[700, 2],
			[1000, 3],
			[1200, 3],
			[1400, 3],
			[1600, 3]
		],
		navigationText: ["", ""]
	});

	$('.upsell-products').owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		itemsCustom : [
			[0, 1],
			[450, 1],
			[600, 1],
			[700, 2],
			[1000, 4],
			[1200, 4],
			[1400, 4],
			[1600, 4]
		],
		navigationText: ["", ""]
	});

	$(".blog-slider").owlCarousel({
		navigation : true,
		slideSpeed : 300,
		paginationSpeed : 400,
		itemsCustom : [
			[0, 1],
			[450, 1],
			[600, 1],
			[700, 1],
			[1000, 2],
			[1200, 2],
			[1400, 2],
			[1600, 2]
		],
		navigationText: ["", ""]
	});

	var $owl_controls_custom = $('.owl-controls-custom');
	$('.owl-next' , $owl_controls_custom).click(function(event){
		var selector = $(this).data('owl-selector');
		var owl = $(selector).data('owlCarousel');
		owl.next();
		return false;
	});
	$('.owl-prev' , $owl_controls_custom).click(function(event){
		var selector = $(this).data('owl-selector');
		var owl = $(selector).data('owlCarousel');
		owl.prev();
		return false;
	});
});

/*===================================================================================*/
/*	BX SLIDER
/*===================================================================================*/

$(document).ready(function() {
	$('#prod-image-slider').bxSlider({
		minSlides: 5,
		maxSlides: 5,
		mode: 'vertical',
		slideMargin: 20,
		infiniteLoop : false,
		easing : 'linear',
		adaptiveHeight : true,
		pager : false,
		moveSlides : 1,
		nextText : '',
		prevText : ''
	});

	$('#prod-image-slider .prod-image a').click(function(){
		var $img = $(this).find('img');
		var src = $img.attr('src');
		$('#prod-image').attr('src' , src);
		$('#prod-image-link').attr('href' , src);
		$('#prod-image-slider').find('li').removeClass('active');
		$(this).closest('li').addClass('active');
		return false;
	});
});

/*===================================================================================*/
/*	PAGE HOME 5
/*===================================================================================*/

$(document).ready(function(){
	$('.product-nav-item-inner').click(function(event){
		var target = $(this).data('target'), parent = $(this).data('parent');
		console.log(parent); console.log(target);
		$(parent).find('.collapse').removeClass('in');
		$(target).addClass('in');
		$product_nav = $(this).closest('.product-nav');
		$product_nav.find('.product-nav-item-inner').removeClass('active');
		$(this).addClass('active');
		return false;
	});
});


/*===================================================================================*/
/*	RATING
/*===================================================================================*/

$(document).ready(function(){
	$('.rating').rateit({max: 5, step: 1, value : 3, resetable : false , readonly : true});
});

/*===================================================================================*/
/*  WOW 
/*===================================================================================*/

$(document).ready(function () {
    new WOW().init();
});

/*===================================================================================*/
/*  RANGE SLIDER
/*===================================================================================*/

$(document).ready(function(){
	
	$("#facet-range").slider({
		range: true,
		min: 0,
		max: 500,
		values: [75, 300],
		slide: function(event, ui){
			$("#facet-range-min").html("$" + ui.values[0]);
			$("#facet-range-max").html("$" + ui.values[1]);
		}
	});
	
	setTimeout(function(){
		$("#facet-range-min").html("$" + $("#facet-range").slider("values", 0));
		$("#facet-range-max").html("$" + $("#facet-range").slider("values", 1));
	} , 500);
});

/*===================================================================================*/
/*  FILTER TABS
/*===================================================================================*/

$(document).ready(function(){
	
	$('#filter-tabs li a').click(function(){
		var $this = $(this);
		var selector = $this.attr('href');
		var tab_group = $this.data('group');
		$('#filter-tabs li').removeClass('active');

		$('.'+tab_group).fadeOut('fast', function() {
			$(selector).fadeIn('fast', function() {
				$this.closest('li').addClass('active');
			});
		});
		return false;
	});
	
	$('#filter-tabs li.active a').click();
});

/*===================================================================================*/
/*  HTML5 LAZY LOAD ACTIVATOR
/*===================================================================================*/

$(document).ready(function(){
	
});

/*===================================================================================*/
/*	GO TO TOP / SCROLL UP
/*===================================================================================*/

! function (a, b, c) {
	a.fn.scrollUp = function (b) {
		a.data(c.body, "scrollUp") || (a.data(c.body, "scrollUp", !0), a.fn.scrollUp.init(b))
	}, a.fn.scrollUp.init = function (d) {
		var e = a.fn.scrollUp.settings = a.extend({}, a.fn.scrollUp.defaults, d),
			f = e.scrollTitle ? e.scrollTitle : e.scrollText,
			g = a("<a/>", {
				id: e.scrollName,
				href: "#top"/*,
				title: f*/
			}).appendTo("body");
		e.scrollImg || g.html(e.scrollText), g.css({
			display: "none",
			position: "fixed",
			zIndex: e.zIndex
		}), e.activeOverlay && a("<div/>", {
			id: e.scrollName + "-active"
		}).css({
			position: "absolute",
			top: e.scrollDistance + "px",
			width: "100%",
			borderTop: "1px dotted" + e.activeOverlay,
			zIndex: e.zIndex
		}).appendTo("body"), scrollEvent = a(b).scroll(function () {
			switch (scrollDis = "top" === e.scrollFrom ? e.scrollDistance : a(c).height() - a(b).height() - e.scrollDistance, e.animation) {
			case "fade":
				a(a(b).scrollTop() > scrollDis ? g.fadeIn(e.animationInSpeed) : g.fadeOut(e.animationOutSpeed));
				break;
			case "slide":
				a(a(b).scrollTop() > scrollDis ? g.slideDown(e.animationInSpeed) : g.slideUp(e.animationOutSpeed));
				break;
			default:
				a(a(b).scrollTop() > scrollDis ? g.show(0) : g.hide(0))
			}
		}), g.click(function (b) {
			b.preventDefault(), a("html, body").animate({
				scrollTop: 0
			}, e.scrollSpeed, e.easingType)
		})
	}, a.fn.scrollUp.defaults = {
		scrollName: "scrollUp",
		scrollDistance: 300,
		scrollFrom: "top",
		scrollSpeed: 300,
		easingType: "linear",
		animation: "fade",
		animationInSpeed: 200,
		animationOutSpeed: 200,
		scrollText: "Scroll to top",
		scrollTitle: !1,
		scrollImg: !1,
		activeOverlay: !1,
		zIndex: 2147483647
	}, a.fn.scrollUp.destroy = function (d) {
		a.removeData(c.body, "scrollUp"), a("#" + a.fn.scrollUp.settings.scrollName).remove(), a("#" + a.fn.scrollUp.settings.scrollName + "-active").remove(), a.fn.jquery.split(".")[1] >= 7 ? a(b).off("scroll", d) : a(b).unbind("scroll", d)
	}, a.scrollUp = a.fn.scrollUp
}(jQuery, window, document);

$(document).ready(function () {
	$.scrollUp({
		scrollName: "scrollUp", // Element ID
		scrollDistance: 300, // Distance from top/bottom before showing element (px)
		scrollFrom: "top", // "top" or "bottom"
		scrollSpeed: 1000, // Speed back to top (ms)
		easingType: "easeInOutCubic", // Scroll to top easing (see http://easings.net/)
		animation: "fade", // Fade, slide, none
		animationInSpeed: 200, // Animation in speed (ms)
		animationOutSpeed: 200, // Animation out speed (ms)
		scrollText: "<i class='fa fa-chevron-up'></i>", // Text for element, can contain HTML
		scrollTitle: " ", // Set a custom <a> title if required. Defaults to scrollText
		scrollImg: 0, // Set true to use image
		activeOverlay: 0, // Set CSS color to display scrollUp active point, e.g "#00FFFF"
		zIndex: 1001 // Z-Index for the overlay
	});
});