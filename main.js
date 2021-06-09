import { createPanel } from "./module/panel/index";
import { createSnake } from "./module/snake/index";
import { createGame, eat, addLevel, gameOver } from "./module/game/index";
import "./style.css";
window.onload = () => {
    const $container = document.querySelector("#app");
    const panel = createPanel($container);
    const snake = createSnake({
        container: $container,
        defaultSize: 10,
        refreshCallback(snake) {
            eat(snake);
            addLevel(snake);
            gameOver(snake);
        },
    });
    const game = createGame({ snake });
    game.run();
};
