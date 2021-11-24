class Preloader {
    constructor () {
        this.element = document.querySelector('.preloader')
        this.elementBg = this.element.querySelector('.preloader__bg')
        this.preloaderCover = document.querySelector('.preloader-cover')
        this.closeSlide = this.element.querySelector('.preloader__slide:last-child')
        this.closeTitle = this.closeSlide.querySelector('.preloader__title')
        this.closeButton = this.closeSlide.querySelector('.preloader__button')

        this.heroTitles = document.querySelectorAll('.hero-composition__title')

        this.split = new Split()
        this.animation = new Animation()
    }

    init () {
        
        this.heroTitlesAnimation()
        this.close()
        this.slider()
        this.timer()
    }

    slider () {
        this.sliderEl = this.element.querySelector('.preloader__slider')
        const slides = this.sliderEl.querySelectorAll('.preloader__slide')
        const delay = 7000
        const steps = slides.length
        let round = 0

        this.lastSlideTimeline = gsap.timeline({ defaults: { stagger: 0.1, duration: 0.6 } })

        gsap.set(this.closeTitleLinesChild.lines, {
            y: '100%',
            opacity: 0
        })
        this.lastSlideTimeline.to(this.closeTitleLinesChild.lines, {
            y: '10%',
            opacity: 1
        })

        // gsap.utils.toArray(this.closeTitleLines.lines).forEach((el, index) => {
            
        // })
        
        this.lastSlideTimeline.pause()

        slides[0].classList.add('_active')

        const slideChange = () => {
            round++

            slides.forEach((slide, index) => {
                if(index < 2) {
                    slide.classList.remove('_active')
                }
            })
            const slide = slides[round]

            if(slide) {
                slide.classList.add('_active')
            }

            if(round === steps) {
                clearInterval(interval)
            }
            
            if(round === 1) {
                this.animation.animationTextIn(this.splitDateText.chars)
            }
            if(round === 2) {
                this.lastSlideTimeline.play()
            }
        }

        let interval = setInterval(slideChange, delay)
    }

    timer () {
        const timer = this.element.querySelector('.timer')
        const timerYearField = timer.querySelector('[data-independence-year] span')
        const timerMonthField = timer.querySelector('[data-independence-month] span')
        const timerDayField = timer.querySelector('[data-independence-day] span')

        const nowDate = new Date()
        const nowDateYear = nowDate.getFullYear()
        const nowDateMonth = nowDate.getMonth()
        const nowDateDay = nowDate.getUTCDate()

        const independenceYear = 1991
        const independenceMonth = 7
        const independenceDay = 25

        let outYear
        let outDay
        let outMonth

        if(nowDateMonth < independenceMonth) {
            outYear = Math.abs((nowDateYear - independenceYear) - 1)
        } else {
            outYear = Math.abs(nowDateYear - independenceYear)
        }
        if(nowDateDay < independenceDay) {
            outMonth = Math.abs((nowDateMonth - independenceMonth) - 1)
            outDay = Math.abs(nowDateDay + 6)
        } else {
            outDay = Math.abs(nowDateDay - independenceDay)
        }

        const setZero = (num) => {
            return num < 10 ? `0${num}` : num
        }

        timerYearField.innerHTML = setZero(outYear)
        timerMonthField.innerHTML = setZero(outMonth)
        timerDayField.innerHTML = setZero(outDay)

        const splitArray = [timerYearField, timerMonthField, timerDayField]
        this.splitDateText = this.split.splitText(splitArray)
    }

    close () {
        this.closeTitleLines = this.split.splitText(this.closeTitle, { type: "lines,words" })
        this.closeTitleLinesChild = this.split.splitText(this.closeTitleLines.lines, {
            linesClass: "split-parent"
        })

        gsap.set(this.element, { transformOrigin: '100% 100%' })

        this.timelineClose = gsap.timeline()

        const clickHandler = () => {
            this.lastSlideTimeline.reverse()

            this.timelineClose.to(this.element, {
                yPercent: -100
            }, '+=1')

            this.timelineClose.call(_ => {
                this.element.remove()

                body_lock_remove(0)

                gsap.to(this.heroTitlesLine.lines, {
                    duration: 1,
                    ease: Power1.easeOut,
                    stagger: 0.09,
                    y: '0%',
                    opacity: 1
                })
            })
        }

        this.closeButton.onclick = clickHandler
    }

    heroTitlesAnimation () {
        this.heroTitlesLine = this.split.splitText(this.heroTitles, {
            type: "lines,words,chars",
            linesClass: "split-child"
        })
        this.heroTitlesParentLine = this.split.splitText(this.heroTitles, {
            linesClass: "split-parent"
        })

        gsap.set(this.heroTitlesLine.lines, {
            y: '100%',
            opacity: 0
        })
    }

    onResize () {
        this.heroTitlesLine.revert()
        this.heroTitlesParentLine.revert()
        this.closeTitleLines.revert()
        this.splitDateText.revert()

        this.heroTitlesAnimation()
    }

}