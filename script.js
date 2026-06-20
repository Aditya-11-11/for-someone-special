
/* =========================
   PAGE 1 -> PAGE 2
========================= */

function showBirthday(){

flashScreen();

setTimeout(() => {

document.getElementById("page1").style.display = "none";
document.getElementById("page2").style.display = "block";

animateBirthday();

},200);

}

/* FLASH EFFECT */
function flashScreen(){

let flash = document.createElement("div");
flash.classList.add("flash");
document.body.appendChild(flash);

setTimeout(() => {
flash.remove();
},400);

}

/* MAIN ANIMATION */
function animateBirthday(){

let title = document.getElementById("birthdayText");

title.animate([
{
opacity:0,
transform:"scale(0.3)"
},
{
opacity:1,
transform:"scale(1.15)"
},
{
opacity:1,
transform:"scale(1)"
}
],{
duration:1200,
fill:"forwards"
});

createConfetti();

setTimeout(() => { createConfetti(); },1000);
setTimeout(() => { createConfetti(); },2000);

setTimeout(() => {

let teddy = document.getElementById("teddyImage");

teddy.animate([
{
opacity:0,
transform:"translateY(40px)"
},
{
opacity:1,
transform:"translateY(0)"
}
],{
duration:1000,
fill:"forwards"
});

},1200);

setTimeout(() => {

let question = document.getElementById("questionSection");

question.animate([
{
opacity:0,
transform:"translateY(20px)"
},
{
opacity:1,
transform:"translateY(0)"
}
],{
duration:800,
fill:"forwards"
});

},2200);

}

/* CONFETTI */
function createConfetti(){

for(let i=0;i<180;i++){

let confetti = document.createElement("div");

confetti.style.position = "fixed";
confetti.style.width = "10px";
confetti.style.height = "10px";
confetti.style.borderRadius = "2px";
confetti.style.background = `hsl(${Math.random()*360},100%,50%)`;
confetti.style.left = (window.innerWidth/2)+"px";
confetti.style.top = (window.innerHeight/2)+"px";
confetti.style.zIndex = "9999";

document.body.appendChild(confetti);

let x = (Math.random()-0.5)*1400;
let y = (Math.random()-0.5)*1200;
let rotation = Math.random()*1080;

confetti.animate([
{
transform:`translate(0px,0px) rotate(0deg)`,
opacity:1
},
{
transform:`translate(${x}px,${y}px) rotate(${rotation}deg)`,
opacity:1,
offset:0.6
},
{
transform:`translate(${x}px,${y+700}px) rotate(${rotation+720}deg)`,
opacity:0
}
],{
duration:4000,
easing:"cubic-bezier(.15,.8,.25,1)"
});

setTimeout(() => {
confetti.remove();
},4000);

}

}

/* NO BUTTON */
const noBtn = document.getElementById("noBtn");

function moveNoButton(){

let currentX = parseFloat(noBtn.dataset.x || 0);
let currentY = parseFloat(noBtn.dataset.y || 0);

let moveX = (Math.random()*60)-30;
let moveY = (Math.random()*40)-20;

currentX += moveX;
currentY += moveY;

currentX = Math.max(-50, Math.min(50,currentX));
currentY = Math.max(-25, Math.min(25,currentY));

noBtn.style.transform = `translate(${currentX}px,${currentY}px)`;

noBtn.dataset.x = currentX;
noBtn.dataset.y = currentY;

}

noBtn.addEventListener("touchstart", function(e){
e.preventDefault();
moveNoButton();
});

noBtn.addEventListener("mouseover", moveNoButton);

noBtn.addEventListener("click", function(e){
e.preventDefault();
moveNoButton();
});


/* =========================
   ⭐ FIXED YES BUTTON (IMPORTANT)
========================= */

document.addEventListener("DOMContentLoaded", function () {

const yesBtn = document.getElementById("yesBtn");

if (yesBtn) {

function goToPage3(){
document.getElementById("page2").style.display = "none";
document.getElementById("page3").style.display = "block";
}

/* desktop click */
yesBtn.addEventListener("click", goToPage3);

/* mobile tap support */
yesBtn.addEventListener("touchstart", function(e){
e.preventDefault();
goToPage3();
});

}

});


/* =========================
   PAGE 3 - FIXED FLOW
========================= */

let nextBalloon = 1;

const balloons = [
document.getElementById("b1"),
document.getElementById("b2"),
document.getElementById("b3"),
document.getElementById("b4")
];

const words = ["YOU","ARE","TRULY","SPECIAL ❤️"];

