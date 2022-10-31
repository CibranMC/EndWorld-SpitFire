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
    framesCounter: 0,
    score: 0,

    plane: undefined,
    meteorites: [],
    obstacles: [],
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
            this.setAllElements()
            this.drawAll()
            this.checkCollision()
            this.clearBullets()
            this.framesCounter++
            if (this.framesCounter % 30 === 0) {
                this.plane.cooldown++
                this.score++
            }
            this.printScore()
        }, 1000 / this.FPS)
    },

    generateAll() {
        this.plane = new Plane(this.ctx, this.width, this.height)
        this.obstacle = new Obstacle(this.ctx, this.width, this.height)
        this.meteorite = new Meteorite(this.ctx, this.width, this.height)
    },

    drawAll() {
        this.plane.bullets.forEach(bullet => bullet.draw());
        this.plane.draw()
        this.obstacles.forEach(obstacle => obstacle.draw())
        this.meteorites.forEach(meteorite => meteorite.draw())
    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.clearArray(this.obstacles)
        this.clearArray(this.meteorites)
    },

    setAllElements() {
        if (this.framesCounter % 120 === 0) {
            this.obstacles.push(new Obstacle(this.ctx, this.width, this.height))
        }
        if (this.framesCounter % 180 === 0) {
            this.meteorites.push(new Meteorite(this.ctx, this.width, this.height))
        }
    },

    checkCollision() {
        this.obstacles.forEach(obstacle => {
            if (obstacle.posX + 24 < this.plane.posX + this.plane.width &&
                obstacle.posX + obstacle.width > this.plane.posX + 24 &&
                obstacle.posY - 10 < this.plane.posY + this.plane.height &&
                obstacle.height + obstacle.posY > this.plane.posY + 10) this.gameOver()
        })

        this.meteorites.forEach(meteorite => {
            if (meteorite.posX + 20 < this.plane.posX + this.plane.width &&
                meteorite.posX + meteorite.width > this.plane.posX + 20 &&
                meteorite.posY - 10 < this.plane.posY + this.plane.height &&
                meteorite.height + meteorite.posY > this.plane.posY + 10) this.gameOver()
        })

        this.plane.bullets.forEach((bullet, indexBullet, bullets) => {
            this.meteorites.forEach((meteorite, indexMeteorite, meteorites) => {
                if (meteorite.posX + 25 < bullet.posX + bullet.width &&
                    meteorite.posX + meteorite.width > bullet.posX + 25 &&
                    meteorite.posY - 10 < bullet.posY + bullet.height &&
                    meteorite.height + meteorite.posY > bullet.posY + 10) {
                    meteorites.splice(indexMeteorite, 1)
                    bullets.splice(indexBullet, 1)
                    this.score += 10
                }
            })
        })
    },

    clearArray(array) {
        array.forEach((item, i, items) => {
            if (item.posX + item.width < 0) {
                items.splice(i, 1)
            }
        })
        //console.log(array)
    },

    clearBullets() {
        this.plane.bullets.forEach((bullet, i, bullets) => {
            if (bullet.posX > this.width) {
                bullets.splice(i, 1)
            }
        })
        //console.log(this.plane.bullets)
    },

    printScore() {
        this.ctx.fillStyle = "black"
        this.ctx.font = "35px sans-serif"
        this.ctx.fillText(`Score: ${this.score}`, this.width - 250, 60)
    },

    gameOver() {
        const gameOver = document.querySelector(".game-over")
        const scorePoints = document.querySelector(".score-points")
        const reload = document.querySelector(".reload")

        clearInterval(this.intervalId)
        this.clearAll()

        scorePoints.innerHTML = `Score: ${this.score}`

        gameOver.classList.toggle("non-display")
        this.canvas.classList.toggle("non-display")

        reload.addEventListener('click', () => {
            location.reload()
        })
    }

}