class Plane {
    constructor(ctx, ctxWidth, ctxHeight, lives) {
        this.ctx = ctx
        this.ctxWidth = ctxWidth
        this.ctxHeight = ctxHeight

        this.width = 220
        this.height = 63

        this.posX = 100
        this.posY = ctxHeight / 2 - this.height

        this.pixelSetting = 4

        this.cooldown = 1
        this.canShoot = false
        this.lives = lives
        this.movility = 10
        this.backMove = 7

        this.keys = {
            upKeyPressed: false,
            downKeyPressed: false,
            leftKeyPressed: false,
            rightKeyPressed: false,
            spaceKeyPressed: false,
        }

        this.bullets = []

        this.planeImg = new Image()
        this.planeImg.src = "./assets/spitfire.png"

        this.init()
    }

    init() {
        this.setEventListeners()
    }

    draw() {
        this.ctx.drawImage(this.planeImg, this.posX, this.posY, this.width, this.height)

        if (this.cooldown >= 1) this.canShoot = true

        if (this.upKeyPressed) this.moveUp()
        if (this.downKeyPressed) this.moveDown()
        if (this.leftKeyPressed) this.moveLeft()
        if (this.rightKeyPressed) this.moveRight()
        if (this.spaceKeyPressed) this.shoot()
    }

    setEventListeners() {

        document.addEventListener("keydown", ({ code }) => {
            if (code === "ArrowUp" || code === "KeyW") {
                this.upKeyPressed = true
            }
            if (code === "ArrowDown" || code === "KeyS") {
                this.downKeyPressed = true
            }
            if (code === "ArrowLeft" || code === "KeyA") {
                this.leftKeyPressed = true
            }
            if (code === "ArrowRight" || code === "KeyD") {
                this.rightKeyPressed = true
            }
            if (code === "Space") {
                this.spaceKeyPressed = true
            }
        })

        document.addEventListener("keyup", ({ code }) => {
            if (code === "ArrowUp" || code === "KeyW") {
                this.upKeyPressed = false
            }
            if (code === "ArrowDown" || code === "KeyS") {
                this.downKeyPressed = false
            }
            if (code === "ArrowLeft" || code === "KeyA") {
                this.leftKeyPressed = false
            }
            if (code === "ArrowRight" || code === "KeyD") {
                this.rightKeyPressed = false
            }
            if (code === "Space") {
                this.spaceKeyPressed = false
            }
        })
    }

    moveUp() {
        if (this.posY > 50)
            this.posY -= this.movility
    }

    moveDown() {
        if (this.posY < this.ctxHeight - (this.height * 2) - this.pixelSetting)
            this.posY += this.movility
    }

    moveRight() {
        if (this.posX < (this.ctxWidth / 2) - this.width)
            this.posX += this.movility
    }

    moveLeft() {
        if (this.posX > 50)
            this.posX -= this.backMove
    }

    shoot() {
        if (this.canShoot) {
            this.bullets.push(new Bullet(this.ctx, this.posX, this.posY, this.width, this.height))
            this.canShoot = false
            this.cooldown = 0
        }
    }
}