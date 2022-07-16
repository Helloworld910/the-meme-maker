var song
var button1
var button
var startOn = false
var aX,aY
var bX,bY
var cX,cY
var tX,tY


var a1X,a1Y
var b1X,b1Y
var c1X,c1Y
var t1X,t1Y


var a2X,a2Y
var b2X,b2Y
var c2X,c2Y
var t2X,t2Y


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
	background(10,10,210)
  button = createButton("Start Reco")
  button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)

  aX = 0
  aY = 0
  bX = width
  bY = 0
  cX = width/2
  cY = height
  tX = random(width)
  tY = random(height)

  //a1X = 0
  //a1Y = 0
  //b1X = 0 - (width/2)
  //b1Y = height
  //c1X = width/2
  //c1Y = height
  //t1X = random(width)
  //t1Y = random(height)

  a1X = width/2
  a1Y = height/2
  b1X = width*0.375
  b1Y = height/4
  c1X = width*0.625
  c1Y = height/4
  t1X = random(width)
  t1Y = random(height)





  //a2X = width
  //a2Y = 0
  //b2X = width/2
  //b2Y = height
  //c2X = width+(width/2)
  //c2Y = height
  //t2X = random(width)
  //t2Y = random(height)

  a2X = width/2
  a2Y = 0
  b2X = width*0.25
  b2Y = height/2
  c2X = width*0.75
  c2Y = height/2
  t2X = random(width)
  t2Y = random(height)





  	// put setup code here
}

function draw() {
  if(startOn){
    sirTri()
  }
  capturer.capture(document.getElementById('defaultCanvas0'));
}

function sirTri(){

  for(var i = 0; i<233;i++){


    //fill(210,100,100,100)
    strokeWeight(1)
    var choice = floor(random(0,3))
    if(choice==0){
      tX = lerp(tX,aX,0.5)
      tY = lerp(tY,aY,0.5)
      stroke(219,180,181,100,100)
      point(tX,tY)

    }

    if(choice==1){
      tX = lerp(tX,bX,0.5)
      tY = lerp(tY,bY,0.5)
      stroke(140,180,181,100,100)
      point(tX,tY)

    }
    if(choice==2){
      tX = lerp(tX,cX,0.5)
      tY = lerp(tY,cY,0.5)
      stroke(231,180,181,100)
      point(tX,tY)

    }

  }
  for(var j = 0; j<21;j++){


    //fill(210,100,100,100)
    strokeWeight(1)
    var choice1 = floor(random(0,3))
    if(choice1==0){
      t1X = lerp(t1X,a1X,0.5)
      t1Y = lerp(t1Y,a1Y,0.5)
      stroke(140,180,181,100,100)
      point(t1X,t1Y)

    }

    if(choice1==1){
      t1X = lerp(t1X,b1X,0.5)
      t1Y = lerp(t1Y,b1Y,0.5)

      stroke(231,180,181,100)
      point(t1X,t1Y)

    }
    if(choice1==2){
      t1X = lerp(t1X,c1X,0.5)
      t1Y = lerp(t1Y,c1Y,0.5)

      stroke(219,180,181,100,100)
      point(t1X,t1Y)

    }

  }for(var k = 0; k<89;k++){


    //fill(210,100,100,100)
    strokeWeight(1)
    var choice2 = floor(random(0,3))
    if(choice2==0){
      t2X = lerp(t2X,a2X,0.5)
      t2Y = lerp(t2Y,a2Y,0.5)
      stroke(219,180,181,100,100)
      point(t2X,t2Y)

    }

    if(choice2==1){
      t2X = lerp(t2X,b2X,0.5)
      t2Y = lerp(t2Y,b2Y,0.5)
      stroke(231,180,181,100)
      point(t2X,t2Y)

    }
    if(choice2==2){
      t2X = lerp(t2X,c2X,0.5)
      t2Y = lerp(t2Y,c2Y,0.5)
      stroke(140,180,181,100,100)
      point(t2X,t2Y)

    }

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
