/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')
	// make sure there is a #p5-container in index.html. 
	// efforts to create a fallback to body have failed so far

// the goal is to divide the available space into squares (to be filled with circles or other elements)
// rows first (because some elemnts will be text in the end)
// no empty spaces. no skewing. all squares. find an end and approximate, once it gets too small.

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side


// a bit strict. should be changed according to orientation and on object/block level.
let elW = canMin
let elH = elW

let numRows
let rowH
let blockCount = 0
	
function setup() {
	//initial setup of canvas and containing container (sic!)
  let canvas = createCanvas(canW,canH) //use width/height hereafter for canvas size.
  canvas.parent(container)

  //actual code starts here
}

// 200701 - 12:15
// working! :-)
// Next: make random rows/cols switcher for more variation.
// Next: Clean up, simplify, maybe class/object, and an array (for use with non square element later)

function draw() {
  background('rgba(0, 255, 0, 1)')
  
  numRows = Math.round(random(1,5)) // for testing purpose only. Would need to be adaptive to size...
  rowH = canH / numRows

  for (let y = 0; y < numRows; y++) {
    createBlock(0, y * rowH, canW, rowH)
  }
  noLoop()
  //saveCanvas(canvas, 'grid-division', 'jpg')
}

function createBlock(x, y, w, h) {
  // for visualisation purpose only
  // fill(0, random()*255, 0)
  // stroke(255, 0, 0)
  // rect(x,y,w,h)
  // fill(0, 255, 0)
  // text(blockCount, x, y + 20)


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

  for (let i = 0; shortSide * (i + 1) < longSide; i++) {
    drawCircle(x + offset + i * incX, y + offset + i * incY, shortSide)
    
    // work on these !!!!
    nextBlockX = x + (i + 1) * incX
    nextBlockY = y + (i + 1) * incY
    // do they need to be reset at some point? probably!
  }
  console.log('remainder: ' +remainder)
  if (remainder > 2) {
    createBlock(nextBlockX, nextBlockY, nextBlockW, nextBlockH)
  }

  blockCount++
  console.log('Block ' +blockCount+ ':  x: ' +x+ ', y: ' +y+ ', w: ' +w+ ', h: ' +h)

}

function drawCircle(x, y, d) {
  fill(255)
  noStroke()
  circle(x, y, d)
}

// 200630
// Working Proof of Concept (for Landscape. Only one level deep.)
// Now: rewrite into functions, arrays, objects, etc., Implement Orientation Check.
// New Version Above.

/*
function draw() {
  background('rgba(0, 255, 0, 1)')
  let blockStart

  for (let i = 0; elW * (i + 1) < width; i++) { // do only a certain amount of steps. to be changed later.
    circle(elW / 2 + elW * i, elW / 2, elW, elW)
    blockStart = (i + 1) * elW 

  }
  let remainder = canMax % canMin
  elW = remainder
  for (let j = 0; elW * (j + 1) < height; j++) {
    circle(blockStart + elW / 2, elW / 2 + elW * j, elW, elW)
  }

  noLoop()    
}
*/


// Resize Function. Figure out a shorter way.
function windowResized() {
	resizeCanvas(canW, canH)
	canW = container.offsetWidth
	canH = container.offsetHeight
  canMax = Math.max(canW, canH) //longer canvas side
  canMin = Math.min(canW, canH) //shorter canvas side
}