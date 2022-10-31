class Obstacle {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 50
        this.height = Math.random() * 300

        this.posX = ctxWidth
        this.posY = Math.random() * (ctxHeight - (this.height + 50))

        this.velX = 14
    }

    randomHeight() {
        if (this.height < 150) {
            this.height = 150
        }
    }

    draw() {
        this.ctx.fillStyle = "red"
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
        this.randomHeight()
        this.move()
    }

    move() {
        this.posX -= this.velX
    }
}