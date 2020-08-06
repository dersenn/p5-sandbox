// VERSION WITH CLASSES ETC.

/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

// SOME VARIABLES
let fps = 30
let nRows = 5
let hasBorder = true
let divider
let border
let elW
if (hasBorder == true) {
	divider = nRows + 1
	elW = canW / divider
	border = elW / 2
} else {
	divider = nRows
	elW = canW / divider
	border = 0
}
let elStroke = elW / 4
let tiles
let shuffledTiles
	
function setup() {
	//initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW,canH)
    canvas.parent(container)

    //actual code starts here
    frameRate(fps)
    tiles = []
    let angles = [0, HALF_PI]
    //translate(border, border)
	for (let x = border; x < canW - (border + 1); x += elW) {
		for (let y = border; y < canH - (border + 1); y += elW) {
		    rndAngle = angles[Math.floor(random(angles.length))]
		    //if the angle is pushed into the array it stays that way. no change when looping.
			tiles.push(new Tile(x, y, elW, rndAngle))
		}
	}
	shuffledTiles = shuffle(tiles)
}

function draw() {
	// for...of loop. new shit. similar to inRange in Python / DrawBot.
//	background('rgba(0, 255, 0, 1)')
	background(0, 0, 0, 255)
	for (let tile of tiles) { // or use shuffledTiles for different stacking.
		tile.paint()
		if (tile.overTile(mouseX, mouseY)) {
			tile.changeColor(255)
		} else {
			tile.changeColor(0)
		}
	}
	//grid()
	//console.log(tiles.length)
	//noLoop()

}

function mousePressed() {
	for (let i = 0; i < tiles.length; i++) {
		if (tiles[i].overTile(mouseX, mouseY)) {
			tiles[i].turn()
			//tiles.splice(i, 1)
		}
	}
}

class Tile {
	constructor(x, y, w, a) {
		this.x = x
		this.y = y
		this.w = w
		this.r = this.w / 2
		this.a = a
		//this.t = 5 // seconds
		//this.aInc = 0// HALF_PI / (this.t * fps)
		this.clr = color(255)
		this.bgClr = color(255, 0)
	}
	overTile(mx, my) {
		if ((this.x < mx && mx < this.x + this.w) && (this.y < my && my < this.y + this.w)) {
			return true
		} else {
			return false
		}
		//for circles, use the distance fuction! then check if is smaller than radius.
		//let d = dist(mx, my, this.x, this.y)
	}
	changeColor(c) {
		this.clr = color(255 - c)
		this.bgClr = color(255, c)
	}
	turn() {
		this.a += HALF_PI
		// tried to make the turn animated... but must probably happen in the loop somewhere.
/*		for (let i = 0; i < this.t * fps; i++) {
			this.aInc = HALF_PI / (this.t * fps)
		}
*/		
	}
	paint() {
		// push() and pop(): similar to withSavedState in Python / Drawbot. Restores context. 
		// Needed for rotation of single objects. In Conjunction with Translate, to move origin.
		push()
			translate(this.x + this.r, this.y + this.r) //set origin at center of tile
			fill(this.bgClr)
			rect(-this.r, -this.r, this.w, this.w);
			stroke(this.clr)
			strokeWeight(elStroke)
			strokeCap(SQUARE)
			noFill()
			rotate(this.a)
			arc( -this.r, -this.r, this.w, this.w, 0, HALF_PI)
			arc( this.r, this.r, this.w, this.w, PI, PI + HALF_PI)
		pop()
	}
}

// FISHER-YATES SHUFFLE implemented from https://javascript.info/array-methods
// used to change stacking order of elements. so that the x/y directions are not visible on overlap.
function shuffle(array) {
	for (let i = array.length - 1; i > 0; i--) {
    	let j = Math.floor(Math.random() * (i + 1));
    	[array[i], array[j]] = [array[j], array[i]];
	}
}

// HELPER FUNCTION TO DISPLAY GRID
// needs adjustment to account for new border option... but still works, kinda.
function grid() {
	for (let x = elW; x < canW; x += elW) {
		for (let y = elW; y < canH; y += elW) {
			stroke(0,246,0)
			strokeWeight(1)
			line(x,0,x,canH)
			line(0,y,canW,y)
		}
	}
}

// RESPONSIVE FUNCTION
// broke somewhere along the way :-(
function windowResized() {
	resizeCanvas(canW, canH)
	canW = container.offsetWidth
	canH = container.offsetHeight
	redraw()
}