balloons.forEach((b, index)=>{

b.addEventListener("click",()=>{

if(index+1 !== nextBalloon){
b.style.transform="scale(1.1)";
setTimeout(()=>b.style.transform="",200);
return;
}

/* SHOW WORD ONLY AFTER POP */
let textBox = document.getElementById("t"+(index+1));
textBox.innerText = words[index];
textBox.style.opacity = 1;

/* POP BALLOON */
b.classList.add("pop");

nextBalloon++;

/* AFTER LAST BALLOON */
if(nextBalloon === 5){

setTimeout(()=>{

/* Hide words behind balloons */
document.getElementById("hiddenText").style.opacity = "0";

/* Create center message */
let specialMsg = document.createElement("div");

specialMsg.id = "specialMsg";

specialMsg.innerHTML = "YOU ARE TRULY SPECIAL <br> ANU... ❤️";

specialMsg.style.position = "fixed";
specialMsg.style.top = "50%";
specialMsg.style.left = "50%";
specialMsg.style.transform = "translate(-50%,-50%)";
specialMsg.style.fontSize = "38px";
specialMsg.style.fontWeight = "bold";
specialMsg.style.fontFamily = "Century";
specialMsg.style.color = "#ec250f";
specialMsg.style.textAlign = "center";
specialMsg.style.opacity = "0";
specialMsg.style.transition = "1s ease";
specialMsg.style.zIndex = "999";

document.body.appendChild(specialMsg);

/* Fade In */
setTimeout(()=>{
specialMsg.style.opacity = "1";
},100);

/* Stay for 2 sec */
setTimeout(()=>{

specialMsg.style.opacity = "0";

/* Remove message */
setTimeout(()=>{

specialMsg.remove();

/* Show next message */
let msg = document.getElementById("nextMsg");
msg.style.opacity = "1";

setTimeout(()=>{
document.addEventListener("click",goToCake,{once:true});
},300);

},1000);

},2000);

},1500);

}

});

});

function goToCake(){

document.getElementById("page3").style.display="none";
document.getElementById("page4").style.display="flex";

let audio = document.getElementById("bgMusic");
if(audio){
audio.play().catch(()=>{});
}

}


/* =========================
   PAGE 4 - FULL FLOW (FIXED)
========================= */

let cake = document.getElementById("cakeImg");
let text = document.getElementById("cakeText");
let audio = document.getElementById("bgMusic");
let guestVideo = document.getElementById("guestVideo");

let page4State = 0;

/* START MUSIC (optional) */
function startCakeCeremony(){
audio.currentTime = 0;
audio.play().catch(()=>{});
}

/* MAIN CLICK HANDLER */
document.getElementById("page4").addEventListener("click", function(){

/* STEP 1 - DOOR */
if(page4State === 0){

audio.pause();

/* Hide cake image initially */
cake.style.display = "none";

/* Show message first */
text.style.opacity = "1";

text.innerHTML =
"Oh my gosh, look who's peeking through the door! 👀";

/* After 2 sec fade out text */
setTimeout(()=>{

text.style.transition = "opacity 1s ease";
text.style.opacity = "0";

setTimeout(()=>{

/* Show door image */
cake.style.display = "block";
cake.src = "images/door.png";
cake.classList.add("doorLarge");
cake.style.width = "450px";
cake.style.maxWidth = "95%";
cake.style.opacity = "0";
cake.style.transition = "opacity 1s ease";

setTimeout(()=>{
cake.style.opacity = "1";
},50);

/* After 1 sec show tap message */
setTimeout(()=>{

text.style.opacity = "1";
text.innerHTML =
"Tap to welcome them in... 😉";

},1000);

},1000);

},2000);

page4State = 1;
return;
}

/* STEP 2 - PLAY VIDEO */
if(page4State === 1){

cake.style.display = "none";

guestVideo.style.display = "block";
guestVideo.style.opacity = "1";
guestVideo.play();

text.innerHTML = "";

page4State = 2;
return;
}

/* STEP 3 - AFTER REVEAL SCREEN */
if(page4State === 3){

document.getElementById("guestReveal").innerHTML = "";

guestVideo.style.display = "none";

cake.style.display = "block";
cake.src = "images/cake-candles-on.png";
cake.classList.remove("doorLarge");
cake.style.width = "";
cake.style.maxWidth = "90%";

text.innerHTML =
"Make a wish ❤️<br>Tap to blow the candles";

audio.currentTime = 0;
audio.play().catch(()=>{});

page4State = 4;
return;
}

});

/* =========================
   VIDEO END EVENT (FIXED)
========================= */

