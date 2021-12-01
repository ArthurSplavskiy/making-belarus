class TimelineSection {
    constructor (element) {
        this.element = element
        this.elementWrapper = this.element.querySelector('.timeline-section__wrapper')
        this.elementScroll = this.element.querySelector('.scroll-container')
        this.elementScrollBg = this.element.querySelector('.scroll-container__bg')
        this.images = this.element.querySelectorAll('.parallax-item__img')
        this.text = this.element.querySelectorAll('.parallax-item_text p')
        this.scrollIndicatorArrow = document.querySelectorAll('.scroll-indicator path, .scroll-indicator rect')
        
        this.split = new Split()

        this.timelineSizes = {
            endDesktop: 30000,
            endMobile: 8000
        }

        this.init()
    }

    init () {
        this.scroll()
        //this.Animation()
    }

    scroll () {

        this.timeline = gsap.timeline({ defaults: {ease: 'none'} })

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: self => self.previous().end,
            end: () => `${this.timelineEnd || this.timelineSizes.endDesktop}px 100%`,
            pin: true, 
            scrub: 1,
            invalidateOnRefresh: true
        });

        ScrollTrigger.matchMedia({

            "(max-width: 768px)": () => {
                
                gsap.set(this.elementScrollBg, {
                    xPercent: -50,
                    yPercent: -50,
                    rotate: '90deg'
                })

                this.timeline.to(this.element, {
                    duration: 0.1,
                    y: () => - (this.element.scrollHeight + 200),
                    onStart: () => this.element.classList.add('wc-transform'),
                    onComplete: () => this.element.classList.remove('wc-transform')
                })

                this.timeline.to(this.elementScrollBg, {
                    duration: 0.1,
                    y: 1000,
                    onStart: () => this.elementScrollBg.classList.add('wc-transform'),
                    onComplete: () => this.elementScrollBg.classList.remove('wc-transform')
                }, '<')

            },

            "(min-width: 769px)": () => {

                gsap.set(this.elementScrollBg, {
                    xPercent: 0,
                    yPercent: -50,
                    rotate: '0'
                })
                
                this.timeline.to(this.scrollIndicatorArrow, {
                    duration: 0,
                    fill: '#ffffff'
                })

                this.timeline.fromTo(this.elementScroll, {
                    x: 0,
                }, {
                    x: () => - (this.elementScroll.scrollWidth - window.innerWidth),
                    onStart: () => this.elementScroll.classList.add('wc-transform'),
                    onComplete: () => this.elementScroll.classList.remove('wc-transform')
                })
        
                this.timeline.fromTo(this.elementScrollBg, {
                    xPercent: 0,
                    ease: Power3.easeIn,
                }, {
                    xPercent: 25,
                    onStart: () => this.elementScrollBg.classList.add('wc-transform'),
                    onComplete: () => this.elementScrollBg.classList.remove('wc-transform')
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

                this.timeline.to(this.element, {
                    duration: 0.02,
                })

                this.timeline.to(this.element, {
                    duration: 0.1,
                    yPercent: -100,
                    onStart: () => this.element.classList.add('wc-transform'),
                    onComplete: () => this.element.classList.remove('wc-transform')
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

    onResize () {
        if(window.innerWidth <= 768) {
            this.timelineEnd = this.timelineSizes.endMobile
        } else {
            this.timelineEnd = this.timelineSizes.endDesktop
        }
    }

}