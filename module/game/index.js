import style from "./style.module.css";
let foodsPos = [];
let speeds = 100;
let timer = null;

const createFoods = (panelSize) => {
    foodsPos = [];
    const max = panelSize;
    for (let i = 0; i < 3; i++) {
        foodsPos.push([
            Math.round(Math.random() * max),
            Math.round(Math.random() * max),
        ]);
    }
    foodsPos.forEach((food) => {
        const $food = document.querySelector(`[pos="${food}"]`);
        $food.classList.add(style.food);
    });
};

export const eat = (snake, panelSize) => {
    const pos = snake.body[snake.body.length - 1].pos;
    const $head = document.querySelector(`[pos="${pos}"]`);
    if ($head.classList.contains(style.food)) {
        $head.classList.remove(style.food);
        snake.add(pos);
    }
    if (document.querySelectorAll(`.${style.food}`).length === 0) {
        createFoods(panelSize);
    }
};

export const addLevel = (snake) => {
    speeds = (Math.floor(snake.length / 3) / 20) * 10;
};

export const gameOver = (snake, panelSize) => {
    const { pos } = snake.body[snake.body.length - 1];
    const [x, y] = pos;

    if (x === panelSize - 1 || y === panelSize - 1) {
        alert("game over");
        clearInterval(timer);
    }
};

export const createGame = ({ snake, panelSize }) => {
    const loop = () => {
        timer = setInterval(() => {
            snake[snake.direction]();
        }, speeds);
    };

    const run = () => {
        createFoods(panelSize);
        loop();
    };

    return {
        run,
    };
};
