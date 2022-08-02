var song
var button1
var button
var startOn = false

var len
var wid
var a

var angle = 0

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
	colorMode(HSB, 239,239,239,100)
	background(03,4,200)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)

  len = height
  wid = width
  a = 3
  	// put setup code here
}

function draw() {


	background(1,0,239)

  if(startOn){

    var x = 200
    for(i = -5; i <= width; i+=20){
      for(j = -5; j<= height; j+=20){
        stroke(3,200,200,85)
        strokeWeight(20)
        point(i+random(10,70)*sin(angle),j+random(80,160)*sin(angle))
        angle+=0.0027
      }
      x+=1
    }
    a+=3
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
