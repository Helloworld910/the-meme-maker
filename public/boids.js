var song
var button1
var button
var startOn = false
var angle = 0

var numFlo = 1000
const flock = []

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

  for(var i=0; i<numFlo; i++){
    flock[i] = new Boid()
    angle+=0.1
  }


  	// put setup code here
}

function draw() {
  background(03,4,200)

  if(startOn){
  }
  for(var i = 0; i<flock.length; i++){
    flock[i].show()
    flock[i].update()
  }
  capturer.capture(document.getElementById('defaultCanvas0'));
}



class Boid{
	constructor(){
		this.pos = p5.Vector.random2D()
    this.vel = createVector(-cos(angle),sin(angle))
    this.acc = createVector()

	}

  update(){
    this.pos.add(this.vel)
    this.vel.add(this.acc)

    if(this.pos.x > width){
      this.pos.x = 0
    }

    if(this.pos.x < 0){
      this.pos.x = width
    }

    if(this.pos.y > height){
      this.pos.y = 0
    }

    if(this.pos.y < 0){
      this.pos.y = height
    }
  }
  show(){
    stroke(3,200,200,70)
    strokeWeight(4)
    point(this.pos.x,this.pos.y)
  }

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
