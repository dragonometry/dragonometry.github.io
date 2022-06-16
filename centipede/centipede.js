// *******************************************
// CentipedeNode Object Definition
// *******************************************
function CentipedeNode(x, y, size, speed) {

    // **************************
    // CentipedeNode Properties
    // **************************
    this.x = x
    this.y = y
    this.size = size
    this.speed = speed
    
    // **************************
    // CentipedeNode Methods
    // **************************
    this.show = function() {
        strokeWeight(2)
        stroke(255, 255, 0)
        fill(255, 0, 0)
        ellipse(this.x, this.y, this.size, this.size)
    }
    
    this.move = function() {
        this.x = this.x + this.speed

        if (this.x < this.size/2 - 2 || this.x > width - this.size/2 + 2) {
            this.drop()
        } 
    }
    
    this.drop = function() {
        this.speed *= -1
        this.y += this.size + 3
        
        if (this.x < this.size/2) {
            this.x = this.size/2 + 1
        } else if (this.x > width - this.size/2) {
            this.x = width - this.size/2 - 1
        }
        
        if (this.y > height) {
            this.y = 3 * this.size
        }
    }

    this.checkMushroomCollide = function() {
        for (let m = 0; m < mushrooms.length; m++) {
            let d = dist(this.x, this.y, mushrooms[m].x, mushrooms[m].y)
            if (d < this.size/2 + mushrooms[m].size/2) {
                if (this.speed < 0) {
                    this.x = mushrooms[m].x + mushrooms[m].size/2 + 10
                } else {
                    this.x = mushrooms[m].x - mushrooms[m].size/2 - 10
                }
                this.drop()
            }
        }
    }
    
    this.update = function() {
        this.move()
        this.checkMushroomCollide()
        this.show()
    }
}

// *******************************************
// Centipede Object Definition
// *******************************************
function Centipede(length, size, speed) {

    // **************************
    // Centipede Properties
    // **************************
    this.size = size
    this.length = length
    this.speed = speed
    this.body = []
    
    // **************************
    // Centipede Methods
    // **************************
    this.regenerate = function(speed) {
        this.speed = speed
        for (let c = 0; c < this.length; c++) {
            this.body[c] = new CentipedeNode(c * (this.size + 4) + 
                this.size, 2 * this.size + 5, this.size, this.speed)
        }
    }
    
    this.update = function(mushrooms) {
        for (let c = 0; c < this.body.length; c++) {
            this.body[c].update(mushrooms)
        }
    }
    
	// Create initial instance.
    this.regenerate(this.speed)
}