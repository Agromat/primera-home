jQuery(function ($) {
    function updateElements(){
        // Adaptive dance with a tambourine
        if($(window).width() <= 640){
            $('#btn_main_menu, #close_main_menu').unbind();
            $('#btn_main_menu, #close_main_menu').click(function(){
                if( $('header .menu').css('right') != '0px' ){
                    $('header .menu').stop().animate({ right: 0, opacity: 1 });
                    $('#close_main_menu').stop().fadeIn();
                }else{
                    $('header .menu').stop().animate({ right: '-170px', opacity: 0 });
                    $('#close_main_menu').stop().fadeOut();
                }
            });
        }
    }

    updateElements();

    $(window).resize(function(){
        updateElements();
    });

    // Menu transform on scroll
    $(window).scroll(function(){
        if($(window).scrollTop() >= 136){
            $('header').attr('id', 'fixed_header');
            /*if( !$('header .wrapper').hasClass('fixed') ){
                $('header .wrapper').addClass('fixed');
            }*/
        }else{
            $('header').attr('id', 'header');
            /*$('header .wrapper').removeClass('fixed');*/
        }
    });

    // Sidebar menu
    if( $( "#sidebar").length > 0 ){
        $('#sidebar .list > li span').click(function(){
            var sub = $(this).parent().children('.sub');

            if( sub.length > 0 && !sub.hasClass('fixed_menu')){
                if(sub.css('display') == 'none'){
                    sub.parent().find('span').first().css('padding-left' , '10px');
                    sub.slideDown();
                }else{
                    sub.parent().find('span').first().css('padding-left' , '0px');
                    sub.slideUp();
                }
            }
        });

        // Menu hover
        $( "#sidebar .list > li").each(function(i){
            if( $(this).children('a').length > 0 || $(this).children('.sub').length > 0 ){
                if(!$(this).find('span').first().hasClass("current")){
                    $(this).find('span').first()
                        .mouseover(function() {
                            $(this).stop().animate({ 'padding-left' : '10px' }, 100);
                        })
                        .mouseout(function() {
                            $(this).stop().animate({ 'padding-left' : 0 }, 100);
                        });
                }

            }
        });
    }

    if( $( "#collection").length > 0 ){
        // Add hover effect to collections
        $( "#collection .list li" )
            .mouseover(function() {
                $(this).find('.img').stop().animate({ opacity: 0.5 });
            })
            .mouseout(function() {
                $(this).find('.img').stop().animate({ opacity: 1 });
            });
    }

    if( $('#projects').length > 0 ){
        $( "#projects .list li a" )
            .mouseover(function() {
                $(this).find('.thumb').stop().animate({ opacity: 0.7 });
            })
            .mouseout(function() {
                $(this).find('.thumb').stop().animate({ opacity: 1 });
            });
    }

    // if window size <= 640 and have sidebar with list, plus container for selects - build "Custom select"
    if($(window).width() <= 640 && $('#sidebar .list').length > 0 && $('#selects_wrap').length > 0){
        azureusSelectFromList( $('#sidebar .list'), $('#selects_wrap') );
    }
});

// Add link on material
function addLink() {
    var body_element = document.getElementsByTagName('body')[0];
    var selection;
    selection = window.getSelection();
    var pagelink = "<br /><br /> Источник: <a href='"+document.location.href+"'>"+document.location.href+"</a><br />© Primera";
    var copytext = selection + pagelink;
    var newdiv = document.createElement('div');
    newdiv.style.position='absolute';
    newdiv.style.left='-99999px';
    body_element.appendChild(newdiv);
    newdiv.innerHTML = copytext;
    selection.selectAllChildren(newdiv);
    window.setTimeout(function() {
        body_element.removeChild(newdiv);
    },0);
}
document.oncopy = addLink;