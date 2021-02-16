// My Sorting Visualizer

//Constants:
const MIN_ARRAY_SIZE = 25;
const MAX_ARRAY_SIZE = 125;

const MIN_SORTING_SPEED = 5;
const MAX_SORTING_SPEED = 40;

const MIN_SORTING_DELAY = 10;
const MAX_SORTING_DELAY = 50;

const BUBBLE = 1;
const MERGE = 2;
const QUICK = 3;
const RACE = 4;


//Global vars:
let sortingSpeed = MAX_SORTING_SPEED;
let sortingDelay = MIN_SORTING_DELAY;
let sortingAlg = BUBBLE;
let isFirstToFinish = 1;
let selectedBtn = RACE;

//Set Race!
async function race() {
  // reset:
  isFirstToFinish = 1;
  sortingDelay = MIN_SORTING_DELAY;
  let sortingSpeedSlider = document.getElementById("sortingSpeedSlider");
  sortingSpeedSlider.value = MAX_SORTING_SPEED;
  let arraySizeSlider = document.getElementById("arraySizeSlider");
  arraySizeSlider.value = MAX_ARRAY_SIZE;
  let view = document.querySelector('.view');
  view.innerHTML = "";

  //count down:
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

  view.innerHTML = "";
  view.style.display = "flex";
  view.style.textAlign = "left";

  let sortingTypes = document.querySelectorAll('.sortTypeButtons input');

  // create sub views:
  for (let i = 0; i < sortingTypes.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.style.width = (100 / sortingTypes.length) + '%';
    newDiv.classList.add('viewport' + i);
    newDiv.style.borderColor = "red";
    view.appendChild(newDiv);
    updatearraySizeSliderPick(MAX_ARRAY_SIZE, 'viewport' + i);
  }

  //Set Buble Sort
  const newSpan0 = document.createElement("span");
  let text0 = document.createTextNode("Bubble Sort");
  newSpan0.appendChild(text0);
  document.querySelector('.viewport' + 0).appendChild(newSpan0);
  bubbleSort('viewport' + 0);



  //Set merge sort
  const newSpan1 = document.createElement("span");
  let text1 = document.createTextNode("Merge Sort");
  newSpan1.appendChild(text1);
  document.querySelector('.viewport' + 1).appendChild(newSpan1);


  let viewPort1 = document.querySelector('.viewport' + 1);
  let bars1 = viewPort1.querySelectorAll("div");

  mergeSort(0, bars1.length - 1, 'viewport' + 1);

  //Set Quick Sort
  const newSpan2 = document.createElement("span");
  let text2 = document.createTextNode("Quick Sort");
  newSpan2.appendChild(text2);
  document.querySelector('.viewport' + 2).appendChild(newSpan2);


  let viewPort2 = document.querySelector('.viewport' + 2);
  let bars2 = viewPort2.querySelectorAll("div");

  quickSort(0, bars2.length - 1, 'viewport' + 2);
}

function winner(viewPort) {
  isFirstToFinish = 0

  let view = document.querySelector('.' + viewPort);
  let bars = view.querySelectorAll("div");
  view.style.borderColor = "#70e000";

  for (let i = 0; i < bars.length; i++) {
    const style = getComputedStyle(bars[i]);
    const backgroundColor = style.backgroundColor;

    setTimeout(() => {
      bars[i].style.backgroundColor = "#70e000";
    }, 10 * i);

    setTimeout(() => {
      bars[i].style.backgroundColor = backgroundColor;
    }, 11 * i);
  }
}

// Sorting Algorithm Selector:
function bubbleSortSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("mergeSortBtn");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("quickSortBtn");
  if (b2.classList.contains("selectedButton")) {
    b2.classList.remove("selectedButton");
  }

  let b3 = document.getElementById("setRaceBtn");
  if (b3.classList.contains("selectedButton")) {
    b3.classList.remove("selectedButton");
  }

  sortingAlg = BUBBLE;
  selectedBtn = BUBBLE;
}

function mergeSortSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("bubbleSortBtn");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("quickSortBtn");
  if (b2.classList.contains("selectedButton")) {
    b2.classList.remove("selectedButton");
  }

  let b3 = document.getElementById("setRaceBtn");
  if (b3.classList.contains("selectedButton")) {
    b3.classList.remove("selectedButton");
  }

  sortingAlg = MERGE;
  selectedBtn = MERGE;
}

function quickSortSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("bubbleSortBtn");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("mergeSortBtn");
  if (b2.classList.contains("selectedButton")) {
    b2.classList.remove("selectedButton");
  }

  let b3 = document.getElementById("setRaceBtn");
  if (b3.classList.contains("selectedButton")) {
    b3.classList.remove("selectedButton");
  }

  sortingAlg = QUICK;
  selectedBtn = QUICK;
}

function setRaceSelected(_this) {
  _this.classList.add("selectedButton");

  let b1 = document.getElementById("bubbleSortBtn");
  if (b1.classList.contains("selectedButton")) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("mergeSortBtn");
  if (b2.classList.contains("selectedButton")) {
    b2.classList.remove("selectedButton");
  }

  let b3 = document.getElementById("quickSortBtn");
  if (b3.classList.contains("selectedButton")) {
    b3.classList.remove("selectedButton");
  }

  selectedBtn = RACE;
  race();
}

// Array Size Selector:

function updatearraySizeSliderPick(size, viewPort) {

  //selcet view port and create 'size' bars:
  let view = document.querySelector('.' + viewPort);
  view.style.display = "block";
  view.innerHTML = "";

  for (let i = 0; i < size; i++) {

    const newDiv = document.createElement("div");
    const newDivSpan = document.createElement("span");

    let barVal = Math.floor((Math.random() * 100) + 1);
    let t = document.createTextNode(barVal);
    let h = (670 / size) - 4;

    newDivSpan.style.color = arrayBarNumberColor(barVal);
    newDivSpan.style.fontSize = h + "px";

    newDiv.style.lineHeight = h + "px";
    newDiv.style.fontSize = h + "px";
    newDiv.style.width = barVal + "%";
    newDiv.style.backgroundColor = arrayBarColor(barVal);

    newDivSpan.appendChild(t);
    newDiv.appendChild(newDivSpan);
    view.appendChild(newDiv);
  }
}

function arrayBarColor(barVal) {
  if (barVal < 10) {
    return "#001845";
  } else if (barVal < 20) {
    return "#2C306E";
  } else if (barVal < 30) {
    return "#12257A";
  } else if (barVal < 40) {
    return "#1A88C7";
  } else if (barVal < 50) {
    return "#4AA6CF";
  } else if (barVal < 60) {
    return "#13B9DB";
  } else if (barVal < 70) {
    return "#2ACAE6";
  } else if (barVal < 80) {
    return "#7EE5D9";
  } else if (barVal < 90) {
    return "#FFE3BC";
  } else {
    return "#E6FEFE";
  }
}

function arrayBarNumberColor(barVal) {
  if (barVal < 50) {
    return "#E6FEFE";
  }
  return "#0d1117";
}

// Sorting Speed Selcetor:
function updateSortingSpeedSliderPick(speed) {
  sortingSpeed = speed;
  sortingDelay = MAX_SORTING_DELAY - sortingSpeed;
}

//Sort & Reset:
function reset() {

  let view = document.querySelector('.view');
  view.innerHTML = "";

}

function sort(viewPort) {
  let view = document.querySelector('.' + viewPort);
  let bars = view.querySelectorAll("div");

  //check if any sorting alg was selected:
  if (selectedBtn == RACE) {
    let actionBtn = document.getElementById("chooseSA");
    let styles1 = getComputedStyle(actionBtn);
    let color = styles1.color;

    actionBtn.style.color = "#F0883E";
    setTimeout(() => {
      actionBtn.style.color = color;
    }, 500);

    return;
  }

  if (bars.length == 0 || bars.length > MAX_ARRAY_SIZE) {
    updatearraySizeSliderPick(MAX_ARRAY_SIZE, 'view');
  }

  view = document.querySelector('.' + viewPort);
  bars = view.querySelectorAll("div");

  if (sortingAlg === BUBBLE) {
    bubbleSort(viewPort);

  } else if (sortingAlg === MERGE) {

    mergeSort(0, bars.length - 1, viewPort);

  } else {
    quickSort(0, bars.length - 1, viewPort);
  }
}

