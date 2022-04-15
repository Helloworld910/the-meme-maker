// the frame rate (frames per second)
// the canvas capturer instance
var dire = -13
var dim = 1920
var swirl = 0
var fiboA = 0
var fiboB = 1
var fiboAtemp
function preload() {
  // Get the most recent earthquake in the database

}


function setup() {
	createCanvas(1080,1920)
  background(0)
	//background(random(0,255),random(0,255),random(0,255))
  angleMode(DEGREES)
}

function draw() {
  spiR()
}


function spiR(){

    translate(540,960)
    pop()
    rotate(swirl)
    strokeWeight(10)
    noFill()
    //fill(random(0,255),random(0,255),random(0,255))
    stroke(random(0,255),0,random(0,255))
    rect(-dim,-dim,dim*2,dim*2)
    if(dire == -13 && dim < -1920){
      dire = 21
    }
    if(dire == 21 && dim > 1920){
      dire = -13
    }
    dim = dim + dire
    swirl = swirl+(fiboA+fiboB)
    fiboAtemp = fiboB
    fiboB = fiboA+fiboB
    fiboA = fiboAtemp
    push()
}



function branch(len){
	if(song.isPlaying()){
		let level = amplitude.getLevel();
		let ampli = map(level, 0, 1, 2, 20);
		line(0, 0, 0, -len)
		stroke(230)
		strokeWeight(3)
		translate(0, -len)
		if(len>4){
			push()
			rotate(PI/ampli)
			branch(len*(1/1.618))
			pop()
			push()
			rotate(-(PI/ampli))
			branch(len*(1/1.618))
			pop()
		}
	}
}




class Bubble{
	constructor(tempX,tempY,tempR, tempredC, tempgreenC, tempblueC){
		this.x = tempX
		this.y = tempY
		this.r = tempR
		this.redC = tempredC
		this.greenC = tempgreenC
		this.blueC = tempblueC
		this.xOff = 0
		this.yOff = 0
	}

	move(){
		if(song.isPlaying()){
			let level = amplitude.getLevel();
			let size = map(level, 0, 1, 20, width);
			this.r = size
		}

	}
	show(){
		stroke(3)
		strokeWeight(1)
		fill(this.redC, this.greenC, this.blueC)
		ellipse(this.x, this.y, this.r, this.r)
	}

}
