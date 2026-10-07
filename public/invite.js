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
function sound(){hideTap();try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state!=="running")AC.resume();var t0=AC.currentTime+.03,sr=AC.sampleRate,master=AC.createGain();master.gain.value=.6;master.connect(AC.destination);
var plen=Math.floor(sr*.45),pb=AC.createBuffer(1,plen,sr),pd=pb.getChannelData(0);for(var j=0;j<plen;j++)pd[j]=(Math.random()*2-1)*Math.pow(1-j/plen,3);
var ps=AC.createBufferSource(),pf=AC.createBiquadFilter(),pg=AC.createGain();ps.buffer=pb;pf.type="lowpass";pf.frequency.setValueAtTime(3500,t0);pf.frequency.exponentialRampToValueAtTime(400,t0+.3);pg.gain.setValueAtTime(1,t0);pg.gain.exponentialRampToValueAtTime(.001,t0+.45);ps.connect(pf);pf.connect(pg);pg.connect(master);ps.start(t0);
var blen=Math.floor(sr*.06),bb=AC.createBuffer(1,blen,sr),bd=bb.getChannelData(0);for(var i=0;i<blen;i++)bd[i]=(Math.random()*2-1)*Math.pow(1-i/blen,2);
var bs=AC.createBufferSource(),bf=AC.createBiquadFilter(),bg=AC.createGain();bs.buffer=bb;bf.type="highpass";bf.frequency.value=1500;bg.gain.setValueAtTime(.9,t0);bg.gain.exponentialRampToValueAtTime(.001,t0+.06);bs.connect(bf);bf.connect(bg);bg.connect(master);bs.start(t0);
var o=AC.createOscillator(),og=AC.createGain();o.type="sine";o.frequency.setValueAtTime(160,t0);o.frequency.exponentialRampToValueAtTime(50,t0+.15);og.gain.setValueAtTime(.7,t0);og.gain.exponentialRampToValueAtTime(.001,t0+.18);o.connect(og);og.connect(master);o.start(t0);o.stop(t0+.2);
for(var c=0;c<10;c++){var rel=.08+Math.random()*.5,cl=Math.floor(sr*.03),cb=AC.createBuffer(1,cl,sr),cd=cb.getChannelData(0);for(var m=0;m<cl;m++)cd[m]=(Math.random()*2-1)*(1-m/cl);var cs=AC.createBufferSource(),cf=AC.createBiquadFilter(),cg=AC.createGain();cs.buffer=cb;cf.type="highpass";cf.frequency.value=2000;cg.gain.setValueAtTime(.25+Math.random()*.3,t0+rel);cg.gain.exponentialRampToValueAtTime(.001,t0+rel+.03);cs.connect(cf);cf.connect(cg);cg.connect(master);cs.start(t0+rel)}}catch(e){}}
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
