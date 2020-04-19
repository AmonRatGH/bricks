var level1Array=[
	[0,0,0,0,3,3,3,3,3,0,0,0,0], //75 points
	[0,0,0,3,1,1,3,1,1,3,0,0,0],
	[0,0,3,1,1,1,3,1,1,1,3,0,0],
	[0,3,3,3,3,3,3,3,3,3,3,3,0],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,3,3,3,3,3,3,3,3,3,3,3],
	[3,3,2,2,3,3,3,3,3,2,2,3,3],
	[0,0,2,2,0,0,0,0,0,2,2,0,0]
];
var level2Array=[
	[2,2,2,2,2,2,2,2,2,2,2,2,2], //104 points - for now... 
	[2,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2],
	[2,1,1,1,1,1,1,1,1,1,1,1,2],
	[2,1,1,2,2,1,2,1,1,2,1,2,2],
	[2,2,2,2,2,2,2,2,2,2,2,2,2]
];
var level3Array=[
	[6,0,0,3,3,0,0,0,3,3,0,0,4], //61 points - for now...
	[6,0,3,3,3,3,3,3,3,3,3,2,2],
	[0,0,3,3,3,3,3,3,3,3,2,0,4],
	[0,0,3,3,3,3,3,3,3,3,3,0,0],
	[0,0,0,3,3,3,3,3,3,3,0,0,0],
	[1,0,2,2,3,3,3,3,3,0,0,0,0],
	[2,2,0,0,0,3,3,3,0,0,0,6,0],
	[1,0,0,0,0,0,3,0,0,0,0,6,0]
];
var level4Array=[
	[4,4,4,0,4,0,0,4,0,0,4,0,0], //48 points - for now....
	[4,4,4,0,4,0,0,4,0,0,4,0,0],
	[4,4,4,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,5,5,5,5,5,5,5,5,2,0],
	[4,4,4,5,5,5,5,5,5,5,5,2,0],
	[4,4,4,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,0,0,0,0,0,0,0,0,0,0],
	[4,4,4,0,0,0,0,0,0,0,0,0,0]
];
var level5Array=[
	[0,0,2,6,2,0,2,0,2,6,2,0,0], //78
	[0,2,2,6,6,2,6,2,6,6,2,2,0],
	[0,2,6,3,6,6,3,6,6,3,6,2,0],
	[0,2,6,6,6,6,6,6,6,6,6,2,0],
	[0,2,6,6,1,1,1,1,1,6,6,2,0],
	[0,2,6,1,1,1,1,1,1,1,6,2,0],
	[0,0,2,6,6,6,6,6,6,6,2,0,0],
	[0,0,0,2,2,2,2,2,2,2,0,0,0]
];
//0-poped,1-white,2-black,3-red, 4-gray,5-brown,6-gold

var c = document.getElementById("bricksCanvas");
var ctx = c.getContext("2d");
var modal = document.getElementById("myModal");
var playAr;
var drawPlayerA;
var lives=3;
var bricks;
var requiredScore;
var mainFun;
var ballFunction;
var score=0;
var angleValue = 4;
var freddie = new Audio('audio/assets/freddie.wav');
var brian = new Audio('audio/assets/brian.wav');
var john = new Audio('audio/assets/john.wav');
var roger = new Audio('audio/assets/roger.wav');
var mainAudio;
var coin = new Audio('audio/assets/coin.wav');
var level=1;
var img = new Image;
img.src = "img/WinkSpriteSheet.png";
var powerup = new Image;
imgx=500;
imgy=288;
window.onload = fadein(0);
var drawFreddie;
var paused=false;
var drawPowerup;

//timer
var second=0;
var minute=0;
var milisec=0;
var endTimer=false;

