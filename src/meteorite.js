class Meteorite {
    constructor(ctx, ctxWidth, ctxHeight, velX = 10, posX) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 100
        this.height = 100

        this.posX = posX ? posX : ctxWidth
        this.posY = Math.random() * (ctxHeight - (this.height + 50))

        this.velX = velX

        this.planeImg = new Image()
        this.planeImg.src = "./assets/meteorito.png"
    }

    draw() {
        this.ctx.drawImage(this.planeImg, this.posX, this.posY, this.width, this.height)
        this.move()
    }

    move() {
        this.posX -= this.velX
    }
}