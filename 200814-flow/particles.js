// PARTICLES FOR FLOW

class Particle {
    constructor(pos) {
        this.pos = pos
        this.hue = random(360)
        this.scale = floor(random(1, 5))
        this.vel = createVector(0, 0)
        //this.vel = p5.Vector.random2D()
        this.acc = createVector(0, 0)
        this.maxspeed = 4
    }
    update() {
        this.vel.add(this.acc)
        this.vel.limit(this.maxspeed)
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
    follow(vectors) {
        let x = floor(this.pos.x / elW) //scaling down???
        let y = floor(this.pos.y / elH) //scaling down???
        // SOMETHING WITH THOSE INDIZES IS OFF, LOOK INTO IT.
        //
        let index = x + y * elW //storing a 2D value in a 1D Array...
        let force = vectors[index]
        this.applyForce(force)
    }
    paint() {
        push()
        //colorMode(HSB)
        //stroke(this.hue, 100, 100, 1)
        stroke(0, 255, 0, 20)
        strokeWeight(this.scale)
        fill(255, 0, 0)
        point(this.pos.x, this.pos.y)
        pop()
    }
    render(flowfield) {
        this.flow = flowfield
        this.follow(this.flow)
        this.update()
        this.paint()
        this.bounds()
    }
}