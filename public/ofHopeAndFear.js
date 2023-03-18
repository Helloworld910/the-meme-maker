var song
var button1
var button
var deltaT = 0
var deltatB = 0
var flock = []
var startOn = false
var hoPe = 0
var feAr = 0
var aEye = []
var aLook = []
var blastState = false
var blasted = false
var shiftState = false
var finalState = false
var finalCount = 0
var sceneTime = 0
var finalTime = 170
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
	colorMode(HSB, 360, 100, 100, 100)
	background(3,4,90)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
  flock[0] = new Boid([width/2, height/2], "reCenter")

  	// put setup code here
}

function draw() {

  if(startOn){
  //Colors:
  //noStroke()
  //fill(355,98.2,85.1)
  //rect(0,0,width,height/4)
  //fill(344,98.2,85.1)
  //rect(0,height/4,width,height/4)
  //fill(237,97.8,34.9)
  //rect(0,height*(2/4),width,height/4)
  //fill(220,98.2,65.1)
  //rect(0,height*(3/4),width,height/4)
  background(40, 16, 99, 50)
  noStroke()
  fill(203, 46, 74)
  ellipse(width/2,0,width,width*(3/5))

  if(blastState != true){
    noStroke()
    fill(201, 100, 29)
    ellipse(width/2,height,width,width*(3/5))
  }

  //for(var i = 0; i<flock.length;i++){
  //}
  if(sceneTime < 20){
    feAr = 2*2
    hoPe = 1
  }
  if(sceneTime > 20 && sceneTime < 30){
    feAr = 1
    hoPe = 1
  }
  if(sceneTime > 30 && sceneTime < 40){
    feAr = 1
    hoPe = 2*2
  }

  if(sceneTime > 40 && sceneTime < 50){
    feAr = 2*2
    hoPe = 1
  }

  if(sceneTime > 50 && sceneTime < 60){
    feAr = 1
    hoPe = 1
  }
  if(sceneTime > 60 && sceneTime < 90){
    feAr = 2*2
    hoPe = 1
  }

  if(sceneTime > 90 && sceneTime < 100){
    feAr = 1
    hoPe = 1
  }
  if(sceneTime > 100 && sceneTime < 180){
    feAr = 1
    hoPe = 2*2
  }

  if(sceneTime > 180 && sceneTime < 230){
    feAr = 2*2
    hoPe = 1
  }

  if(sceneTime > 230 && sceneTime < 240){
    feAr = 1
    hoPe = 1
  }

  if(sceneTime > 240 && sceneTime < 290){
    feAr = 2*2
    hoPe = 1
  }

  if(sceneTime > 290 && sceneTime < 300){
    feAr = 1
    hoPe = 1
  }

  if(sceneTime > 300 && sceneTime < 320){
    feAr = 2*2
    hoPe = 1
  }

  if(sceneTime == 320){
    feAr = 1
    hoPe = 1
    shiftState = true
  }


  if(finalState == true){
    finalCount+=1
  }

  if(finalCount > 0 && finalCount < 50){
    feAr = 1
    hoPe = 3*2
  }

  if(finalCount > 50 && finalCount < 70){
    feAr = 1
    hoPe = 1
  }

  if(finalCount > 70 && finalCount < 80){
    feAr = 2*2
    hoPe = 1
  }

  if(finalCount > 80 && finalCount < 90){
    feAr = 1
    hoPe = 1
  }

  if(finalCount > 90){
    feAr = 1
    hoPe = 5*2
  }

  for(var i = 0; i<flock.length;i++){
      flock[i].update(i)
      flock[i].show(i)
  }

  if(blasted == true){
    finalTime -= 1
  }

  deltaT += 0.5
  deltatB += 0.5
  sceneTime += 1

  if(finalTime == 0){
    for(var k = 0; k<50*2; k++){
      var hueVal = random(0,360)
      var explOd = new Boid([flock[0].pos.x,flock[0].pos.y],"blasts",hueVal)
      flock.push(explOd)
    }
    flock.splice(0,1)
  }

  console.log(sceneTime)
  console.log(shiftState)

  //fill(237,97.8,34.9)
  //rect((width/2)-(15),(height/2)-(15),30,30)

  //fill(237,97.8,34.9)
  //ellipse(width/2,(height/2)-35,20,20)

  //triangle((width/2)-10,(height/2)-55,(width/2)+10,(height/2)-55, width/2, (height/2)-65)

  //stroke(03,97,85)
  //setLineDash([5, 5])
  //setLineDash([5, 10, 30, 10])
  //line((width/2)-10,(height/2)-35,0,height)
  //line((width/2)+10,(height/2)-35,width,height)


  }

  strokeWeight(21)
  stroke(0,100,47)
  noFill()
  setLineDash([0, 0])
  rect(0, 0, width, height)
  //
  capturer.capture(document.getElementById('defaultCanvas0'));
}