var player={
	x:325,
	y:c.height-30,
	w: 0,
	h: 15,
	color: 'none',
};
var start=true;

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
	document.getElementById("startDiv").style.display="none"; 
	document.getElementById("pauseDiv").style.display="block";
	document.getElementById("score").textContent="Score: "+score;
	switch(level){
		case 1:bricks = createBricks(level1Array);requiredScore=75;playAr=level1Array;setTimeout(function(){document.getElementById("levelName").style.display= "inline"},5000);setTimeout(function(){timerScore(0,0,0)},4000);break;//75
		case 2:bricks = createBricks(level2Array);requiredScore=173;playAr=level2Array;setTimeout(function(){document.getElementById("levelName").textContent="Action this day!";document.getElementById("levelName").style.display= "inline"},5000);break;//104
		case 3:bricks = createBricks(level3Array);requiredScore=245;playAr=level3Array;setTimeout(function(){document.getElementById("levelName").textContent="One year of love";document.getElementById("levelName").style.display= "inline"},5000);break;//72
		case 4:bricks = createBricks(level4Array);requiredScore=293;playAr=level4Array;setTimeout(function(){document.getElementById("levelName").textContent="Hammer to fall";document.getElementById("levelName").style.display= "inline"},5000);break;//48
		case 5:bricks = createBricks(level5Array);requiredScore=371;playAr=level5Array;setTimeout(function(){document.getElementById("levelName").textContent="March of the black queen";document.getElementById("levelName").style.display= "inline"},5000);break;//78
		case 6:ctx.clearRect(0,0,c.width,c.height);endTimer=true;drawFreddie = setInterval(function(){drawSprite(1,0,0)},6400);setTimeout(function(){document.getElementById("levelName").textContent="Now you finally appreciate Queen music :)";document.getElementById("levelName").style.display= "inline"},5000);
		return;
	}
	setTimeout(function(){document.getElementById("pause").disabled=false;
	document.getElementById("pause").style.cursor="pointer";mainFun = requestAnimationFrame(mainFunction);},5000);
	ball.x=c.width/2;
	ball.y=c.height-40;
	if(ballMove.dy>=0){
		ballMove.dy=-ballMove.dy;
	}
	mainAudio.play();
	mainAudio.volume = 0.5;
	if(level==6){
		setTimeout(function(){clearInterval(drawFreddie);ctx.clearRect(0,0,c.width,c.height);},mainAudio.duration);
		console.log(mainAudio.duration);
	}
}

function mainFunction(){
	setTimeout(function(){
		if(paused==true){
			requestAnimationFrame(mainFunction);
		}
		else{
		ballMoveFunction();
		drawPlayer();
		clearBricks(playAr);
		if(score==requiredScore){
			return;
		}
		if(lives==0){
			mainAudio.pause();
			score=0;
			ctx.clearRect(0,0,c.width,c.height);
			document.getElementById("start").disabled = false;
			return;
		}
		requestAnimationFrame(mainFunction);
		}
	},10);
}

function pause(){
	if(paused==false){
		paused=true;
		mainAudio.pause();
		document.getElementById("pause").textContent="Resume";
	}
	else if(paused==true){
		paused=false;
		document.getElementById("pause").textContent="Pause";
		timerScore(minute,second,milisec);
		mainAudio.play();
	}
}

function drawPlayer(){
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
		ctx.rect(player.x, player.y, player.w, player.h);
		ctx.lineWidth=2;
		ctx.fillStyle = player.color;
		ctx.strokeStyle = "black";
		ctx.fill();
		ctx.stroke();
}

