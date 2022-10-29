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

        this.init()
    }

    init() {
        this.setEventListeners()
    }

    draw() {
        this.ctx.fillStyle = "black"
        this.ctx.fillRect(this.posX, this.posY, this.width, this.height)
    }

    setEventListeners() {
        document.addEventListener("keydown", (e) => {
            if (e.code === "ArrowUp") {
                if (this.posY > 0 + this.height)
                    this.posY -= 15
            }
            if (e.code === "ArrowDown") {
                if (this.posY < this.ctxHeight - (this.height * 2) - this.pixelSetting)
                    this.posY += 15
            }
            if (e.code === "ArrowLeft") {
                if (this.posX > 50)
                    this.posX -= 10
            }
            if (e.code === "ArrowRight") {
                if (this.posX < (this.ctxWidth / 2) - this.width)
                    this.posX += 10
            }
        })
    }
}