class Plane {
    constructor(ctx, ctxWidth, ctxHeight) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 200
        this.height = 50

        this.posX = 100
        this.posY = ctxHeight / 2 - 50

        this.pixelSetting = 4

        this.cooldown = 1
        this.canShoot = false

        this.keys = {
            upKeyPressed: false,
            downKeyPressed: false,
            leftKeyPressed: false,
            rightKeyPressed: false,
        }

        this.bullets = []

        this.init()
    }

    init() {
        this.setEventListeners()
    }

    draw() {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)

        if (this.cooldown >= 1) this.canShoot = true

        if (this.upKeyPressed) this.moveUp()
        if (this.downKeyPressed) this.moveDown()
        if (this.leftKeyPressed) this.moveLeft()
        if (this.rightKeyPressed) this.moveRight()
    }

    setEventListeners() {
        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowUp" || e.code === "KeyW") {
                this.upKeyPressed = true
            }
            if (e.code === "ArrowDown" || e.code === "KeyS") {
                this.downKeyPressed = true
            }
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.leftKeyPressed = true
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.rightKeyPressed = true
            }
            if (e.code === "Space") {
                this.shoot()
            }
        })
        document.addEventListener("keyup", (e) => {
            if (e.code === "ArrowUp" || e.code === "KeyW") {
                this.upKeyPressed = false
            }
            if (e.code === "ArrowDown" || e.code === "KeyS") {
                this.downKeyPressed = false
            }
            if (e.code === "ArrowLeft" || e.code === "KeyA") {
                this.leftKeyPressed = false
            }
            if (e.code === "ArrowRight" || e.code === "KeyD") {
                this.rightKeyPressed = false
            }
        })
    }
    moveUp() {
        if (this.posY > 0 + this.height)
            this.posY -= 10
    }
    moveDown() {
        if (this.posY < this.ctxHeight - (this.height * 2) - this.pixelSetting)
            this.posY += 10
    }
    moveRight() {
        if (this.posX < (this.ctxWidth / 2) - this.width)
            this.posX += 5
    }
    moveLeft() {
        if (this.posX > 50)
            this.posX -= 5
    }

    shoot() {
        if (this.canShoot) {
            this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height))
            this.canShoot = false
            this.cooldown = 0
        }
    }

}