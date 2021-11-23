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

        this.scroll()
    }

    scroll() {
        this.timeline = gsap.timeline({ defaults: {ease: 'none' } })

        //console.log(50000 - this.element.offsetHeight + "px 100%")

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,

            start: self => self.previous().end, //"+=29500", // 26100 
            end: '50000px 100%',
            pin: true,
            pinSpacing: "margin",

            scrub: 1,
            //onUpdate: self => console.log("progress:", self.progress)
        });

        gsap.set(this.toLeftLine, {
            xPercent: 10
        })

        gsap.set(this.toRightLine, {
            xPercent: -10
        })

        gsap.set(this.moveBg, {
            scale: 0.5,
            z: '1px'
        })

        gsap.set(this.content, {
            yPercent: -200
        })

        gsap.set(this.textItems, {
            display: 'none',
            autoAlpha: 0,
        })

        this.timeline.to(this.toLeftLine, {
            duration: 7,
            xPercent: -100
        })

        this.timeline.to(this.toRightLine, {
            duration: 8,
            xPercent: 100
        }, '<')

        this.timeline.to(this.toFillStar, {
            duration: 5,
            rotate: '100deg'
        }, '<')

        this.timeline.to(this.toStrokeStar, {
            duration: 3,
            rotate: '-100deg'
        }, '<')

        this.timeline.to(this.moveBg, {
            duration: 2,
            yPercent: -100
        }, '-=7')

        this.timeline.to(this.moveBg, {
            duration: 5,
            scale: 1
        }, '-=5')

        this.timeline.fromTo(this.moveBg, {
            filter: 'brightness(1)'
        }, {
            filter: 'brightness(0.5)'
        })

        gsap.utils.toArray(this.textItems).forEach(item => {
            this.timeline.to(item, {
                display: 'block',
                duration: 1,
                autoAlpha: 1
            })
            this.timeline.to(item, {
                display: 'none',
                duration: 1,
                autoAlpha: 0
            })
        })

        this.timeline.to(this.element, {
            duration: 3,
            yPercent: -100
        })

        /*
            z-index
        */
        this.pinSpacer = this.element.parentElement
        let pinSpacerZindex = this.pinSpacer.style.zIndex
        this.timeline.to(this.pinSpacer, {
            duration: 0,
            zIndex: pinSpacerZindex
        })
        this.timeline.call(_ => {
            this.pinSpacer.style.zIndex = -1;
        })
        //

    }
}