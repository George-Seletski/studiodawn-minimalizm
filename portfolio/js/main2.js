document.addEventListener("DOMContentLoaded", function(event) {

    screenWidth = $(window).width();
 
    var locoScroll;

    barba.hooks.after((data) => {
        window.scrollTo(0, 0);
        gtag('set', 'page', window.location.pathname);
        gtag('send', 'page_view');

        window.Webflow && window.Webflow.destroy();
        window.Webflow && window.Webflow.ready();
        window.Webflow && window.Webflow.require( 'ix2' ).init();
        document.dispatchEvent( new Event( 'readystatechange' ) );
        
        pageInit();
        if(data.next.namespace == 'vertical'){
            locoScroll.on('scroll', (args) => {
                sessionStorage.setItem(window.location.pathname + '-vert-y', parseInt(locoScroll.scroll.instance.scroll.y));
            });
        } else if (data.next.namespace == 'horizontal') {
            locoScroll.on('scroll', (args) => {
                sessionStorage.setItem(window.location.pathname + '-horizontal-x', parseInt(locoScroll.scroll.instance.scroll.x))
            });
        }

        if (data.trigger == 'back') {
            if(data.next.namespace == 'vertical'){
                locoScroll.scrollTo(parseInt(sessionStorage.getItem(window.location.pathname + '-vert-y')), {duration: 0} );
            } else if (data.next.namespace == 'horizontal') {
                locoScroll.scrollTo(parseInt(sessionStorage.getItem(window.location.pathname + '-horizontal-x')), {duration: 0} );
            }
        }

    });

    barba.hooks.beforeLeave(() => {
    })
    barba.hooks.afterLeave((data) => {
        ScrollTrigger.getAll().forEach(tl => tl.kill());
        locoScroll.destroy();
    });

    barba.init({
        schema: {
        prefix: 'data-load',
        wrapper: 'body',
        sync: true,
        },
        views: [{
            namespace: 'horizontal',
            afterEnter(data) {
            }
          }, {
            namespace: 'vertical',
            afterEnter(data) {
            }
        }],
        transitions: [{
            name: 'opacity-transition',
            async leave(data) {
                const done = this.async();
                pageTransitionIn();
				await delay(700);
				done();
            },
            async enter(data) {
                pageTransitionOut();
            }
        }]
    });

    function pageTransitionIn() {
        var tl = gsap.timeline();
        tl.set(".transition", {
            display: 'block',
            autoAlpha: 0
        });

        tl.to(".transition", {
            duration: 0.5,
            autoAlpha: 1,
        });

    }
    function pageTransitionOut() {
        var tl = gsap.timeline();
        tl.set(".transition", {
            display: 'block',
            autoAlpha: 1,
        });
        tl.to(".transition", {
            duration: 0.3,
            autoAlpha: 0,
        }), '<';
    }
    function delay(n) {
        n = n || 2000;
        return new Promise((done) => {
            setTimeout(() => {
                done();
            }, n);
        });
    }

    pageInit();


    imagesLoaded($('body'), { background: true }, function () {
        var tl = gsap.timeline();
        tl.set(".transition", {
            display: 'block',
            autoAlpha: 1,
        });
        tl.to(".transition", {
            duration: 0.3,
            autoAlpha: 0,
        }), '<';
    });
        
    

    var perfEntries = performance.getEntriesByType("navigation");
    let navAction = perfEntries[perfEntries.length - 1].type;


    if ( $('.viewport').attr('data-load-namespace') == 'horizontal' && screenWidth > 991 )  {

        if (navAction == 'reload' && sessionStorage.getItem(window.location.pathname + '-horizontal-x') > 5 ) {
            locoScroll.scrollTo(parseInt(sessionStorage.getItem(window.location.pathname + '-horizontal-x')), {duration: 0} );
        }
        setTimeout(function(){
            locoScroll.on('scroll', (args) => {
                sessionStorage.setItem(window.location.pathname + '-horizontal-x', parseInt(locoScroll.scroll.instance.scroll.x));
            });
        }, 300);

    }

    if ( $('.viewport').attr('data-load-namespace') == 'vertical'  && screenWidth > 991 )  {

        if (navAction == 'reload' && sessionStorage.getItem(window.location.pathname + '-vert-y') > 5 ) {
            locoScroll.scrollTo(parseInt(sessionStorage.getItem(window.location.pathname + '-vert-y')), {duration: 0} );
        }
        setTimeout(function(){
            locoScroll.on('scroll', (args) => {
                sessionStorage.setItem(window.location.pathname + '-vert-y', parseInt(locoScroll.scroll.instance.scroll.y));
            });
        }, 300);
    }


    function pageInit() {

        $('body').removeClass('nav-open--full');
        gsap.registerPlugin(ScrollTrigger);
        gsap.config({nullTargetWarn:false});
        screenWidth = $(window).width();

        $(window).on('resize', function () {
            screenWidth = $(window).width();
        });

        var nav = gsap.timeline({paused:true, reversed: true});
        
        nav.to('.nav', {
            display: 'flex',
        });
        nav.fromTo('.nav', {
            autoAlpha: 0 }, {
            autoAlpha: 1,
            duration: 0.5,
            ease: Power4.easeOut,
        }, '<');
        nav.from('.nav__item', 0.3, {autoAlpha:0, y:100, duration:0.2,stagger:0.1, ease: Power4.easeOut}, '<')

        document.querySelector(".nav-trigger").addEventListener("click", toggleMenu);

        function toggleMenu() {
            $('body').toggleClass('nav-open--full');
            nav.reversed() ? nav.timeScale(1).play() : nav.timeScale(2).reverse(); 
        }

        $('body, .w-dropdown-toggle').css('cursor', 'none');

        $('a[data-cursor]').hover(function () {
            $('body').css('--custom-content', '"' + $(this).data('cursor') + '"');
            $('body').attr('data-hover', 'case-item');
        }, function () {
            $('body').attr('data-hover', '');
        }
        );

        var $circle = $('.cursor');

        function moveCircle(e) {
            gsap.to($circle, 0.01, {
                x: e.clientX,
                y: e.clientY,
                opacity: 1
            });
        }

        function hoverFunc(e) {
            gsap.to($circle, 0.3, {
                opacity: 1,
                scale: 1.3
            });
        }

        function unhoverFunc(e) {
            gsap.to($circle, 0.3, {
                opacity: 1,
                scale: 1
            });
        }

        function hoverPlay(e) {
            gsap.to($circle.find('#cursorCirc'), 0.2, {
                opacity: 0,

            });
            gsap.to($circle.find('#cursorTri'), 0.2, {
                visibility: 'visible',
                opacity: 1,
            });
        }
        function unhoverPlay(e) {
            gsap.to($circle.find('#cursorCirc'), 0.2, {
                opacity: 1,
            });
            gsap.to($circle.find('#cursorTri'), 0.2, {
                visibility: 'hidden',
                opacity: 0,
            });
        }

        function isTouchScreendevice() {
            return 'ontouchstart' in window || navigator.maxTouchPoints;      
        };

        if(isTouchScreendevice()){
            
        } else {

            $(window).on('mousemove', moveCircle);
            $('a, .w-dropdown, div[data-hover]').hover(hoverFunc, unhoverFunc);
            $('.fs-video__overlay').hover(hoverPlay, unhoverPlay);
            
        }
        if($('#reel').length > 0 ) {
            var iframe = document.querySelector('iframe');
            var player = new Vimeo.Player(iframe);
            
            $('.fs-video__overlay').click(function() {
          
              if ( $(this).hasClass('is-playing') ) {
                    player.pause();
                $(this).removeClass('is-playing');
                $('.video-play-button').show();
              } else {
                  player.setCurrentTime(0);
                    player.play();
                player.setVolume(1);
                $(this).addClass('is-playing');
                $('.video-play-button').hide();
              }
              });
        }


        const splitText = new SplitType('.xxl', { types: 'lines', lineClass: 'lines'});
        const splitText1 = new SplitType('.xxxl', { types: 'lines', lineClass: 'lines' });
        const splitText2 = new SplitType('.xxxxl', { types: 'lines', lineClass: 'lines' });


        //Start Horizontal scroll
        if ($('.h-scroll').length > 0 ) {

            
            const scrollContainer = document.querySelector(".h-scroll__inview");

            // Init smooth scroll
            locoScroll = new LocomotiveScroll({
                el: scrollContainer,
                smooth: true,
                multiplier: 1,
                direction: 'horizontal',
                reloadOnContextChange: false,
                touchMultiplier: 3,
                smartphone: {
                    smooth: true,
                    direction: 'vertical',
                },
                tablet: {
                    smooth: true,
                    direction: 'horizontal',
                    breakpoint: 991
                }
            });

            locoScroll.on("scroll", ScrollTrigger.update);

            if( screenWidth > 991) {
            // ScrollProxy tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
            ScrollTrigger.scrollerProxy(scrollContainer, {
                scrollLeft(value) {
                    if (arguments.length) {
                        locoScroll.scroll.instance.scroll.x = value;
                    }
                    return locoScroll.scroll.instance.scroll.x;
                },
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                },
                // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
                pinType: scrollContainer.style.transform ? "transform" : "fixed"

            });
            } else {
                ScrollTrigger.scrollerProxy(scrollContainer, {
                    scrollTop(value) {
                        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
                    }, 
                    getBoundingClientRect() {
                        return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                    },
                    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
                    pinType: scrollContainer.style.transform ? "transform" : "fixed"
                });
            }



            gsap.to(".sticker.sticker-scroll", {
                rotation: 360 * 2,
                duration: 1,
                scrollTrigger: {
                    trigger: $(".sticker.sticker-scroll"),
                    horizontal: true,
                    scroller: scrollContainer,
                    start: "0 82%",
                    end: "0 -20%",
                    scrub: 0.01
                }
            });

            $('.h-scroll__section').each(function (index) {
                let triggerElement = $(this);
                let targetElement = triggerElement.find('.sticker');
                if (targetElement) {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: targetElement,
                            horizontal: true,
                            scroller: scrollContainer,
                            start: "0 95%",
                            end: "0 80%",
                        }
                    });
                    tl.from(targetElement, {
                        scale: 0,
                        ease: Elastic.easeOut.config(1, 0.4),
                        duration: 0.6
                    }, 0.5);
                }
            });

            fitty('.services__item', {
                maxSize: 100
            });

            gsap.to(".services__list", {
                y: '-100%',
                scrollTrigger: {
                    trigger: $(".services"),
                    horizontal: true,
                    scroller: scrollContainer,
                    start: "0 120%",
                    end: "0 -50%",
                    scrub: 0.5
                }
            });

            gsap.to($('.case--bg'), {
                visibility: 'visible'
            });

            let collageImages = gsap.utils.toArray(".collage__img");

            let imageCollage = gsap.timeline({
                repeat: -1, repeatDelay: 1, repeatRefresh: true
            });
            collageImages.forEach((image, i) => {
                imageCollage.set(image, {scale:1, autoAlpha: 0, left: '50%', x: '-50%'});

            });
            imageCollage.to(collageImages, {
                rotation: function(){ return getRand(-20,20)},
                duration: 0
            });
            imageCollage.to(collageImages, {
                autoAlpha: 1,
                duration: 0.1,
                
                stagger: {
                    each: 1
                }
            });


            $('.case__item').each(function (index) {
                let triggerElement = $(this);
                let targetElement = $('.case--bg');

                if (targetElement) { 

                    let caseIn = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            horizontal: true,
                            scroller: scrollContainer,
                            start: "0 100%",
                            end: "0 20%",
                            scrub: 0,
                        }
                    });
                    caseIn.from(triggerElement.find($('.case__cover')), {
                        scale: 0.4,
                        rotation: 16,

                    });

                    caseIn.from(triggerElement.find($('.case__title')), {
                        y: '-=400',
                    }, '<10%');

                    caseIn.to(targetElement, {
                        backgroundColor: triggerElement.attr('data-color'),
                    }, '<20%');

                    let caseOut = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            horizontal: true,
                            scroller: scrollContainer,
                            start: "0 -20%",
                            end: "0 -100%",
                            scrub: 0,
                        }
                    });
                    caseOut.to(triggerElement.find($('.case__cover')), {
                        scale: 0.4,
                        rotation: -8,
                    });


                }


            });

            if (screenWidth > 991) {
                $('.tape__line').each(function (index) {
                    let triggerElement = $(this);
                    let targetElement = triggerElement.find('.tape__text');
                    if (targetElement) {
                        let tl = gsap.timeline({
                            scrollTrigger: {
                                trigger: $('.tape'),
                                horizontal: true,
                                scroller: scrollContainer,
                                start: "0 100%",
                                end: "0 -40%",
                                scrub: 0.1,
                            }
                        });
                        tl.to(targetElement, {
                            x: gsap.utils.random([700, -700]),
                        });
                    }
                });
            }

            gsap.to($('.client-grid__col:nth-child(1)'), {
                y: '-=30%',
                scrollTrigger: {
                    trigger: $('.client-grid'),
                    horizontal: true,
                    scroller: scrollContainer,
                    start: "0 100%",
                    scrub:0
                }
            });
            gsap.set($('.client-grid__col:nth-child(2)'), {y:'-=50%'});
            gsap.to($('.client-grid__col:nth-child(2)'), {
                y: '+=30%',
                scrollTrigger: {
                    trigger: $('.client-grid'),
                    horizontal: true,
                    scroller: scrollContainer,
                    start: "0 100%",
                    scrub:0
                }
            });

            //CASE

            if($('.story-content').length > 0) {

                let style = $('body').attr('data-theme');
                $('body').removeAttr('data-theme');
                $('body').attr('style', style);


                gsap.from('.case-page__cover', {
                    //x: '-100%',
                    width: 0,
                    duration:1,
                    ease: Power4.easeOut,
                    clearProps: 'all',
                });

                $('.story__block:not(.intro, .web__case)').each(function (index) {
                    let triggerElement = $(this);
            
                    let storyBlockIn = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            horizontal: true,
                            scroller: scrollContainer,
                            start: "0 100%",
                            end: "0 70%",
                            scrub: 0,
                        }
                    });
                    storyBlockIn.from(triggerElement, {
                        scale: 0.6,
                        rotation: 8,

                    });
                });

                if (screenWidth > 991) { 
                    $('.web_case-img.scroll-down').each(function (index) {
                        let triggerElement = $(this);
                
                        let scrollDownImage = gsap.timeline({
                            scrollTrigger: {
                                trigger: triggerElement,
                                horizontal: true,
                                scroller: scrollContainer,
                                start: "0 60%",
                                end: "0 -100%",
                                scrub: 0,
                            }
                        });
                        scrollDownImage.to(triggerElement, {
                            y: '-=50%',
                        });
                    });

                    $('.web_case-img.scroll-up').each(function (index) {
                        let triggerElement = $(this);
                
                        let scrollDownImage = gsap.timeline({
                            scrollTrigger: {
                                trigger: triggerElement,
                                horizontal: true,
                                scroller: scrollContainer,
                                start: "0 60%",
                                end: "0 -100%",
                                scrub: 0,
                            }
                        });
                        scrollDownImage.to(triggerElement, {
                            y: '+=50%',
                        });
                    });
                }


            }


            if (locoScroll.scroll.direction == 'horizontal') {

                // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
                ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

                // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
                ScrollTrigger.refresh();

                contentAnimation(scrollContainer, true);

                $(window).on('resize', function () {
                    let containerW = 0;
                    $('.h-scroll__section').each(function (index) {

                        let sectionW = $(this).outerWidth();

                        containerW = Math.ceil(parseInt(containerW + sectionW + 1.5));

                    });

                    $('.h-scroll__inview').width(containerW);
                    locoScroll.update();
                });


                imagesLoaded(scrollContainer, function () {

                    window.dispatchEvent(new Event('resize'));
                        
                });

            } else {

                contentAnimation(scrollContainer, false);

                setTimeout(function(){
                    imagesLoaded(scrollContainer, { background: true }, function () {
                        locoScroll.update();
                        
                    });
                }, 500);

            }

        } // End home page
    ///////////////////////////////////////////////////////////////////////////////
        // Start vertical scroll
        if ($('.v-scroll').length > 0) {

            const scrollContainer = document.querySelector(".v-scroll");

            locoScroll = new LocomotiveScroll({
                el: scrollContainer,
                smooth: true,
                multiplier: 1,
                resetNativeScroll: false,
                reloadOnContextChange: false,
                touchMultiplier: 3,
                smartphone: {
                    smooth: true,
                    direction: 'vertical',
                },
                tablet: {
                    smooth: true,
                    direction: 'vertical',
                    breakpoint: 991
                }
            });

            locoScroll.on("scroll", ScrollTrigger.update);

            // ScrollProxy tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
            ScrollTrigger.scrollerProxy(scrollContainer, {
                scrollTop(value) {
                    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
                }, 
                getBoundingClientRect() {
                    return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
                },
                // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
                pinType: scrollContainer.style.transform ? "transform" : "fixed"
            });

            // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

            // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
            ScrollTrigger.refresh();
            
            if ($('.process').length > 0) {


                gsap.set($('.process'), {
                    height: '100vh'
                });
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: ".process",
                        scroller: scrollContainer,
                        scrub: true,
                        pin: true,
                        start: "0 0%",
                        end: "=400%",
                        onEnter: () => $('.main').addClass('invert'),
                        onLeave: () => $('.main').removeClass('invert'),
                        onEnterBack: () => $('.main').addClass('invert'),
                        onLeaveBack: () => $('.main').removeClass('invert'),
                    }
                });
                tl.set($('.process__headingxl'), {
                    position: 'absolute'
                });
                tl.to($('.process__headingxl'), {
                    opacity: 0,
                    duration: 0.1
                },'<+=25%');

                const lottie = Webflow.require('lottie').lottie;

                function LottieScrollTrigger(vars) {
                    let playhead = {frame: 0},
                        target = gsap.utils.toArray(vars.target)[0],
                        st = {scroller: scrollContainer, target: target, trigger: $('.process'), start: "0 0%", end: "=+350%", scrub: 0.1},
                        animation = lottie.loadAnimation({
                            container: target,
                            renderer: vars.renderer || "svg",
                            loop: false,
                            autoplay: false,
                            path: vars.path,
                        });
                    for (let p in vars) { // let users override the ScrollTrigger defaults
                        st[p] = vars[p];
                    }
                    animation.addEventListener("DOMLoaded", function() {
                        gsap.to(playhead, {
                            frame: animation.totalFrames - 1,
                            ease: "none",
                            onUpdate: () => animation.goToAndStop(playhead.frame, true),
                            scrollTrigger: st
                        }, 's1');
                    });
                return animation;
                }

                LottieScrollTrigger({
                    target: "#processAnim",
                    path: "https://uploads-ssl.webflow.com/61fb92bac35517f753fbbdd7/626b9096047f9971124207b0_habitat-process_v10.json",
                });

                let sections = gsap.utils.toArray(".process__block"),
                currentSection = sections[0];
                let titlesfirst = document.querySelector(".process__title-first");


                // create a ScrollTrigger for each section
                sections.forEach((section, i) => {

                    gsap.set(section, {position: 'absolute'});
                    let blockCount = i + 1;

                    tl.addLabel("s" + blockCount, blockCount);

                        tl.fromTo(section, {
                            opacity: 0,
                            y: 50
                          }, {
                          y: 0,
                          opacity: 1,
                          duration: 0.3,
                          ease: Power4.easeOut,
                        }, "s" + blockCount + "-=0.7");
                      

                      if(blockCount != 4) {
    
                        tl.to(section, {
                          opacity: 0,
                          y: -50,
                          duration: 0.3,
                          ease: Power4.easeOut,
                        }, "s" + blockCount);
                        
                      }

                });

                let titles = gsap.utils.toArray(".process__title-sub");

                titles.forEach((title, i) => {
                    
                    let blockCount = i + 1;

                    tl.to(title, {
                      y: '-=100%',
                      duration: 0.3,
                      ease: Power4.easeOut,
                    }, "s" + blockCount + "-=0.7");

                    if(blockCount != 4) {
                        tl.to(title, {
                        y: '-=200%',
                        duration: 0.3,
                        ease: Power4.easeOut,
                        }, "s" + blockCount);
                    }

                });
            }
            

            $('.image-wrap').each(function (index) {
                
                let triggerElement = $(this);
                let targetElement = triggerElement;
            
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerElement,
                        horizontal: false,
                        scroller: scrollContainer,
                        start: "0 100%",
                        scrub: true
                    }
                });
            
                tl.to($('.image-wrap').find('.image-wrap__fx'), {
                    scale: 0.9,
                });
            });




            $('.contact-team__item').each(function (index) {
                
                let triggerElement = $(this);
                let targetElement = triggerElement;
            
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerElement,
                        horizontal: false,
                        scroller: scrollContainer,
                        start: "0 100%",
                    }
                });
            
                tl.from(targetElement, {
                    y: +100,
                    duration: 0.5,
                    ease: Power4.easeOut,
                    opacity: 0,
                }, 0.05 * index);
            });


            /*
            gsap.to($('.tape.horizontal'), {
                y: '-=100%',
                scrollTrigger: {
                    trigger: $('.team'),
                    scroller: scrollContainer,
                    scrub: true,
                    start: "0 100%",
                    end: "0 50%"
                }
            });
            */

            let teamHeadline = gsap.timeline({
                scrollTrigger: {
                    trigger: $('.team_habitat'),
                    scroller: scrollContainer,
                    scrub: true,
                    pin: true,
                    start: "0 20%",
                    end: "+370%",
                }
            });

            
            $('.tape__line').each(function (index) {
                let triggerElement = $('.team');
                let targetElement = $(this).find('.tape__text');
                if (targetElement) {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            scroller: scrollContainer,
                            start: "0 100%",
                            end: "0 0%",
                            scrub: 0.5
                        }
                    });
                    tl.to(targetElement, {
                        x: gsap.utils.random([500, -500, -300, 300]),
                        duration: 0.5,
                        ease: 'none'
                    });
                }
            });


            $('.team__card-transform').each(function (index) {

                gsap.set($(this), {scale:1, rotation: gsap.utils.random(-12, 12)});

                let triggerElement = $(this);
                let targetElement = $(this);

                if (targetElement) {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            scroller: scrollContainer,
                            start: "0 120%",
                            end: "0 0%",
                            scrub: true
                        }
                    });
                    tl.to(targetElement, {
                        rotation: 0
                    }, '<100%');
                    tl.to(targetElement, {
                        y: -250 + (index * 20),
                        duration: 0.5,
                    }, '<50%');
                }

            });

            $('.team__card').each(function (index) {
                
                let triggerElement = $(this);
                let targetElement = triggerElement;
            
                let tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: triggerElement,
                        horizontal: false,
                        scroller: scrollContainer,
                        start: "0 100%",
                        scrub: true
                    }
                });
            
                tl.from(targetElement.find('.team__image-wrap img'), {
                    scale: 1.2,
                });
            });

            
            let music = {

                dunk: Object.assign(document.createElement('audio'), {
                    src: 'https://dev.klemetszackrisson.se/habitat/music.mp3',
                    loop: true,
                    volume: 0.1
                }),

            } 

            let teamCards = gsap.utils.toArray(".team__card-transform");

            let danceButtonS = $('#danceOff').find('p');
            let danceButtonSOrg = danceButtonS.html();

            teamCards.forEach((teamCard, i) => {
                
                let randAngle;
                let danceOff = gsap.timeline({repeat: -1, repeatRefresh: true, paused: true,});
                let dancing = false;

                danceOff.to(teamCard, {
                    duration: 0.08,
                    scale: 1.1,
                    transformOrigin:'50% 50%',
                    rotation: function(){ return getRand(-5,5) },
                });
                danceOff.to(teamCard, {
                    rotation: function(){ return getRand(-5,5) },
                    duration: 0.4,
                    scale: 1,
                    transformOrigin:'50% 50%',
                });
                
                let strobe = gsap.timeline({repeat: -1, paused: true, yoyo: true});

                strobe.to($('body'), {
                    duration: 0.08,
                    onComplete: function() {
                        $('.main').addClass('invert'); // then only replace with blue div with new height and width
                    }
                });
                strobe.to($('body'), {
                    duration: 0.4,
                    onComplete: function() {
                        $('.main').removeClass('invert'); // then only replace with blue div with new height and width
                    }
                });


                $('#danceOff').click(function () {

                    if(dancing == false) {
                        dancing = true;
                        music.dunk.play();
                        danceButtonS.html('STOP <br/> DANCE <br/> PARTY');
                        strobe.play();
                        danceOff.play();
                        
                    } else {
                        danceOff.pause();
                        gsap.to(teamCard, {
                            rotation: 0,
                            scale: 1,
                            duration: 0.6,
                            ease: Elastic.easeOut.config(1, 0.4),
                        });

                        danceOff.seek(0);
                        dancing = false;
                        music.dunk.pause();
                        music.dunk.currentTime = 0;
                        danceButtonS.html(danceButtonSOrg);
                        strobe.pause();
                        strobe.seek(0);
                        $('.main').removeClass('invert');

                    }
                });

                teamCard.addEventListener("mouseenter", () => {
                    
                    randAngle = gsap.utils.random(-12, 12);

                    if(dancing == false) {
                        gsap.to(teamCard, {
                            rotation: randAngle,
                            scale: 1.01,
                            duration: 0.6,
                            ease: Elastic.easeOut.config(1, 0.4),
                        });
                    }
                    
                });
                
                teamCard.addEventListener("mouseleave", () => {
                    if(dancing == false) {
                        gsap.to(teamCard, {
                            rotation: 0,
                            scale: 1,
                            duration: 0.6,
                            ease: Elastic.easeOut.config(1, 0.4)
                        });
                    }

                });
            
                
            });

            let clientLogos = gsap.utils.toArray(".client-list > div");

            clientLogos.forEach((clientLogo, i) => {
                let triggerElement = $('.client-list');
                let targetElement = clientLogo;

                gsap.from(targetElement, {
                    opacity: 0,
                    y: '100',
                    delay: i * 0.05,

                    scrollTrigger: {
                        trigger: triggerElement,
                        scroller: scrollContainer,
                        start: "0 70%",
                    }
                });
            });

            $('.v-scroll__section').each(function (index) {
                let triggerElement = $(this);
                let targetElement = triggerElement.find('.sticker');
                if (targetElement) {
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: targetElement,
                            horizontal: false,
                            scroller: scrollContainer,
                            start: "0 95%",
                            end: "0 80%",
                        }
                    });
                    tl.from(targetElement, {
                        scale: 0,
                        ease: Elastic.easeOut.config(1, 0.4),
                        duration: 0.6
                    }, 0.5);
                }
            });


            //CASES PAGE

            if ($('.cases-page__cols').length > 0) {

                $('.cases-page__item').each(function (index) {

                    let triggerElement = $(this);
                    let targetElement = $(this);

                    gsap.set(targetElement, {y: 100  + (index * 20), scale:1, rotation: gsap.utils.random(-12, 12)});

                    let tl2 = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            scroller: scrollContainer,
                            start: "0 120%",
                            end: "0 40%",
                            scrub: true
                        }
                    });

                    tl2.to(targetElement, {
                        y: 0,
                        rotation: 0
                    }, '<');

                });

                $('.cases-page__item').each(function (index) {
                
                    let triggerElement = $(this);
                    let targetElement = triggerElement;
                
                    let tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: triggerElement,
                            horizontal: false,
                            scroller: scrollContainer,
                            start: "0 100%",
                            scrub: true
                        }
                    });
                
                    tl.from(targetElement.find('.cases-page__img-wrap img'), {
                        scale: 1.2,
                    });
                });

            
            }

            contentAnimation(scrollContainer, false);

            setTimeout(function(){
                imagesLoaded(scrollContainer, { background: true }, function () {
                    locoScroll.update();
                    
                });
            }, 500);


        };

    }
});

