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

let elW = canMin
let elH = elW

	
function setup() {
	//initial setup of canvas and containing container (sic!)
  let canvas = createCanvas(canW,canH) //use width/height hereafter for canvas size.
  canvas.parent(container)

  //actual code starts here

}

// Working Proof of Concept (for Landscape. Only one level deep.)
// Now: rewrite into functions, arrays, objects, etc., Implement Orientation Check.


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



// Resize Function. Figure out a shorter way.
function windowResized() {
	resizeCanvas(canW, canH)
	canW = container.offsetWidth
	canH = container.offsetHeight
  canMax = Math.max(canW, canH) //longer canvas side
  canMin = Math.min(canW, canH) //shorter canvas side
  elW = canMin
}