class Boid{
  constructor(posI, Iam, huE){
    if(Iam == "reCenter"){
      this.pos = createVector(posI[0],posI[1])
      this.vel = createVector(0,0)
      this.acc = createVector(0,0)
      this.Iam = Iam
      this.maxSpeed = 10
      this.lifeSpan = 130
    }
    if(Iam == "blasts"){
      this.pos = createVector(posI[0],posI[1])
      this.vel = createVector(random(-2,2),random(-2,2))
      this.acc = createVector(0,0)
      this.hue = huE
      this.Iam = Iam
      this.maxSpeed = 10
      this.lifeSpan = 130
    }

  }
  update(i){
    if(this.Iam == "reCenter"){
      this.vel.y = feAr - hoPe
    }

    this.pos.y = this.pos.y + random(-2*2,2*2)
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.lifeSpan -= 1

    if(this.pos.y>height){
      if(this.Iam == "reCenter"){
        this.pos.y = 0
      }
    }
    if(this.pos.y<-110){
      if(this.Iam == "reCenter"){
        if(blastState != true){
          blastState = true
        }
        this.pos.y = height
      }
    }
    if(blastState == true){
      if(blasted != true){
        for(var k = 0; k<13*2; k++){
          var hueVal = random(0,360)
          var explOd = new Boid([this.pos.x+(k*8*2),this.pos.y],"blasts",hueVal)
          flock.push(explOd)
        }
        for(var k = 0; k<13*2; k++){
          var hueVal = random(0,360)
          var explOd = new Boid([this.pos.x-(k*8*2),this.pos.y],"blasts",hueVal)
          flock.push(explOd)
        }

        for(var k = 0; k<8*2; k++){
          var hueVal = random(0,360)
          var explOd = new Boid([this.pos.x+(k*8*2),this.pos.y-20],"blasts",hueVal)
          flock.push(explOd)
        }
        for(var k = 0; k<8*2; k++){
          var hueVal = random(0,360)
          var explOd = new Boid([this.pos.x-(k*8*2),this.pos.y-20],"blasts",hueVal)
          flock.push(explOd)
        }
        for(var k = 0; k<5*2; k++){
          var hueVal = random(0,360)
          var explOd = new Boid([this.pos.x+(k*8*2),this.pos.y-40],"blasts",hueVal)
          flock.push(explOd)
        }
        for(var k = 0; k<5*2; k++){
          var hueVal = random(0,360)
          var explOd = new Boid([this.pos.x-(k*8*2),this.pos.y-40],"blasts",hueVal)
          flock.push(explOd)
      }
      blasted = true
    }
  }
}
  show(i){
    if(this.Iam == "reCenter"){
      fill(356, 91, 76)
      ellipse(this.pos.x, this.pos.y, 16*2)
      beginShape()
      vertex(this.pos.x+5*2, this.pos.y)
      vertex(this.pos.x-5*2, this.pos.y)
      vertex(this.pos.x, this.pos.y-21*2)
      endShape()
      beginShape()
      vertex(this.pos.x, this.pos.y+5*2)
      vertex(this.pos.x+89*2*sin(deltaT*(3/5)), this.pos.y+42*2-cos(deltaT*(3/5)))
      vertex(this.pos.x, this.pos.y+55*2)
      vertex(this.pos.x-89*2*sin(deltaT*(3/5)), this.pos.y+42*2+cos((deltaT*(3/5))))
      vertex(this.pos.x, this.pos.y+5*2)
      endShape()
      beginShape()
      vertex(this.pos.x, this.pos.y+47*2)
      vertex(this.pos.x+34*2, this.pos.y+68*2)
      vertex(this.pos.x-34*2, this.pos.y+68*2)
      vertex(this.pos.x, this.pos.y+47*2)
      endShape()
      if(shiftState == false){
        aEye[0] = 0
        aEye[1] = 0
        //bEye[0] = -8*sin(deltaT*(1/5))
        //bEye[1] = 8*cos(deltaT*(1/5))
        aLook[0] = width/2
        aLook[1] = height
        deltatB = 0
      }
      if(shiftState == true){
        if(deltatB*(1/5) < PI - 1/3){
          aEye[0] = 0
          aEye[1] = 0
          //bEye[0] = -8*sin(deltaT*(1/5))
          //bEye[1] = 8*cos(deltaT*(1/5))
          aLook[0] = height*sin(deltatB*(1/5))
          aLook[1] = height*cos(deltatB*(1/5))
        }
        if(deltatB*(1/5) > PI){
          finalState = true
        }
      }
      stroke(0, 100, 47)
      strokeWeight(5)
      //point(this.pos.x+aEye[0], this.pos.y+aEye[1])
      //point(this.pos.x+aEye[0], this.pos.y-aEye[1])
      setLineDash([5*2, 10*2, 30*2, 10*2])

      if(blastState != true){
        if(shiftState!=true){
          line(this.pos.x+aEye[0], this.pos.y+aEye[1], aLook[0]+30*2, aLook[1])
          line(this.pos.x+aEye[0], this.pos.y+aEye[1], aLook[0]-30*2, aLook[1])
        }
        if(shiftState==true){
          line(this.pos.x+aEye[0], this.pos.y+aEye[1], aLook[0]+130*2, aLook[1])
          line(this.pos.x+aEye[0], this.pos.y+aEye[1], aLook[0]-130*2, aLook[1])
        }
      }
      //point(this.pos.x,this.pos.y-30)
      //strokeWeight(3)
      //line(this.pos.x,this.pos.y-30, this.pos.x,this.pos.y-50)
      //beginShape()
      //noStroke()
      //vertex(this.pos.x+38, this.pos.y+50)
      //vertex(this.pos.x-38, this.pos.y+50)
      //vertex(this.pos.x, this.pos.y+30)
      //endShape()
      //point(this.pos.x,this.pos.y-30)
    }
    if(this.Iam == "blasts"){
      if(this.lifeSpan > 0){
        stroke(this.hue,91,76)
        strokeWeight(5)
        point(this.pos.x, this.pos.y)
      }
    }
  }
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
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
