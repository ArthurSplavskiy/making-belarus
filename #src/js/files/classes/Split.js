class Split {
    constructor () {
        this.splitText = this.splitText
    }

    splitText (text, type = 'words,chars') {
        return new SplitText(text, { type: type })
    }
}