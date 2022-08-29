var song
var button1
var button
var deltaT = 0
var sceneTime = 0
var aOff = 0
var bOff = 0
var cOff = 0
var dOff = 0
var eOff = 0
var backOff = 90

var startOn = false
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

}


function setup() {
	createCanvas(360*2, 540*2)
	colorMode(HSB, 239,239,239,100)
	background(03,4,200)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
  flock[0] = new Boid((width/2),height/2,[0,0],"A", 3)
  flock[1] = new Boid(width/2,height/2,[0,0],"B",3)
  flock[2] = new Boid((width/2),(height/2),[0,0],"C", 3)
  flock[3] = new Boid((width/2),(height/2),[0,0],"D", 3)
  flock[4] = new Boid((width/2)-(80*4),(height/2)-(2*4)+2,[0,0],"E", 3)
  	// put setup code here
}

function draw() {

  if(startOn){
    if(sceneTime < 1256){
      background(03,4,200,100)
    }

    if(sceneTime > 1256 && sceneTime < 1760){
      if(backOff > 0){
        backOff -= 1
      }
      background(03,4,200,backOff%101)
    }

    if(sceneTime > 1760 && sceneTime < 2012){
      if(backOff < 100){
        backOff += 1
      }
      background(03,4,200,backOff%101)
    }

    if(sceneTime > 2012){
      background(03,4,200,40)
    }

    //drawing completes at 1509
    //back to points at 1760
    //final convergence at 2012



    //strokeWeight(3)
    //stroke(03,200,200)
    //line(width/2,0,width/2,height)
    //line(0,height/2,width,height/2)


    for(var i = 0;i<flock.length;i++){
      flock[i].update(i)
      flock[i].show(i)
    }


    deltaT += 0.025
    sceneTime += 0.5

    if(aOff<100){
      aOff += 1
    }

    if(sceneTime > 254){
      bOff = 100
    }

    if(sceneTime > 503){
      cOff = 100
    }

    if(sceneTime > 756){
      dOff = 100
    }

    if(sceneTime > 1006){
      eOff = 100
    }

    //console.log(sceneTime)
    //console.log(flock[0].pos.x-width/2)

    //if(flock[0].pos.x-width/2 < 1 && flock[0].pos.x-width/2 > -1){
      //if(sceneTime > 1760)
      //alert(sceneTime)
      //}


  }
  //
  capturer.capture(document.getElementById('defaultCanvas0'));
}



class Boid{
	constructor(x,y,veL,Iam,huE){
		this.pos = createVector(x,y)
    this.vel = createVector(veL[0],veL[1])
    this.acc = createVector(0,0)
    this.Iam = Iam
    this.hue = huE
    this.maxSpeed = 10
    this.lifeSpan = 200

	}

  update(i){
    if(this.Iam == "A"){
      this.vel.x = sin(deltaT/2)*2
      this.vel.y = cos(deltaT)*2
    }
    if(this.Iam == "B"){
      this.vel.x = cos(deltaT)*2
      this.vel.y = sin(deltaT/2)*2
    }

    if(this.Iam == "C"){
        this.vel.x = -sin(deltaT/2)*2
        this.vel.y = cos(deltaT)*2
    }

    if(this.Iam == "D"){
      this.vel.x = cos(deltaT)*2
      this.vel.y = -sin(deltaT/2)*2
    }
    if(this.Iam == "E"){
      this.vel.x = 4*sin(deltaT)*2
      this.vel.y = 4*cos(deltaT)*2
    }

    if(sceneTime > 2012 && this.Iam != "Fs"){
      flock.splice(i,1)
      var hueVal = random(0,230)
      for(var k = 0; k<30; k++){
        var explOd = new Boid(this.pos.x,this.pos.y,[random(-2,2),random(-2,2)],"Fs",hueVal)
        flock.push(explOd)
      }
    }


    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.lifeSpan -= 1

    //if(this.pos.x > width){
      //this.pos.x = 0
    //}

    //if(this.pos.x < 0){
      //this.pos.x = width
    //}

    //if(this.pos.y > height){
      //this.pos.y = 0
    //}

    //if(this.pos.y < 0){
      //this.pos.y = height
    //}
  }
  show(i){

    if(this.Iam == "A"){
      stroke(this.hue,200,200,aOff%101)
      strokeWeight(13)
      point(this.pos.x,this.pos.y)
    }

    if(this.Iam == "B"){
      stroke(this.hue,200,200,bOff%101)
      strokeWeight(13)
      point(this.pos.x,this.pos.y)
    }

    if(this.Iam == "C"){
      stroke(this.hue,200,200,cOff%101)
      strokeWeight(13)
      point(this.pos.x,this.pos.y)
    }
    if(this.Iam == "D"){
      stroke(this.hue,200,200,dOff%101)
      strokeWeight(13)
      point(this.pos.x,this.pos.y)
    }
    if(this.Iam == "E"){
      stroke(this.hue,200,200,eOff%101)
      strokeWeight(13)
      point(this.pos.x,this.pos.y)
    }

    if(this.Iam == "Fs"){
      if(this.lifeSpan > 0){
        stroke(this.hue,200,200,70)
        strokeWeight(5)
        point(this.pos.x,this.pos.y)
      }
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
