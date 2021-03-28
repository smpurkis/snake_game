const snake = document.getElementById("snake");
const dot = document.getElementById("dot");
const container = document.getElementById("grid");
const score = document.getElementById("score");
let containerStyle = getComputedStyle(container)

const positionRange = Array.from(Array(parseInt(containerStyle.height) / 20).keys()).map(x => x * 20)
const getRandomPosition = () => {
    let randomTopPosition = positionRange[Math.floor(Math.random() * positionRange.length)]
    let randomLeftPosition = positionRange[Math.floor(Math.random() * positionRange.length)]
    return [randomTopPosition, randomLeftPosition]
}

function setDotPosition() {
    let [top, left] = getRandomPosition()
    dot.style.top = `${top}px`
    dot.style.left = `${left}px`
}
setDotPosition()


let snakeDirection = "down";
let lastPositions = [];
let snakeTailElements = [];
let tailLength = 0;

function resetGame() {
    let snakeDirection = "down";
    let lastPositions = [];
    let snakeTailElements = [];
    let tailLength = 0;
}

function gameLoop() {
    setInterval(() => {
        let snakeStyle = snake.style
        let dotStyle = dot.style

        dotTop = parseInt(dotStyle.top) || 0
        dotLeft = parseInt(dotStyle.left) || 0
        snakeTop = parseInt(snakeStyle.top) || 0
        snakeLeft = parseInt(snakeStyle.left) || 0
        for (let i = 0; i < snakeTailElements.length; i++) {
            let tail = snakeTailElements[i].style
            if (Math.abs(parseInt(tail.top) - snakeTop) === 0 && Math.abs(parseInt(tail.left) - snakeLeft) === 0) {
                alert("Snake is eating itself!")
            }
        }
        if (Math.abs(dotTop - snakeTop) === 0 && Math.abs(dotLeft - snakeLeft) === 0) {
            setDotPosition()
            tailLength += 1
            tail = snake.cloneNode(true)
            container.appendChild(tail)
            snakeTailElements.push(tail)
            score.textContent = `Score: ${tailLength}`
        }
        lastPositions.unshift({
            top: snakeTop,
            left: snakeLeft
        })
        lastPositions.length = tailLength

        if (snakeDirection === "down") {
            snakeStyleProperty = snakeTop
            snakeStyle.top = `${parseInt(snakeStyleProperty || 0) + 20}px`

        } else if (snakeDirection === "up") {
            snakeStyleProperty = snakeTop
            snakeStyle.top = `${parseInt(snakeStyleProperty || 0) - 20}px`

        } else if (snakeDirection === "left") {
            snakeStyleProperty = snakeLeft
            snakeStyle.left = `${parseInt(snakeStyleProperty || 0) - 20}px`

        } else if (snakeDirection === "right") {
            snakeStyleProperty = snakeLeft
            snakeStyle.left = `${parseInt(snakeStyleProperty || 0) + 20}px`
        }

        dotTop = parseInt(dotStyle.top) || 0
        dotLeft = parseInt(dotStyle.left) || 0
        snakeTop = parseInt(snakeStyle.top) || 0
        snakeLeft = parseInt(snakeStyle.left) || 0
        if (snakeTop > 980 || snakeTop < 0) {
            snakeStyle.top = `${980 - Math.min(Math.max(snakeTop, 0), 980)}px`
        }
        if (snakeLeft > 980 || snakeLeft < 0) {
            snakeStyle.left = `${980 - Math.min(Math.max(snakeLeft, 0), 980)}px`
        }

        for (let i = 0; i < snakeTailElements.length; i++) {
            tailStyle = snakeTailElements[i].style
            tailStyle.top = `${lastPositions[i].top}px`
            tailStyle.left = `${lastPositions[i].left}px`
        }

    }, 70)
}

gameLoop()


function spacebarPressed(e) {
    if (e.code === "ArrowUp" && snakeDirection !== "down") {
        snakeDirection = "up";
    } else if (e.code === "ArrowDown" && snakeDirection !== "up") {
        snakeDirection = "down";
    } else if (e.code === "ArrowLeft" && snakeDirection !== "right") {
        snakeDirection = "left";
    } else if (e.code === "ArrowRight" && snakeDirection !== "left") {
        snakeDirection = "right";
    }
}

document.addEventListener("keydown", spacebarPressed)