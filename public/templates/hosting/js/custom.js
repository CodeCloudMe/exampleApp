/*ALTERNATIVE NAV */

window.onscroll = function()
{
$('.circle_wrapper').removeClass("active");
if( window.XMLHttpRequest ) {
	if (document.documentElement.scrollTop > 500 || self.pageYOffset > 500) {
				$('.sticky_nav').removeClass('novisible');
				var $filters = $("#filters")
				$filters.find('li a.selected').trigger('click');

	} else if (document.documentElement.scrollTop < 221 || self.pageYOffset < 221) {
				$('.sticky_nav').addClass('novisible');
}
}
}

$(document).ready(function() {
  $('.main_nav, .circle_wrapper').onePageNav();
  $('.sticky_nav').onePageNav();
});


// RESPONSIVE MENU 

$(document).ready(function(){
var menu_trigger = $('.menu_trigger');
var areamenu = $('.mobileAreaMenu');
var all_li =$('.mobileAreaMenu li');

$(menu_trigger).click(function() {


if ($(menu_trigger).hasClass('active')){

			$(areamenu).slideUp(200,function(){
				$(areamenu).css("display","");
				$(menu_trigger).removeClass("active");
			});
					
			} else {
				$(areamenu).slideDown(200,function(){
					//
				});

				$(menu_trigger).addClass("active");
			}
});

$('.mobileAreaMenu a').click(function(){
	
	$(areamenu).slideUp(200);
	$(menu_trigger).removeClass("active");
});
});