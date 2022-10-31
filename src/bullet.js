class Bullet {
    constructor(ctx, planePosX, planePosY, planeWidth, planeHeight) {
        this.ctx = ctx
        this.posX = planePosX + planeWidth - 10
        this.posY = planePosY - 15 + planeHeight / 2

        this.width = 20
        this.height = 10

        this.velX = 15

    }

    draw() {
        this.ctx.fillStyle = "blue"
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
        this.move()
    }

    move() {
        this.posX += this.velX
    }
} 