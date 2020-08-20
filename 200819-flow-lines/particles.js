// PARTICLES FOR FLOW

class Particle {
    constructor(pos) {
        this.pos = pos
        this.hue = random(360)
        this.scale = floor(random(1, 15))
        this.vel = createVector(0, 0)
        //this.vel = p5.Vector.random2D()
        this.acc = createVector(0, 0)
        this.maxspeed = 5


        this.initPos = this.pos.copy() //initial/previous position
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
    updateInit() {
        this.initPos.x = this.pos.x
        this.initPos.y = this.pos.y
    }
    bounds() {
        if (this.pos.x > width) {
            this.pos.x = 0
            this.updateInit()
        }
        if (this.pos.x < 0) {
            this.pos.x = width
            this.updateInit()
        }
        if (this.pos.y > height) {
            this.pos.y = 0
            this.updateInit()
        }
        if (this.pos.y < 0) {
            this.pos.y = height
            this.updateInit()
        }
    }
    follow(vectors) {
        let x = floor(this.pos.x / elW) //scaling down???
        let y = floor(this.pos.y / elH) //scaling down???
        let index = x + y * elW //storing a 2D value in a 1D Array... ???
        let force = vectors[index]
        this.applyForce(force)
    }
    paint() {
        push()
        stroke(0, 255, 0, 255)
        strokeWeight(this.scale)
        noFill()
        line(this.initPos.x, this.initPos.y, this.pos.x, this.pos.y)
        //fill(255, 0, 0)
        //point(this.pos.x, this.pos.y)
        pop()
        //this.updateInit()
    }
    render(flowfield) {
        this.flow = flowfield
        this.follow(this.flow)
        this.update()
        this.bounds()
        this.paint()
        this.updateInit()
    }
}