var song
var button1
var button
var deltaT = 0
var startOn = false
var predAct = false
var actionSeq = false
var xoffSet = 0
var exoffSet = 1
var flock = []
var endGame = false
var firstTime = true
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
	createCanvas(360*2, 540*2)
	colorMode(HSB, 100,100,100,100)
	background(0,0,85)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
  for (var i = 0; i < 200; i++) {
    if(xoffSet%width != 0){
      flock.push(new Boid("alphA"))
    }
    xoffSet += 8
  }

  // put setup code here
}

function draw() {

  if(startOn){
  if(endGame == true){
    background(0,0,85,70)
  }
  else{
    background(0,0,85,100)
  }
  for (var i = 0; i<flock.length; i++) {
    flock[i].edges()
    flock[i].swarm(flock)
    flock[i].show()
    flock[i].update(i)
  }

  console.log(deltaT)
  if(deltaT == 400){
    actionSeq = true
  }
  if(deltaT == 500){
    flock.push(new Boid("predator"))
    predAct = true
  }

  }
  //
	deltaT += 1
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


class Boid {
  constructor(iAm, x, y) {
    if(iAm == "alphA"){
      this.iAm = iAm
      this.pos = createVector(xoffSet%width,height)
      this.vel = createVector(0,-3)
      this.acc = createVector()
      this.maxForce = 0.5
      this.maxSpeed = 10
      this.lifeSpan = 1000
    }
    if(iAm == "predator"){
      this.iAm = iAm
      this.pos = createVector(width/2,height)
      this.vel = createVector(0,-10)
      this.acc = createVector()
      this.maxForce = 0.4
      this.maxSpeed = 20
      this.lifeSpan = 1000
    }
    if(iAm == "shrapNel"){
      this.iAm = "shrapNel"
      this.pos = createVector(x,y)
      this.vel = createVector(random(-4,4),random(-4,4))
			this.acc = createVector(0,0)
      this.hue = random(0,100)
      this.curtains = 100
    }
  }


  align(boids) {
    var perceptionRadius = 50
    var steering = createVector()
    var total = 0
    for (var other of boids) {
      var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
      if (other != this && d < perceptionRadius) {
        steering.add(other.vel)
        total+=1
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.setMag(this.maxSpeed)
      steering.sub(this.vel)
      steering.limit(this.maxForce)
    }
    return steering
  }


  separation(boids) {
    var perceptionRadius = 48
    var steering = createVector()
    var total = 0
    for (var other of boids) {
      var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
      if (other != this && d < perceptionRadius) {
        var diff = p5.Vector.sub(this.pos, other.pos)
        diff.div(d * d)
        steering.add(diff)
        total+=1
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.setMag(this.maxSpeed)
      steering.sub(this.vel)
      steering.limit(0.8)
    }
    return steering
  }


  cohesion(boids) {
    var perceptionRadius = 100
    var steering = createVector()
    var total = 0
    for (var other of boids) {
      var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
      if (other != this && d < perceptionRadius) {
        steering.add(other.pos)
        total+=1
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.sub(this.pos)
      steering.setMag(this.maxSpeed)
      steering.sub(this.vel)
      steering.limit(this.maxForce)
    }
    return steering
  }

  escape(boids){
    var perceptionRadius = 140
    var steering = createVector()
    var total = 0
    for (var other of boids) {
      var d = dist(this.pos.x, this.pos.y, other.pos.x, other.pos.y)
      if (other.iAm == "predator" && d < perceptionRadius) {
        var diff = p5.Vector.sub(this.pos, other.pos)
        diff.div(d * d)
        steering.add(diff)
        total+=1
      }
    }
    if (total > 0) {
      steering.div(total)
      steering.setMag(this.maxSpeed)
      steering.sub(this.vel)
      steering.limit(5)
    }
    return steering
  }


  swarm(boids) {
    if(this.iAm == "deltA"){
      var alignment = this.align(boids)
      var cohesion = this.cohesion(boids)
      var separation = this.separation(boids)
      var escape = createVector(0,0)
      if(predAct == true){
        escape = this.escape(boids)
      }
      this.acc.add(alignment)
      this.acc.add(cohesion)
      this.acc.add(separation)
      this.acc.add(escape)

    }
  }

  edges() {

    if(actionSeq == true){
      if(this.iAm != "predator"){
        if (this.pos.x > width) {
          this.pos.x = width
          this.vel.mult(-1)
        } else if (this.pos.x < 0) {
          this.pos.x = 0
          this.vel.mult(-1)
        }
        if (this.pos.y > height) {
          this.pos.y = height
          this.vel.mult(-1)
        } else if (this.pos.y < 0) {
          this.pos.y = 0
          this.vel.mult(-1)
        }
      }
    }
    else{
      if (this.pos.x > width) {
        this.pos.x = 0
      } else if (this.pos.x < 0) {
        this.pos.x = width
      }
      if (this.pos.y > height) {
        this.pos.y = 0
      } else if (this.pos.y < 0) {
        this.pos.y = height
      }
    }

  }

  update(i) {


    if(this.iAm == "shrapNel"){
      this.curtains -= 1
    }

    if(this.lifeSpan == 250){
      flock.splice(i,1)
      for(var k = 0; k<40; k++){
        var explOd = new Boid("shrapNel",this.pos.x,this.pos.y)
        flock.push(explOd)
      }
      endGame = true
    }

    if(this.iAm == "predator"){
      console.log("predetar coords:"+this.pos.y)
      if(this.pos.y<-15){
        predAct = false
        actionSeq = false
        flock.splice(i,1)
      }
    }
    if(this.iAm != "predator"){
      if(this.lifeSpan == 820){
        this.iAm = "gammA"
        if(firstTime){
          this.lifeSpan = this.lifeSpan + floor(20*log(exoffSet))
          exoffSet += 1
        }
        firstTime = false
      }
      if(this.lifeSpan == 900){
        this.vel = createVector(0,-1)
        this.vel.setMag(random(4, 6))
        this.iAm = "betA"
      }
    }
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.acc.mult(0)
    this.lifeSpan -= 1

    if(this.iAm == "alphA"){
      if(this.pos.y<height*(4/5)){
        this.pos.y = height*(4/5)
        this.vel.mult(0)
      }
    }


    if(this.iAm == "betA"){

      var heightOff = random(0,150)
      if(this.pos.y < height*(4/5)-100-heightOff){
        this.pos.y = height*(4/5)-100-heightOff
        this.vel.mult(-1.05)
      }
      if(this.pos.y>height*(4/5)){
        this.pos.y = height*(4/5)
        this.vel.mult(-1/1.05)
      }
    }
    if(this.iAm == "gammA"){
      var heightOff = random(0,150)
      if(this.pos.y < height*(4/5)-100-heightOff){
        this.vel = createVector(0,-1)
        this.vel.setMag(random(4, 6))
        this.iAm = "deltA"
      }
      if(this.pos.y>height*(4/5)){
        this.pos.y = height*(4/5)
        this.vel.mult(-1/1.05)
      }
    }

  }

  show() {
    if(this.iAm == "predator"){
      strokeWeight(1)
      stroke(0,0,0)
      fill(55,100,75)
      triangle(this.pos.x, this.pos.y-21, this.pos.x+13, this.pos.y, this.pos.x-13, this.pos.y)
    }
    else if (this.iAm == "shrapNel") {
      if(this.curtains > 0){
        strokeWeight(3)
        stroke(this.hue,100,75)
        point(this.pos.x, this.pos.y)
      }
    }
    else{
      strokeWeight(8)
      stroke(3,100,75)
      point(this.pos.x, this.pos.y)
    }
  }
}
