class App {
    constructor () {
        this.addEventListeners()
        this.onResize()
    }

    init () {
        this.header = new Header()
        this.preloader = new Preloader()
        this.animation = new Animation()
        this.cursor = new Cursor()

        // SECTIONS
        this.heroSection = new HeroSection()
    }

    pageLoad () {
        
        // preloader cover
        const preloaderCoverTimeline = gsap.timeline()
        preloaderCoverTimeline.fromTo(this.preloader.preloaderCover, { autoAlpha: 1 }, { autoAlpha: 0 })
        preloaderCoverTimeline.call(_ => this.preloader.preloaderCover.remove())
    }

    contentDomLoad () {
        this.init()

        this.removeEventListeners()
    }

    onResize () {
    }

    addEventListeners () {
        window.addEventListener('load', this.pageLoad.bind(this))
        window.addEventListener('resize', this.onResize.bind(this))
        document.addEventListener('DOMContentLoaded', this.contentDomLoad.bind(this))
    }

    removeEventListeners () {
        window.removeEventListener('load', this.pageLoad.bind(this))
        document.removeEventListener('DOMContentLoaded', this.contentDomLoad.bind(this))
    }
}

new App()