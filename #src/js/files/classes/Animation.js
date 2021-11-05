class Animation {
    constructor () {
        this.animationTextIn = this.animationTextIn
        this.animationTextOut = this.animationTextOut
    }

    animationTextIn (text) {

        gsap.fromTo(text, {
            y: '100%'
        }, {
            duration: 1,
            ease: Power1.easeOut,
            stagger: 0.09,
            y: '0%'
        })
    }

    animationTextOut (text) {

        gsap.fromTo(text, {
            y: '0%'
        }, {
            duration: 1,
            ease: Power1.easeOut,
            stagger: 0.09,
            y: '100%'
        })
    }

    fadeIn (el) {
        gsap.fromTo(el, {
            autoAlpha: 0
        }, {
            autoAlpha: 1
        })
    }

    fadeOut (el) {
        gsap.fromTo(el, {
            autoAlpha: 1
        }, {
            autoAlpha: 0
        })
    }

}