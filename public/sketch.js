var song
var button1
var button
var deltaT = 0
let oneTime = 0



let lineClockA = 0
let lineClockB = 0
let lineClockC = 0
let lineClockD = 0
let lineClockE = 0
let lineClockF = 0
let lineClockG = 0
let lineClockH = 0
let lineClockI = 0
let lineClockJ = 0
let lineClockK = 0
let lineClockL = 0
let lineClockM = 0
let lineClockN = 0
let lineClockO = 0
let lineClockP = 0
let lineClockQ = 0
let lineClockR = 0
let lineClockS = 0
let lineClockT = 0
let lineClockU = 0
let lineClockV = 0
let lineClockW = 0



let lineTimeA = 1
let lineTimeB = 1
let lineTimeC = 1
let lineTimeD = 1
let lineTimeE = 1
let lineTimeF = 1
let lineTimeG = 1
let lineTimeH = 1
let lineTimeI = 1
let lineTimeJ = 1
let lineTimeK = 1
let lineTimeL = 1
let lineTimeM = 1
let lineTimeN = 1
let lineTimeO = 1
let lineTimeP = 1
let lineTimeQ = 1
let lineTimeR = 1
let lineTimeS = 1
let lineTimeT = 1
let lineTimeU = 1
let lineTimeV = 1
let lineTimeW = 1



let verTime = 1
let verClock = 0
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
	createCanvas(720, 1080)
	colorMode(HSB, 100,100,100,100)
	background(0,0,94)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)

  let nB = 23

  for(let k=1;k<=nB; k++){
    flock.push(new Boid("alphA", floor(random(-width/2,width/2)), floor(random(-(height/2)-150,-(height/2)-50)), 2*150*cos(((k*2*PI)/nB)), 2*150*sin(((k*2*PI)/nB))))
  }
  	// put setup code here
}

