// basically following the coding train:
// Coding Challenge #136.1: Polar Perlin Noise Loops — https://www.youtube.com/watch?v=ZI1dmHv3MeM

const container = document.getElementById('p5-container')
const controls = document.getElementById('p5-controls')
let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side
let center

let noiseMax = 1
let slider
let phase = 0
let nPoints = 20
let aInc

function setup() {
    //initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW, canH)
    canvas.parent(container)
    center = createVector(width / 2, height / 2)

    slider = createSlider(0, 20, 3)
    slider.parent(controls)

    aInc = TWO_PI / nPoints
    //drawBg()
}

function draw() {
    drawBg()

    translate(center)
    stroke(0, 255, 0)
    fill(0, 255, 0)

    beginShape()
    curveVertex()
    noiseMax = slider.value()
    for (let a = 0; a <= TWO_PI + aInc; a += aInc) {
        let xOff = map(cos(a + phase), -1, 1, 0, noiseMax)
        let yOff = map(sin(a), -1, 1, 0, noiseMax)
        let r = map(noise(xOff, yOff), 0, 1, width / 4, width / 3)
        let x = r * cos(a)
        let y = r * sin(a)
        curveVertex(x, y)
        xOff += .1
    }
    endShape(CLOSE)

    phase += .01
}



function drawBg() {
    background(255)
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
// Resize Window
function windowResized() {
    canW = container.offsetWidth
    canH = container.offsetHeight
    resizeCanvas(canW, canH)
    redraw()
    //maybe need to add redraw() ???
}