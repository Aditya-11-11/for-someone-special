
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

let msg = document.getElementById("nextMsg");
msg.style.opacity = 1;

document.addEventListener("click",goToCake,{once:true});

},1500); // ⭐ 1.5 sec delay AFTER SPECIAL appears

}

});

});

function goToCake(){

document.getElementById("page3").style.display="none";
document.getElementById("page4").style.display="block";

let audio = document.getElementById("bgMusic");
if(audio){
audio.play().catch(()=>{});
}

}


/* =========================
   PAGE 4 - FULL FLOW
========================= */

let cake =
document.getElementById("cakeImg");

let text =
document.getElementById("cakeText");

let audio =
document.getElementById("bgMusic");

let video =
document.getElementById("guestVideo");

/*

STATE 0
Cake ON

STATE 1
Door

STATE 2
Video running

STATE 3
Video ended waiting tap

STATE 4
Cake ON again

STATE 5
Cake OFF waiting swipe

STATE 6
Cake cut

*/

let page4State = 0;

/* START MUSIC WHEN PAGE OPENS */

function startCakeCeremony(){

audio.currentTime = 0;

audio.play().catch(()=>{});

}

/* CLICK HANDLER */

document.getElementById("page4")
.addEventListener("click",function(){

/* STEP 1 -> DOOR */

if(page4State === 0){

audio.pause();

cake.src = "images/door.png";

text.innerHTML =
"Hey, look who's here to celebrate your birthday 🥳<br><br>Tap to open the door";

page4State = 1;

return;

}

/* STEP 2 -> VIDEO */

if(page4State === 1){

cake.style.display = "none";

video.style.display = "block";

video.play();

text.innerHTML = "";

page4State = 2;

return;

}

/* STEP 4 -> BACK TO CAKE */

if(page4State === 3){

video.style.display = "none";

cake.style.display = "block";

cake.src =
"images/cake-candles-on.png";

text.innerHTML =
"Make a wish ❤️<br>Tap to blow the candles";

audio.currentTime = 0;

audio.play().catch(()=>{});

page4State = 4;

return;

}

});

/* VIDEO ENDED */

video.addEventListener("ended",()=>{

text.innerHTML =
"I hope you like our guest 😉<br><br>Now shall we go to the cake cutting ceremony?<br><br>Tap to continue";

page4State = 3;

});

/* CAKE TAP */

cake.addEventListener("click",(e)=>{

e.stopPropagation();

if(page4State !== 4) return;

cake.src =
"images/cake-candles-off.png";

text.innerHTML =
"Swipe to cut the cake 🎂";

page4State = 5;

});

/* SWIPE */

let startX = 0;
let startY = 0;

cake.addEventListener("touchstart",(e)=>{

if(page4State !== 5) return;

startX =
e.touches[0].clientX;

startY =
e.touches[0].clientY;

});

cake.addEventListener("touchend",(e)=>{

if(page4State !== 5) return;

let endX =
e.changedTouches[0].clientX;

let endY =
e.changedTouches[0].clientY;

let distance = Math.sqrt(
Math.pow(endX-startX,2)+
Math.pow(endY-startY,2)
);

if(distance > 30){

cake.src =
"images/cake-cut.png";

text.innerHTML =
"Perfect! ❤️";

page4State = 6;

/* WAIT 1.5 SEC */

setTimeout(()=>{

let cakeVideo =
document.getElementById("cakeCutVideo");

/* hide cake image */

cake.style.display = "none";

/* show video */

cakeVideo.style.display = "block";

cakeVideo.style.opacity = "0";

/* fade in */

setTimeout(()=>{

cakeVideo.style.transition =
"opacity 1s ease";

cakeVideo.style.opacity = "1";

cakeVideo.play();

},50);

},1500);

}

});
