class HeroSection {
    constructor () {
        this.element = document.querySelector('.hero-section')
        this.heroComposition = this.element.querySelector('.hero-composition')

        this.timelineSection = document.querySelector('.timeline-section')
        this.timelineSectionWrapper = document.querySelector('.timeline-section__wrapper')
        this.timelineSectionScroll = document.querySelector('.timeline-section .scroll-container')

        this.heroFirstLines = this.heroComposition.querySelectorAll('.hero-composition__title')
        this.heroFirstDescriptions = this.heroComposition.querySelectorAll('.hero-composition__description')
        this.heroMap = this.heroComposition.querySelector('.hero-composition__map')

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
            end: '+=8000',

            pin: true,
            scrub: 1,
        });

        

        this.timeline.fromTo(this.heroFirstDescriptions, {
            autoAlpha: 1
        }, {
            duration: 1,
            autoAlpha: 0
        })

        this.timeline.to(this.heroFirstLines[0], {
            x: - (((window.innerWidth - (this.heroFirstLines[1].clientWidth / 2)) / 2) + (this.heroFirstLines[1].clientWidth /2 )),
            ease: Power1.easeIn,
            duration: 2
        }, '>')
        this.timeline.to(this.heroFirstLines[1], {
            x: ((window.innerWidth - this.heroFirstLines[1].clientWidth) / 2) + this.heroFirstLines[1].clientWidth,
            ease: Power1.easeIn,
            duration: 2
        }, '<')
        this.timeline.to(this.heroFirstLines[2], {
            x: - (((window.innerWidth - this.heroFirstLines[1].clientWidth) / 2) + this.heroFirstLines[1].clientWidth),
            ease: Power1.easeIn,
            duration: 2
        }, '<')

        this.timeline.fromTo(this.heroMap.children[0], {
            scale: 0,
            autoAlpha: 0.1
        }, {
            scale: 18,
            autoAlpha: 1,
            ease: Power4.easeIn,
            duration: 2.5
        }, '=-1.5')

        this.timeline.to(this.element, {
            y: - (window.innerHeight)
        })

        // this.timeline.fromTo(this.timelineSection, {
        //     filter: 'brightness(0)'
        // }, {
        //     filter: 'brightness(1)'
        // }, '<')
        //end: () => "+=" + (this.timelineSectionScroll.offsetWidth + 1000),

        //console.log(((window.innerWidth * 100) / this.timelineSectionScroll.offsetWidth))
        // d = 100
        // w = 

        //console.log(innerWidth)

        gsap.to(this.timelineSectionScroll, {
            xPercent: -99.9,
            //ease: 'none',
            scrollTrigger: {
                trigger: this.timelineSectionWrapper,
                start: "+=8000",
                //end: "+=7000",
                pin: true,
                scrub: 1,
                markers: true
            }
        })

    }
}