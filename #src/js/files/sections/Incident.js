class IncidentSection {
    constructor () {
        this.element = document.querySelector('.incident-section')
        this.scrollContainer = this.element.querySelector('.scroll-container')
        this.scrollContainerBG = this.element.querySelector('.incident-section__bg')

        this.cards = this.element.querySelectorAll('.incident-item')
        this.cardLine = this.element.querySelectorAll('.incident-item .line')
        this.cardDescr = this.element.querySelectorAll('.incident-item__descr')
        this.cardsHover = this.element.querySelectorAll('.incident-item__hover')

        this.split = new Split()

        this.init()
    }

    init () {
        //console.log(this.scrollContainerBG)

        this.scroll()
        this.onScreen()
        this.splitDescr()
        //this.hoverInitial()
        //this.addEventListeners()
    }

    scroll () {

        this.timeline = gsap.timeline({ defaults: {ease: 'none' } })

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: self => self.previous().end,
            end: '55000px 100%',
            pin: true, 
            scrub: 1
        });

        if(this.scrollContainer.scrollWidth > window.innerWidth) {
            this.timeline.fromTo(this.scrollContainer, {
                x: 0,
            }, {
                x: - (this.scrollContainer.scrollWidth - window.innerWidth),
            })
        }

        this.timeline.fromTo(this.scrollContainerBG, {
            xPercent: 0,
            ease: Power3.easeIn,
        }, {
            xPercent: -20,
        }, '<')

        this.timeline.to(this.element, {
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


        // timeline.fromTo(historySection, {
        //     duration: 0.05,
        //     filter: 'brightness(0)'
        // }, {
        //     duration: 0.05,
        //     filter: 'brightness(1)'
        // }, '<')

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

}