class HistorySection {
    constructor () {
        this.element = document.querySelector('.history-section')

        this.toLeftLine = this.element.querySelectorAll('.line-container:nth-child(odd) .line')
        this.toRightLine = this.element.querySelectorAll('.line-container:nth-child(even) .line')

        this.toStrokeStar = this.element.querySelectorAll('.line .stroke img')
        this.toFillStar = this.element.querySelectorAll('.line .fill img')

        this.moveBg = this.element.querySelector('.move-bg')

        this.content = this.element.querySelector('.content')
        this.textItems = this.content.querySelectorAll('.text-item')

        this.init()
    }

    init () {
        console.log(this.textItems)

        this.scroll()
    }

    scroll() {
        this.timeline = gsap.timeline({ defaults: {ease: 'none'} })

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,

            start: "+=30000",
            end: '40000px 100%',

            markers: true,
            scrub: 1,
        });

        gsap.set(this.toLeftLine, {
            xPercent: 5
        })

        gsap.set(this.toRightLine, {
            xPercent: -5
        })

        gsap.set(this.moveBg, {
            scale: 0.5
        })

        gsap.set(this.content, {
            yPercent: -200
        })

        gsap.set(this.textItems, {
            autoAlpha: 0,
        })

        this.timeline.to(this.toLeftLine, {
            duration: 3,
            xPercent: -100
        })

        this.timeline.to(this.toRightLine, {
            duration: 3,
            xPercent: 100
        }, '<')

        this.timeline.to(this.toFillStar, {
            duration: 3,
            rotate: '1000deg'
        }, '<')

        this.timeline.to(this.toStrokeStar, {
            duration: 3,
            rotate: '-1000deg'
        }, '<')

        this.timeline.to(this.moveBg, {
            duration: 2,
            yPercent: -100
        }, '-=2.8')

        this.timeline.to(this.moveBg, {
            duration: 2,
            scale: 1
        }, '<')

        this.timeline.to(this.textItems, {
            duration: 1,
            autoAlpha: 1
        })

        this.timeline.to(this.element, {
            yPercent: -100
        })

    }
}