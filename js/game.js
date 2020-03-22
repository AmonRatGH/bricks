var level1Array=[
	[0,0,0,0,3,3,3,3,3,0,0,0,0],
	[0,0,0,3,1,1,3,1,1,3,0,0,0],
	[0,0,3,1,1,1,3,1,1,1,3,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,0],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,2,2,3,3,3,3,3,2,2,3,3],
	[0,0,2,2,0,0,0,0,0,2,2,0,0]
];
var level2Array=[
	[0,0,0,0,3,3,3,3,3,0,0,0,0],
	[0,0,0,3,1,1,3,1,1,3,0,0,0],
	[0,0,3,1,1,1,3,1,1,1,3,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,0],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,2,2,3,3,3,3,3,2,2,3,3],
	[0,0,2,2,0,0,0,0,0,2,2,0,0]
];
var level3Array=[
	[0,0,0,0,3,3,3,3,3,0,0,0,0],
	[0,0,0,3,1,1,3,1,1,3,0,0,0],
	[0,0,3,1,1,1,3,1,1,1,3,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,0],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,2,2,3,3,3,3,3,2,2,3,3],
	[0,0,2,2,0,0,0,0,0,2,2,0,0]
];
var level4Array=[
	[0,0,0,0,3,3,3,3,3,0,0,0,0],
	[0,0,0,3,1,1,3,1,1,3,0,0,0],
	[0,0,3,1,1,1,3,1,1,1,3,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,0],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,2,2,3,3,3,3,3,2,2,3,3],
	[0,0,2,2,0,0,0,0,0,2,2,0,0]
];
var level5Array=[
	[0,0,0,0,3,3,3,3,3,0,0,0,0],
	[0,0,0,3,1,1,3,1,1,3,0,0,0],
	[0,0,3,1,1,1,3,1,1,1,3,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,0],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,2,2,3,3,3,3,3,2,2,3,3],
	[0,0,2,2,0,0,0,0,0,2,2,0,0]
];
//0-poped,1-whhite,2-black

var c = document.getElementById("bricksCanvas");
var ctx = c.getContext("2d");
var modal = document.getElementById("myModal");
var lives=3;
var bricks;
var requiredScore;
var mainFun;
var score=0;
var freddie = new Audio('audio/freddie.wav');
var brian = new Audio('audio/brian.wav');
var john = new Audio('audio/john.wav');
var roger = new Audio('audio/roger.wav');
var mainAudio;
var coin = new Audio('audio/coin.wav');
var level=1;
window.onload = fadein(0);

var player={
	x:325,
	y:c.height-30,
	width: 150,
	height: 15,
	color: 'none',
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
	dy: -2.9,
};

var radius=8;

function mainMainFunction(){
	document.getElementById("score").textContent="Score: "+score;
	switch(level){
		case 1:bricks = createBricks();requiredScore=75;break;
		case 2:break;
		case 3:break;
		case 4:break;
		case 5:break;
	}
	document.getElementById("start").disabled = true;
	lives=3;
	setTimeout(function(){mainFunction();drawPlayer();},5000);
	playTheGame();
}

function mainFunction(){
	setTimeout(function(){
		ballMoveFunction();
		switch(level){
			case 1: clearBricks(level1Array);break;
			case 2: clearBricks(level1Array);break;
			case 3: clearBricks(level1Array);break;
			case 4: clearBricks(level1Array);break;
			case 5: clearBricks(level1Array);break;
		}
		if(lives==0){
			mainAudio.pause();
			score=0;
			ctx.clearRect(0,0,c.width,c.height);
			document.getElementById("start").disabled = false;
			return;
		}
		mainFun = requestAnimationFrame(mainFunction);
	},10);
}

