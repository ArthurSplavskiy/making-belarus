class Header {
    constructor () {
        this.element = document.querySelector('.header')
        this.pageMenu = document.querySelector('.page-menu')

        this.cards = this.pageMenu.querySelectorAll('.page-menu__card')
        this.cardsTitle = this.pageMenu.querySelectorAll('.page-menu__card-title')
        this.slider = this.pageMenu.querySelector('.page-menu__slider')

        this.split = new Split()

        // last
        this.init()
    }

    init () {

        this.splitCardsTitle()
        this.menu()
        this.menuSlider()
    }

    menuOpen(event) {
        const { target } = event
        
        if(target.closest('.burger') || target.classList.contains('burger')) {
            this.burger.classList.toggle('_active')
        }

        if(this.burger.classList.contains('_active')) { // menu open
            
            this.menuTimeline.play()
            
            this.menuTimeline.call(_ => {
                this.element.classList.add('menu-open')
            })

            this.addEventListeners()
        } else { // menu close

            this.closeMenu()
        }
    }

    menu () {
        this.burger = this.element.querySelector('.burger')

        this.menuTimeline = gsap.timeline()

        this.menuTimeline.to(this.pageMenu, {
            y: '0'
        })
        this.menuTimeline.to(this.slider, {
            duration: 0.5,
            autoAlpha: 1
        })
        this.menuTimeline.fromTo(this.titleLines.lines, {
            y: '100%',
            opacity: 0
        }, {
            duration: 1,
            ease: Power1.easeOut,
            stagger: 0.09,
            y: '0%',
            opacity: 1
        }, '-=0.5')
        this.menuTimeline.pause()

        gsap.set(this.pageMenu, { y: '-100%' })
        gsap.set(this.slider, { autoAlpha: 0 })

        this.burger.onclick = event => this.menuOpen(event)
    }

    menuSlider () {
        this.menuSlider = this.element.querySelector('.swiper')

        const swiper = new Swiper('.swiper', {
            init: true,
            slidesPerView: 4,
            spaceBetween: 40,
            grabCursor: true,

            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev'
            },

            scrollbar: {
              el: '.swiper-scrollbar',
              draggable: true
            },

            breakpoints: {
                320: {
                  slidesPerView: 3,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 4,
                  spaceBetween: 40
                }
            }
        })

        swiper.on('resize', () => {
            if(window.innerWidth <= 520) {
                swiper.disable()
            } else {
                swiper.enable()
            }
        })
        
    }

    splitCardsTitle () {
        this.titleLines = this.split.splitText(this.cardsTitle, {
            type: "lines",
            linesClass: "split-child"
        })
        this.split.splitText(this.cardsTitle, {
            type: "lines",
            linesClass: "split-parent"
        })
    }

    anchorsTransition (e) {
        //console.log(e.target)
        //gsap.to(window, {duration: 2, scrollTo:"#someID"});
        gsap.to(window, { duration: 2, scrollTo: {y: 60000} });

        this.closeMenu()
    }

    addEventListeners () {
        this.cards.forEach(card => {
            card.addEventListener('click', this.anchorsTransition.bind(this))
        })
    }

    removeEventListeners () {
        this.cards.forEach(card => {
            card.removeEventListener('click', this.anchorsTransition.bind(this))
        })
    }

    closeMenu () {
        this.burger.classList.remove('_active')
        this.menuTimeline.reverse()
        this.element.classList.remove('menu-open')
        this.removeEventListeners()
    }

}