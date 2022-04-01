var img
var song
var d = 20
var amplitude

function preload() {
  // Get the most recent earthquake in the database
	img = loadImage('https://images.pexels.com/photos/2903325/pexels-photo-2903325.jpeg'); // Load the image
	song = loadSound("uplift.mp3")
}


function setup() {
	createCanvas(1080/4, 1920/4)
	background(250,116,150)
	bubble = new Bubble((1080/4)/2,(1920/4)/2, 20,233,170,130 )
	button = createButton("Play")
	button.mousePressed(songToggle)
	amplitude = new p5.Amplitude();
	// put setup code here
}

function draw() {
	background(250,116,150)
	bubble.show()
	bubble.move()
}

function songToggle(){
	if(song.isPlaying()){
		song.stop()
	}
	else{
		song.play()
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
