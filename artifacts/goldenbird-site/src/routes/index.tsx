import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  Check,
  Clock3,
  Copy,
  Flower2,
  MapPin,
  Menu,
  MessageCircle,
  Mic2,
  ParkingCircle,
  Phone,
  Star,
  Waves,
  Accessibility,
  X,
} from 'lucide-react';

const PHONE = '+234 903 394 8693';
const PHONE_LINK = 'tel:+2349033948693';
const WHATSAPP_LINK = 'https://wa.me/2349033948693';
const ADDRESS = 'Plot 859A Ameh Ebute St, Wuye, Abuja 900108, FCT';
const MAP_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${ADDRESS} 2CXM+V9 Abuja`)}`;
const PHOTO = {
  hero: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=2100&q=85',
  grounds: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=82',
  hall: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=82',
  tables: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&w=1000&q=82',
};

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
:root{--gb-ink:#1F1A17;--gb-muted:#736a61;--gb-paper:#FAF8F5;--gb-sand:#eee8df;--gb-sand-deep:#e4d9ca;--gb-bronze:#a47b53;--gb-line:#d8cfc4;--gb-display:'Plus Jakarta Sans',sans-serif;--gb-body:'Inter',sans-serif}
*{box-sizing:border-box}
html{scroll-behavior:smooth;scroll-padding-top:92px}
body{margin:0;background:var(--gb-paper);color:var(--gb-ink);font-family:var(--gb-body);font-size:15px;-webkit-font-smoothing:antialiased}
button,input,select{font:inherit}
button,a{-webkit-tap-highlight-color:transparent}
a{color:inherit;text-decoration:none}
button{color:inherit}
.gb-site{overflow:hidden;background:var(--gb-paper)}
.gb-shell{width:min(1280px,calc(100% - 72px));margin:0 auto}
 .gb-topline{height:34px;display:flex;align-items:center;justify-content:center;background:#2a211c;color:#e9e0d6;font-size:10px;letter-spacing:.16em;text-transform:uppercase}
.gb-nav-wrap{position:sticky;top:0;z-index:30;background:rgba(250,248,245,.94);backdrop-filter:blur(14px);border-bottom:1px solid rgba(80,65,52,.12)}
.gb-nav{height:82px;display:flex;align-items:center;justify-content:space-between;gap:24px}
.gb-brand{display:flex;align-items:center;gap:12px;min-width:216px}
.gb-mark{width:39px;height:39px;border:1px solid var(--gb-bronze);border-radius:50%;display:grid;place-items:center;color:var(--gb-bronze)}
.gb-brand-name{display:block;font:800 15px/1 var(--gb-display);letter-spacing:.13em}
.gb-brand-sub{display:block;font-size:9px;letter-spacing:.13em;text-transform:uppercase;color:var(--gb-muted);margin-top:6px}
.gb-links{display:flex;align-items:center;gap:27px}
.gb-links a{font-size:11px;letter-spacing:.04em;color:#594f47;transition:color .2s}
.gb-links a:hover{color:var(--gb-bronze)}
.gb-nav-actions{display:flex;align-items:center;gap:10px}
.gb-button{border:1px solid var(--gb-ink);background:var(--gb-ink);color:#fbf8f3;min-height:47px;padding:0 20px;display:inline-flex;align-items:center;justify-content:center;gap:10px;font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;cursor:pointer;transition:background .2s,color .2s,transform .2s}
.gb-button:hover{background:var(--gb-bronze);border-color:var(--gb-bronze);transform:translateY(-1px)}
.gb-button--outline{background:transparent;color:var(--gb-ink)}
.gb-button--outline:hover{color:#fff}
.gb-button--light{border-color:#f6f1e9;background:#f6f1e9;color:var(--gb-ink)}
.gb-button--light:hover{background:#ded2c3;border-color:#ded2c3;color:var(--gb-ink)}
.gb-call{display:flex;align-items:center;gap:9px;padding:11px 0 11px 15px;border-left:1px solid var(--gb-line);font-size:11px;font-weight:700;white-space:nowrap}
.gb-call svg{color:var(--gb-bronze)}
.gb-menu-toggle{display:none;border:1px solid var(--gb-line);background:transparent;width:44px;height:44px;align-items:center;justify-content:center}
.gb-mobile-menu{display:none}
.gb-hero{padding:28px 0 0}
.gb-hero-frame{height:min(690px,72vw);min-height:565px;position:relative;background:#675a4e;overflow:hidden}
.gb-hero-frame:before{content:'';position:absolute;inset:0;background:linear-gradient(90deg,rgba(24,19,16,.72) 0%,rgba(24,19,16,.45) 39%,rgba(24,19,16,.08) 100%),linear-gradient(0deg,rgba(20,16,13,.45),transparent 44%);z-index:1}
.gb-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:center 57%;filter:saturate(.72)}
.gb-hero-content{position:absolute;z-index:2;inset:0;display:flex;flex-direction:column;justify-content:center;padding:72px 8.2%;color:#fff}
.gb-kicker{font-size:10px;letter-spacing:.22em;text-transform:uppercase;color:#dec9ad;font-weight:600;display:flex;align-items:center;gap:12px}
.gb-kicker:before{content:'';display:block;width:33px;height:1px;background:#b7956e}
.gb-hero h1{font:600 clamp(44px,6vw,81px)/1.04 var(--gb-display);letter-spacing:-.065em;max-width:800px;margin:27px 0 22px}
.gb-hero h1 span{color:#ddc6a7}
.gb-hero-copy{max-width:600px;color:rgba(255,255,255,.84);font-size:15px;line-height:1.8;margin:0}
.gb-hero-actions{display:flex;gap:12px;margin-top:34px}
.gb-hero-caption{position:absolute;right:42px;bottom:30px;z-index:3;color:#fff;text-align:right;font-size:10px;letter-spacing:.16em;text-transform:uppercase}
.gb-hero-caption span{display:block;color:#d8c7b3;letter-spacing:.06em;text-transform:none;margin-top:7px}
.gb-strip{display:grid;grid-template-columns:repeat(4,1fr);background:#ece5dc;border-bottom:1px solid #ded4c8}
.gb-strip-item{padding:22px 24px;border-right:1px solid #d8cfc4;display:flex;align-items:center;gap:12px;font-size:11px;font-weight:600;letter-spacing:.02em}
.gb-strip-item:last-child{border:0}
.gb-strip-item svg{color:var(--gb-bronze);flex:0 0 auto}
.gb-rating-stars{display:flex;gap:2px;color:#9c744e}
.gb-section{padding:118px 0}
.gb-section--compact{padding:90px 0}
.gb-overline{color:var(--gb-bronze);font-size:10px;letter-spacing:.2em;text-transform:uppercase;font-weight:700}
.gb-section-head{display:flex;align-items:flex-end;justify-content:space-between;gap:32px;margin-bottom:46px}
.gb-section-head h2,.gb-editorial-copy h2,.gb-reviews h2,.gb-contact-heading h2{font:600 clamp(36px,4.4vw,58px)/1.1 var(--gb-display);letter-spacing:-.055em;margin:16px 0 0}
.gb-section-head p{max-width:400px;color:var(--gb-muted);line-height:1.8;margin:0 2px 4px 0;font-size:14px}
.gb-spec-grid{display:grid;grid-template-columns:repeat(12,1fr);border-top:1px solid var(--gb-line);border-left:1px solid var(--gb-line)}
.gb-spec{grid-column:span 4;min-height:235px;padding:30px 30px 27px;border-right:1px solid var(--gb-line);border-bottom:1px solid var(--gb-line);position:relative;transition:background .25s}
.gb-spec:hover{background:#f0ebe4}
.gb-spec:nth-child(4),.gb-spec:nth-child(5){grid-column:span 6}
.gb-spec-icon{width:38px;height:38px;color:var(--gb-bronze);display:grid;place-items:center;border:1px solid #d9cbb9;border-radius:50%;margin-bottom:26px}
.gb-spec h3{font:700 15px/1.35 var(--gb-display);letter-spacing:-.02em;margin:0 0 10px}
.gb-spec p{font-size:12px;line-height:1.75;color:var(--gb-muted);margin:0;max-width:350px}
.gb-spec-index{position:absolute;right:25px;top:28px;color:#ad9f90;font-size:10px;letter-spacing:.12em}
.gb-editorial{background:#eae3d9}
.gb-editorial-layout{display:grid;grid-template-columns:1.03fr .97fr;align-items:center;gap:8.5%;min-height:540px}
.gb-editorial-photos{position:relative;height:520px}
.gb-photo-main{position:absolute;inset:0 13% 10% 0;overflow:hidden}
.gb-photo-main img,.gb-photo-inset img{width:100%;height:100%;object-fit:cover;display:block}
.gb-photo-inset{position:absolute;right:0;bottom:0;width:45%;height:43%;border:9px solid #eae3d9;overflow:hidden}
.gb-photo-tag{position:absolute;left:0;bottom:0;transform:translateY(50%);background:var(--gb-ink);color:#f8f2e9;padding:16px 19px;font-size:10px;letter-spacing:.13em;text-transform:uppercase}
.gb-editorial-copy{padding:25px 0}
.gb-editorial-copy h2{max-width:510px}
.gb-editorial-copy>p{color:#655b52;line-height:1.9;font-size:14px;max-width:490px;margin:25px 0}
.gb-bullet-list{display:grid;grid-template-columns:1fr 1fr;gap:15px 22px;padding:0;margin:27px 0 32px;list-style:none}
.gb-bullet-list li{display:flex;gap:9px;align-items:center;font-size:11px;color:#51473f}
.gb-bullet-list svg{color:var(--gb-bronze);flex-shrink:0}
.gb-event-section{padding-bottom:110px}
.gb-event-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:12px}
.gb-event-card{position:relative;min-height:335px;color:#fff;overflow:hidden;display:flex;align-items:flex-end;background:#433a32}
.gb-event-card:after{content:'';position:absolute;inset:0;background:linear-gradient(0deg,rgba(25,20,16,.86),rgba(25,20,16,.03) 74%);transition:opacity .25s}
.gb-event-card:hover:after{opacity:.8}
.gb-event-card img{position:absolute;width:100%;height:100%;inset:0;object-fit:cover;filter:saturate(.65);transition:transform .7s}
.gb-event-card:hover img{transform:scale(1.04)}
.gb-event-content{z-index:1;position:relative;padding:23px;width:100%}
.gb-event-number{font-size:10px;letter-spacing:.14em;color:#ddc5a7}
.gb-event-content h3{font:600 20px/1.2 var(--gb-display);letter-spacing:-.03em;margin:13px 0 0}
.gb-event-arrow{position:absolute;right:22px;bottom:23px;color:#e5c9a8}
.gb-review-band{background:#2a211c;color:#f7f1e9;padding:85px 0}
.gb-review-top{display:flex;justify-content:space-between;align-items:flex-end;gap:30px;border-bottom:1px solid rgba(245,235,222,.2);padding-bottom:35px}
.gb-review-top .gb-overline{color:#c9a47c}
.gb-review-top h2{font:600 clamp(34px,4vw,52px)/1.1 var(--gb-display);letter-spacing:-.055em;margin:15px 0 0}
.gb-google-rating{display:flex;align-items:center;gap:13px}
.gb-google-rating strong{font:700 44px/1 var(--gb-display);letter-spacing:-.06em}
.gb-google-rating small{display:block;color:#d4c9bc;font-size:11px;margin-top:5px}
.gb-review-cards{display:grid;grid-template-columns:1fr 1fr;gap:54px;padding-top:34px}
.gb-quote{margin:0;padding:0 10px 0 0}
.gb-quote-stars{display:flex;gap:3px;color:#caa67f}
.gb-quote blockquote{font:500 clamp(18px,2vw,23px)/1.55 var(--gb-display);letter-spacing:-.025em;margin:20px 0 0;color:#f5eee5}
.gb-hours{background:#f4f0ea}
.gb-hours-layout{display:grid;grid-template-columns:.82fr 1.18fr;gap:9%;align-items:center}
.gb-hours-copy h2{font:600 clamp(36px,4.3vw,55px)/1.1 var(--gb-display);letter-spacing:-.055em;margin:15px 0 18px}
.gb-hours-copy p{color:var(--gb-muted);line-height:1.8;font-size:13px;max-width:390px;margin:0}
.gb-hours-note{margin-top:24px;border-left:2px solid var(--gb-bronze);padding:4px 0 4px 14px;font-size:12px;line-height:1.6;color:#51473f}
.gb-hours-card{background:#fffdfa;border:1px solid var(--gb-line);padding:31px 36px}
.gb-hours-card-head{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--gb-line);padding-bottom:19px;margin-bottom:7px}
.gb-hours-card-head h3{font:700 12px var(--gb-display);letter-spacing:.11em;text-transform:uppercase;margin:0}
.gb-hours-card-head svg{color:var(--gb-bronze)}
.gb-hour-row{display:flex;justify-content:space-between;align-items:center;padding:17px 0;border-bottom:1px solid #eae5df;font-size:13px}
.gb-hour-row:last-child{border:0}
.gb-hour-day{font-weight:600}
.gb-hour-time{color:#655b52}
.gb-hour-closed{color:#8a6a4a}
.gb-contact{background:#e7ded2;padding:104px 0 96px}
.gb-contact-layout{display:grid;grid-template-columns:1fr 1fr;gap:9%;align-items:start}
.gb-contact-heading h2{max-width:510px}
.gb-contact-heading>p{color:var(--gb-muted);line-height:1.8;max-width:440px;margin:20px 0 28px}
.gb-contact-actions{display:flex;gap:10px;flex-wrap:wrap}
.gb-contact-details{border-top:1px solid #cfc3b4}
.gb-detail{padding:22px 0;border-bottom:1px solid #cfc3b4;display:grid;grid-template-columns:35px 1fr auto;gap:14px;align-items:center}
.gb-detail-icon{color:var(--gb-bronze)}
.gb-detail-label{font-size:9px;letter-spacing:.14em;text-transform:uppercase;color:#82756a;margin-bottom:6px}
.gb-detail-value{font-size:13px;line-height:1.55;font-weight:600}
.gb-detail-action{border:0;background:transparent;color:#76583a;cursor:pointer;display:flex;align-items:center;gap:6px;font-size:10px;font-weight:700;text-transform:uppercase;letter-spacing:.08em;padding:10px 0}
.gb-detail-action:hover{color:var(--gb-ink)}
.gb-footer{background:#1F1A17;color:#f6efe7;padding:39px 0 31px}
.gb-footer-main{display:flex;align-items:center;justify-content:space-between;gap:24px;padding-bottom:30px;border-bottom:1px solid rgba(246,239,231,.17)}
.gb-footer-brand .gb-brand-name{color:#f6efe7}
.gb-footer-brand .gb-brand-sub{color:#c2b5a7}
.gb-footer-nav{display:flex;gap:22px;flex-wrap:wrap}
.gb-footer-nav a{font-size:10px;color:#d7ccc0}
.gb-footer-nav a:hover{color:#d4b38d}
.gb-footer-bottom{display:flex;justify-content:space-between;gap:20px;padding-top:20px;color:#b8aa9d;font-size:10px}
.gb-footer-contact{display:flex;gap:20px}
.gb-footer-contact a:hover{color:#fff}
.gb-dialog-backdrop{position:fixed;inset:0;z-index:80;background:rgba(25,20,17,.64);backdrop-filter:blur(4px);display:grid;place-items:center;padding:20px;animation:gbFade .18s ease}
.gb-dialog{width:min(570px,100%);max-height:min(90dvh,820px);overflow:auto;background:var(--gb-paper);border:1px solid #d3c7ba;box-shadow:0 24px 90px rgba(18,13,10,.3);padding:36px 40px 38px;position:relative;animation:gbRise .22s ease}
.gb-dialog-close{position:absolute;right:20px;top:20px;border:1px solid var(--gb-line);background:transparent;width:38px;height:38px;display:grid;place-items:center;cursor:pointer}
.gb-dialog h2{font:600 34px/1.1 var(--gb-display);letter-spacing:-.05em;margin:12px 0 10px}
.gb-dialog-intro{font-size:12px;color:var(--gb-muted);line-height:1.65;margin:0 0 26px}
.gb-form{display:grid;grid-template-columns:1fr 1fr;gap:16px}
.gb-field{display:flex;flex-direction:column;gap:7px}
.gb-field--wide{grid-column:1/-1}
.gb-field label{font-size:10px;font-weight:700;letter-spacing:.04em}
.gb-field input,.gb-field select{height:45px;border:1px solid #cfc5ba;background:#fffdfa;color:var(--gb-ink);padding:0 12px;outline:none;border-radius:0}
.gb-field input:focus,.gb-field select:focus{border-color:var(--gb-bronze);box-shadow:0 0 0 2px rgba(164,123,83,.15)}
.gb-submit{grid-column:1/-1;width:100%;margin-top:6px}
.gb-toast{position:fixed;z-index:100;top:108px;right:28px;max-width:min(440px,calc(100vw - 32px));background:#29211c;color:#fff8f0;padding:16px 20px;box-shadow:0 10px 35px rgba(29,22,17,.22);display:flex;align-items:center;gap:12px;font-size:13px;line-height:1.5;animation:gbRise .2s ease}
.gb-toast svg{color:#d1aa7d;flex-shrink:0}
.gb-mobile-actions{display:none}
@keyframes gbFade{from{opacity:0}to{opacity:1}}
@keyframes gbRise{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:translateY(0)}}
@media(max-width:1050px){.gb-links{gap:16px}.gb-links a{font-size:10px}.gb-call{display:none}.gb-brand{min-width:0}.gb-nav-actions .gb-button{min-height:43px;padding:0 14px}.gb-editorial-layout{gap:6%}.gb-event-card{min-height:290px}}
@media(max-width:800px){.gb-shell{width:min(100% - 40px,650px)}.gb-topline{font-size:9px;letter-spacing:.11em}.gb-nav{height:72px}.gb-links,.gb-nav-actions{display:none}.gb-menu-toggle{display:flex}.gb-mobile-menu{display:flex;position:absolute;left:0;right:0;top:72px;background:var(--gb-paper);padding:9px 20px 20px;border-bottom:1px solid var(--gb-line);flex-direction:column;box-shadow:0 16px 24px rgba(37,28,22,.09)}.gb-mobile-menu a{padding:13px 5px;border-bottom:1px solid #e9e2d9;font-size:12px}.gb-mobile-menu .gb-button{margin-top:15px}.gb-hero{padding-top:14px}.gb-hero-frame{height:640px;min-height:0}.gb-hero-content{padding:52px 7%}.gb-hero h1{font-size:clamp(44px,9vw,68px);max-width:620px}.gb-hero-copy{font-size:14px}.gb-hero-caption{right:21px;bottom:23px;font-size:9px}.gb-strip{grid-template-columns:1fr 1fr}.gb-strip-item{padding:16px 18px;border-bottom:1px solid #d8cfc4;font-size:10px}.gb-strip-item:nth-child(2){border-right:0}.gb-strip-item:nth-child(n+3){border-bottom:0}.gb-section{padding:82px 0}.gb-section--compact{padding:72px 0}.gb-section-head{display:block;margin-bottom:30px}.gb-section-head p{margin-top:18px}.gb-spec{grid-column:span 6;min-height:235px;padding:24px}.gb-spec:nth-child(4),.gb-spec:nth-child(5){grid-column:span 6}.gb-editorial-layout{grid-template-columns:1fr;gap:50px}.gb-editorial-photos{height:460px;max-width:600px;width:100%}.gb-editorial-copy{padding:0}.gb-event-grid{grid-template-columns:1fr 1fr}.gb-event-card{min-height:310px}.gb-review-top{align-items:flex-start;flex-direction:column}.gb-review-cards{gap:28px}.gb-hours-layout{grid-template-columns:1fr;gap:34px}.gb-contact-layout{grid-template-columns:1fr;gap:45px}.gb-footer-main{align-items:flex-start;flex-direction:column}.gb-footer-nav{gap:15px}.gb-mobile-actions{position:fixed;z-index:40;bottom:0;left:0;right:0;display:grid;grid-template-columns:1fr 1fr;padding:9px 12px calc(9px + env(safe-area-inset-bottom));background:rgba(250,248,245,.97);border-top:1px solid var(--gb-line);backdrop-filter:blur(12px);gap:8px}.gb-mobile-actions a{height:45px;display:flex;align-items:center;justify-content:center;gap:9px;font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.05em}.gb-mobile-actions .gb-mobile-call{background:var(--gb-ink);color:#fff}.gb-mobile-actions .gb-mobile-wa{background:#e9dfd2;color:var(--gb-ink)}.gb-site{padding-bottom:64px}}
@media(max-width:520px){.gb-shell{width:calc(100% - 32px)}.gb-brand-name{font-size:13px}.gb-brand-sub{font-size:8px}.gb-brand{gap:9px}.gb-mark{width:35px;height:35px}.gb-hero-frame{height:625px}.gb-hero-content{padding:38px 24px;justify-content:flex-end;padding-bottom:98px}.gb-hero h1{font-size:46px;margin:22px 0 17px}.gb-hero-copy{font-size:13px;line-height:1.7}.gb-hero-actions{margin-top:24px;flex-direction:column;align-items:stretch;max-width:270px}.gb-hero-actions .gb-button{min-height:48px}.gb-hero-caption{display:none}.gb-strip-item{padding:15px 10px;gap:8px;font-size:9px}.gb-strip-item svg{width:16px}.gb-section{padding:68px 0}.gb-section-head h2,.gb-editorial-copy h2,.gb-reviews h2,.gb-contact-heading h2{font-size:38px}.gb-spec-grid{grid-template-columns:1fr}.gb-spec,.gb-spec:nth-child(4),.gb-spec:nth-child(5){grid-column:1/-1;min-height:0;padding:22px 22px 24px}.gb-spec-icon{margin-bottom:17px}.gb-spec-index{top:22px;right:22px}.gb-editorial{padding:68px 0}.gb-editorial-photos{height:350px}.gb-photo-inset{border-width:6px}.gb-bullet-list{grid-template-columns:1fr;gap:12px}.gb-event-section{padding-bottom:70px}.gb-event-grid{grid-template-columns:1fr 1fr;gap:8px}.gb-event-card{min-height:245px}.gb-event-content{padding:15px}.gb-event-content h3{font-size:16px;max-width:145px}.gb-event-arrow{right:14px;bottom:17px;width:17px}.gb-review-band{padding:65px 0}.gb-google-rating strong{font-size:38px}.gb-review-cards{grid-template-columns:1fr;gap:28px}.gb-quote blockquote{font-size:18px}.gb-hours-card{padding:22px 18px}.gb-hour-row{font-size:12px}.gb-contact{padding:72px 0 64px}.gb-contact-actions{flex-direction:column;align-items:stretch}.gb-detail{grid-template-columns:28px 1fr;gap:10px}.gb-detail-action{grid-column:2;justify-self:start;padding:0}.gb-footer-bottom{flex-direction:column}.gb-footer-contact{flex-direction:column;gap:8px}.gb-dialog{padding:30px 21px}.gb-dialog h2{font-size:29px}.gb-form{grid-template-columns:1fr}.gb-field--wide,.gb-submit{grid-column:1}.gb-toast{top:auto;bottom:78px;right:16px}.gb-mobile-actions{padding-left:10px;padding-right:10px}}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}*,*:before,*:after{animation-duration:.01ms!important;animation-iteration-count:1!important;transition-duration:.01ms!important}}
`;

const highlights = [
  { icon: Waves, title: 'Expansive High-Peak Marquee', text: 'Soaring draping and a versatile, acoustic-friendly layout adaptable for 1,000+ banquet or theatre configurations.' },
  { icon: Flower2, title: 'Scenic Water Feature & Grounds', text: 'Manicured outdoor grounds and a decorative fountain make a considered backdrop for photographs and cocktail receptions.' },
  { icon: ParkingCircle, title: 'Massive Guest Parking Lot', text: 'Fully paved, secure on-site parking accommodating large wedding and conference motorcades.' },
  { icon: Accessibility, title: 'Wheelchair & Vendor Accessibility', text: 'Dedicated step-free ramps, wide marquee entrances, and back-of-house vendor load-in zones.' },
  { icon: Mic2, title: 'Professional Stage & Lighting', text: 'An elevated stage setup with integrated power backups for sound and live bands.' },
];

const eventTypes = [
  { name: 'Weddings & Receptions', image: PHOTO.grounds, n: '01' },
  { name: 'Corporate Galas & Conferences', image: PHOTO.hall, n: '02' },
  { name: 'Church Conventions', image: PHOTO.hero, n: '03' },
  { name: 'Milestone Celebrations', image: PHOTO.tables, n: '04' },
];

function AppPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [toast, setToast] = useState('');
  const [copied, setCopied] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstInputRef = useRef<HTMLInputElement>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    document.title = 'Goldenbird Marquee and Event Center | Wuye, Abuja';
    let description = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!description) {
      description = document.createElement('meta');
      description.name = 'description';
      document.head.appendChild(description);
    }
    description.content = 'A serene, modern event venue in Wuye, Abuja, with an expansive marquee, scenic fountain grounds, and generous guest parking.';
  }, []);

  useEffect(() => {
    if (!isOpen) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    firstInputRef.current?.focus();
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
      if (event.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>('button, input, select, a[href], [tabindex]:not([tabindex="-1"])');
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previousFocus?.focus();
    };
  }, [isOpen]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const notify = (message: string) => {
    setToast(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(''), 4800);
  };

  const submitInspection = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    setIsOpen(false);
    form.reset();
    notify("Inspection request received! We'll reach out on WhatsApp shortly.");
  };

  const copyAddress = async () => {
    try {
      await navigator.clipboard.writeText(ADDRESS);
      setCopied(true);
      notify('Address copied to clipboard.');
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      notify('Please copy the address: ' + ADDRESS);
    }
  };

  const closeMenu = () => setMenuOpen(false);
  const onDialogKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') setIsOpen(false);
  };

  return (
    <div className="gb-site">
      <style>{css}</style>
      <div className="gb-topline">A serene setting for Abuja’s most meaningful gatherings</div>
      <header className="gb-nav-wrap">
        <div className="gb-shell gb-nav">
          <a className="gb-brand" href="#top" aria-label="Goldenbird Marquee and Event Center home">
            <span className="gb-mark" aria-hidden="true"><Flower2 size={21} strokeWidth={1.4} /></span>
            <span><span className="gb-brand-name">GOLDENBIRD</span><span className="gb-brand-sub">Marquee &amp; Grounds · Wuye, Abuja</span></span>
          </a>
          <nav className="gb-links" aria-label="Main navigation">
            <a href="#specs">Venue Specs</a>
            <a href="#amenities">Amenities</a>
            <a href="#hours">Office Hours</a>
            <a href="#reviews">Reviews</a>
            <a href="#location">Location</a>
          </nav>
          <div className="gb-nav-actions">
            <button className="gb-button" type="button" onClick={() => setIsOpen(true)}>Book Inspection <ArrowUpRight size={14} /></button>
            <a className="gb-call" href={PHONE_LINK}><Phone size={15} />{PHONE}</a>
          </div>
          <button className="gb-menu-toggle" type="button" aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {menuOpen && <nav className="gb-mobile-menu" aria-label="Mobile navigation">
          <a href="#specs" onClick={closeMenu}>Venue Specs</a><a href="#amenities" onClick={closeMenu}>Amenities</a><a href="#hours" onClick={closeMenu}>Office Hours</a><a href="#reviews" onClick={closeMenu}>Reviews</a><a href="#location" onClick={closeMenu}>Location</a>
          <button className="gb-button" type="button" onClick={() => { closeMenu(); setIsOpen(true); }}>Book Inspection <ArrowUpRight size={14} /></button>
        </nav>}
      </header>

      <main id="top">
        <section className="gb-shell gb-hero" aria-labelledby="hero-title">
          <div className="gb-hero-frame">
            <img className="gb-hero-img" src={PHOTO.hero} alt="An elegant event venue set for a gathering" />
            <div className="gb-hero-content">
              <div className="gb-kicker">Goldenbird · Wuye, Abuja</div>
              <h1 id="hero-title">Spacious Grand Marquee <span>&amp; Scenic Grounds</span> in Wuye</h1>
              <p className="gb-hero-copy">A serene, modern event venue in the heart of Abuja featuring expansive marquee halls, scenic water features, and unmatched guest parking for weddings, conferences, and galas.</p>
              <div className="gb-hero-actions">
                <button className="gb-button gb-button--light" type="button" onClick={() => setIsOpen(true)}>Request Date Inspection <ArrowRight size={15} /></button>
                <a className="gb-button gb-button--outline" href="#amenities">View Hall Amenities <ArrowDownRight size={15} /></a>
              </div>
            </div>
            <div className="gb-hero-caption">A setting for gathering<span>Plot 859A · Wuye, Abuja</span></div>
          </div>
          <div className="gb-strip" aria-label="Venue at a glance">
            <div className="gb-strip-item"><span className="gb-rating-stars" aria-label="4.4 out of 5 stars"><Star size={15} fill="currentColor" /><Star size={15} fill="currentColor" /><Star size={15} fill="currentColor" /><Star size={15} fill="currentColor" /><Star size={15} /></span><span>4.4★ Rating · 670+ Reviews</span></div>
            <div className="gb-strip-item"><Waves size={18} /><span>Scenic Fountain Grounds</span></div>
            <div className="gb-strip-item"><ParkingCircle size={18} /><span>Ample Secure Parking</span></div>
            <div className="gb-strip-item"><Accessibility size={18} /><span>Wheelchair Accessible</span></div>
          </div>
        </section>

        <section className="gb-shell gb-section" id="specs">
          <div className="gb-section-head">
            <div><div className="gb-overline">Space to bring it all together</div><h2>Thoughtfully equipped.<br />Ready for your occasion.</h2></div>
            <p>From the first arrival to the last toast, the grounds are designed to make hosting feel considered, comfortable, and well organised.</p>
          </div>
          <div className="gb-spec-grid" id="amenities">
            {highlights.map(({ icon: Icon, title, text }, index) => <article className="gb-spec" key={title}>
              <span className="gb-spec-index">0{index + 1}</span>
              <span className="gb-spec-icon"><Icon size={19} strokeWidth={1.6} /></span>
              <h3>{title}</h3><p>{text}</p>
            </article>)}
          </div>
        </section>

        <section className="gb-editorial">
          <div className="gb-shell gb-editorial-layout">
            <div className="gb-editorial-photos">
              <div className="gb-photo-main"><img src={PHOTO.grounds} alt="Outdoor event grounds framed by greenery" loading="lazy" /></div>
              <div className="gb-photo-inset"><img src={PHOTO.tables} alt="A carefully arranged event table setting" loading="lazy" /></div>
              <div className="gb-photo-tag">Room for every moment</div>
            </div>
            <div className="gb-editorial-copy">
              <div className="gb-overline">The Goldenbird setting</div>
              <h2>A gracious arrival. A memorable gathering.</h2>
              <p>At Goldenbird, the expansive marquee and scenic outdoor grounds sit together in one calm, well-equipped setting. Create a warm welcome, host a full programme, and give guests room to enjoy the occasion.</p>
              <ul className="gb-bullet-list">
                <li><Check size={15} />Expansive high-peak marquee</li>
                <li><Check size={15} />Decorative fountain grounds</li>
                <li><Check size={15} />Generous on-site parking</li>
                <li><Check size={15} />Step-free guest access</li>
                <li><Check size={15} />Stage and lighting setup</li>
                <li><Check size={15} />Vendor load-in zones</li>
              </ul>
              <button type="button" className="gb-button" onClick={() => setIsOpen(true)}>Plan an inspection <ArrowRight size={15} /></button>
            </div>
          </div>
        </section>

        <section className="gb-shell gb-section gb-event-section">
          <div className="gb-section-head">
            <div><div className="gb-overline">A venue for every gathering</div><h2>Made for moments<br />that bring people close.</h2></div>
            <p>From once-in-a-lifetime celebrations to focused days of connection, Goldenbird offers the space to host your way.</p>
          </div>
          <div className="gb-event-grid">
            {eventTypes.map(item => <article className="gb-event-card" key={item.name}>
              <img src={item.image} alt="" loading="lazy" />
              <div className="gb-event-content"><div className="gb-event-number">GATHERING / {item.n}</div><h3>{item.name}</h3><ArrowUpRight className="gb-event-arrow" size={20} /></div>
            </article>)}
          </div>
        </section>

        <section className="gb-review-band" id="reviews">
          <div className="gb-shell gb-reviews">
            <div className="gb-review-top">
              <div><div className="gb-overline">Guest reflections</div><h2>Good things are said here.</h2></div>
              <div className="gb-google-rating"><strong>4.4</strong><div><div className="gb-rating-stars" aria-label="4.4 out of 5 stars"><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} fill="currentColor" /><Star size={16} /></div><small>670+ Google reviews</small></div></div>
            </div>
            <div className="gb-review-cards">
              <figure className="gb-quote"><div className="gb-quote-stars" aria-hidden="true"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div><blockquote>“A very beautiful hall with a cool and serene environment. Large guest parking space and great scenery for photography.”</blockquote></figure>
              <figure className="gb-quote"><div className="gb-quote-stars" aria-hidden="true"><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /><Star size={14} fill="currentColor" /></div><blockquote>“Great hall for any occasion. The stage setup, acoustics, and air conditioning made our event truly memorable.”</blockquote></figure>
            </div>
          </div>
        </section>

        <section className="gb-hours gb-section" id="hours">
          <div className="gb-shell gb-hours-layout">
            <div className="gb-hours-copy">
              <div className="gb-overline">Come and see the space</div>
              <h2>Inspection hours<br />&amp; office visits.</h2>
              <p>We welcome weekday and Saturday inspections during office hours. Sunday is closed for regular inquiries; event days are by booking only.</p>
              <div className="gb-hours-note">Hosting an upcoming weekend event? Schedule an advance weekday walkthrough.</div>
            </div>
            <div className="gb-hours-card">
              <div className="gb-hours-card-head"><h3>Office &amp; inspection hours</h3><Clock3 size={19} /></div>
              <div className="gb-hour-row"><span className="gb-hour-day">Monday – Friday</span><span className="gb-hour-time">11:00 AM – 2:00 PM</span></div>
              <div className="gb-hour-row"><span className="gb-hour-day">Saturday</span><span className="gb-hour-time">10:00 AM – 3:00 PM</span></div>
              <div className="gb-hour-row"><span className="gb-hour-day">Sunday</span><span className="gb-hour-time gb-hour-closed">Closed for office walk-ins</span></div>
              <div className="gb-hour-row"><span className="gb-hour-day">Event days</span><span className="gb-hour-time">By booking only</span></div>
            </div>
          </div>
        </section>

        <section className="gb-contact" id="location">
          <div className="gb-shell gb-contact-layout">
            <div className="gb-contact-heading">
              <div className="gb-overline">Find us in Wuye</div>
              <h2>Come experience Goldenbird in person.</h2>
              <p>Walk the grounds, see the marquee, and picture your gathering here. Get in touch to plan your visit.</p>
              <div className="gb-contact-actions">
                <a className="gb-button" href={PHONE_LINK}><Phone size={15} />Call {PHONE}</a>
                <a className="gb-button gb-button--outline" href={WHATSAPP_LINK} target="_blank" rel="noreferrer"><MessageCircle size={16} />Chat on WhatsApp <ArrowUpRight size={14} /></a>
              </div>
            </div>
            <div className="gb-contact-details">
              <div className="gb-detail"><MapPin className="gb-detail-icon" size={19} /><div><div className="gb-detail-label">Venue address</div><div className="gb-detail-value">{ADDRESS}<br />Plus Code: 2CXM+V9 Abuja</div></div><button className="gb-detail-action" type="button" onClick={copyAddress} aria-label="Copy venue address">{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? 'Copied' : 'Copy'}</button></div>
              <div className="gb-detail"><Phone className="gb-detail-icon" size={18} /><div><div className="gb-detail-label">Call or WhatsApp</div><a className="gb-detail-value" href={PHONE_LINK}>{PHONE}</a></div><a className="gb-detail-action" href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp <ArrowUpRight size={13} /></a></div>
              <div className="gb-detail"><MapPin className="gb-detail-icon" size={18} /><div><div className="gb-detail-label">Directions</div><div className="gb-detail-value">Wuye, Abuja, FCT</div></div><a className="gb-detail-action" href={MAP_LINK} target="_blank" rel="noreferrer">Open maps <ArrowUpRight size={13} /></a></div>
            </div>
          </div>
        </section>
      </main>

      <footer className="gb-footer">
        <div className="gb-shell">
          <div className="gb-footer-main">
            <a className="gb-brand gb-footer-brand" href="#top">
              <span className="gb-mark" aria-hidden="true"><Flower2 size={21} strokeWidth={1.4} /></span>
              <span><span className="gb-brand-name">GOLDENBIRD</span><span className="gb-brand-sub">Marquee &amp; Grounds · Wuye, Abuja</span></span>
            </a>
            <nav className="gb-footer-nav" aria-label="Footer navigation"><a href="#specs">Venue Specs</a><a href="#amenities">Amenities</a><a href="#hours">Office Hours</a><a href="#reviews">Reviews</a><a href="#location">Location</a></nav>
          </div>
          <div className="gb-footer-bottom"><span>© {new Date().getFullYear()} Goldenbird Marquee and Event Center</span><div className="gb-footer-contact"><a href={PHONE_LINK}>{PHONE}</a><a href={WHATSAPP_LINK} target="_blank" rel="noreferrer">WhatsApp</a></div></div>
        </div>
      </footer>

      <div className="gb-mobile-actions" aria-label="Quick contact actions">
        <a className="gb-mobile-call" href={PHONE_LINK}><Phone size={16} />Call now</a>
        <a className="gb-mobile-wa" href={WHATSAPP_LINK} target="_blank" rel="noreferrer"><MessageCircle size={17} />WhatsApp</a>
      </div>

      {isOpen && <div className="gb-dialog-backdrop" onMouseDown={(event) => { if (event.target === event.currentTarget) setIsOpen(false); }}>
        <div className="gb-dialog" role="dialog" aria-modal="true" aria-labelledby="inspection-title" aria-describedby="inspection-description" ref={dialogRef} onKeyDown={onDialogKeyDown}>
          <button className="gb-dialog-close" type="button" aria-label="Close inspection booking dialog" onClick={() => setIsOpen(false)}><X size={18} /></button>
          <div className="gb-overline">Plan a visit</div>
          <h2 id="inspection-title">Request an inspection.</h2>
          <p className="gb-dialog-intro" id="inspection-description">Tell us a little about your event and preferred visit date. Our team will reach out on WhatsApp shortly.</p>
          <form className="gb-form" onSubmit={submitInspection}>
            <div className="gb-field gb-field--wide"><label htmlFor="gb-name">Full name</label><input ref={firstInputRef} id="gb-name" name="name" type="text" autoComplete="name" required /></div>
            <div className="gb-field gb-field--wide"><label htmlFor="gb-phone">Phone / WhatsApp number</label><input id="gb-phone" name="phone" type="tel" autoComplete="tel" inputMode="tel" required /></div>
            <div className="gb-field"><label htmlFor="gb-type">Event type</label><select id="gb-type" name="eventType" required defaultValue=""><option value="" disabled>Select event</option><option>Wedding</option><option>Corporate</option><option>Church Event</option><option>Party</option></select></div>
            <div className="gb-field"><label htmlFor="gb-guests">Estimated guest count</label><input id="gb-guests" name="guestCount" type="number" min="1" inputMode="numeric" required /></div>
            <div className="gb-field gb-field--wide"><label htmlFor="gb-date">Preferred inspection date</label><input id="gb-date" name="inspectionDate" type="date" required /></div>
            <button type="submit" className="gb-button gb-submit">Send inspection request <ArrowRight size={15} /></button>
          </form>
        </div>
      </div>}
      {toast && <div className="gb-toast" role="status" aria-live="polite"><Check size={18} />{toast}</div>}
    </div>
  );
}

export default AppPage;
