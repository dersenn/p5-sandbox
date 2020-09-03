/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')
	// make sure there is a #p5-container in index.html. 
	// efforts to create a fallback to body have failed so far

let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let font;
let pts;

function preload() {
  font = loadFont("assets/ak11senn.studio-medium.otf")
}
	
function setup() {
	//initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW,canH)
    canvas.parent(container)

    //actual code starts here
    pts = font.textToPoints('Studio', 0, 0, 120,
    		{sampleFactor: 0.3,
    		simplifyThreshold: 0})



	background('rgba(0, 255, 0, 1)')    
}

function ns(x, y, z, scale_, min_, max_) {
  return map(
    noise(x*scale_, y*scale_, z*scale_),
    0, 1, min_, max_);
}

let xz = 0;
let yz = 1000;


function draw() {
  background(0);
  noStroke();
  fill(0, 255, 0);
  push();
  translate(width / 5, height / 2);
  stroke(0, 255, 0)
  strokeWeight(3)
  point(0,0)
  for (let i = 0; i < pts.length; i++) {
    let xoff = ns(pts[i].x, pts[i].y, xz, 0.005, -50, 50);
    let yoff = ns(pts[i].y, pts[i].x, yz, 0.005, -50, 50);
    //ellipse(pts[i].x + xoff, pts[i].y + yoff, 1, 1);
    stroke(0, 255, 0)
    strokeWeight(1)
    line(width / 2 - width / 5, height / 2, pts[i].x + xoff, pts[i].y + yoff)
  }
  pop();
  xz += 1;
  yz += 1;    
}



function windowResized() {
	resizeCanvas(canW, canH)
	canW = container.offsetWidth
	canH = container.offsetHeight
}