function drawPlayer(){
	setTimeout(function(){
		if(player.x>646){
			player.x=646;
		}
		if(player.x<0){
			player.x=2;
		}
		if(lives==0){
			return;
		}
			ctx.beginPath();
			ctx.rect(player.x, player.y, player.width, player.height);
			ctx.lineWidth=2;
			ctx.fillStyle = player.color;
			ctx.strokeStyle = "black";
			ctx.fill();
			ctx.stroke();
		if(score!==requiredScore){
			drawPlayerA = requestAnimationFrame(drawPlayer);
		}
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
	if(ball.x>=player.x&&ball.x<=player.x+player.width&&ball.y>=player.y&&ball.y<=player.y+player.height){//How the ball bounces from the 'player', different area of the bar equals to different angle of the bounce
		if(ball.x>=player.x&&ball.x<=player.x+10){
			ballMove.dy=-1.5;
			ballMove.dx=-4;
		}
		if(ball.x>=player.x+10&&ball.x<=player.x+20){
			ballMove.dy=-2;
			ballMove.dx=-3.2;
		}
		if(ball.x>=player.x+20&&ball.x<=player.x+30){

			ballMove.dy=-3;
			ballMove.dx=-3;
		}
		if(ball.x>=player.x+30&&ball.x<=player.x+40){
			ballMove.dy=-3.5;
			ballMove.dx=-1;
		}
		if(ball.x>=player.x+40&&ball.x<=player.x+50){
			ballMove.dy=-4;
			ballMove.dx=-0.5;
		}
		if(ball.x>=player.x+50&&ball.x<=player.x+60){
			ballMove.dy=-4.3;
			ballMove.dx=0;
		}
		if(ball.x>=player.x+60&&ball.x<=player.x+70){
			ballMove.dy=-4;
			ballMove.dx=0.5;
		}
		if(ball.x>=player.x+70&&ball.x<=player.x+80){//sredina
			ballMove.dy=-3;
			ballMove.dx=0;
		}
		if(ball.x>=player.x+80&&ball.x<=player.x+90){
			ballMove.dy=-3;
			ballMove.dx=-0.62;
		}
		if(ball.x>=player.x+90&&ball.x<=player.x+100){
			ballMove.dy=-3;
			ballMove.dx=-1.22;
		}
		if(ball.x>=player.x+100&&ball.x<=player.x+110){
			ballMove.dy=-3;
			ballMove.dx=-1.76;
		}
		if(ball.x>=player.x+110&&ball.x<=player.x+120){
			ballMove.dy=-3;
			ballMove.dx=-2.23;
		}
		if(ball.x>=player.x+120&&ball.x<=player.x+130){
			ballMove.dy=-3;
			ballMove.dx=-2.59;
		}
		if(ball.x>=player.x+130&&ball.x<=player.x+140){
			ballMove.dy=-3;
			ballMove.dx=-2.85;
		}
		if(ball.x>=player.x+140&&ball.x<=player.x+150){
			ballMove.dy=-3;
			ballMove.dx=-2.98;
		}
	}
	else if(ball.y>640){
		lives--;
		ball.x=c.width/2;
		ball.y=c.height-40;
		player.x=325;
		ballMove.dx=3;
		ballMove.dy=-2.9;
		document.getElementById("lives").textContent="Lives: "+lives;
		if(lives==0){//With no lives you die
			cancelAnimationFrame(drawPlayerA);
		}
	}
	ball.x += ballMove.dx;
	ball.y += ballMove.dy;
}

function drawBall(){
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, 8, 0, Math.PI*2);
	ctx.strokeStyle = "black";
	ctx.lineWidth=2;
    ctx.fillStyle = "darkgray";
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
	var value = 60;
	for (var i = 0; i < bricks.length; i++) { 
		bricks[i] = new Array(14); 
	}
	for (var i = 0; i < bricks.length; i++) { 
		for (var j = 0; j < bricks[i].length; j++) { 
			var r=Math.random()*10+1;
			if(level1Array[i][j]==0){
				bricks[i][j] = {
					x:j*value,
					y:i*(value/2) ,
					pop: true,
					special: false,
					size: value,
				};
			}
			else if(level1Array[i][j]==1||level1Array[i][j]==2||level1Array[i][j]==3){
				bricks[i][j] = {
					x:j*value+10,
					y:i*(value/2) ,
					pop: false,
					special: false,
					size: value,
				};
			}
			else if(i==bricks.length-1){
				bricks[i][j] = {
					x:j*value+10,
					y:i*(value/2) ,
					pop: true,
					special: false,
					size: value,
				};
			}
			else{
				bricks[i][j] = {
					x:j*value+10,
					y:i*(value/2) ,
					pop: false,
					special: false,
					size: value,
				};
			}
		} 
	}
	return bricks;
}

function clearBricks(level1Array){
	for (var k = 0; k < bricks.length; k++) { 
		for (var l = 0; l < bricks[k].length-1; l++) { 
			if(bricks[k][l].pop==false){
				var r=Math.random()*10+1;
				ctx.beginPath();
				ctx.rect(bricks[k][l].x, bricks[k][l].y, bricks[k][l].size, 28);
				if(level1Array[k][l]==0||level1Array[k][l]==1){
					ctx.fillStyle = "#ffffff";
				}
				if(level1Array[k][l]==2){
					ctx.fillStyle = "#000000";
				}
				if(level1Array[k][l]==3){
					ctx.fillStyle = "red";
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
			if(ball.x>=bricks[k][l].x&&ball.x<=bricks[k][l].x+bricks[k][l].size&&ball.y>=bricks[k][l].y&&ball.y<=bricks[k][l].y+28){
				if(bricks[k][l].pop==false){
					if((ball.x>=bricks[k][l].x&&ball.x<=bricks[k][l].x+3)||(ball.x<=bricks[k][l].x+bricks[k][l].size&&ball.x>=bricks[k][l].x+54)){
						ballMove.dx=-ballMove.dx;
						ballMove.dy=ballMove.dy;
					}else{
						ballMove.dy=-ballMove.dy;
					}
					score++;
					coin.play();
					document.getElementById("score").textContent="Score: "+score;
					bricks[k][l].pop=true;
					if(score==requiredScore){
						setTimeout(function(){cancelAnimationFrame(mainFun);},20);
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
	console.log(mainAudio.duration);
	setTimeout(function(){mainAudio.play();}, mainAudio.duration*1000+1000);
	mainAudio.volume=0.5;
}

function timer(){
	var time=5;
	document.getElementById("startNumbers").style.visibility = "visible";
	document.getElementById("startNumbers").textContent = time+"..";
	setTimeout(function(){clearInterval(x);document.getElementById("startNumbers").style.visibility = "hidden";},5000);
	var x = setInterval(function(){
		time--;
		document.getElementById("startNumbers").textContent = time+"..";
	},1000);
};

document.getElementById("left").addEventListener("click", left);
document.getElementById("right").addEventListener("click", right);

function left(){
	setTimeout(function(){
		player.x=player.x-10;
		requestAnimationFrame(left);
	},40);
}

function right(){
	setTimeout(function(){
		player.x=player.x+10;
		requestAnimationFrame(right);
	},40);
}

function mute(){
	if(mainAudio.volume==0.5){
		document.getElementById("muteImg").src = "img/audio_muted_icon.png";
		mainAudio.volume = 0;
	}else{
		document.getElementById("muteImg").src = "img/audio_icon.png";
		mainAudio.volume = 0.5;
	}
}
function pickFreddie(){
	fadeout(100);
	player.color = 'yellow';
}
function pickBrian(){
	fadeout(100);
	player.color = "red";
}
function pickJohn(){
	fadeout(100);
	player.color = "green";
}
function pickRoger(){
	fadeout(100);
	player.color = "blue";
}

function fadeout(i){
    time=setTimeout(function(){
		document.getElementById("myModal").style.opacity = i/100;
		i--;
		fadeout(i);
		if(i==0){
			clearTimeout(time);
			modal.style.display = "none";
			return;
		}
	},4)
}

function fadein(i){
    time=setTimeout(function(){
		document.getElementById("myModal").style.opacity = i/100;
		i++;
		fadein(i);
		if(i==100){
			clearTimeout(time);
			return;
		}
	},4)
}

function characterPlay(x){
	if((brian.duration>0&&!brian.paused)||(john.duration>0&&!john.paused)||(roger.duration>0&&!roger.paused)){
		return;
	}
	else if(x==0){
		freddie.play();
		mainAudio = new Audio ('audio/Coming_Soon.mp3');
	}
	
	if((freddie.duration>0&&!freddie.paused)||(john.duration>0&&!john.paused)||(roger.duration>0&&!roger.paused)){
		return;
	}
	else if(x==1){
		brian.play();
		mainAudio = new Audio ('audio/39.mp3');
	}
	
	if((brian.duration>0&&!brian.paused)||(freddie.duration>0&&!freddie.paused)||(roger.duration>0&&!roger.paused)){
		return;
	}
	else if(x==2){
		john.play();
		mainAudio = new Audio ('audio/Play_the_Game.mp3');
	}
	
	if((brian.duration>0&&!brian.paused)||(john.duration>0&&!john.paused)||(freddie.duration>0&&!freddie.paused)){
		return;
	}
	else if(x==3){
		roger.play();
		mainAudio = new Audio ('audio/Play_the_Game.mp3');
	}
}