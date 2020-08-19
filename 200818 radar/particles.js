// PARTICLES FOR FLOW

class Particle {
    constructor(pos) {
        this.pos = pos
        this.vel = p5.Vector.random2D()
        this.acc = createVector(0, 0)
    }
    update() {
        this.vel.add(this.acc)
        this.pos.add(this.vel)
        this.acc.mult(0)
    }
    applyForce(force) {
        this.acc.add(force)
    }
    bounds() {
        if (this.pos.x > width) this.pos.x = 0
        if (this.pos.x < 0) this.pos.x = width
        if (this.pos.y > height) this.pos.y = 0
        if (this.pos.y < 0) this.pos.y = width
    }
    paint() {
        stroke(0, random(255), 0)
        strokeWeight(40)
        fill(255, 0, 0)
        point(this.pos.x, this.pos.y)
    }
}