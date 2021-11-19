class TimelineSection {
    constructor () {
        this.element = document.querySelector('.timeline-section')
        this.elementWrapper = this.element.querySelector('.timeline-section__wrapper')
        this.elementScroll = this.element.querySelector('.scroll-container')
        this.elementScrollBg = this.element.querySelector('.scroll-container__bg')
        this.images = this.element.querySelectorAll('.parallax-item__img')
        this.text = this.element.querySelectorAll('.parallax-item_text p')
        
        this.split = new Split()

        this.init()
    }

    init () {
        this.scroll()
        this.Animation()
        //this.textSplit()
    }

    scroll () {

        ScrollTrigger.matchMedia({

            "(max-width: 768px)": function() {
                const timeline = gsap.timeline({ defaults: {ease: 'none'} })
                const rootElement = document.querySelector('.timeline-section')

                ScrollTrigger.create({
                    trigger: rootElement,
                    animation: timeline,
                    start: self => self.previous().end, // "+=8000"
                    end: '30000px 100%',
                    pin: true, // add
                    scrub: 1,
                });

                timeline.to(rootElement, {
                    duration: 0.1,
                    y: - (rootElement.scrollHeight + 100)
                })
            },

            "(min-width: 769px)": function() {
                const timeline = gsap.timeline({ defaults: {ease: 'none'} })
                const rootElement = document.querySelector('.timeline-section')
                const scrollWrapper = document.querySelector('.timeline-section__wrapper')
                const scrollContainer = document.querySelector('.scroll-container')
                const scrollContainerBG = document.querySelector('.scroll-container__bg')

                const historySection = document.querySelector('.history-section')

                //console.log(30000 - rootElement.offsetHeight + "px 100%")

                ScrollTrigger.create({
                    trigger: rootElement,
                    animation: timeline,
                    start: self => self.previous().end,//"+=8000",
                    end: '30000px 100%',
                    pin: true, // add
                    pinSpacing: "margin",
                    scrub: 1
                });
                
                timeline.fromTo(scrollContainer, {
                    x: 0,
                }, {
                    x: - (scrollContainer.scrollWidth - window.innerWidth),
                })
        
                timeline.fromTo(scrollContainerBG, {
                    xPercent: 0,
                    ease: Power3.easeIn,
                }, {
                    xPercent: 20,
                }, '<')

                timeline.to(rootElement, {
                    duration: 0.1,
                    yPercent: -100
                })

                timeline.fromTo(historySection, {
                    duration: 0.05,
                    filter: 'brightness(0)'
                }, {
                    duration: 0.05,
                    filter: 'brightness(1)'
                }, '<')

            }

        })
       
        
        // tim.call(_ => {
        //     console.log('end')
        // })

    }

    Animation () {
        this.observer = new Observer(this.images, this.imageAnimationIn, this.imageAnimationOut)
        this.observerText = new Observer(this.text, this.textAnimationIn, this.textAnimationOut)
    }

    imageAnimationIn (el) {
        if(!el.classList.contains('_reveal')) {
            el.classList.add('_reveal')
        }
    }

    imageAnimationOut (el) {
        el.classList.remove('_reveal')
    }

    textSplit () {
    
        const animationLines = this.split.splitText(this.text, {
            type: "lines",
            linesClass: "split-child"
        });
        this.split.splitText(this.text, {
            linesClass: "split-parent"
        });

        // stagger
        this.text.forEach((textBox, index) => {
            const list = textBox.querySelectorAll('.split-parent')

            list.forEach((el, idx) => {
                const listChilds = el.querySelectorAll('.split-child')

                listChilds.forEach(line => {
                    if(idx > 0) {
                        let animationTime = idx

                        if(animationTime < 10) {
                            line.style.transitionDelay = `0.${animationTime}s`
                        } else {
                            line.style.transitionDelay = `${animationTime}s`
                        }
                        //console.log(animationTime)
                    }
                })

            })
        })

    }

    textAnimationIn (el) {
        if(!el.classList.contains('is-view')) {
            el.classList.add('is-view')
        }
    }

    textAnimationOut (el) {
        el.classList.remove('is-view')
    }

}