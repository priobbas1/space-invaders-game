"use strict";

//create main ship
const mainShip = document.createElement("div");
mainShip.className = "main-ship";
mainShip.style.left = "100px";
document.body.insertBefore(mainShip, null);

//create array of bullets
let bullets = [];

//create enemy ships (array of objects)
const enemies = [];
for (let i = 0; i <= 4; i++) {
  let enemiesRow = [];
  for (let j = 0; j <= 10; j++) {
    let enemiesColumn = document.createElement("span");
    enemiesColumn.className = "enemy";
    document.body.insertBefore(enemiesColumn, null);
    enemiesColumn.style.top = `${i * 20 + 10}px`;
    enemiesColumn.style.left = `${j * 20 + 10}px`;
    enemiesRow.push(enemiesColumn);
  }
  enemies.push(enemiesRow);
}

let currentPositionMainShip = mainShip?.style.left.slice(0, 3);
//movement of main ship
addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight" && currentPositionMainShip < 224) {
    currentPositionMainShip = parseInt(currentPositionMainShip, 10) + 10;
    mainShip.style.left = `${currentPositionMainShip}px`;
  }
  if (event.key === "ArrowLeft" && currentPositionMainShip > 0) {
    currentPositionMainShip = parseInt(currentPositionMainShip, 10) - 10;
    mainShip.style.left = `${currentPositionMainShip}px`;
  }
  if (event.key === " " || event.key === "ArrowUp") {
    shoot();
  }
});

let shootAvaliable = true;
//shooting function
function shoot() {
  if (shootAvaliable) {
    const newSpan = document.createElement("span");
    newSpan.className = "bullet";
    document.body.insertBefore(newSpan, null);
    newSpan.style.top = `${190}px`;
    newSpan.style.left = `${parseInt(mainShip.style.left.slice(0, 3), 10)}px`;
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
    //eliminamos una bala (tanto el elemento del DOM como su posicion en el array de bullets) cuando excede el limite superior
    if (parseInt(bullets[i]?.style.top.slice(0, 3), 10) < 0) {
      removeBullet(i);
      bullets.splice(i, 1);
      i--;
    }
    for (let j = 0; j <= 4; j++) {
      for (let k = 0; k <= 10; k++) {
        if (
          parseInt(enemies[j][k]?.style.top, 10) ===
          parseInt(bullets[i]?.style.top, 10)
        ) {
          if (
            parseInt(enemies[j][k].style.left, 10) ===
            parseInt(bullets[i].style.left, 10)
          ) {
            bullets[i].style.top = "-10px";
            removeBullet(i);
            bullets.splice(i, 1);
            i--;
            enemies[j][k].style.top = "-10px";
            removeEnemy(j, k);
            enemies[j].splice(k, 1);
            k--;
          }
        }
      }
    }
  }
}
function removeEnemy(rows, columns) {
  let element = enemies[rows][columns];
  let parent = element?.parentNode;
  parent?.removeChild(element);
}
function removeBullet(index) {
  let element = bullets[index];
  let parent = element?.parentNode;
  parent?.removeChild(element);
}
//actualizar todo cada 100 milisegundos => 10 frames por segundo
//si disminuimos este valor => aumento de dificultad
setInterval(() => {
  update();
  shootAvaliable = true;
}, 100);
