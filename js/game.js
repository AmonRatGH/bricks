var c = document.getElementById("bricksCanvas");
var ctx = c.getContext("2d");
var lives=3;
var bricks = createBricks();
var score=0;
var player={
	x:325,
	y:575,
};
var start=true;
var test={
	x:10,
	y:20,
};

var ball={
	x: c.width/2,
	y: c.height-30,
};
var ballMove={
	dx: 3,
	dy: -3,
};

var radius=8;

function mainFunction(){
	setTimeout(function(){
		ballMoveFunction();
		clearBricks(bricks);
		requestAnimationFrame(mainFunction);
	},10);
}

function drawPlayer(){
	setTimeout(function(){
		document.getElementById("start").disabled = true;
		ctx.beginPath();
		ctx.rect(player.x, player.y, 150, 15);
		ctx.lineWidth=2;
		ctx.fillStyle = "#000000";
		ctx.strokeStyle = "gray";
		ctx.fill();
		ctx.stroke();
		requestAnimationFrame(drawPlayer);
	},10);
}

function ballMoveFunction(){
	ctx.clearRect(0, 0, c.width, c.height);
	drawBall();
	if(ball.x + ballMove.dx > c.width || ball.x + ballMove.dx < 0) {
		ballMove.dx = -ballMove.dx;
	}

	if(ball.y + ballMove.dy > c.height || ball.y + ballMove.dy < 0) {
		ballMove.dy = -ballMove.dy;
	}
	if(ball.x>=player.x&&ball.x<=player.x+150&&ball.y>=player.y&&ball.y<=player.y+15){
		if(ball.x>=player.x&&ball.x<=player.x+30&&ball.y>=player.y&&ball.y<=player.y+15){
			console.log("ddi");
			ballMove.dy=-Math.sqrt(6);
			ballMove.dx=-Math.sqrt(2);
		}
		if(ball.x>=player.x+30&&ball.x<=player.x+60&&ball.y>=player.y&&ball.y<=player.y+15){
			console.log("ddi");
			ballMove.dy=-Math.sqrt(5);
			ballMove.dx=-Math.sqrt(3);
		}
		if(ball.x>=player.x+60&&ball.x<=player.x+90&&ball.y>=player.y&&ball.y<=player.y+15){
			console.log("ddi");
			ballMove.dy=-Math.sqrt(4);
			ballMove.dx=Math.sqrt(4);
		}
		if(ball.x>=player.x+90&&ball.x<=player.x+120&&ball.y>=player.y&&ball.y<=player.y+15){
			console.log("ddi");
			ballMove.dy=-Math.sqrt(5);
			ballMove.dx=Math.sqrt(3);
		}
		if(ball.x>=player.x+120&&ball.x<=player.x+150&&ball.y>=player.y&&ball.y<=player.y+15){
			console.log("ddi");
			ballMove.dy=-Math.sqrt(6);
			ballMove.dx=Math.sqrt(2);
		}
	}
	ball.x += ballMove.dx;
	ball.y += ballMove.dy;
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
	console.log(start);
}

function moveLeft(x){
	ctx.clearRect(x-1, 574, 153, 17);
	ctx.beginPath();
	ctx.rect(x-8, 575, 150, 15);
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "gray";
	ctx.fill();
	ctx.stroke();
}

function moveRight(x){
	ctx.clearRect(x-1, 574, 153, 17);
	ctx.beginPath();
	ctx.rect(x+8, 575, 150, 15);
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "gray";
	ctx.fill();
	ctx.stroke();
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
	return bricks;
}

function clearBricks(bricks){
	for (var k = 0; k < bricks.length; k++) { 
		for (var l = 0; l < bricks[k].length-1; l++) { 
			if(bricks[k][l].pop==false){
				ctx.beginPath();
				ctx.rect(bricks[k][l].x, bricks[k][l].y, 57, 28);
				ctx.fillStyle = "#0000ff";
				ctx.strokeStyle = "#FF0000";
				ctx.fill();
				ctx.stroke();
			}
		}
	}
	for (var k = 0; k < bricks.length; k++) { 
		for (var l = 0; l < bricks[k].length-1; l++) {
			if(ball.x>=bricks[k][l].x&&ball.x<=bricks[k][l].x+57&&ball.y>=bricks[k][l].y&&ball.y<=bricks[k][l].y+28){
				if(bricks[k][l].pop==false){
					ballMove.dy=-ballMove.dy;
					score++;
					document.getElementById("score").textContent="Score: "+score;
					bricks[k][l].pop=true;
					if(score==65){
						document.getElementById("score").textContent="Congratz you won!";
					}
				}
			}
		} 
	}
}
document.onkeydown = function(event) {
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

function createBricks1(){
	console.log(bricks);
}