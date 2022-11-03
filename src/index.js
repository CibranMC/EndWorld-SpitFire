window.onload = () => {
    const canvas = document.querySelector("#canvas")
    const easy = document.querySelector(".easy")
    const hard = document.querySelector(".hard")

    const menu = document.querySelector(".background-main-page")

    easy.addEventListener('click', () => {
        menu.classList.toggle("non-display")
        canvas.classList.toggle("non-display")
        Game.init()
    })
    hard.addEventListener('click', () => {
        Game.isDifficult = true
        menu.classList.toggle("non-display")
        canvas.classList.toggle("non-display")
        Game.init()
    })
}