import style from "./style.module.css";

export const createPanel = (container) => {
    const defaultSize = 20;
    const panel = document.createElement("div");
    panel.classList.add(style.panel);
    let content = "";
    for (let y = 0; y < defaultSize; y++) {
        for (let x = 0; x < defaultSize; x++) {
            content += `<div class="${style.item}" pos="${x},${y}"></div>`;
            if (x === defaultSize - 1) {
                content += "<br/>";
            }
        }
    }
    panel.innerHTML = content;
    container.appendChild(panel);
    return panel;
};
