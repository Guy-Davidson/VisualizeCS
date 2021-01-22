// Global Variables:
// union-find arrays:
let cells = [];
let components = [];

// Graph G arrays:
let vertices = [1];
let edges = [];

//Classes:
class Vertex {
  constructor(div, adjList = []) {
    this.div = div;
    this.adjList = adjList;
  }
}

function generateMaze(size, viewPort) {

  generateMazeGrid(size, viewPort);

  initUnionFind(size);

  while (!isSingleComponents(components)) {

    //pick an edge from maze:
    let randCol = Math.floor((Math.random() * size) + 1);
    let randRow = Math.floor((Math.random() * size));
    let r1 = randCol + randRow * size;
    //random number to decie if next cell will be to the right or bottom:
    let r = Math.random()

    if (r1 == size ** 2) {
      continue;
    } else if (r < 0.5 && (r1 + size < size ** 2) || (randCol % size == 0)) {
      r2 = r1 + size;
    } else {
      r2 = r1 + 1;
    }

    let cell1 = cells[r1 - 1];
    let cell2 = cells[r2 - 1];
    if (find(cell1) !== find(cell2)) {
      union(cell1, cell2);
      edges.push([cell1, cell2]);
      connectMaze(cell1, cell2, size);
      vertices[cell1].adjList.push(vertices[cell2]);
      vertices[cell2].adjList.push(vertices[cell1]);
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
      newDiv.classList.add("mazeBorder");
      newDiv.style.gridColumn = j.toString();
      newDiv.style.gridRow = i.toString();
      newDiv.dataset.indexNumber = k.toString();
      view.appendChild(newDiv);
      const v = new Vertex(newDiv);
      vertices.push(v);
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
  return components.every(v => v === components[0]);
}

function find(cell) {
  return components[cell - 1];
}

function union(cell1, cell2) {
  let leader = find(cell1);
  let sec = find(cell2);

  for (let i = 0; i < components.length; i++) {
    if (components[i] == sec) {
      components[i] = leader;
    }
  }
}

function connectMaze(cell1, cell2, size) {
  if (cell1 + 1 == cell2) {
    vertices[cell1].div.style.borderRightColor = "transparent";
    vertices[cell2].div.style.borderLeftColor = "transparent";
  }
  if (cell1 + size == cell2) {
    vertices[cell1].div.style.borderBottomColor = "transparent";
    vertices[cell2].div.style.borderTopColor = "transparent";
  }
}

async function DFS(vertex) {
  let stack = [];
  stack.push(vertex);
  while (stack.length > 0) {
    let v = stack.pop();
    if (!v.div.classList.contains("dfsMarked")) {
      v.div.classList.add("dfsMarked");
      v.adjList.forEach(v => stack.push(v));
      await sleep(5);
    }
  }
}