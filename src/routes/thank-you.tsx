import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

const title = "Thank You — Olurode Ummhani Gbekeloluwa, RN, RM, BNSc";
const desc = "Alhamdulillah, the day has come and gone. Thank you to everyone who attended, sent a wish, or supported me through my induction and oath-taking as a nurse and midwife.";

export const Route = createFileRoute("/thank-you")({
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
  component: ThankYou,
});

function ThankYou() {
  useEffect(() => {
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
            <p className="k">In gratitude · Induction &amp; Oath-Taking · 7th October 2026</p>
            <h1>Alhamdulillah, I did it — thank you!</h1>
            <p className="name">Olurode Ummhani Gbekeloluwa</p>
            <p className="cred">RN, RM, BNSc</p>
          </div>
          <div className="vert" lang="ja" aria-hidden="true">ありがとうございます</div>
        </header>
        <hr className="line" />
        <span className="tab" lang="ja">感謝<small>Thank you</small></span>
        <section className="thanks">
          <h2>Thank you for being part of this day</h2>
          <p>Alhamdulillah, the day has come and gone, and my heart is still full. On Wednesday 7th October 2026 I stood in the New Auditorium at Fountain University, Osogbo, and took my oath as a nurse and a midwife.</p>
          <p>To everyone who came — you made the hall feel like family. Seeing your faces in the crowd, and hearing your voices lift with mine as I said the oath, is something I will carry for the rest of my life.</p>
          <p>To those who could not be there but still sent a call, a message, a prayer or a wish — thank you. Your words reached me, and I read every single one of them. Distance never stopped your love from arriving.</p>
          <p>To my family, who prayed me through the late nights and the difficult ones; to my friends, my lecturers and everyone who encouraged me when I doubted myself — this oath belongs to you too. ❤️</p>
          <p>Please keep me in your prayers as I begin this new chapter. I pray Allah blesses you abundantly for every kindness shown to me. Ameen.</p>
          <p>The wish wall below is still open — if you have not left a word for me yet, I would love to read yours.</p>
          <div className="sig"><span className="stamp" lang="ja" aria-hidden="true">謝</span></div>
        </section>
        <hr className="line" />
        <section className="wishes">
          <span className="tab" lang="ja">寄せ書き<small>Messages</small></span>
          <h2>Leave me a wish</h2>
          <p style={{ color: "var(--muted)", margin: "0 0 16px" }}>The wall is still open — your prayers, congratulations and kind words mean so much to me as I begin this new journey.</p>
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
