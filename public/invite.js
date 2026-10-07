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
function cheerJP(){try{var ss=window.speechSynthesis;if(!ss)return;ss.cancel();["おめでとう！","おめでとうございます！","ばんざーい！ ばんざーい！"].forEach(function(t,i){var u=new SpeechSynthesisUtterance(t);u.lang="ja-JP";u.pitch=1.5;u.rate=i===2?.95:1.1;var vs=ss.getVoices();for(var k=0;k<vs.length;k++){if(vs[k].lang&&vs[k].lang.toLowerCase().indexOf("ja")===0){u.voice=vs[k];break}}ss.speak(u)})}catch(e){}}
function sound(){hideTap();cheerJP();try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state!=="running")AC.resume();var t0=AC.currentTime+.03,sr=AC.sampleRate,master=AC.createGain();master.gain.value=.6;master.connect(AC.destination);
var len=Math.floor(sr*.12),buf=AC.createBuffer(1,len,sr),d=buf.getChannelData(0);for(var i=0;i<len;i++)d[i]=(Math.random()*2-1)*Math.pow(1-i/len,2);
for(var k=0;k<170;k++){var rel=Math.random()*4.5,env=rel<3.4?1:Math.max(0,1-(rel-3.4)/1.1),src=AC.createBufferSource(),f=AC.createBiquadFilter(),g=AC.createGain();src.buffer=buf;src.playbackRate.value=.7+Math.random()*.8;f.type="bandpass";f.frequency.value=1200+Math.random()*3000;f.Q.value=.7;g.gain.value=(.3+Math.random()*.5)*env;src.connect(f);f.connect(g);g.connect(master);src.start(t0+rel)}
var plen=Math.floor(sr*.35),pb=AC.createBuffer(1,plen,sr),pd=pb.getChannelData(0);for(var j=0;j<plen;j++)pd[j]=(Math.random()*2-1)*Math.pow(1-j/plen,3);
[0,.1,.22].forEach(function(dl){var ps=AC.createBufferSource(),pf=AC.createBiquadFilter(),pg=AC.createGain();ps.buffer=pb;pf.type="lowpass";pf.frequency.value=2600;pg.gain.value=1.4;ps.connect(pf);pf.connect(pg);pg.connect(master);ps.start(t0+dl)});
for(var v=0;v<4;v++){var st=t0+.05+v*.4,base=380+Math.random()*250,o=AC.createOscillator(),lfo=AC.createOscillator(),lg=AC.createGain(),f1=AC.createBiquadFilter(),g2=AC.createGain();o.type="sawtooth";o.frequency.setValueAtTime(base,st);o.frequency.exponentialRampToValueAtTime(base*1.9,st+.35);o.frequency.exponentialRampToValueAtTime(base*1.5,st+.9);lfo.frequency.value=7;lg.gain.value=14;lfo.connect(lg);lg.connect(o.frequency);f1.type="bandpass";f1.frequency.value=900;f1.Q.value=2;g2.gain.setValueAtTime(.0001,st);g2.gain.exponentialRampToValueAtTime(.14,st+.06);g2.gain.exponentialRampToValueAtTime(.0001,st+1);o.connect(f1);f1.connect(g2);g2.connect(master);o.start(st);lfo.start(st);o.stop(st+1.05);lfo.stop(st+1.05)}}catch(e){}}
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
