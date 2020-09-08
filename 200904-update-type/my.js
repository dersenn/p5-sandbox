/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')
// make sure there is a #p5-container in index.html. 
// efforts to create a fallback to body have failed so far

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let f
let txt
let words
let fSize = 30
let pts
let maxWidth
let lineOffset
let maxFound = false

function preload() {
    f = loadFont('assets/ak11senn.studio-medium.otf')
    txt = 'Currently Updating'
}


function setup() {
    //initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW, canH)
    canvas.parent(container)

    //actual code starts here
    textAlign(CENTER, BASELINE)
    textFont(f)
    words = txt.split(' ')
    maxWidth = width * .75
    console.log(words)

}

function ns(x, y, z, scale_, min_, max_) {
    return map(
        noise(x * scale_, y * scale_, z * scale_),
        0, 1, min_, max_);
}

let xz = 0
let yz = 0


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
        background(255)
        for (let j = 0; j < words.length; j++) {
            //text(words[j], width / 2, (height / 2 - fSize / 4) + fSize * j)
            let tW = textWidth(words[j])

            //pts = f.textToPoints(words[j], width / 2, (height / 2 - fSize / 4) + fSize * j, fSize, {
            pts = f.textToPoints(words[j], width / 2 - tW / 2, (height / 2 - fSize / 3) + fSize * j, fSize, {
                sampleFactor: 0.1,
                simplifyThreshold: 0
            })
            //console.log(pts[2])
            for (let p = 0; p < pts.length; p++) {
                let xoff = ns(pts[p].x, pts[p].y, xz, 0.005, -50, 50);
                let yoff = ns(pts[p].y, pts[p].x, yz, 0.005, -50, 50);
                push()
                noStroke()
                fill(0, 255, 0)
                ellipse(pts[p].x + xoff, pts[p].y + yoff, 6, 6);
                pop()
            }
            xz += .6;
            yz += .6;

        }
    }

    //text(words, width / 2, height / 2)
    push()
    stroke(255, 0, 0)
    strokeWeight(3)
    point(width / 2, height / 2)
    pop()
    //noLoop()
}



function windowResized() {
    resizeCanvas(canW, canH)
    canW = container.offsetWidth
    canH = container.offsetHeight
}