function draw() {

  if(startOn){
  if(oneTime<1990){
    background(0,0,94,100)
  }
  if(oneTime>=2000){
    background(0,0,94,40)
  }
  translate(width/2,height/2)
  strokeWeight(5)
  //let xB = 150*cos((2*PI)+deltaT)
  //let yB = 150*sin((2*PI)+deltaT)

  //point(0,0)
  //point(xB,yB)

  //Boids

  if(oneTime < 550){
    for (var k = 0; k<flock.length; k++) {
      //flock[k].edges()
      flock[k].behave(flock)
      flock[k].show()
      flock[k].update(k)
    }
  }



  //KnV or the complete graph with nV vertices.
  let nV = 23

  if(oneTime > 500 && oneTime < 880){

    for(let i = 1; i<=nV; i++){
      let xA = 2*150*cos(((i*2*PI)/nV))
      let yA = 2*150*sin(((i*2*PI)/nV))

      strokeWeight(13)
      stroke(3,95,75)
      point(xA,yA)
    }


    if(oneTime>500 && oneTime < 880){
      if(verTime>=1){
        for(let m = 1; m<=1 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeA); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=2){
        for(let m = 2; m<=2 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeB); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }

      if(verTime>=3){
        for(let m = 3; m<=3; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeC); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=4){
        for(let m = 4; m<=4; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeD); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=5){
        for(let m = 5; m<=5 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeE); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=6){
        for(let m = 6; m<=6 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeF); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }

      if(verTime>=7){
        for(let m = 7; m<=7; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeG); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=8){
        for(let m = 8; m<=8; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeH); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=9){
        for(let m = 9; m<=9 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeI); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=10){
        for(let m = 10; m<=10 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeJ); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }

      if(verTime>=11){
        for(let m = 11; m<=11; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeK); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=12){
        for(let m = 12; m<=12; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeL); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=13){
        for(let m = 13; m<=13 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeM); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=14){
        for(let m = 14; m<=14 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeN); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }

      if(verTime>=15){
        for(let m = 15; m<=15; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeO); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=16){
        for(let m = 16; m<=16; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeP); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=17){
        for(let m = 17; m<=17 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeQ); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=18){
        for(let m = 18; m<=18 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeR); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }

      if(verTime>=19){
        for(let m = 19; m<=19; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeS); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=20){
        for(let m = 20; m<=20; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeT); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=21){
        for(let m = 21; m<=21 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeU); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
      if(verTime>=22){
        for(let m = 22; m<=22 ; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeV); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }

      if(verTime>=23){
        for(let m = 23; m<=23; m++){
          let xL = 2*150*cos(((m*2*PI)/nV))
          let yL = 2*150*sin(((m*2*PI)/nV))
          for(let n = 1; n<=floor(lineTimeW); n++){
            strokeWeight(1)
            line(xL,yL, 2*150*cos(((n*2*PI)/nV)),2*150*sin(((n*2*PI)/nV)))
          }
        }
      }
    }

      //for(let j = 1; j<=twoTime; j++) {
        //strokeWeight(1)
        //line(xA,yA, 150*cos(((j*2*PI)/nV)),150*sin(((j*2*PI)/nV)))
      //}
    //}
  }

  if(oneTime>=880 && oneTime < 1110){

    for(let i = 1; i<=nV; i++){

      //stroke(random(0,100),85,50)
      let xA = 2*150*cos(((i*2*PI)/nV)+deltaT)
      let yA = 2*150*sin(((i*2*PI)/nV)+deltaT)
      for(let j = 1; j<=i; j++) {
        strokeWeight(1)
        line(xA,yA, 2*150*cos(((j*2*PI)/nV)+deltaT),2*150*sin(((j*2*PI)/nV)+deltaT))
      }
      point(xA,yA)
    }

  }
  if(oneTime>=1110 && oneTime < 1340){

    for(let i = 1; i<=nV; i++){

      //stroke(random(0,100),85,50)
      let xA = 2*150*cos(((i*2*PI)/nV)-deltaT)
      let yA = 2*150*sin(((i*2*PI)/nV)-deltaT)
      for(let j = 1; j<=i; j++) {
        strokeWeight(1)
        line(xA,yA, 2*150*cos(((j*2*PI)/nV)-deltaT),2*150*sin(((j*2*PI)/nV)-deltaT))
      }
      point(xA,yA)
    }

  }

  //Twirly Action
  if(oneTime>=1340 && oneTime < 1780){

    for(let i = 1; i<=nV; i++){

      //stroke(random(0,100),85,50)
      let xA = 2*150*cos(((i*2*PI)/nV)+deltaT)
      let yA = 2*150*sin(((i*2*PI)/nV)+deltaT)
      for(let j = 1; j<=i; j++) {
        strokeWeight(1)
        line(xA,yA, 2*150*cos(((j*2*PI)/nV)-deltaT),2*150*sin(((j*2*PI)/nV)-deltaT))
      }
      point(xA,yA)
      flock[i-1].pos.x = xA
      flock[i-1].pos.y = yA
    }

  }

  if(oneTime>=1780){
    for (var k = 0; k<flock.length; k++) {
      flock[k].edges()
      flock[k].behave(flock)
      flock[k].show()
      flock[k].update(k)
    }
  }


  //Times
	deltaT += 0.01
  oneTime += 1
  if(oneTime>500){
    verClock += 0.01
    verTime = min(exp(verClock), 23)
    if(verTime>=1){
      lineClockA += 0.05
      lineTimeA = min(exp(lineClockA), 23)
      if(lineTimeA>23){
        lineTimeA = 23
      }
    }
    if(verTime>=2){
      lineClockB += 0.05
      lineTimeB = min(exp(lineClockB), 23)
      if(lineTimeB>23){
        lineTimeB = 23
      }
    }
    if(verTime>=3){
      lineClockC += 0.05
      lineTimeC = min(exp(lineClockC), 23)
      if(lineTimeC>23){
        lineTimeC = 23
      }
    }
    if(verTime>=4){
      lineClockD += 0.05
      lineTimeD = min(exp(lineClockD), 23)
      if(lineTimeD>23){
        lineTimeD = 23
      }
    }
    if(verTime>=5){
      lineClockE += 0.05
      lineTimeE = min(exp(lineClockE), 23)
      if(lineTimeE>23){
        lineTimeE = 23
      }
    }
    if(verTime>=6){
      lineClockF += 0.05
      lineTimeF = min(exp(lineClockF), 23)
      if(lineTimeF>23){
        lineTimeF = 23
      }
    }
    if(verTime>=7){
      lineClockG += 0.05
      lineTimeG = min(exp(lineClockG), 23)
      if(lineTimeG>23){
        lineTimeG = 23
      }
    }
    if(verTime>=8){
      lineClockH += 0.05
      lineTimeH = min(exp(lineClockH), 23)
      if(lineTimeH>23){
        lineTimeH = 23
      }
    }
    if(verTime>=9){
      lineClockI += 0.05
      lineTimeI = min(exp(lineClockI), 23)
      if(lineTimeI>23){
        lineTimeI = 23
      }
    }
    if(verTime>=10){
      lineClockJ += 0.05
      lineTimeJ = min(exp(lineClockJ), 23)
      if(lineTimeJ>23){
        lineTimeJ = 23
      }
    }
    if(verTime>=11){
      lineClockK += 0.05
      lineTimeK = min(exp(lineClockK), 23)
      if(lineTimeK>23){
        lineTimeK = 23
      }
    }
    if(verTime>=12){
      lineClockL += 0.05
      lineTimeL = min(exp(lineClockL), 23)
      if(lineTimeL>23){
        lineTimeL = 23
      }
    }
    if(verTime>=13){
      lineClockM += 0.05
      lineTimeM = min(exp(lineClockM), 23)
      if(lineTimeM>23){
        lineTimeM = 23
      }
    }
    if(verTime>=14){
      lineClockN += 0.05
      lineTimeN = min(exp(lineClockN), 23)
      if(lineTimeN>23){
        lineTimeN = 23
      }
    }
    if(verTime>=15){
      lineClockO += 0.05
      lineTimeO = min(exp(lineClockO), 23)
      if(lineTimeO>23){
        lineTimeO = 23
      }
    }
    if(verTime>=16){
      lineClockP += 0.05
      lineTimeP = min(exp(lineClockP), 23)
      if(lineTimeP>23){
        lineTimeP = 23
      }
    }
    if(verTime>=17){
      lineClockQ += 0.05
      lineTimeQ = min(exp(lineClockQ), 23)
      if(lineTimeQ>23){
        lineTimeA = 23
      }
    }
    if(verTime>=18){
      lineClockR += 0.05
      lineTimeR = min(exp(lineClockR), 23)
      if(lineTimeR>23){
        lineTimeR = 23
      }
    }
    if(verTime>=19){
      lineClockS += 0.05
      lineTimeS = min(exp(lineClockS), 23)
      if(lineTimeS>23){
        lineTimeS = 23
      }
    }
    if(verTime>=20){
      lineClockT += 0.05
      lineTimeT = min(exp(lineClockT), 23)
      if(lineTimeT>23){
        lineTimeT = 23
      }
    }
    if(verTime>=21){
      lineClockU += 0.05
      lineTimeU = min(exp(lineClockU), 23)
      if(lineTimeU>23){
        lineTimeU = 23
      }
    }
    if(verTime>=22){
      lineClockV += 0.05
      lineTimeV = min(exp(lineClockV), 23)
      if(lineTimeV>23){
        lineTimeV = 23
      }
    }
    if(verTime>=23){
      lineClockW += 0.05
      lineTimeW = min(exp(lineClockW), 23)
      if(lineTimeW>23){
        lineTimeW = 23
      }
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


class Boid {
  constructor(iAm, x, y, xTar, yTar) {
    if(iAm == "alphA"){
      this.iAm = iAm
      this.pos = createVector(x,y)
      this.vel = createVector(0,-3)
      this.acc = createVector()
      this.target = createVector(xTar,yTar)
      this.maxForce = 0.5
      this.maxSpeed = 10
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
    var perceptionRadius = 2*50
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
    var perceptionRadius = 2*48
    if(oneTime>1780){
      perceptionRadius = 70
    }
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

    var perceptionRadius = 2*100

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



  behave(boids) {
    if(this.iAm == "alphA"){
      if(oneTime<350 || oneTime>=1780){
        var alignment = this.align(boids)
        var cohesion = this.cohesion(boids)
        var separation = this.separation(boids)
        this.acc.add(alignment)
        this.acc.add(cohesion)
        this.acc.add(separation)
      }
      var seek = this.arrive(this.target)
      var escape = createVector(0,0)

      this.acc.add(seek)
      this.acc.add(escape)
    }
  }

  edges() {

    if (this.pos.x > width/2) {
      this.pos.x = -width/2
    } else if (this.pos.x < -width/2) {
      this.pos.x = width/2
    }

    if (this.pos.y > height/2) {
      this.pos.y = -height/2
    } else if (this.pos.y < -height/2) {
      this.pos.y = height/2
    }

  }


  update(i) {
    if(this.iAm == "alphA"){
      if(oneTime >= 1990){
        flock.splice(i,1)
        for(var k = 0; k<100; k++){
          var explOd = new Boid("shrapNel",this.pos.x,this.pos.y)
          flock.push(explOd)
        }
      }
    }

    if(this.iAm == "shrapNel"){
      this.curtains -= 1
    }

    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.acc.mult(0)
    this.lifeSpan -= 1


  }


  show() {
    if(this.iAm == "alphA"){
      strokeWeight(13)
      stroke(3,95,75)
      point(this.pos.x, this.pos.y)
    }
    if(this.iAm == "shrapNel"){
      if(this.curtains>0){
        strokeWeight(5)
        stroke(this.hue,95,75)
        point(this.pos.x, this.pos.y)
      }
    }
  }

}
