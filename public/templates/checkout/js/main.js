(function ($) {
 "use strict";
	
$(function(){
/*---------------------
 jQuery MeanMenu
--------------------- */
	jQuery('nav#dropdown').meanmenu();
/*---------------------
 2. tooltip
--------------------- */	
	$('[data-toggle="tooltip"]').tooltip(); 

/*---------------------
 3. scrollUp
--------------------- */	
	$.scrollUp({
      scrollText: '<i class="fa fa-angle-up"></i>',
      easingType: 'linear',
      scrollSpeed: 900,
      animation: 'fade'
    });	

/*---------------------
 mixItUp
--------------------- */  
  $('.portfolio-content').mixItUp();

  $("li:first-child.filter").addClass("active");

/*---------------------
fancybox
--------------------- */  
  $('.fancybox').fancybox();

/*---------------------
Image Zoom
--------------------- */
  $('.simpleLens-big-image').simpleLens({
    loading_image: 'demo/images/loading.gif'
  }); 
  
/* --------------------------------------------------------
   FAQ-accordion
* -------------------------------------------------------*/ 
  $('.panel-heading a').on('click', function() {
    $('.panel-default').removeClass('actives');
    $(this).parents('.panel-default').addClass('actives');
  });

/*---------------------
 4. header-product-category
--------------------- */
  $(".cate-toggler").on('click', function(){
      $(".product-category ul").toggle();
  });

  /*---------------------
 6. category-saide-bar-togle
--------------------- */
  $(".morecate").on('click', function(){
      $(".lesscate").css("display","block");
      $(this).hide();
  });
  $(".lesscate").on('click', function(){
      $(".morecate").css("display","block");
      $(this).hide();
  });

  $(".catemenu-toggler").on('click', function(){
      $(".category-saidebar").toggle();
  });

/*---------------------
 1. owl-carousel
--------------------- */
  $(".product-carusol").owlCarousel({
	
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 4,
    itemsDesktop : [1199,4],
    itemsDesktopSmall : [979,3],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 2. owl-carousel
--------------------- */
  $(".new-product").owlCarousel({
    
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 2,
    itemsDesktop : [1199,2],
    itemsDesktopSmall : [979,2],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 3. owl-carousel
--------------------- */
  $(".featured-product").owlCarousel({
    
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 2,
    itemsDesktop : [1199,2],
    itemsDesktopSmall : [979,2],
    itemsMobile : [767,1],
 
  }); 

  /*---------------------
 4. owl-carousel
--------------------- */
  $(".blog-carusol").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 4,
    itemsDesktop : [1199,4],
    itemsDesktopSmall : [979,3],
    itemsMobile : [767,1],
 
  });	

  $(".blog-area-3").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 4. owl-carousel
--------------------- */
  $(".logo-brand").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 5,
    itemsDesktop : [1199,5],
    itemsDesktopSmall : [979,3],
    itemsMobile : [767,1],
 
  });

  $(".logo-brand-3").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 5,
    itemsDesktop : [1199,5],
    itemsDesktopSmall : [979,3],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 5. owl-carousel
--------------------- */
  $(".testimonials-list").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : false,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :true,
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 5. owl-carousel
--------------------- */
  $(".product-carusol-3").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 3,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,2],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 6. owl-carousel
--------------------- */
  $(".product-category-carosul").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 4,
    itemsDesktop : [1199,4],
    itemsDesktopSmall : [979,3],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 7. owl-carousel
--------------------- */
  $(".testimonial").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 8. owl-carousel
--------------------- */
  $(".product-category-carosul-5").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 3,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,2],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 9. owl-carousel
--------------------- */
  $(".brand-carosul").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 10. owl-carousel
--------------------- */
  $(".product-category-carosul-6").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 3,
    itemsDesktop : [1199,3],
    itemsDesktopSmall : [979,2],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 11. owl-carousel
--------------------- */
  $(".best-sellers-carusul").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 4,
    itemsDesktop : [1199,4],
    itemsDesktopSmall : [979,3],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 11. owl-carousel
--------------------- */
  $(".sp-carosul").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 12. owl-carousel
--------------------- */
  $(".product-carusol-9").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 5,
    itemsDesktop : [1199,5],
    itemsDesktopSmall : [979,4],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 13. owl-carousel
--------------------- */
  $(".product-carusol-10").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 4,
    itemsDesktop : [1199,4],
    itemsDesktopSmall : [979,3],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 14. owl-carousel
--------------------- */
  $(".popular-product").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 15. owl-carousel
--------------------- */
  $(".best-sellers-carosul").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
    pagination :false,
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    itemsMobile : [767,1],
 
  });

  /*---------------------
 16. owl-carousel
--------------------- */
  $(".post-slider").owlCarousel({
  
    autoPlay: false, //Set AutoPlay to 3 seconds
    navigation : true,
    navigationText : ["<i class='fa fa-caret-left'></i>","<i class='fa fa-caret-right'></i>"],
    pagination :true,
    items : 1,
    itemsDesktop : [1199,1],
    itemsDesktopSmall : [979,1],
    itemsMobile : [767,1],
 
  });


/*---------------------
PRICE FILTER
--------------------- */
$(function() {
    $( "#slider-range" ).slider({
      range: true,
      min: 0,
      max: 555,
      values: [ 0, 555 ],
      slide: function( event, ui ) {
        $( "#amount" ).val( "£" + ui.values[ 0 ] + " — £" + ui.values[ 1 ] );
      }
    });
    $( "#amount" ).val( "£" + $( "#slider-range" ).slider( "values", 0 ) +
      " — £" + $( "#slider-range" ).slider( "values", 1 ) );
  });

/* --------------------------------------------------------
   payment-accordion
* -------------------------------------------------------*/ 
  $(".payment-accordion").collapse({
    accordion:true,
    open: function() {
    this.slideDown(550);
    },
    close: function() {
    this.slideUp(550);
    }   
  }); 

  /*-------------------------
  showlogin toggle function
--------------------------*/
   $( '#showlogin' ).on('click', function() {
        $( '#checkout-login' ).slideToggle(900);
     }); 
  
/*-------------------------
  showcoupon toggle function
--------------------------*/
   $( '#showcoupon' ).on('click', function() {
        $( '#checkout_coupon' ).slideToggle(900);
     });
   
/*-------------------------
  Create an account toggle function
--------------------------*/
   $( '#cbox' ).on('click', function() {
        $( '#cbox_info' ).slideToggle(900);
     });
   
/*-------------------------
  Create an account toggle function
--------------------------*/
   $( '#ship-box' ).on('click', function() {
        $( '#ship-box-info' ).slideToggle(1000);
     });


  /*---------------------
    countdown
  --------------------- */
  $('[data-countdown]').each(function() {
    var $this = $(this), finalDate = $(this).data('countdown');
    $this.countdown(finalDate, function(event) {
    $this.html(event.strftime('<span class="cdown day">%-D <p>Days</p></span> <span class="cdown hour">%-H <p>Hour</p></span> <span class="cdown minutes">%M <p>Min</p></span class="cdown second"> <span>%S <p>Sec</p></span>'));
    });
  }); 
	
	
	
}); 

	



})(jQuery);