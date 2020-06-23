let container = document.getElementById('p5-container')
let canW //canvas Width
let canH //canvas Height

if(container){
    console.log('container!')
	canW = container.offsetWidth
	canH = container.offsetHeight
} else {
	console.log('no container! ohoh')
	canW = width
	canH = height
}

function setup() {
    let canvas = createCanvas(canW,canH)
    canvas.parent(container)
}

function draw() {
    
}

console.log('container!')