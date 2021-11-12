class Observer {
    constructor (element, animationIn, animationOut) {
        this.element = element
        this.animationIn = animationIn
        this.animationOut = animationOut

        this.createObserver()
    }

    createObserver () {
        this.options = {
            threshold: 0.9
        }

        this.observer = new window.IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.animationIn(entry.target)
                } else {
                    this.animationOut(entry.target)
                }
            })
        }, this.options)

        if(this.element instanceof NodeList) {
            this.element.forEach(el => {
                this.observer.observe(el)
            })
        } else {
            this.observer.observe(this.element)
        }
        
    }
    
}