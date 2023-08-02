document.addEventListener("DOMContentLoaded", function(event) {

    screenWidth = $(window).width();

    var locoScroll;




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


    imagesLoaded($('body'), {
        background: true
    }, function() {
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


    if ($('.viewport').attr('data-load-namespace') == 'horizontal' && screenWidth > 991) {

        if (navAction == 'reload' && sessionStorage.getItem(window.location.pathname + '-horizontal-x') > 5) {
            locoScroll.scrollTo(parseInt(sessionStorage.getItem(window.location.pathname + '-horizontal-x')), {
                duration: 0
            });
        }
        setTimeout(function() {
            locoScroll.on('scroll', (args) => {
                sessionStorage.setItem(window.location.pathname + '-horizontal-x', parseInt(locoScroll.scroll.instance.scroll.x));
            });
        }, 300);

    }

    if ($('.viewport').attr('data-load-namespace') == 'vertical' && screenWidth > 991) {

        if (navAction == 'reload' && sessionStorage.getItem(window.location.pathname + '-vert-y') > 5) {
            locoScroll.scrollTo(parseInt(sessionStorage.getItem(window.location.pathname + '-vert-y')), {
                duration: 0
            });
        }
        setTimeout(function() {
            locoScroll.on('scroll', (args) => {
                sessionStorage.setItem(window.location.pathname + '-vert-y', parseInt(locoScroll.scroll.instance.scroll.y));
            });
        }, 300);
    }


    function pageInit() {

        $('body').removeClass('nav-open--full');
        gsap.registerPlugin(ScrollTrigger);
        gsap.config({
            nullTargetWarn: false
        });
        screenWidth = $(window).width();

        $(window).on('resize', function() {
            screenWidth = $(window).width();
        });

        var nav = gsap.timeline({
            paused: true,
            reversed: true
        });

        nav.to('.nav', {
            display: 'flex',
        });
        nav.fromTo('.nav', {
            autoAlpha: 0
        }, {
            autoAlpha: 1,
            duration: 0.5,
            ease: Power4.easeOut,
        }, '<');
        nav.from('.nav__item', 0.3, {
            autoAlpha: 0,
            y: 100,
            duration: 0.2,
            stagger: 0.1,
            ease: Power4.easeOut
        }, '<')

        document.querySelector(".nav-trigger").addEventListener("click", toggleMenu);


        const splitText = new SplitType('.xxl', {
            types: 'lines',
            lineClass: 'lines'
        });
        const splitText1 = new SplitType('.xxxl', {
            types: 'lines',
            lineClass: 'lines'
        });
        const splitText2 = new SplitType('.xxxxl', {
            types: 'lines',
            lineClass: 'lines'
        });


        //Start Horizontal scroll
        if ($('.h-scroll').length > 0) {


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

            if (screenWidth > 991) {
                // ScrollProxy tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
                ScrollTrigger.scrollerProxy(scrollContainer, {
                    scrollLeft(value) {
                        if (arguments.length) {
                            locoScroll.scroll.instance.scroll.x = value;
                        }
                        return locoScroll.scroll.instance.scroll.x;
                    },
                    getBoundingClientRect() {
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight
                        };
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
                        return {
                            top: 0,
                            left: 0,
                            width: window.innerWidth,
                            height: window.innerHeight
                        };
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

            $('.h-scroll__section').each(function(index) {
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
                repeat: -1,
                repeatDelay: 1,
                repeatRefresh: true
            });
            collageImages.forEach((image, i) => {
                imageCollage.set(image, {
                    scale: 1,
                    autoAlpha: 0,
                    left: '50%',
                    x: '-50%'
                });

            });
            imageCollage.to(collageImages, {
                rotation: function() {
                    return getRand(-20, 20)
                },
                duration: 0
            });
            imageCollage.to(collageImages, {
                autoAlpha: 1,
                duration: 0.1,

                stagger: {
                    each: 1
                }
            });

            $('.case__item').each(function(index) {
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
                $('.tape__line').each(function(index) {
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
                    scrub: 0
                }
            });
            gsap.set($('.client-grid__col:nth-child(2)'), {
                y: '-=50%'
            });
            gsap.to($('.client-grid__col:nth-child(2)'), {
                y: '+=30%',
                scrollTrigger: {
                    trigger: $('.client-grid'),
                    horizontal: true,
                    scroller: scrollContainer,
                    start: "0 100%",
                    scrub: 0
                }
            });

            //CASE

            if ($('.story-content').length > 0) {

                let style = $('body').attr('data-theme');
                $('body').removeAttr('data-theme');
                $('body').attr('style', style);


                gsap.from('.case-page__cover', {
                    //x: '-100%',
                    width: 0,
                    duration: 1,
                    ease: Power4.easeOut,
                    clearProps: 'all',
                });

                $('.story__block:not(.intro, .web__case)').each(function(index) {
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
                    $('.web_case-img.scroll-down').each(function(index) {
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

                    $('.web_case-img.scroll-up').each(function(index) {
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

                $(window).on('resize', function() {
                    let containerW = 0;
                    $('.h-scroll__section').each(function(index) {

                        let sectionW = $(this).outerWidth();

                        containerW = Math.ceil(parseInt(containerW + sectionW + 1.5));

                    });

                    $('.h-scroll__inview').width(containerW);
                    locoScroll.update();
                });


                imagesLoaded(scrollContainer, function() {

                    window.dispatchEvent(new Event('resize'));

                });

            } else {

                contentAnimation(scrollContainer, false);

                setTimeout(function() {
                    imagesLoaded(scrollContainer, {
                        background: true
                    }, function() {
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
                    return {
                        top: 0,
                        left: 0,
                        width: window.innerWidth,
                        height: window.innerHeight
                    };
                },
                // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
                pinType: scrollContainer.style.transform ? "transform" : "fixed"
            });

            // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
            ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

            // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
            ScrollTrigger.refresh();

            $('.image-wrap').each(function(index) {

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








            //CASES PAGE

            if ($('.cases-page__cols').length > 0) {

                $('.cases-page__item').each(function(index) {

                    let triggerElement = $(this);
                    let targetElement = $(this);

                    gsap.set(targetElement, {
                        y: 100 + (index * 20),
                        scale: 1,
                        rotation: gsap.utils.random(-12, 12)
                    });

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

                $('.cases-page__item').each(function(index) {

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

            setTimeout(function() {
                imagesLoaded(scrollContainer, {
                    background: true
                }, function() {
                    locoScroll.update();

                });
            }, 500);


        };

    }
});

function contentAnimation(scrollContainer, horizontal) {
    $(".lines").each(function(index) {
        let triggerElement = $(this).parent();
        let targetElement = $(this);
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                horizontal: horizontal,
                scroller: scrollContainer,
                start: "0 100%",
            },
        });
        tl.from(
            targetElement, {
                y: +100,
                duration: 0.8,
                ease: Power4.easeOut,
                opacity: 0,
            },
            0.1 * index
        );
    });

    $(".content-grid .p").each(function(index) {
        let triggerElement = $(this);
        let targetElement = $(this);

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                horizontal: horizontal,
                scroller: scrollContainer,
                start: "0 100%",
            },
        });
        tl.from(
            targetElement, {
                y: +100,
                duration: 0.8,
                ease: Power4.easeOut,
                opacity: 0,
            },
            0.1 * index
        );
    });

    $(".content-grid h3").each(function(index) {
        let triggerElement = $(this);
        let targetElement = $(this);

        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                horizontal: horizontal,
                scroller: scrollContainer,
                start: "0 100%",
            },
        });
        tl.from(
            targetElement, {
                y: +100,
                duration: 0.8,
                ease: Power4.easeOut,
                opacity: 0,
            },
            0.1 * index
        );
    });

    $(".content-grid a:not(.sticker-link)").each(function(index) {
        let triggerElement = $(this);
        let targetElement = $(this);
        let tl = gsap.timeline({
            scrollTrigger: {
                trigger: triggerElement,
                horizontal: horizontal,
                scroller: scrollContainer,
                start: "0 100%",
            },
        });
        tl.from(
            targetElement, {
                y: +100,
                duration: 0.8,
                ease: Power4.easeOut,
                opacity: 0,
            },
            0.1 * index
        );
    });
}

function getRand(min, max) {
    return Math.random() * (max - min) + min;
}