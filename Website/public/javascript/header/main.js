$(function() {

  'use strict';

  if (window.location.pathname == "/home" || window.location.pathname == "/") {
    $('#home').addClass('active');

  } 

  else if (window.location.pathname == "/createSBT") {
    $('#createSBT').addClass('active');
  }

  $('.js-menu-toggle').click(function(e) {

  	var $this = $(this);


  	if ( $('body').hasClass('show-sidebar') ) {
  		$('body').removeClass('show-sidebar');
  		$this.removeClass('active');
  	} else {
  		$('body').addClass('show-sidebar');	
  		$this.addClass('active');
      $(".burgerImg").fadeOut(0);
  	}

  	e.preventDefault();

  });

  // click outisde offcanvas
	$(document).mouseup(function(e) {
    var container = $(".sidebar");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ( $('body').hasClass('show-sidebar') ) {
				$('body').removeClass('show-sidebar');
				$('body').find('.js-menu-toggle').removeClass('active');
        $(".burgerImg").delay(125).fadeIn(300);
			}
    }
	}); 

    

});