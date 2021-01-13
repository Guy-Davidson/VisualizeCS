function updatearraySizeSliderPick(size) {
  // update selected value to slider view button:
  document.getElementById('arraySizeSliderPick').value = size;

  //selcet view port and create 'size' bars:
  let view = document.querySelector('.view');
  view.innerHTML = "";

  for (let i = 0; i < size; i++) {

    const newDiv = document.createElement("div");
    newDiv.className = "elem" + i;

    const newDivSpan = document.createElement("span");
    let barVal = Math.floor((Math.random() * 100) + 1);
    let t = document.createTextNode(barVal);
    newDivSpan.style.color = arrayBarNumberColor(barVal);
    newDiv.style.width = barVal + "%";
    newDiv.style.backgroundColor = arrayBarColor(barVal);
    newDivSpan.appendChild(t);
    newDiv.appendChild(newDivSpan);

    view.appendChild(newDiv);

  }
}

function arrayBarColor(barVal) {
  if (barVal < 10) {
    return "#041D61";
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

function reset() {
  document.getElementById('arraySizeSliderPick').value = 0;

  let view = document.querySelector('.view');
  view.innerHTML = "";
}

function bubbleSortSelected(_this) {
  _this.style.backgroundColor = "#F0883E";
  let sortTypePort = document.querySelector('.sortType');
  let lastSpan = sortTypePort.querySelector("span");
  if (lastSpan) {
    sortTypePort.removeChild(lastSpan);
  }
}

function notbubbleSortSelected(_this) {
  let sortTypePort = document.querySelector('.sortType');
  let lastSpan = sortTypePort.querySelector("span");
  if (lastSpan) {
    sortTypePort.removeChild(lastSpan);
  }
  const newSpan = document.createElement("span");
  const t = document.createTextNode("currently only bubble sort is implemented.");
  newSpan.appendChild(t);
  sortTypePort.appendChild(newSpan);
}

function sort() {
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
      }
    }
  }
}