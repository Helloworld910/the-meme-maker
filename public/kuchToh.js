var song
var button1
var button
var deltaT = 0
var startOn = false
var a1 = {x:0, y:0}
var a2 = {x:0, y:0}
var a3 = {x:0, y:0}
var a4 = {x:0, y:0}
var a5 = {x:0, y:0}
var anchor = {x:0, y:0}

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
	createCanvas(360, 540)
	colorMode(HSB, 100,100,100,100)
	background(3,4,100)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
  anchor.x = width/2
  anchor.y = height/2
  	// put setup code here
}

function draw() {

  //background(3,4,100)
  strokeWeight(3)
  stroke(10,10,10,100)


  a1.x = 10^sin(deltaT)
  a1.y = 10*cos(deltaT)


  a2.x = 55*sin(deltaT/2)
  a2.y = 55*cos(deltaT/2)

  a3.x = 34*sin(deltaT/3)
  a3.y = 34*cos(deltaT/3)

  a4.x = 21*sin(deltaT/4)
  a4.y = 21*cos(deltaT/4)

  a5.x = 10*sin(deltaT/2)
  a5.y = 10*cos(deltaT/2)




  //point(anchor.x, anchor.y)
  //point(anchor.x+a1.x, anchor.y+a1.y)
  //point(anchor.x+a1.x+a2.x, anchor.y+a1.y+a2.y)
  //point(anchor.x+a1.x+a2.x+a3.x, anchor.y+a1.y+a2.y+a3.y)
  //point(anchor.x+a1.x+a2.x+a3.x+a4.x, anchor.y+a1.y+a2.y+a3.y+a4.y)
  point(anchor.x+a1.x+a2.x+a3.x+a4.x+a5.y, anchor.y+a1.y+a2.y+a3.y+a4.y+a5.y)

  //strokeWeight(8)
  //line(anchor.x, anchor.y, anchor.x+a1.x, anchor.y+a1.y)
  //line(anchor.x+a1.x, anchor.y+a1.y, anchor.x+a1.x+a2.x, anchor.y+a1.y+a2.y)
  //line(anchor.x+a1.x+a2.x, anchor.y+a1.y+a2.y, anchor.x+a1.x+a2.x+a3.x, anchor.y+a1.y+a2.y+a3.y)
  //line(anchor.x+a1.x+a2.x+a3.x, anchor.y+a1.y+a2.y+a3.y, anchor.x+a1.x+a2.x+a3.x+a4.x, anchor.y+a1.y+a2.y+a3.y+a4.y)
  //console.log("smallest y", largest)


  //ellipse((width/2)+30*sin(deltaT), (height/2)+30*cos(deltaT), 20,20)
  //
  //
  if(startOn){
  }
  //
	deltaT += 0.05
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
