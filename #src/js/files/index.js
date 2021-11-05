class App {
    constructor () {
        this.init()
        this.addEventListeners()
    }

    init () {
        this.header = new Header()
        this.preloader = new Preloader()
        this.animation = new Animation()
    }

    pageLoad () {
        
        // preloader cover
        const preloaderCoverTimeline = gsap.timeline()
        preloaderCoverTimeline.fromTo(this.preloader.preloaderCover, { autoAlpha: 1 }, { autoAlpha: 0 })
        preloaderCoverTimeline.call(_ => this.preloader.preloaderCover.remove())

        this.removeEventListeners()
    }

    addEventListeners () {
        window.addEventListener('load', this.pageLoad.bind(this))
    }

    removeEventListeners () {
        window.removeEventListener('load', this.pageLoad.bind(this))
    }
}

new App()