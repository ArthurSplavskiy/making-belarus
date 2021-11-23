class App {
    constructor () {
        this.addEventListeners()
        this.onResize()
    }

    init () {
        /*
          * Components
        */
        this.header = new Header()
        this.animation = new Animation()
        this.cursor = new Cursor()

        /*
          * Sections
        */
        this.heroSection = new HeroSection()
        this.timelineSection = new TimelineSection()
        this.historySection = new HistorySection()
        this.incidentSection = new IncidentSection()

        /*
          * Functions
        */
       this.asyncLoad()
    }

    pageLoad () {

        /*
          * Preloader cover
        */
        this.preloader = new Preloader()
        const preloaderCoverTimeline = gsap.timeline({ defaults: {delay: 1} })
        preloaderCoverTimeline.fromTo(this.preloader.preloaderCover, { autoAlpha: 1 }, { autoAlpha: 0 })
        preloaderCoverTimeline.call(_ => this.preloader.preloaderCover.remove())

        this.blogSection = new BlogSection()
        this.preloader.init()
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

    asyncLoad () {
        const images = document.querySelectorAll('[data-src]')

        this.preloadImages = Array.from(images).map(image => {
            return new AsyncLoad(image)
        })
    }
}

new App()