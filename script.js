var canvas;
var ctx;
var mx = 1;
var my = 1;
var screenWidth = 700;
var screenHeight = 350;
var banannaWidth = 50;
var banannaHeight = 50;
var monkeyWidth = 50;
var monkeyHeight = 50;
var monkeyPosX = 25;
var monkeyPosY = 125;
var monkeySpeed = 5;
var x = monkeyPosX + banannaWidth;        // this is the starting position
var y = monkeyPosY;
var held = true;
var evilMonkeyHeight = 50;
var evilMonkeyWidth = 50;
var score = 0;
var evilMonkeyPosX = Math.floor((Math.random()*350 - evilMonkeyWidth) + 350);
var evilMonkeyPosY = Math.floor(Math.random()*330 - evilMonkeyHeight) + monkeyHeight;
var level1 = false;
var level2 = false;


var bananna = new Image();
bananna.src = "images/bananna.png";

//chooseEvilMonkeyImage = Math.floor(Math.random()*2)+1;
//if(chooseEvilMonkeyImage === 1)
//	{
//	alert(1);
//	evilMonkey = new Image();
//	evilMonkey.src = "images/monkeyBoss.png";
//
//	}
//else if(chooseEvilMonkeyImage === 2)
//	{
//	alert(2);
	evilMonkey = new Image();
	evilMonkey.src = "images/evilMonkey.png";
	//}

function monkeyDorkMonkey()
	{

	monkey = new Image();
	monkey.src = "images/dorkMonkey.png";
	document.getElementById("characterText").style.zIndex = "-2";
	}
function monkeyBuffMonkey()
	{

	monkey = new Image();
	monkey.src = "images/buffMonkey.png";
	document.getElementById("characterText").style.zIndex = "-2";
	}
function monkeySportMonkey()
	{

	monkey = new Image();
	monkey.src = "images/sportMonkey.jpg";
	document.getElementById("characterText").style.zIndex = "-2";
	}



function drawBorder()
	{
	ctx.rect(0,0,screenWidth, screenHeight);
	ctx.stroke();
	}
function playerMonkey(monkeyPosX, monkeyPosY)
	{
	ctx.drawImage(monkey, monkeyPosX, monkeyPosY);
	}

function moveEvilMonkey(evilMonkeyPosX, evilMonkeyPosY)
	{

	ctx.drawImage(evilMonkey, evilMonkeyPosX, evilMonkeyPosY)

	}



function banannaS(x, y)   //this draws the square
	{
	ctx.drawImage(bananna, x, y);
	//outerwalls
	if (x + mx > screenWidth - banannaWidth || x + mx < 0)
		mx = -mx;
	if (y + my > screenHeight - banannaHeight || y + my < 0)
		my = -my;

	//playerMonkey
	if (
		(y + my >= evilMonkeyPosY - banannaHeight &&
		y + my <= evilMonkeyPosY + evilMonkeyHeight) &&
		(x + mx == evilMonkeyPosX - banannaWidth ||
		x + mx == evilMonkeyPosX + evilMonkeyWidth))
		{

		evilMonkeyPosX = Math.floor((Math.random()*350 - evilMonkeyWidth) + 350);
		evilMonkeyPosY = Math.floor(Math.random()*310 - evilMonkeyHeight) + evilMonkeyHeight;
		mx = -mx;
		makeEvilMonkey1();
		score++;
		document.getElementById("score").innerHTML = "Your score: " + score;
		}
	if (
		(y + my >= monkeyPosY - banannaHeight &&
		y + my <= monkeyPosY + monkeyHeight) &&
		(x + mx == monkeyPosX - banannaWidth ||
		x + mx == monkeyPosX + monkeyWidth))
		{
		held = true;

		mx = -mx;
		}
	}

function clear()        //this clears the canvas
	{
	ctx.clearRect(0, 0, screenWidth, screenHeight);
	}

function init()         //this calls the draw() function every 10ms
	{

	level1 = true;
	if(level1)
		{
		level2 = false;

		requestAnimationFrame(init);
		document.getElementById("hard").style.visibility = "visible";
		document.getElementById("button").style.visibility = "hidden";
		canvas = document.getElementById("myCanvas");
		ctx = canvas.getContext("2d");
		return draw();
		}
	}
function init2()
	{

	level2 = true;
	if(level2)
		{
		level1 = false;

		requestAnimationFrame(init2);
		document.getElementById("hard").style.visibility = "hidden";
		canvas = document.getElementById("myCanvas");
		ctx = canvas.getContext("2d");
		return draw2();
		}
	}
function draw()         //this animates the square
	{
	level2 = false;
	if(level1)
		{

		clear();
		drawBorder();
		playerMonkey(monkeyPosX, monkeyPosY);
		banannaS(x, y);
		makeEvilMonkey1();
		gameChanger();

		if (held === false)
			{
			x += mx;
			}
		}

	}
function draw2()       //this animates the square
	{
	level1 = false;
	if(level2)
		{

		clear();
		drawBorder();
		playerMonkey(monkeyPosX, monkeyPosY);
		banannaS(x, y);
		makeEvilMonkey1();


		if (held === false)
			{
			x += mx;
			}
		if (evilMonkeyPosY > screenHeight - evilMonkeyHeight)
			{
			my = - my;
			}
		if (evilMonkeyPosY < 0)
			{
			my = - my;
			}
		evilMonkeyPosY += my;
		}

	}

function gameChanger()
	{
	if(score === 1)
		{
		document.getElementById("hard").style.visibility = "visible";
		document.getElementById("levelUnlocked").style.zIndex = "3";
		document.getElementById("levelUnlocked").style.visibility = "visible";
		document.getElementById("levelUnlocked").style.visibility = "hidden";
		}

	}
function makeEvilMonkey1()
	{

	moveEvilMonkey(evilMonkeyPosX, evilMonkeyPosY);
	}

function doKeyDown(event)
	{


	switch (event.keyCode)
	{
		case 38:  /* Up arrow was pressed */
			monkeyPosY -= monkeySpeed;
			y -= monkeySpeed;
			if(y < 0)
				{
				y = 0;
				}
			if (monkeyPosY < 0)
				{
				monkeyPosY = 0;
				}
			break;
		case 40:  /* Down arrow was pressed */
			monkeyPosY += monkeySpeed;
			y += monkeySpeed;
			if(y > screenHeight - banannaHeight)
				{
				y = screenHeight - banannaHeight;
				}
			if (monkeyPosY > screenHeight - banannaHeight)
				{
				monkeyPosY = screenHeight - banannaHeight;
				}
			break;

		case 32:
			{
			held = false;
			}
			break;

//                case 37:  /* Left arrow was pressed */
//                    monkeyPosX -= monkeySpeed;
//                    if (monkeyPosX < 0)
//                        {
//                        monkeyPosX = 0;
//                        }
//                    break;
//                case 39:  /* Right arrow was pressed */
//                    monkeyPosX += monkeySpeed;
//                    if (monkeyPosX > screenWidth - banannaWidth)
//                        {
//                        monkeyPosX = screenWidth - banannaWidth;
//                        }
//                    break;
	}
	}
window.addEventListener("keydown", doKeyDown, true);