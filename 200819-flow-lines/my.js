// basically following the coding train:
// Coding Challenge #24: Perlin Noise Flow Field — https://www.youtube.com/watch?v=BjoM9oKOAKY

/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')
// make sure there is a #p5-container in index.html. 
// efforts to create a fallback to body have failed so far

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let fr

let inc = .1
let nRows = 20
let nCols = nRows
let elW, elH

let v
let zOff = 0

let nParticles = 5
let particles = []
let flowfield

function setup() {
    //initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW, canH)
    canvas.parent(container)

    fr = createP('') // Framerate logger

    //actual code starts here
    elW = width / nCols
    elH = height / nRows

    flowfield = new Array(nCols * nRows)

    for (let i = 0; i < nParticles; i++) {
        newPos = createVector(random(width), random(height))
        particles[i] = new Particle(newPos)
    }
    drawBg()
}

function draw() {
    //drawBg()
    let xOff = 0
    for (let x = 0; x < nCols; x++) {
        let yOff = 0
        for (let y = 0; y < nRows; y++) {
            let c = noise(yOff, xOff) * 255
            let a = noise(yOff, xOff, zOff) * (TWO_PI * 2)

            let index = x + y * elW // ???

            let v = p5.Vector.fromAngle(a)
            v.setMag(.5) //controls snappyness to flowfield, but why?
            flowfield[index] = v

            let g = new GridObject(x * elW, y * elH, elW, elH, c, v, a)
            g.paintCell()
            g.paintFlow()

            yOff += inc
        }
        xOff += inc //moves the flowfield
        zOff += .001
    }

    for (let particle of particles) {
        particle.render(flowfield)
        // particle.follow(flowfield)
        // particle.update()
        // particle.paint()
        // particle.bounds()
    }

    fr.html(floor(frameRate()));
}


class GridObject {
    constructor(x, y, w, h, c, v, a) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.c = c
        this.v = v
        this.a = a
    }
    paintCell() {
        noStroke()
        fill(0, this.c, 0)
        rect(this.x, this.y, this.w, this.h)
    }
    paintFlow() {
        push()
        //translate(this.x + this.w / 2, this.y + this.h / 2)
        translate(this.x, this.y)

        stroke(255, 0, 0)
        strokeWeight(3)
        point(0, 0)

        rotate(this.v.heading())

        stroke(255, 100)
        strokeWeight(1)
        line(0, 0, this.w, 0)
        //line(-this.w / 3, -this.h / 3, this.w / 3, this.h / 3)
        //line(-this.w, -this.h, this.w, this.h)
        pop()

    }
}

function drawBg() {
    background(0, 0, 0, 255)
}

//////////////////////////////////
// Pause Loop
function keyPressed() {
    // http://keycode.info/
    if (keyCode === 80) {
        if (isLooping()) {
            console.log('paused')
            noLoop()
        } else {
            console.log('unpaused')
            loop()
        }
    }
}


function windowResized() {
    resizeCanvas(canW, canH)
    canW = container.offsetWidth
    canH = container.offsetHeight
}