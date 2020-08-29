const container = document.getElementById('p5-container')
const controls = document.getElementById('p5-controls')
let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side
let canC //center of canvas
//////////////////////////////////

let r
let c
let a = 0
let å = 0

function setup() {
    //initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW, canH, WEBGL)
    canvas.parent(container)
    canC = createVector(width / 2, height / 2)


    //noLoop()
}

function draw() {
    orbitControl();
    drawBg()
    r = width / 4
    rotateY(a)
    rotateZ(å)
    //directionalLight(255, 255, 255, width, height, width)
    let detail = 20
    for (let i = 0; i < detail; i++) {
        let lon = map(i, 0, detail, -PI, PI)
        for (let j = 0; j < detail; j++) {
            let lat = map(j, 0, detail, -HALF_PI, HALF_PI)

            let x = r * sin(lon) * sin(lat)
            let y = r * cos(lon)
            let z = r * sin(lon) * cos(lat)

            let wght = map(z, -r, r, 5, 20)
            strokeWeight(wght)
            //stroke(j * 255 / detail)
            stroke(0, 255, 0)
            point(x, y, z)
        }
    }
    a += 1 / 180
    å += 1 / 90


    //drawGd()
}


//////////////////////////////////
// Draw Background
function drawBg() {
    background(250)
}
// Draw Auxilary Grid
function drawGd() {
    strokeWeight(10)
    stroke(255, 0, 255)
    point(0, 0, 0)
    translate(-width, -height, -height)
    let gX = 20
    let gY = gX
    let oX = width * 2 / gX //offset, gridsize
    let oY = height * 2 / gY //offset, gridsize
    let gC = 122 //color
    for (x = 0; x < gX + 1; x++) {
        for (y = 0; y < gY + 1; y++) {
            noFill()
            strokeWeight(1)
            stroke(gC)
            line(0, y * oY, width * 2, y * oY)
            line(x * oX, 0, x * oX, height * 2)
        }
    }
}

// Pause Loop
function keyPressed() {
    // http://keycode.info/
    if (keyCode === 80) { // "p"
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