import * as ma from "./main.js";
setInterval(() => {
  let hf = localStorage.getItem("hf") === "true";
  ma.updatetime(hf);
  alarms(hf);
},1000);
function alarms(hf) {
  const alarms = JSON.parse(localStorage.getItem("alarms")) || [];
  let html = "";

  for (const a of alarms) {
    let h = a.hours;
    let suffix = "";
    if (!hf) {
      if (h === 0) { h = 12; suffix = "AM"; }
      else if (h === 12) suffix = "PM";
      else if (h > 12) { h -= 12; suffix = "PM"; }
      else suffix = "AM";
    }
    html += `
      <div class="jsaddalarm">
        <div class="tm">
          ${String(h).padStart(2,"0")}:${String(a.minutes).padStart(2,"0")}:${String(a.seconds).padStart(2,"0")}
          ${hf ? "" : suffix}
        </div>
        <div class="msg">${a.msg}</div>
      </div>
    `;
  }

  document.getElementById("alarm").innerHTML = html;
}
document.getElementById("addalarm").addEventListener("click",addalarm);
let play = false,start = false,audio = null;
function addalarm()
{
  let alarms = JSON.parse(localStorage.getItem("alarms"));
  if(Array.isArray(alarms) === false) alarms = [];
  let fm = localStorage.getItem("hf") === "true";
  let h = 0,m = 0,s = 0,ap = 0,msg = "--";
  if(fm === false) 
  {
    ap = Number(prompt("Choose\n 1.AM\n 2.PM"));
    h = Number(prompt("Enter hours(1 - 12)"));
    m = Number(prompt("Enter minutes(0 - 59)"));
    s = Number(prompt("Enter seconds(0 - 59)"));
    msg = prompt("Enter a name for the alarm");
  }
  else
  {
    h = Number(prompt("Enter hours(0 - 23)"));
    m = Number(prompt("Enter minutes(0 - 59)"));
    s = Number(prompt("Enter seconds(0 - 59)"));
    msg = prompt("Enter a name for the alarm");
  }
  if((h > 23 || m > 59 || s > 59 || ap > 2 || ap < 0 || h < 0 || m < 0 || s < 0) && (fm === false && ap != 1 && ap != 2)) alert("Invalid time!!");
  else
  {
    let b = " ";
    if(ap === 1) b = "AM";
    else if(ap === 2) b = "PM";
    h = h < 10 ? '0' + h : h;
    m = m < 10 ? '0' + m : m;
    s = s < 10 ? '0' + s : s;
    let a = {
      hours : h,
      minutes : m,
      seconds : s,
      pam : b,
      msg : msg
    };
    alarms.push(a);
    localStorage.setItem("alarms",JSON.stringify(alarms));
    ma.display();
  }
}
setInterval(() => {
  if (play === false || start === true) return;
  let alarms = JSON.parse(localStorage.getItem("alarms")) || [];
  const now = new Date();
  for (let i = 0; i < alarms.length; i++) {
    let h = Number(alarms[i].hours);
    let m = Number(alarms[i].minutes);
    let s = Number(alarms[i].seconds);
    if (alarms[i].pam === "AM" && h === 12) h = 0;
    if (alarms[i].pam === "PM" && h < 12) h += 12;
    if (h === now.getHours() && m === now.getMinutes() && s === now.getSeconds()) {
      audio.play();
      start = true;
      break;
    }
  }
},1000);
document.addEventListener("click",() => {
  if(play === false)
  {
    audio = new Audio("lkkbgm.mp3");
    play = true;
    audio.loop = true;
  }
});
document.getElementById("stp").addEventListener("click",() => {
  if(play === true)
  {
    start = false;
    audio.pause();
  }
});
document.getElementById("refresh").addEventListener("click", () => {
  localStorage.removeItem("alarms");
});
document.getElementById('hom').addEventListener('click', () => {
  window.open('index.html','_self');
});