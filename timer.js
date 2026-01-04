import * as ma from "./main.js";
setInterval(() => {
  let hf = localStorage.getItem("hf") === "true";
  ma.updatetime(hf);
},1000);
let h = 0,m = 0,s = 0,start = false,playing = false,int,audio = null;
document.getElementById("set").addEventListener("click",settimer);
document.getElementById("stp").addEventListener("click",stoptimer);
function stoptimer()
{
  if(playing === true)
  {
    playing = false;
    start = false;
    audio.pause();
  }
}
function display() 
{
  document.getElementById('hry').innerHTML = h;
  document.getElementById('miy').innerHTML = m;
  document.getElementById('scy').innerHTML = s;
}
function settimer()
{
  if(start === false)
  {
    h = Number(prompt("Enter the hours"));
    m = Number(prompt("Enter the minutes"));
    s = Number(prompt("Enter the seconds"));
    if(h >= 0 && m >= 0 && s >= 0)
    {
      display();
      start = true;
      int = setInterval(() => {
        s-=1;
        if(s <= 0 && m > 0)
        {
          m-=1;
          if(m <= 0 && h > 0)
          {
            h-=1;
          }
        }
        display();
        if(h === 0 && m === 0 && s === 0)
        {
          play();
        }
      },1000);
    }
    else alert("Entered wrong parameters");
  }
}
function play()
{
  if(playing === false)
  {
    clearInterval(int);
    audio = new Audio("lkkbgm.mp3");
    playing = true;
    audio.loop = true;
    audio.play();
  }
}
document.getElementById('hom').addEventListener('click', () => {
  window.open('index.html','_self');
});