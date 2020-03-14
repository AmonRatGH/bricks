var c = document.getElementById("bricks");
var ctx = c.getContext("2d");
var starX=325;
var startY=575;
var start=false;
var x=325;
var x1 = c.width/2;
var y1 = c.height-30;
var dx = 2;
var dy = -2;
var radius=8;

function drawPlayer(){
	document.getElementById("start").disabled = true;
	ctx.beginPath();
	ctx.rect(starX, startY, 150, 15);
	ctx.lineWidth=2;
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "gray";
	ctx.fill();
	ctx.stroke();
	start=true;
	console.log(start);
}

function ballMove(){
	if(start==true){
		ctx.clearRect(x1-10, y1-10, radius*2+4, radius*2+4);
		drawBall();
		if(x1 + dx > c.width || x1 + dx < 0) {
			dx = -dx;
		}

		if(y1 + dy > c.height || y1 + dy < 0) {
			dy = -dy;
		}
		x1 += dx;
		y1 += dy;
	}
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(x1, y1, 8, 0, Math.PI*2);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
}

function resetGame(){
	document.getElementById("start").disabled = false;
	ctx.clearRect(0, 0, c.width, c.height);
	start=false;
	x=350;
	console.log(start);
}

function moveLeft(x){
	if(start==true){
		ctx.clearRect(x-1, 574, 153, 17);
		ctx.beginPath();
		ctx.rect(x-8, 575, 150, 15);
		ctx.fillStyle = "#000000";
		ctx.strokeStyle = "gray";
		ctx.fill();
		ctx.stroke();
		console.log(x);
	}
}

function moveRight(x){
	if(start==true){
		ctx.clearRect(x-1, 574, 153, 17);
		ctx.beginPath();
		ctx.rect(x+8, 575, 150, 15);
		ctx.fillStyle = "#000000";
		ctx.strokeStyle = "gray";
		ctx.fill();
		ctx.stroke();
		console.log(x);
	}
}

function ballInterval(){
	setInterval(ballMove,20);
}

document.onkeydown = function(event) {
	if(start==true){
		if(event.keyCode == 37){
			if(x<0){
				x=2;
			}
			moveLeft(x);
			x=x-8;
			console.log("hello");
		}
		if(event.keyCode == 39){
			if(x>646){
				x=646;
			}
			moveRight(x);
			x=x+8;
			console.log("hi");
		}
	}
}

