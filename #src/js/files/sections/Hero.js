class HeroSection {
    constructor (element) {
        this.element = element
        this.heroComposition = this.element.querySelector('.hero-composition')

        this.pinSpacer = this.element.parentElement

        this.timelineSection = document.querySelector('.timeline-section')

        this.heroFirstLines = this.heroComposition.querySelectorAll('.hero-composition__title')
        this.heroFirstDescriptions = this.heroComposition.querySelectorAll('.hero-composition__description')
        this.heroMap = this.heroComposition.querySelector('.hero-composition__map')

        this.timelineSizes = {
            endDesktop: 8000,
            endMobile: 4000
        }

        this.init()
    }

    init () {
        this.timelineAnimation()
    }

    timelineAnimation() {
        this.timeline = gsap.timeline()

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: "top top",
            end: () => `+=${this.timelineEnd || this.timelineSizes.endDesktop}`,
            pin: true,
            pinSpacing: "margin",
            scrub: 1,
            invalidateOnRefresh: true
        });

        this.timeline.fromTo(this.heroFirstDescriptions, {
            opacity: 1
        }, {
            duration: 1,
            opacity: 0
        })

        this.timeline.to(this.heroFirstLines[0], {
            x: () => - (((window.innerWidth - (this.heroFirstLines[1].clientWidth / 2)) / 2) + (this.heroFirstLines[1].clientWidth /2 )), 
            ease: Power1.easeIn,
            duration: 2,
            opacity: 0.2,
            onStart: () => this.heroFirstLines[0].classList.add('wc-transform'),
            onComplete: () => this.heroFirstLines[0].classList.remove('wc-transform')
        }, '>')
        this.timeline.to(this.heroFirstLines[1], {
            x: () => ((window.innerWidth - this.heroFirstLines[1].clientWidth) / 2) + this.heroFirstLines[1].clientWidth,
            ease: Power1.easeIn,
            duration: 2,
            opacity: 0.2,
            onStart: () => this.heroFirstLines[1].classList.add('wc-transform'),
            onComplete: () => this.heroFirstLines[1].classList.remove('wc-transform')
        }, '<')
        this.timeline.to(this.heroFirstLines[2], {
            x: () => - (((window.innerWidth - this.heroFirstLines[1].clientWidth) / 2) + this.heroFirstLines[1].clientWidth),
            ease: Power1.easeIn,
            duration: 2,
            opacity: 0.2,
            onStart: () => this.heroFirstLines[2].classList.add('wc-transform'),
            onComplete: () => this.heroFirstLines[2].classList.remove('wc-transform')
        }, '<')

        this.timeline.fromTo(this.heroMap.children[0], {
            scale: 0.0001,
            opacity: 0.4
        }, {
            scale: 1,
            opacity: 1,
            ease: Power4.easeIn,
            duration: 2.5,
        }, '=-1.5')

        this.timeline.to(this.element, {
            duration: 2,
            y: () => - (window.innerHeight),
            onStart: () => this.element.classList.add('wc-transform'),
            onComplete: () => this.element.classList.remove('wc-transform')
        })

        this.timeline.fromTo(this.timelineSection, {
            filter: 'brightness(0)'
        }, {
            filter: 'brightness(1)'
        }, '<')
        /*
          * z-index
        */
        this.pinSpacer = this.element.parentElement
        let pinSpacerZindex = this.pinSpacer.style.zIndex
        this.timeline.to('.pin-spacer', {
            duration: 0,
            zIndex: pinSpacerZindex
        })
        this.timeline.call(_ => {
            this.pinSpacer.style.zIndex = -1;
        })

    }

    onResize () {
        if(window.innerWidth <= 768) {
            this.timelineEnd = this.timelineSizes.endMobile
        } else {
            this.timelineEnd = this.timelineSizes.endDesktop
        }
    }

}