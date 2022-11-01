class Boss {
    constructor(ctx, ctxWidth, ctxHeight, lives) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight
        this.lives = lives

        this.width = 279
        this.height = 372

        this.posX = ctxWidth - (this.width + 100)
        this.posY = ctxHeight / 2 - this.height / 2

        this.bossImg = new Image()
        this.bossImg.src = "./assets/Alien.png"

    }

    draw() {
        this.ctx.drawImage(this.bossImg, this.posX, this.posY, this.width, this.height)
    }
}