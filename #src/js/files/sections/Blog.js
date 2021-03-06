class BlogSection {
    constructor (element) {
        this.element = element
        this.elementWrapper = document.querySelector('.blog-section__wrapper')
        this.scrollContainerBG = this.element.querySelector('.blog-section__bg')

        this.images = this.element.querySelectorAll('.blog-item img')
        this.descriptions = [...this.element.querySelectorAll('.media-column p'), ...this.element.querySelectorAll('.blog-item_bg .content p')]
        this.dots = this.element.querySelectorAll('.dots')

        this.header = document.querySelector('.header')

        this.footer = document.querySelector('.footer')
        this.footerLinks = this.footer.querySelectorAll('.social-link')

        this.split = new Split()
        this.animation = new Animation()

        this.timelineSizes = {
            endDesktop: 70000,
            endMobile: 20000
        }

        this.init()
    }

    init () {

        this.scroll()
        this.onScreen()
        //this.descrAnimation()
        this.footerLinksSplit()
    }

    scroll () {
        this.timeline = gsap.timeline({ defaults: {ease: 'none'} })

        ScrollTrigger.create({
            trigger: this.element,
            animation: this.timeline,
            start: self => self.previous().end,
            end: () => `${this.timelineEnd || this.timelineSizes.endDesktop}px 100%`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,

            onEnter: () => {

                this.headerClassToggle()
            },
            onEnterBack: () => {
                this.footerClassToggle()
                this.elementClassToggle()

                this.headerClassToggle()
            },
            onLeave: () => {
                this.footerClassToggle()
                this.elementClassToggle()

                this.headerClassToggle()
            },
            onLeaveBack: () => {

                this.headerClassToggle()
            }
        });

        this.scrollerSecion = this.timeline.to(this.element, {
            y: () => - (this.element.scrollHeight),
            onStart: () => this.element.classList.add('wc-transform'),
            onComplete: () => this.element.classList.remove('wc-transform')
        })

        // this.timeline.fromTo(this.scrollContainerBG, {
        //     yPercent: 0,
        //     ease: Power3.easeIn,
        // }, {
        //     yPercent: 10,
        // }, '<')

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

    onScreen () {
        this.observerImages = new Observer(this.images, this.imgAnimationIn, this.imgAnimationOut, { threshold: 0.75 })
        //this.observerDots = new Observer(this.dots, this.imgAnimationIn, this.imgAnimationOut, { threshold: 0.5 })
    }

    imgAnimationIn (el) {
        if(!el.classList.contains('is-view')) {
            el.classList.add('is-view')
        }
    }

    imgAnimationOut (el) {
        el.classList.remove('is-view')
    }

    descrAnimation() {

        this.descriptionsSplitChild = this.split.splitText(this.descriptions, {
            type: "lines,words",
            linesClass: "split-child"
        })
        
        this.descriptionsSplitParent = this.split.splitText(this.descriptions, {
            type: "lines,words",
            linesClass: "split-parent"
        })

        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animation.animationTextIn(entry.target.querySelectorAll('.split-child'))
                } else {
                    this.animation.animationTextOut(entry.target.querySelectorAll('.split-child'))
                }
            })
        }, { threshold: 1 })

        this.descriptions.forEach(el => {
            this.observer.observe(el)
        })

    }

    footerLinksSplit() {
        this.footerLinksSplitChild = this.split.splitText(this.footerLinks, {
            type: "lines",
            linesClass: "split-child"
        })
        this.footerLinksSplitParent = this.split.splitText(this.footerLinks, {
            type: "lines",
            linesClass: "split-parent"
        })
    }

    headerClassToggle () {
        if(!this.header.classList.contains('dark-theme')) {
            this.header.classList.add('dark-theme')
        } else {
            this.header.classList.remove('dark-theme')
        }
    }

    footerClassToggle () {
        if(!this.footer.classList.contains('is-view')) {
            this.footer.classList.add('is-view')
        } else {
            this.footer.classList.remove('is-view')
        }
    }

    elementClassToggle () {
        if(!this.element.classList.contains('leave')) {
            this.element.classList.add('leave')
        } else {
            this.element.classList.remove('leave')
        }
    }

    onResize () {
        if(window.innerWidth <= 768) {
            this.timelineEnd = this.timelineSizes.endMobile
        } else {
            this.timelineEnd = this.timelineSizes.endDesktop
        }

        // this.descriptionsSplitParent.revert()
        // this.descriptionsSplitChild.revert()

        // this.footerLinksSplitChild.revert()
        // this.footerLinksSplitParent.revert()

        // this.descrAnimation()
    }
    
}