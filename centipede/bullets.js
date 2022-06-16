// *******************************************
// Bullet Object Definition
// *******************************************
function Bullet(x, y, speed, size) {

    // **************************
    // Bullet Properties
    // **************************
    this.x = x
    this.y = y
    this.size = size
    this.speed = speed
    
    // **************************
    // Bullet Methods
    // **************************
    this.show = function() {
        noStroke()
        fill(176,176,176)
        ellipse(this.x, this.y, this.size, this.size)
    }
    
    this.move = function() {
        this.y -= this.speed
    }
    
    this.update = function() {
        this.move()
        this.show()
    }
}

// *******************************************
// CurrentBullets Object Definition
// *******************************************
function CurrentBullets() {

    // **************************
    // CurrentBullets Properties
    // **************************
    this.fired = []
    
    // **************************
    // CurrentBullets Methods
    // **************************
    this.checkExpired = function() {
        for (let b = 0; b < this.fired.length; b++) {
            if (this.fired[b].y < 0) {
                this.fired.splice(b, 1)
            }
        }
    }
    
    this.update = function() {
        this.checkExpired()
        
        for (let b = 0; b < this.fired.length; b++) {
            this.fired[b].update()
        }
    }
    
    this.shoot = function(x, y) {
        let b = new Bullet(x, y, 5, 5)
        this.fired.push(b)
        bulletDelay = RESETDELAY
    }
    
    this.checkCentipedeCollide = function() {
        let bulletsToRemove = []
        let nodesToRemove = []
        
        for (let b = 0; b < this.fired.length; b++) {
            for (let c = 0; c < centipede.body.length; c++) {
                let d = dist(this.fired[b].x, this.fired[b].y, 
                    centipede.body[c].x, centipede.body[c].y)
                    
                if (d < this.fired[b].size/2 +  centipede.body[c].size/2) {
                    // A collision has occurred.
                    bulletsToRemove.push(b)
                    nodesToRemove.push(c)
                    gameScore += 10
                    
                    // Spawn mushrooms in place of body.
                    for (let l = 0; l < level; l++) {
                        let col = l * 45
                        col = constrain(col, 0, 205) 
                        mushrooms.push(new Mushroom(centipede.body[c].x, 
                            centipede.body[c].y, CENTIPEDESIZE, col))
                    }
                    
                }
            }
        }
        
        for(let b = 0; b < bulletsToRemove.length; b++) {
            this.fired.splice(bulletsToRemove[b], 1)
            bulletDelay = -1
        }

        for(let c = 0; c < nodesToRemove.length; c++) {
            centipede.body.splice(nodesToRemove[c], 1)
        }
    }
    
    this.checkMushroomCollide = function() {
        let bulletsToRemove = []
        let mushroomsToRemove = []
        for (let b = 0; b < this.fired.length; b++) {
            for (let m = 0; m < mushrooms.length; m++) {
                let d = dist(this.fired[b].x, this.fired[b].y, 
                    mushrooms[m].x, mushrooms[m].y)
                    
                if (d < this.fired[b].size/2 +  mushrooms[m].size/2) {
                    // A collision has occurred.
                    bulletsToRemove.push(b)
                    mushroomsToRemove.push(m)
                    gameScore++
                    bulletDelay = -1
                }
            }
        }
        
        for(let b = 0; b < bulletsToRemove.length; b++) {
            this.fired.splice(bulletsToRemove[b], 1)
            bulletDelay = -1
        }

        for(let m = 0; m < mushroomsToRemove.length; m++) {
            mushrooms.splice(mushroomsToRemove[m], 1)
        }
    }
}