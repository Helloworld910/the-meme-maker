var img
var song
var d = 20
var amplitude
var fftOb
var angle
var redF
var blueF
var greenF

// the frame rate (frames per second)
// the canvas capturer instance


function preload() {
  // Get the most recent earthquake in the database
	img = loadImage('https://images.pexels.com/photos/2903325/pexels-photo-2903325.jpeg'); // Load the image
	song = loadSound("chopinPro.wav")

}


function setup() {
	createCanvas(1080/4, 1920/4)
	background(250,116,150)
	console.log("song duration:", song.duration())
	console.log("song sampling rate", song.sampleRate())
	console.log("number of frames in song", song.frames())
	bubble = new Bubble((1080/4)/2,(1920/4)/2, 20,233,170,130 )
	button = createButton("Play")
	button.mousePressed(songToggle)
	amplitude = new p5.Amplitude(0.1)
	fftOb = new p5.FFT(0.99, 16)
	// put setup code here
}

function draw() {
	background(250, 116, 150)
	translate((1080/4)/2, height)
	if(song.isPlaying()){
		var spectrum = fftOb.analyze()
		var redF = spectrum[1]
		var greenF = spectrum[3]
		var blueF = spectrum[6]
		var finalRed = map(redF, 0, 255, 80,160)
		var finalGreen = map(greenF, 0, 255, 20,30)
		var finalBlue = map(blueF, 0, 30, 40,70)
		background(finalRed,finalGreen,finalBlue)
	}
	branch(100)

}

function songToggle(){
	if(song.isPlaying()){
		song.stop()
	}
	else{
			song.play()
		}
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
