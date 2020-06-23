/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')
	// make sure there is a #p5-container in index.html. 
	// efforts to create a fallback to body have failed so far

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let rows
let cols
let nl //noiselevel
let n //noise
let xStart //noiseStart
let yStart
	
function setup() {
	//initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW,canH)
    canvas.parent(container)

    //actual code starts here
	cols = Math.round(random(3, 15))
	nl = 0.005
	xStart = 0
	yStart = 10

	background('rgba(0, 255, 0, 1)')   
	//circle(10, 10, 20)

}

function draw() {
	background('rgba(255, 255, 255, 1)')
	for(let x = 0; x <= canW; x += canW / cols) {
		for(let y = 0; y <= canH + canW / cols / 6; y += canW / cols) { //very small increment-value creates morphing line
			
			let n = noise(xStart + x * nl, yStart + y * nl)
			let size = map(n, 0, 1, canW / cols / 2, canW / cols)
			
			noStroke()
			fill('rgba(0, 0, 0, 1)')
			circle(x, y, size)

		}

		   
	}
	xStart += .01
	yStart += .01
}



function windowResized() {
	canW = container.offsetWidth
	canH = container.offsetHeight
	resizeCanvas(canW, canH)
	background('rgba(0, 255, 0, 1)')   
}