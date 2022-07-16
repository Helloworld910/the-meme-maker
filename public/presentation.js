var song
var myFont
var tarGet
var button1
var button
var xOff = 0
var yOff
var startOn = false
var img
var imHeight, imWidth
var picData = []
var flock = []
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
  img = loadImage("background-presentation.png")
  myFont = loadFont("Roboto-Bold.ttf")

}


function setup() {
	createCanvas(1920, 1080)
	colorMode(HSB, 239,239,239,100)
	background(154,132,88)
	button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
  textSize(146)
  textFont(myFont)
  textAlign(LEFT, TOP)
  targetHead = myFont.textToPoints("RACIAL ATTITUDES", width*0.38*0.38*0.38, height*0.38*0.62)
  textSize(90)
  targetName = myFont.textToPoints("Benassi Caterina and Shivam Sen", width*0.38*0.38, height*0.38*0.62 + (height*0.38)*0.38)
  targetSub = myFont.textToPoints("Social and Political Attitudes", width*0.38*0.38, height*0.38*0.62 + (height*0.38)*0.38 + (height*0.38)*0.38)
  targetUni = myFont.textToPoints("Università degli Studi di Milano", width*0.38*0.38, height*0.38*0.62 + (height*0.38)*0.38 + (height*0.38)*0.38 + (height*0.38)*0.38)
  targetYear = myFont.textToPoints("2021-2022", width*0.38*0.38, height*0.38*0.62 + (height*0.38)*0.38 + (height*0.38)*0.38 + (height*0.38)*0.38 + (height*0.38)*0.38)
  yOff = 0

  tarGet = targetHead.concat(targetName,targetSub,targetUni,targetYear)
  console.log(tarGet.length)
  for(var i = 0; i<tarGet.length; i++){
    flock[i] = new Boid("Text", tarGet[i].x, tarGet[i].y)
    xOff+=10
    yOff+=10
  }


  //for(var y = 0; y < imHeight; y++){
    //for(var x = 0; x < imWidth; x++){
      //var index = (x + y * imWidth)*4
      //var r = img.pixels[index+0]
      //var g = img.pixels[index+1]
      //var b = img.pixels[index+2]
      //var a = img.pixels[index+3]
      //var bright = (r+g+b)/3
      //pixels[index+0] = r
      //pixels[index+1] = g
      //pixels[index+2] = b
      //pixels[index+3] = a

      //if(a>30){

        //var birdAttri = [x+520,y+800,r,g,b,a]
        //birdPicData.push(birdAttri)
      //}
    //}
  //}
  //console.log(birdPicData.length)
  //for(var i = 0; i<birdPicData.length;i++){
    //flock[i] = new Boid("birdFinder",birdPicData[i][0],birdPicData[i][1],birdPicData[i][2],birdPicData[i][3],birdPicData[i][4],birdPicData[i][5])
  //}


  	// put setup code here
}

function draw() {

  background(154,132,88)
  image(img, 0, 0, width, height)
  if(startOn){
    for(var i = 0; i<flock.length; i++){
      flock[i].show(i)
      flock[i].behave(i)
      flock[i].update(i)
    }
  }
  //
  capturer.capture(document.getElementById('defaultCanvas0'));
}


class Boid{
  constructor(Iam,xTar,yTar,rVal,gVal,bVal,aVal){
    this.i = Iam
    this.pos = createVector(((0+xOff+floor(random(-7,7)))%width),floor(random(-900,0)))
    this.vel = createVector(0,random(1,5))
    this.acc = createVector(0,0)
    this.target = createVector(xTar,yTar)
    this.maxSpeed = 5
    this.maxForce = 0.5
    this.lifeSpan = 800
    this.heightCheck = 40
  }

  seek(tar){
    var desire = p5.Vector.sub(tar, this.pos)
    desire.setMag(4)
    var steer = p5.Vector.sub(desire, this.vel)
    steer.limit(this.maxForce)
    return steer
  }


  arrive(tar){
    var desire = p5.Vector.sub(tar, this.pos)
    var d = desire.mag()
    var speed = this.maxSpeed
    if(d<60){
      speed = map(d,0,60,0,this.maxSpeed)
    }
    desire.setMag(speed)
    var steer = p5.Vector.sub(desire, this.vel)
    steer.limit(this.maxForce)
    return steer
  }


  behave(i){
    if(this.lifeSpan < 100){
      var seek = this.arrive(this.target)
      this.applyForce(seek)
    }
    //if(this.lifeSpan<110){
      //if(this.pos.y<this.heightCheck+random(0,5)){
        //if(this.i=="normaL"){
          //this.vel = p5.Vector.random2D()
          //this.vel.mult(random(1,3))
          //this.maxSpeed = 5
          //this.i = "ouT"
        //}
      //}
    //}
  }



  applyForce(f){
    this.acc.add(f)
  }

  update(i){
    this.pos.add(this.vel)
    this.vel.add(this.acc)
    this.vel.limit(this.maxSpeed)
    this.acc.mult(0)
    this.lifeSpan -= 1

    if(this.lifeSpan == 100){
      this.maxSpeed = 10
    }


    if(this.pos.y > height){
      this.pos.y = 0
    }
  }



  show(i){
    stroke(0,0,239)
    if(this.target.y < height*0.38*0.62){
      strokeWeight(7)
    }
    else{
      strokeWeight(4.5)
    }
    point(this.pos.x,this.pos.y)
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
