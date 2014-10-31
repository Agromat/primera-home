function azureusInlineSlider(slider, item, left_arrow, right_arrow, anim_speed, disp_count, nav){
    if(typeof(left_arrow)==='undefined') left_arrow = null;
    if(typeof(right_arrow)==='undefined') right_arrow = null;
    if(typeof(anim_speed)==='undefined') anim_speed = 500;
    if(typeof(disp_count)==='undefined') disp_count = 1;
    if(typeof(nav)==='undefined') nav = null;

    var _this = this;
    var total = item.length;
    var width;
    var index = 0;



    function updateSlider(){
        var h = item.find('img').height() + 20;

        width = Math.round(slider.parent().width() / 2);
        item.width(width);
        slider.width( total * width );
        slider.height( h );
        slider.parent().height( h );
        slider.css("left", index * width + "px");
    }
    updateSlider();

    this.carouselSlide = function(i){
        slider.stop().animate({left: -i * width +'px'}, anim_speed);
    }

    function slideLeft(){
        index --;
        _this.carouselSlide( index = (index < 0) ? total - disp_count : index );
    }

    function slideRight(){
        index ++;
        _this.carouselSlide( index = (index > total - disp_count) ? 0 : index );
    }

    if(left_arrow != null && right_arrow != null){
        left_arrow.click(slideLeft);
        right_arrow.click(slideRight);
    }

    slider.swipe( {
        swipe:function(event, direction, distance, duration, fingerCount, fingerData) {
            if(direction == 'left'){
                slideRight();
            }

            if(direction == 'right'){
                slideLeft();
            }
        },
        threshold:0
    });


    if(nav != null){
        nav.children('.slide_btn').click(function(){
            nav.children('.slide_btn').removeClass('current');
            $(this).addClass('current');
            _this.carouselSlide( $(this).index() );
        });

        nav.children('.slide_btn').first().click();
    }

    $(window).resize(function(){
        updateSlider();
    });
}