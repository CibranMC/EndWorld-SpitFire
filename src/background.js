class Background {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 1920
        this.height = 937
        this.posX = 0
        this.posY = 0
        this.velX = 5

        this.backgroundImg = new Image()
        this.backgroundImg.src = "./assets/peakpx.jpg"

        this.x = 0
        this.x2 = ctxWidth
    }

    draw() {
        this.ctx.drawImage(this.backgroundImg, this.x, this.posY, this.width, this.height)
        this.ctx.drawImage(this.backgroundImg, this.x2, this.posY, this.width, this.height)

        if (this.x < - this.ctxWidth) this.x = this.ctxWidth + this.x2 - this.velX
        else this.x -= this.velX

        if (this.x2 < - this.ctxWidth) this.x2 = this.ctxWidth + this.x - this.velX
        else this.x2 -= this.velX

        // this.move()
    }

    move() {
        this.posX -= this.velX
    }
}