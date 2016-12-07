$(function(){

		
	


//     NAVBAR
    $('.button-collapse').sideNav({
      menuWidth: 220, // Default is 240
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true // Closes side-nav on <a> clicks, useful for Angular/Meteor
    });
       


//    SCROLL
	//$('.scrollspy').scrollSpy({
	//	scrollOffset: 68  //64 nav_height + 4 liner
	//});

	var nav = $('nav');
    var scrolltop = $('.scrolltop');

    window.onscroll = activeScrollTop;

	function activeScrollTop() {

	 	var offset = window.pageYOffset;
	    if (offset > 70) {	    	
	        scrolltop.addClass('show')
	    } else {
	        scrolltop.removeClass('show')
	    }
	}


 
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal-trigger').leanModal();




 
    $('ul.tabs').tabs({
    	onShow: function  () {
    	}
    });
    $('ul.tabs').width("")
    //$('ul.tabs').tabs("select_tab","contact")


//  SCROLLFIRE

	var options = []	
	var count = 1
	$('.stop_anime').each(function(index, el) {

		$(this).attr('id', 'fire-'+count);
		var temp = {offset: 40}
		temp.selector = '#fire-'+count;
		temp['callback'] = function  (el) {
			$(el).removeClass('stop_anime').addClass("start_anime"); 
		}
		options.push(temp)
		count++
	});
	//Materialize.scrollFire(options);
	

//bug scrollfire quand overflow-y scroll
//resolu modif scrollfire.js







			   
//      SEQUENCE      
	

    
	$(".btn-slider").each(function(index, el) {
		$(this).on('click', function(e) {
			e.preventDefault();
			$(this).addClass('loader')
			if($(this).attr('id') === "sketch"){
				loadModal("https://sketchfab.com/models/f4cccf4da1f240db8233875300b6918a/embed")
			}else if($(this).attr('id') === "three"){
				loadModal("http://genealogie-wishaupt.pe.hu/three/")
			}else if($(this).attr('id') === "profile"){
				loadModal("http://genealogie-wishaupt.pe.hu/profile/")
			}
		});
	});
	

	function loadModal(url) {
	    var $iframe = $('#islide');
	    if ( $iframe.length ) {
	        $iframe.attr('src',url);
	        $iframe.on('load',function(){
	        	$('#modal').openModal();
	        	$('.loader').removeClass('loader')

	        })
	        return false;
	    }
	    return true;
	}


//      Preloader
	$(window).load(function() {
	preloaderFadeOutTime = 500;
	function hidePreloader() {
	var preloader = $('.preloader');
	preloader.fadeOut(preloaderFadeOutTime);
	document.body.className = 'ready';
	//$('.intro').show().addClass('fadeInLeftBig')
	}
	hidePreloader();
	});




   
});
