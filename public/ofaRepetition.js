var song
var button1
var button
var startOn = false

var rootX, rootY, satAx, satAy, satBx, satBy, satCx, satCy
var angleA = 0
var angleB = 0

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

  	// put setup code here
}

function draw() {


  if(startOn){
    rootX = width/2
    rootY = height/2
    satAx = 150*2*sin(angleA)+rootX
    satAy = 150*2*cos(angleA)+rootY
    satBx = 80*2*sin(angleA)+rootX
    satBy = 80*2*cos(angleA)+rootY
    satCx = 50*2*sin(angleB)+satBx
    satCy = 50*2*cos(angleB)+satBy
    strokeWeight(21)
    stroke(angleB%239,200,200,100)
    point(satCx, satCy)

    angleA+=0.01
    angleB+=0.1
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
