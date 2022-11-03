class PowerDown {
    constructor(ctx, bossPosX, bossPosY, bossHeight) {
        this.ctx = ctx

        this.width = 50
        this.height = 50

        this.posX = bossPosX
        this.posY = (bossPosY + bossHeight) - bossHeight / 2


        this.velX = 20

        this.powerDownImg = new Image()
        this.powerDownImg.src = "./assets/freezePowerDown.png"
    }


    draw() {
        this.ctx.drawImage(this.powerDownImg, this.posX, this.posY, this.width, this.height)
        this.move()
    }

    move() {
        this.posX -= this.velX
    }
}