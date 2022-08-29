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
  //strokeWeight(21)
  //stroke(0,0,50)
  //noFill()
  //rect(0,0,width,height,21)

	if(startOn){
  }
	rootX = width/2
	rootY = height/2
	satAx = 150*2*sin(angleA)+rootX
	satAy = 150*2*cos(angleA)+rootY
	satBx = 80*2*-1*cos(angleA)+rootX
	satBy = 80*2*-1*sin(angleA)+rootY
	satCx = 70*2*sin(angleB)+satBx
	satCy = 70*2*cos(angleB)+satBy
	stroke(239-(angleB%239),200,200,100)
	//point(rootX, rootY)

	//point(satAx, satAy)
	//point(satBx, satBy)
	strokeWeight(5)
	line(30*2*sin(angleB-0.4)+satBx, 30*2*cos(angleB-0.4)+satBy, satCx, satCy)

	angleA+=0.01
	angleB+=0.1
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
