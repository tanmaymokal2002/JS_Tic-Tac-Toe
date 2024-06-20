var board;
var playerO = "O";
var playerX = "X";
var currPlayer = playerO;
var gameOver = false;

window.onload = function () {
  setGame();
};

function setGame() {
  board = [
    [" ", " ", " "],
    [" ", " ", " "],
    [" ", " ", " "],
  ];

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let tile = document.createElement("div");

      tile.id = r.toString() + "-" + c.toString();
      tile.classList.add("tile");
      if (r == 0 || r == 1) {
        tile.classList.add("horizontal-line");
      }
      if (c == 0 || c == 1) {
        tile.classList.add("vertical-line");
      }

      tile.addEventListener("click", setTile);
      document.getElementById("board").append(tile);
    }
  }
}

function setTile() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-"); // 1-1 => ['1', '1']
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);

  //check if tile is already taken:
  if (board[r][c] != " ") {
    return;
  }

  board[r][c] = currPlayer;
  this.innerText = currPlayer;

  if (currPlayer == playerO) {
    currPlayer = playerX;
  } else {
    currPlayer = playerO;
  }

  checkWinner();
}

function checkWinner() {
  //horizontally, check 3 rows
  for (let r = 0; r < 3; r++) {
    if (
      board[r][0] == board[r][1] &&
      board[r][1] == board[r][2] &&
      board[r][0] != " "
    ) {
      //if we found the winning row
      //apply the winner style to that row
      for (let i = 0; i < 3; i++) {
        let tile = document.getElementById(r.toString() + "-" + i.toString());
        tile.classList.add("winner");
      }
      gameOver = true;
      return;
    }
  }

  //vertically win checking
  for (let c = 0; c < 3; c++) {
    if (
      board[0][c] == board[1][c] &&
      board[1][c] == board[2][c] &&
      board[0][c] != " "
    ) {
      //if we found any winning col
      // apply the winner class to it
      for (let i = 0; i < 3; ++i) {
        let tile = document.getElementById(i.toString() + "-" + c.toString());
        tile.classList.add("winner");
      }
      gameOver = true;
      return;
    }
  }

  //diagonally
  if (
    board[0][0] == board[1][1] &&
    board[1][1] == board[2][2] &&
    board[0][0] != " "
  ) {
    for (let i = 0; i < 3; ++i) {
      let tile = document.getElementById(i.toString() + "-" + i.toString());
      tile.classList.add("winner");
    }
    gameOver = true;
    return;
  }

  //anti-diagonally
  if (
    board[0][2] == board[1][1] &&
    board[1][1] == board[2][0] &&
    board[0][2] != " "
  ) {
    //for 0-2:
    let tile = document.getElementById("0-2");
    tile.classList.add("winner");
    //for 1-1:
    tile = document.getElementById("1-1");
    tile.classList.add("winner");
    //for 2-0:
    tile = document.getElementById("2-0");
    tile.classList.add("winner");

    gameOver = true;
    return;
  }
}
