window.onload = function() {
  var SQUARES_LENGTH = 6;
  var correctIndex = Math.floor(Math.random() * 6);
  var colorForCorrectIndex = generateRandomColor();
  var gameStatus = true;
  document.querySelector(".guess-color").innerHTML = colorForCorrectIndex;
  const colors = formColorSquares(
    SQUARES_LENGTH,
    correctIndex,
    colorForCorrectIndex
  );
  renderColorsArray(colors);
  computeGameStatus(gameStatus);
  addEventListenersToSquares(colorForCorrectIndex);

  function formColorSquares(length, correctIndex, colorForCorrectIndex) {
    const colors = [];
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

  function computeGameStatus(gameStatus) {
    var gameStatusDisplay = document.querySelector(".game-status");
    gameStatusDisplay.innerHTML = gameStatus ? "NEW COLORS" : "PLAY AGAIN!!";
    gameStatusDisplay.addEventListener("click", () =>
      document.location.reload()
    );
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

  function addEventListenersToSquares(colorForCorrectIndex) {
    const nodeList = document.querySelectorAll(".box");
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
          node.style.backgroundColor = "transparent";
        }
      });
    });
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
      node.style.backgroundColor = colorForCorrectIndex;
    });
  }
  function generateRandomColor() {
    var x = Math.floor(Math.random() * 256);
    var y = Math.floor(Math.random() * 256);
    var z = Math.floor(Math.random() * 256);
    var bgColor = "rgb(" + x + "," + y + "," + z + ")";
    return bgColor;
  }
};
