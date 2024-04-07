var current_user = checkUserAlive();
var board = [];
initialize();

function initialize(){
    let board_grid= document.querySelector('.board_grid');
    for (let row = 0; row < 6; row++) {
        let boardRow=[];
        for (let col = 0; col < 7; col++) {
            let circle = document.createElement("div");
            circle.classList.add('circle');
            board_grid.append(circle);
            boardRow.push(circle);
        }
        board.push(boardRow);
    }

    let boardRow=[];
    for (let col = 0; col < 7; col++) {
        let triangle = document.createElement("div");
        triangle.classList.add('triangle');
        triangle.classList.add(`${col}`);
        board_grid.append(triangle);
        triangle.addEventListener('click', applayChoose);
    }
}

//----------------------------games----------------------------

function applayChoose() {
    let colIndex = parseInt(this.classList[1], 10);
    for (let index = 5; index >= 0; index--) {
        let circle = board[index][colIndex];
        if (!circle.classList.contains('green_circle') && !circle.classList.contains('red_circle')) {
            circle.classList.add('green_circle');
            checkVictory('green_circle');
            findCircleComputer(); 
            break;
        }
    }  
}
    
//----------------------------private methods----------------------------

function findCircleComputer(){
    let colIndex = Math.floor(Math.random() * 7);
    for (let index = 5; index >= 0; index--) {
    let circle = board[index][colIndex];
    if (!circle.classList.contains('green_circle') && !circle.classList.contains('red_circle')) {
        circle.classList.add('red_circle');
            checkVictory('red_circle');
            break;
        }
    }
}

function checkVictory(color) {
    // Check rows
    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[row].length - 3; col++) {
            if (
                board[row][col].classList.contains(color) &&
                 board[row][col + 1].classList.contains(color) &&
               board[row][col + 2].classList.contains(color) &&
                board[row][col + 3].classList.contains(color)
            ) {
                announceWinner(color);
            }
        }
    }

    // Check columns
    for (let col = 0; col < board[0].length; col++) {
        for (let row = 0; row < board.length - 3; row++) {
            if (
                board[row][col].classList.contains(color) &&
                board[row + 1][col].classList.contains(color) &&
                 board[row + 2][col].classList.contains(color) &&
                board[row + 3][col].classList.contains(color)
            ) {
                announceWinner(color);
            }
        }
    }

    // Check diagonals (from top-left to bottom-right)
    for (let row = 0; row < board.length - 3; row++) {
        for (let col = 0; col < board[row].length - 3; col++) {
            if (
                board[row][col].classList.contains(color)&&
               board[row + 1][col + 1].classList.contains(color) &&
                board[row + 2][col + 2].classList.contains(color) &&
               board[row + 3][col + 3].classList.contains(color)
            ) {
                announceWinner(color);
            }
        }
    }

    // Check diagonals (from bottom-left to top-right)
    for (let row = 3; row < board.length; row++) {
        for (let col = 0; col < board[row].length - 3; col++) {
            if (
                board[row][col].classList.contains(color)&&
               board[row - 1][col + 1].classList.contains(color) &&
                board[row - 2][col + 2].classList.contains(color) &&
                board[row - 3][col + 3].classList.contains(color)
            ) {
                announceWinner(color);
            }
        }
    }
    // If no winner found
    return 0;
}
    
//----------------------------end game----------------------------
    
function announceWinner(color) {
    if(color === 'green_circle')
        current_user.info.four_row_score = parseInt(current_user.info.four_row_score,10) + 1
    saveScore(parseInt(current_user.info.four_row_score, 10), 'four_row');

    const restartGame = confirm(`The game ended and ${color} player won!
                                    Do you want to restart the game?`);
    if (restartGame) {
        location.reload();
    } else {
        alert("Thank you for playing!");
        window.location.href = "../html/homePage.html";
    }
}
