/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')
	// make sure there is a #p5-container in index.html. 
	// efforts to create a fallback to body have failed so far

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let nRows
let elW
	
function setup() {
	//initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW,canH)
    canvas.parent(container)

    //actual code starts here
    frameRate(5)
    nRows = Math.floor(random(2,30))
    elW = canW / nRows

}

function draw() {
	background('rgba(0, 255, 0, 1)')  
	for (let x = 0; x <= canW; x += elW) {
		for (let y = 0; y <= canH; y += elW) {
			//grid(x,y)
			tile(x,y,elW)
		}
	}
	//noLoop()
}

function grid(x, y) {
	stroke(0,244,0)
	strokeWeight(1)
	line(x,0,x,canH)
	line(0,y,canW,y)
}

function tile(x,y,w) {
	let angles = ['90','180','270','360']
	//rotate(random(angles))
	let rnd = random()
	noFill()
	strokeWeight(elW / 4)
	if (rnd > 0.5) {
		stroke(255)
		//fill(255)
		arc(x, y, w, w, 0, HALF_PI)
		arc(x + w, y + w, w, w, PI, PI + HALF_PI)
	} else {
		stroke(255)
		//fill(255)
		arc(x, y + w, w, w, PI + HALF_PI, 0)
		arc(x + w, y, w, w, HALF_PI, PI)
	}

}


function windowResized() {
	resizeCanvas(canW, canH)
	canW = container.offsetWidth
	canH = container.offsetHeight
}