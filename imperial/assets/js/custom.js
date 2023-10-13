(function($) {

    'use strict';


    /* Settings List Table
	
      * Cache jQuery Selector
      * Parallax - START CODE
      * Custom accordion useable settings for any type of accordion system
      * Slider push menu visible
      * MixIt-up tab calling
      * Simple tab manus
      * Auto active class adding with navigation
      * Update Header Style + Scroll to Top
      * Put slider space for nav not in mini screen
      * dropdown submenu on hover in desktopand dropdown sub menu on click in mobile
      * Layer Slider Testimonial
      * Single Product Image Slide
      * Click Search Icon and Open Search Field
      * Scroll trgeted ID specially for One Page nav target scrolling
      * Scroll top by clicking arrow up
      * Fact Counter For Achivement Counting
      * Our Partner Logos Slider Auto
      * Testimonial slide
      * Three Block Slide
      * Four Block Slide
      * Five Block Slide
      * Single Text Carusel
      * Contact Form Validation
      * Elements Animation
      * Start When document is Scrollig, do
      * Date Counting
      * Single Accordean
	
    */

    // Cache jQuery Selector
    var $window = $(window),
        $header = $('header'),
        $brand = $('.partner-slider'),
        $navigation = $('#navbarSupportedContent'),
        $dropdown = $('.dropdown-toggle'),
        $single_carusel = $('.single-carusel'),
        $three_item = $('.3block-carusel'),
        $four_item = $('.4block-carusel'),
        $five_item = $('.5block-carusel'),
        $six_item = $('.6block-carusel'),
        $single_carusel_text = $('.text-carusel'),
        $contact = $('#contact-form'),
        $mix_tab = $('.mix-tab');


    // Preloader For Hide loader
    function handlePreloader() {
        if ($('.preloader').length) {
            $('.preloader').delay(500).fadeOut(100);
        }
    }
    $window.on('load', function() {
        handlePreloader();
    });


    // Pricing bar Filter like index 7
    if (document.querySelector('.filter_price') !== null) {
        $(".filter_price").slider({
            from: 0,
            to: 1000000,
            step: 1000,
            smooth: true,
            round: 0,
            dimension: "$",
            skin: "plastic"
        });
    }

    if (document.querySelector('.area_filter') !== null) {
        $(".area_filter").slider({
            from: 0,
            to: 10000,
            step: 10,
            smooth: true,
            round: 0,
            dimension: "sq ft",
            skin: "plastic"
        });
    }


    // Dashboard nvaigation icon
    if (document.querySelector('.db-dropdown') !== null) {
        $('.db-dropdown > .dropdown-toggle').on('click', function() {
            $(this).parent('.db-dropdown').toggleClass('active');
            $(this).parent('.db-dropdown').children('.db-dropdown-menu').slideToggle();
        });
    }

    // Dashboard navigation collapse
    if (document.querySelector('.collaps-dashboard') !== null) {
        $('.collaps-dashboard').on('click', function() {
            $('.dashboard-nav').toggleClass('active');
            $('.dashboard-nav').slideToggle();
        });
    }


    // Block Show/hide option
    if (document.querySelector('.toggle-btn') !== null) {
        $('.toggle-btn').on('click', function(e) {
            e.preventDefault();
            var $this = $(this).attr('data-target');
            $($this).toggleClass('visible');
        });
    }


    // Data quick view
    if (document.querySelector('.quick-view') !== null) {
        $('.quick-view').on('click', function(e) {
            e.preventDefault();
            var target = $(this).attr('href');
            $('body').addClass('modal-open');
            $('body').css('padding-right', '17px');
            $(target).show();
            $(target).addClass('show');
            e.stopPropagation();
        });

        $('.view-close').on('click', function() {
            $('body').removeClass('modal-open');
            $('body').css('padding-right', '0');
            $(this).parents('.quick-view-modal').removeClass('show');
            $(this).parents('.quick-view-modal').hide();

        });

        $('.quick-view-modal').on('click', function(e) {
            if ($(e.target).closest('.modal-dialog').length === 0) {
                $('body').removeClass('modal-open');
                $('body').css('padding-right', '0');
                $(this).removeClass('show');
                $(this).hide();
            }
        });
    }


    // Parallax - START CODE
    if ($('.paraxify').length) {
        $(function() {
            $window.on("load resize scroll", function() {
                paraxify('.paraxify');
            });
        });
    }


    // Custom accordion useable settings for any type of accordion system
    if (document.querySelector('.bb-accordion') !== null) {
        $('.ac-toggle').on('click', function(e) {
            e.preventDefault();

            var $this = $(this);

            if ($this.hasClass('active') && $this.next().hasClass('show')) {
                $this.removeClass('active');
                $this.next().removeClass('show');
                $this.next().slideUp(350);
            } else {

                // Check accordion type: for single item open
                if ($this.parent().parent().hasClass('ac-single-show')) {
                    $this.parent().parent().find('.ac-card .ac-toggle').removeClass('active');
                    $this.parent().parent().find('.ac-card .ac-collapse').removeClass('show');
                    $this.parent().parent().find('.ac-card .ac-collapse').slideUp(350);
                    $this.addClass('active');
                    $this.next().addClass('show');
                    $this.next().slideDown(350);
                }

                // Check accordion type: for group item open
                else if ($this.parent().parent().hasClass('ac-group-show')) {
                    $this.addClass('active');
                    $this.next().addClass('show');
                    $this.next().slideDown(350);
                }

                // Default if not use any accordion type
                else {
                    $this.parent().parent().find('.ac-card .ac-toggle').removeClass('active');
                    $this.parent().parent().find('.ac-card .ac-collapse').removeClass('show');
                    $this.parent().parent().find('.ac-card .ac-collapse').slideUp(350);
                    $this.addClass('active');
                    $this.next().addClass('show');
                    $this.next().slideDown(350);
                }
            }
        });
    }


    // Slider push menu visible
    if (document.querySelector('.push-nav-toggle') !== null) {
        var $this = $('.push-nav-toggle'),
            $close = $('.slide-nav-close'),
            $sidenav = $('.nav-leftpush-overlay .navbar-expand-lg .navbar-slide-push');

        $this.on('click', function(event) {
            event.preventDefault();
            $sidenav.addClass('visible');
            $('#page_wrapper').addClass('overlay');
            event.stopPropagation();
        });


        $sidenav.on('click', function(event) {
            event.stopPropagation();
        });

        $window.on('click', function(e) {
            $sidenav.removeClass('visible');
            $('#page_wrapper').removeClass('overlay');
        });

        $close.on('click', function(e) {
            $sidenav.removeClass('visible');
            $('#page_wrapper').removeClass('overlay');
        });

    }



    // MixIt-up tab calling
    if ($mix_tab.length) {
        var containerEl = document.querySelector('.mix-element');
        var mixer = mixitup(containerEl);
    }


    //bootstrap selectpiker
    $(function() {
        $('.selectpicker').selectpicker();
    });



    // Simple tab manus
    $(function() {

        // default action
        $('.tab-element .tab-pane').hide();
        $('.tab-action ul li:first-child').addClass('active');
        $('.tab-element .tab-pane:first-child').show();

        // on click event
        $('.tab-action ul li').on('click', function() {
            $(this).parent('ul').children('li').removeClass('active');
            $(this).addClass('active');
            $(this).parent('ul').next('.tab-element').children('.tab-pane').hide();
            var activeTab = $(this).attr('data-target');
            $(activeTab).fadeIn();
            return false;
        });

    });


    // Auto active class adding with navigation
    $window.on('load', function() {
        var current = location.pathname;
        var $path = current.substring(current.lastIndexOf('/') + 1);
        $('#navbarSupportedContent li a').each(function(e) {
            var $this = $(this);
            // if the current path is like this link, make it active
            if ($path == $this.attr('href')) {
                $this.parent('li').addClass('active');
            } else if ($path == '') {
                $('.navbar-nav li:first-child').addClass('active');
            }
        })
    });



    // Update Header Style + Scroll to Top
    function headerStyle() {
        if ($header.length) {
            var windowpos = $window.scrollTop();
            if (windowpos >= 200) {
                $header.addClass('fixed-top');
            } else {
                $header.removeClass('fixed-top');
            }
        }
    }


    // Put slider space for nav not in mini screen
    if (document.querySelector('.nav-on-top') !== null) {
        var get_height = jQuery('.nav-on-top').height();
        if (get_height > 0 && $window.width() > 991) {
            jQuery('.nav-on-top').next().css('margin-top', get_height);
        }
        $window.on('resize', function() {
            $header.removeClass('fixed-top');
            var get_height = jQuery('.nav-on-top').height();
            if ($window.width() < 991) {
                jQuery('.nav-on-top').next().css('margin-top', '0');
            } else {
                jQuery('.nav-on-top').next().css('margin-top', get_height);
            }
        });
    }
    if (document.querySelector('.nav-on-banner') !== null) {
        var get_height = jQuery('.nav-on-banner').height();
        if (get_height > 0 && $window.width() > 991) {
            jQuery('.nav-on-banner').next().css('padding-top', get_height);
        }
        $window.on('resize', function() {
            $header.removeClass('fixed-top');
            var get_height = jQuery('.nav-on-banner').height();
            if ($window.width() < 991) {
                jQuery('.nav-on-banner').next().css('padding-top', '0');
            } else {
                jQuery('.nav-on-banner').next().css('padding-top', get_height);
            }
        });
    }



    // dropdown submenu on hover in desktopand dropdown sub menu on click in mobile 
    $navigation.each(function() {
        $dropdown.on('click', function(e) {
            if ($window.width() < 1100) {
                if ($(this).parent('.dropdown').hasClass('visible')) {
                    $(this).parent('.dropdown').children('.dropdown-menu').first().stop(true, true).slideUp(300);
                    $(this).parent('.dropdown').removeClass('visible');
                    // window.location = $(this).attr('href');
                } else {
                    e.preventDefault();
                    $(this).parent('.dropdown').siblings('.dropdown').children('.dropdown-menu').slideUp(300);
                    $(this).parent('.dropdown').siblings('.dropdown').removeClass('visible');
                    $(this).parent('.dropdown').children('.dropdown-menu').slideDown(300);
                    $(this).parent('.dropdown').addClass('visible');
                }
                e.stopPropagation();
            }
        });

        $('body').on('click', function(e) {
            $dropdown.parent('.dropdown').removeClass('visible');
        });

        $window.on('resize', function() {
            if ($window.width() > 991) {
                $('.dropdown-menu').removeAttr('style');
                $('.dropdown ').removeClass('visible');
            }
        });
    });



    // Layer Slider Testimonial
    if ($('#layer-testimonial').length) {
        $(document).ready(function() {
            $('#layer-testimonial').layerSlider({
                sliderVersion: '6.0.0',
                type: 'fullwidth',
                responsiveUnder: 1280,
                maxRatio: 1,
                slideBGSize: 'auto',
                hideUnder: 0,
                hideOver: 100000,
                skin: 'noskin',
                globalBGRepeat: 'repeat',
                globalBGAttachment: 'fixed',
                globalBGSize: 'contain',
                skinsPath: 'assets/skins/'
            });
        });
    }


    // Single Product Image Slide
    if (document.querySelector('.full-img-sweep') !== null) {
        $('.full-img-sweep').layerSlider({
            sliderVersion: '6.0.0',
            responsiveUnder: 0,
            layersContainer: 0,
            slideBGSize: 'auto',
            autoStart: 'false',
            showCircleTimer: 'false',
            skin: 'noskin',
            thumbnailNavigation: 'always',
            skinsPath: 'assets/skins/'
        });
    }



    // Click Search Icon and Open Search Field	
    var $srcicon = $('.search-pop span'),
        $srcfield = $('.search-form');
    $srcicon.on('click', function(event) {
        event.preventDefault();
        $srcfield.addClass('visible');
        event.stopPropagation();
    });

    $srcfield.on('click', function(event) {
        event.stopPropagation();
    });

    $window.on('click', function(e) {
        $srcfield.removeClass('visible');
    });



    // Scroll trgeted ID specially for One Page nav target scrolling
    $('.one-page-nav a[href*="#"]')
        .not('.one-page-nav [href="#"]')
        .not('.one-page-nav [href="#0"]')
        .click(function(event) {

            if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
                var target = $(this.hash);
                target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
                if (target.length) {
                    event.preventDefault();
                    $('html, body').animate({
                        scrollTop: target.offset().top
                    }, 1000, function() {
                        var $target = $(target);
                        $target.focus();
                        if ($target.is(":focus")) { // Checking if the target was focused
                            return false;
                        } else {
                            $target.attr('tabindex', '-1'); // Adding tabindex for elements not focusable
                            $target.focus(); // Set focus again
                        };
                    });
                }
            }
        });



    // Scroll top by clicking arrow up
    $window.scroll(function() {
        if ($(this).scrollTop() > 500) {
            $('#scroll').fadeIn();
        } else {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 100);
        return !1;
    });



    // Fact Counter For Achivement Counting
    function factCounter() {
        if ($('.fact-counter').length) {
            $('.fact-counter .count.animated').each(function() {
                var $t = $(this),
                    n = $t.find(".count-num").attr("data-stop"),
                    r = parseInt($t.find(".count-num").attr("data-speed"), 10);

                if (!$t.hasClass("counted")) {
                    $t.addClass("counted");
                    $({
                        countNum: $t.find(".count-text").text()
                    }).animate({
                        countNum: n
                    }, {
                        duration: r,
                        easing: "linear",
                        step: function() {
                            $t.find(".count-num").text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $t.find(".count-num").text(this.countNum);
                        }
                    });
                }

                //set skill building height
                var size = $(this).children('.progress-bar').attr('aria-valuenow');
                $(this).children('.progress-bar').css('width', size + '%');

            });
        }
    }


    // Our Partner Logos Slider Auto
    if ($brand.length) {
        $brand.owlCarousel({
            loop: true,
            margin: 24,
            nav: false,
            dots: false,
            smartSpeed: 500,
            autoplay: 4000,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                },
                1400: {
                    items: 6
                }
            }
        });
    }


    // Testimonial slide
    if ($single_carusel.length) {
        $single_carusel.owlCarousel({
            loop: false,
            margin: 24,
            nav: true,
            dots: true,
            smartSpeed: 500,
            autoplay: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 1
                },
                992: {
                    items: 1
                },
                1200: {
                    items: 1
                },
                1400: {
                    items: 1
                }
            }
        });
    }



    // Three Block Slide
    if ($three_item.length) {
        $three_item.owlCarousel({
            loop: false,
            margin: 24,
            nav: true,
            dots: true,
            smartSpeed: 500,
            autoplay: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1400: {
                    items: 3
                }
            }
        });
    }



    // Four Block Slide
    if ($four_item.length) {
        $four_item.owlCarousel({
            loop: false,
            margin: 24,
            nav: true,
            dots: true,
            smartSpeed: 500,
            autoplay: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 3
                },
                1400: {
                    items: 4
                }
            }
        });
    }



    // Five Block Slide
    if ($five_item.length) {
        $five_item.owlCarousel({
            loop: false,
            margin: 0,
            nav: true,
            dots: true,
            smartSpeed: 500,
            autoplay: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 3
                },
                1200: {
                    items: 4
                },
                1400: {
                    items: 5
                }

            }
        });
    }
    
    
    // Five Block Slide
    if ($six_item.length) {
        $six_item.owlCarousel({
            loop: false,
            margin: 0,
            nav: true,
            dots: true,
            smartSpeed: 500,
            autoplay: false,
            responsive: {
                0: {
                    items: 1
                },
                576: {
                    items: 2
                },
                992: {
                    items: 4
                },
                1200: {
                    items: 5
                },
                1400: {
                    items: 6
                }

            }
        });
    }



    // Single Text Carusel
    if ($single_carusel_text.length) {
        $single_carusel_text.owlCarousel({
            loop: false,
            margin: 30,
            nav: false,
            dots: true,
            smartSpeed: 500,
            autoplay: false,
            responsive: {
                0: {
                    items: 1
                },
                480: {
                    items: 1
                },
                600: {
                    items: 1
                },
                800: {
                    items: 1
                },
                1200: {
                    items: 1
                }
            }
        });
    }


    // Contact Form Validation
    if ($contact.length) {
        $contact.validate({ //#contact-form contact form id
            rules: {
                firstname: {
                    required: true // Field name here
                },
                email: {
                    required: true, // Field name here
                    email: true
                },
                subject: {
                    required: true
                },
                message: {
                    required: true
                }
            },

            messages: {
                firstname: "Please enter your First Name", //Write here your error message that you want to show in contact form
                email: "Please enter valid Email", //Write here your error message that you want to show in contact form
                subject: "Please enter your Subject", //Write here your error message that you want to show in contact form
                message: "Please write your Message" //Write here your error message that you want to show in contact form
            },

            submitHandler: function(form) {
                $('#send').attr({ 'disabled': 'true', 'value': 'Sending...' });
                $.ajax({
                    type: "POST",
                    url: "email.php",
                    data: $(form).serialize(),
                    success: function() {
                        $('#send').removeAttr('disabled').attr('value', 'Send');
                        $("#success").slideDown("slow");
                        setTimeout(function() {
                            $("#success").slideUp("slow");
                        }, 5000);
                        form.reset();
                    },
                    error: function() {
                        $('#send').removeAttr('disabled').attr('value', 'Send');
                        $("#error").slideDown("slow");
                        setTimeout(function() {
                            $("#error").slideUp("slow");
                        }, 5000);
                    }
                });
                return false; // required to block normal submit since you used ajax
            }

        });
    }



    // Elements Animation
    if ($('.wow').length) {
        var wow = new WOW({
            boxClass: 'wow', // animated element css class (default is wow)
            animateClass: 'animated', // animation css class (default is animated)
            offset: 0, // distance to the element when triggering the animation (default is 0)
            mobile: true, // trigger animations on mobile devices (default is true)
            live: true // act on asynchronously loaded content (default is true)
        });
        wow.init();
    }



    // Start When document is Scrollig, do
    $(window).on('scroll', function() {
        factCounter();
        headerStyle();
    });


    // Date Counting
    $('[data-countdown]').each(function() {
        var $this = $(this),
            finalDate = $(this).data('countdown');

        $this.countdown(finalDate, function(event) {
            $this.html(event.strftime('<ul><li><span>%D</span>Day</li> <li><span>%H</span>Hour</li> <li><span>%M</span>Min</li> <li><span>%S</span>Sec</li></ul>'));
        });
    });



    // Single Accordean
    var acc = document.getElementsByClassName("accordion");
    var i;

    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function() {
            /* Toggle between adding and removing the "active" class,
            to highlight the button that controls the panel */
            this.classList.toggle("active");

            /* Toggle between hiding and showing the active panel */
            var panel = this.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = panel.scrollHeight + "px";
            }
        });
    }




})(jQuery);