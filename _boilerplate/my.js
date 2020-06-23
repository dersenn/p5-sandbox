//const container = document.getElementById('p5-container')
if(document.getElementById('p5-container')){
    console.log('container!')
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