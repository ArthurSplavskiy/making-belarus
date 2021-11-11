class TimelineSection {
    constructor () {
        this.element = document.querySelector('.timeline-section')
        this.elementWrapper = this.element.querySelector('.timeline-section__wrapper')
        this.elementScroll = this.element.querySelector('.scroll-container')

        this.init()
    }

    init () {
        this.scroll()
    }

    scroll () {
        this.scrollTimeline = gsap.timeline({ defaults: {ease: 'none'} })

        ScrollTrigger.create({
            trigger: this.elementWrapper,
            animation: this.scrollTimeline,

            start: "+=8000",
            end: '20000px 100%',

            markers: true,
            scrub: 1,
        });
        
        this.scrollTimeline.fromTo(this.elementScroll, {
            x: 0,
        }, {
            x: - (this.elementScroll.scrollWidth - window.innerWidth),
        })
        
        // this.scrollTimeline.call(_ => {
        //     console.log('end')
        // })

    }
}