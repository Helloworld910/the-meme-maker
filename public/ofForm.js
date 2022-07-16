var song
var button1
var button
var startOn = false
var img
var imHeight, imWidth
var picData = []
var flock = []
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
  img = loadImage("theLover.png")

}


function setup() {
	createCanvas(720, 1080)
	colorMode(HSB, 239,239,239,100)
	background(03,4,200)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
  imWidth = floor(img.width/3)
  imHeight = floor(img.height/3)
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
        var picAttri = [x,y,r,g,b,a]
        picData.push(picAttri)
      }
    }
  }
  for(var c = 0;c<picData.length;c++){
    flock[c] = new Boid("normaL",picData[c][0],picData[c][1],picData[c][2],picData[c][3],picData[c][4],picData[c][5])
  }
  //for(var y = 0; y < imHeight; y++){
    //for(var x = 0; x < imWidth; x++){
      //var index = (x + y * imWidth)*4
      //var r = img.pixels[index+0]
      //var g = img.pixels[index+1]
      //var b = img.pixels[index+2]
      //var a = img.pixels[index+3]
      //var bright = (r+g+b)/3
      //pixels[index+0] = r
      //pixels[index+1] = g
      //pixels[index+2] = b
      //pixels[index+3] = a

      //if(a>30){

        //var birdAttri = [x+520,y+800,r,g,b,a]
        //birdPicData.push(birdAttri)
      //}
    //}
  //}
  //console.log(birdPicData.length)
  //for(var i = 0; i<birdPicData.length;i++){
    //flock[i] = new Boid("birdFinder",birdPicData[i][0],birdPicData[i][1],birdPicData[i][2],birdPicData[i][3],birdPicData[i][4],birdPicData[i][5])
  //}


  	// put setup code here
}

function draw() {

	background(03,4,200)
  if(startOn){
    for(var c = 0; c < flock.length;c++){
      flock[c].behave(c)
      flock[c].update(c)
      flock[c].show(c)
    }
  }
  //
  capturer.capture(document.getElementById('defaultCanvas0'));
}


class Boid{
  constructor(Iam,xTar,yTar,rVal,gVal,bVal,aVal){
    this.i = Iam
    this.pos = createVector(random(width),random(height))
    this.vel = p5.Vector.random2D()
    this.acc = createVector(0,0)
    this.target = createVector(xTar,yTar)
    this.maxSpeed = 5
    this.maxForce = 0.5
    this.lifeSpan = 350
    this.r = rVal
    this.g = gVal
    this.b = bVal
    this.a = aVal
    this.heightCheck = 40
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
    if(d<60){
      speed = map(d,0,60,0,this.maxSpeed)
    }
    desire.setMag(speed)
    var steer = p5.Vector.sub(desire, this.vel)
    steer.limit(this.maxForce)
    return steer
  }


  behave(i){
    if(this.lifeSpan < 300 && this.lifeSpan > 110){
      var seek = this.arrive(this.target)
      this.applyForce(seek)
    }
    if(this.lifeSpan<110){
      if(this.pos.y<this.heightCheck+random(0,5)){
        if(this.i=="normaL"){
          this.vel = p5.Vector.random2D()
          this.vel.mult(random(1,3))
          this.maxSpeed = 5
          this.i = "ouT"
        }
      }
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
    if(this.lifeSpan == 300){
      this.maxSpeed = 8
    }
    if(this.lifeSpan<110){
      this.heightCheck += 5
    }

  }



  show(i){
    if(this.lifeSpan>20){
      push()
      translate(width*(-0.21),height*(-0.13))
      colorMode(RGB)
      strokeWeight(5)
      stroke(this.r,this.g,this.b,this.a)
      point(this.pos.x*5,this.pos.y*5)
      pop()
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
