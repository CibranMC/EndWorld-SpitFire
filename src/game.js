const Game = {
    name: "EndWorld SpitFire",
    author: "Carlos Bustos Ramiro y Cibrán Meléndez Cabo",
    version: "alpha",
    license: undefined,

    FPS: 60,

    canvas: undefined,
    ctx: undefined,
    height: undefined,
    width: undefined,
    intervalId: undefined,

    plane: undefined,
    meteorites: undefined,
    background: undefined,



    init() {
        this.canvas = document.querySelector("#canvas")
        this.ctx = canvas.getContext("2d")

        this.setDimensions()
        this.start()
    },

    setDimensions() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.canvas.width = this.width
        this.canvas.height = this.height
    },

    start() {

        this.generateAll()
        this.intervalId = setInterval(() => {
            this.clearAll()
            this.drawAll()
        }, 1000 / this.FPS)
    },

    generateAll() {
        this.plane = new Plane(this.ctx, this.width, this.height)
    },

    drawAll() {
        this.plane.draw()
        this.plane.bullets.forEach(bullet => bullet.draw());
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
    }


}