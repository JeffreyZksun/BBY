jQuery(function ($) {
    $('body').delegate('section', 'waypoint.reached', function (event, direction) {
        var $active = $(this);
        if (direction === "up") {
            $active = $active.prev();
        }
        if (!$active.length) $active = $active.end();
        $('.section-active').removeClass('section-active');
        $active.addClass('section-active');
        $('.active').removeClass('active');
        $('a[href=#' + $active.attr('id') + ']').addClass('active');
    });
    $('section').waypoint({
        offset: '50%'
    });
    var scrollElement = 'html, body';
    $('html, body').each(function () {
        var initScrollTop = $(this).attr('scrollTop');
        $(this).attr('scrollTop', initScrollTop + 1);
        if ($(this).attr('scrollTop') == initScrollTop + 1) {
            scrollElement = this.nodeName.toLowerCase();
            $(this).attr('scrollTop', initScrollTop);
            return false;
        }
    });
    $("nav a[href^='/#']").click(function (event) {
        // silly hack to make the scrolling work only from root, 
        // but have normal link work from where ever
        if (document.location.pathname == '/') {
            event.preventDefault();
            var $this = $(this),
                target = this.hash,
                $target = $(target);
            $(scrollElement).stop().animate({
                'scrollTop': $target.offset().top
            }, 500, 'swing', function () {
                window.location.hash = target;
            });
        }
    });
});
$(document).ready(function () {
    var items = $('#stage li'),
        itemsByTags = {};
    items.each(function (i) {
        var elem = $(this),
            tags = elem.data('tags').split(',');
        elem.attr('data-id', i);
        $.each(tags, function (key, value) {
            value = $.trim(value).toLowerCase();
            if (!(value in itemsByTags)) {
                itemsByTags[value] = [];
            }
            itemsByTags[value].push(elem);
        });
    });
    createList('Everything', items);

    // added to ensure early ordering of this tags
    specialCaseAdd('international', itemsByTags)
    specialCaseAdd('china', itemsByTags)
    specialCaseAdd('javascript', itemsByTags)
    specialCaseAdd('node.js', itemsByTags)
    
    $.each(itemsByTags, function (k, v) {
        createList(k, v);
    });
    $('#filter a').live('click', function (e) {
        var link = $(this);
        link.addClass('filter-active').siblings().removeClass('filter-active');
        $('#stage').quicksand(link.data('list').find('li'));
        e.preventDefault();
    });
    $('#filter a:first').click();

    function specialCaseAdd(text, items) { 
        if(text in items) { 
            createList(text, items[text]);
            delete items[text];
        }
    }

    function createList(text, items) {
        var ul = $('<ul>', {
            'class': 'hidden'
        });
        $.each(items, function () {
            $(this).clone().appendTo(ul);
        });
        ul.appendTo('#container');
        var a = $('<a>', {
            html: text,
            href: '#',
            data: {
                list: ul
            }
        }).appendTo('#filter');
    }
});
jQuery(function ($) {
    var $container = $('#box');
    $container.imagesLoaded(function () {
        $container.masonry({
            itemSelector: '.post'
        });
    });
});
jQuery(function ($) {
    $.getJSON("https://api.twitter.com/1/statuses/user_timeline.json?screen_name=hujsconf&include_rts=1&count=10&callback=?", function (data) {
        $('.twitter_status').html(data[0].text);
    });
});
jQuery().ready(function () {
    var accordion_options = { active: false, collapsible: true, alwaysOpen: false, disabled: true };
    jQuery('#schedule1').accordion(accordion_options);
    jQuery('#schedule2').accordion(accordion_options);
    jQuery('#schedule3').accordion(accordion_options);
    jQuery('#schedule4').accordion(accordion_options);
});
(function () {
    var $tabsNav = $('.tabs-nav'),
        $tabsNavLis = $tabsNav.children('li'),
        $tabContent = $('.tab-content');
    $tabContent.hide();
    $tabsNavLis.first().addClass('active-tab').show();
    $tabContent.first().show();
    $tabsNavLis.on('click', function (e) {
        var $this = $(this);
        $tabsNavLis.removeClass('active-tab');
        $this.addClass('active-tab');
        $tabContent.hide();
        $($this.find('a').attr('href')).fadeIn();
        e.preventDefault();
    });
})()
jQuery(document).ready(function ($) {
    function isScrolledIntoView(id) {
        var elem = "#" + id;
        var docViewTop = $(window).scrollTop();
        var docViewBottom = docViewTop + $(window).height();
        if ($(elem).length > 0) {
            var elemTop = $(elem).offset().top;
            var elemBottom = elemTop + $(elem).height();
        }
        return ((elemBottom >= docViewTop) && (elemTop <= docViewBottom) && (elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    function sliding_horizontal_graph(id, speed) {
        $("#" + id + " li span").each(function (i) {
            var j = i + 1;
            var cur_li = $("#" + id + " li:nth-child(" + j + ") span");
            var w = cur_li.attr("title");
            cur_li.animate({
                width: w + "%"
            }, speed);
        })
    }

    function graph_init(id, speed) {
        $(window).scroll(function () {
            if (isScrolledIntoView(id)) {
                sliding_horizontal_graph(id, speed);
            } else {}
        })
        if (isScrolledIntoView(id)) {
            sliding_horizontal_graph(id, speed);
        }
    }
    graph_init("skills", 1000);
});
jQuery(document).ready(function ($) {
    $('#switcher .headercolor a').click(function (e) {
        e.preventDefault()
        $('header').removeClass('light dark').addClass($(this).attr('href').substring(1))
    })
    $("#switcher .theme a.moderntheme").click(function () {
        $("link[rel=stylesheet]").attr({
            href: "modern.css"
        });
    });
    $('.switch-button').click(function () {
        if ($(this).is('.open')) {
            $(this).addClass('closed');
            $(this).removeClass('open');
            $('#switcher').animate({
                'left': '-178px'
            });
        } else {
            $(this).addClass('open');
            $(this).removeClass('closed');
            $('#switcher').animate({
                'left': '0px'
            });
        }
    });
});