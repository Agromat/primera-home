function azureusClickOnOption(opt){
    opt.parent().parent().children('.label').text( opt.find('span').first().text() );

    var cur_id = '' + opt.parent().parent().attr('id');

    if(cur_id != '' && cur_id.substr(0, 5) == 'chain'){
        cur_id = cur_id.substr(6);
        var _wrap = $('#child-chain-' + cur_id);

        if(opt.children('.sub').length > 0){
            _wrap.children('ul').children('li').unbind();
            _wrap.children('ul').remove();
            _wrap.append( opt.children('.sub').clone() );

            if(_wrap.hasClass('disabled')){
                _wrap.removeClass('disabled');
            }

            _wrap.children('ul').removeClass('sub');
            _wrap.children('ul').addClass('list');
            _wrap.children('ul').children('li').click(function(){
                azureusClickOnOption($(this));
            });
            _wrap.children('.label').text( _wrap.find('li').first().text() );
        }else{
            _wrap.children('ul').children('li').unbind();
            _wrap.children('ul').remove();
            _wrap.children('.label').text( '-' );
            if(!_wrap.hasClass('disabled')){
                _wrap.addClass('disabled');
            }
        }
    }
}

function udateSelects(){
    $('.azureus_select').unbind();
    $('.azureus_select ul li').unbind();

    $('.azureus_select').each(function(i){
        $(this).children('.label').text( ($(this).hasClass('disabled')) ? '-' : $(this).find('li').find('span').first().text() );
    });

    $('.azureus_select').click(function(){
        if(!$(this).hasClass('disabled')){
            var list = $(this).children('.list');

            if( list.css('display') == 'none' ){
                list.stop().slideDown();
            }else{
                list.stop().slideUp();
            }
        }
    });

    $('.azureus_select ul li').click(function(){
        azureusClickOnOption($(this));
    });
}

function azureusSelectFromList( to_clone_list, container, first_opt ){
    if(typeof(first_opt)==='undefined') first_opt = null;

    var clone =  to_clone_list.clone();
    var chain = -1;
    var html_data;

    // work with classes
    clone.removeClass();
    clone.addClass('list');

    // add first option
    if(first_opt != null){
        clone.prepend('<li>'+first_opt+'</li>');
    }

    // check sub menus
    if(clone.find('.sub').length > 0){
        var counter = 1;

        while(chain == -1){
            if( $('#chain-' + counter).length == 0 ){
                //chain = ' id="chain-' + counter +'" ';
                chain = counter;
            }else{
                counter ++;
            }
        }
    }

    container.prepend( clone );
    container.children('.label').text( ($(this).hasClass('disabled')) ? '-' : container.find('li').find('span').first().text() );

    html_data = (chain != -1) ? '<div class="azureus_select_wrap"><div'+' id="chain-' + counter +'" '+'class="azureus_select unselectable"></div></div>' : '<div class="azureus_select_wrap"><div class="azureus_select unselectable"></div></div>';
    clone.wrap(html_data);
    clone.parent().prepend('<div class="label"></div>');

    if(chain != -1){
        html_data = '<div class="azureus_select_wrap"><div id="child-chain-'+chain+'" class="azureus_select unselectable disabled"><div class="label"></div></div></div>';
        container.append( html_data );
    }

    container.append( '<div class="clean"></div>' );
    udateSelects();
}

udateSelects();