function contentAnimation(scrollContainer, horizontal) {

    $('.lines').each(function (index) {
        let triggerElement = $(this).parent();
        let targetElement = $(this);
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                horizontal: horizontal,
                scroller: scrollContainer,
                start: "0 100%",
            }
        });
        tl.from(targetElement, {
            y: +100,
            duration: 0.8,
            ease: Power4.easeOut,
            opacity: 0,
        }, 0.1 * index);
    });

    $('.content-grid .p').each(function (index) {
        let triggerElement = $(this);
        let targetElement = $(this);

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                horizontal: horizontal,
                scroller: scrollContainer,
                start: "0 100%",
            }
        });
        tl.from(targetElement, {
            y: +100,
            duration: 0.8,
            ease: Power4.easeOut,
            opacity: 0,
        }, 0.1 * index);

    });

    $('.content-grid h3').each(function (index) {
        let triggerElement = $(this);
        let targetElement = $(this);

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                horizontal: horizontal,
                scroller: scrollContainer,
                start: "0 100%",
            }
        });
        tl.from(targetElement, {
            y: +100,
            duration: 0.8,
            ease: Power4.easeOut,
            opacity: 0,
        }, 0.1 * index);

    });

    $('.content-grid a:not(.sticker-link)').each(function (index) {
        let triggerElement = $(this);
        let targetElement = $(this);
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                horizontal: horizontal,
                scroller: scrollContainer,
                start: "0 100%",
            }
        });
        tl.from(targetElement, {
            y: +100,
            duration: 0.8,
            ease: Power4.easeOut,
            opacity: 0,
        }, 0.1 * index);
    });
}

function getRand(min,max){
    return Math.random() * (max - min) + min;
}