$(document).ready(function () {

  $('#tags').tagsInput({
    'height':'60px',
    'width':'280px'
  });

  showRaty();

});

function showRaty(){

	var theScore = parseInt($('#theRating').html());
	$('#theRating').html('');
	$('#theRating').raty({click:function(score){
		$('#ratingVal').val(score)
	}});
	$('#theRating').raty('score', 0);

}
