var song
var button1
var button
var t = 0
var startOn = false

var grid
var next

var dA = 1
var dB = 0.5
var feed = 0.0545
var k = 0.062

var feedOut = 0.0367
var kOut = 0.0649

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
	//background(03,4,200)
  frameRate(60)
  pixelDensity(1)
  grid = []
  next = []
  for (var x=0;x<width;x++){
    grid[x]=[]
    next[x]=[]
    for(var y=0;y<height;y++){
      grid[x][y] = {a:1,b:0}
      next[x][y] = {a:1,b:0}
    }
  }

  for(var i = (width/2)-5; i<(width/2)+5; i++){
    for(var j = (height/2)-5; j<(height/2)+5; j++){
      grid[i][j].b = 1
      grid[i+55*2][j].b = 1
      grid[i-55*2][j].b = 1
    }
  }


  button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)

  	// put setup code here
}

function draw() {
  background(51)
  loadPixels()


  for (var x=1;x<width-1;x++){
    for(var y=1;y<height-1;y++){
      var a = grid[x][y].a
      var b = grid[x][y].b

      if((y<300 || y>height-300) || (x<100 || x>width-100)){
        next[x][y].a = a +
                       ((dA * laplaceA(x,y)) -
                       (a * b * b) +
                       (feedOut * (1-a)))*1

        next[x][y].b = b +
                       ((dB * laplaceB(x,y)) +
                       (a * b * b) -
                       ((kOut + feedOut) * b))*1
      }
      else{
        next[x][y].a = a +
                       ((dA * laplaceA(x,y)) -
                       (a * b * b) +
                       (feed * (1-a)))*1
        next[x][y].b = b +
                       ((dB * laplaceB(x,y)) +
                       (a * b * b) -
                       ((k + feed) * b))*1
      }

    }
  }



  for (var x=0;x<width;x++){
    for(var y=0;y<height;y++){
      var pix = (x+y*width)*4
      var coL = floor((next[x][y].a-next[x][y].b)*255)
      pixels[pix+0] = 0
      pixels[pix+1] = next[x][y].a*255//floor((next[x][y].b*255)%255)
      pixels[pix+2] = next[x][y].b*255//floor((next[x][y].b*255))
      pixels[pix+3] = 255
    }
  }

  swaP()
  updatePixels()
  if(startOn){
  }
  //
	t += 1
  capturer.capture(document.getElementById('defaultCanvas0'));
}


function swaP(){
  var temp = grid
  grid = next
  next = temp
}

function laplaceA(x,y){
  var sumA = 0
  sumA += grid[x][y].a * -1
  sumA += grid[x-1][y].a * 0.2
  sumA += grid[x+1][y].a * 0.2
  sumA += grid[x][y+1].a * 0.2
  sumA += grid[x][y-1].a * 0.2
  sumA += grid[x-1][y-1].a * 0.05
  sumA += grid[x+1][y-1].a * 0.05
  sumA += grid[x-1][y+1].a * 0.05
  sumA += grid[x+1][y+1].a * 0.05
  return sumA
}

function laplaceB(x,y){
  var sumB = 0
  sumB += grid[x][y].b * -1
  sumB += grid[x-1][y].b * 0.2
  sumB += grid[x+1][y].b * 0.2
  sumB += grid[x][y+1].b * 0.2
  sumB += grid[x][y-1].b * 0.2
  sumB += grid[x-1][y-1].b * 0.05
  sumB += grid[x+1][y-1].b * 0.05
  sumB += grid[x-1][y+1].b * 0.05
  sumB += grid[x+1][y+1].b * 0.05
  return sumB
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
