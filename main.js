export function updatetime(hf)
{
  const dt = new Date();
  let h = dt.getHours(),m = dt.getMinutes(),s = dt.getSeconds();
  const apm = document.getElementById("apm");
  if(hf === false)
  {
    let k = "AM";
    if(h === 0) h = 12;
    else if(h === 12) k = "PM";
    else if(h > 12) 
    {
      h = h % 12;
      k = "PM";
    }
    apm.textContent = k;
    apm.classList.add("apm");
  }
  else{
    apm.textContent = "";
    apm.classList.remove("apm");
  }
  h = h < 10 ? '0' + h : h; 
  m = m < 10 ? '0' + m : m;
  s = s < 10 ? '0' + s : s;
  document.getElementById('hr').innerHTML = h;
  document.getElementById('mi').innerHTML = m;
  document.getElementById('sc').innerHTML = s;
}
export function display()
{
  let ala = JSON.parse(localStorage.getItem("alarms")) || [];
  let html = ``;
  for(let i = 0; i < ala.length; i++)
  {
    if(ala[i].pam === " ")
    {
      html+=`
        <div class="jsaddalarm">
          <div class="tm">${ala[i].hours}:${ala[i].minutes}:${ala[i].seconds}</div>
          <div class="msg">${ala[i].msg}</div>
          <div><button class="dbtn">-</button></div>
        </div>
      `
    }
    else
    {
      console.log(ala[i].pam);
      html+=`
        <div class="jsaddalarm">
          <div class="tm">${ala[i].hours}:${ala[i].minutes}:${ala[i].seconds} ${ala[i].pam}</div>
          <div class="msg">${ala[i].msg}</div>
          <div><button class="dbtn">-</button></div>
        </div>
      `
    }
  }
  document.getElementById("alarm").innerHTML = html;
}