class HistorySection {
    constructor (element) {
        this.element = element

        this.toLeftLine = this.element.querySelectorAll('.line-container:nth-child(odd) .line')
        this.toRightLine = this.element.querySelectorAll('.line-container:nth-child(even) .line')

        // this.toStrokeStar = this.element.querySelectorAll('.line .stroke img')
        // this.toFillStar = this.element.querySelectorAll('.line .fill img')

        this.moveBg = this.element.querySelector('.move-bg')

        this.content = this.element.querySelector('.content')
        this.textItems = this.content.querySelectorAll('.text-item')

        this.timelineSizes = {
            endDesktop: 50000,
            endMobile: 12000
        }

        this.init()
    }

    init () {

        this.scroll()
    }

    scroll() {
        this.timeline = gsap.timeline({ defaults: {ease: 'none' } })

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: self => self.previous().end, 
            end: () => `${this.timelineEnd || this.timelineSizes.endDesktop}px 100%`,
            pin: true,
            pinSpacing: "margin",
            scrub: 1,
            invalidateOnRefresh: true
        });

        let maxLeftWidth = Array.from(this.toLeftLine).map(line => line.clientWidth).reduce((p, n) => p > n ? p : n)
        let maxRightWidth = Array.from(this.toRightLine).map(line => line.clientWidth).reduce((p, n) => p > n ? p : n)

        const residualOffsetLeftLine = Math.ceil((maxLeftWidth / 100) * 10)
        const residualOffsetRightLine = Math.ceil((maxRightWidth / 100) * 10)

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
            yPercent: -200,
            z: '1px'
        })

        gsap.set(this.textItems, {
            display: 'none',
            opacity: 0,
        })

        this.timeline.to(this.toLeftLine, {
            duration: 2,
            x: () => - (window.innerWidth + residualOffsetLeftLine),
            opacity: 0.2,
            // onStart: () => this.toLeftLine.classList.add('wc-transform'),
            // onComplete: () => this.toLeftLine.classList.remove('wc-transform')
        })

        this.timeline.to(this.toRightLine, {
            duration: 2,
            x: () => (window.innerWidth + residualOffsetRightLine),
            opacity: 0.2,
            // onStart: () => this.toRightLine.classList.add('wc-transform'),
            // onComplete: () => this.toRightLine.classList.remove('wc-transform')
        }, '<')

        // this.timeline.to(this.toFillStar, {
        //     duration: 2,
        //     rotate: '100deg'
        // }, '<')

        // this.timeline.to(this.toStrokeStar, {
        //     duration: 2,
        //     rotate: '-100deg'
        // }, '<')

        this.timeline.to(this.moveBg, {
            duration: 1.5,
            yPercent: -100,
            onStart: () => this.moveBg.classList.add('wc-transform')
        }, '-=2')

        this.timeline.to(this.moveBg, {
            duration: 1.1,
            scale: 1,
            onComplete: () => this.moveBg.classList.remove('wc-transform')
        }, '-=0.5')

        this.timeline.fromTo(this.moveBg, {
            filter: 'brightness(1)'
        }, {
            filter: 'brightness(0.5)'
        })

        gsap.utils.toArray(this.textItems).forEach(item => {
            this.timeline.to(item, {
                display: 'block',
                opacity: 1,
                onStart: () => item.classList.add('wc-opacity'),
                onComplete: () => item.classList.remove('wc-opacity')
            })
            this.timeline.to(item, {
                display: 'none',
                opacity: 0,
                onStart: () => item.classList.add('wc-opacity'),
                onComplete: () => item.classList.remove('wc-opacity')
            })
        })

        this.timeline.to(this.element, {
            duration: 1.6,
            yPercent: -100,
            onStart: () => this.element.classList.add('wc-transform'),
            onComplete: () => this.element.classList.remove('wc-transform')
        })

        /*
          * z-index
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

    }

    onResize () {
        if(window.innerWidth <= 768) {
            this.timelineEnd = this.timelineSizes.endMobile
        } else {
            this.timelineEnd = this.timelineSizes.endDesktop
        }
    }
}