"use strict";

//create main ship (objects)
const mainShip = {
  element: document.querySelector(".main-ship"),
};
mainShip.element.style.left = "100px";

//create array of bullets
let bullets = [];

//create enemy ships (array of objects)
const enemies = [];
for (let i = 0; i <= 4; i++) {
  let enemiesRow = [];
  for (let j = 0; j <= 10; j++) {
    let enemiesColumn = [];
    enemiesColumn.push({
      element: null,
    });
    enemiesColumn.element = document.createElement("span");
    enemiesColumn.element.className = "enemy";
    document.body.insertBefore(enemiesColumn.element, null);

    enemiesColumn.element.style.top = `${i * 20 + 10}px`;
    enemiesColumn.element.style.left = `${j * 20 + 10}px`;
    enemiesRow.push(enemiesColumn);
  }
  enemies.push(enemiesRow);
}

let currentPositionMainShip = mainShip?.element.style.left.slice(0, 3);

//movement of main ship
addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && currentPositionMainShip < 224) {
    currentPositionMainShip = parseInt(currentPositionMainShip, 10) + 10;
    mainShip.element.style.left = `${currentPositionMainShip}px`;
  }
  if (event.key === "ArrowLeft" && currentPositionMainShip > 0) {
    currentPositionMainShip = parseInt(currentPositionMainShip, 10) - 10;
    mainShip.element.style.left = `${currentPositionMainShip}px`;
  }
  if (event.key === " " || event.key === "ArrowUp") {
    shoot();
  }
});

let shootAvaliable = true;

function shoot() {
  if (shootAvaliable) {
    const newSpan = document.createElement("span");
    newSpan.className = "bullet";
    document.body.insertBefore(newSpan, null);
    newSpan.style.top = `${190}px`;
    newSpan.style.left = `${parseInt(
      mainShip.element.style.left.slice(0, 3),
      10
    )}px`;
    bullets.push(newSpan);
    shootAvaliable = false;
  }
}

function update() {
  //update bullet positions
  for (let i = 0; i < bullets.length; i++) {
    bullets[i].style.top = `${
      parseInt(bullets[i]?.style.top.slice(0, 3), 10) - 10
    }px`;
    for (let j = 0; j <= 4; j++) {
      for (let k = 0; k <= 10; k++) {
        if (
          parseInt(enemies[j][k]?.element.style.top, 10) ===
          parseInt(bullets[i]?.style.top, 10)
        ) {
          if (
            parseInt(enemies[j][k]?.element.style.left, 10) ===
            parseInt(bullets[i]?.style.left, 10)
          ) {
            enemies[j][k].element.style.top = "-10px";
            bullets[i].style.top = "-10px";
          }
        }
      }
    }

    //eliminamos una bala (tanto el elemento del DOM como su posicion en el array de bullets) cuando excede el limite superior
    if (parseInt(bullets[i]?.style.top.slice(0, 3), 10) < 0) {
      let element = bullets[i];
      let parent = element?.parentNode;
      parent?.removeChild(element);
      bullets.shift();
    }
  }
}
//actualizar todo cada 1000 milisegundos => 1 frame por segundo
//si disminuimos este valor => aumento de dificultad
setInterval(() => {
  update();
  shootAvaliable = true;
}, 100);
