const container = document.getElementById('p5-container')
if(container){
    console.log('container!')
} else {
	console.log('no container! ohoh')
}

let canW = container.offsetWidth
let canH = container.offsetHeight


function setup() {
    let canvas = createCanvas(canW,canH)
    canvas.parent(container)
}

function draw() {
    
}

console.log('container!')