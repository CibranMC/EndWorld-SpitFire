class Bullet {
    constructor(ctx, planePosX, planePosY, planeWidth, planeHeight) {
        this.ctx = ctx
        this.posX = planePosX + planeWidth - 70
        this.posY = planePosY + 14 + planeHeight / 2

        this.width = 50
        this.height = 50

        this.velX = 15

        this.bulletImg = new Image()
        this.bulletImg.src = "./assets/bulletPixel.png"
    }

    draw() {
        this.ctx.drawImage(this.bulletImg, this.posX, this.posY, this.width, this.height)
        this.move()
    }

    move() {
        this.posX += this.velX
    }
} 