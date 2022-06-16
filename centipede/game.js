// *******************************************
// Game Constants
// *******************************************
const CENTIPEDESTARTLENGTH = 10
const CENTIPEDESIZE = 20
const PLAYERSTARTSPEED = 2
const PLAYINGGAME = 2
const GAMEOVER = 3
const RESETDELAY = 40
const MAXLIVES = 3

// *******************************************
// Global Variables
// *******************************************
let gameWidth = window.innerWidth - 20
let gameHeight = window.innerHeight - 20
let cnv
let player
let centipede
let bullets
let mushrooms = []
let keys = []
let level = 1
let levelSpeed = 1
let bulletDelay = 40
let gameScore = 0

let currentScene = PLAYINGGAME

// *******************************************
// p5 Canvas Setup
// *******************************************
function setup() {
    if (gameWidth > 700) {
        gameWidth = 700
    }    
    
    cnv = createCanvas(gameWidth, gameHeight)
    centerCanvas()
    textSize(20)
    textAlign(CENTER, CENTER)
    noCursor()
    
    bullets = new CurrentBullets()
    centipede = new Centipede(CENTIPEDESTARTLENGTH, CENTIPEDESIZE, levelSpeed)
    player = new Player(width/2, height - 40, 20, PLAYERSTARTSPEED)
    spawnMushrooms()
}

function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function spawnMushrooms() {
    
    mushrooms.length = 0
    
    for (let m = 0; m < 15; m++) {
        let x = random(CENTIPEDESIZE/2, width - CENTIPEDESIZE/2)
        let y = random(4*CENTIPEDESIZE, height - 4*CENTIPEDESIZE)
        
        // Make sure they don't spawn on the player.
        while (dist(x, y, player.x, player.y) < player.size/2 + CENTIPEDESIZE/2) {
            x = random(CENTIPEDESIZE/2, width - CENTIPEDESIZE/2)
            y = random(4*CENTIPEDESIZE, height - 4*CENTIPEDESIZE)
        }
        
        for (let l = 0; l < level; l++) {
            let c = l * 45
            c = constrain(c, 0, 205) 
            mushrooms.push(new Mushroom(x, y, CENTIPEDESIZE, c))
        }
    }
}

function showMushrooms() {
    for (let m = 0; m < mushrooms.length; m++) {
        mushrooms[m].show()
    }
}

// *******************************************
// Scene Definitions
// *******************************************
function gamePlayingScene () {
    background(0, 0, 0)
    
    if (centipede.body.length < 1) {
        levelSpeed = (level / 6) + 1
        level++
        centipede.regenerate(levelSpeed)
        spawnMushrooms()
    }

    centipede.update()
    bullets.update()
    player.update()
    showMushrooms()
    
    bulletDelay--
    
    player.checkCollide()
    if (player.lives < 1) {
        currentScene = GAMEOVER
    }

    bullets.checkCentipedeCollide()
    bullets.checkMushroomCollide()
    
    fill(0, 70, 250)
    noStroke()
    text("Score: " + gameScore + "          Level: " + level +
        "          Lives: " + player.lives, width/2, 20)
}

function gameOverScene() {
    background(0, 0, 0) 
    textSize(40)
    noStroke()
    text("GAME OVER", width/2, height/3)
    text("Score: " + gameScore, width/2, 2 * height/3)
}

// *******************************************
// Animation Loop
// *******************************************
function draw() {
    switch (currentScene) {
        case PLAYINGGAME:
            gamePlayingScene()
            break
        
        case GAMEOVER:
            gameOverScene()
            break
    }
}

// *******************************************
// Key Event Handlers
// *******************************************
function keyPressed() {
    keys[keyCode] = true
}

function keyReleased() {
    keys[keyCode] = false
}