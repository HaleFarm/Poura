/* Top nav, Age-gate modal, Footer, regulatory banner */
import React, { useState, useEffect } from "react";
import { PouraBracket, Eyebrow, Button, ComplianceNote, useViewport } from "./primitives";

const NAV = [
  {id:"home", label:"Home"},
  {id:"format", label:"The Format"},
  {id:"patients", label:"For Patients"},
  {id:"pharmacies", label:"For Pharmacies"},
  {id:"hcp", label:"For Prescribers"},
  {id:"faqs", label:"FAQs"},
  {id:"contact", label:"Contact"},
];

function TopNav({route, onNav, theme="cream"}){
  const [scrolled, setScrolled] = useState(false);
  const [w, setW] = useState(()=> typeof window !== "undefined" ? window.innerWidth : 1400);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(()=>{
    const on = () => setScrolled(window.scrollY > 8);
    const onR = () => setW(window.innerWidth);
    on(); window.addEventListener("scroll", on);
    window.addEventListener("resize", onR);
    return ()=>{ window.removeEventListener("scroll", on); window.removeEventListener("resize", onR); };
  },[]);
  const dark = theme === "burgundy" || theme === "green" || theme === "ink";
  const bg = dark ? "var(--burgundy)" : "var(--cream)";
  const fg = dark ? "var(--cream)" : "var(--burgundy)";
  const logoColor = dark ? "blue" : "burgundy";
  const isMobile = w < 1100;

  const navClick = (id) => { setMenuOpen(false); onNav(id); };

  return (
    <header style={{
      position:"sticky", top:0, zIndex:50,
      background: scrolled || menuOpen ? bg : "transparent",
      color:fg,
      backdropFilter: scrolled ? "blur(6px)" : "none",
      borderBottom: (scrolled||menuOpen) ? `1px solid ${dark?"rgba(241,232,208,.15)":"rgba(107,30,40,.15)"}` : "1px solid transparent",
      transition:"all .25s ease"
    }}>
      <div style={{maxWidth:1400, margin:"0 auto", padding: isMobile?"14px 20px":"18px 48px", display:"flex", alignItems:"center", justifyContent:"space-between", gap:16}}>
        <button onClick={()=>navClick("home")} style={{display:"flex", alignItems:"center"}}>
          <img src="assets/poura-logo-nav.png" alt="Poura"
            style={{
              height: isMobile?22:26, width:"auto", display:"block",
              filter: logoColor==="burgundy"
                ? "brightness(0) saturate(100%) invert(11%) sepia(52%) saturate(2283%) hue-rotate(330deg) brightness(95%) contrast(92%)"
                : logoColor==="blue"
                ? "brightness(0) saturate(100%) invert(89%) sepia(12%) saturate(446%) hue-rotate(170deg) brightness(95%) contrast(88%)"
                : "brightness(0) saturate(100%) invert(95%) sepia(8%) saturate(388%) hue-rotate(10deg) brightness(99%) contrast(92%)"
            }}/>
        </button>
        {!isMobile && (
          <nav style={{display:"flex",gap:2,alignItems:"center"}}>
            {NAV.map(n => (
              <button key={n.id} onClick={()=>navClick(n.id)}
                style={{
                  padding:"8px 10px", fontSize:12, letterSpacing:".04em",
                  textTransform:"uppercase", fontWeight: route===n.id ? 600 : 400,
                  color: fg,
                  borderBottom: route===n.id ? `1.5px solid ${fg}` : "1.5px solid transparent",
                  borderRadius:0, whiteSpace:"nowrap"
                }}>
                {n.label}
              </button>
            ))}
          </nav>
        )}
        <div style={{display:"flex",gap:10,alignItems:"center"}}>
          {!isMobile && (
            <button onClick={()=>navClick("pharmacies")}
               style={{
                 padding:"9px 16px", fontSize:11, letterSpacing:".08em", whiteSpace:"nowrap",
                 textTransform:"uppercase", border:`1px solid ${fg}`, borderRadius:999,
                 color: fg, background:"transparent", cursor:"pointer", fontFamily:"var(--mono)"
               }}>
               Order — Aeris or Leafio
            </button>
          )}
          {isMobile && (
            <button onClick={()=>setMenuOpen(v=>!v)} aria-label="Menu"
              style={{padding:8, color:fg, display:"flex", flexDirection:"column", gap:4}}>
              <span style={{width:22,height:1.5,background:fg, transform: menuOpen?"translateY(5px) rotate(45deg)":"none", transition:".2s"}}/>
              <span style={{width:22,height:1.5,background:fg, opacity: menuOpen?0:1, transition:".2s"}}/>
              <span style={{width:22,height:1.5,background:fg, transform: menuOpen?"translateY(-5px) rotate(-45deg)":"none", transition:".2s"}}/>
            </button>
          )}
        </div>
      </div>
      {isMobile && menuOpen && (
        <div style={{background: bg, borderTop:`1px solid ${dark?"rgba(241,232,208,.15)":"rgba(107,30,40,.15)"}`, padding:"16px 20px 28px"}}>
          <nav style={{display:"flex",flexDirection:"column"}}>
            {NAV.map(n => (
              <button key={n.id} onClick={()=>navClick(n.id)}
                style={{
                  padding:"14px 0", fontSize:18, letterSpacing:"-.01em",
                  fontWeight: route===n.id ? 700 : 500,
                  color: fg, textAlign:"left",
                  borderBottom: `1px solid ${dark?"rgba(241,232,208,.1)":"rgba(107,30,40,.1)"}`
                }}>
                {n.label}
              </button>
            ))}
            <button onClick={()=>navClick("pharmacies")}
               style={{
                 marginTop:20, padding:"14px 20px", fontSize:12, letterSpacing:".08em",
                 textTransform:"uppercase", border:`1px solid ${fg}`, borderRadius:999,
                 color: fg, textAlign:"center", background:"transparent", cursor:"pointer", fontFamily:"var(--mono)"
               }}>
               Order — Aeris or Leafio
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}

function RegulatoryBanner(){
  const { isMobile } = useViewport();
  return (
    <div style={{background:"var(--ink)",color:"var(--cream)",padding:isMobile?"14px 20px":"18px 48px",textAlign:"center",fontSize:isMobile?10:11,letterSpacing:".12em", lineHeight:1.5}} className="uc mono">
      This site contains general information about a prescription-only medicine. Available only on prescription from a registered Australian healthcare practitioner.
    </div>
  );
}

function AgeGate({onAccept}){
  const [checked, setChecked] = useState(false);
  return (
    <div style={{
      position:"fixed",inset:0,zIndex:100,
      background:"rgba(26,15,16,.92)", backdropFilter:"blur(8px)",
      display:"flex",alignItems:"center",justifyContent:"center",padding:24
    }}>
      <div style={{background:"var(--cream)", color:"var(--ink)", maxWidth:540, width:"100%", padding:"48px 44px", borderRadius:30}}>
        <div style={{display:"flex",justifyContent:"center",marginBottom:28}}>
          <PouraBracket color="burgundy" height={44}/>
        </div>
        <Eyebrow>Before you enter</Eyebrow>
        <h2 style={{fontSize:28, letterSpacing:"-.02em", lineHeight:1.1, marginTop:10, marginBottom:16, fontWeight:700}}>
          General information about a prescription-only medicine.
        </h2>
        <p style={{fontSize:14, lineHeight:1.55, marginBottom:20, color:"var(--ink)"}}>
          Poura is a prescription-only medicine in Australia, accessed through the established regulatory pathways with a registered healthcare practitioner. The information that follows is general and educational — it is not medical advice and does not promote use of any specific product.
        </p>
        <label style={{display:"flex",gap:10, alignItems:"flex-start", marginBottom:24, fontSize:13, lineHeight:1.5}}>
          <input type="checkbox" checked={checked} onChange={e=>setChecked(e.target.checked)} style={{marginTop:3, accentColor:"var(--burgundy)"}}/>
          <span>I confirm I am 18 years or older, and I understand this site contains general information about a prescription-only medicine.</span>
        </label>
        <Button kind="primary" onClick={onAccept} style={{opacity:checked?1:.4, pointerEvents:checked?"auto":"none", width:"100%", justifyContent:"center"}}>
          Enter site →
        </Button>
        <div style={{marginTop:20, paddingTop:20, borderTop:"1px solid rgba(0,0,0,.1)"}}>
          <ComplianceNote>
            If you are in crisis or need medical help, call 000. For mental health support, call Lifeline on 13 11 14. Never adjust a prescription without consulting your healthcare provider.
          </ComplianceNote>
        </div>
      </div>
    </div>
  );
}

function Footer({onNav}){
  const { isMobile } = useViewport();
  return (
    <footer style={{background:"var(--ink)", color:"var(--cream)"}}>
      <div style={{maxWidth:1400, margin:"0 auto", padding:isMobile?"60px 20px 30px":"80px 48px 40px"}}>
        <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"1.4fr 1fr 1fr 1fr", gap:isMobile?32:48, marginBottom:isMobile?40:64}}>
          <div>
            <div style={{marginBottom:20}}>
              <img src="assets/poura-logo-cream-bracket.png" alt="Poura" style={{height:44, width:"auto"}}/>
            </div>
            <div className="uc mono" style={{fontSize:11, letterSpacing:".2em", opacity:.7, marginBottom:24}}>
              Your drink. Your way.
            </div>
            <p style={{fontSize:13, lineHeight:1.6, opacity:.8, maxWidth:320}}>
              A prescription-only medicine, dispensed by Australian pharmacies on valid prescription.
            </p>
            <a href="mailto:info@halefarm.com.au" style={{display:"inline-block", marginTop:20, fontSize:14, opacity:.9, borderBottom:"1px solid rgba(241,232,208,.3)", paddingBottom:2}}>info@halefarm.com.au</a>
          </div>
          <div>
            <div className="uc mono" style={{fontSize:11, letterSpacing:".18em", opacity:.6, marginBottom:16}}>Learn</div>
            {[["format","The Format"],["patients","For Patients"],["faqs","FAQs"]].map(([id,l])=>(
              <button key={id} onClick={()=>onNav(id)} style={{display:"block",padding:"6px 0",fontSize:14,color:"var(--cream)"}}>{l}</button>
            ))}
          </div>
          <div>
            <div className="uc mono" style={{fontSize:11, letterSpacing:".18em", opacity:.6, marginBottom:16}}>Trade</div>
            {[["pharmacies","For Pharmacies"],["hcp","For Prescribers"],["contact","Contact"]].map(([id,l])=>(
              <button key={id} onClick={()=>onNav(id)} style={{display:"block",padding:"6px 0",fontSize:14,color:"var(--cream)"}}>{l}</button>
            ))}
          </div>
          <div>
            <div className="uc mono" style={{fontSize:11, letterSpacing:".18em", opacity:.6, marginBottom:16}}>Distributor</div>
            <a href="https://www.aerishealth.au" target="_blank" rel="noopener" style={{display:"block",padding:"6px 0",fontSize:14}}>aerishealth.au ↗</a>
            <div style={{fontSize:13, opacity:.7, marginTop:8}}>Authorised pharmacy orders only</div>
          </div>
        </div>
        <div style={{borderTop:"1px solid rgba(241,232,208,.2)", paddingTop:32, display:"flex", flexDirection:"column", gap:18}}>
          <ComplianceNote style={{opacity:.7, color:"var(--cream)"}}>
            <strong style={{fontWeight:600}}>Regulatory notice.</strong> Poura is a prescription-only medicine in Australia. It is available only with a valid prescription through the established Australian regulatory pathways. This website is intended as general educational information for Australian residents aged 18 and over. It does not constitute medical advice, a therapeutic claim, or an offer of supply to the general public, and is not intended to advertise a therapeutic good in contravention of the <em>Therapeutic Goods Act 1989</em> or the TGA Advertising Code.
          </ComplianceNote>
          <ComplianceNote style={{opacity:.7, color:"var(--cream)"}}>
            Always follow directions given to you by your prescriber and pharmacist. Ask your prescriber before driving or operating machinery while taking any prescribed medicine. If you need medical help, call 000.
          </ComplianceNote>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginTop:12, flexWrap:"wrap",gap:12}}>
            <div className="uc mono" style={{fontSize:11, letterSpacing:".15em", opacity:.5}}>© 2026 Poura Pty Ltd · Sydney, Australia · ABN 00 000 000 000</div>
            <div style={{display:"flex",gap:20,fontSize:12,opacity:.6}} className="uc mono">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Code of Conduct</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export { TopNav, AgeGate, Footer, RegulatoryBanner, NAV };
