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
let nRows = 1
let nCols = nRows
let elW, elH

//let cells
let v
let zOff = 0

let particles = []

function setup() {
    //initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW, canH)
    canvas.parent(container)

    fr = createP('') // Framerate logger

    //actual code starts here
    elW = width / nCols
    elH = width / nRows
    //cells = []

    for (let i = 0; i <= 50; i++) {
        newPos = createVector(random(width), random(height))
        particles[i] = new Particle(newPos)
    }


    //console.log(cells)
    background('rgba(0, 0, 0, 1)')
}

function draw() {
    let xOff = 0
    for (let x = 0; x < nCols; x++) {
        let yOff = 0
        for (let y = 0; y < nRows; y++) {
            let c = noise(yOff, xOff) * 255
            let a = noise(yOff, xOff, zOff) * TWO_PI
            let v = p5.Vector.fromAngle(a)

            let g = new GridObject(x * elW, y * elH, elW, elH, c, v, a)
            g.paint()
            //cells.push(new GridObject(x * elW, y * elH, elW, elH, c, v, a))

            yOff += inc
        }
        xOff += inc
    }
    // for (let cell of cells) {
    //     cell.paint()
    // }
    zOff += .01

    for (let particle of particles) {
        particle.update()
        particle.paint()
        particle.bounds()
    }

    //noLoop()
    //fr.html(floor(frameRate()));
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
    paint() {
        noStroke()
        fill(0, this.c, 0)
        //rect(this.x, this.y, this.w, this.h)
        push()
        stroke(255)
        strokeWeight(1)
        translate(this.x + this.w / 2, this.y + this.h / 2)
        rotate(this.v.heading())
        //line(-this.w / 3, -this.h / 3, this.w / 3, this.h / 3) 
        line(-this.w, -this.h, this.w, this.h)
        pop()

    }
}


//////////////////////////////////
function windowResized() {
    resizeCanvas(canW, canH)
    canW = container.offsetWidth
    canH = container.offsetHeight
}