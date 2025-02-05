const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

document.body.addEventListener("keydown", handleTyping);

const speedSlider = document.getElementById("speedSlider");
const enemySlider = document.getElementById("enemySlider");
const levelSlider = document.getElementById("levelSlider");
const speedValue = document.getElementById("speedValue");
const enemyValue = document.getElementById("enemyValue");
const levelValue = document.getElementById("levelValue");
const scoreValue = document.getElementById("score");
const wpmValue = document.getElementById("wpm");
const cpmValue = document.getElementById("cpm");
const textValue = document.getElementById("textValue");

const enemies = [];
const destroyed = [];
let score = 0;
let enemySpeed = parseInt(speedSlider.value);
let maxEnemies = parseInt(enemySlider.value);
let playerLevel = parseInt(levelSlider.value);
let inputBuffer = "";
let lastEnemyTime = 0;
let lastUpdateTime = 0;
let date = new Date();
let wpmSpeed = enemySpeed;
let wpmInterval = 60000 / wpmSpeed;
let screenTime = wpmInterval * maxEnemies;

speedValue.textContent = enemySpeed;
enemyValue.textContent = maxEnemies;
levelValue.textContent = playerLevel;

speedSlider.addEventListener("input", () => {
    enemySpeed = parseInt(speedSlider.value);
    enemies.forEach(enemy => enemy.speed = enemySpeed / 10);
    speedValue.textContent = enemySpeed;
    wpmSpeed = enemySpeed;
    wpmInterval = 60000 / wpmSpeed;
    screenTime = wpmInterval * maxEnemies;
});

enemySlider.addEventListener("input", () => {
    maxEnemies = parseInt(enemySlider.value);
    enemyValue.textContent = maxEnemies;
    screenTime = wpmInterval * maxEnemies;
});

levelSlider.addEventListener("input", () => {
    playerLevel = parseInt(levelSlider.value);
    levelValue.textContent = playerLevel;
});

class Enemy {
    constructor(level, x, speed) {
        this.level = level;
        this.x = x;
        this.y = 0;
        this.speed = speed;
        this.text = this.generateCode(level);
    }

    generateString(len, chars) {
        let ret = "";
        var i;
        for (i=0; i<len; i++) {
            const idx = Math.floor(Math.random() * chars.length);
            ret += chars.charAt(idx);
        }
        return ret;
    }

    generateCode(level) {
        let ret = "x";
        if (level <= 5) {
            ret = this.generateString(level, "fj");
        }
        //return Math.random().toString(36).substring(2, 6);
        return ret;
    }

    update() {
        this.y += this.speed;
    }

    update2(move) {
        this.y += move;
    }

    draw() {
        //ctx.fillStyle = "orange";
        //ctx.fillRect(this.x, this.y, 50, 50);
        ctx.strokeStyle = "orange";
        //ctx.strokeRect(this.x, this.y, 50, 50);
        //ctx.fillStyle = "black";
        //ctx.fillText(this.text, this.x + 10, this.y + 30);
        ctx.font = "24px sans-serif";
        ctx.fillStyle = "orange";
        //ctx.strokeText(this.text, this.x + 10, this.y + 30);
        ctx.fillText(this.text, this.x + 10, Math.floor(this.y) + 30);
    }
}

function spawnEnemy() {
    date = new Date();
    time = date.getTime();
    //if (enemies.length < maxEnemies) {
        range = (playerLevel >= 20) ? 20 : playerLevel;
        const level = Math.floor(Math.random() * range) + 1;
        const x = Math.random() * (canvas.width - 50);
        enemies.push(new Enemy(level, x, enemySpeed / 10));
        lastEnemyTime = time;
    //}
}

function updateGame() {
    date = new Date();
    time = date.getTime();
    if ( lastUpdateTime == 0 ) {
        move = 1;
    } else {
        elapsedTime = (time - lastUpdateTime);
        //screenTime = wpmInterval * maxEnemies;
        move = canvas.height * elapsedTime / screenTime;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if ( (time - lastEnemyTime) > wpmInterval || lastEnemyTime == 0) {
        spawnEnemy();
        //wpmValue.textContent = move.toString();
        //cpmValue.textContent = enemies.length.toString();
    }
    for (let i = enemies.length - 1; i >= 0; i--) {
        enemies[i].update2(move);
        enemies[i].draw();

        if (enemies[i].y > canvas.height) {
            score -= enemies[i].level;
            if (score < 0) {
                score = 0;
            }
            enemies.splice(i, 1); // Remove enemies that move out of bounds
            //cpmValue.textContent = enemies.length.toString();
        }
    }
    scoreValue.textContent = score;
    lastUpdateTime = time;
    requestAnimationFrame(updateGame);
}

function handleTyping(event) {
    if (event.key === " ") {
        checkEnemyDestruction();
        inputBuffer = "";
    } else {
        inputBuffer += event.key;
    }
    textValue.textContent += event.key;
    if (textValue.textContent.length > 50) {
        textValue.textContent = textValue.textContent.substr(textValue.textContent.length - 50);
    }
}

function updateWPM() {
    var d = new Date();
    var t = d.getTime();
    for ( var i = destroyed.length -1; i >= 0; i-- ) {
        if ( (t - destroyed[i]) > 60000 ) {
            destroyed.splice(i, 1);
        }
    }
    wpmValue.textContent = destroyed.length.toString();
}

function checkEnemyDestruction() {
    for (let i=0; i < enemies.length; i++) {
        if (enemies[i].text === inputBuffer.trim()) {
            var d = new Date();
            var t = d.getTime();
            destroyed.push(t);
            updateWPM();
            score += enemies[i].level;
            enemies.splice(i, 1);
        spawnEnemy();
            break;
        }
    }
}

//setInterval(spawnEnemy, 1000);
updateGame();

