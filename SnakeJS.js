let inputDir = { x: 0, y: 0 };
let foodSound = new Audio('music/food.mp3');
let gameOverSound = new Audio('music/gameover.mp3');
let moveSound = new Audio('music/move.mp3');
let musicSound = new Audio('music/music.mp3');
let snakeAr = [{ x: 9, y: 10 }]
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let food = { x: 6, y: 12 };
let scr = document.getElementById('score');
let hiscoreval = 0;
let hiscore;
let hs = document.getElementById('highScore');
let md;
let mode = document.getElementById('mode');
let pmsc = 0;
// game functions

easyMode();  // start the game in easy mode always

function main(ctime) {
    ///console.log(ctime);
    window.requestAnimationFrame(main);  // JS asks browser to repaint it and its asynchronous so till browser does something below lines will run 
    if ((ctime - lastPaintTime) / 1000 < 1/speed) {
        return;
    }
    lastPaintTime = ctime;
    
    //console.log('Hi');
   
    gameEngine();
    
}

function isCollide(snakeAr) {
    // if collided with itself
    for (let i = 1; i < snakeAr.length; i++) {
        if (snakeAr[i].x === snakeAr[0].x && snakeAr[i].y === snakeAr[0].y) {
            return true;
        }
    }

    // collided to wall
    if (snakeAr[0].x >= 18 || snakeAr[0].x <= 0 || snakeAr[0].y >= 18 || snakeAr[0].y <= 0) {
        return true;
    }

    return false;
}


function gameEngine() {
    //updating the snake array and food
   //  musicSound.play();

    if (isCollide(snakeAr)) {
        gameOverSound.play();
        musicSound.pause();
        inputDir = { x: 0, y: 0 };
        alert("Game Over. Press any key to play again !!!");
        snakeAr = [{ x: 9, y: 10 }];
        //musicSound.play();
        score = 0;
        if (md == 'easy') {
            speed = 5;
        }
        else if (md == 'medium') {
            speed = 7;
        }
        else {
            speed = 10;
        }
        scr.innerHTML = "Score: " + score;
    }


    // if eaten food , increament score and regenrate food
    if (snakeAr[0].y === food.y && snakeAr[0].x === food.x) {
        foodSound.play();
        score += 1;
        speed += 0.5;
        if (score > hiscoreval) {
            hiscoreval = score;
            localStorage.setItem(`hiscore${md}`, JSON.stringify(hiscoreval));
            hs.innerHTML = `HighScore : ${hiscoreval}`;
        }

        scr.innerHTML = "Score: " + score;
        snakeAr.unshift({ x: snakeAr[0].x + inputDir.x, y: snakeAr[0].y + inputDir.y });
        let a = 2;
        let b = 16;
        food = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) };
    }

    // moving the snake
    for (let i = snakeAr.length - 2; i >= 0; i--) {
        snakeAr[i + 1] = { ...snakeAr[i] };  // using spread operator to make new copy and then point else = operator will copy the refernce and eventually all will have snake head reference 
    }

    snakeAr[0].x += inputDir.x;
    snakeAr[0].y += inputDir.y;


    // display the snake 
    board.innerHTML = "";
    snakeAr.forEach((e, index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if (index === 0) {
            snakeElement.classList.add('head');
        }
        else {
            snakeElement.classList.add('snake');
        }
        
        board.appendChild(snakeElement);
    });


    //display of food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}





// logics for highScore , game loop and keyboard listners



function getHS(md)
{
    hiscore = localStorage.getItem(`hiscore${md}`);

    if (hiscore == null) {
        hiscoreval = 0;
        localStorage.setItem(`hiscore${md}`, JSON.stringify(hiscoreval));
        hs.innerHTML = `HighScore : ${hiscoreval}`;
    }
    else {
        hiscoreval = JSON.parse(hiscore);
        hs.innerHTML = `HighScore : ${hiscore}`;
    }
}


function easyMode() {
    inputDir = { x: 0, y: 0 };
    snakeAr = [{ x: 9, y: 10 }];
    score = 0;
    speed = 5;
    md = 'easy';
    getHS(md);
    mode.innerHTML = `Playing easy mode`;
    document.getElementById('easy').classList.add('bd');
    document.getElementById('medium').classList.remove('bd');
    document.getElementById('hard').classList.remove('bd');
    scr.innerHTML = "Score: " + score;
}

function hardMode() {
    inputDir = { x: 0, y: 0 };
    snakeAr = [{ x: 9, y: 10 }];
    score = 0;
    speed = 10;
    md = 'hard';
    getHS(md);
    mode.innerHTML = `Playing hard mode`;
    document.getElementById('hard').classList.add('bd');
    document.getElementById('easy').classList.remove('bd');
    document.getElementById('medium').classList.remove('bd');
    scr.innerHTML = "Score: " + score;
}

function mediumMode() {
    inputDir = { x: 0, y: 0 };
    snakeAr = [{ x: 9, y: 10 }];
    score = 0;
    speed = 7;
    md = 'medium';
    getHS(md);
    mode.innerHTML = `Playing medium mode`;
    document.getElementById('medium').classList.add('bd');
    document.getElementById('easy').classList.remove('bd');
    document.getElementById('hard').classList.remove('bd');
    scr.innerHTML = "Score: " + score;
}

// starting the game loop
window.requestAnimationFrame(main);

//event listners to move the snake
window.addEventListener('keydown', (e) => {
    inputDir = { x: 0, y: 1 };   // start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            // console.log("ArrowUP");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            // console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            // console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            // console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
           break;
    }
});