/* Home — educational, no substance specifics, no product, no claims */
import React, { useState, useEffect, useRef } from "react";
import { Button, Display, Eyebrow, Marquee, Reveal, Section, WordsReveal, useViewport } from "./primitives";

function PageHome({onNav}){
  const heroRef = useRef(null);
  const [parY, setParY] = useState(0);
  const { isMobile } = useViewport();
  useEffect(()=>{
    const onScroll = ()=> setParY(Math.min(window.scrollY * .3, 180));
    window.addEventListener("scroll", onScroll, {passive:true});
    return ()=> window.removeEventListener("scroll", onScroll);
  },[]);

  return (
    <>
    {/* HERO — full-bleed video/image background, centered copy, dual CTAs */}
    <div ref={heroRef} style={{
      position:"relative", minHeight:"100vh", overflow:"hidden",
      background:"var(--burgundy-deep)", marginTop:"-80px",
      display:"flex", alignItems:"center", justifyContent:"center"
    }}>
      {/* Background layer — looping video starts at 3s */}
      <div style={{position:"absolute", inset:0, transform:`translateY(${parY}px) scale(1.08)`, transition:"transform .2s linear", zIndex:0}}>
        <video autoPlay muted loop playsInline poster="assets/brand-bubbles-plain.jpg"
          style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block"}}>
          <source src="assets/9021870-uhd_3840_2160_25fps.mp4#t=3" type="video/mp4"/>
        </video>
      </div>

      {/* Soft wash — keeps type readable without going dark */}
      <div style={{position:"absolute", inset:0, zIndex:1,
        background:"radial-gradient(ellipse at center, rgba(31,14,19,.15) 0%, rgba(31,14,19,.4) 75%, rgba(31,14,19,.6) 100%)"}}/>
      <div style={{position:"absolute", inset:0, zIndex:1, mixBlendMode:"multiply",
        background:"linear-gradient(180deg, rgba(107,30,40,.15) 0%, rgba(31,14,19,.25) 100%)"}}/>

      {/* Centered copy block */}
      <div style={{position:"relative", zIndex:3, textAlign:"center", maxWidth:1100, padding:"0 32px"}}>
        <Reveal delay={200} y={10}>
          <div className="uc mono" style={{
            color:"var(--blue)", fontSize:12, letterSpacing:".4em",
            marginBottom:36,
            display:"inline-flex", alignItems:"center", gap:18,
            padding:"10px 20px", border:"1px solid rgba(212,221,234,.4)", borderRadius:999
          }}>
            <span style={{width:6, height:6, borderRadius:999, background:"var(--blue)"}}/>
            Introducing a new format
            <span style={{width:6, height:6, borderRadius:999, background:"var(--blue)"}}/>
          </div>
        </Reveal>

        <WordsReveal
          text="A new format for a prescribed medicine."
          size={isMobile ? 44 : 104}
          color="var(--cream)"
          style={{textTransform:"none", marginBottom:isMobile?16:24, letterSpacing:"-.035em", textWrap:"balance", lineHeight:.98, fontWeight:600}}
          delay={300} step={70}
        />

        <Reveal delay={1100} y={12}>
          <p style={{fontSize:isMobile?15:20, lineHeight:1.55, color:"var(--cream)", opacity:.88, maxWidth:680, margin:`0 auto ${isMobile?32:48}px`, textWrap:"pretty"}}>
            Designed to disperse into any beverage — flavourless, residue-free, no equipment, no inhalation. A prescribed medicine that fits the glass already in your hand.
          </p>
        </Reveal>

        <Reveal delay={1300} y={10}>
          <div style={{display:"flex", gap:14, flexWrap:"wrap", justifyContent:"center"}}>
            <Button kind="blue" onClick={()=>onNav("hcp")}>For prescribers →</Button>
            <Button kind="ghostLight" onClick={()=>onNav("pharmacies")}>For pharmacists →</Button>
          </div>
        </Reveal>

      </div>

      {/* Scroll cue — bottom, doesn't compete with centered block */}
      <div style={{position:"absolute", bottom:40, left:"50%", transform:"translateX(-50%)", zIndex:3}}>
        <Reveal delay={1700}>
          <div className="uc mono" style={{color:"var(--blue)", opacity:.5, fontSize:10, letterSpacing:".3em"}}>
            ↓ &nbsp; Scroll
          </div>
        </Reveal>
      </div>
    </div>

    {/* Marquee — moving copy strip */}
    <div style={{background:"var(--burgundy)", color:"var(--blue)"}}>
      <Marquee
        items={["Prescription only","Flavourless","Dispersible in under 10 seconds","No inhalation","Australian GMP","Your drink · Your way"]}
        speed={55} color="var(--blue)" size={16}
      />
    </div>

    <Section bg="cream">
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3, 1fr)",gap:isMobile?24:32}}>
        {[
          {n:"01", t:"A drink format", d:"Mixed into whatever you're already pouring. No inhalation. No equipment. It fits the glass in your hand."},
          {n:"02", t:"Made with care", d:"Manufactured in Australia to pharmaceutical GMP standards, so what's inside is consistent and controlled."},
          {n:"03", t:"Prescription only", d:"Poura is not available over the counter. A registered Australian prescriber decides whether it is appropriate for you."},
        ].map((p,i) => (
          <Reveal key={p.n} delay={i*120}>
            <div style={{borderTop:"1.5px solid var(--burgundy)", paddingTop:24}}>
              <div className="mono uc" style={{fontSize:12, color:"var(--burgundy)", letterSpacing:".2em", marginBottom:18}}>{p.n}</div>
              <h3 style={{fontSize:32, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginBottom:16}}>{p.t}</h3>
              <p style={{fontSize:15, lineHeight:1.55, opacity:.8}}>{p.d}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>

    <Section bg="burgundy" style={{padding: isMobile ? "80px 20px" : "120px 48px"}}>
      <div style={{display:"grid",gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: isMobile ? 40 : 80, alignItems: isMobile ? "flex-start" : "stretch"}}>
        <div>
          <Reveal><Eyebrow>01 — The format</Eyebrow></Reveal>
          <WordsReveal text="Your modern future format." size={isMobile ? 48 : 88} color="var(--cream)" style={{marginTop:20, marginBottom:28, textTransform:"uppercase"}} step={70}/>
          <Reveal delay={400}>
            <p style={{fontSize:17, lineHeight:1.55, marginBottom:24, maxWidth:480, opacity:.9}}>
              For people who want a simpler way to take a prescribed medicine. Poura disappears into a glass — the beverage does the work, and nothing else about your day has to change.
            </p>
          </Reveal>
          <ul style={{listStyle:"none",display:"grid",gap:12, marginBottom:32}}>
            {["Water, tea, juice — whatever you're already pouring","Fully dispersible in under 10 seconds","No flavour, no residue, no aftertaste","No heat, no inhalation, no equipment"].map((x,i)=>(
              <Reveal key={x} delay={500 + i*90} y={12}>
                <li style={{display:"flex",gap:12,alignItems:"flex-start", fontSize:15, lineHeight:1.5}}>
                  <div style={{width:14,height:14,borderRadius:999,border:"1.5px solid var(--blue)",marginTop:3, flexShrink:0}}/>
                  <span>{x}</span>
                </li>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={900}><Button kind="blue" onClick={()=>onNav("format")}>Learn more →</Button></Reveal>
        </div>
        <Reveal delay={200} y={40} style={{display:"flex"}}>
          <div style={{position:"relative", flex:1, overflow:"hidden", background:"var(--burgundy-deep)", borderRadius:30}}>
            <img src="assets/lifestyle-woman-glass.jpg" alt="A person drinking from a glass"
              style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 35%", display:"block", filter:"contrast(0.96) saturate(0.92)"}}/>
            <div style={{position:"absolute",inset:0,border:"1px solid rgba(241,232,208,.25)", borderRadius:30, pointerEvents:"none"}}/>
          </div>
        </Reveal>
      </div>
    </Section>

    <Section bg="cream">
      <Reveal><Eyebrow>Find your path</Eyebrow></Reveal>
      <WordsReveal text="Information, tailored to you." size={isMobile ? 36 : 64} color="var(--ink)" style={{marginTop:14, marginBottom:isMobile?32:48, maxWidth:900, letterSpacing:"-.02em"}} step={60}/>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:isMobile?16:24, alignItems:"stretch"}}>
        {[
          {id:"patients", t:"For Patients", d:"How to start a conversation with your prescriber. How access works in Australia. What to expect at the pharmacy.", tone:"burgundy", cta:"Start here", video:"8676943-uhd_2160_3840_30fps.mp4"},
          {id:"hcp", t:"For Prescribers", d:"Verified clinical resources and regulatory documentation for registered Australian healthcare practitioners.", tone:"green", cta:"Verify & enter", gated:true, video:"8676945-uhd_2160_3840_30fps.mp4"},
          {id:"pharmacies", t:"For Pharmacies", d:"Ordering through Aeris Health or Leafio, dispensing procedures, and counter counselling resources.", tone:"blue", cta:"Trade info", video:"8676946-uhd_2160_3840_30fps.mp4"},
        ].map((c,i) => {
          const bgColor = c.tone==="burgundy"?"var(--burgundy)":c.tone==="green"?"var(--green)":"var(--blue)";
          const overlayColor = c.tone==="burgundy"?"rgba(107,30,40,.78)":c.tone==="green"?"rgba(30,58,43,.78)":"rgba(190,215,226,.7)";
          const borderLineColor = c.tone==="blue"?"rgba(107,30,40,.2)":"rgba(241,232,208,.2)";
          return (
          <Reveal key={c.id} delay={i*150} y={30}>
            <button onClick={()=>onNav(c.id)}
              style={{
                width:"100%",
                position:"relative", overflow:"hidden",
                background: bgColor,
                color: c.tone==="blue"?"var(--burgundy)":"var(--cream)",
                padding: 0, textAlign:"left", height: isMobile ? "auto" : 420,
                minHeight: isMobile ? 280 : undefined,
                borderRadius:30, border:"none", cursor:"pointer", transition:"transform .25s ease"
              }}
              onMouseEnter={e=>e.currentTarget.style.transform="translateY(-4px)"}
              onMouseLeave={e=>e.currentTarget.style.transform="translateY(0)"}>
              <video autoPlay muted loop playsInline
                ref={el => { if (el) el.playbackRate = 0.5; }}
                style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block"}}>
                <source src={`assets/${c.video}`} type="video/mp4"/>
              </video>
              <div style={{position:"absolute", inset:0, background: overlayColor, mixBlendMode: c.tone==="blue"?"normal":"multiply"}}/>
              <div style={{position:"relative", zIndex:1, padding: isMobile ? "28px 24px 24px" : "36px 32px 32px", height:"100%", display:"grid", gridTemplateRows:"auto 1fr auto auto auto"}}>
                <div><Eyebrow>{c.gated?"Gated — HCPs only":"Public"}</Eyebrow></div>
                <div/>
                <h3 style={{fontSize:40, letterSpacing:"-.02em", lineHeight:1, fontWeight:700, marginBottom:16}}>{c.t}</h3>
                <p style={{fontSize:14, lineHeight:1.55, opacity:.95, maxWidth:280, minHeight:92, marginBottom:28}}>{c.d}</p>
                <div className="uc mono" style={{fontSize:12, letterSpacing:".18em", display:"flex", justifyContent:"space-between", borderTop:`1px solid ${borderLineColor}`, paddingTop:20}}>
                  <span>{c.cta}</span><span>→</span>
                </div>
              </div>
            </button>
          </Reveal>
          );
        })}
      </div>
    </Section>

    <Section bg="ink" style={{paddingTop:isMobile?70:100, paddingBottom:isMobile?70:100}}>
      <div style={{display:"grid",gridTemplateColumns:"auto 1fr", gap:24, alignItems:"flex-end", marginBottom:isMobile?32:48}}>
        <Eyebrow color="var(--blue)">Moments</Eyebrow>
        <div style={{height:1, background:"rgba(241,232,208,.2)", marginBottom:8}}/>
      </div>
      <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"minmax(0,1fr) minmax(0,1fr)", gap:isMobile?20:40, alignItems:"stretch"}}>
        <Reveal y={30}>
          <figure style={{margin:0, position:"relative", overflow:"hidden", borderRadius:30, aspectRatio:"4/3", minWidth:0}}>
            <img src="assets/lifestyle-straw.jpg" alt="A person sipping a glass of water with lemon"
              style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block"}}/>
            <figcaption style={{
              position:"absolute", left:24, right:24, bottom:24,
              color:"var(--cream)"
            }}>
              <div className="uc mono" style={{fontSize:11, letterSpacing:".22em", opacity:.9, textShadow:"0 1px 12px rgba(0,0,0,.5)"}}>
                The morning glass
              </div>
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={180} y={30}>
          <figure style={{margin:0, position:"relative", overflow:"hidden", borderRadius:30, aspectRatio:"4/3", minWidth:0}}>
            <img src="assets/lifestyle-bottle.jpg" alt="A person drinking from a water bottle outdoors"
              style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block"}}/>
            <figcaption style={{
              position:"absolute", left:24, right:24, bottom:24,
              color:"var(--cream)"
            }}>
              <div className="uc mono" style={{fontSize:11, letterSpacing:".22em", opacity:.9, textShadow:"0 1px 12px rgba(0,0,0,.5)"}}>
                The afternoon break
              </div>
            </figcaption>
          </figure>
        </Reveal>
      </div>
      <div style={{marginTop:isMobile?32:48, display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1.3fr", gap:isMobile?28:64, alignItems:"flex-start"}}>
        <div>
          <WordsReveal text="The glass is already" size={isMobile?32:44} color="var(--cream)" style={{letterSpacing:"-.02em"}} step={50}/>
          <WordsReveal text="in your hand." size={isMobile?32:44} color="var(--cream)" style={{letterSpacing:"-.02em"}} step={50} delay={220}/>
        </div>
        <Reveal delay={400}>
          <p style={{fontSize:16, lineHeight:1.6, color:"var(--cream)", opacity:.8, maxWidth:560}}>
            A prescribed medicine that fits into a routine you already have — the water on your bedside table, the bottle in your bag, the drink after a walk. No new habit, no new equipment, no reason to stop what you're doing.
          </p>
        </Reveal>
      </div>
    </Section>

    <Section bg="green">
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1.2fr", gap:isMobile?32:80, alignItems:isMobile?"flex-start":"center"}}>
        <div>
          <Reveal><Eyebrow color="var(--cream)">A word from us</Eyebrow></Reveal>
          <WordsReveal text="A new format for a prescribed medicine." size={isMobile?40:72} color="var(--cream)" style={{marginTop:20, marginBottom:28, textTransform:"uppercase"}} step={70}/>
        </div>
        <div>
          <Reveal delay={200}>
            <p style={{fontSize:20,lineHeight:1.55,color:"var(--cream)",marginBottom:20, textWrap:"pretty"}}>
              For now, Poura is a prescription-only medicine — regulated, supervised by Australian prescribers, dispensed through pharmacies. We believe a prescribed medicine deserves a format built for how people actually drink.
            </p>
          </Reveal>
          <Reveal delay={350}>
            <p style={{fontSize:15,lineHeight:1.55,color:"var(--cream)",opacity:.7, maxWidth:540}}>
              This website is educational. You won't find therapeutic claims, product photography, or clinical information here. For questions about whether a medicine is right for you, speak with a registered healthcare practitioner.
            </p>
          </Reveal>
        </div>
      </div>
    </Section>
    </>
  );
}

export { PageHome };
