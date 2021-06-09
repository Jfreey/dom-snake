import { createPanel } from "./module/panel/index";
import { createSnake } from "./module/snake/index";
import { createGame, eat, addLevel, gameOver } from "./module/game/index";
import "./style.css";
window.onload = () => {
    const defaultSize = 20;
    const $container = document.querySelector("#app");
    const panel = createPanel({ container: $container, defaultSize });
    const snake = createSnake({
        container: $container,
        defaultSize: 3,
        refreshCallback(snake) {
            eat(snake, defaultSize);
            addLevel(snake);
            gameOver(snake, defaultSize);
        },
    });
    const game = createGame({ snake, panelSize: defaultSize });
    game.run();
};
