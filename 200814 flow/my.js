/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')
// make sure there is a #p5-container in index.html. 
// efforts to create a fallback to body have failed so far

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let inc = .01
let nRows = 10
let nCols = nRows
let elW, elH

let cells
let pos

function setup() {
    //initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW, canH)
    canvas.parent(container)

    //actual code starts here
    elW = width / nCols
    elH = width / nRows
    cells = []

    let xOff = 0
    for (let x = 0; x < nCols; x++) {
        let yOff = 0
        for (let y = 0; y < nRows; y++) {
            let r = noise(yOff, xOff) * 255
            cells.push(new GridObject(x * elW, y * elH, elW, elH, r))
            yOff += inc
        }
        xOff += inc
    }
    //console.log(cells)
    background('rgba(0, 0, 0, 1)')
}

function draw() {
    for (let cell of cells) {
        cell.paint()
    }
    //noLoop()

}


class GridObject {
    constructor(x, y, w, h, r) {
        this.x = x
        this.y = y
        this.w = w
        this.h = h
        this.col = r
    }
    paint() {
        noStroke()
        fill(this.col)
        rect(this.x, this.y, this.w, this.h)
    }
}



function windowResized() {
    resizeCanvas(canW, canH)
    canW = container.offsetWidth
    canH = container.offsetHeight
}