// My Maze Path Finding :

//Constants:
const MIN_MAZE_SIZE = 50;
const MID_MAZE_SIZE = 60;
const MAX_MAZE_SIZE = 70;

const MIN_FINDING_DELAY = 2;
const MAX_FINDING_DELAY = 5;

const DFS_ALG = 1;
const BFS_ALG = 2;
const MAZE_RACE = 3;

const MAZE_START = 1;
const MAZE_FINISH = MAX_MAZE_SIZE ** 2;


//Global vars:
let mazeSize = MAX_MAZE_SIZE;
let findingDelay = MAX_FINDING_DELAY;
let findingAlg = DFS_ALG;
let startingPoint = MAZE_START;
let finishPoint = MAZE_FINISH;
let isFirstToFind = 1;
let selectedBtnMaze = RACE;


// union-find arrays:
let cells = [];
let components = [];

// Graph G arrays:
let vertices = [1];
let edges = [];

//Classes:
class Vertex {
  constructor(div, adjList = [], isFinish = false, isDFSMarked = false, isBFSMarked = false) {
    this.div = div;
    this.adjList = adjList;
    this.isFinish = isFinish;
    this.isDFSMarked = isDFSMarked;
    this.isBFSMarked = isBFSMarked;
  }
}

async function mazeRace(viewPort) {
  mazeRaceSelected(document.getElementById('mazeRaceBtn'))
  document.getElementById('mazeResetBtn').click();

  // count down:
  let view = document.querySelector('.' + viewPort);
  let counter = document.createElement("h1");
  let t = document.createTextNode("3");
  counter.style.fontSize = "9rem";
  view.style.textAlign = "center";
  counter.appendChild(t);
  view.appendChild(counter);

  for (let k = 1; k < 4; k++) {
    setTimeout(() => {
      counter.textContent = 3 - k;
    }, k * 1000);
  }

  await sleep(4000);

  //Set all clicks to start a race:
  document.getElementById('mazeResetBtn').click();
  document.getElementById('fastSpeedBtn').click();
  generateMaze(viewPort);
  document.getElementById('dfsBtn').click();
  document.getElementById('findPathBtn').click();
  document.getElementById('bfsBtn').click();
  document.getElementById('findPathBtn').click();
  mazeRaceSelected(document.getElementById('mazeRaceBtn'))
}

function findPath() {
  if (findingAlg == DFS_ALG) {
    DFS(vertices[startingPoint]);
  } else {
    BFS(vertices[startingPoint]);
  }
  nextStartingPoint();
}

function nextStartingPoint() {
  if (startingPoint == MAZE_START) {
    startingPoint = mazeSize;
  }
}

function generateMaze(viewPort) {
  mazeReset(viewPort);
  let size = mazeSize;

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
  generateFinishPoint(size);
}

function generateFinishPoint(size) {
  let r = Math.floor((Math.random() * (size ** 2)) + 1);
  vertices[r].isFinish = true;
  let div = vertices[r].div
  div.style.backgroundImage = "linear-gradient(200deg, #fff75e, #ff8800)";
}

function generateMazeGrid(size, viewPort) {

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
    if (v.isFinish == true) {
      return;
    }
    if (!v.isDFSMarked) {
      v.isDFSMarked = true;
      v.div.classList.add("dfsMarked");
      v.div.classList.remove("bfsMarked");
      v.adjList.forEach(v => stack.push(v));
    }
    await sleep(findingDelay);
  }
}

async function BFS(vertex) {
  let queue = [];
  vertex.div.classList.add("bfsMarked");
  queue.push(vertex);
  while (queue.length > 0) {
    let v = queue.shift();
    if (v.isFinish == true) {
      return;
    }
    v.adjList.forEach(u => {
      if (!u.isBFSMarked) {
        v.isBFSMarked = true;
        u.div.classList.add("bfsMarked");
        u.div.classList.remove("dfsMarked");
        queue.push(u);
      }
    })
    await sleep(findingDelay);
  }
}

function found();

function mazeReset(viewPort) {
  let view = document.querySelector('.' + viewPort);
  view.innerHTML = "";

  cells = [];
  components = [];

  vertices = [1];
  edges = [];
  startingPoint = MAZE_START;
}

function dfsSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("bfsBtn");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("mazeRaceBtn");
  if (b2.classList.contains("selectedButton")) {
    b2.classList.remove("selectedButton");
  }

  findingAlg = DFS_ALG;
}

function bfsSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("dfsBtn");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("mazeRaceBtn");
  if (b2.classList.contains("selectedButton")) {
    b2.classList.remove("selectedButton");
  }

  findingAlg = BFS_ALG;
}

function mazeRaceSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("bfsBtn");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("dfsBtn");
  if (b2.classList.contains("selectedButton")) {
    b2.classList.remove("selectedButton");
  }

  sortingAlg = QUICK;
  selectedBtn = QUICK;
}

function smallMazeSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("mediumMaze");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("largeMaze");
  if (b2.classList.contains("selectedButton")) {
    b2.classList.remove("selectedButton");
  }

  mazeSize = MIN_MAZE_SIZE;
}

function mediumMazeSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("smallMaze");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("largeMaze");
  if (b2.classList.contains("selectedButton")) {
    b2.classList.remove("selectedButton");
  }

  mazeSize = MID_MAZE_SIZE;
}

function largeMazeSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("smallMaze");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("mediumMaze");
  if (b2.classList.contains("selectedButton")) {
    b2.classList.remove("selectedButton");
  }

  mazeSize = MAX_MAZE_SIZE;
}

function slowSpeedSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("fastSpeedBtn");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  findingDelay = MAX_FINDING_DELAY;
}

function fastSpeedSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("slowSpeedBtn");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  findingDelay = MIN_FINDING_DELAY;
}
