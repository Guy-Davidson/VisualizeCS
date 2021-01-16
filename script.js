//Constants:
const MIN_SORTING_DELAY = 5;
const MAX_SORTING_DELAY = 100;

const MIN_ARRAY_SIZE = 25;
const MAX_ARRAY_SIZE = 125;


//Global vars:
let sortingSpeed = 50;
let sortingAlg = 1 // 1:bubble, 2:merge, 3:quick
let halt = 1;
let isFirstToFinish = 1;


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

  sortingAlg = 1;
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

  sortingAlg = 2;
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

  sortingAlg = 3;
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

  race();
}

// Array Size Selector:

function updatearraySizeSliderPick(size, viewPort) {
  // update selected value to slider view button:
  document.getElementById('arraySizeSliderPick').value = size;

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
}


//Sort & Reset:
function reset() {

  document.getElementById('arraySizeSliderPick').value = 0;

  let view = document.querySelector('.view');
  view.innerHTML = "";

}

function sort(viewPort) {
  if (sortingAlg === 1) {
    bubbleSort(viewPort);

  } else if (sortingAlg === 2) {

    let view = document.querySelector('.' + viewPort);
    let bars = view.querySelectorAll("div");

    mergeSort(0, bars.length - 1, viewPort);

  } else {
    quickSort();
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
        await sleep(sortingSpeed);
      }
    }
  }

  if (isFirstToFinish && viewPort !== "view") {
    isFirstToFinish = 0
    view.style.borderWidth = "3px";
    view.style.borderColor = "green";
  }
}


async function mergeSort(l, r, viewPort) {
  let view = document.querySelector('.' + viewPort);

  for (let m = 1; m <= r - l; m = 2 * m) {
    for (let i = l; i < r; i += 2 * m) {

      let from = i;
      let mid = i + m - 1;
      let to = Math.min(i + 2 * m - 1, r);
      // merge(from, mid, to);

      // let view = document.querySelector('.' + viewPort);
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
        await sleep(sortingSpeed);
      }
    }
  }

  if (isFirstToFinish && viewPort !== "view") {
    isFirstToFinish = 0
    view.style.borderWidth = "3px";
    view.style.borderColor = "green";
  }
}


function quickSort() {
  let b = 6;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

//Race
function race() {
  isFirstToFinish = 1;
  sortingSpeed = MIN_SORTING_DELAY;
  let view = document.querySelector('.view');
  view.innerHTML = "";
  view.style.display = "flex";

  let sortingTypes = document.querySelectorAll('.sortTypeButtons input');

  for (let i = 0; i < sortingTypes.length; i++) {
    const newDiv = document.createElement("div");
    newDiv.style.width = (100 / sortingTypes.length) + '%';
    newDiv.classList.add('viewport' + i);
    // newDiv.style.borderColor = "#E6FEFE";
    newDiv.style.borderColor = "red";
    view.appendChild(newDiv);
    updatearraySizeSliderPick(MAX_ARRAY_SIZE, 'viewport' + i);
  }

  //Set Buble sort
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


  let viewPort = document.querySelector('.viewport' + 1);
  let bars = viewPort.querySelectorAll("div");

  mergeSort(0, bars.length - 1, 'viewport' + 1);
}