/* Format page — describes the delivery format only. No substance names, no mg, no clinical info. */
import React from "react";
import { ComplianceNote, Display, Eyebrow, Section, useViewport } from "./primitives";

function PageFormat({onNav}){
  const { isMobile } = useViewport();
  return (
    <>
    <Section bg="cream" style={{paddingTop:isMobile?100:140, paddingBottom:isMobile?40:60}}>
      <Eyebrow>01 — The Format</Eyebrow>
      <Display size={isMobile?56:112} style={{marginTop:20, maxWidth:1200}}>
        A drink<br/>format for<br/>prescribed<br/>medicine.
      </Display>
      <p style={{fontSize:isMobile?16:20, lineHeight:1.5, maxWidth:680, marginTop:isMobile?24:32, opacity:.8}}>
        Poura is a new way to take a prescribed medicine — mixed into everyday drinks. Flavourless, water-dispersible, and manufactured in Australia.
      </p>
    </Section>

    <Section bg="burgundy" style={{paddingTop:isMobile?60:80, paddingBottom:isMobile?60:80}}>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1.2fr 1fr",gap:isMobile?40:80, alignItems:isMobile?"flex-start":"center"}}>
        <div>
          <Eyebrow>How the format works</Eyebrow>
          <h2 style={{fontSize:isMobile?36:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:isMobile?24:32}}>
            Four steps. No heat. No inhalation.
          </h2>
          <div style={{display:"grid",gap:24}}>
            {[
              ["STEP 01","Pour","Poura is a dried powder that can be mixed into water, tea, juice, or any beverage of your choice."],
              ["STEP 02","Mix","Use the included scoop to measure your prescribed dose from the jar into your choice of drink."],
              ["STEP 03","Stir","Stir for approximately 10 seconds. The formulation disperses fully with no residue and no aftertaste."],
              ["STEP 04","Take","Consume as directed. Your prescriber and pharmacist will provide all instructions specific to you."],
            ].map(([n,t,d])=>(
              <div key={n} style={{display:"grid",gridTemplateColumns:"100px 1fr",gap:20,paddingBottom:20,borderBottom:"1px solid rgba(241,232,208,.18)"}}>
                <div className="mono uc" style={{fontSize:11,letterSpacing:".2em",paddingTop:4,opacity:.7}}>{n}</div>
                <div>
                  <div style={{fontSize:26, fontWeight:700, letterSpacing:"-.01em", marginBottom:6}}>{t}</div>
                  <div style={{fontSize:14, lineHeight:1.55, opacity:.85}}>{d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{position:"relative", aspectRatio:"3/4", overflow:"hidden", background:"var(--burgundy-deep)", borderRadius:30}}>
          <img src="assets/texture-bubbles-clean.jpg" alt=""
            style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block"}}/>
          <div style={{position:"absolute", inset:0, background:"var(--cream)", mixBlendMode:"multiply", opacity:.55, pointerEvents:"none"}}/>
          <div style={{position:"absolute", inset:24, border:"1px solid rgba(241,232,208,.2)", pointerEvents:"none", borderRadius:14}}/>
        </div>
      </div>
    </Section>

    <Section bg="cream" style={{paddingTop:isMobile?60:80, paddingBottom:40}}>
      <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"minmax(0,1.2fr) minmax(0,1fr)", gap:isMobile?28:48, alignItems:"stretch"}}>
        <figure style={{margin:0, position:"relative", overflow:"hidden", borderRadius:30, aspectRatio:"5/4", minWidth:0}}>
          <img src="assets/lifestyle-bottle.jpg" alt="A man drinking from a glass bottle"
            style={{position:"absolute", inset:0, width:"100%", height:"100%", objectFit:"cover", display:"block"}}/>
        </figure>
        <div style={{minWidth:0, display:"flex", flexDirection:"column", justifyContent:"space-between", paddingTop:12}}>
          <div>
            <Eyebrow>Designed for the glass</Eyebrow>
            <h2 style={{fontSize:isMobile?32:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:20, textWrap:"balance"}}>
              A format for the drink you'd be pouring anyway.
            </h2>
            <p style={{fontSize:16, lineHeight:1.6, opacity:.85, marginBottom:16}}>
              Poura disperses fully in liquid. Water, juice, tea, sparkling. The drink you choose does all the work of carrying the dose — the format stays invisible.
            </p>
          </div>
          <div className="mono uc" style={{fontSize:11, letterSpacing:".22em", opacity:.55, borderTop:"1px solid rgba(107,30,40,.2)", paddingTop:16, marginTop:24}}>
            No heat · No inhalation · No equipment
          </div>
        </div>
      </div>
    </Section>

    <Section bg="cream" style={{paddingTop:40}}>
      <Eyebrow>Why a drink format</Eyebrow>
      <h2 style={{fontSize:isMobile?36:56, letterSpacing:"-.02em", lineHeight:1, fontWeight:700, marginTop:16, marginBottom:isMobile?28:40}}>Built to fit an existing life.</h2>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:isMobile?24:32}}>
        {[
          ["Discreet","No smell, no smoke. It looks and tastes like the drink it's mixed into."],
          ["Consistent","The included scoop delivers the same measured dose every time — no guesswork, no variation between servings."],
          ["Familiar","Drinking something is a routine everyone already has. The format disappears into everyday life."],
        ].map(([t,d])=>(
          <div key={t} style={{borderTop:"1.5px solid var(--burgundy)", paddingTop:24}}>
            <h3 style={{fontSize:28, letterSpacing:"-.01em", lineHeight:1.1, fontWeight:700, marginBottom:12}}>{t}</h3>
            <p style={{fontSize:15, lineHeight:1.55, opacity:.85}}>{d}</p>
          </div>
        ))}
      </div>
      <ComplianceNote style={{marginTop:32}}>
        This page describes a delivery format only and is not intended as medical advice. Directions for use, safety information, and full product details are supplied with your prescription by your pharmacist.
      </ComplianceNote>
    </Section>
    </>
  );
}

export { PageFormat };
