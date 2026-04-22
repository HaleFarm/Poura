/* Primitives — logo marks, brackets, buttons, placeholder imagery */
import React, { useState, useEffect, useRef } from "react";

// Viewport hook — one source of truth for responsive breakpoints
function useViewport(){
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 1400);
  useEffect(()=>{
    const on = () => setW(window.innerWidth);
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  },[]);
  return { w, isMobile: w < 768, isTablet: w >= 768 && w < 1024, isDesktop: w >= 1024 };
}

// Official bracket lockup PNG — use exactly as provided, color variants only
function PouraBracket({color="burgundy", height=40}){
  const src = color === "blue" ? "assets/poura-logo-blue-bracket.png"
            : color === "cream" ? "assets/poura-logo-cream-bracket.png"
            : "assets/poura-logo-burgundy-bracket.png";
  return <img src={src} alt="Poura" style={{height, width:"auto", display:"block"}}/>;
}

// The clover / plus mark — 4 petals
function Clover({size=24,color="currentColor"}){
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" fill="none" aria-hidden="true">
      <circle cx="20" cy="10" r="6" fill={color}/>
      <circle cx="20" cy="30" r="6" fill={color}/>
      <circle cx="10" cy="20" r="6" fill={color}/>
      <circle cx="30" cy="20" r="6" fill={color}/>
      <circle cx="20" cy="20" r="4" fill={color}/>
    </svg>
  );
}

// Brand wordmark rendered in pure type (for when we need crisp scalable type)
function Wordmark({color="var(--blue)",size=80,sub}){
  return (
    <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:6,color}}>
      <div style={{
        display:"flex",alignItems:"center",
        border:`2px solid ${color}`, borderRadius:999,
        padding:`${size*0.12}px ${size*0.32}px`,
        fontSize:size, fontWeight:700, letterSpacing:"-0.02em",
        fontFamily:"var(--font)",
      }}>
        <span>PO</span>
        <Clover size={size*0.32} color={color}/>
        <span>URA</span>
      </div>
      {sub && <div className="uc mono" style={{fontSize:size*0.14, letterSpacing:".18em"}}>{sub}</div>}
    </div>
  );
}

// The "PoURA" small lockup inside the bracket (used in footers/corners of brand)
function PouraCornerMark({color="var(--cream)"}){
  return (
    <div style={{color, display:"inline-flex", gap:12, alignItems:"flex-end"}}>
      <div style={{
        border:`1px solid ${color}`, borderRadius:4,
        padding:"8px 18px 4px 18px", minWidth:72
      }}>
        <div style={{fontSize:22, fontWeight:700, letterSpacing:"-.02em", display:"flex", alignItems:"center", gap:2}}>
          <span>PO</span><Clover size={10} color={color}/><span>URA</span>
        </div>
      </div>
      <div style={{fontSize:10, lineHeight:1.2, paddingBottom:4}} className="uc">
        Your drink.<br/>Your way.
      </div>
    </div>
  );
}

// Striped SVG placeholder with monospace caption (when we need imagery we don't have)
function Placeholder({label, ratio="16/9", tone="cream", borderColor}){
  const bg = tone==="burgundy" ? "var(--burgundy)" : tone==="blue" ? "var(--blue)" : tone==="green" ? "var(--green)" : "var(--cream-bright)";
  const fg = tone==="cream" ? "var(--burgundy)" : "var(--cream)";
  const id = React.useId();
  return (
    <div style={{aspectRatio:ratio,width:"100%",position:"relative",overflow:"hidden",background:bg, border: `1px solid ${borderColor||"rgba(0,0,0,.08)"}`}}>
      <svg width="100%" height="100%" style={{position:"absolute",inset:0,opacity:.25}}>
        <defs>
          <pattern id={id} width="14" height="14" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1="0" y1="0" x2="0" y2="14" stroke={fg} strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill={`url(#${id})`}/>
      </svg>
      <div style={{position:"absolute",inset:0,display:"flex",alignItems:"center",justifyContent:"center",color:fg,textAlign:"center",padding:16}}>
        <div className="mono uc" style={{fontSize:11, letterSpacing:".15em", opacity:.85}}>{label}</div>
      </div>
    </div>
  );
}

// Pill button
function Button({children, kind="primary", as="button", href, onClick, style={}, target, rel}){
  const base = {
    display:"inline-flex",alignItems:"center",gap:10,
    padding:"14px 26px", borderRadius:999, fontSize:14, fontWeight:500,
    letterSpacing:".04em", textTransform:"uppercase", fontFamily:"var(--font)",
    cursor:"pointer", transition:"all .2s ease", border:"1px solid transparent",
    ...style
  };
  const styles = {
    primary:  {...base, background:"var(--burgundy)", color:"var(--cream)"},
    ghost:    {...base, background:"transparent", color:"var(--burgundy)", border:"1px solid var(--burgundy)"},
    ghostLight:{...base, background:"transparent", color:"var(--cream)", border:"1px solid var(--cream)"},
    blue:     {...base, background:"var(--blue)", color:"var(--burgundy)"},
  }[kind];
  if(as==="a") return <a href={href} onClick={onClick} style={styles} target={target} rel={rel}>{children}</a>;
  return <button onClick={onClick} style={styles}>{children}</button>;
}

