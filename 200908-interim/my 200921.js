const container = document.getElementById('p5-container')

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
let ptMin = canMin / 100
let ptMax = canMin / 96
let ptsDef = false
let xz
let yz
let sFact

function preload() {
    f = loadFont('assets/ak11senn.studio-medium.otf')
    txt = 'Currently Updating.'
}

function setup() {
    //initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(windowWidth, windowHeight)
    canvas.parent(container)

    //actual code starts here
    textAlign(CENTER, BASELINE)
    textFont(f)
    words = txt.split(' ')
    maxWidth = width * .75
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
            textSize(fSize)
            let tW = textWidth(words[i])
            if (tW < maxWidth) {
                fSize += 9
            } else {
                maxFound = true
            }
        }
    } else {
        if (!ptsDef) {
            for (let j = 0; j < words.length; j++) {
                let tWj = textWidth(words[j])
                if (width <= 375) {
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
    //windowResized()
}

// push()
// stroke(255, 0, 0)
// strokeWeight(ptSize)
// point(width / 2, height / 2)
// pop()




function windowResized() {
    canW = container.offsetWidth
    canH = container.offsetHeight
    resizeCanvas(windowWidth, windowHeight)
    maxFound = false
    ptsDef = false
    xz = random(1, 100)
    yz = random(1, 100)
    pts = []
    maxWidth = width * .75
    fSize = 30
}