// the frame rate (frames per second)
// the canvas capturer instance
var dire = -13
var dim = 600
var swirl = 0
var fiboA = 0
var fiboB = 1
var fiboAtemp
var xOff = 0.0
var yOff = 0.0
var zOff = 0.0

var proMat
var r1
var r2
var z

var distance = 4

var testMat = []

testMat[0] = [3]
testMat[1] = [6]
testMat[2] = [1]


console.log(testMat)


function matMul(matA,matB){
	numRowA = matA.length
	numColA = matA[0].length
	numRowB = matB.length
	numColB = matB[0].length

	if(numColA == numRowB){
		var answer = []
		for (var i = 0; i < numRowA; i++) {
			answer[i] = []
			for (var j = 0; j < numColB; j++) {
				var sum = 0;
				for (var k = 0; k < numColA; k++) {
					sum += matA[i][k] * matB[k][j]
				}
				answer[i][j] = sum
			}
		}
		return answer
	}
	else{
		return "Not multipliable"
	}

}


var rotationMat



var strokeVaR
var strokeVaG
var strokeVaB
var startOn = false
var noiseVaR
var noiseVaG
var noiseVaB
var angle = 0
var button1
var button
var capturer = new CCapture({
	framerate: 24,
	verbose: true,
  format: "png"
});


function preload() {
  // Get the most recent earthquake in the database
}


function setup() {
	createCanvas(720,1080)
  background(255)
  button = createButton("Start Reco")
	button.mousePressed(capStart)
  button1 = createButton("Stop Reco")
	button1.mousePressed(capStop)
	//background(random(0,255),random(0,255),random(0,255))
  angleMode(DEGREES)
}

