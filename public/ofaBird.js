var song
var button1
var button
var startOn = false
var img
var iScale = 10
var birdPicData = []
var flock = []
var stopCount = 0
var imHeight, imWidth
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
  img = loadImage("birdPic.png")
}


function setup() {
	createCanvas(720, 1080)
	colorMode(HSB, 239,239,239,100)
	background(03,4,200)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
  imHeight = 306
  imWidth = 204
  img.resize(imWidth,imHeight)
  img.loadPixels()

  for(var y = 0; y < imHeight; y++){
    for(var x = 0; x < imWidth; x++){
      var index = (x + y * imWidth)*4
      var r = img.pixels[index+0]
      var g = img.pixels[index+1]
      var b = img.pixels[index+2]
      var a = img.pixels[index+3]
      var bright = (r+g+b)/3
      if(a>30){
        var birdAttri = [x+520,y+800,r,g,b,a]
        birdPicData.push(birdAttri)
      }
    }
  }
  console.log(birdPicData.length)
  for(var i = 0; i<birdPicData.length;i++){
    flock[i] = new Boid("birdFinder",birdPicData[i][0],birdPicData[i][1],birdPicData[i][2],birdPicData[i][3],birdPicData[i][4],birdPicData[i][5])
  }
  	// put setup code here
}

function draw() {

	background(03,4,200)
  if(startOn){
    for(var c=0;c<flock.length;c++){
      flock[c].behave(c)
      flock[c].update(c)
      flock[c].show(c)
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
  constructor(Iam,xTar,yTar,rVal,gVal,bVal,aVal){
    this.i = Iam
    this.pos = createVector(random(width),random(height))
    this.vel = p5.Vector.random2D()
    this.acc = createVector(0,0)
    this.target = createVector(xTar,yTar)
    this.maxSpeed = 10
    this.maxForce = 0.5
    this.lifeSpan = 340
    this.r = rVal
    this.g = gVal
    this.b = bVal
    this.a = aVal
  }

  seek(tar){
    var desire = p5.Vector.sub(tar, this.pos)
    desire.setMag(4)
    var steer = p5.Vector.sub(desire, this.vel)
    steer.limit(this.maxForce)
    return steer
  }


  arrive(tar){
    var desire = p5.Vector.sub(tar, this.pos)
    var d = desire.mag()
    var speed = this.maxSpeed
    if(d<30){
      speed = map(d,0,30,0,this.maxSpeed)
    }
    desire.setMag(speed)
    var steer = p5.Vector.sub(desire, this.vel)
    steer.limit(this.maxForce)
    return steer
  }

  behave(i){
    if(this.lifeSpan > 100){
      var seek = this.arrive(this.target)
      this.applyForce(seek)
    }
    if(this.lifeSpan==100){
      this.vel = p5.Vector.random2D()
      this.vel.mult(random(1,6))
    }
  }



  applyForce(f){
    this.acc.add(f)
  }

  update(i){
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.acc.mult(0)
    this.lifeSpan -= 1


  }



  show(i){
    if(this.lifeSpan>85){
      push()
      colorMode(RGB)
      strokeWeight(1)
      stroke(this.r,this.g,this.b,this.a)
      point(this.pos.x,this.pos.y)
      pop()
    }
  }
}