// Section wrapper
function Section({bg="cream", children, style={}, id}){
  const { isMobile } = useViewport();
  const palettes = {
    cream:{background:"var(--cream)", color:"var(--ink)"},
    burgundy:{background:"var(--burgundy)", color:"var(--cream)"},
    blue:{background:"var(--blue)", color:"var(--burgundy)"},
    green:{background:"var(--green)", color:"var(--cream)"},
    ink:{background:"var(--ink)", color:"var(--cream)"}
  };
  return (
    <section id={id} style={{...palettes[bg], padding: isMobile ? "60px 20px" : "96px 48px", ...style}}>
      <div style={{maxWidth:1280, margin:"0 auto"}}>
        {children}
      </div>
    </section>
  );
}

// Eyebrow label (mono small)
function Eyebrow({children, color}){
  return <div className="mono uc" style={{fontSize:12, letterSpacing:".2em", opacity:.8, color}}>{children}</div>;
}

// Display heading
function Display({children, size=96, color, style={}}){
  return <h1 style={{fontSize:size, lineHeight:.95, letterSpacing:"-.03em", fontWeight:700, textTransform:"uppercase", color, ...style}}>{children}</h1>;
}

// Compliance disclaimer inline
function ComplianceNote({children, style={}}){
  return (
    <div style={{
      fontSize:11, lineHeight:1.5, opacity:.75, maxWidth:720,
      fontFamily:"ui-monospace,SFMono-Regular,Menlo,monospace",
      letterSpacing:".02em", ...style
    }}>
      {children}
    </div>
  );
}

// Reveal-on-scroll wrapper (fade + slide up)
function Reveal({children, delay=0, y=24, as="div", style={}, once=true}){
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e])=>{
      if(e.isIntersecting){ setShown(true); if(once) io.disconnect(); }
      else if(!once) setShown(false);
    }, {threshold:0.15});
    io.observe(el); return ()=>io.disconnect();
  },[once]);
  const Tag = as;
  return (
    <Tag ref={ref} style={{
      ...style,
      opacity: shown ? 1 : 0,
      transform: shown ? "translateY(0)" : `translateY(${y}px)`,
      transition: `opacity .9s cubic-bezier(.2,.7,.2,1) ${delay}ms, transform .9s cubic-bezier(.2,.7,.2,1) ${delay}ms`,
      willChange:"opacity,transform"
    }}>{children}</Tag>
  );
}

// Word-by-word stagger reveal for headlines
function WordsReveal({text, delay=0, step=60, size=88, color, style={}}){
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(()=>{
    const el = ref.current; if(!el) return;
    const io = new IntersectionObserver(([e])=>{ if(e.isIntersecting){ setShown(true); io.disconnect(); }}, {threshold:0.2});
    io.observe(el); return ()=>io.disconnect();
  },[]);
  const words = text.split(" ");
  return (
    <h1 ref={ref} style={{fontSize:size, lineHeight:.95, letterSpacing:"-.03em", fontWeight:700, color, margin:0, ...style}}>
      {words.map((w,i)=>(
        <span key={i} style={{display:"inline-block", overflow:"hidden", verticalAlign:"top", paddingBottom:".18em"}}>
          <span style={{
            display:"inline-block",
            transform: shown ? "translateY(0)" : "translateY(110%)",
            opacity: shown ? 1 : 0,
            transition:`transform .9s cubic-bezier(.2,.7,.2,1) ${delay + i*step}ms, opacity .6s ease ${delay + i*step}ms`
          }}>{w}{i<words.length-1?"\u00A0":""}</span>
        </span>
      ))}
    </h1>
  );
}

// Marquee — infinite horizontal scroll
function Marquee({items, speed=40, color="var(--cream)", bg="transparent", size=18}){
  const content = [...items, ...items];
  return (
    <div style={{overflow:"hidden", background:bg, padding:"18px 0", borderTop:"1px solid currentColor", borderBottom:"1px solid currentColor", opacity:.9}}>
      <div style={{display:"flex", gap:48, whiteSpace:"nowrap", animation:`mq-scroll ${speed}s linear infinite`, width:"max-content"}}>
        {content.map((t,i)=>(
          <span key={i} className="uc mono" style={{color, fontSize:size, letterSpacing:".2em", display:"inline-flex", alignItems:"center", gap:48}}>
            {t}<span style={{opacity:.4}}>◆</span>
          </span>
        ))}
      </div>
      <style>{`@keyframes mq-scroll { from {transform: translateX(0)} to {transform: translateX(-50%)} }`}</style>
    </div>
  );
}

export { PouraBracket, Clover, Wordmark, PouraCornerMark, Placeholder, Button, Section, Eyebrow, Display, ComplianceNote, Reveal, WordsReveal, Marquee, useViewport };
