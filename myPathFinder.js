// Global Variables:
let cells = [];
let components = [];

function generateMaze(size, viewPort) {

  generateMazeGrid(size, viewPort);

  initUnionFind(size);

  while (!isSingleComponents(components)) {
    let r1 = Math.floor((Math.random() * size ** 2) + 1);
    let r2 = Math.floor((Math.random() * size ** 2) + 1);

    let cell1 = cells[r1 - 1];
    let cell2 = cells[r2 - 1];
    if (find(cell1) !== find(cell2)) {
      union(cell1, cell2);

      //To implement:
      // make edge(cell1, cell2);
      // animate(no border between  cell1 cell2)
    }
  }
}

function generateMazeGrid(size, viewPort) {
  document.getElementById('mazeSizeSlider').value = size;

  let view = document.querySelector('.' + viewPort);
  view.style.display = "grid";
  view.innerHTML = "";

  //create size^2 divs in viewPort grid:
  let k = 1;
  for (let i = 1; i <= size; i++) {
    for (let j = 1; j <= size; j++) {
      let newDiv = document.createElement("div");
      newDiv.classList.add("border");
      newDiv.classList.add("mazeCell" + i.toString() + j.toString());
      newDiv.style.gridColumn = j.toString();
      newDiv.style.gridRow = i.toString();
      newDiv.dataset.indexNumber = k.toString();
      view.appendChild(newDiv);
      k++;
    }
  }
}

function initUnionFind(size) {
  cells = Array.from({
    length: size ** 2
  }, (_, index) => index + 1);
  components = Array.from({
    length: size ** 2
  }, (_, index) => index + 1);
}

function isSingleComponents(components) {
  let val = components[0];
  let i = 1;

  while (i < components.length) {
    if (val !== components[i]) {
      return false;
    }
    i++;
  }
  return true;
}

function find(cell) {
  return components[cell - 1];
}

function union(c1, c2) {
  let leader = find(c1);
  let sec = find(c2);

  for (let i = 0; i < components.length; i++) {
    if (components[i] == sec) {
      components[i] = leader;
    }
  }
}