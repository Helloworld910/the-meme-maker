var song
var button1
var button
var startOn = false

var moveA = 0
var moveAOn = false

var moveB = 0
var moveBOn = false

var moveC = 0
var moveCOn = false


var endGame = false

var bufferA = 100

var bufferAOne = false

var aOff = 0
var xoffSet = 0
var yoffSet = 0
var numFloX = 38
var numFloY = 1080
const flock = []
var deltaT = []

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
	createCanvas(360*2, 540*2)
	colorMode(HSB, 100,100,100,100)
	background(0,0,85)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)

  for(var i=0; i<numFloX; i++){
    flock[i] = new Boid("alphA")
    xoffSet+=(2*PI*89*2)/(34)
  }

  for(var i=0; i<numFloX; i++){
    deltaT[i] = 1.6
  }
}

function draw() {

  if(startOn){
  if(endGame == true){
    background(0,0,85,80)
  }
  else{
    background(0,0,85,100)
  }

  for(var i = 0; i<flock.length; i++){
    if(flock[i]){
      flock[i].show(i)
      flock[i].update(i)
    }
  }


  if(moveAOn){
    moveA += 0.2
  }

  if(moveBOn){
    moveB += 0.2
  }

  if(moveCOn){
    moveC += 0.2
  }

  if(bufferAOne){
    bufferA -= 1
  }



  }
  //
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
  constructor(Iam,x,y,hueVal){
    if(Iam == "shrapNel"){
      this.i = "shrapNel"
      this.pos = createVector(x,y)
      this.vel = createVector(random(-3,3),random(-3,3))
			this.acc = createVector(0,0)
      this.hue = hueVal
      this.curtains = 200
    }

    if(Iam == "alphA"){
      this.i = "alphA"
      this.pos = createVector(width+xoffSet,height/2)
			this.vel = createVector(-1,0)
			this.acc = createVector(0,0)
      this.hue = 3
			this.lifeSpan = 2000
      this.explodeTime = 700
			this.maxSpeed = 5
      this.scene = 1
    }
  }
  update(i){
      this.pos.add(this.vel)
      this.vel.add(this.acc)
      this.vel.limit(this.maxSpeed)
      this.lifeSpan-=1

      if(this.i == "shrapNel"){
        this.curtains -= 1
      }


      if(this.pos.x < (width/2)-(89*2)){
        if(this.scene == 1){
          this.scene = 2
        }
      }

      if(this.scene == 2){
        this.vel.mult(0)
        this.pos = createVector(width/2-(89*2*sin(deltaT[i])),height/2+(89*2*cos(deltaT[i])))
        deltaT[i]+=0.01
      }

      if(this.lifeSpan < 0){
        this.scene = 99
        bufferAOne = true
      }

      if(bufferA<0){
        this.scene = 3
        moveAOn = true
      }

      if(moveA > 2*29){
        this.scene = 4
        moveAOn = false
        moveBOn = true
      }

      if(moveB>2*29){
        this.scene = 5
        moveBOn = false
        moveCOn = true
      }

      if(moveC>2*20){
        this.scene = 6
        moveCOn = false
      }

      if(this.scene == 6){
        this.explodeTime -= 1
      }

      if(this.i == "shrapNel"){
        if(this.curtains<0){
          flock.splice(i,1)
        }
      }

      if(this.explodeTime < 0){
        flock.splice(i,1)
  			var hueVal = random(0,230)
  			for(var k = 0; k<30; k++){
  				var explOd = new Boid("shrapNel",this.pos.x,this.pos.y,hueVal)
  				flock.push(explOd)
  			}
        endGame = true
      }


      if(this.scene == 6){
        if(this.i == "alphA"){
          this.pos = createVector(width/2-(2*89*sin(deltaT[i])),height/2+(2*89*cos(deltaT[i])))
        }
        deltaT[i]+=0.009
      }

      if(this.scene == 6){
        if(this.i == "betA")
        this.pos = createVector(width/2-((2*89-29*2)*sin(deltaT[i])),height/2+((2*89-29*2)*-cos(deltaT[i])))
        deltaT[i]+=0.006
      }

      if(this.scene == 6){
        if(this.i == "gamA")
        this.pos = createVector(width/2-((2*89-29*2-29*2)*sin(deltaT[i])),height/2+((2*89-29*2-29*2)*cos(deltaT[i])))
        deltaT[i]+=0.003
      }

      if(this.scene == 6){
        if(this.i == "deltA")
        this.pos = createVector(width/2-((2*89-29*2-29*2-20*2)*sin(deltaT[i])),height/2+((2*89-29*2-29*2-20*2)*-cos(deltaT[i])))
        deltaT[i]+=0.001
      }



      if(this.scene == 5) {
        if(i%8 == 0){
          this.i = "deltA"
          this.pos = createVector((width/2)-((2*89-moveA-moveB-moveC)*sin(deltaT[i])),(height/2)+((2*89-moveA-moveB-moveC)*cos(deltaT[i])))
        }
      }


      if(this.scene == 4){
        if(i%4 == 0){
          this.i = "gamA"
          this.pos = createVector((width/2)-((2*89-moveA-moveB)*sin(deltaT[i])),(height/2)+((2*89-moveA-moveB)*cos(deltaT[i])))
        }
      }

      if(this.scene == 3){
        if(i%2 == 0){
          this.i = "betA"
          this.pos = createVector((width/2)-((2*89-moveA)*sin(deltaT[i])),(height/2)+((2*89-moveA)*cos(deltaT[i])))
        }
      }
  }
  show(i){
    if(this.i == "shrapNel"){
      strokeWeight(3)
      stroke(this.hue,100,100,80)
      point(this.pos.x,this.pos.y)
    }
    else{
      strokeWeight(8)
      stroke(this.hue,100,100,100)
      point(this.pos.x,this.pos.y)
    }
  }
}
