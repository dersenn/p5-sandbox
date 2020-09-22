let container = document.getElementById('p5-container')

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let f
let txt
let words
let fSize = 30
let pts = []
let maxWidth
let lineOffset
let maxFound = false
let ptsDef = false
let ptMin = canMin / 100
let ptMax = canMin / 96
let xz
let yz
let sFact
let tW
let tWj


function preload() {
    f = loadFont('assets/ak11senn.studio-medium.otf')
    txt = 'Currently Updating.'
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent(container)

    textAlign(CENTER, BASELINE)
    textFont(f)
    words = txt.split(' ')
    noStroke()
    fill(0, 255, 0)

    xz = random(1, 100)
    yz = random(1, 100)
}

function n(x, y, z, scale_, min_, max_) {
    return map(
        noise(x * scale_, y * scale_, z * scale_),
        0, 1, min_, max_);
}

function draw() {
    if (!maxFound) {
        for (let i = 0; i < words.length; i++) {
            maxWidth = width * .75
            textSize(fSize)
            tW = textWidth(words[i])
            console.log(fSize)
            if (tW <= maxWidth) {
                fSize += 9
            } else {
                maxFound = true
            }
        }
    } else {
        if (!ptsDef) {
            for (let j = 0; j < words.length; j++) {
                tWj = textWidth(words[j])
                if (width <= 568) {
                    sFact = 0.2
                } else {
                    sFact = 0.1
                }
                pts.push(f.textToPoints(words[j], width / 2 - tWj / 2, (height / 2 - fSize / 3) + fSize * j, fSize, {
                    sampleFactor: sFact,
                    simplifyThreshold: 0
                }))
            }
            ptsDef = true
        } else {
            background(255)
            for (let w = 0; w < pts.length; w++) {
                for (let p = 0; p < pts[w].length; p++) {
                    let xoff = n(pts[w][p].x, pts[w][p].y, xz, 0.005, -30, 30);
                    let yoff = n(pts[w][p].y, pts[w][p].x, yz, 0.005, -30, 30);
                    circle(pts[w][p].x + xoff, pts[w][p].y + yoff, map(yoff, 0, 1, ptMin, ptMax));
                }
            }
            xz += .6;
            yz += .6;
        }
    }
}

/*
function resetVars() {
    container = document.getElementById('p5-container')
    canW = container.offsetWidth
    canH = container.offsetHeight
    canMax = Math.max(canW, canH) //longer canvas side
    canMin = Math.min(canW, canH) //shorter canvas side
    fsize = 30
    maxWidth = canW * 75
    ptMin = canMin / 100
    ptMax = canMin / 96
    maxFound = false
    ptsDef = false
    xz = random(1, 100)
    yz = random(1, 100)
    pts = []
}
*/

function windowResized() {
    // resetVars()
    canW = container.offsetWidth
    canH = container.offsetHeight
    canMax = Math.max(canW, canH) //longer canvas side
    canMin = Math.min(canW, canH) //shorter canvas side
    fSize = 30
    ptMin = canMin / 100
    ptMax = canMin / 96
    maxFound = false
    xz = random(1, 100)
    yz = random(1, 100)
    pts = []
    ptsDef = false
    // tW = 0
    // tWj = 0
    resizeCanvas(windowWidth, windowHeight)
    // console.log(canW, canH)
}