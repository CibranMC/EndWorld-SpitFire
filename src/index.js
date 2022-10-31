window.onload = () => {
    const canvas = document.querySelector("#canvas")
    const start = document.querySelector(".start")
    const menu = document.querySelector(".difficulty")

    start.addEventListener('click', () => {
        menu.classList.toggle("non-display")
        canvas.classList.toggle("non-display")

        Game.init()
    })
}