class BlogSection {
    constructor () {
        this.element = document.querySelector('.blog-section')

        this.init()
    }

    init () {
        console.log('init')

        this.scroll()
    }

    scroll () {
        this.timeline = gsap.timeline({ defaults: {ease: 'none'} })
        const rootElement = document.querySelector('.timeline-section')

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: self => self.previous().end,
            end: '60000px 100%',
            pin: true, // add
            scrub: 1,
        });

        this.timeline.to(this.element, {
            y: - (this.element.scrollHeight - window.innerHeight)
        })
    }
}