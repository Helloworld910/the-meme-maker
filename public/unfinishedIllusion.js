var song
var button1
var button
var startOn = false
var flock = []
var pointsRo = []
var angle = [0,0]
var lineA = []
var lineB = []
var lineC = []
var lineD = []
var lineE = []
var lineF = []
var lineG = []
var lineH = []
var tipOf = []
var xTemp = 0
var yTemp = 0
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
	createCanvas(1280,720)
	colorMode(HSB, 239,239,239,100)
	background(03,4,200)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)

  	// put setup code here
}

function draw(){

  if(startOn){
  }

	background(03,4,200)
  //for(var i = 0;i<flock.length;i++){
    //flock[i].update(i)
    //flock[i].show(i)
  //}
	pointsRo[0] = [width*0.50, height*0.08]
	pointsRo[1] = [width*0.20, height*0.34]
	pointsRo[2] = [width*0.80, height*0.34]
	pointsRo[3] = [width*0.50, height*0.89]
	pointsRo[4] = [width*0.50+cos(angle[0])*width*0.24, height*0.68]
	pointsRo[5] = [width*0.50-cos(angle[0])*width*0.24, height*0.68]

	strokeWeight(12)
	stroke(3,200,200)
	point(pointsRo[0][0],pointsRo[0][1])
	point(pointsRo[1][0],pointsRo[1][1])
	point(pointsRo[2][0],pointsRo[2][1])
	point(pointsRo[3][0],pointsRo[3][1])
	point(pointsRo[4][0],pointsRo[4][1])
	point(pointsRo[5][0],pointsRo[5][1])

	line(pointsRo[4][0],pointsRo[4][1]+sin(angle[0]*3)*34, pointsRo[4][0]+sin(angle[0])*55, pointsRo[4][1]+sin(angle[0]*3)*34)
	line(pointsRo[4][0],pointsRo[4][1]+sin(angle[0]*3)*34, pointsRo[4][0]-sin(angle[0])*55, pointsRo[4][1]+sin(angle[0]*3)*34)

	line(pointsRo[5][0],pointsRo[5][1]+cos(angle[0]*3)*34, pointsRo[5][0]+sin(angle[0])*55, pointsRo[5][1]+cos(angle[0]*3)*34)
	line(pointsRo[5][0],pointsRo[5][1]+cos(angle[0]*3)*34, pointsRo[5][0]-sin(angle[0])*55, pointsRo[5][1]+cos(angle[0]*3)*34)

	line(pointsRo[0][0],pointsRo[0][1], pointsRo[1][0],pointsRo[1][1])
	line(pointsRo[0][0],pointsRo[0][1], pointsRo[2][0],pointsRo[2][1])
	line(pointsRo[1][0],pointsRo[1][1], pointsRo[2][0],pointsRo[2][1])

	line(pointsRo[4][0],pointsRo[4][1], pointsRo[4][0],pointsRo[4][1]-height*0.34)
	line(pointsRo[4][0],pointsRo[4][1], pointsRo[4][0],pointsRo[4][1]+height*0.21)

	line(pointsRo[5][0],pointsRo[5][1], pointsRo[5][0],pointsRo[5][1]-height*0.34)
	line(pointsRo[5][0],pointsRo[5][1], pointsRo[5][0],pointsRo[5][1]+height*0.21)

	line(pointsRo[3][0]+13,pointsRo[3][1], (width*0.50)+13, height*0.34)
	line(pointsRo[3][0]-13,pointsRo[3][1], (width*0.50)-13, height*0.34)



	noStroke()
	fill(149,200,200)
	beginShape()
	vertex(width*0.20,height*0.89)
	vertex(width*0.80,height*0.89)
	vertex(width*0.80,height*0.97)
	vertex(width*0.20,height*0.97)
	vertex(width*0.20,height*0.89)
	endShape()

	angle[0]+= 0.03
  angle[1]+= 0.3
  capturer.capture(document.getElementById('defaultCanvas0'));
}

class Boid{
  constructor(Iam,x,y,xVel,yVel){
    this.i = Iam
    this.pos = createVector(x,y)
    this.vel = createVector(xVel,yVel)
    this.acc = createVector(0,0)
    if(this.i == "One"){
      this.maxSpeed = 2
    }
    if(this.i == "Two"){
      this.maxSpeed = 3
    }
    if(this.i == "Three"){
      this.maxSpeed = 6
    }

    this.maxForce = 0.5
    this.lifeSpan = 400
  }
  update(i){
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)

    if(this.i=="One"){
      if(this.pos.x<(width/2)-100 || this.pos.x>(width/2)+100){
        this.vel.mult(-1)
      }
    }

    if(this.i=="Two"){
      if(this.pos.x<(width/2)-150 || this.pos.x>(width/2)+150){
        this.vel.mult(-1)
      }
    }

    if(this.i=="Three"){
      if(this.pos.x<(width/2)-300 || this.pos.x>(width/2)+300){
        this.vel.mult(-1)
      }
    }

    if(this.i=="CenterRect"){
      if(this.pos.x<(width/2)-50 || this.pos.x>(width/2)+50){
        this.vel.mult(-1)
      }
    }


  }
  show(i){
    push()
    strokeWeight(13)
    stroke(3,200,200,80)
    point(this.pos.x,this.pos.y)
    pop()
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
