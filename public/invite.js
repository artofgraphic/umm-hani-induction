(function(){
document.documentElement.classList.add("js");
var els=document.querySelectorAll(".hero .col > *,.vert,.line,.msg p,.pledge,.when div,.thanks h2,.thanks p,.wishes h2,.wishes input,.wishes textarea,#go,.priv,footer");
els.forEach(function(e){e.classList.add("rv");var i=Array.prototype.indexOf.call(e.parentNode.children,e);e.style.transitionDelay=(e.closest(".msg,.when,.hero")?i*120:0)+"ms"});
if("IntersectionObserver" in window){var io=new IntersectionObserver(function(es){es.forEach(function(x){if(x.isIntersecting){x.target.classList.add("in");io.unobserve(x.target)}})},{threshold:.12});els.forEach(function(e){io.observe(e)})}else els.forEach(function(e){e.classList.add("in")});
function burst(n){var c=["#ff4d6d","#ffb703","#06d6a0","#118ab2","#a88be0","#ff7b00","#f72585","#4cc9f0","#ffd166","#7d56c9"];
for(var i=0;i<n;i++){var e=document.createElement("i");e.className="confetti";e.style.left=Math.random()*100+"vw";e.style.background=c[i%c.length];if(i%3==0){e.style.borderRadius="100% 0 100% 0";e.style.width="12px";e.style.height="12px"}
document.body.appendChild(e);e.animate([{transform:"translateY(0) rotate(0deg)",opacity:1},{transform:"translateY("+(window.innerHeight+40)+"px) rotate("+(360+Math.random()*720)+"deg)",opacity:.85}],{duration:2000+Math.random()*2500,delay:Math.random()*600,easing:"linear",fill:"forwards"});setTimeout(function(x){x.remove()},5500,e)}}
var AC=null,played=false,tapT0=Date.now();
document.getElementById("replay").addEventListener("click",function(){played=true;together()});
function hideTap(){var t=document.getElementById("tap");if(t)setTimeout(function(){t.classList.add("gone")},Math.max(0,7000-(Date.now()-tapT0)))}
function sound(){hideTap();try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state!=="running")AC.resume();var t0=AC.currentTime+.03,sr=AC.sampleRate,master=AC.createGain();master.gain.value=.55;master.connect(AC.destination);
var len=Math.floor(sr*.09),buf=AC.createBuffer(1,len,sr),d=buf.getChannelData(0);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,3);
for(var k=0;k<190;k++){var rel=Math.random()*4.2,env=rel<3.2?1:Math.max(0,1-(rel-3.2)/1),src=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();src.buffer=buf;src.playbackRate.value=.8+Math.random()*.9;f.type="bandpass";f.frequency.value=1700+Math.random()*3200;f.Q.value=1.1;g.gain.value=(.55+Math.random()*.45)*env;src.connect(f);f.connect(g);g.connect(master);src.start(t0+rel)}
var plen=Math.floor(sr*.3),pb=AC.createBuffer(1,plen,sr),pd=pb.getChannelData(0);for(var j=0;j<plen;j++)pd[j]=(Math.random()*2-1)*Math.pow(1-j/plen,3);
[0,.1,.22].forEach(function(dl){var ps=AC.createBufferSource(),pf=AC.createBiquadFilter(),pg=AC.createGain();ps.buffer=pb;pf.type="lowpass";pf.frequency.value=3200;pg.gain.value=1.8;ps.connect(pf);pf.connect(pg);pg.connect(master);ps.start(t0+dl)})}catch(e){}}
function together(){try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state!=="running")AC.resume();sound();burst(14)}catch(e){burst(14)}}
var wall=document.getElementById("wall"),note=document.getElementById("note");
var wishes=[],sb=window.__sb;
function show(){wall.innerHTML="";wishes.forEach(function(x){var w=document.createElement("div"),p=document.createElement("p"),s=document.createElement("small");w.className="w";p.textContent=x.text;s.textContent="With love, "+x.name;w.appendChild(p);w.appendChild(s);wall.appendChild(w)})}
function load(){sb.from("wishes").select("name,text").order("created_at",{ascending:false}).limit(500).then(function(r){if(r.error)return;wishes=r.data;note.textContent=wishes.length?wishes.length+" wish"+(wishes.length>1?"es":"")+" so far.":"";show()})}
show();load();
sb.channel("wishes").on("postgres_changes",{event:"INSERT",schema:"public",table:"wishes"},load).subscribe();
var btn=document.getElementById("go");
btn.addEventListener("click",function(){var n=document.getElementById("from").value.trim()||"A friend",tx=document.getElementById("text"),t=tx.value.trim();if(!t){note.textContent="Write a message first.";return}btn.disabled=true;
sb.from("wishes").insert({name:n.slice(0,60),text:t.slice(0,500)}).then(function(r){btn.disabled=false;if(r.error){note.textContent="Could not post your wish. Try again.";return}tx.value="";load();note.textContent="Thank you for your wish! 🤍";together()})});
var lastTap=0;function once(ev){var t=ev&&ev.target;if(t&&t.closest&&t.closest("input,textarea,select,button,a,label,#replay"))return;if(ev&&ev.type==="keydown"&&ev.key!=="Enter"&&ev.key!==" ")return;var now=Date.now();if(now-lastTap<1500)return;lastTap=now;played=true;together()}
var showering=false,stim=null;
function shower(force){if(showering&&!force)return;clearInterval(stim);showering=true;var k=0;function tick(){burst(k===0?20:5);if(++k>3){clearInterval(stim);showering=false}}tick();stim=setInterval(tick,500)}
shower();
["touchend","click","keydown"].forEach(function(n){window.addEventListener(n,once,{passive:true})})
})();
