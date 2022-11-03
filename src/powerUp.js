class PowerUp {
    constructor(ctx, ctxWidth, ctxHeight, name) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.name = name

        this.width = 65
        this.height = 65

        this.posX = ctxWidth
        this.posY = Math.random() * (ctxHeight - (this.height + 50))

        this.velX = 14

        this.powerUpImg = new Image()
        this.powerUpImg.src = this.name === 'ExtraLife' ? './assets/heart.png' : './assets/bulletsPowerUp.png'
    }

    draw() {
        this.ctx.drawImage(this.powerUpImg, this.posX, this.posY, this.width, this.height)
        this.move()
    }

    move() {
        this.posX -= this.velX
    }
}
