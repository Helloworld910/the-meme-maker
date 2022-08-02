var song
var button1
var button
var startOn = false

var len
var wid

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

  	// put setup code here
}

function draw() {


	background(03,4,200)
  var x = 0
  for(i = 0; i <= height; i++){
    for(j = 0; j<= width; j++){
      stroke(3,((0.618*239)+x)%239,((0.618*239)+x)%239)
      point(j,i)
    }
    x+= 0.1618
  }


  if(startOn){
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
