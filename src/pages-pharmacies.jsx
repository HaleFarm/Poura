/* For Pharmacies — ordering & dispensing info, generic (no substance specifics) */
import React from "react";
import { Button, ComplianceNote, Display, Eyebrow, Section, useViewport } from "./primitives";

function PagePharmacies({onNav}){
  const { isMobile } = useViewport();
  return (
    <>
    <Section bg="cream" style={{paddingTop:isMobile?100:140,paddingBottom:isMobile?40:60}}>
      <Eyebrow>03 — For Pharmacies</Eyebrow>
      <Display size={isMobile?56:112} style={{marginTop:20, maxWidth:1200}}>
        Dispense<br/>through Aeris<br/>or Leafio.
      </Display>
      <p style={{fontSize:isMobile?16:19, lineHeight:1.5, maxWidth:680, marginTop:isMobile?24:32, opacity:.8}}>
        Poura is a prescription-only medicine, distributed to Australian pharmacies through two authorised wholesalers: <strong style={{fontWeight:600}}>Aeris Health</strong> and <strong style={{fontWeight:600}}>Leafio</strong>. Trade accounts with either are verified against AHPRA registration and pharmacy licensing.
      </p>
    </Section>

    <Section bg="burgundy" style={{paddingTop:60,paddingBottom:60}}>
      <Eyebrow>Distribution</Eyebrow>
      <h2 style={{fontSize:isMobile?32:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:16}}>
        Order through either wholesaler.
      </h2>
      <p style={{fontSize:isMobile?15:16, lineHeight:1.55, opacity:.9, marginBottom:isMobile?28:40, maxWidth:680}}>
        Both distributors run standard order-to-dispense turnaround (2 business days metro, 3–5 regional) with controlled-medicine dispatch procedures and chain-of-custody documentation included on every consignment.
      </p>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"minmax(0,1fr) minmax(0,1fr)",gap:isMobile?20:24}}>
        {[
          {
            name:"Aeris Health",
            tag:"Distributor 01",
            web:"aerishealth.au",
            href:"https://www.aerishealth.au",
            orders:"info@aerishealth.com.au",
            phone:"1300 000 000",
            hours:"Mon–Fri · 8am–6pm AEST"
          },
          {
            name:"Leafio",
            tag:"Distributor 02",
            web:"leafio.com.au",
            href:"https://www.leafio.com.au",
            orders:"info@leafio.com.au",
            phone:"1300 000 000",
            hours:"Mon–Fri · 8am–6pm AEST"
          }
        ].map(d => (
          <div key={d.name} style={{background:"rgba(241,232,208,.08)",border:"1px solid rgba(241,232,208,.2)",padding:"36px 32px", borderRadius:30, display:"flex", flexDirection:"column", gap:24}}>
            <div>
              <div className="uc mono" style={{fontSize:11,letterSpacing:".2em",opacity:.7,marginBottom:18}}>{d.tag}</div>
              <div style={{fontSize:32, fontWeight:700, letterSpacing:"-.01em"}}>{d.name}</div>
            </div>
            <div style={{display:"grid",gap:14}}>
              {[
                ["Web",d.web],
                ["Orders",d.orders],
                ["Phone",d.phone],
                ["Hours",d.hours],
              ].map(([k,v])=>(
                <div key={k} style={{display:"grid",gridTemplateColumns:"80px 1fr",gap:16,fontSize:14,paddingBottom:12,borderBottom:"1px solid rgba(241,232,208,.15)"}}>
                  <div className="mono uc" style={{opacity:.6, letterSpacing:".15em", fontSize:11, paddingTop:2}}>{k}</div>
                  <div style={{wordBreak:"break-word"}}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{marginTop:"auto", display:"flex", gap:12, flexWrap:"wrap"}}>
              <Button kind="blue" as="a" href={d.href} target="_blank" rel="noopener noreferrer" style={{justifyContent:"center"}}>Place an order ↗</Button>
              <Button kind="ghostLight" as="a" href={d.href} target="_blank" rel="noopener noreferrer">Set up account ↗</Button>
            </div>
          </div>
        ))}
      </div>
    </Section>

    <Section bg="cream">
      <Eyebrow>Dispensing</Eyebrow>
      <h2 style={{fontSize:isMobile?36:56, letterSpacing:"-.02em", lineHeight:1, fontWeight:700, marginTop:16, marginBottom:isMobile?28:40}}>
        Before the counter.
      </h2>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:isMobile?20:24}}>
        {[
          {t:"Verify the script", d:"Confirm the prescriber's regulatory pathway is valid and the script meets Australian requirements for the relevant medicine class. Record as required by state and federal regulation."},
          {t:"Patient counselling", d:"Walk patients through directions for use supplied by the prescriber, storage, and any driving or operating-machinery advice. A Consumer Medicine Information sheet is supplied in every box."},
          {t:"Record & report", d:"Log the dispense in the real-time prescription-monitoring system for your state. Maintain storage in line with the medicine's schedule."},
        ].map(x => (
          <div key={x.t} style={{borderTop:"1.5px solid var(--burgundy)",paddingTop:24}}>
            <h3 style={{fontSize:24, letterSpacing:"-.01em", lineHeight:1.15, fontWeight:700, marginBottom:12}}>{x.t}</h3>
            <p style={{fontSize:14, lineHeight:1.55, opacity:.8}}>{x.d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section bg="blue">
      <Eyebrow>Resources</Eyebrow>
      <h2 style={{fontSize:isMobile?32:56, letterSpacing:"-.02em", lineHeight:1, fontWeight:700, marginTop:16, marginBottom:isMobile?28:40, color:"var(--burgundy)"}}>Available to verified pharmacies.</h2>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)",gap:isMobile?12:16}}>
        {[
          ["PDF","Product Information (PI)","Supplied on verification"],
          ["PDF","Consumer Medicine Information (CMI)","Supplied on verification"],
          ["PDF","Pharmacist Dispensing Guide","Supplied on verification"],
          ["PDF","Storage & Chain-of-Custody Checklist","Supplied on verification"],
        ].map(([tag,title,meta])=>(
          <button key={title} style={{
            background:"var(--cream-bright)", color:"var(--burgundy)",
            padding:"24px 28px", textAlign:"left", border:"1px solid rgba(107,30,40,.2)",
            display:"flex", justifyContent:"space-between", alignItems:"center", gap:16,
            borderRadius:30, cursor:"pointer"
          }}>
            <div>
              <div className="mono uc" style={{fontSize:10,letterSpacing:".2em",opacity:.6,marginBottom:8}}>{tag} · {meta}</div>
              <div style={{fontSize:16, fontWeight:500, lineHeight:1.3}}>{title}</div>
            </div>
            <div style={{fontSize:20}}>↓</div>
          </button>
        ))}
      </div>
      <ComplianceNote style={{marginTop:24, color:"var(--burgundy)"}}>
        Resources are supplied directly to verified Australian pharmacies following account activation with either Aeris Health or Leafio. Materials describe the product and its dispensing requirements in line with the Therapeutic Goods Advertising Code; they are not promotional content.
      </ComplianceNote>
    </Section>
    </>
  );
}

export { PagePharmacies };
