class IncidentSection {
    constructor (element) {
        this.element = element
        this.scrollContainer = this.element.querySelector('.scroll-container')
        this.scrollContainerBG = this.element.querySelector('.incident-section__bg')

        this.cards = this.element.querySelectorAll('.incident-item')
        this.cardLine = this.element.querySelectorAll('.incident-item .line')
        this.cardDescr = this.element.querySelectorAll('.incident-item__descr')
        this.cardsHover = this.element.querySelectorAll('.incident-item__hover')

        this.scrollIndicator = document.querySelector('.scroll-indicator')

        this.split = new Split()

        this.timelineSizes = {
            endDesktop: 55000,
            endMobile: 16000
        }

        this.init()
    }

    init () {

        this.scroll()
        this.onScreen()
        this.splitDescr()
    }

    scroll () {

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

        if(this.scrollContainer.scrollWidth > window.innerWidth) {
            this.timeline.fromTo(this.scrollContainer, {
                x: 0,
            }, {
                x: () => - (this.scrollContainer.scrollWidth - window.innerWidth),
                onStart: () => this.scrollContainer.classList.add('wc-transform'),
                onComplete: () => this.scrollContainer.classList.remove('wc-transform')
            })
        }

        this.timeline.fromTo(this.scrollContainerBG, {
            xPercent: 0,
            ease: Power3.easeIn,
        }, {
            xPercent: -20,
            onStart: () => this.scrollContainerBG.classList.add('wc-transform'),
            onComplete: () => this.scrollContainerBG.classList.remove('wc-transform')
        }, '<')

        this.timeline.to(this.element, {
            duration: 0.1,
        })

        this.timeline.to(this.element, {
            yPercent: -100,
            onStart: () => this.element.classList.add('wc-transform'),
            onComplete: () => this.element.classList.remove('wc-transform')
        })

        this.timeline.to(this.scrollIndicator, {
            autoAlpha: 0
        }, '<')

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

    splitDescr() {
        this.splitDescription = this.split.splitText(this.cardDescr, { type: "lines" })
    }

    onScreen () {
        this.observerLine = new Observer(this.cardLine, this.cardAnimationIn, this.cardAnimationOut)
        this.observerDescr = new Observer(this.cardDescr, this.cardAnimationIn, this.cardAnimationOut)
    }

    cardAnimationIn (el) {
        if(!el.classList.contains('is-view')) {
            el.classList.add('is-view')
        }
    }

    cardAnimationOut (el) {
        el.classList.remove('is-view')
    }

    onResize () {
        if(window.innerWidth <= 768) {
            this.timelineEnd = this.timelineSizes.endMobile
        } else {
            this.timelineEnd = this.timelineSizes.endDesktop
        }

        //this.splitDescription.revert()
    }

}