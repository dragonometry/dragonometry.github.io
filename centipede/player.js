// *******************************************
// Player Object Definition
// *******************************************
function Player(x, y, size, speed) {
    
    // **************************
    // Player Properties
    // **************************
    this.x = x
    this.y = y
    this.size = size
    this.speed = speed
    this.lives = MAXLIVES
    
    // **************************
    // Player Methods
    // **************************
    this.move = function() {
        
        if (keys[LEFT_ARROW]) {
            this.x -= this.speed;
        }
        if (keys[RIGHT_ARROW]) {
            this.x += this.speed;
        }
        if (keys[UP_ARROW]) {
            this.y -= this.speed;
        }
        if (keys[DOWN_ARROW]) {
            this.y += this.speed;
        }

        for (let m = 0; m < mushrooms.length; m++) {
            let d = dist(this.x, this.y, mushrooms[m].x, mushrooms[m].y)
            if (d < this.size/2 + mushrooms[m].size/2) {
                // undo move
                if (keys[LEFT_ARROW]) {
                    this.x += this.speed;
                }
                if (keys[RIGHT_ARROW]) {
                    this.x -= this.speed;
                }
                if (keys[UP_ARROW]) {
                    this.y += this.speed;
                }
                if (keys[DOWN_ARROW]) {
                    this.y -= this.speed;
                }
            }
        }
        
        this.x = constrain(this.x, 0 + this.size/2, width - this.size/2)
        this.y = constrain(this.y, 100, height - this.size/2)

        // Fire a bullet with spacebar.
        if (keys[32] && bulletDelay < 0) {
            bullets.shoot(this.x, this.y)
        }
    }

    this.show = function() {
        noStroke()
        fill(160,160,160)
        rect(this.x - 2, this.y - this.size/2 - 5, 4, 6)
        fill(0,255,0)
        ellipse(this.x, this.y, this.size, this.size)
    }

    this.checkCollide = function() {
        for (let c = 0; c < centipede.body.length; c++) {
            let d = dist(this.x, this.y, 
                        centipede.body[c].x, centipede.body[c].y)
            if (d < this.size/2 + centipede.body[c].size/2) {
                this.lives--
                this.y = height - 40
                this.x = width/2
                centipede.regenerate(centipede.speed)
            }
        }
    }
    
    this.update = function() {
        this.move()
        this.show()
    }
    
}