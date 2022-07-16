var img
var song
var button1
var button
var angle = 0
var w = 20
var l = 0
var offset = 0
var xOff = 0.0
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
  img = loadImage('box-texture.jpg')

}


function setup() {
	createCanvas(720, 720, WEBGL)

	background(250,116,150)
  button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)

  	// put setup code here
}

function draw() {
	background(190, 190, 190)
  rectMode(CENTER);
  camera(-600, -400, 800, 0, 0, 0, 0, 1, 0)
  offset = 0
  for(var pZ = 0; pZ < height ; pZ+=w){
    for(var pX = 0; pX < width ; pX+=w){
      push()
      var distAn = dist(pX,pZ, width/2, height/2)
      offset = map(distAn, 0, 700, -1,1)
      var finAn = angle+(offset*6.3)
      l = map(sin(finAn), -1,1, 130,400)
      var fillVal = noise(xOff)
      var colR = map(fillVal,0,1,0,255)
      translate(pX-(width/2),0,pZ-(height/2))

      if(distAn<300){
        fill(90,27,128)
      }

      if(distAn>=300 && distAn<400){
        fill(73,131,204)
      }
      if(distAn>=400){
        fill(43,11,64)
      }


      box(w-1,l,w-1)
      pop()
      xOff+=0.01

    }
  }

  angle += 0.0618
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





function branch(len){
}




class Bubble{
	constructor(tempX,tempY,tempR, tempredC, tempgreenC, tempblueC){
		this.x = tempX
		this.y = tempY
		this.r = tempR
		this.redC = tempredC
		this.greenC = tempgreenC
		this.blueC = tempblueC
		this.xOff = 0
		this.yOff = 0
	}

	move(){
		if(song.isPlaying()){
			let level = amplitude.getLevel();
			let size = map(level, 0, 1, 20, width);
			this.r = size
		}

	}
	show(){
		stroke(3)
		strokeWeight(1)
		fill(this.redC, this.greenC, this.blueC)
		ellipse(this.x, this.y, this.r, this.r)
	}

}
