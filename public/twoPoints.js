var song
var button1
var button
var startOn = false
var angle = 0

var backCheck = 0

var numFlo = 720
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
    flock[i] = new Boid(i)
    angle=6
  }


  	// put setup code here
}

function draw() {
  if(backCheck == 0){
    background(03,4,200)
  }
  else{
    background(03,4,200,20)
  }

  if(startOn){
    for(var i = 0; i<flock.length; i++){
      if(flock[i]){
        flock[i].show(i)
        flock[i].update(i)
      }
    }
  }
  capturer.capture(document.getElementById('defaultCanvas0'));
}



class Boid{
	constructor(Iam,exCheck,xVal,yVal){

    if(exCheck){
      this.pos = createVector(xVal,yVal)
      this.vel = p5.Vector.random2D()
      this.acc = createVector()
      this.maxSpeed = 8
      this.lifeSpan = 255
      this.i = "explOd"
      this.hu = random(0,230)
    }
    else{
      this.pos = createVector(Iam*angle,0)
      this.vel = createVector(0,3)
      this.acc = createVector(0,0)
      this.maxSpeed = 4
      this.lifeSpan = 400
      this.i = Iam
    }
	}

  update(i){


    this.lifeSpan -= 1
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)

    if((this.pos.x > (width*0.38)-3 && this.pos.x < (width*0.38)+3 && this.pos.y > height*0.38 && this.i != "explOd") || (this.pos.x > (width*0.62)-3 && this.pos.x < (width*0.62)+3 && this.pos.y > height*0.62 && this.i != "explOd")){
      this.vel.y = 0
      if(this.lifeSpan < 0){
        backCheck = 1
        for(var j = 0;j<400;j++){
          var explOd = new Boid(flock.length+j,true,this.pos.x,this.pos.y)
          flock.push(explOd)
        }
        flock.splice(i, 1)
      }
    }

    if(this.pos.x > width){
      flock.splice[i,1]
    }

    if(this.pos.x < 0){
      flock.splice[i,1]
    }

    if(this.pos.y > height){
      flock.splice[i,1]
    }

    if(this.pos.y < 0){
      flock.splice[i,1]
    }
  }
  show(i){
    if(this.i == "explOd"){
      stroke(this.hu,200,200,70)
      strokeWeight(3)
      point(this.pos.x,this.pos.y)
    }
    else{
      stroke(3,200,200,70)
      strokeWeight(6)
      point(this.pos.x,this.pos.y)
    }
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
