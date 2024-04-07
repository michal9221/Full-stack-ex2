var current_user = checkUserAlive();
var successLetters = document.getElementById('successLetters');
var amountLetters = document.getElementById('amountLetters');
initialize()


function initialize(){
    //add event lisener to the level radio.
    const inputs = document.getElementsByName('choose_level');
    for(let i = 0; i < inputs.length; i++)
    inputs[i].addEventListener('change', startGame);
}

//-----------------------------start & end game-----------------------------

function startGame(){
    let board = document.querySelector('section');
    //clean board
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    let level = parseInt(findCheckedInput(), 10);
    amountLetters.textContent = level*4;
    successLetters.textContent = 0;
    
    for (let i = 0; i < level*4; i++) {
        // Create circle element
        const circle = document.createElement('div');
        circle.classList.add('circle');
        let letter = document.createElement('span');
        letter.textContent = getRandomLetter();
        circle.appendChild(letter);
        circle.style.backgroundColor = getRandomColor();
        circle.addEventListener('click', writeLetter);
        
        //applay animation
        const containerWidth = (parseInt(document.querySelector('.game').offsetWidth,10)-4.1*16);
        const containerHeight = (parseInt(document.querySelector('.game').offsetHeight,10)-4.1*16);
        applayAnimation(circle, containerWidth, containerHeight, level);

        // Append circle to section
        board.append(circle);
    }
}

function checkEnd(){
    if(document.querySelector('section').firstElementChild === null){
        let s = parseInt(successLetters.textContent,10)
        let a = parseInt(amountLetters.textContent,10)
        saveScore(s/a, 'letters');
        alert(`YOU DID IT!! YOUR SCORE IS ${s/a}`)
    }
}

//-----------------------private method to create game-----------------------

function getRandomLetter() {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    return alphabet[Math.floor(Math.random() * alphabet.length)];
}

function getRandomColor() {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    return `rgb(${r},${g},${b})`;
}

function findCheckedInput() {
    const inputs = document.getElementsByName('choose_level');

    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked) {
            return inputs[i].value;
        }
    }
}

//-----------------------------click on a letter-----------------------------

function writeLetter(){
    this.firstChild.style.display = 'none';
    let text = document.createElement('input');
    text.classList.add('input');
    text.addEventListener('keypress', itemKeypress);
    this.append(text);
    text.focus();
    this.removeEventListener('click', writeLetter);
}

function itemKeypress() {
    if (event.which === 13) {
        if(this.parentElement.firstChild.textContent === this.value){
            alert('WONDERFULL!!!')
            successLetters.textContent  = parseInt(successLetters.textContent,10) + 1;
        }
        this.parentElement.parentElement.removeChild(this.parentElement);
        checkEnd();
    }
}

//----------------------------------animation----------------------------------

function generateRandomValue(val) {
    return Math.random() * val; 
}

function applayAnimation(circle, containerWidth, containerHeight, level){
    circle.animate([
        { top: `${generateRandomValue(containerHeight)}px`, right: `${generateRandomValue(containerWidth)}px`},
        { top: `${generateRandomValue(containerHeight)}px`, right: `${generateRandomValue(containerWidth)}px`},
        { top:`${generateRandomValue(containerHeight)}px`, right: `${generateRandomValue(containerWidth)}px`},
        { top:`${generateRandomValue(containerHeight)}px`, right: `${generateRandomValue(containerWidth)}px`},
        { top:`${generateRandomValue(containerHeight)}px`, right: `${generateRandomValue(containerWidth)}px`},
        { top:`${generateRandomValue(containerHeight)}px`, right: `${generateRandomValue(containerWidth)}px`}
      ], {
        duration: 17000 + (3-level)*600, //milliseconds
        easing: 'linear', 
        delay: 0, 
        iterations: Infinity, 
        direction: 'alternate', 
        fill: 'forwards' 
      });
}


