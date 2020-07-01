/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')
const canID = 'p5canvas' // sets the ID of canvas
	// make sure there is a #p5-container in index.html. 
	// efforts to create a fallback to body have failed so far

// the goal is to divide the available space into squares (to be filled with circles or other elements)
// rows first (because some elemnts will be text in the end)
// no empty spaces. no skewing. all squares. find an end and approximate, once it gets too small.

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let numRows
let rowH
let blockCount = 0
	
function setup() {
	//initial setup of canvas and containing container (sic!)
  let canvas = createCanvas(canW,canH) //use width/height hereafter for canvas size.
  canvas.parent(container)
  canvas.id(canID)

  //actual code starts here
  frameRate(60)
}

// 200701 - 12:15
// working! :-)
// Next: make random rows/cols switcher for more variation.
// Next: Clean up, simplify, maybe class/object, and an array (for use with non square element later)

function draw() {
  background('rgba(0, 0, 0, 1)')
  
  numRows = Math.round(random(1,5)) // for testing purpose only. Would need to be adaptive to size...
  rowH = canH / numRows

  for (let y = 0; y < numRows; y++) {
    createBlock(0, y * rowH, canW, rowH)
  }
  noLoop()

  //saveCanvas(canvas, 'grid-division', 'jpg')
}

function createBlock(x, y, w, h) {
  let longSide = Math.max(w, h)
  let shortSide = Math.min(w, h)
  let offset = shortSide / 2
  let incX = 0
  let incY = 0
  let nextBlockX
  let nextBlockY
  let remainder = longSide % shortSide
  let nextBlockW
  let nextBlockH
  // Check Orientation
  if (w > h) { // is Landscape
    incX = shortSide
    incY = 0
    nextBlockW = remainder
    nextBlockH = shortSide
  } else {  // is Portrait
    incX = 0
    incY = shortSide
    nextBlockW = shortSide
    nextBlockH = remainder
  }
  console.log('remainder: ' +remainder)

// problem: if remainder is 0 last circle is not drawn.
// solved with extra 'else if'. maybe there's a shorter way.
// if statements and for loops can possibly be inverted (do the if first, then the loop...)
// and also space out the last row of circles to cover up the remainder...

  for (let i = 0; shortSide * (i + 1) < longSide; i++) {
    drawCircle(x + offset + i * incX, y + offset + i * incY, shortSide)
    
    nextBlockX = x + (i + 1) * incX
    nextBlockY = y + (i + 1) * incY
  }

  if (remainder >= 6) {
    createBlock(nextBlockX, nextBlockY, nextBlockW, nextBlockH)
  } else if (remainder == 0) {
    drawCircle(nextBlockX + offset, nextBlockY + offset, shortSide)
  }

  blockCount++
  console.log('Block ' +blockCount+ ':  x: ' +x+ ', y: ' +y+ ', w: ' +w+ ', h: ' +h)

}

function drawCircle(x, y, d) {
  fill(255)
  noStroke()
  circle(x, y, d)
}

// Resize Function. Figure out a shorter way. Probably make it a function that can also be used in setup.
function windowResized() {
	resizeCanvas(canW, canH)
	canW = container.offsetWidth
	canH = container.offsetHeight
  canMax = Math.max(canW, canH) //longer canvas side
  canMin = Math.min(canW, canH) //shorter canvas side
}