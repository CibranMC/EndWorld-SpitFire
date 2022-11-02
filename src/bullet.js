class Bullet {
    constructor(ctx, planePosX, planePosY, planeWidth, planeHeight) {
        this.ctx = ctx
        this.posX = planePosX + planeWidth - 60
        this.posY = planePosY + 14 + planeHeight / 2

        this.width = 15
        this.height = 8

        this.velX = 15

        this.bulletImg = new Image()
        this.bulletImg.src = "./assets/bala-spitfire.png"
    }

    draw() {
        this.ctx.drawImage(this.bulletImg, this.posX, this.posY, this.width, this.height)
        this.move()
    }

    move() {
        this.posX += this.velX
    }
} 