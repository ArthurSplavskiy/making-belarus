class HeroSection {
    constructor () {
        this.element = document.querySelector('.hero-section')
        this.heroComposition = this.element.querySelector('.hero-composition')

        this.pinSpacer = this.element.parentElement

        this.timelineSection = document.querySelector('.timeline-section')

        this.heroFirstLines = this.heroComposition.querySelectorAll('.hero-composition__title')
        this.heroFirstDescriptions = this.heroComposition.querySelectorAll('.hero-composition__description')
        this.heroMap = this.heroComposition.querySelector('.hero-composition__map')

        this.init()
    }

    init () {
        this.timelineAnimation()
        this.normalize()
    }

    timelineAnimation() {
        this.timeline = gsap.timeline()

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: "top top",
            end: () => this.element.offsetHeight * 10, // '+=8000' 
            pin: true,
            pinSpacing: "margin",
            scrub: 1
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
            duration: 2,
            y: - (window.innerHeight)
        })

        this.timeline.fromTo(this.timelineSection, {
            filter: 'brightness(0)'
        }, {
            filter: 'brightness(1)'
        }, '<')

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

    normalize () {
        //console.log(this.element.offsetHeight * 10 + 'px!important')
        this.pinSpacer.style.height = this.element.offsetHeight * 10 + 'px!important'
    }

}