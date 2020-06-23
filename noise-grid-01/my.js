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

	
function setup() {
	//initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW,canH)
    canvas.parent(container)

    //actual code starts here

	rows = 5
	cols = 10 



}

function draw() {
	background('rgba(0, 255, 0, 1)')   
	fill('rgba(255, 255, 255, 1)')
	circle(10, 10, 20)
	for (let x; x < rows; x++) {
		circle(10*x, 10, 20)
	}
}



function windowResized() {
	resizeCanvas(canW, canH)
	canW = container.offsetWidth
	canH = container.offsetHeight
}