async function bubbleSort(viewPort) {
  let view = document.querySelector('.' + viewPort);
  let bars = view.querySelectorAll("div");

  let n = bars.length
  let i = 0;
  let j = 0;

  for (i = 0; i < n - 1; i++) {

    for (j = 0; j < n - 1 - i; j++) {

      let val1 = parseInt(bars[j].firstChild.textContent);
      let val2 = parseInt(bars[j + 1].firstChild.textContent);

      if (val1 > val2) {
        view.insertBefore(bars[j + 1], bars[j]);
        bars = view.querySelectorAll("div");
        await sleep(sortingDelay);
      }
    }
  }

  if (isFirstToFinish && viewPort !== "view") {
    winner(viewPort);
  }
}

async function mergeSort(l, r, viewPort) {
  let view = document.querySelector('.' + viewPort);

  for (let m = 1; m <= r - l; m = 2 * m) {
    for (let i = l; i < r; i += 2 * m) {

      let from = i;
      let mid = i + m - 1;
      let to = Math.min(i + 2 * m - 1, r);
      // merge(from, mid, to):

      let bars = view.querySelectorAll("div");

      //left and right arrays indexes:
      let p = from;
      let j = mid + 1;
      let k = from;

      while (p <= mid && j <= to) {
        let val1 = parseInt(bars[p].firstChild.textContent);
        let val2 = parseInt(bars[j].firstChild.textContent);

        if (val1 < val2) {
          view.insertBefore(bars[p], view.querySelectorAll("div")[k]);
          p++;
        } else {
          view.insertBefore(bars[j], view.querySelectorAll("div")[k]);
          j++;
        }
        k++;
        await sleep(sortingDelay);
      }
    }
  }

  if (isFirstToFinish && viewPort !== "view") {
    winner(viewPort);
  }
}

async function quickSort(l, h, viewPort) {
  let view = document.querySelector('.' + viewPort);

  let stack = [h - l + 1];
  let top = -1;

  stack[++top] = l;
  stack[++top] = h;

  while (top >= 0) {

    h = stack[top--];
    l = stack[top--];

    //partiotion(l, h viewPort):

    //highlight pivot:
    let pivotDiv = view.querySelectorAll("div")[h];
    let pivotBG = pivotDiv.style.backgroundColor;
    let pivotBC = pivotDiv.style.borderColor;
    pivotDiv.style.backgroundColor = "#ff8800";
    pivotDiv.style.borderColor = "#fff75e";


    let x = parseInt(pivotDiv.firstChild.textContent);
    let i = (l - 1);
    for (let j = l; j <= h - 1; j++) {
      if (parseInt(view.querySelectorAll("div")[j].firstChild.textContent) <= x) {
        i++;
        view.insertBefore(view.querySelectorAll("div")[j], view.querySelectorAll("div")[i].nextSibling);
        view.insertBefore(view.querySelectorAll("div")[i], view.querySelectorAll("div")[j + 1]);
        await sleep(sortingDelay);
      }
    }

    if (i >= 0) {
      view.insertBefore(view.querySelectorAll("div")[h], view.querySelectorAll("div")[i].nextSibling);
    } else {
      view.insertBefore(view.querySelectorAll("div")[h], view.querySelectorAll("div")[0]);
    }
    await sleep(sortingDelay);

    //unhighlight pivot:
    pivotDiv.style.backgroundColor = pivotBG + "";
    pivotDiv.style.borderColor = pivotBC + "";


    let p = i + 1;

    if (p - 1 > l) {
      stack[++top] = l;
      stack[++top] = p - 1;
    }

    if (p + 1 < h) {
      stack[++top] = p + 1;
      stack[++top] = h;
    }
  }

  if (isFirstToFinish && viewPort !== "view") {
    winner(viewPort);
  }
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}