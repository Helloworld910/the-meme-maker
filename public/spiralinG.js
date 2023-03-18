var song
var button1
var button
var deltaT = 0
var startOn = false
var aN = 50
var loC = 0
var huE = 0
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
  angleMode(RADIANS)
	background(0,0,85)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)

  	// put setup code here
}

function draw() {



	background(0,0,85)
  //line(0,height/2,width, height/2)
  //line(width/2,0,width/2,height)


  push()
  translate(width/2,height/2)

  strokeWeight(3)

  fracLe(loC)

  pop()


  loC+=1
  huE=0

  //noStroke()

  //var switCh = sin(nSway)
  //ellipse(switCh*55,100,5,5)
  //for(i=0;i<=6;i++){
    //rotate(PI/3)
    //fill(random(0,100),100,100,75)
    //ellipse(switCh*55,100,5,5)
  //}
  if(startOn){
  }
  //
	deltaT += 1

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


function fracLe(loC){


  fill(huE%100,100,100,100)
  ellipse(0, 0, loC, loC)
  //fill(0,100,0,100)
  //ellipse(0,0,5,5)
  //loC-=100
  //huE+=13
  //if(loC>0){
    //fracLe(loC)
  //}
}
