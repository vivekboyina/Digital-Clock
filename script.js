import * as ma from "./main.js"
const a = document.getElementById("formattime");
if(localStorage.getItem("hf") === null) localStorage.setItem("hf","true");
a.addEventListener("click",() =>{
  let hf = localStorage.getItem("hf") === "true";
  hf = !hf;
  localStorage.setItem("hf",hf.toString());
  a.textContent = hf ? "12-hour" : "24-hour";
});
setInterval(() => {
  let hf = localStorage.getItem("hf") === "true";
  ma.updatetime(hf);
},1000);
document.getElementById('hom').addEventListener('click', () => {
  window.open('index.html','_self');
});