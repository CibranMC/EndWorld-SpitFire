const Game = {
    name: "EndWorld SpitFire",
    author: "Carlos Bustos Ramiro y Cibrán Meléndez Cabo",
    version: "beta",
    license: undefined,

    FPS: 60,

    canvas: undefined,
    ctx: undefined,
    height: undefined,
    width: undefined,

    intervalId: undefined,
    framesCounter: 0,
    score: 0,

    shootFrequency: 30,
    scoreFinalBoss: 200,
    invulnerable: 0,
    slowDown: 0,
    quickShoot: 0,

    plane: undefined,
    boss: undefined,
    meteorites: [],
    obstacles: [],
    powerUps: [],
    background: undefined,

    isDifficult: false,
    isSlowDown: false,
    isInvulnerable: false,
    isQuickShoot: false,



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

            if (this.framesCounter % this.shootFrequency === 0) {
                this.plane.cooldown++
                this.score++
            }
            if (this.framesCounter % 60 === 0 && this.isInvulnerable === true) this.invulnerable--
            if (this.framesCounter % 60 === 0 && this.isSlowDown === true) this.slowDown--
            if (this.framesCounter % 60 === 0 && this.isQuickShoot === true) this.quickShoot--


            this.printScoreAndLives()
        }, 1000 / this.FPS)
    },

    generateAll() {
        let planeLives = 4
        let bossLives = 10
        if (this.isDifficult) {
            planeLives = 2
            bossLives = 20
        }
        this.plane = new Plane(this.ctx, this.width, this.height, planeLives)
        this.obstacle = new Obstacle(this.ctx, this.width, this.height)
        this.meteorite = new Meteorite(this.ctx, this.width, this.height)
        this.powerUp = new PowerUp(this.ctx, this.width, this.height)
        this.boss = new Boss(this.ctx, this.width, this.height, bossLives)
        this.background = new Background(this.ctx, this.width, this.height)

    },

    drawAll() {
        this.background.draw()
        console.log(this.background)

        this.plane.bullets.forEach(bullet => bullet.draw());
        this.plane.draw()
        if (this.score >= this.scoreFinalBoss) {
            this.boss.draw()
            this.boss.powerDowns.forEach(powerDown => powerDown.draw())
        }
        this.obstacles.forEach(obstacle => obstacle.draw())
        this.meteorites.forEach(meteorite => meteorite.draw())
        this.powerUps.forEach(powerUp => powerUp.draw())

        if (this.invulnerable <= 0) this.isInvulnerable = false
        if (this.slowDown <= 0) {
            this.plane.movility = 10
            this.plane.backMove = 7
            this.isSlowDown = false
        }
        if (this.quickShoot <= 0) {
            this.shootFrequency = 30
            this.isQuickShoot = false
        }

    },

    clearAll() {
        this.ctx.clearRect(0, 0, this.width, this.height)
        this.clearArray(this.obstacles)
        this.clearArray(this.meteorites)
        this.clearArray(this.powerUps)
        this.clearArray(this.boss.powerDowns)
        // console.log(this.boss.powerDowns)


    },

    setAllElements() {
        let velXObs = 0.3
        let velXMet = 0.4
        if (this.isDifficult) {
            velXObs = 0.6
            velXMet = 0.7
        }

        if (this.framesCounter % 120 === 0) {
            this.score <= this.scoreFinalBoss
                ?
                this.obstacles.push(new Obstacle(this.ctx, this.width, this.height, this.obstacle.velX += velXObs))
                :
                this.obstacles.push(new Obstacle(this.ctx, this.width, this.height, this.obstacle.velX += velXObs, this.boss.posX))
        }

        if (this.framesCounter % 180 === 0) {
            this.score <= this.scoreFinalBoss
                ?
                this.meteorites.push(new Meteorite(this.ctx, this.width, this.height, this.meteorite.velX += velXMet))
                :
                this.meteorites.push(new Meteorite(this.ctx, this.width, this.height, this.meteorite.velX += velXMet, this.boss.posX))

            if (this.score >= this.scoreFinalBoss) {
                this.boss.powerDowns.push(new PowerDown(this.ctx, this.boss.posX, this.boss.posY, this.boss.height))
            }
        }

        if (this.framesCounter % 360 === 0) {
            let powerUpRandom = Math.floor(Math.random() * 2)
            let powerUpType = ''

            if (powerUpRandom === 0) { powerUpType = 'ExtraLife' } else { powerUpType = 'QuickShoot' }
            this.powerUps.push(new PowerUp(this.ctx, this.width, this.height, powerUpType))
        }
    },

    checkCollision() {
        if (!this.isInvulnerable) {
            this.obstacles.forEach((obstacle, indexObstacle, obstacles) => {
                if (obstacle.posX + 20 < this.plane.posX + this.plane.width &&
                    obstacle.posX + obstacle.width > this.plane.posX + 20 &&
                    obstacle.posY - 10 < this.plane.posY + this.plane.height &&
                    obstacle.height + obstacle.posY > this.plane.posY + 10) {

                    obstacles.splice(indexObstacle, 1)
                    this.plane.lives--
                    this.plane.posX -= 50
                    this.isInvulnerable = true
                    this.invulnerable = 3

                    if (this.plane.lives <= 0) {
                        this.gameOver()
                    }
                }
            })

            this.meteorites.forEach((meteorite, indexMeteorite, meteorites) => {
                if (meteorite.posX + 20 < this.plane.posX + this.plane.width &&
                    meteorite.posX + meteorite.width > this.plane.posX + 20 &&
                    meteorite.posY - 10 < this.plane.posY + this.plane.height &&
                    meteorite.height + meteorite.posY > this.plane.posY + 10) {

                    meteorites.splice(indexMeteorite, 1)
                    this.plane.lives--
                    this.plane.posX -= 50
                    this.isInvulnerable = true
                    this.invulnerable = 3

                    if (this.plane.lives <= 0) {
                        this.gameOver()
                    }
                }
            })
        }

        this.plane.bullets.forEach((bullet, indexBullet, bullets) => {
            this.meteorites.forEach((meteorite, indexMeteorite, meteorites) => {
                if (meteorite.posX + 5 < bullet.posX + bullet.width &&
                    meteorite.posX + meteorite.width > bullet.posX + 5 &&
                    meteorite.posY - 10 < bullet.posY + bullet.height &&
                    meteorite.height + meteorite.posY > bullet.posY + 10) {
                    meteorites.splice(indexMeteorite, 1)
                    bullets.splice(indexBullet, 1)
                    this.score += 10
                }
            })
        })

        this.plane.bullets.forEach((bullet, indexBullet, bullets) => {
            this.obstacles.forEach(obstacle => {
                if (obstacle.posX - 1 < bullet.posX + bullet.width &&
                    obstacle.posX + obstacle.width > bullet.posX - 1 &&
                    obstacle.posY - 10 < bullet.posY + bullet.height &&
                    obstacle.height + obstacle.posY > bullet.posY + 10) {
                    bullets.splice(indexBullet, 1)
                }
            })
        })

        this.powerUps.forEach((powerUp, indexPowerUp, powerUps) => {
            if (powerUp.posX + 20 < this.plane.posX + this.plane.width &&
                powerUp.posX + powerUp.width > this.plane.posX + 20 &&
                powerUp.posY - 10 < this.plane.posY + this.plane.height &&
                powerUp.height + powerUp.posY > this.plane.posY + 10) {
                powerUps.splice(indexPowerUp, 1)

                if (powerUp.name === 'ExtraLife') {
                    this.plane.lives++
                }
                else if (powerUp.name === 'QuickShoot' && !this.isQuickShoot) {
                    this.shootFrequency = 10
                    this.isQuickShoot = true
                    this.quickShoot = 3
                }

            }
        })

        if (this.score >= this.scoreFinalBoss) {
            this.plane.bullets.forEach((bullet, indexBullet, bullets) => {
                if (bullet.posX + bullet.width + bullet.velX >= this.boss.posX &&
                    bullet.posX + bullet.width <= this.boss.posX &&
                    this.boss.posY < bullet.posY + bullet.height &&
                    this.boss.height + this.boss.posY > bullet.posY) {
                    bullets.splice(indexBullet, 1)
                    this.boss.lives--
                    if (this.boss.lives <= 0) {
                        this.winGame()
                        this.score += 50
                    }
                }
            })

            // if (!this.isSlowDown) {
            this.boss.powerDowns.forEach((powerDown, indexPowerDown, powerDowns) => {
                if (powerDown.posX + 20 < this.plane.posX + this.plane.width &&
                    powerDown.posX + powerDown.width > this.plane.posX + 20 &&
                    powerDown.posY - 10 < this.plane.posY + this.plane.height &&
                    powerDown.height + powerDown.posY > this.plane.posY + 10) {
                    powerDowns.splice(indexPowerDown, 1)
                    if (!this.isSlowDown) {
                        this.plane.movility = 5
                        this.plane.backMove = 3.5
                        this.isSlowDown = true
                        this.slowDown = 3
                    }
                }
            })
            // }
        }
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

    printScoreAndLives() {
        this.ctx.fillStyle = "black"
        this.ctx.font = "35px sans-serif"

        this.ctx.fillText(`Score: ${this.score}`, this.width - 250, 40)
        this.ctx.fillText(`Lives: ${this.plane.lives}`, 100, 40)
    },

    winGame() {
        const winGame = document.querySelector(".win-game")
        const scorePoints = document.querySelector(".score-points")
        const reload = document.querySelector(".reload-win-game")

        clearInterval(this.intervalId)
        this.clearAll()

        scorePoints.innerHTML = `Score: ${this.score}`

        winGame.classList.toggle("non-display")
        this.canvas.classList.toggle("non-display")

        reload.addEventListener('click', () => {
            location.reload()
        })
    },

    gameOver() {
        const gameOver = document.querySelector(".game-over")
        const scorePoints = document.querySelector(".score-points")
        const reload = document.querySelector(".reload-game-over")

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