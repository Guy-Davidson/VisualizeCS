//Global vars:
let sortingSpeed = 100;
let sortingAlg = 1 // 1:bubble, 2:merge, 3:quick
let firstMerge = 1;


// Sorting Algorithm Selector:
function bubbleSortSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("mergeSortBtn");
  if (b1) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("quickSortBtn");
  if (b2) {
    b2.classList.remove("selectedButton");
  }

  sortingAlg = 1;

}

function mergeSortSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("bubbleSortBtn");
  if (b1) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("quickSortBtn");
  if (b2) {
    b2.classList.remove("selectedButton");
  }

  sortingAlg = 2;

}

function quickSortSelected(_this) {
  _this.classList.toggle("selectedButton");

  let b1 = document.getElementById("bubbleSortBtn");
  if (b1) {
    b1.classList.remove("selectedButton");
  }

  let b2 = document.getElementById("mergeSortBtn");
  if (b2) {
    b2.classList.remove("selectedButton");
  }

  sortingAlg = 3;
}

// Array Size Selector:

function updatearraySizeSliderPick(size) {
  // update selected value to slider view button:
  document.getElementById('arraySizeSliderPick').value = size;

  //selcet view port and create 'size' bars:
  let view = document.querySelector('.view');
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

function sort() {
  if (sortingAlg === 1) {
    bubbleSort();

  } else if (sortingAlg === 2) {

    let view = document.querySelector('.view');
    let bars = view.querySelectorAll("div");

    mergeSort(0, bars.length - 1);

  } else {
    quickSort();
  }
}

async function bubbleSort() {
  let view = document.querySelector('.view');
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
}

function mergeSort(l, r) {

  if (r > l) {
    let m = Math.floor((l + r) / 2);

    mergeSort(l, m);
    mergeSort(m + 1, r);
    merge(l, m, r);
  }
}

async function merge(l, m, r) {
  let view = document.querySelector('.view');
  let bars = view.querySelectorAll("div");

  //used to mark correct insertion place:
  let indexDiv = document.createElement("div");
  view.appendChild(indexDiv);
  view.insertBefore(indexDiv, bars[l]);

  //left and right arrays indexes:
  let i = l;
  let j = m + 1;

  while (i <= m && j <= r) {
    // if (!firstMerge) {
    //   await sleep(100);
    // } else {
    //   firstMerge = 0;
    // }
    //
    let val1 = parseInt(bars[i].firstChild.textContent);
    let val2 = parseInt(bars[j].firstChild.textContent);

    if (val1 < val2) {
      view.insertBefore(bars[i], indexDiv);
      i++;
    } else {
      view.insertBefore(bars[j], indexDiv);
      j++;
    }
  }
  view.removeChild(indexDiv);
}

function quickSort() {
  let b = 6;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}