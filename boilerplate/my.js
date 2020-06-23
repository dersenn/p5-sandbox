const p5container = document.getElementById('p5-container')
let canW //canvas Width
let canH //canvas Height

function setup() {
	if(p5container){
	    console.log('container!')
		canW = container.offsetWidth
		canH = container.offsetHeight
		container = p5container
	} else {
		console.log('no container! ohoh')
		canW = width
		canH = height
	}

    let canvas = createCanvas(canW,canH)
    //canvas.parent(container)
}

function draw() {
	background('rgba(0,255,0,1')
    
}

console.log('container!')