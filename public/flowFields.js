var song
var button1
var button
var startOn = false
var scaleR = 10
var cols,rows

var zOff = 0

var particles = []

var flowField = []

var capturer = new CCapture({
	framerate: 24,
	verbose: true,
  format: "png"
});
// the frame rate (frames per second)
// the canvas capturer instance

function preload() {
  // Get the most recent earthquake in the database
	song = loadSound("chopinPro.wav")

}


function setup() {
	createCanvas(270, 480)
	colorMode(HSB, 239,239,239,100)
	background(03,10,210)
  button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
  cols = floor(width/scaleR)
  rows = floor(height/scaleR)

  flowField = new Array(cols*rows)

  for(var cP = 0; cP<100;cP++){
    particles[cP] = new Particle()
  }

  	// put setup code here
}

function draw() {
  //

  grid()

  for (var p = 0; p<particles.length;p++){

    particles[p].follow(flowField)
    particles[p].update()
    particles[p].show()
    particles[p].edges()
  }

  capturer.capture(document.getElementById('defaultCanvas0'));

}


function grid(){
  var yOff = 0
  for(var i=0; i<=rows;i++){
    var xOff = 0
    for(var j=0;j<=cols;j++){
      var index = ((i+j) * cols)
      var angle = noise(xOff,yOff,zOff) * TWO_PI
      var v = p5.Vector.fromAngle(angle)
      v.setMag(5)
      flowField[index] = v
      strokeWeight(2)
      stroke(0,0,0,0)
      push()
      translate(j*scaleR,i*scaleR)
      rotate(v.heading())
      line(0,0,scaleR,0)
      pop()
      xOff+=0.1
    }
    yOff+=0.1
  }

  zOff += 0.1

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






function Particle(){
  this.pos = createVector(random(width),random(height))
  this.vel = createVector(0,0)
  this.acc = createVector(0,0)
  this.maxSpeed = 4
  this.prevPos = this.pos.copy()

  this.update = function(){
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.pos.add(this.vel)
    this.acc.mult(0)

  }
  this.applyForce = function(force){
    this.acc.add(force)
  }
  this.show = function(){
    strokeWeight(3)
    stroke(160,180,random(180,150),5)
    line(this.pos.x,this.pos.y,this.prevPos.x,this.prevPos.y)
    this.updatePrev()
  }

  this.updatePrev = function(){
    this.prevPos.x = this.pos.x
    this.prevPos.y = this.pos.y
  }

  this.edges = function(){
    if(this.pos.x > width){
      this.pos.x = 0
      this.prevPos.x=0
    }
    if(this.pos.x < 0){
      this.pos.x = width
      this.prevPos.x=width
    }
    if(this.pos.y>height){
      this.pos.y = 0
      this.prevPos.y=0
    }
    if(this.pos.y<0){
      this.pos.y = height
      this.prevPos.y=height
    }
  }

  this.follow = function(vectors){
    var x = floor(this.pos.x/scaleR)
    var y = floor(this.pos.y/scaleR)
    var index = (x + y) * cols
    var force = vectors[index]
    this.applyForce(force)
  }
}


function branch(len){
  if(song.isPlaying()){
    let level = amplitude.getLevel();
    let ampli = map(level, 0, 1, 2, 20);
    line(0, 0, 0, -len)
    stroke(255)
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
