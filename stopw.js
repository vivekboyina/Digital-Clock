import * as ma from "./main.js";
setInterval(() => {
  let hf = localStorage.getItem("hf") === "true";
  ma.updatetime(hf);
}, 1000);
let start = false, h = 0, m = 0, s = 0, int;
function display() {
  document.getElementById('hry').textContent = h;
  document.getElementById('miy').textContent = m;
  document.getElementById('scy').textContent = s;
}
function startsw() {
  if(start) return;
  start = true;
  int = setInterval(() => {
    s++;
    if (s >= 60) {
      s = 0;
      m++;
      if (m >= 60) {
        m = 0;
        h++;
      }
    }
    display();
  }, 1000);
}
document.getElementById("start").addEventListener("click", startsw);
document.getElementById("stop").addEventListener("click", stopsw);
document.getElementById("reset").addEventListener("click", reset);
function stopsw() {
  if (!start) return;

  start = false;
  clearInterval(int);
  display();
}
function reset()
{
  clearInterval(int)
  start = false;
  h = 0;
  m = 0;
  s = 0;
  display();
}
document.getElementById('hom').addEventListener('click', () => {
  window.open('index.html','_self');
});