function ballMoveFunction(){
	var bounce;
	ctx.clearRect(0, 0, c.width, c.height);
	drawBall();
	if(ball.x + ballMove.dx > c.width || ball.x + ballMove.dx < 0) {
		ballMove.dx = -ballMove.dx;
	}

	if(ball.y + ballMove.dy > c.height || ball.y + ballMove.dy < 0) {
		ballMove.dy = -ballMove.dy;
	}
	if(ball.x>=player.x&&ball.x<=player.x+player.w&&ball.y>=player.y&&ball.y<=player.y+player.h){//How the ball bounces from the 'player', different area of the bar equals to different angle of the bounce
		if(ball.y<c.width-31){
			
			if(ball.x-player.x<(player.w/2)){
				bounce=-(player.x-ball.x);
				console.log("1 "+bounce);
			}
			else{
				bounce=ball.x-player.x;
				console.log("2 "+bounce);
			}
			parseInt(bounce,10);
		}
		if(bounce<=20){
			ballMove.dy=-(angleValue*(20/75));
			ballMove.dx=-(angleValue*((75-20)/75));
		}
		else if(bounce>=130){
			ballMove.dy=(angleValue*((130-player.w/2)-player.w/2)/(player.w/2));
			ballMove.dx=(angleValue*((130-(player.w/2))/(player.w/2)));
			console.log(ballMove.dy);
		}
		else if(bounce<player.w/2&&bounce>20){
			ballMove.dy=-(angleValue*bounce/(player.w/2));
			ballMove.dx=-(angleValue*(((player.w/2)-bounce)/(player.w/2)));
		}
		else if(bounce==(player.w/2)){
			ballMove.dy=-angleValue;
			ballMove.dx=0;
		}
		else if(bounce>(player.w/2)&&bounce<130){
			ballMove.dy=(angleValue*((bounce-player.w/2)-player.w/2)/(player.w/2));
			ballMove.dx=(angleValue*((bounce-(player.w/2))/(player.w/2)));
			console.log(ballMove.dy);
		}
	}
	if(ball.y>645){
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

function createBricks(levelArray){
	var bricks = new Array(8);
	var value = 60;
	for (var i = 0; i < bricks.length; i++) { 
		bricks[i] = new Array(14); 
	}
	for (var i = 0; i < bricks.length; i++) { 
		for (var j = 0; j < bricks[i].length; j++) { 
			var r=Math.random()*10+1;
			if(levelArray[i][j]==0){
				bricks[i][j] = {
					x:j*value,
					y:i*(value/2) ,
					pop: true,
					size: value,
				};
			}
			else if(levelArray[i][j]==1||levelArray[i][j]==2||levelArray[i][j]==3){
				bricks[i][j] = {
					x:j*value+10,
					y:i*(value/2) ,
					pop: false,
					size: value,
				};
			}
			else{
				bricks[i][j] = {
					x:j*value+10,
					y:i*(value/2) ,
					pop: false,
					size: value,
				};
			}
		} 
	}
	return bricks;
}

function clearBricks(levelArray){
	for (var k = 0; k < bricks.length; k++) { 
		for (var l = 0; l < bricks[k].length-1; l++) { 
			if(bricks[k][l].pop==false){
				var r=Math.random()*10+1;
				ctx.beginPath();
				ctx.rect(bricks[k][l].x, bricks[k][l].y, bricks[k][l].size, 28);
				if(levelArray[k][l]==0||levelArray[k][l]==1){
					ctx.fillStyle = "#ffffff";
				}
				if(levelArray[k][l]==2){
					ctx.fillStyle = "#000000";
				}
				if(levelArray[k][l]==3){
					ctx.fillStyle = "red";
				}
				if(levelArray[k][l]==4){
					ctx.fillStyle = "gray";
				}
				if(levelArray[k][l]==5){
					ctx.fillStyle = "brown";
				}
				if(levelArray[k][l]==6){
					ctx.fillStyle = "#FFD700";
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
			if(ball.x>=bricks[k][l].x&&ball.x<=bricks[k][l].x+bricks[k][l].size&&ball.y>=bricks[k][l].y&&ball.y<=bricks[k][l].y+29){
				if(bricks[k][l].pop==false){
					if((ball.x>=bricks[k][l].x&&ball.x<=bricks[k][l].x+2)||(ball.x<=bricks[k][l].x+bricks[k][l].size&&ball.x>=bricks[k][l].x+58)){
						ballMove.dx=-ballMove.dx;
						ballMove.dy=ballMove.dy;
					}else{
						ballMove.dy=-ballMove.dy;
					}
					var chance=getRandomInt(0,2);
					score++;
					coin.play();
					document.getElementById("score").textContent="Score: "+score;
					bricks[k][l].pop=true;
					if(chance<3){
						console.log("chance: "+chance);
						switch(chance){
							case 0:powerup.src = "img/microphone_icon.png";
							case 1:powerup.src = "img/guitar_icon.png";
							case 2:powerup.src = "img/drum_icon.png";
							default:powerup.src = "img/drum_icon.png";
						}
						setTimeout(dropPowerup(bricks[k][l].x,bricks[k][l].y),10);
					}
					if(score==requiredScore){
						document.getElementById("levelName").style.display= "none";
						audioFadeout(50);
						cancelAnimationFrame(mainFun);
						level++;
						document.getElementById("score").textContent="Congratz you won!";
						setTimeout(function(){mainMainFunction();timer();},1000);
					}
				}
			}
		} 
	}
}
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function dropPowerup(x,y){
	setTimeout(function(){
		if(paused==true){
			dropPowerup(x,y);
		}
		else{
			ctx.drawImage(powerup,x,y,32,32);
			y=y+2;
			if(y==player.y||y>=c.height){
				return;
			}
			dropPowerup(x,y);
		}
	},10);
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

//document.getElementById("left").addEventListener("click", left);
//document.getElementById("right").addEventListener("click", right);

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
	player.w=177;
	player.color = 'yellow';
	mainAudio = new Audio ('audio/songs/Bohemian_Rhapsody.mp3');
}
function pickBrian(){
	fadeout(100);
	player.w=187;
	player.color = "red";
	mainAudio = new Audio ('audio/songs/39.mp3');
}
function pickJohn(){
	fadeout(100);
	player.w=180;
	player.color = "green";
	mainAudio = new Audio ('audio/songs/Another_one_bites_the_dust.mp3');
}
function pickRoger(){
	fadeout(100);
	player.w=179;
	player.color = "blue";
	mainAudio = new Audio ('audio/songs/Im_in_love_with_my_car.mp3');
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
	},4);
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

function audioFadeout(j){
    time=setTimeout(function(){
		--j;
		mainAudio.volume=j/100;
		audioFadeout(j);
		if(j==0){
			mainAudio.pause();
			setTimeout(function(){
				if(level==2){
					mainAudio = new Audio('audio/songs/I_want_to_break_free.mp3');
				}
				else if(level==3){
					mainAudio = new Audio('audio/songs/Somebody_to_love.mp3');
				}
				else if(level==4){
					mainAudio = new Audio('audio/songs/Was_it_all_worth_it.mp3');
				}
				else if(level==5){
					mainAudio = new Audio('audio/songs/The_show_must_go_on.mp3');
				}
				else if(level==6){
					mainAudio = new Audio('audio/songs/We_are_the_champions.mp3');
					mainAudio.play();
					mainAudio.loop;
					mainAudio.volume = 0.5;
					return;
				}
				mainAudio.play();
				mainAudio.loop;
				mainAudio.volume = 0.5;
			},3000);
			clearTimeout(time);
		}
	},60);
}

function characterPlay(x){
	if((brian.duration>0&&!brian.paused)||(john.duration>0&&!john.paused)||(roger.duration>0&&!roger.paused)){
		return;
	}
	else if(x==0){
		freddie.play();
	}
	
	if((freddie.duration>0&&!freddie.paused)||(john.duration>0&&!john.paused)||(roger.duration>0&&!roger.paused)){
		return;
	}
	else if(x==1){
		brian.play();
	}
	
	if((brian.duration>0&&!brian.paused)||(freddie.duration>0&&!freddie.paused)||(roger.duration>0&&!roger.paused)){
		return;
	}
	else if(x==2){
		john.play();
	}
	
	if((brian.duration>0&&!brian.paused)||(john.duration>0&&!john.paused)||(freddie.duration>0&&!freddie.paused)){
		return;
	}
	else if(x==3){
		roger.play();
	}
}

function cheat1(){
	lives++;
	document.getElementById("lives").textContent="Lives: "+lives;
}

function cheat2(){
	lives+=99999;
	document.getElementById("lives").textContent="Lives: "+lives;
}

function drawSprite(i,j,k){
	time=setTimeout(function(){
		ctx.drawImage(img,imgx*j,imgy*k,500,288,c.width/2-187.5,c.height/2-108,375,216);
		i++;
		j++;
		if(j==5){
			j=0;
			k++;
		}
		drawSprite(i,j,k);
		if(i==80){
			clearTimeout(time);
			return;
		}
	},80);
}
//sprite size for each frame 500*288

function timerScore(min,sec,mil){
	setTimeout(function(){
		if(mil==100){
			sec++;
			mil=0;
		}
		if(sec==60){
			min++;
			sec=0;
		}
		if(min<10){
			if(sec<10){
				document.getElementById("time").textContent="0"+min+":"+"0"+sec;
			}else{
				document.getElementById("time").textContent="0"+min+":"+sec;
			}
		}else{
			if(sec<10){
				console.log("no");
				document.getElementById("time").textContent=min+":"+"0"+sec;
			}else{
				console.log("yes");
				document.getElementById("time").textContent=min+":"+sec;
			}
		}
		if(endTimer==true||paused==true){
			second=sec;
			minute=min;
			milisec=mil;
			return;
		}
		timerScore(min,sec,mil+1);
	},10);
}