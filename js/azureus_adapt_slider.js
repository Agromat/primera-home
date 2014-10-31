var slidersList = new Array();

function buildAdaptSlider(slider, leftBTN, rightBTN, animSpeed){
    if(typeof(leftBTN)==='undefined') leftBTN = null;
    if(typeof(rightBTN)==='undefined') rightBTN = null;
    if(typeof(animSpeed)==='undefined') animSpeed = 500;

    var animPlaying = false;
    var _this = this;
	
	slidersList.push(slider);
	
	slider.children('li').each(function(i){
		$(this).css('z-index', slider.children('li').length - i);
	});

	function slideLeft(){
		if(animPlaying == false){
			var nextSlide = slider.children('.current').prev('li');
			var slideWidth = slider.children('.current').width();
			
			animPlaying = true;
				
			if(nextSlide.length == 0){
				nextSlide = slider.children('li').last();
			}
			
			slider.children('li').css('display', 'none');
			slider.children('.current').css({display: 'block', opacity: 1});
			nextSlide.css({ left: 0 - slideWidth + 'px', display: 'block', opacity: 0 });
		
			slider.children('.current').stop().animate({left: slideWidth + 'px', opacity: 0}, animSpeed);
			nextSlide.stop().animate({left: 0, opacity: 1}, animSpeed, 'swing', function(){
				slider.children('.current').removeClass('current');
				$(this).addClass('current');
				animPlaying = false;
			});
		}
	}
	
	function slideRight(){
		if(animPlaying == false){					
			var nextSlide = slider.children('.current').next('li');
			var slideWidth = slider.children('.current').width();
			
			animPlaying = true;
				
			if(nextSlide.length == 0){
				nextSlide = slider.children('li').first();
			}
			
			slider.children('li').css('display', 'none');
			slider.children('.current').css({display: 'block', opacity: 1});
			nextSlide.css({ left: slideWidth + 'px', display: 'block', opacity: 0 });
			
		
			slider.children('.current').stop().animate({left: slideWidth * (-1) + 'px', opacity: 0}, animSpeed);
			nextSlide.stop().animate({left: 0, opacity: 1}, animSpeed, 'swing', function(){
				slider.children('.current').removeClass('current');
				$(this).addClass('current');
				animPlaying = false;
			});
		}
	}
/*
    this.slideTo = function(n, dir){
        if(typeof(dir)==='undefined') dir = (Math.random() * 10 < 5) ? -1 : 1;

        if(animPlaying == false && n < slider.children('li').length){
            var nextSlide;
            var slideWidth = slider.children('.current').width() * disp_count;

            slider.children('li').each(function(i){
                if(i == n){
                    nextSlide = $(this);
                }
            });

            animPlaying = true;
            slider.children('li').css('display', 'none');
            slider.children('.current').css({display: 'block', opacity: 1});
            nextSlide.css({ left: (dir == -1) ? slideWidth * dir + 'px' : slideWidth + 'px', display: 'block', opacity: 0 });

            slider.children('.current').stop().animate({left: (dir == 1) ? slideWidth * (-1) + 'px' : slideWidth + 'px', opacity: 0}, animSpeed);
            nextSlide.stop().animate({left: 0, opacity: 1}, animSpeed, 'swing', function(){
                slider.children('.current').removeClass('current');
                $(this).addClass('current');
                animPlaying = false;
            });
        }
    }
*/
    if(leftBTN != null && rightBTN != null){
        leftBTN.click(slideLeft);
        rightBTN.click(slideRight);
    }
	
	slider.swipe( {
		//Generic swipe handler for all directions
		swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
			if(direction == 'left'){
				slideRight();
			}
			
			if(direction == 'right'){
				slideLeft();
			}
		},
		//Default is 75px, set to 0 for demo so any distance triggers swipe
		threshold:0
	});
}

$(window).resize(function(){
	for(var i = 0; i<slidersList.length; i++){
		slidersList[i].children('li').css('width', '100%');
	}
});