guestVideo.addEventListener("ended", () => {

let container = document.getElementById("guestReveal");
container.innerHTML = "";

/* fade video */
guestVideo.style.transition = "opacity 1s ease";
guestVideo.style.opacity = "0";

setTimeout(() => {

guestVideo.style.display = "none";

/* IMAGE */
let img = document.createElement("img");
img.src = "images/guest.png";

/* TEXT */
let msg = document.createElement("div");
msg.innerHTML =
"I hope you like our guest 😉<br><br>Now shall we go to cake cutting ceremony?<br><br>Tap to continue...";

/* APPEND */
container.appendChild(img);
container.appendChild(msg);

/* SHOW ANIMATION */
setTimeout(() => {
img.style.opacity = "1";
msg.style.opacity = "1";
}, 100);

page4State = 3;

}, 1000);

});

/* =========================
   CAKE CLICK
========================= */

cake.addEventListener("click", (e) => {

e.stopPropagation();

if(page4State !== 4) return;

cake.src = "images/cake-candles-off.png";

text.innerHTML = "Swipe to cut the cake 🎂";

page4State = 5;

});

/* =========================
   TOUCH SWIPE
========================= */

let startX = 0;
let startY = 0;

cake.addEventListener("touchstart", (e) => {

if(page4State !== 5) return;

startX = e.touches[0].clientX;
startY = e.touches[0].clientY;

});

cake.addEventListener("touchend", (e) => {

if(page4State !== 5) return;

let endX = e.changedTouches[0].clientX;
let endY = e.changedTouches[0].clientY;

let distance = Math.sqrt(
Math.pow(endX - startX, 2) +
Math.pow(endY - startY, 2)
);

if(distance > 30){

cutCake();

}

});

/* =========================
   MOUSE SWIPE (LAPTOP)
========================= */

let mouseX = 0;
let mouseY = 0;

cake.addEventListener("mousedown", (e) => {

if(page4State !== 5) return;

mouseX = e.clientX;
mouseY = e.clientY;

});

cake.addEventListener("mouseup", (e) => {

if(page4State !== 5) return;

let dx = e.clientX - mouseX;
let dy = e.clientY - mouseY;

let distance = Math.sqrt(dx*dx + dy*dy);

if(distance > 30){

cutCake();

}

});

/* =========================
   CUT CAKE FUNCTION
========================= */

function cutCake(){

cake.src = "images/cake-cut.png";
text.innerHTML = "Perfect! ❤️";

page4State = 6;

setTimeout(() => {

cake.style.display = "none";

let cakeVideo = document.getElementById("cakeCutVideo");

cakeVideo.style.display = "block";
cakeVideo.style.opacity = "0";

setTimeout(() => {

cakeVideo.style.transition = "opacity 1s ease";
cakeVideo.style.opacity = "1";
cakeVideo.play();

}, 50);

}, 1500);

}

function blastConfetti(){

for(let i=0;i<200;i++){

let confetti = document.createElement("div");

confetti.style.position = "fixed";
confetti.style.width = "8px";
confetti.style.height = "8px";
confetti.style.background = `hsl(${Math.random()*360},100%,50%)`;
confetti.style.left = "50%";
confetti.style.top = "50%";
confetti.style.zIndex = "9999";
confetti.style.pointerEvents = "none";

document.body.appendChild(confetti);

let x = (Math.random()-0.5)*1200;
let y = (Math.random()-0.5)*800;

confetti.animate([
{ transform:`translate(0,0)`, opacity:1 },
{ transform:`translate(${x}px,${y}px)`, opacity:1, offset:0.7 },
{ transform:`translate(${x}px,${y+600}px)`, opacity:0 }
],{
duration:2000,
easing:"cubic-bezier(.15,.8,.25,1)"
});

setTimeout(()=>confetti.remove(),2000);
}
}

/* =========================
   CAKE VIDEO END → PAGE 5
========================= */

document.getElementById("cakeCutVideo")
.addEventListener("ended", () => {

/* 🎊 CONFETTI BLAST */
blastConfetti();

/* short delay before page change */

setTimeout(() => {

audio.pause();

document.getElementById("page4").style.display = "none";
document.getElementById("page5").style.display = "block";
document.getElementById("gameIntro").style.display = "flex";

}, 2500); //wait for confetti to finish

});

document.getElementById("gameIntro")
.addEventListener("click",()=>{

document.getElementById("gameIntro")
.style.display="none";

document.getElementById("revengeIntro")
.style.display="flex";

setTimeout(()=>{

document.getElementById("revengeIntro").style.display="none";
document.getElementById("gameRules").style.display="flex";

},1000);

document.getElementById("gameRules")
.addEventListener("click",()=>{

document.getElementById("gameRules").style.display="none";
document.getElementById("gameArea").style.display="block";

});

});

/* =========================
   PAGE 5 - UPDATED (DART READY + THROW ANIMATION)
========================= */

