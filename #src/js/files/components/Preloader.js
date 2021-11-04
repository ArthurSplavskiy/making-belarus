class Preloader {
    constructor() {
        this.element = document.querySelector('.preloader')
        this.init()
    }

    init() {
        
        this.slider()
        this.timer()
        this.splitText()
        this.close()
    }

    slider() {
        const slider = this.element.querySelector('.preloader__slider')
        const slides = slider.querySelectorAll('.preloader__slide')
        const delay = 4000
        const steps = slides.length
        let round = 0

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
                this.animationIn(this.splitDateText.chars)
            }
            if(round === 2) {
                this.animationIn(this.lines.lines)
            }
        }

        let interval = setInterval(slideChange, delay)
    }

    timer() {
        // 30 03 21
        const timer = this.element.querySelector('.timer')
        const timerYearField = timer.querySelector('[data-independence-year] span')
        const timerMonthField = timer.querySelector('[data-independence-month] span')
        const timerDayField = timer.querySelector('[data-independence-day] span')

        const nowDate = new Date()
        const nowDateYear = nowDate.getFullYear()
        const nowDateMonth = nowDate.getMonth()
        const nowDateDay = nowDate.getDay()

        const independenceYear = 1991
        const independenceMonth = 7
        const independenceDay = 25

        const outYear = Math.abs(nowDateYear - independenceYear)
        const outMonth = Math.abs(nowDateMonth - independenceMonth)
        const outDay = Math.abs(nowDateDay - independenceDay)

        const setZero = (num) => {
            return num < 10 ? `0${num}` : num
        }

        timerYearField.innerHTML = setZero(outYear)
        timerMonthField.innerHTML = setZero(outMonth)
        timerDayField.innerHTML = setZero(outDay)

        const splitArray = [timerYearField, timerMonthField, timerDayField]
        this.splitDateText = this.splitText(splitArray)
    }

    close() {
        const closeSlide = this.element.querySelector('.preloader__slide:last-child')
        const closeTitle = closeSlide.querySelector('.preloader__title')
        const closeButton = closeSlide.querySelector('.preloader__button')

        this.lines = this.splitTextLines(closeTitle)

        const del = this.splitTextLines(closeTitle)

        const clickHandler = () => {
            gsap.to(this.element, {
                delay: 0.3,
                duration: 1,
                y: '100%',
                autoAlpha: 0,
                //onComplete: this.element.remove()
            })
            this.animationOut(this.lines.lines)
        }

        closeButton.onclick = clickHandler
    }

    splitText(text) {
        return new SplitText(text, { type: "words,chars" })
    }

    splitTextLines(text) {
        return new SplitText(text, { type: "lines" })
    }

    animationIn(text) {
        gsap.fromTo(text, {
            y: '100%'
        }, {
            duration: 1,
            ease: Power1.easeOut,
            stagger: 0.09,
            y: '0%'
        })
    }

    animationOut(text) {
        gsap.fromTo(text, {
            y: '0%'
        }, {
            duration: 1,
            ease: Power1.easeOut,
            stagger: 0.09,
            y: '100%'
        })
    }
}