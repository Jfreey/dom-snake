import style from "./style.module.css";

export const ACTIONS = { UP: "up", DOWN: "down", RIGHT: "right", LEFT: "left" };

export const createSnake = ({
    container,
    defaultSize = 3,
    direction = ACTIONS.RIGHT,
    refreshCallback,
}) => {
    const snake = {
        body: [],
        direction,
        add(pos) {
            const newNodePos = actions(direction)(pos);
            this.body.unshift({
                el: `<div class="${style.node}"></div>`,
                pos: newNodePos,
            });
        },
        up() {
            refresh(ACTIONS.UP);
        },
        down() {
            refresh(ACTIONS.DOWN);
        },
        right() {
            refresh(ACTIONS.RIGHT);
        },
        left() {
            refresh(ACTIONS.LEFT);
        },
    };

    const init = () => {
        for (let i = 0; i < defaultSize; i++) {
            snake.body.push({
                el: `<div class="${style.node}"></div>`,
                pos: [i, 0],
            });
        }
        snake.body.forEach((node) => {
            const nodeWrap = container.querySelector(
                `[pos="${{ ...node.pos }}"]`
            );
            if (nodeWrap) {
                nodeWrap.innerHTML = node.el;
            }
        });
    };

    const registerAction = () => {
        let action = "";
        document.onkeydown = ({ keyCode }) => {
            switch (keyCode) {
                case 37:
                    action = ACTIONS.LEFT;
                    break;
                case 38:
                    action = ACTIONS.UP;
                    break;
                case 39:
                    action = ACTIONS.RIGHT;
                    break;
                case 40:
                    action = ACTIONS.DOWN;
                    break;
                default:
                    "";
            }

            if (snake.direction !== action) {
                if (
                    (snake.direction === ACTIONS.LEFT &&
                        action !== ACTIONS.RIGHT) ||
                    (snake.direction === ACTIONS.UP &&
                        action !== ACTIONS.DOWN) ||
                    (snake.direction === ACTIONS.RIGHT &&
                        action !== ACTIONS.LEFT) ||
                    (snake.direction === ACTIONS.DOWN && action !== ACTIONS.UP)
                )
                    refresh(action);
            }
        };
    };

    const clean = () => {
        snake.body.forEach((node) => {
            const { pos } = node;
            const nodeWrap = container.querySelector(`[pos="${pos}"]`);
            if (nodeWrap) {
                nodeWrap.innerHTML = "";
            }
        });
    };

    const actions = (action) => {
        switch (action) {
            case ACTIONS.LEFT:
                return ([x, y]) => [x - 1, y];
            case ACTIONS.UP:
                return ([x, y]) => [x, y - 1];
            case ACTIONS.RIGHT:
                return ([x, y]) => [x + 1, y];
            case ACTIONS.DOWN:
                return ([x, y]) => [x, y + 1];
        }
    };

    const refresh = (action) => {
        clean();
        const newBody = [];
        snake.body.forEach((node, index) => {
            let pos =
                index === snake.body.length - 1
                    ? actions(action)(node.pos)
                    : snake.body[index + 1].pos;
            const nodeWrap = container.querySelector(`[pos="${pos}"]`);
            if (nodeWrap) {
                nodeWrap.innerHTML = node.el;
                newBody.push({ el: node.el, pos });
            }
        });
        snake.body = newBody;
        snake.direction = action;
        refreshCallback && refreshCallback(snake);
    };

    init();
    registerAction();

    return snake;
};
