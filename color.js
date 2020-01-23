window.onload = function() {
  let SQUARES_LENGTH = 6;
  var correctIndex = Math.floor(Math.random() * SQUARES_LENGTH);
  var colorForCorrectIndex = generateRandomColor();
  var gameStatus = true;
  document.querySelector(".guess-color").innerHTML = colorForCorrectIndex;

  function formLevels() {
    // var sectionToShowLevels = document.getElementsByClassName("select-level");
    // console.log("formlevels", sectionToShowLevels);
    // var easyDiv = document.createElement("Div");
    // var easytextnode = document.createTextNode("Easy");
    // easyDiv[0].appendChild(easytextnode);
    // console.log(easyDiv);
    // sectionToShowLevels.appendChild(easyDiv);
    // var hardDiv = document.createElement("Div");
    // var hardtextnode = document.createTextNode("Hard");
    // hardDiv[1].appendChild(hardtextnode);
    // console.log(hardDiv);
    // sectionToShowLevels.appendChild(hardDiv);
  }

  function formColorSquares(length, correctIndex, colorForCorrectIndex) {
    var colors = [];
    for (i = 0; i < length; i++) {
      let colorObj = {};
      colorObj = {
        id: i,
        color: i !== correctIndex ? generateRandomColor() : colorForCorrectIndex
      };
      colors.push(colorObj);
    }
    return colors;
  }

  function reset(length) {
    computeGameStatus(true);
    document.querySelector(".color-code").style.backgroundColor = "black";
    formLevels();
    var correctIndex = Math.floor(Math.random() * length);
    var colorForCorrectIndex = generateRandomColor();
    var colors = formColorSquares(
      SQUARES_LENGTH,
      correctIndex,
      colorForCorrectIndex
    );
    renderColorsArray(colors);
    addEventListenersToSquares(colorForCorrectIndex);
  }

  function computeGameStatus(gameStatus) {
    var gameStatusDisplay = document.querySelector(".game-status");
    gameStatusDisplay.innerHTML = gameStatus ? "NEW COLORS" : "PLAY AGAIN!!";
    gameStatusDisplay.addEventListener("click", () => reset(SQUARES_LENGTH));
  }

  function renderColorsArray(squares) {
    var colorSquares = document.querySelector(".colors-container");
    colorSquares.innerHTML =
      "<div class='colors-div'>" +
      squares
        .map(function(item) {
          return (
            `<div class=box style=background-color:${item.color}>` + "</div>"
          );
        })
        .join("") +
      "</div>";
  }

  function showGameCompleteAppColors(
    nodeList,
    guessColorContainer,
    colorForCorrectIndex
  ) {
    gameStatus = false;
    computeGameStatus(gameStatus);
    guessColorContainer.style.backgroundColor = colorForCorrectIndex;
    nodeList.forEach(node => {
      node.style.visibility = "visible";
      node.style.backgroundColor = colorForCorrectIndex;
    });
  }

  function addEventListenersToSquares(colorForCorrectIndex) {
    var nodeList = document.querySelectorAll(".box");
    nodeList.forEach(node => {
      node.addEventListener("click", () => {
        if (
          node.style.backgroundColor.split(" ").join("") ==
          colorForCorrectIndex.split(" ").join("")
        ) {
          showGameCompleteAppColors(
            nodeList,
            document.querySelector(".color-code"),
            colorForCorrectIndex
          );
        } else {
          node.style.visibility = "hidden";
        }
      });
    });
  }

  function generateRandomColor() {
    const x = Math.floor(Math.random() * 256);
    const y = Math.floor(Math.random() * 256);
    const z = Math.floor(Math.random() * 256);
    const bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
  }
  formLevels();
  const colors = formColorSquares(
    SQUARES_LENGTH,
    correctIndex,
    colorForCorrectIndex
  );
  renderColorsArray(colors);
  computeGameStatus(gameStatus);
  addEventListenersToSquares(colorForCorrectIndex);
};