function draw() {
  if(startOn){
  }
	background(03)



	rotationMatXW = [[cos(angle),0,0,-sin(angle)],
									[0,1,0,0],
									[0,0,1,0],
									[sin(angle),0,0,cos(angle)]]

	rotationMatYZ = [[1,0,0,0],
									[0,cos(angle),-sin(angle),0],
									[0,sin(angle),cos(angle), 0],
									[0,0,0,1]]


	rotationMatXZ = [[cos(angle), 0, -sin(angle),0],
									[0,1,0,0],
									[sin(angle), 0, cos(angle), 0],
									[0,0,0,1]]


	rotationMatXYAct = [[cos(angle),-sin(angle),0,0],
											[sin(angle),cos(angle),0,0],
											[0,0,1,0],
											[0,0,0,1]]


	rotationMatYW = [[1,0,0,0],
									[0, cos(angle), 0, -sin(angle)],
									[0,0,1,0],
									[0, sin(angle), 0, cos(angle)]]


	rotationMatZW = [[1,0,0,0],
									[0,1,0,0],
									[0,0,cos(angle),-sin(angle)],
									[0,0,sin(angle),cos(angle)]]




	rotationMatPre = matMul(rotationMatZW,rotationMatXYAct)

	rotationMatXY = matMul(rotationMatPre,rotationMatYZ)




	spiR()
  capturer.capture(document.getElementById('defaultCanvas0'));
	angle+=2
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


function spiR(){
	push()
	let scale = 0.5


	let a = new ultraDVector(-scale,-scale,-scale,scale)
	let b = new ultraDVector(scale,-scale,-scale,scale)
	let c = new ultraDVector(scale,scale,-scale,scale)
	let d = new ultraDVector(-scale,scale,-scale,scale)
	let e = new ultraDVector(-scale,-scale,scale,scale)
	let f = new ultraDVector(scale,-scale,scale,scale)
	let g = new ultraDVector(scale,scale,scale,scale)
	let h = new ultraDVector(-scale,scale,scale,scale)
	let iVec = new ultraDVector(-scale,-scale,-scale,-scale)
	let jVec = new ultraDVector(scale,-scale,-scale,-scale)
	let kVec = new ultraDVector(scale,scale,-scale,-scale)
	let lVec = new ultraDVector(-scale,scale,-scale,-scale)
	let mVec = new ultraDVector(-scale,-scale,scale,-scale)
	let nVec = new ultraDVector(scale,-scale,scale,-scale)
	let oVec = new ultraDVector(scale,scale,scale,-scale)
	let pVec = new ultraDVector(-scale,scale,scale,-scale)
	translate((width/2),(height/2))
	stroke(255)
	strokeWeight(0)

	aCord = [[a.x],[a.y],[a.z],[a.w]]
	bCord = [[b.x],[b.y],[b.z],[b.w]]
	cCord = [[c.x],[c.y],[c.z],[c.w]]
	dCord = [[d.x],[d.y],[d.z],[d.w]]
	eCord = [[e.x],[e.y],[e.z],[e.w]]
	fCord = [[f.x],[f.y],[f.z],[f.w]]
	gCord = [[g.x],[g.y],[g.z],[g.w]]
	hCord = [[h.x],[h.y],[h.z],[h.w]]
	iCord = [[iVec.x],[iVec.y],[iVec.z],[iVec.w]]
	jCord = [[jVec.x],[jVec.y],[jVec.z],[jVec.w]]
	kCord = [[kVec.x],[kVec.y],[kVec.z],[kVec.w]]
	lCord = [[lVec.x],[lVec.y],[lVec.z],[lVec.w]]
	mCord = [[mVec.x],[mVec.y],[mVec.z],[mVec.w]]
	nCord = [[nVec.x],[nVec.y],[nVec.z],[nVec.w]]
	oCord = [[oVec.x],[oVec.y],[oVec.z],[oVec.w]]
	pCord = [[pVec.x],[pVec.y],[pVec.z],[pVec.w]]


	rotXYA = matMul(rotationMatXY, aCord)
	rotXYB = matMul(rotationMatXY, bCord)
	rotXYC = matMul(rotationMatXY, cCord)
	rotXYD = matMul(rotationMatXY, dCord)
	rotXYE = matMul(rotationMatXY, eCord)
	rotXYF = matMul(rotationMatXY, fCord)
	rotXYG = matMul(rotationMatXY, gCord)
	rotXYH = matMul(rotationMatXY, hCord)

	rotXYI = matMul(rotationMatXY, iCord)
	rotXYJ = matMul(rotationMatXY, jCord)
	rotXYK = matMul(rotationMatXY, kCord)
	rotXYL = matMul(rotationMatXY, lCord)
	rotXYM = matMul(rotationMatXY, mCord)
	rotXYN = matMul(rotationMatXY, nCord)
	rotXYO = matMul(rotationMatXY, oCord)
	rotXYP = matMul(rotationMatXY, pCord)



	zA3d = 1/(distance-rotXYA[3][0])

	r1A3d = [zA3d,0,0,0]
	r2A3d = [0,zA3d,0,0]
	r3A3d = [0,0,zA3d,0]
	proAMat4d = [r1A3d,r2A3d,r3A3d]
	proA3d = matMul(proAMat4d, rotXYA)

	zA2d = 1/(distance-proA3d[2][0])
	r1A2d = [zA2d,0,0]
	r2A2d = [0,zA2d,0]
	proAMat3d = [r1A2d,r2A2d]

	proA = matMul(proAMat3d, proA3d)


	zB3d = 1/(distance-rotXYB[3][0])

	r1B3d = [zB3d,0,0,0]
	r2B3d = [0,zB3d,0,0]
	r3B3d = [0,0,zB3d,0]
	proBMat4d = [r1B3d,r2B3d,r3B3d]
	proB3d = matMul(proBMat4d, rotXYB)

	zB2d = 1/(distance-proB3d[2][0])
	r1B2d = [zB2d,0,0]
	r2B2d = [0,zB2d,0]
	proBMat3d = [r1B2d,r2B2d]

	proB = matMul(proBMat3d, proB3d)


	zC3d = 1/(distance-rotXYC[3][0])

	r1C3d = [zC3d,0,0,0]
	r2C3d = [0,zC3d,0,0]
	r3C3d = [0,0,zC3d,0]
	proCMat4d = [r1C3d,r2C3d,r3C3d]
	proC3d = matMul(proCMat4d, rotXYC)

	zC2d = 1/(distance-proC3d[2][0])
	r1C2d = [zC2d,0,0]
	r2C2d = [0,zC2d,0]
	proCMat3d = [r1C2d,r2C2d]

	proC = matMul(proCMat3d, proC3d)

	zD3d = 1/(distance-rotXYD[3][0])

	r1D3d = [zD3d,0,0,0]
	r2D3d = [0,zD3d,0,0]
	r3D3d = [0,0,zD3d,0]
	proDMat4d = [r1D3d,r2D3d,r3D3d]
	proD3d = matMul(proDMat4d, rotXYD)

	zD2d = 1/(distance-proD3d[2][0])
	r1D2d = [zD2d,0,0]
	r2D2d = [0,zD2d,0]
	proDMat3d = [r1D2d,r2D2d]

	proD = matMul(proDMat3d, proD3d)



	zE3d = 1/(distance-rotXYE[3][0])

	r1E3d = [zE3d,0,0,0]
	r2E3d = [0,zE3d,0,0]
	r3E3d = [0,0,zE3d,0]
	proEMat4d = [r1E3d,r2E3d,r3E3d]
	proE3d = matMul(proEMat4d, rotXYE)

	zE2d = 1/(distance-proE3d[2][0])
	r1E2d = [zE2d,0,0]
	r2E2d = [0,zE2d,0]
	proEMat3d = [r1E2d,r2E2d]

	proE = matMul(proEMat3d, proE3d)


	zF3d = 1/(distance-rotXYF[3][0])

	r1F3d = [zF3d,0,0,0]
	r2F3d = [0,zF3d,0,0]
	r3F3d = [0,0,zF3d,0]
	proFMat4d = [r1F3d,r2F3d,r3F3d]
	proF3d = matMul(proFMat4d, rotXYF)

	zF2d = 1/(distance-proF3d[2][0])
	r1F2d = [zF2d,0,0]
	r2F2d = [0,zF2d,0]
	proFMat3d = [r1F2d,r2F2d]

	proF = matMul(proFMat3d, proF3d)

	zG3d = 1/(distance-rotXYG[3][0])

	r1G3d = [zG3d,0,0,0]
	r2G3d = [0,zG3d,0,0]
	r3G3d = [0,0,zG3d,0]
	proGMat4d = [r1G3d,r2G3d,r3G3d]
	proG3d = matMul(proGMat4d, rotXYG)

	zG2d = 1/(distance-proG3d[2][0])
	r1G2d = [zG2d,0,0]
	r2G2d = [0,zG2d,0]
	proGMat3d = [r1G2d,r2G2d]

	proG = matMul(proGMat3d, proG3d)

	zH3d = 1/(distance-rotXYH[3][0])

	r1H3d = [zH3d,0,0,0]
	r2H3d = [0,zH3d,0,0]
	r3H3d = [0,0,zH3d,0]
	proHMat4d = [r1H3d,r2H3d,r3H3d]
	proH3d = matMul(proHMat4d, rotXYH)

	zH2d = 1/(distance-proH3d[2][0])
	r1H2d = [zH2d,0,0]
	r2H2d = [0,zH2d,0]
	proHMat3d = [r1H2d,r2H2d]

	proH = matMul(proHMat3d, proH3d)




	zI3d = 1/(distance-rotXYI[3][0])

	r1I3d = [zI3d,0,0,0]
	r2I3d = [0,zI3d,0,0]
	r3I3d = [0,0,zI3d,0]
	proIMat4d = [r1I3d,r2I3d,r3I3d]
	proI3d = matMul(proIMat4d, rotXYI)

	zI2d = 1/(distance-proI3d[2][0])
	r1I2d = [zI2d,0,0]
	r2I2d = [0,zI2d,0]
	proIMat3d = [r1I2d,r2I2d]

	proI = matMul(proIMat3d, proI3d)


	zJ3d = 1/(distance-rotXYJ[3][0])

	r1J3d = [zJ3d,0,0,0]
	r2J3d = [0,zJ3d,0,0]
	r3J3d = [0,0,zJ3d,0]
	proJMat4d = [r1J3d,r2J3d,r3J3d]
	proJ3d = matMul(proJMat4d, rotXYJ)

	zJ2d = 1/(distance-proJ3d[2][0])
	r1J2d = [zJ2d,0,0]
	r2J2d = [0,zJ2d,0]
	proJMat3d = [r1J2d,r2J2d]

	proJ = matMul(proJMat3d, proJ3d)


	zK3d = 1/(distance-rotXYK[3][0])

	r1K3d = [zK3d,0,0,0]
	r2K3d = [0,zK3d,0,0]
	r3K3d = [0,0,zK3d,0]
	proKMat4d = [r1K3d,r2K3d,r3K3d]
	proK3d = matMul(proKMat4d, rotXYK)

	zK2d = 1/(distance-proK3d[2][0])
	r1K2d = [zK2d,0,0]
	r2K2d = [0,zK2d,0]
	proKMat3d = [r1K2d,r2K2d]

	proK = matMul(proKMat3d, proK3d)

	zL3d = 1/(distance-rotXYL[3][0])

	r1L3d = [zL3d,0,0,0]
	r2L3d = [0,zL3d,0,0]
	r3L3d = [0,0,zL3d,0]
	proLMat4d = [r1L3d,r2L3d,r3L3d]
	proL3d = matMul(proLMat4d, rotXYL)

	zL2d = 1/(distance-proL3d[2][0])
	r1L2d = [zL2d,0,0]
	r2L2d = [0,zL2d,0]
	proLMat3d = [r1L2d,r2L2d]

	proL = matMul(proLMat3d, proL3d)



	zM3d = 1/(distance-rotXYM[3][0])

	r1M3d = [zM3d,0,0,0]
	r2M3d = [0,zM3d,0,0]
	r3M3d = [0,0,zM3d,0]
	proMMat4d = [r1M3d,r2M3d,r3M3d]
	proM3d = matMul(proMMat4d, rotXYM)

	zM2d = 1/(distance-proM3d[2][0])
	r1M2d = [zM2d,0,0]
	r2M2d = [0,zM2d,0]
	proMMat3d = [r1M2d,r2M2d]

	proM = matMul(proMMat3d, proM3d)


	zN3d = 1/(distance-rotXYN[3][0])

	r1N3d = [zN3d,0,0,0]
	r2N3d = [0,zN3d,0,0]
	r3N3d = [0,0,zN3d,0]
	proNMat4d = [r1N3d,r2N3d,r3N3d]
	proN3d = matMul(proNMat4d, rotXYN)

	zN2d = 1/(distance-proN3d[2][0])
	r1N2d = [zN2d,0,0]
	r2N2d = [0,zN2d,0]
	proNMat3d = [r1N2d,r2N2d]

	proN = matMul(proNMat3d, proN3d)

	zO3d = 1/(distance-rotXYO[3][0])

	r1O3d = [zO3d,0,0,0]
	r2O3d = [0,zO3d,0,0]
	r3O3d = [0,0,zO3d,0]
	proOMat4d = [r1O3d,r2O3d,r3O3d]
	proO3d = matMul(proOMat4d, rotXYO)

	zO2d = 1/(distance-proO3d[2][0])
	r1O2d = [zO2d,0,0]
	r2O2d = [0,zO2d,0]
	proOMat3d = [r1O2d,r2O2d]

	proO = matMul(proOMat3d, proO3d)

	zP3d = 1/(distance-rotXYP[3][0])

	r1P3d = [zP3d,0,0,0]
	r2P3d = [0,zP3d,0,0]
	r3P3d = [0,0,zP3d,0]
	proPMat4d = [r1P3d,r2P3d,r3P3d]
	proP3d = matMul(proPMat4d, rotXYP)

	zP2d = 1/(distance-proP3d[2][0])
	r1P2d = [zP2d,0,0]
	r2P2d = [0,zP2d,0]
	proPMat3d = [r1P2d,r2P2d]

	proP = matMul(proPMat3d, proP3d)



	var scaleFi = 3000



	point(proA[0][0]*scaleFi,proA[1][0]*scaleFi)
	point(proB[0][0]*scaleFi,proB[1][0]*scaleFi)
	point(proC[0][0]*scaleFi,proC[1][0]*scaleFi)
	point(proD[0][0]*scaleFi,proD[1][0]*scaleFi)
	point(proE[0][0]*scaleFi,proE[1][0]*scaleFi)
	point(proF[0][0]*scaleFi,proF[1][0]*scaleFi)
	point(proG[0][0]*scaleFi,proG[1][0]*scaleFi)
	point(proH[0][0]*scaleFi,proH[1][0]*scaleFi)


	point(proI[0][0]*scaleFi,proI[1][0]*scaleFi)
	point(proJ[0][0]*scaleFi,proJ[1][0]*scaleFi)
	point(proK[0][0]*scaleFi,proK[1][0]*scaleFi)
	point(proL[0][0]*scaleFi,proL[1][0]*scaleFi)
	point(proM[0][0]*scaleFi,proM[1][0]*scaleFi)
	point(proN[0][0]*scaleFi,proN[1][0]*scaleFi)
	point(proO[0][0]*scaleFi,proO[1][0]*scaleFi)
	point(proP[0][0]*scaleFi,proP[1][0]*scaleFi)


	stroke('rgba(85%,0%,85%,0.89)')
	strokeWeight(1)
	line(proA[0][0]*scaleFi,proA[1][0]*scaleFi, proB[0][0]*scaleFi,proB[1][0]*scaleFi)
	line(proB[0][0]*scaleFi,proB[1][0]*scaleFi, proC[0][0]*scaleFi,proC[1][0]*scaleFi)
	line(proC[0][0]*scaleFi,proC[1][0]*scaleFi, proD[0][0]*scaleFi,proD[1][0]*scaleFi)
	line(proD[0][0]*scaleFi,proD[1][0]*scaleFi, proA[0][0]*scaleFi,proA[1][0]*scaleFi)
	line(proE[0][0]*scaleFi,proE[1][0]*scaleFi, proF[0][0]*scaleFi,proF[1][0]*scaleFi)
	line(proF[0][0]*scaleFi,proF[1][0]*scaleFi, proG[0][0]*scaleFi,proG[1][0]*scaleFi)
	line(proG[0][0]*scaleFi,proG[1][0]*scaleFi, proH[0][0]*scaleFi,proH[1][0]*scaleFi)
	line(proH[0][0]*scaleFi,proH[1][0]*scaleFi, proE[0][0]*scaleFi,proE[1][0]*scaleFi)
	line(proA[0][0]*scaleFi,proA[1][0]*scaleFi, proE[0][0]*scaleFi,proE[1][0]*scaleFi)
	line(proB[0][0]*scaleFi,proB[1][0]*scaleFi, proF[0][0]*scaleFi,proF[1][0]*scaleFi)
	line(proC[0][0]*scaleFi,proC[1][0]*scaleFi, proG[0][0]*scaleFi,proG[1][0]*scaleFi)
	line(proD[0][0]*scaleFi,proD[1][0]*scaleFi, proH[0][0]*scaleFi,proH[1][0]*scaleFi)

	line(proI[0][0]*scaleFi,proI[1][0]*scaleFi, proJ[0][0]*scaleFi,proJ[1][0]*scaleFi)
	line(proJ[0][0]*scaleFi,proJ[1][0]*scaleFi, proK[0][0]*scaleFi,proK[1][0]*scaleFi)
	line(proK[0][0]*scaleFi,proK[1][0]*scaleFi, proL[0][0]*scaleFi,proL[1][0]*scaleFi)
	line(proL[0][0]*scaleFi,proL[1][0]*scaleFi, proI[0][0]*scaleFi,proI[1][0]*scaleFi)
	line(proM[0][0]*scaleFi,proM[1][0]*scaleFi, proN[0][0]*scaleFi,proN[1][0]*scaleFi)
	line(proN[0][0]*scaleFi,proN[1][0]*scaleFi, proO[0][0]*scaleFi,proO[1][0]*scaleFi)
	line(proO[0][0]*scaleFi,proO[1][0]*scaleFi, proP[0][0]*scaleFi,proP[1][0]*scaleFi)
	line(proP[0][0]*scaleFi,proP[1][0]*scaleFi, proM[0][0]*scaleFi,proM[1][0]*scaleFi)
	line(proM[0][0]*scaleFi,proM[1][0]*scaleFi, proI[0][0]*scaleFi,proI[1][0]*scaleFi)
	line(proN[0][0]*scaleFi,proN[1][0]*scaleFi, proJ[0][0]*scaleFi,proJ[1][0]*scaleFi)
	line(proO[0][0]*scaleFi,proO[1][0]*scaleFi, proK[0][0]*scaleFi,proK[1][0]*scaleFi)
	line(proP[0][0]*scaleFi,proP[1][0]*scaleFi, proL[0][0]*scaleFi,proL[1][0]*scaleFi)

	line(proA[0][0]*scaleFi,proA[1][0]*scaleFi, proI[0][0]*scaleFi,proI[1][0]*scaleFi)
	line(proB[0][0]*scaleFi,proB[1][0]*scaleFi, proJ[0][0]*scaleFi,proJ[1][0]*scaleFi)
	line(proC[0][0]*scaleFi,proC[1][0]*scaleFi, proK[0][0]*scaleFi,proK[1][0]*scaleFi)
	line(proD[0][0]*scaleFi,proD[1][0]*scaleFi, proL[0][0]*scaleFi,proL[1][0]*scaleFi)
	line(proE[0][0]*scaleFi,proE[1][0]*scaleFi, proM[0][0]*scaleFi,proM[1][0]*scaleFi)
	line(proF[0][0]*scaleFi,proF[1][0]*scaleFi, proN[0][0]*scaleFi,proN[1][0]*scaleFi)
	line(proG[0][0]*scaleFi,proG[1][0]*scaleFi, proO[0][0]*scaleFi,proO[1][0]*scaleFi)
	line(proH[0][0]*scaleFi,proH[1][0]*scaleFi, proP[0][0]*scaleFi,proP[1][0]*scaleFi)



	fill(72,12,168,100)
	beginShape();
	vertex(proA[0][0]*scaleFi,proA[1][0]*scaleFi);
	vertex(proB[0][0]*scaleFi,proB[1][0]*scaleFi);
	vertex(proC[0][0]*scaleFi,proC[1][0]*scaleFi);
	vertex(proD[0][0]*scaleFi,proD[1][0]*scaleFi);
	endShape(CLOSE);


	beginShape();
	vertex(proE[0][0]*scaleFi,proE[1][0]*scaleFi);
	vertex(proF[0][0]*scaleFi,proF[1][0]*scaleFi);
	vertex(proG[0][0]*scaleFi,proG[1][0]*scaleFi);
	vertex(proH[0][0]*scaleFi,proH[1][0]*scaleFi);
	endShape(CLOSE);


	beginShape();
	vertex(proA[0][0]*scaleFi,proA[1][0]*scaleFi);
	vertex(proB[0][0]*scaleFi,proB[1][0]*scaleFi);
	vertex(proF[0][0]*scaleFi,proF[1][0]*scaleFi);
	vertex(proE[0][0]*scaleFi,proE[1][0]*scaleFi);
	endShape(CLOSE);


	beginShape();
	vertex(proA[0][0]*scaleFi,proA[1][0]*scaleFi);
	vertex(proE[0][0]*scaleFi,proE[1][0]*scaleFi);
	vertex(proH[0][0]*scaleFi,proH[1][0]*scaleFi);
	vertex(proD[0][0]*scaleFi,proD[1][0]*scaleFi);
	endShape(CLOSE);


	beginShape();
	vertex(proB[0][0]*scaleFi,proB[1][0]*scaleFi);
	vertex(proC[0][0]*scaleFi,proC[1][0]*scaleFi);
	vertex(proG[0][0]*scaleFi,proG[1][0]*scaleFi);
	vertex(proF[0][0]*scaleFi,proF[1][0]*scaleFi);
	endShape(CLOSE);


	beginShape();
	vertex(proD[0][0]*scaleFi,proD[1][0]*scaleFi);
	vertex(proH[0][0]*scaleFi,proH[1][0]*scaleFi);
	vertex(proG[0][0]*scaleFi,proG[1][0]*scaleFi);
	vertex(proC[0][0]*scaleFi,proC[1][0]*scaleFi);
	endShape(CLOSE);



	//hyperplanes
	fill(247,37,133,50)
	beginShape();
	vertex(proI[0][0]*scaleFi,proI[1][0]*scaleFi);
	vertex(proJ[0][0]*scaleFi,proJ[1][0]*scaleFi);
	vertex(proK[0][0]*scaleFi,proK[1][0]*scaleFi);
	vertex(proL[0][0]*scaleFi,proL[1][0]*scaleFi);
	endShape(CLOSE);


	beginShape();
	vertex(proM[0][0]*scaleFi,proM[1][0]*scaleFi);
	vertex(proN[0][0]*scaleFi,proN[1][0]*scaleFi);
	vertex(proO[0][0]*scaleFi,proO[1][0]*scaleFi);
	vertex(proP[0][0]*scaleFi,proP[1][0]*scaleFi);
	endShape(CLOSE);


	beginShape();
	vertex(proI[0][0]*scaleFi,proI[1][0]*scaleFi);
	vertex(proJ[0][0]*scaleFi,proJ[1][0]*scaleFi);
	vertex(proN[0][0]*scaleFi,proN[1][0]*scaleFi);
	vertex(proM[0][0]*scaleFi,proM[1][0]*scaleFi);
	endShape(CLOSE);


	beginShape();
	vertex(proI[0][0]*scaleFi,proI[1][0]*scaleFi);
	vertex(proM[0][0]*scaleFi,proM[1][0]*scaleFi);
	vertex(proP[0][0]*scaleFi,proP[1][0]*scaleFi);
	vertex(proL[0][0]*scaleFi,proL[1][0]*scaleFi);
	endShape(CLOSE);

	beginShape();
	vertex(proJ[0][0]*scaleFi,proJ[1][0]*scaleFi);
	vertex(proK[0][0]*scaleFi,proK[1][0]*scaleFi);
	vertex(proO[0][0]*scaleFi,proO[1][0]*scaleFi);
	vertex(proN[0][0]*scaleFi,proN[1][0]*scaleFi);
	endShape(CLOSE);

	beginShape();
	vertex(proL[0][0]*scaleFi,proL[1][0]*scaleFi);
	vertex(proP[0][0]*scaleFi,proP[1][0]*scaleFi);
	vertex(proO[0][0]*scaleFi,proO[1][0]*scaleFi);
	vertex(proK[0][0]*scaleFi,proK[1][0]*scaleFi);
	endShape(CLOSE);

	pop()
}


class ultraDVector {
	constructor(x,y,z,w){
		this.x = x
		this.y = y
		this.z = z
		this.w = w
	}
}



function branch(len){
	if(song.isPlaying()){
		let level = amplitude.getLevel();
		let ampli = map(level, 0, 1, 2, 20);
		line(0, 0, 0, -len)
		stroke(230)
		strokeWeight(3)
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
