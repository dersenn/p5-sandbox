const p5container = document.getElementById('p5-container')
let container
let canW //canvas Width
let canH //canvas Height

function setup() {
	if(p5container !== null){
		console.log('no container! ohoh')
		canW = windowWidth
		canH = windowHeight
	} else {
		container = p5container
	    console.log('container!')
		canW = container.offsetWidth
		canH = container.offsetHeight
	}

	console.log('width')


    let canvas = createCanvas(canW,canH)
    //canvas.parent(container)
	background('rgba(0,255,0,1')    
}

function draw() {
	background('rgba(0,255,0,1')
    
}

console.log('container!')