// the frame rate (frames per second)
// the canvas capturer instance
var dire = -13
var dim = 1920
var swirl = 0
var fiboA = 0
var fiboB = 1
var fiboAtemp
var xOff = 0.0
var yOff = 0.0
var zOff = 0.0

var strokeVaR
var strokeVaG
var strokeVaB
var startOn = false
var noiseVaR
var noiseVaG
var noiseVaB

var button1
var button
var capturer = new CCapture({
	framerate: 24,
	verbose: true,
  format: "png"
});


function preload() {
  // Get the most recent earthquake in the database
}


function setup() {
	createCanvas(720,1080)
  background(0)
  button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
	//background(random(0,255),random(0,255),random(0,255))
  angleMode(DEGREES)
}

function draw() {
  if(startOn){
  }
  spiR()
  capturer.capture(document.getElementById('defaultCanvas0'));
}

function capStart(){
  startOn = true
  capturer.start()
}

function capStop(){
  noLoop()
  console.log('finished recording.')
  capturer.stop()
  capturer.save()
  return;
}

function spiR(){
    push()
    translate(360,480)
    rotate(swirl)
    strokeWeight(10)
    noFill()
    //fill(random(0,255),random(0,255),random(0,255))
    noiseVaR = noise(xOff,yOff,zOff)

    strokeVaR = map(noiseVaR, 0,1, 0,255)
    stroke(random(40,255),random(40,255),random(40,255))
    rect(-dim,-dim,dim*2,dim*2)
    if(dire == -13 && dim < -1920){
      dire = 21
    }
    if(dire == 21 && dim > 1920){
      dire = -13
    }
    xOff = xOff + 0.01
    yOff = yOff + 0.01
    dim = dim + dire
    swirl = (fiboA+fiboB)
    fiboAtemp = fiboB
    fiboB = fiboA+fiboB
    fiboA = fiboAtemp
    pop()
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
