class Header {
    constructor () {
        this.element = document.querySelector('.header')
        this.pageMenu = document.querySelector('.page-menu')

        // last
        this.init()
    }

    init () {
        this.menu()
    }

    menuOpen(event) {
        const { target } = event
        
        if(target.closest('.burger') || target.classList.contains('burger')) {
            this.burger.classList.toggle('_active')
        }

        if(this.burger.classList.contains('_active')) { // menu open
            this.menuTimeline.to(this.pageMenu, {
                y: '0'
            })
        } else { // menu close
            this.menuTimeline.to(this.pageMenu, {
                y: '-100%'
            })
        }
    }

    menu () {
        this.burger = this.element.querySelector('.burger')

        this.menuTimeline = gsap.timeline()
        gsap.set(this.pageMenu, { y: '-100%' })

        this.burger.onclick = event => this.menuOpen(event)
    }
}