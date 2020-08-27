const container = document.getElementById('p5-container')
const controls = document.getElementById('p5-controls')
let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side
let canC //center of canvas
//////////////////////////////////

let r = 200
let c
let p
let a
let nPts = 5
let points = []

function setup() {
    //initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW, canH)
    canvas.parent(container)
    canC = createVector(width / 2, height / 2)


    drawBg()
    noLoop()
}

function draw() {

    blob = new Blob(canC, r, nPts)
    blob.calc()
    blob.paint()
    console.log(blob)
}

class Blob {
    constructor(c, r, nPts) {
        this.c = c
        this.r = r
        this.nPts = nPts
        this.a = HALF_PI
        this.aInc = TWO_PI / this.nPts
    }
    calc() {
        this.points = []
        for (let i = 0; i < this.nPts; i++) {
            this.p = createVector(this.r * sin(this.a), this.r * cos(this.a))
            this.points.push(this.p)
            this.a += this.aInc
        }
    }
    paint() {
        drawPt(this.c, 'red')
        push()
        translate(this.c)
        let j = 0
        for (let pt of this.points) {
            if (j > 0) {
                let prev = this.points[j - 1]
                let prevT = createVector(-(prev.y - this.c.y), prev.x - this.c.x)
                prevT.setMag(this.r / 2)
                let prevCp1 = createVector(prev.x - prevT.x, prev.y - prevT.y)

                console.log(prev.x, prev.y)
                drawPt(prevCp1, 'magenta')

                drawPt(prev, 'yellow')
            }
            let t = createVector(-(pt.y - this.c.y), pt.x - this.c.x)
            t.setMag(this.r / 2)
            let currCp2 = createVector(pt.x - t.x, pt.y - t.y)
            //console.log(currCp2)

            drawPt(currCp2, 'white')

            //drawPt(pt, 'aqua')
            j++
        }
        pop()
    }
}

function drawPt(p, col) {
    noFill()
    stroke(col)
    circle(p.x, p.y, 10)
}



//////////////////////////////////
// Draw Background
function drawBg() {
    background(0)
}
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
// Resize Window
function windowResized() {
    canW = container.offsetWidth
    canH = container.offsetHeight
    resizeCanvas(canW, canH)
    redraw()
    //doesn't work properly.
}