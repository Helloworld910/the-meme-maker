var song
var button1
var button
var startOn = false
var p0,p1,p2,p3
var movePoints = []

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
	//p0 = createVector(0,0)
	//p1 = p5.Vector.lerp(p0, p3, 0.33)
	//p2 = p5.Vector.lerp(p0,p3, 0.66)
	//p3 = createVector(width,height)

	movePoints[0] = new Particle(0,0,"anchor",0.2*2.66,0.4*2.25)
	movePoints[1] = new Particle(width,height,"anchor",-0.2*2.66,-0.4*2.25)
	movePoints[2] = new Particle(0,0.33*height,"control",0.4*2.66,0.2*2.25)
	movePoints[3] = new Particle(width,height*0.66,"control",-0.4*2.66,-0.2*2.25)


  	// put setup code here
}

function draw() {
  background(03,4,200,20)
  strokeWeight(5)
	//line(p0.x,p0.y,p1.x,p1.y)
	//point(((p1.x-p0.x)*t), (p1.y-p0.y)*t)
	//beginShape()
	//endShape()
		//else{
			//point(p0.x,p0.y)
			//point(p1.x,p1.y)
		//}
  //point(21,21)
  //point(mouseX,mouseY)
  //point(width-21,(height*2)/3)
  //point(width-21,height-21)
  //noFill()
	//beginShape()
	//vertex(21,21)
	//bezierVertex(mouseX, mouseY, mouseX, mouseY, width-21,height-21)
	//endShape()
  //bezier(21,21,mouseX,mouseY,mouseX,mouseY,width-21,height-21)
  //line(21,21,mouseX,mouseY)
  //line(mouseX,mouseY,width-21,height-21)
  //line(0,0,width,height)


	if(startOn){
		for(var t = 0; t<=1.001; t+=0.04){

			stroke(t*239,200,200,40)
			var x1 = lerp(movePoints[0].pos.x, movePoints[2].pos.x, t)
			var y1 = lerp(movePoints[0].pos.y, movePoints[2].pos.y, t)
			var x2 = lerp(movePoints[2].pos.x, movePoints[3].pos.x, t)
			var y2 = lerp(movePoints[2].pos.y, movePoints[3].pos.y, t)

			var x3 = lerp(movePoints[2].pos.x, movePoints[3].pos.x, t)
			var y3 = lerp(movePoints[2].pos.y, movePoints[3].pos.y, t)
			var x4 = lerp(movePoints[3].pos.x, movePoints[1].pos.x, t)
			var y4 = lerp(movePoints[3].pos.y, movePoints[1].pos.y, t)



			var xA = lerp(x1,x2,t)
			var yA = lerp(y1,y2,t)

			var xB = lerp(x3,x4,t)
			var yB = lerp(y3,y4,t)
			var x = lerp(xA,xB,t)
			var y = lerp(yA,yB,t)


			//point(x1,y1)
			//point(x2,y2)
			//point(x3,y3)
			//point(x4,y4)
			//point(xA,yA)
			//point(xB,yB)
			//vertex(x,y)
			line(x1,y1,x2,y2)
			line(x3,y3,x4,y4)
			line(xA,yA,xB,yB)
		}
		for(var i = 0; i<movePoints.length;i++){
			movePoints[i].update()
		}

  }
  //
  capturer.capture(document.getElementById('defaultCanvas0'));
}


class Particle{
	constructor(x,y,Iam,dx,dy){
		this.pos = createVector(x,y)
		this.Iam = Iam
		this.vel = createVector(dx,dy)
    this.acc = createVector(0,0)
		this.maxSpeed = 1

	}

  update(){
		this.pos.add(this.vel)
		this.vel.add(this.acc)
		this.vel.limit(this.maxSpeed)

		if(this.pos.y<0 || this.pos.y>height){
			this.vel.mult(-1)
		}
		if(this.pos.x<0 || this.pos.x>width){
			this.vel.mult(-1)
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
