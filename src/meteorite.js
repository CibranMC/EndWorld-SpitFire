class Meteorite {
    constructor(ctx, ctxWidth, ctxHeight, velX = 10, posX) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 125
        this.height = 87

        this.posX = posX ? posX : ctxWidth
        this.posY = Math.random() * (ctxHeight - (this.height + 150))

        this.velX = velX

        this.meteoriteImg = new Image()
        this.meteoriteImg.src = "./assets/meteorPixel.png"
    }

    draw() {
        this.ctx.drawImage(this.meteoriteImg, this.posX, this.posY, this.width, this.height)
        this.move()
    }

    move() {
        this.posX -= this.velX
    }
}