/* FAQs + Contact — no substance specifics, no claims */
import React, { useState } from "react";
import { ComplianceNote, Display, Eyebrow, Section } from "./primitives";

function PageFaqs(){
  const [open, setOpen] = useState(0);
  const items = [
    ["Is Poura legal in Australia?","Yes. Poura is a prescription-only medicine accessed through Australia's established regulatory pathways — either the Special Access Scheme Category B (SAS-B) or through a TGA Authorised Prescriber. It is not available over the counter and cannot be imported by individuals."],
    ["Can I drive after taking Poura?","Australian road-safety law is strict about driving while taking certain prescribed medicines, even with a valid prescription. Ask your prescriber specifically about driving and operating machinery before starting any new medicine."],
    ["What does the format taste like?","Poura is formulated to be flavourless and disperses in liquid without altering the drink's taste or appearance."],
    ["Is it covered by PBS or private health?","Poura is not currently on the Pharmaceutical Benefits Scheme. Some private health funds offer partial rebates on certain prescription medicines. Your pharmacist can advise on pricing."],
    ["Where is it manufactured?","Poura is manufactured in Australia to pharmaceutical GMP standards. Every batch is tested and released in line with Australian regulatory requirements."],
    ["I'm a pharmacist — where do I order?","Poura is distributed in Australia through two authorised wholesalers: Aeris Health (aerishealth.au / info@aerishealth.com.au) and Leafio (leafio.com.au / info@leafio.com.au). Either can set up a verified trade account."],
    ["I'm a prescriber — how do I get clinical information?","Product-specific information is supplied directly to verified Australian prescribers via our medical affairs team. Complete the verification step in the Prescribers area to request access."],
    ["Will Poura help with my condition?","Whether any prescription medicine is appropriate for your condition is a clinical decision for your registered healthcare practitioner. We cannot answer this question on our website, and any company making that claim would be in breach of Australian advertising law."],
  ];
  return (
    <>
    <Section bg="cream" style={{paddingTop:140,paddingBottom:40}}>
      <Eyebrow>FAQs</Eyebrow>
      <Display size={112} style={{marginTop:20}}>Questions,<br/>answered.</Display>
    </Section>
    <Section bg="cream" style={{paddingTop:20,paddingBottom:120}}>
      <div style={{maxWidth:900, margin:"0 auto"}}>
        {items.map(([q,a],i)=>(
          <div key={i} style={{borderTop:"1px solid rgba(107,30,40,.25)"}}>
            <button onClick={()=>setOpen(open===i?-1:i)}
              style={{width:"100%",display:"flex",justifyContent:"space-between",alignItems:"center",padding:"28px 0",textAlign:"left",color:"var(--burgundy)",gap:24}}>
              <span style={{fontSize:22, fontWeight:600, letterSpacing:"-.01em", lineHeight:1.25}}>{q}</span>
              <span style={{fontSize:24, width:40,height:40, display:"flex",alignItems:"center",justifyContent:"center",border:"1px solid var(--burgundy)", borderRadius:999, flexShrink:0, transform:open===i?"rotate(45deg)":"none", transition:"transform .25s"}}>+</span>
            </button>
            {open===i && (
              <div style={{paddingBottom:28, paddingRight:64, fontSize:16, lineHeight:1.6, color:"var(--ink)", opacity:.85}}>
                {a}
              </div>
            )}
          </div>
        ))}
        <div style={{borderTop:"1px solid rgba(107,30,40,.25)"}}/>
      </div>
    </Section>
    </>
  );
}

function PageContact(){
  return (
    <>
    <Section bg="cream" style={{paddingTop:140,paddingBottom:60}}>
      <Eyebrow>Contact</Eyebrow>
      <Display size={112} style={{marginTop:20}}>Get in touch.</Display>
    </Section>
    <Section bg="burgundy" style={{paddingTop:60,paddingBottom:100}}>
      <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:32}}>
        {[
          {t:"Pharmacy orders",l:["Distributors: Aeris Health · Leafio","info@aerishealth.com.au","info@leafio.com.au","aerishealth.au ↗ · leafio.com.au ↗"]},
          {t:"Medical affairs",l:["For verified HCPs only","info@halefarm.com.au","Clinical queries and regulatory documentation"]},
          {t:"Press & general",l:["info@halefarm.com.au"]},
        ].map(c=>(
          <div key={c.t} style={{borderTop:"1.5px solid var(--cream)", paddingTop:24}}>
            <div className="uc mono" style={{fontSize:11,letterSpacing:".2em",opacity:.7,marginBottom:18}}>{c.t}</div>
            <div style={{display:"grid",gap:10,fontSize:16, lineHeight:1.5}}>
              {c.l.map((x,i)=><div key={i} style={{opacity: i===0?1:.85}}>{x}</div>)}
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:80, padding:"36px 40px", background:"rgba(241,232,208,.08)", border:"1px solid rgba(241,232,208,.2)", borderRadius:30}}>
        <ComplianceNote style={{color:"var(--cream)", opacity:.75, maxWidth:"none"}}>
          We cannot respond to patient queries about whether a particular medicine is suitable for an individual. Those questions must be directed to a registered Australian healthcare practitioner. Media enquiries welcome.
        </ComplianceNote>
      </div>
    </Section>
    </>
  );
}

export { PageFaqs, PageContact };
