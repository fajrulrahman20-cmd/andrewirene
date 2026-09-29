const loader=document.querySelector(".loader");
window.addEventListener("load",()=>setTimeout(()=>loader.classList.add("hide"),900));

const name="Irene";
let ti=0,del=false;
function typeName(){
 const el=document.getElementById("typing");
 if(!del){el.textContent=name.slice(0,ti++);if(ti>name.length){del=true;setTimeout(typeName,1600);return}}
 else{el.textContent=name.slice(0,--ti);if(ti===0){del=false}}
 setTimeout(typeName,del?90:160);
} typeName();

const start=document.getElementById("start");
start.onclick=()=>{document.querySelector(".intro").scrollIntoView({behavior:"smooth"});burst();playMusic()};

const target=new Date(new Date().getFullYear()+1,8,30,0,0,0);
function countdown(){
 let d=Math.max(0,target-new Date()),day=Math.floor(d/86400000);d%=86400000;
 let h=Math.floor(d/3600000);d%=3600000;let m=Math.floor(d/60000);let s=Math.floor(d/1000)%60;
 document.getElementById("days").textContent=String(day).padStart(2,"0");
 document.getElementById("hours").textContent=String(h).padStart(2,"0");
 document.getElementById("mins").textContent=String(m).padStart(2,"0");
 document.getElementById("secs").textContent=String(s).padStart(2,"0");
} countdown();setInterval(countdown,1000);

const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")}),{threshold:.13});
document.querySelectorAll(".reveal").forEach(x=>observer.observe(x));

document.getElementById("openSecret").onclick=()=>{
 document.getElementById("secret").classList.add("show");burst();
 document.getElementById("openSecret").textContent="Pesan sudah terbuka ❤️";
};

const music=document.getElementById("music");
const musicBtn=document.getElementById("musicBtn");
const musicLabel=document.getElementById("musicLabel");
function setMusicUI(playing){
  musicBtn.textContent=playing?"❚❚":"♫";
  musicBtn.classList.toggle("playing",playing);
  musicLabel.textContent=playing?"Musik sedang bermain ♥":"Putar lagu romantis";
}
function playMusic(){
  music.play().then(()=>setMusicUI(true)).catch(()=>{
    setMusicUI(false);
    musicLabel.textContent="Tekan tombol ♫ untuk memutar";
  });
}
musicBtn.onclick=()=>{
  if(music.paused){playMusic()}else{music.pause();setMusicUI(false)}
};
music.addEventListener("play",()=>setMusicUI(true));
music.addEventListener("pause",()=>setMusicUI(false));

setInterval(()=>{
 const p=document.createElement("div");p.className="particle";p.textContent=["♡","✦","♥","·"][Math.floor(Math.random()*4)];
 p.style.left=Math.random()*100+"vw";p.style.bottom="-20px";p.style.fontSize=10+Math.random()*20+"px";
 p.style.animationDuration=6+Math.random()*7+"s";document.body.appendChild(p);setTimeout(()=>p.remove(),14000);
},650);

function burst(){
 const c=document.getElementById("confetti"),ctx=c.getContext("2d");c.width=innerWidth;c.height=innerHeight;
 const a=Array.from({length:150},()=>({x:innerWidth/2,y:innerHeight*.35,vx:(Math.random()-.5)*14,vy:-3-Math.random()*11,g:.25+Math.random()*.2,s:3+Math.random()*7,l:100+Math.random()*80,r:Math.random()*6}));
 function f(){ctx.clearRect(0,0,c.width,c.height);let alive=false;a.forEach(p=>{p.x+=p.vx;p.y+=p.vy;p.vy+=p.g;p.r+=.12;p.l--;if(p.l>0)alive=true;ctx.save();ctx.translate(p.x,p.y);ctx.rotate(p.r);ctx.fillStyle=["#d46f87","#e6b86f","#fff","#b95d73","#f1d4d9"][Math.floor(Math.random()*5)];ctx.fillRect(-p.s/2,-p.s/2,p.s,p.s);ctx.restore()});if(alive)requestAnimationFrame(f);else ctx.clearRect(0,0,c.width,c.height)}f();
}
