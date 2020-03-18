var c = document.getElementById("bricksCanvas");
var ctx = c.getContext("2d");
var lives=3;
var bricks = createBricks();

var score=0;
var mainAudio = new Audio('audio/Play_the_Game.mp3');
var mainAudio2 = new Audio('audio/Coming_Soon.mp3');
var coin = new Audio('audio/coin.wav');
var level=1;
var player={
	x:325,
	y:c.height-30,
};
var start=true;
var test={
	x:10,
	y:20,
};

var ball={
	x: c.width/2,
	y: c.height-40,
};
var ballMove={
	dx: 3,
	dy: -3,
};

var radius=8;

function mainMainFunction(){
	setTimeout(function(){mainFunction();drawPlayer();},5000);
	player.x==325;
	playTheGame();
}

function mainFunction(){
	setTimeout(function(){
		ballMoveFunction();
		clearBricks();
		requestAnimationFrame(mainFunction);
	},10);
}

function drawPlayer(){
	setTimeout(function(){
		document.getElementById("start").disabled = true;
		if(player.x>646){
			player.x=646;
		}
		if(player.x<0){
			player.x=2;
		}
		ctx.beginPath();
		ctx.rect(player.x, player.y, 150, 15);
		ctx.lineWidth=2;
		ctx.fillStyle = "#000000";
		ctx.strokeStyle = "gray";
		ctx.fill();
		ctx.stroke();
		drawPlayerA = requestAnimationFrame(drawPlayer);
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
		if(ball.x>=player.x&&ball.x<=player.x+15&&ball.y>=player.y&&ball.y<=player.y+15){
			ballMove.dy=-1.5;
			ballMove.dx=-4;
		}
		if(ball.x>=player.x+15&&ball.x<=player.x+30&&ball.y>=player.y&&ball.y<=player.y+15){
			ballMove.dy=-2;
			ballMove.dx=-3.2;
		}
		if(ball.x>=player.x+30&&ball.x<=player.x+45&&ball.y>=player.y&&ball.y<=player.y+15){

			ballMove.dy=-3;
			ballMove.dx=-3;
		}
		if(ball.x>=player.x+45&&ball.x<=player.x+60&&ball.y>=player.y&&ball.y<=player.y+15){
			ballMove.dy=-3.5;
			ballMove.dx=-1;
		}
		if(ball.x>=player.x+60&&ball.x<=player.x+70&&ball.y>=player.y&&ball.y<=player.y+15){
			ballMove.dy=-4;
			ballMove.dx=-0.5;
		}
		if(ball.x>=player.x+70&&ball.x<=player.x+80&&ball.y>=player.y&&ball.y<=player.y+15){
			ballMove.dy=-4.3;
			ballMove.dx=0;
		}
		if(ball.x>=player.x+80&&ball.x<=player.x+90&&ball.y>=player.y&&ball.y<=player.y+15){
			ballMove.dy=-4;
			ballMove.dx=0.5;
		}
		if(ball.x>=player.x+90&&ball.x<=player.x+105&&ball.y>=player.y&&ball.y<=player.y+15){
			ballMove.dy=-3.5;
			ballMove.dx=1;
		}
		if(ball.x>=player.x+105&&ball.x<=player.x+120&&ball.y>=player.y&&ball.y<=player.y+15){
			ballMove.dy=-3;
			ballMove.dx=3;
		}
		if(ball.x>=player.x+120&&ball.x<=player.x+135&&ball.y>=player.y&&ball.y<=player.y+15){
			ballMove.dy=2;
			ballMove.dx=3.2;
		}
		if(ball.x>=player.x+135&&ball.x<=player.x+150&&ball.y>=player.y&&ball.y<=player.y+15){
			ballMove.dy=-1.5;
			ballMove.dx=4;
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

function createBricks(){
	var bricks = new Array(8);
	var value =62;
	for (var i = 0; i < bricks.length; i++) { 
		bricks[i] = new Array(14); 
	}
	for (var i = 0; i < bricks.length; i++) { 
		for (var j = 0; j < bricks[i].length; j++) { 
			var r=Math.random()*10+1;
			if(i+j<=3||j-i>=9){
				bricks[i][j] = {
					x:j*value,
					y:i*(value/2) ,
					pop: true,
					special: false,
				};
			}
			else if((i==6&&(j==2||j==3||j==11||j==10))||(i==7&&(j==2||j==3||j==11||j==10))){
				bricks[i][j] = {
					x:j*value,
					y:i*(value/2) ,
					pop: false,
					special: false,
				};
			}
			else if(i==bricks.length-1){
				bricks[i][j] = {
					x:j*value,
					y:i*(value/2) ,
					pop: true,
					special: false,
				};
			}
			else{
				bricks[i][j] = {
					x:j*value,
					y:i*(value/2) ,
					pop: false,
					special: false,
				};
			}
		} 
	}
	return bricks;
}

function clearBricks(){
	for (var k = 0; k < bricks.length; k++) { 
		for (var l = 0; l < bricks[k].length-1; l++) { 
			if(bricks[k][l].pop==false){
				var r=Math.random()*10+1;
				ctx.beginPath();
				ctx.rect(bricks[k][l].x, bricks[k][l].y, 57, 28);
				if((k==1||k==2)&&(l==4||l==5||l==7||l==8)||(k==2&&(l==3||l==9))){
					ctx.fillStyle = "#ffffff";
				}
				else if((k==6||k==7)&&(l==2||l==3||l==10||l==11)){
					ctx.fillStyle = "#000000";
				}
				else{
					ctx.fillStyle = "#0000ff";
				}
				ctx.strokeStyle = "#000000";
				ctx.lineWidth="2";
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
					coin.play();
					document.getElementById("score").textContent="Score: "+score;
					bricks[k][l].pop=true;
					if(score==75){
						setTimeout(function(){cancelAnimationFrame(main);},20);
						setTimeout(function(){cancelAnimationFrame(drawPlayerA);},20);
						document.getElementById("score").textContent="Congratz you won!";
					}
				}
			}
		} 
	}
}
document.onkeydown = function(e) {
	if(e.keyCode == 37){
		e.preventDefault()
		player.x=player.x-10;
	}
	else if(e.keyCode == 39){
		e.preventDefault()
		player.x=player.x+10;
	}
}
function playTheGame(){
	mainAudio.play();
	setTimeout(function(){mainAudio2.play();}, (mainAudio.duration)+1000);
	mainAudio.volume=0.4;
}

function timer(){
	var time=5;
	document.getElementById("startNumbers").textContent = time+"..";
	setTimeout(function(){clearInterval(x);document.getElementById("startNumbers").style.visibility = "hidden";},5000);
	var x = setInterval(function(){
		time--;
		document.getElementById("startNumbers").textContent = time+"..";
	},1000);
};

function createBricks1(){
	console.log(bricks);
}