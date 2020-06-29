/* some probably useful and often needed variables */
const container = document.getElementById('p5-container')
	// make sure there is a #p5-container in index.html. 
	// efforts to create a fallback to body have failed so far


// the goal is to divide the available space into squares.
// rows first (because some elemnts will be text in the end)
// no empty spaces. no skewing. all squares.

// nothing achieved yet. not much tried yet.



let canW = container.offsetWidth //canvas Width
let canH = container.offsetHeight //canvas Height
let canMax = Math.max(canW, canH) //longer canvas side
let canMin = Math.min(canW, canH) //shorter canvas side

let elW
let elH = elW

let a
let b

let x
let y
let r

let elements = []

// got carried away to a circle-packing thing on coding train...

function setup() {
	//initial setup of canvas and containing container (sic!)
    let canvas = createCanvas(canW,canH)
    canvas.parent(container)

    //actual code starts here
	background('rgba(0, 255, 0, 1)') 

	//for (let i = 0; i < 50; i++) {
	while (elements.length < 25) {

		let element = {
			x: random(width),
			y: random(height),
			r: 32
		}

		let overlapping = false

		for (let j = 0; j < elements.length; j++) {
			let other = elements[j]
			var d = dist(element.x, element.y, other.x, other.y)
			if (d < element.r + other.r) {
				//OVERLAP!
				overlapping = true
				break
			}
		}

		if (!overlapping) {
			elements.push(element)
		}

	for (let i = 0; i < elements.length; i++) {
		fill(255,255,255,1)
		ellipse(elements[i].x, elements[i].y, elements[i].r * 2, elements[i].r * 2)
	}

	}
}

function draw() {
}

// function to find biggest common denominator
// from https://editor.p5js.org/hanxyn888@gmail.com/sketches/SyKFqikW4
/*function algorithm() {
  a = canW
  b = canH
  
  euclid();
}*/


/*function euclid() {
  if (b == 0) {
    print(a);
    show(a);
  } else if (a > b) {
    a = a - b;
    euclid();
  } else {
    b = b - a;
    euclid();
  }
}
*/
// full sketch from above url

/*
var A;
var B;
var submit;
var a;
var b;
var i;

function setup() {
  createCanvas(400, 400);
  A = createInput(null, "number");
  B = createInput(null, "number");
  A.position(0, 50);
  B.position(200, 50);
  submit = createButton("Submit");
  submit.position(0, 75);
  submit.mousePressed(algorithm);
  background(220);
  textSize(32);
  text("Input A", 0, 32);
  text("Input B", 200, 32);
}

function algorithm() {
  a = A.value();
  b = B.value();
  
  euclid();
}

function euclid() {
  if (b == 0) {
    print(a);
    show(a);
  } else if (a > b) {
    a = a - b;
    euclid();
  } else {
    b = b - a;
    euclid();
  }
}

function show(gcd) {
  push();
  textAlign(CENTER);
  textSize(25);
  background(220);
  text("The GCD of " + str(A.value()) + " and " + str(B.value()) + " is " + str(gcd) + ".", width / 2, height / 2);
  textSize(32);
  textAlign(LEFT);
  text("Input A", 0, 32);
  text("Input B", 200, 32);
  pop();
}
*/



function windowResized() {
	resizeCanvas(canW, canH)
	canW = container.offsetWidth
	canH = container.offsetHeight
}