var c = document.getElementById("bricks");
var ctx = c.getContext("2d");
var lives=3;
var bricks={
	
};

var player={
	x:325,
	y:575,
};
var start=false;
var test={
	x:10,
	y:20,
};

var ball={
	x: c.width/2,
	y: c.height-30,
};
var ballMove={
	dx: -2,
	dy: -2,
};
//var ball.x = c.width/2;
//var ball.y = c.height-30;
//var ballMove.dx = 2;
//var ballMove.dy = -2;
var radius=8;

function drawPlayer(){
	document.getElementById("start").disabled = true;
	ctx.beginPath();
	ctx.rect(player.x, player.y, 150, 15);
	ctx.lineWidth=2;
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "gray";
	ctx.fill();
	ctx.stroke();
	start=true;
}

function ballMoveFunction(){
	if(start==true){
		ctx.clearRect(0, 0, c.width, c.height);
		drawBall();
		if(ball.x + ballMove.dx > c.width || ball.x + ballMove.dx < 0) {
			ballMove.dx = -ballMove.dx;
		}

		if(ball.y + ballMove.dy > c.height || ball.y + ballMove.dy < 0) {
			ballMove.dy = -ballMove.dy;
		}
		if((ball.x>=player.x&&ball.x<=player.x+150)&&ball.y+1==player.y){
			ballMove.dy = -ballMove.dy;
		}
		ball.x += ballMove.dx;
		ball.y += ballMove.dy;
	}
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 8, 0, Math.PI*2);
    ctx.fillStyle = "gray";
    ctx.fill();
    ctx.closePath();
}

function resetGame(){
	document.getElementById("start").disabled = false;
	ctx.clearRect(0, 0, c.width, c.height);
	start=false;
	player.x=350;
	clearInterval(int1);
	clearInterval(int2);
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
	}
}

function ballInterval(){
	createBricks();
	var int1 = setInterval(ballMoveFunction,10);
	var int2 = setInterval(drawPlayer,10);
	setInterval(createBricks,10);
}

function createBricks(){
	var bricks = new Array(5);
	var value =62;
	for (var i = 0; i < bricks.length; i++) { 
		bricks[i] = new Array(14); 
	}
	for (var i = 0; i < bricks.length; i++) { 
		for (var j = 0; j < bricks[i].length; j++) { 
			bricks[i][j] = {
				x:j*value,
				y:i*(value/2) ,
				pop: false,
			};
		} 
	}
	
	for (var k = 0; k < bricks.length; k++) { 
		for (var l = 0; l < bricks[k].length-1; l++) { 
			if(bricks[k][l].pop==true){
				continue;
			}else{
				ctx.beginPath();
				ctx.rect(bricks[k][l].x, bricks[k][l].y, 57, 28);
				ctx.fillStyle = "#0000ff";
				ctx.strokeStyle = "#FF0000";
				ctx.fill();
				ctx.stroke();
			}
		} 
	} 
}

document.onkeydown = function(event) {
	if(start==true){
		if(event.keyCode == 37){
			if(player.x<0){
				player.x=2;
			}
			moveLeft(player.x);
			player.x=player.x-8;
		}
		if(event.keyCode == 39){
			if(player.x>646){
				player.x=646;
			}
			moveRight(player.x);
			player.x=player.x+8;
		}
	}
}

