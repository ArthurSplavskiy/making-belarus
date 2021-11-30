class TimelineSection {
    constructor (element) {
        this.element = element
        this.elementWrapper = this.element.querySelector('.timeline-section__wrapper')
        this.elementScroll = this.element.querySelector('.scroll-container')
        this.elementScrollBg = this.element.querySelector('.scroll-container__bg')
        this.images = this.element.querySelectorAll('.parallax-item__img')
        this.text = this.element.querySelectorAll('.parallax-item_text p')
        
        this.split = new Split()

        this.init()
    }

    init () {
        this.scroll()
        //this.Animation()
    }

    scroll () {

        ScrollTrigger.matchMedia({

            "(max-width: 768px)": function() {
                const timeline = gsap.timeline({ defaults: {ease: 'none'} })
                const rootElement = document.querySelector('.timeline-section')
                const scrollContainerBG = rootElement.querySelector('.scroll-container__bg')

                ScrollTrigger.create({
                    trigger: rootElement,
                    animation: timeline,
                    start: self => self.previous().end,
                    end: '30000px 100%',
                    pin: true, 
                    scrub: 1,
                });

                gsap.set(scrollContainerBG, {
                    xPercent: -50,
                    yPercent: -50,
                    rotate: '90deg'
                })

                timeline.to(rootElement, {
                    duration: 0.1,
                    y: - (rootElement.scrollHeight + 200),
                    onStart: () => rootElement.classList.add('wc-transform'),
                    onComplete: () => rootElement.classList.remove('wc-transform')
                })

                timeline.to(scrollContainerBG, {
                    duration: 0.1,
                    y: 1000,
                    onStart: () => scrollContainerBG.classList.add('wc-transform'),
                    onComplete: () => scrollContainerBG.classList.remove('wc-transform')
                }, '<')

            },

            "(min-width: 769px)": function() {
                const timeline = gsap.timeline({ defaults: {ease: 'none'} })
                const rootElement = document.querySelector('.timeline-section')
                const scrollContainer = document.querySelector('.scroll-container')
                const scrollContainerBG = document.querySelector('.scroll-container__bg')
                const scrollIndicatorArrow = document.querySelectorAll('.scroll-indicator path, .scroll-indicator rect')
                const parallaxImageText = document.querySelectorAll('.parallax-item__img-text')
                const parallaxImages = document.querySelectorAll('.parallax-item__img')

                ScrollTrigger.create({
                    trigger: rootElement,
                    animation: timeline,
                    start: self => self.previous().end,
                    end: '30000px 100%',
                    pin: true,
                    pinSpacing: "margin",
                    scrub: 1
                });
                
                timeline.to(scrollIndicatorArrow, {
                    duration: 0,
                    fill: '#ffffff'
                })

                timeline.fromTo(scrollContainer, {
                    x: 0,
                }, {
                    x: - (scrollContainer.scrollWidth - window.innerWidth),
                    onStart: () => scrollContainer.classList.add('wc-transform'),
                    onComplete: () => scrollContainer.classList.remove('wc-transform')
                })
        
                timeline.fromTo(scrollContainerBG, {
                    xPercent: 0,
                    ease: Power3.easeIn,
                }, {
                    xPercent: 25,
                    onStart: () => scrollContainerBG.classList.add('wc-transform'),
                    onComplete: () => scrollContainerBG.classList.remove('wc-transform')
                }, '<')

                // timeline.to(parallaxImageText, {
                //     x: 40,
                //     onStart: () => parallaxImageText.classList.add('wc-transform'),
                //     onComplete: () => parallaxImageText.classList.remove('wc-transform')
                // }, '<')
                // timeline.to(parallaxImages, {
                //     x: -40,
                //     onStart: () => parallaxImages.classList.add('wc-transform'),
                //     onComplete: () => parallaxImages.classList.remove('wc-transform')
                // }, '<')

                timeline.to(rootElement, {
                    duration: 0.02,
                })

                timeline.to(rootElement, {
                    duration: 0.1,
                    yPercent: -100,
                    onStart: () => rootElement.classList.add('wc-transform'),
                    onComplete: () => rootElement.classList.remove('wc-transform')
                })

            }

        })

    }

    Animation () {
        this.observer = new Observer(this.images, this.imageAnimationIn, this.imageAnimationOut)
        this.observerText = new Observer(this.text, this.textAnimationIn, this.textAnimationOut)
    }

    imageAnimationIn (el) {
        if(!el.classList.contains('_reveal')) {
            el.classList.add('_reveal')
        }
    }

    imageAnimationOut (el) {
        el.classList.remove('_reveal')
    }

    textAnimationIn (el) {
        if(!el.classList.contains('is-view')) {
            el.classList.add('is-view')
        }
    }

    textAnimationOut (el) {
        el.classList.remove('is-view')
    }

}