let totalScore = 0;
let dartsLeft = 5;

let board = document.getElementById("dartBoardContainer");
let reaction = document.getElementById("reactionText");
let scoreSpan = document.getElementById("score");
let dartsSpan = document.getElementById("dartsLeft");

let readyDart = document.getElementById("readyDart");

/* =========================
   TOUCH SWIPE
========================= */

let swipeStartX=0;
let swipeStartY=0;

document.addEventListener("touchstart",(e)=>{

if(document.getElementById("gameArea").style.display!=="block") return;
if(dartsLeft<=0) return;

swipeStartX=e.touches[0].clientX;
swipeStartY=e.touches[0].clientY;

});

document.addEventListener("touchend",(e)=>{

if(document.getElementById("gameArea").style.display!=="block") return;
if(dartsLeft<=0) return;

let dx = e.changedTouches[0].clientX - swipeStartX;
let dy = e.changedTouches[0].clientY - swipeStartY;

let distance = Math.sqrt(dx*dx + dy*dy);

if(distance < 30) return;

throwDart();

});

/* =========================
   MOUSE SUPPORT (LAPTOP)
========================= */

let mouseSwipeStartX = 0;
let mouseSwipeStartY = 0;

document.addEventListener("mousedown",(e)=>{

if(document.getElementById("gameArea").style.display!=="block") return;
if(dartsLeft<=0) return;

mouseSwipeStartX = e.clientX;
mouseSwipeStartY = e.clientY;

});

document.addEventListener("mouseup",(e)=>{

if(document.getElementById("gameArea").style.display!=="block") return;
if(dartsLeft<=0) return;

let dx = e.clientX - mouseSwipeStartX;
let dy = e.clientY - mouseSwipeStartY;

let distance = Math.sqrt(dx*dx + dy*dy);

if(distance < 30) return;

throwDart();

});

/* =========================
   THROW DART (LOGIC SAME)
========================= */
function throwDart(){

let rand=Math.random();

let score=0;
let message="";

let boardSize = board.offsetWidth;

let x=boardSize/2;
let y=boardSize/2;

if(rand<0.45){
score=100;
message="OUCH 😭";
x=boardSize*0.47 + Math.random()*20;
y=boardSize*0.47 + Math.random()*20;
}
else if(rand<0.65){
score=80;
message="I saw that coming 😅";
x=boardSize*0.35 + Math.random()*60;
y=boardSize*0.35 + Math.random()*60;
}
else if(rand<0.80){
score=50;
message="Not bad 😜";
x=boardSize*0.25 + Math.random()*100;
y=boardSize*0.25 + Math.random()*100;
}
else if(rand<0.90){
score=20;
message="You almost got me 😆";
x=40 + Math.random()*(boardSize-80);
y=40 + Math.random()*(boardSize-80);
}
else{
score=0;
message="Target escaped 😂";
x=Math.random()*boardSize;
y=Math.random()*boardSize;
}

animateDartToTarget(x,y,score,message);

}

function animateDartToTarget(x,y,score,message){

let boardRect = board.getBoundingClientRect();

let targetX = boardRect.left + x;
let targetY = boardRect.top + y;

readyDart.style.transition =
"all .35s cubic-bezier(.17,.67,.24,1.22)";

readyDart.style.left = targetX + "px";
readyDart.style.top = targetY + "px";
readyDart.style.bottom = "auto";

readyDart.style.transform =
`translate(-50%,-50%) rotate(${Math.random()*60-30}deg)`;

setTimeout(()=>{

board.animate([
{transform:"scale(1)"},
{transform:"scale(1.03)"},
{transform:"scale(1)"}
],{
duration:150
});

totalScore += score;
dartsLeft--;

scoreSpan.innerText = totalScore;
dartsSpan.innerText = dartsLeft;

reaction.innerText = message;

setTimeout(()=>{

readyDart.style.transition="none";
readyDart.style.left="50%";
readyDart.style.top="auto";
readyDart.style.bottom="40px";
readyDart.style.transform="translateX(-50%)";

},400);

if(dartsLeft===0){
setTimeout(showReport,1500);
}

},350);

}

/* =========================
   REPORT SCREEN
========================= */

function showReport(){

document.getElementById("gameArea").style.display="none";
document.getElementById("revengeReport").style.display="flex";

document.getElementById("finalScoreText").innerHTML =
"Total Damage: " + totalScore;

let painLevel="";

if(totalScore<=150){
painLevel="Pain Level: Minimal 😎";
}
else if(totalScore<=300){
painLevel="Pain Level: Moderate 😬";
}
else{
painLevel="Pain Level: Extremely High 😭";
}

document.getElementById("painLevelText").innerHTML = painLevel;
}
