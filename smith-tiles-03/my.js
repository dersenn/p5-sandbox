// VERSION WITH CLASSES ETC.

/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let nRows = 5
let elW = canW / nRows
let elStroke = elW / 4
//let tile
let tiles = []
	
function setup() {
	//initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW,canH)
    canvas.parent(container)

    //actual code starts here
    frameRate(5)
    let angles = [0, HALF_PI]
	for (let x = 0; x < canW; x += elW) {
		for (let y = 0; y < canH; y += elW) {
		    rndAngle = angles[Math.floor(random(angles.length))]
		    //if the angle is pushed into the array it stays that way. no change when looping.
			tiles.push(new Tile(x, y, elW, rndAngle))
		}
	}
	background('rgba(0, 255, 0, 1)')
}

function draw() {
	let shuffledTiles = shuffle(tiles)
	// for...of loop. new shit. similar to inRange in Python / DrawBot.
	for (let tile of shuffledTiles) {
		tile.show()
	}
	grid()
	//console.log(tiles.length)
	
	noLoop()
}

class Tile {
	constructor(x, y, w, a) {
		this.x = x
		this.y = y
		this.w = w
		this.r = this.w / 2
		this.a = a
	}
	show() {
		stroke(random(255), 0, 0)
		strokeWeight(elStroke)
		noFill()
		// push() and pop(): similar to withSavedState in Python / Drawbot. Restores context. 
		// Needed for rotation of single objects. In Conjunction with Translate, to move origin.
		push()
			translate(this.x + this.r, this.y + this.r)
			rotate(this.a)
			arc( -this.r, -this.r, this.w, this.w, 0, HALF_PI)
			arc( this.r, this.r, this.w, this.w, PI, PI + HALF_PI)
		pop()
	}
}

// FISHER-YATES SHUFFLE implemented from https://javascript.info/array-methods
// used to change stacking order of elements.
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
    	let j = Math.floor(Math.random() * (i + 1));
    	[array[i], array[j]] = [array[j], array[i]];
	}
}

//HELPER FUNCTION TO DISPLAY GRID
function grid() {
	for (let x = elW; x < canW; x += elW) {
		for (let y = elW; y < canH; y += elW) {
			stroke(0,244,0)
			strokeWeight(1)
			line(x,0,x,canH)
			line(0,y,canW,y)
		}
	}
}

function windowResized() {
	resizeCanvas(canW, canH)
	canW = container.offsetWidth
	canH = container.offsetHeight
}