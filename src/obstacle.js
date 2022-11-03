class Obstacle {
    constructor(ctx, ctxWidth, ctxHeight, velX = 14, posX) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 127
        this.height = 418

        this.posX = posX ? posX : ctxWidth
        this.posY = Math.random() * (ctxHeight - (this.height + 50))

        this.velX = velX

        this.obstacleImg = new Image()
        this.obstacleImg.src = "./assets/building-destroyed.png"
    }

    randomHeight() {
        if (this.height < 150) {
            this.height = 150
        }
    }

    draw() {
        this.ctx.drawImage(this.obstacleImg, this.posX, this.posY, this.width, this.height)
        this.randomHeight()
        this.move()
    }

    move() {
        this.posX -= this.velX
    }
}