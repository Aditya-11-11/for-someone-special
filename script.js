function showBirthday(){

flashScreen();

setTimeout(() => {

document.getElementById("page1")
.style.display = "none";

document.getElementById("page2")
.style.display = "block";

animateBirthday();

},200);

}

/* FLASH EFFECT */

function flashScreen(){

let flash =
document.createElement("div");

flash.classList.add("flash");

document.body.appendChild(flash);

setTimeout(() => {

flash.remove();

},400);

}

/* MAIN ANIMATION */

function animateBirthday(){

let title =
document.getElementById("birthdayText");

title.animate(
[
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
],
{
duration:1200,
fill:"forwards"
}
);

/* CONFETTI BURSTS */

createConfetti();

setTimeout(() => {

createConfetti();

},1000);

setTimeout(() => {

createConfetti();

},2000);

/* TEDDY IMAGE */

setTimeout(() => {

let teddy =
document.getElementById("teddyImage");

teddy.animate(
[
{
opacity:0,
transform:"translateY(40px)"
},
{
opacity:1,
transform:"translateY(0)"
}
],
{
duration:1000,
fill:"forwards"
}
);

},1200);

/* QUESTION */

setTimeout(() => {

let question =
document.getElementById("questionSection");

question.animate(
[
{
opacity:0,
transform:"translateY(20px)"
},
{
opacity:1,
transform:"translateY(0)"
}
],
{
duration:800,
fill:"forwards"
}
);

},2200);

}

/* PROFESSIONAL CONFETTI BURST */

function createConfetti(){

for(let i=0;i<180;i++){

let confetti =
document.createElement("div");

confetti.style.position = "fixed";

confetti.style.width = "10px";

confetti.style.height = "10px";

confetti.style.borderRadius = "2px";

confetti.style.background =
`hsl(${Math.random()*360},100%,50%)`;

confetti.style.left =
(window.innerWidth/2)+"px";

confetti.style.top =
(window.innerHeight/2)+"px";

confetti.style.zIndex = "9999";

document.body.appendChild(confetti);

let x =
(Math.random()-0.5)*1400;

let y =
(Math.random()-0.5)*1200;

let rotation =
Math.random()*1080;

confetti.animate(
[
{
transform:
`translate(0px,0px)
rotate(0deg)`,

opacity:1
},

{
transform:
`translate(${x}px,${y}px)
rotate(${rotation}deg)`,

opacity:1,
offset:0.6
},

{
transform:
`translate(${x}px,
${y+700}px)
rotate(${rotation+720}deg)`,

opacity:0
}
],
{
duration:4000,
easing:"cubic-bezier(.15,.8,.25,1)"
}
);

setTimeout(() => {

confetti.remove();

},4000);

}

}

/* NO BUTTON */

const noBtn =
document.getElementById("noBtn");

function moveNoButton(){

const rect =
noBtn.getBoundingClientRect();

let currentX = rect.left;
let currentY = rect.top;

/* SHORT MOVEMENT */

let moveX =
(Math.random() * 160) - 80;

let moveY =
(Math.random() * 120) - 60;

let newX =
currentX + moveX;

let newY =
currentY + moveY;

/* KEEP INSIDE SCREEN */

newX =
Math.max(
10,
Math.min(
window.innerWidth - 120,
newX
)
);

newY =
Math.max(
10,
Math.min(
window.innerHeight - 80,
newY
)
);

noBtn.style.position = "fixed";

noBtn.style.left = newX + "px";

noBtn.style.top = newY + "px";

}

/* MOBILE TAP */

noBtn.addEventListener(
"touchstart",
function(e){

e.preventDefault();

moveNoButton();

}
);

/* DESKTOP */

noBtn.addEventListener(
"mouseover",
moveNoButton
);

/* EXTRA SAFETY */

noBtn.addEventListener(
"click",
function(e){

e.preventDefault();

moveNoButton();

}
);
