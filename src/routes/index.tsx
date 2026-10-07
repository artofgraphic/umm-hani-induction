import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const title = "Olurode Ummhani Gbekeloluwa | My Induction & Oath-Taking Ceremony";
const desc = "Alhamdulillah, I'm officially a nurse! Join my induction and oath-taking ceremony at Fountain University, Osogbo — 7th October 2026, 10am.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: desc },
      { property: "og:title", content: title },
      { property: "og:description", content: desc },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Shippori+Mincho:wght@500;700&family=Zen+Kaku+Gothic+New:wght@400;500&display=swap" },
      { rel: "stylesheet", href: "/invite.css" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    if ((window as any).__inviteLoaded) return;
    (window as any).__inviteLoaded = true;
    (window as any).__sb = supabase;
    const s = document.createElement("script");
    s.src = "/invite.js";
    document.body.appendChild(s);
  }, []);
  return (
    <>
      <main>
        <button id="replay" type="button" aria-label="Play the celebration sound">🔊 Tap for sound · <span lang="ja">タップして音を</span></button>
        <header className="hero">
          <div className="col">
            <p className="k">My Induction &amp; Oath-Taking Ceremony</p>
            <h1>Alhamdulillah, I’m officially a nurse!</h1>
            <p className="name">Olurode Ummhani Gbekeloluwa</p>
            <p className="cred">RN, RM, BNSc</p>
          </div>
          <div className="vert" lang="ja" aria-hidden="true">おめでとうございます</div>
        </header>
        <hr className="line" />
        <span className="tab" lang="ja">ごあいさつ<small>Hello</small></span>
        <section className="msg">
          <p>Today marks a very special moment in my life. After years of studying, sacrifices, late nights, challenges and countless prayers, I am finally taking my oath and officially stepping into the nursing profession.</p>
          <p>I’m grateful to Allah for bringing me this far, and to everyone who supported me along the way. My family, friends, lecturers and everyone who encouraged me, thank you. ❤️</p>
          <p>As I begin this new chapter as a nurse and midwife, I pray for the wisdom, compassion and strength to care for others and make a meaningful difference in their lives.</p>
          <p>I would love to have you celebrate this special day with me.</p>
        </section>
        <section className="pledge">
          <span className="jp" lang="ja" aria-hidden="true">誓い</span>
          <div><h2>The oath I carry</h2><p>Today, I promise to care for others with compassion, dignity and dedication. I pray that I never forget why I chose this profession and that I always remember to care for myself too.</p></div>
        </section>
        <section className="when">
          <div><b><span lang="ja">場所</span><small>Where</small></b><span>New Auditorium, Fountain University, Osogbo</span></div>
          <div><b><span lang="ja">日時</span><small>When</small></b><span>Wednesday, 7th October 2026</span></div>
          <div><b><span lang="ja">時間</span><small>Time</small></b><span>10am prompt</span></div>
        </section>
        <hr className="line" />
        <span className="tab" lang="ja">感謝<small>Thank you</small></span>
        <section className="thanks">
          <h2>Thank you for being part of this day</h2>
          <p>Alhamdulillah, the day has come and my heart is full. I took my oath as a nurse and a midwife, and I know I did not reach that moment alone.</p>
          <p>To my family, who prayed for me and carried me through the late nights and the difficult ones — thank you. To my friends, my lecturers and everyone who encouraged me when I doubted myself — thank you. Your kindness made the hard days easier and this day so much sweeter. ❤️</p>
          <p>Please keep me in your prayers as I begin this new chapter. I pray Allah blesses you abundantly for every kindness shown to me. Ameen.</p>
          <p>If you would like to leave a word for me, the wish wall below is open — I read every single message.</p>
          <div className="sig"><span className="stamp" lang="ja" aria-hidden="true">謝</span></div>
        </section>
        <hr className="line" />
        <section className="wishes">
          <span className="tab" lang="ja">寄せ書き<small>Messages</small></span>
          <h2>Leave me a wish</h2>
          <p style={{ color: "var(--muted)", margin: "0 0 16px" }}>Your prayers, congratulations and kind words would mean so much to me as I begin this new journey.</p>
          <input id="from" placeholder="Your name" aria-label="Your name" />
          <textarea id="text" placeholder="Write a message for me" aria-label="Your message" />
          <button id="go" type="button">Post my wish</button>
          <p id="note"></p>
          <p className="priv">Prefer to message me privately? <a href="https://wa.me/2349014581927">WhatsApp +234 901 458 1927</a> or <a href="tel:+2349014581927">call</a>.</p>
          <div id="wall" aria-live="polite"></div>
        </section>
        <footer>With love and gratitude.</footer>
      </main>
      <div id="tap" role="status"><i aria-hidden="true"></i><div><span className="en">Tap anywhere to hear the celebration</span><span className="jp2" lang="ja">画面をタップして、祝福の音を</span></div></div>
    </>
  );
}
