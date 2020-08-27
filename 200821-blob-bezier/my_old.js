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

    a = HALF_PI
    c = createVector(0, 0)

    for (let i = 0; i < nPts; i++) {
        p = createVector(r * sin(a), r * cos(a))
        //t = createVector(-(p.y - c.y), p.x - c.x)
        t = createVector(-(p.y - c.y), p.x - c.x)
        //t.setMag(20)
        t.setMag(r / 4)
        tp1 = createVector(p.x - t.x, p.y - t.y)
        tp2 = createVector(p.x + t.x, p.y + t.y)
        //points.push([p, t, tp1, tp2])
        points.push({ p: p, t: t, tp1: tp1, tp2: tp2 })
        a += TWO_PI / nPts
    }

    //console.log(points)

    drawBg()
    noLoop()
}

function draw() {
    translate(canC)

    beginShape()

    for (let j = 0; j < points.length; j++) {

        if (j === 0) {
            vertex(points[j].p.x, points[j].p.y)
        }
        if (j === points.length - 1) {
            drawPt(points[0].p, 'red')
        } else {
            let curr = points[j]
            let prev = points[j - 1]
            drawPt(points[j].p, 'aqua')
            drawPt(curr.tp1, 'magenta')
            //drawPt(points[j].tp2, 'yellow')
            stroke(255, 0, 0)
            //line(points[j].tp2.x, points[j].tp2.y, points[j].tp1.x, points[j].tp1.y)
            stroke(0, 255, 0, 100)
            //bezierVertex(points[prev].tp1.x, points[prev].tp1.y, points[j].tp2.x, points[j].tp2.y, points[j].p.x, points[j].p.y)
        }

    }

    endShape()

    // drawPt(c, 'red')
    // drawPt(p, 'white')
    // drawPt(tp1, 'magenta')
    // drawPt(tp2, 'yellow')

    // stroke(255)
    // line(c.x, c.y, p.x, p.y)

    // stroke(255, 0, 0)
    // line(tp1.x, tp1.y, tp2.x, tp2.y)

    // stroke(0, 255, 0)
    // beginShape()
    // vertex(0, 0)
    // bezierVertex(tp1.x, tp1.y, tp2.x, tp2.y, p.x, p.y)
    // endShape()
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