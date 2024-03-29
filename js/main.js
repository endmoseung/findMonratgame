const button = document.querySelector("button");
const play = document.querySelector(".play");
const timer = document.querySelector(".timer");
const monRat = document.querySelector(".monrat");
const bug = document.querySelector(".bug");
const carrotLeft = document.querySelector(".carrot-left");
const lose = document.querySelector(".lose");
const win = document.querySelector(".win");
const reset = document.querySelectorAll(".reset");
const gameBox = document.querySelector(".gamebox");
const stopBtn = document.querySelector(".stop");
const replay = document.querySelector(".replay");
const paintBox = document.querySelector(".paintbox");

function preventClickStopPb () {
  paintBox.style.pointerEvents = "none";
  stopBtn.style.pointerEvents = "none";
}
function preventCanStopPb () {
  paintBox.style.pointerEvents = "all";
  stopBtn.style.pointerEvents = "all";
}

let audioFileBc = new Audio('carrot/sound/bg.mp3');
let audioFileBug = new Audio('carrot/sound/샤우팅.m4a');
let audioFileMonRat = new Audio('carrot/sound/괴물쥐.m4a');
let audioFileWin = new Audio('carrot/sound/game_win.mp3');

function carrotPainting(){
  for (var i = 0; i < 10; i++) {
    let bottom = Math.random();
    bottom=bottom*200;
    let left = Math.random();
    left = left *700;
    const paintImg = document.createElement("img");
    paintImg.src = "carrot/img/괴물쥐.jpeg";
    paintImg.setAttribute('class',"monrat")
    paintImg.style.bottom = bottom+'px';
    paintImg.style.left = left+'px';
    paintBox.appendChild(paintImg);
    paintImg.addEventListener("click",(event)=>{
      event.target.remove();
      audioFileMonRat.play();
      audioFileMonRat.currentTime = 0;
      if(carrotLeft.innerText === '1'){
        carrotLeft.innerText = 0;
        audioFileBc.pause();
        preventClickStopPb();
        win.classList.toggle("active");
        clearInterval(timerInterval);
        audioFileWin.play();
        return;
      }
      carrotLeft.innerText = carrotLeft.innerText - 1;
    })
  }
}
function bugPainting(){
  for (var i = 0; i < 7; i++) {
    let bottom = Math.random();
    bottom=bottom*250;
    let left = Math.random();
    left = left *700;
    const paintImg = document.createElement("img");
    paintImg.src = "carrot/img/bug.png";
    paintImg.setAttribute('class',"bug")
    paintImg.style.bottom = bottom+'px';
    paintImg.style.left = left+'px';
    paintBox.appendChild(paintImg);
    paintImg.addEventListener("click",()=>{
      audioFileBug.play();
      //화면이 나오면서 졌다고
      lose.classList.toggle("active");
      preventClickStopPb();
      audioFileBc.pause();
      clearInterval(timerInterval);
    })
  }
}


function paintGames(){
  carrotPainting();
  bugPainting();
}



play.addEventListener("click",()=>{
  paintGames();
  play.classList.toggle("hidden");
  stopBtn.classList.add("active");
  audioFileBc.play();
  carrotLeft.innerText = 10;
  let currentSecond = 10;
  timer.innerText = `0:${currentSecond}`
  timerInterval = setInterval(clocks,1000);
  timerInterval;
  function clocks(){
    if(currentSecond===0){
      lose.classList.add("active");
      audioFileBc.pause();
      audioFileBug.play();
      preventClickStopPb();
      clearInterval(timerInterval);
      return;
    }
    currentSecond = currentSecond-1;
    timer.innerText = `0:${currentSecond}`

  }})

stopBtn.addEventListener("click",()=>{
  clearInterval(timerInterval);// 지역변수 안에 있는 timerinterval을 어케끄지 ?
  audioFileBc.pause();
  replay.classList.toggle("active");
  preventClickStopPb();
})

for (let i = 0; i < reset.length; i++){
  reset[i].addEventListener("click",(event)=>{
    paintBox.innerHTML = "";
    if(event.target.parentNode !== button){
      event.target.parentNode.parentNode.classList.toggle("active");
    }
    event.target.parentNode.classList.remove("active");
    
    paintGames();
    audioFileBc.play();
    carrotLeft.innerText = 10;
    let currentSecond = 10;
    preventCanStopPb();
    timer.innerText = `0:${currentSecond}`
    timerInterval = setInterval(clocks,1000);
    timerInterval;
    function clocks(){
      if(currentSecond===0){
        lose.classList.add("active");
        audioFileBc.pause();
        audioFileBug.play();
        preventClickStopPb();
        clearInterval(timerInterval);  //setinterval이 계속 적용되서 0초가 지난후에도 적용이되므로 clearinterval을 통해 막아주기
        return;
      }
      currentSecond = currentSecond-1;
      timer.innerText = `0:${currentSecond}`;
    }
    play.classList.add("hidden");
  }
  )
}