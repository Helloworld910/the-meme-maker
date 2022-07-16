var song
var button1
var button
var angle = 0.0
var xoffSet = 0
var yoffSet = 0
var startOn = false
var numFloX = 720
var numFloY = 1080
const flock = []

var explodeState = false


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
	createCanvas(720, 1080)
	colorMode(HSB, 239,239,239,100)
	background(03,4,200)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)

  for(var i=0; i<numFloY; i++){
    flock[i] = new Boid("yAx")
    yoffSet+=13
  }
  var flockLen = flock.length
  for(var j=0;j<numFloX;j++){
    var moRe = new Boid("xAx")
    flock.push(moRe)
    xoffSet+=13
  }
  	// put setup code here
}

function draw() {
	if(explodeState){
		background(03,4,200,50)
	}
	else{
		background(03,4,200)
	}

  if(startOn){
		for(var i = 0; i<flock.length; i++){
			if(flock[i]){
				flock[i].show(i)
				flock[i].update(i)
				angle+=0.1
			}
		}
  }

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


class Boid{
  constructor(Iam,xValue,yValue,hueV){
		if(Iam == "explOd"){
			this.pos = createVector(xValue,yValue)
			this.vel = createVector(random(-3,3),random(-3,3))
			this.acc = createVector(0,0)
			this.i = Iam
			this.lifeSpan = 200
			this.maxSpeed = 5
			this.hue = hueV
		}
    if(Iam == "yAx"){
      this.pos = createVector(0,yoffSet)
      this.vel = createVector(0,0)
      this.acc = createVector(2,0)
      this.i = Iam
      this.lifeSpan = 500
      this.maxSpeed = 13
    }
    else if (Iam == "xAx") {
      this.pos = createVector(xoffSet,0)
      this.vel = createVector(0,0)
      this.acc = createVector(0,2)
      this.i = Iam
      this.lifeSpan = 500
      this.maxSpeed = 21
    }
  }

  update(i){
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)

		if(this.i == "xAx"){
			if(this.pos.y<(height/2)+13 && this.pos.y>(height/2)-13 && this.lifeSpan == 500){
				this.acc.mult(0)
				this.vel.mult(0)
				this.lifeSpan = 499
			}
		}

		if(this.i == "yAx"){
			if(this.pos.x<(width/2)+13 && this.pos.x>(width/2)-13 && this.lifeSpan == 500){
				this.acc.mult(0)
				this.vel.mult(0)
				this.lifeSpan = 499
			}
		}

		if(this.lifeSpan<500){
			this.lifeSpan-=1
		}

		if(this.lifeSpan < 450 && this.lifeSpan > 350){
			if(this.i == "xAx"){
				this.vel = createVector(0,sin(angle*3)*21)
			}

			if(this.i == "yAx"){
				this.vel = createVector(sin(angle*3)*21,0)
			}
		}
		if(this.lifeSpan < 351 && this.lifeSpan > 341){
			if(this.i == "yAx"){
				this.acc = this.vel
			}
			if(this.i == "xAx"){
				this.acc = this.vel
			}
		}


		if(this.lifeSpan < 300 && this.lifeSpan > 210){
			if(this.i == "xAx"){
				if(this.pos.y<(height/2)+13 && this.pos.y>(height/2)-13){
					this.acc.mult(0)
					this.vel.mult(0)
					this.pos.y = height/2
				}
			}

			if(this.i == "yAx"){
				if(this.pos.x<(width/2)+13 && this.pos.x>(width/2)-13){
					this.acc.mult(0)
					this.vel.mult(0)
					this.pos.x = width/2
				}
			}
		}

		if(this.lifeSpan < 200 && this.i != "explOd"){
			flock.splice(i,1)
			var hueVal = random(0,230)
			for(var k = 0; k<10; k++){
				var explOd = new Boid("explOd",this.pos.x,this.pos.y,hueVal)
				flock.push(explOd)
			}
			explodeState = true
		}


    if(this.pos.x>width){
			this.acc.mult(-1)
    }
    if(this.pos.x<0){
			this.acc.mult(-1)
    }
    if(this.pos.y>height){
			this.acc.mult(-1)
    }
    if(this.pos.y<0){
			this.acc.mult(-1)
    }

  }
  show(i){
		if(flock[i]){
			if(this.i == "explOd"){
				if(this.lifeSpan > 70){
					strokeWeight(5)
					stroke(this.hue,190,190,60)
					point(this.pos.x,this.pos.y)
					this.lifeSpan -= 1
				}
			}
			else{
				strokeWeight(13)
				stroke(3,190,190,60)
				point(this.pos.x,this.pos.y)
			}
		}
  }

}
