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
    newDiv.style.width = barVal + "%";
    newDivSpan.appendChild(t);
    newDiv.appendChild(newDivSpan);

    view.appendChild(newDiv);
  }
}