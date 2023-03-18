var song
var button1
var button
var deltaT = 0
var startOn = false
var p1 = {x:0,y:0}
var p2 = {x:0,y:0}
var p3 = {x:0,y:0}
var lineS = []
var pointS = []
var timeR = 0
var reset = false
var fade = 0
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
	background(03,4,200)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)

  	// put setup code here
}

function draw() {

  background(0,0,74.9)
  strokeWeight(10)

  if(startOn){

  p1.x = (width/2)+300*sin(deltaT)
  p1.y = (height/2)-300*cos(deltaT)
  p2.x = (width/2)+300*sin(deltaT/6)
  p2.y = (height/2)-300*cos(deltaT/6)
  //p3.x = (width/2)+100*sin(deltaT/3)
  //p3.y = (height/2)-100*cos(deltaT/3)
  //point(p1.x,p1.y)
  //point(p2.x,p2.y)
  if(!reset){
    pointS.push({ax:p1.x, ay:p1.y, bx:p2.x, by:p2.y})
    console.log("points added")
  }


  if(deltaT>37.2){
    strokeWeight(89)
    stroke(0,0,14.9,fade)
    point(width/2, height/2)
    fade+=1
  }
  if(deltaT>7){
    if(!reset){
      deltaT=0
      reset=true
    }
  }
  for(var i = 0; i<pointS.length; i++){
    strokeWeight(8)
    stroke(0,0,5.1,100)
    point(pointS[i].ax, pointS[i].ay)
    //point(pointS[i].bx, pointS[i].by)
  }
  if(reset){
    if(timeR == 4 && deltaT<37.2){
      lineS.push({ax:p1.x, ay:p1.y, bx:p2.x, by:p2.y, cx:p3.x, cy:p3.y})
      timeR = 1
    }

    for(var i = 0; i<lineS.length; i++){
      strokeWeight(1)
      stroke(0,0,14.9,100)
      line(lineS[i].ax, lineS[i].ay, lineS[i].bx, lineS[i].by)
      //line(lineS[i].ax, lineS[i].ay, lineS[i].cx, lineS[i].cy)
      //line(lineS[i].cx, lineS[i].cy, lineS[i].bx, lineS[i].by)
    }
    timeR+=1
  }
  deltaT += 0.02

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
