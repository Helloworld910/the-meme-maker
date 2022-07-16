var song
var button1
var button
var startOn = false
var aX,aY
var tX,tY
var alphA,betA,deltA,epsI
var iter = 1000

var capturer = new CCapture({
	framerate: 24,
	verbose: true,
  format: "png"
})
// the frame rate (frames per second)
// the canvas capturer instance

function preload() {
  // Get the most recent earthquake in the database
	song = loadSound("chopinPro.wav")

}


function setup() {
	createCanvas(720, 1080)
	colorMode(HSB, 239,239,239,100)
	background(03,2,205)
  button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
  aX = 0
  aY = 0
  //alphA = random(-PI,PI)
  //betA = random(-PI,PI)
  //deltA = random(-PI,PI)
  //epsI = random(-PI,PI)

  alphA = 1.9446686684375907
  betA = 2.9760338229418943
  deltA = 1.7507087108120833
  epsI = -1.1262771405096266

  console.log(alphA,betA,deltA,epsI)



  	// put setup code here
}

function draw() {
  if(startOn){
		deJong(alphA,betA,deltA,epsI)
  }
  stroke(189,50,130,10)
  strokeWeight(8)
  noFill()
  rect(0,0,width,height)
  capturer.capture(document.getElementById('defaultCanvas0'));
}

function deJong(alph,bet,delt,eps){

  for(var i = 0; i<3000;i++){
    push()
    translate(width/2,height/2)
    strokeWeight(3)
    stroke(03,170,190,4)
    point((aX*150)+8, (aY*270)+40)
    tX = sin(alph*aY) -cos(bet*aX)
    tY = sin(delt*aX) -cos(eps*aY)
    aX=tX
    aY=tY
    pop()
  }
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
	if(song.isPlaying()){
		let level = amplitude.getLevel();
		let ampli = map(level, 0, 1, 2, 20);
		line(0, 0, 0, -len)
		stroke(255)
		translate(0, -len)
		if(len>4){
			push()
			rotate(PI/ampli)
			branch(len*(1/1.618))
			pop()
			push()
			rotate(-(PI/ampli))
			branch(len*(1/1.618))
			pop()
		}
	}
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
