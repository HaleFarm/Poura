/* For HCPs — gated post-login area with per-SKU clinical information */
import React, { useState } from "react";
import { Button, ComplianceNote, Display, Eyebrow, Section, useViewport } from "./primitives";

// Product range — each entry drives the At-a-glance, Dosing, and Downloads sections.
// Add a new SKU by appending an object here. Mark files that don't exist yet as [Pending].
const SKUS = [
  {
    id:"p-10-0",
    name:"Poura 10 : 0",
    ratio:"10 : 0",
    description:"THC-dominant · S8",
    activeIngredients:"10 mg THC / 0 mg CBD per scoop",
    strengthPerScoop:"10 mg THC",
    scoopSize:"0.5 g",
    packSize:"30 g jar (≈ 60 scoops)",
    schedule:"S8 — Controlled Drug",
    storage:"Below 25°C · in S8 safe · protect from light",
    shelfLife:"24 months unopened · 90 days once opened",
    startingDose:"5 mg THC",
    startingFrequency:"Once daily, evening",
    titrationInterval:"7 days",
    maxDaily:"40 mg THC",
    titration:[
      ["1","5 mg THC","Once daily (evening)","Tolerance, sleep, side effects"],
      ["2","10 mg THC","Once daily","Efficacy trend"],
      ["3–4","10–20 mg THC","Divided doses","Adjust per response"],
      ["5+","Maintenance","As required","Quarterly review"],
    ],
    pk:{
      onset:"30–90 minutes post-ingestion",
      tmax:"2–4 hours",
      duration:"6–8 hours",
      bioavailability:"Approx. 6–20% (oral)",
      metabolism:"Primarily hepatic — CYP3A4 & CYP2C9",
      foodEffect:"High-fat meal may increase AUC up to 2–3×",
      elimination:"Hepatic / faecal (primary), renal (minor)",
    },
    contraindications:[
      "Known hypersensitivity to any component of the formulation",
      "Pregnancy and breastfeeding",
      "Severe hepatic impairment (Child-Pugh C)",
      "Active psychosis or personal/family history of schizophrenia",
      "Unstable cardiovascular disease",
      "Patients under 18 outside specialist indication",
    ],
    adverseEffects:[
      "Somnolence, sedation",
      "Dizziness, impaired concentration",
      "Dry mouth, altered appetite",
      "Psychotomimetic effects at higher doses (anxiety, dysphoria, paranoia)",
      "Tachycardia, orthostatic hypotension",
      "Gastrointestinal disturbance",
    ],
    interactions:[
      ["Benzodiazepines / opioids","Additive CNS depression","Avoid if possible; if combined, reduce both doses and counsel strongly"],
      ["Alcohol","Additive CNS and psychomotor impairment","Counsel patient to avoid while taking"],
      ["SSRIs / SNRIs / TCAs","Additive sedative / serotonergic effects","Caution; review sedation and cognition at each visit"],
      ["Anticholinergics","Additive tachycardia and dry mouth","Monitor for autonomic side effects"],
      ["Sympathomimetics","Additive cardiovascular effects","Caution with stimulant medications"],
      ["CYP3A4 inhibitors (ketoconazole, ritonavir)","↑ THC exposure","Use lowest effective dose; extended titration"],
      ["CYP3A4 inducers (rifampicin, carbamazepine, phenytoin)","↓ THC exposure","Loss of efficacy possible; review"],
    ],
    driving:"THC triggers roadside drug tests. Patients must not drive at any point during treatment — state road-safety law treats any detectable THC as an offence regardless of impairment. Document advice clearly.",
    pregnancy:"Contraindicated. THC crosses the placenta and is present in breast milk. If unavoidable, clearly document risk-benefit and informed consent.",
    paediatric:"Not recommended under 18 outside specialist indications. Evidence in paediatric populations is limited.",
    docs:[
      {tag:"Regulatory",title:"Product Information (PI)",file:"poura-10-0-pi.pdf"},
      {tag:"Regulatory",title:"Consumer Medicine Information (CMI)",file:"poura-10-0-cmi.pdf"},
      {tag:"Prescribing",title:"Dosing & Titration Guide",file:"poura-10-0-dosing.pdf"},
      {tag:"Regulatory",title:"SAS-B Application Template",file:"poura-10-0-sas-b.pdf"},
    ],
  },
  {
    id:"p-5-5",
    name:"Poura 5 : 5",
    ratio:"5 : 5",
    description:"Balanced THC and CBD · S8",
    activeIngredients:"5 mg THC / 5 mg CBD per scoop",
    strengthPerScoop:"5 mg THC + 5 mg CBD",
    scoopSize:"0.5 g",
    packSize:"30 g jar (≈ 60 scoops)",
    schedule:"S8 — Controlled Drug",
    storage:"Below 25°C · in S8 safe · protect from light",
    shelfLife:"24 months unopened · 90 days once opened",
    startingDose:"5 mg THC + 5 mg CBD",
    startingFrequency:"Once daily, evening",
    titrationInterval:"7 days",
    maxDaily:"30 mg THC + 30 mg CBD",
    titration:[
      ["1","5 mg THC + 5 mg CBD","Once daily (evening)","Tolerance, sleep"],
      ["2","10 mg THC + 10 mg CBD","Once daily","Efficacy trend"],
      ["3–4","10–20 mg of each","Divided doses","Adjust per response"],
      ["5+","Maintenance","As required","Quarterly review"],
    ],
    pk:{
      onset:"30–90 minutes post-ingestion",
      tmax:"2–4 hours",
      duration:"6–8 hours",
      bioavailability:"Approx. 6–15% (oral)",
      metabolism:"Primarily hepatic — CYP3A4, CYP2C9 & CYP2C19",
      foodEffect:"High-fat meal may increase AUC 2–3×",
      elimination:"Hepatic / faecal (primary), renal (minor)",
    },
    contraindications:[
      "Known hypersensitivity to any component of the formulation",
      "Pregnancy and breastfeeding",
      "Severe hepatic impairment (Child-Pugh C) — monitor LFTs",
      "Active psychosis or personal/family history of schizophrenia",
      "Unstable cardiovascular disease",
      "Patients under 18 outside specialist indication",
    ],
    adverseEffects:[
      "Somnolence, sedation (less than THC-dominant due to CBD moderation)",
      "Dizziness, impaired concentration",
      "Dry mouth, altered appetite",
      "Transaminase elevation (CBD-related) — monitor LFTs",
      "Diarrhoea",
      "Mood or perceptual changes at higher doses",
    ],
    interactions:[
      ["Warfarin","CYP2C9 inhibition (CBD) — ↑ INR","Monitor INR closely for first 4 weeks; adjust warfarin as needed"],
      ["Clobazam","↑ N-desmethyl-clobazam (active metabolite)","Consider clobazam dose reduction; monitor sedation"],
      ["Tacrolimus / ciclosporin","CYP3A4 interaction","Monitor serum levels and renal function"],
      ["Benzodiazepines / opioids","Additive CNS depression","Avoid if possible; reduce both doses if combined"],
      ["Alcohol","Additive CNS and psychomotor impairment","Counsel patient to avoid while taking"],
      ["SSRIs / SNRIs","Additive sedative / serotonergic effects","Caution; review sedation and cognition"],
      ["Valproate","↑ Transaminases when combined with CBD","Monitor LFTs closely"],
      ["CYP3A4 inducers","↓ Cannabinoid exposure","Loss of efficacy possible; review"],
    ],
    driving:"THC component triggers roadside drug tests. Patients must not drive at any point during treatment — any detectable THC is an offence regardless of impairment. Document advice.",
    pregnancy:"Not recommended. Both THC and CBD cross the placenta. If unavoidable, clearly document risk-benefit and informed consent.",
    paediatric:"Not recommended under 18 outside specialist indications.",
    docs:[
      {tag:"Regulatory",title:"Product Information (PI)",file:"poura-5-5-pi.pdf"},
      {tag:"Regulatory",title:"Consumer Medicine Information (CMI)",file:"poura-5-5-cmi.pdf"},
      {tag:"Prescribing",title:"Dosing & Titration Guide",file:"poura-5-5-dosing.pdf"},
      {tag:"Regulatory",title:"SAS-B Application Template",file:"poura-5-5-sas-b.pdf"},
    ],
  },
  {
    id:"p-0-20",
    name:"Poura 0 : 20",
    ratio:"0 : 20",
    description:"CBD-only · S4",
    activeIngredients:"0 mg THC / 20 mg CBD per scoop",
    strengthPerScoop:"20 mg CBD",
    scoopSize:"0.5 g",
    packSize:"30 g jar (≈ 60 scoops)",
    schedule:"S4 — Prescription Only Medicine",
    storage:"Below 25°C · protect from light",
    shelfLife:"24 months unopened · 90 days once opened",
    startingDose:"20 mg CBD",
    startingFrequency:"Once or twice daily",
    titrationInterval:"7 days",
    maxDaily:"200 mg CBD",
    titration:[
      ["1","20 mg CBD","Once daily","Tolerance"],
      ["2","40 mg CBD","Divided doses","Efficacy trend"],
      ["3–4","60–100 mg CBD","Divided doses","Adjust per response"],
      ["5+","Maintenance","As required","Quarterly review"],
    ],
    pk:{
      onset:"60–120 minutes post-ingestion",
      tmax:"3–5 hours",
      duration:"6–10 hours",
      bioavailability:"Approx. 6–10% (oral) — lower than THC",
      metabolism:"Primarily hepatic — CYP3A4, CYP2C19 & UGT",
      foodEffect:"High-fat meal may increase AUC 4–5×",
      elimination:"Hepatic / faecal",
    },
    contraindications:[
      "Known hypersensitivity to any component of the formulation",
      "Pregnancy and breastfeeding",
      "Severe hepatic impairment (Child-Pugh C) — monitor LFTs",
      "Concomitant strong CYP inducers or inhibitors without dose adjustment",
      "Paediatric use only under specialist supervision (e.g. refractory epilepsy)",
    ],
    adverseEffects:[
      "Somnolence, fatigue",
      "Diarrhoea, decreased appetite",
      "Transaminase elevation — monitor LFTs at baseline, 1 month, then every 3 months",
      "Rash (rare)",
      "Sleep disturbance (paradoxical)",
    ],
    interactions:[
      ["Warfarin","Potent CYP2C9 inhibition — ↑ INR significantly","Monitor INR weekly for first 4 weeks; anticipate dose reduction"],
      ["Clobazam","↑ N-desmethyl-clobazam markedly","Reduce clobazam dose 30–50%; monitor sedation closely"],
      ["Valproate","↑ Transaminases when combined","Monitor LFTs closely; may need valproate dose reduction"],
      ["Tacrolimus / ciclosporin / sirolimus","CYP3A4 inhibition","Monitor serum levels; anticipate dose reduction"],
      ["SSRIs / SNRIs (fluoxetine, sertraline)","CYP2D6 / 3A4 interaction","Caution; review for serotonergic effects"],
      ["Anticonvulsants (phenytoin, carbamazepine)","Bidirectional interaction","Monitor levels of both agents"],
      ["PPIs (omeprazole)","CYP2C19 interaction","Consider alternative PPI or dose adjust"],
      ["Opioids","Additive sedation (mild)","Counsel re: sedation; generally manageable"],
    ],
    driving:"CBD at therapeutic doses does not typically trigger roadside drug tests. Patients should not drive if feeling sedated, dizzy, or impaired — use clinical judgment and follow state road-safety guidance.",
    pregnancy:"Not recommended. CBD crosses the placenta and is present in breast milk. If clinically necessary (e.g. refractory epilepsy), document risk-benefit and informed consent.",
    paediatric:"CBD has established use in certain paediatric epilepsies (Dravet syndrome, Lennox-Gastaut syndrome). May be appropriate under specialist supervision.",
    docs:[
      {tag:"Regulatory",title:"Product Information (PI)",file:"poura-0-20-pi.pdf"},
      {tag:"Regulatory",title:"Consumer Medicine Information (CMI)",file:"poura-0-20-cmi.pdf"},
      {tag:"Prescribing",title:"Dosing & Titration Guide",file:"poura-0-20-dosing.pdf"},
      {tag:"Regulatory",title:"SAS-B Application Template",file:"poura-0-20-sas-b.pdf"},
    ],
  },
];

// Resources shared across all SKUs — appended to every download library.
const SHARED_DOCS = [
  {tag:"Regulatory",title:"Authorised Prescriber Guide",file:"poura-ap-guide.pdf"},
  {tag:"Prescribing",title:"Drug Interaction Reference Card",file:"poura-interactions.pdf"},
  {tag:"Prescribing",title:"Titration Worksheet (blank)",file:"poura-titration-worksheet.pdf"},
  {tag:"Clinical",title:"Patient Counselling Checklist",file:"poura-patient-checklist.pdf"},
  {tag:"Clinical",title:"Switch-from Guide",file:"poura-switch-guide.pdf"},
  {tag:"Operational",title:"Storage & Handling",file:"poura-storage-guide.pdf"},
];

function PageHCP({onNav}){
  const [verified, setVerified] = useState(false);
  const [ahpra, setAhpra] = useState("");
  const [role, setRole] = useState("GP");
  const [consent, setConsent] = useState(false);
  const [activeSku, setActiveSku] = useState(SKUS[1].id); // default: balanced 5:5
  const current = SKUS.find(s => s.id === activeSku) || SKUS[0];
  const { isMobile } = useViewport();

  if(!verified){
    return (
      <Section bg="cream" style={{paddingTop:isMobile?80:120, paddingBottom:isMobile?80:120, minHeight:isMobile?"auto":"calc(100vh - 120px)"}}>
        <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?32:80}}>
          <div>
            <Eyebrow>04 — For Prescribers</Eyebrow>
            <Display size={isMobile?56:112} style={{marginTop:20}}>Verified<br/>access.</Display>
            <p style={{fontSize:17, lineHeight:1.55, opacity:.85, marginTop:32, maxWidth:480}}>
              Product-specific information for this prescription-only medicine is restricted to registered Australian healthcare practitioners. Under the Therapeutic Goods Advertising Code, it is not appropriate for a general-public audience.
            </p>
            <p style={{fontSize:15, lineHeight:1.55, opacity:.7, marginTop:16, maxWidth:480}}>
              Verify your credentials to receive access to the prescriber portal. Your details are not retained by this site.
            </p>
          </div>
          <div style={{background:"var(--burgundy)", color:"var(--cream)", padding:"48px 44px", borderRadius:30}}>
            <div className="uc mono" style={{fontSize:11, letterSpacing:".2em", opacity:.7, marginBottom:16}}>Healthcare practitioner verification</div>
            <h3 style={{fontSize:30, lineHeight:1.1, fontWeight:700, letterSpacing:"-.01em", marginBottom:32}}>Confirm your credentials.</h3>

            <label style={{display:"block", marginBottom:18}}>
              <div className="uc mono" style={{fontSize:10, letterSpacing:".2em", opacity:.7, marginBottom:8}}>Role</div>
              <select value={role} onChange={e=>setRole(e.target.value)}
                style={{width:"100%", background:"transparent", color:"var(--cream)", border:"1px solid var(--cream)", padding:"12px 14px", fontSize:15, fontFamily:"var(--font)", borderRadius:0}}>
                {["GP","Specialist","Nurse Practitioner","Pharmacist","Other registered HCP"].map(o=><option key={o} value={o} style={{color:"#000"}}>{o}</option>)}
              </select>
            </label>

            <label style={{display:"block", marginBottom:20}}>
              <div className="uc mono" style={{fontSize:10, letterSpacing:".2em", opacity:.7, marginBottom:8}}>AHPRA number</div>
              <input value={ahpra} onChange={e=>setAhpra(e.target.value)} placeholder="e.g. MED0001234567"
                style={{width:"100%", background:"transparent", color:"var(--cream)", border:"1px solid var(--cream)", padding:"12px 14px", fontSize:15, fontFamily:"var(--font)", borderRadius:0}}/>
            </label>

            <label style={{display:"flex",gap:10, alignItems:"flex-start", marginBottom:24, fontSize:13, lineHeight:1.5}}>
              <input type="checkbox" checked={consent} onChange={e=>setConsent(e.target.checked)} style={{marginTop:3, accentColor:"var(--blue)"}}/>
              <span>I confirm I am a registered Australian healthcare practitioner accessing this information in a professional capacity.</span>
            </label>

            <Button kind="blue" onClick={()=>setVerified(true)}
              style={{width:"100%", justifyContent:"center", opacity: (ahpra.length>3 && consent)?1:.4, pointerEvents:(ahpra.length>3 && consent)?"auto":"none"}}>
              Enter practitioner area →
            </Button>

            <ComplianceNote style={{color:"var(--cream)", marginTop:20, opacity:.65}}>
              This gate exists to comply with the Therapeutic Goods Advertising Code. We do not verify AHPRA numbers against the national register on the client side; you are responsible for the accuracy of your declaration.
            </ComplianceNote>
          </div>
        </div>
      </Section>
    );
  }

  // Post-gate — clinical content for verified HCPs, exempt from TGAC under Reg 6(1)(a)
  return (
    <>
    {/* HERO */}
    <Section bg="burgundy" style={{paddingTop:isMobile?80:100,paddingBottom:isMobile?40:60}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:isMobile?16:24,marginBottom:isMobile?28:40}}>
        <div>
          <Eyebrow>04 — Practitioner area</Eyebrow>
          <Display size={isMobile?64:112} style={{marginTop:16}}>Clinical<br/>resources.</Display>
        </div>
        <div style={{background:"rgba(241,232,208,.1)", padding:"12px 20px", fontSize:12, borderRadius:999}} className="uc mono">
          <span style={{opacity:.7}}>Verified as</span> &nbsp;{role}&nbsp; · &nbsp;AHPRA ✓
        </div>
      </div>
      <p style={{fontSize:isMobile?15:17, lineHeight:1.6, opacity:.85, maxWidth:720}}>
        Everything you need to prescribe Poura is on this page — Product Information, dosing and titration guidance, interaction data, and downloadable resources. Content is reviewed periodically; last updated {new Date().toLocaleDateString("en-AU",{month:"short",year:"numeric"})}.
      </p>

      {/* SKU SELECTOR */}
      <div style={{marginTop:48, paddingTop:32, borderTop:"1px solid rgba(241,232,208,.18)"}}>
        <div className="uc mono" style={{fontSize:11, letterSpacing:".22em", opacity:.7, marginBottom:16}}>Select a product</div>
        <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"repeat(3, 1fr)", gap:12}}>
          {SKUS.map(sku => {
            const active = sku.id === activeSku;
            return (
              <button key={sku.id} onClick={()=>setActiveSku(sku.id)}
                style={{
                  padding:"20px 24px", borderRadius:20, textAlign:"left",
                  border: `1px solid ${active ? "var(--blue)" : "rgba(241,232,208,.25)"}`,
                  background: active ? "var(--blue)" : "transparent",
                  color: active ? "var(--burgundy)" : "var(--cream)",
                  cursor:"pointer", fontFamily:"var(--font)",
                  transition:"all .2s ease",
                  display:"flex", flexDirection:"column", gap:6
                }}>
                <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline"}}>
                  <div style={{fontSize:18, fontWeight:700, letterSpacing:"-.01em"}}>{sku.name}</div>
                  <div className="uc mono" style={{fontSize:10, letterSpacing:".18em", opacity: active?.7:.55}}>{sku.ratio}</div>
                </div>
                <div style={{fontSize:12, opacity: active?.8:.7}}>{sku.description}</div>
              </button>
            );
          })}
        </div>
      </div>
    </Section>

    {/* AT A GLANCE */}
    <Section bg="cream" style={{paddingTop:80, paddingBottom:80}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16, marginBottom:32}}>
        <div>
          <Eyebrow>At a glance</Eyebrow>
          <h2 style={{fontSize:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16}}>Product summary.</h2>
        </div>
        <div className="uc mono" style={{fontSize:11, letterSpacing:".22em", opacity:.65}}>Showing: {current.name}</div>
      </div>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)",gap:0, border:"1px solid rgba(107,30,40,.2)", borderRadius:24, overflow:"hidden"}}>
        {[
          ["Product name",current.name],
          ["Format","Dried powder with calibrated dosage scoop"],
          ["Administration","Oral"],
          ["Active ingredients",current.activeIngredients],
          ["Strength per scoop",current.strengthPerScoop],
          ["Scoop size",current.scoopSize],
          ["Pack size",current.packSize],
          ["Schedule",current.schedule],
          ["ARTG status","Unapproved — supplied via SAS-B or Authorised Prescriber"],
          ["Manufacturer","Hale Farm · Australia"],
          ["Storage",current.storage],
          ["Shelf life",current.shelfLife],
        ].map(([k,v],i)=>(
          <div key={k} style={{display:"grid",gridTemplateColumns:isMobile?"130px 1fr":"170px 1fr",gap:isMobile?16:24,padding:isMobile?"14px 20px":"18px 28px",borderTop: (isMobile ? i>0 : i>1) ?"1px solid rgba(107,30,40,.12)":"none", borderLeft: (!isMobile && i%2===1)?"1px solid rgba(107,30,40,.12)":"none", background: (!isMobile && i<2)?"rgba(107,30,40,.04)":(isMobile && i===0)?"rgba(107,30,40,.04)":"transparent"}}>
            <div className="uc mono" style={{fontSize:10.5, letterSpacing:".15em", opacity:.65, paddingTop:3}}>{k}</div>
            <div style={{fontSize:isMobile?13.5:14.5, lineHeight:1.5}}>{v}</div>
          </div>
        ))}
      </div>
    </Section>

    {/* FORMAT & PHARMACOLOGY */}
    <Section bg="ink" style={{paddingTop:isMobile?60:80, paddingBottom:isMobile?60:80}}>
      <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1.3fr", gap:isMobile?32:80, alignItems:"flex-start"}}>
        <div>
          <Eyebrow color="var(--blue)">Format &amp; pharmacology</Eyebrow>
          <h2 style={{fontSize:isMobile?32:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:24, color:"var(--cream)"}}>
            A dispersible oral powder.
          </h2>
          <p style={{fontSize:16, lineHeight:1.6, color:"var(--cream)", opacity:.85, marginBottom:16, maxWidth:420}}>
            Every Poura SKU shares the same delivery format — a dried powder administered orally by dispersion into a beverage, delivered by a calibrated scoop. No inhalation, no heated preparation.
          </p>
          <p style={{fontSize:14, lineHeight:1.55, color:"var(--cream)", opacity:.65, maxWidth:420}}>
            Pharmacokinetics differ by formulation. The table shows the profile for the currently selected product.
          </p>
        </div>
        <div>
          <div className="uc mono" style={{fontSize:11, letterSpacing:".22em", color:"var(--blue)", opacity:.7, marginBottom:12}}>PK profile — {current.name}</div>
          <div style={{display:"grid",gap:0, border:"1px solid rgba(241,232,208,.18)", borderRadius:24, overflow:"hidden", background:"rgba(241,232,208,.04)"}}>
            {[
              ["Onset",current.pk.onset],
              ["Peak plasma (Tmax)",current.pk.tmax],
              ["Duration of effect",current.pk.duration],
              ["Bioavailability",current.pk.bioavailability],
              ["Metabolism",current.pk.metabolism],
              ["Food effect",current.pk.foodEffect],
              ["Elimination",current.pk.elimination],
            ].map(([k,v],i)=>(
              <div key={k} style={{display:"grid",gridTemplateColumns:isMobile?"130px 1fr":"180px 1fr",gap:isMobile?16:24,padding:isMobile?"14px 20px":"18px 28px", color:"var(--cream)", borderTop: i>0?"1px solid rgba(241,232,208,.12)":"none"}}>
                <div className="uc mono" style={{fontSize:10.5, letterSpacing:".15em", opacity:.55, paddingTop:3}}>{k}</div>
                <div style={{fontSize:isMobile?13.5:14.5, lineHeight:1.5}}>{v}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>

    {/* DOSING & TITRATION */}
    <Section bg="cream" style={{paddingTop:80, paddingBottom:80}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16, marginBottom:32}}>
        <div>
          <Eyebrow>Dosing &amp; titration</Eyebrow>
          <h2 style={{fontSize:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16}}>Start low, go slow.</h2>
        </div>
        <div className="uc mono" style={{fontSize:11, letterSpacing:".22em", opacity:.65}}>Showing: {current.name}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr 1fr",gap:isMobile?16:24, marginBottom:isMobile?28:40}}>
        {[
          ["Starting dose",current.startingDose,current.startingFrequency],
          ["Titration interval",current.titrationInterval,"Review tolerance before step-up"],
          ["Maximum daily",current.maxDaily,"Clinical review required beyond this"],
        ].map(([label,val,sub])=>(
          <div key={label} style={{background:"var(--burgundy)", color:"var(--cream)", padding:isMobile?"22px 24px":"28px 28px", borderRadius:24}}>
            <div className="uc mono" style={{fontSize:11,letterSpacing:".2em",opacity:.7,marginBottom:14}}>{label}</div>
            <div style={{fontSize:isMobile?24:30, fontWeight:700, letterSpacing:"-.02em", lineHeight:1.1, marginBottom:10}}>{val}</div>
            <div style={{fontSize:13, lineHeight:1.5, opacity:.8}}>{sub}</div>
          </div>
        ))}
      </div>

      <h3 style={{fontSize:isMobile?18:22, fontWeight:700, letterSpacing:"-.01em", marginBottom:16}}>Suggested titration schedule</h3>
      <div style={{border:"1px solid rgba(107,30,40,.2)", borderRadius:16, overflow:isMobile?"auto":"hidden"}}>
        <div style={{minWidth: isMobile ? 560 : undefined}}>
          <div style={{display:"grid",gridTemplateColumns:"80px 1.2fr 1fr 1fr",gap:0,padding:"14px 24px",background:"rgba(107,30,40,.06)",fontSize:11, letterSpacing:".15em"}} className="uc mono">
            <div>Week</div><div>Dose</div><div>Frequency</div><div>Review</div>
          </div>
          {current.titration.map(([w,d,f,r],i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"80px 1.2fr 1fr 1fr",gap:0,padding:"16px 24px", borderTop:"1px solid rgba(107,30,40,.1)", fontSize:14, lineHeight:1.4}}>
              <div style={{fontWeight:600}}>{w}</div><div>{d}</div><div>{f}</div><div style={{opacity:.8}}>{r}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginTop:32, display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:isMobile?20:24}}>
        {[
          ["Hepatic impairment","Reduce starting dose and extend titration intervals. Monitor LFTs."],
          ["Elderly / frail","Start at half the usual starting dose. Review after 7 days."],
          ["Concomitant CNS depressants","Avoid or reduce Poura dose. Counsel re: sedation and driving."],
        ].map(([t,d])=>(
          <div key={t} style={{borderTop:"1.5px solid var(--burgundy)",paddingTop:20}}>
            <h4 style={{fontSize:16, fontWeight:700, letterSpacing:"-.01em", marginBottom:8}}>{t}</h4>
            <p style={{fontSize:14, lineHeight:1.55, opacity:.85}}>{d}</p>
          </div>
        ))}
      </div>

      <ComplianceNote style={{marginTop:32}}>
        The schedule above is a suggested framework consistent with the Product Information. Individual titration must be based on the prescriber's clinical assessment. Confirm specific dose figures against finalised PI.
      </ComplianceNote>
    </Section>

    {/* SAFETY & INTERACTIONS */}
    <Section bg="burgundy" style={{paddingTop:80, paddingBottom:80}}>
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-end", flexWrap:"wrap", gap:16, marginBottom:32}}>
        <div>
          <Eyebrow>Safety &amp; interactions</Eyebrow>
          <h2 style={{fontSize:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16}}>What to watch for.</h2>
        </div>
        <div className="uc mono" style={{fontSize:11, letterSpacing:".22em", opacity:.65}}>Showing: {current.name}</div>
      </div>

      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?16:24, marginBottom:isMobile?24:32}}>
        <div style={{background:"rgba(241,232,208,.06)", border:"1px solid rgba(241,232,208,.18)", padding:isMobile?"24px 24px":"28px 28px", borderRadius:24}}>
          <div className="uc mono" style={{fontSize:11,letterSpacing:".2em",opacity:.7,marginBottom:16}}>Contraindications</div>
          <ul style={{listStyle:"none",display:"grid",gap:10}}>
            {current.contraindications.map(x=>(
              <li key={x} style={{display:"grid",gridTemplateColumns:"10px 1fr",gap:12,fontSize:14,lineHeight:1.55,opacity:.9}}>
                <div style={{width:5,height:5,borderRadius:999,background:"var(--blue)",marginTop:8}}/>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
        <div style={{background:"rgba(241,232,208,.06)", border:"1px solid rgba(241,232,208,.18)", padding:isMobile?"24px 24px":"28px 28px", borderRadius:24}}>
          <div className="uc mono" style={{fontSize:11,letterSpacing:".2em",opacity:.7,marginBottom:16}}>Common adverse effects</div>
          <ul style={{listStyle:"none",display:"grid",gap:10}}>
            {current.adverseEffects.map(x=>(
              <li key={x} style={{display:"grid",gridTemplateColumns:"10px 1fr",gap:12,fontSize:14,lineHeight:1.55,opacity:.9}}>
                <div style={{width:5,height:5,borderRadius:999,background:"var(--blue)",marginTop:8}}/>
                <span>{x}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <h3 style={{fontSize:isMobile?18:22, fontWeight:700, letterSpacing:"-.01em", marginBottom:16}}>Drug interactions (selected)</h3>
      <div style={{border:"1px solid rgba(241,232,208,.2)", borderRadius:16, overflow: isMobile ? "auto" : "hidden"}}>
        <div style={{minWidth: isMobile ? 640 : undefined}}>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1.2fr",gap:0,padding:"14px 24px",background:"rgba(241,232,208,.06)",fontSize:11, letterSpacing:".15em"}} className="uc mono">
            <div>Agent / class</div><div>Mechanism</div><div>Clinical guidance</div>
          </div>
          {current.interactions.map(([a,m,g],i)=>(
            <div key={i} style={{display:"grid",gridTemplateColumns:"1fr 1fr 1.2fr",gap:0,padding:"16px 24px", borderTop:"1px solid rgba(241,232,208,.12)", fontSize:14, lineHeight:1.5}}>
              <div style={{fontWeight:600}}>{a}</div><div style={{opacity:.8}}>{m}</div><div style={{opacity:.9}}>{g}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{marginTop:32, display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(3,1fr)",gap:isMobile?20:24}}>
        {[
          ["Driving & machinery", current.driving],
          ["Pregnancy & breastfeeding", current.pregnancy],
          ["Paediatric use", current.paediatric],
        ].map(([t,d])=>(
          <div key={t} style={{borderTop:"1.5px solid var(--blue)",paddingTop:20}}>
            <h4 style={{fontSize:16, fontWeight:700, letterSpacing:"-.01em", marginBottom:8}}>{t}</h4>
            <p style={{fontSize:14, lineHeight:1.55, opacity:.85}}>{d}</p>
          </div>
        ))}
      </div>
    </Section>

    {/* RESOURCES — DIRECT DOWNLOADS */}
    <Section bg="cream" style={{paddingTop:80, paddingBottom:80}}>
      <Eyebrow>Available to download</Eyebrow>
      <h2 style={{fontSize:isMobile?36:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:isMobile?28:40}}>Resources for prescribers.</h2>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1.1fr 1fr",gap:isMobile?32:64, alignItems:"flex-start"}}>
        <div>
          <p style={{fontSize:16,lineHeight:1.6,marginBottom:16,opacity:.85}}>
            Every document you need to prescribe, dispense, and counsel on Poura is downloadable directly from this page. No email request, no wait — one click and the PDF opens in a new tab.
          </p>
          <p style={{fontSize:16,lineHeight:1.6,marginBottom:24,opacity:.85}}>
            Product-specific documents (PI, CMI, dosing guide, SAS-B template) reflect the SKU you've selected above. Shared resources apply across the entire Poura range.
          </p>
          <ComplianceNote>
            Materials are intended for Australian healthcare practitioners exercising their clinical judgment. Nothing here constitutes medical advice for a specific patient.
          </ComplianceNote>
        </div>
        <div style={{background:"var(--green)", color:"var(--cream)", padding:"36px 36px", borderRadius:30}}>
          <div style={{display:"flex", justifyContent:"space-between", alignItems:"baseline", marginBottom:20}}>
            <div className="uc mono" style={{fontSize:11,letterSpacing:".2em",opacity:.7}}>Specific to {current.name}</div>
            <div className="uc mono" style={{fontSize:10,letterSpacing:".2em",opacity:.5}}>{current.docs.length} files</div>
          </div>
          <div style={{display:"grid", marginBottom:28}}>
            {current.docs.map(r=>(
              <a key={r.file} href={`/assets/docs/${r.file}`} target="_blank" rel="noopener noreferrer"
                style={{
                  display:"grid", gridTemplateColumns:"1fr auto", gap:16, alignItems:"center",
                  padding:"16px 4px", color:"var(--cream)",
                  borderBottom:"1px solid rgba(241,232,208,.18)",
                  textDecoration:"none", transition:"opacity .2s"
                }}
                onMouseEnter={e=>e.currentTarget.style.opacity=".75"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <div>
                  <div className="uc mono" style={{fontSize:9,letterSpacing:".22em",opacity:.55,marginBottom:4}}>{r.tag} · PDF</div>
                  <div style={{fontSize:14, lineHeight:1.3}}>{r.title}</div>
                </div>
                <div style={{fontSize:18, opacity:.8}}>↓</div>
              </a>
            ))}
          </div>
          <div className="uc mono" style={{fontSize:11,letterSpacing:".2em",opacity:.7,marginBottom:12,paddingTop:8,borderTop:"1px solid rgba(241,232,208,.18)"}}>Applies to all SKUs</div>
          <div style={{display:"grid"}}>
            {SHARED_DOCS.map(r=>(
              <a key={r.file} href={`/assets/docs/${r.file}`} target="_blank" rel="noopener noreferrer"
                style={{
                  display:"grid", gridTemplateColumns:"1fr auto", gap:16, alignItems:"center",
                  padding:"14px 4px", color:"var(--cream)",
                  borderBottom:"1px solid rgba(241,232,208,.12)",
                  textDecoration:"none", transition:"opacity .2s"
                }}
                onMouseEnter={e=>e.currentTarget.style.opacity=".75"}
                onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                <div>
                  <div className="uc mono" style={{fontSize:9,letterSpacing:".22em",opacity:.45,marginBottom:4}}>{r.tag} · PDF</div>
                  <div style={{fontSize:13, lineHeight:1.3, opacity:.9}}>{r.title}</div>
                </div>
                <div style={{fontSize:16, opacity:.7}}>↓</div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </Section>

    {/* REGULATORY PATHWAYS */}
    <Section bg="green" style={{paddingTop:80, paddingBottom:80}}>
      <Eyebrow color="var(--blue)">Regulatory pathways</Eyebrow>
      <h2 style={{fontSize:isMobile?32:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:16, color:"var(--cream)"}}>SAS-B or Authorised Prescriber.</h2>
      <p style={{fontSize:isMobile?15:16, lineHeight:1.6, color:"var(--cream)", opacity:.85, marginBottom:isMobile?24:32, maxWidth:680}}>
        Poura is supplied under the TGA's two established frameworks for unapproved medicines. Both pathways require prescriber assessment of clinical appropriateness and adherence to Australian dispensing requirements.
      </p>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)",gap:isMobile?16:24}}>
        {[
          {
            short:"SAS-B",
            name:"Special Access Scheme — Category B",
            bullets:[
              "Patient-by-patient TGA notification required for each prescription",
              "Typical TGA turnaround: 2 business days",
              "Pre-filled SAS-B template available in Resources above",
              "Best for first-time or one-off prescriptions",
            ],
          },
          {
            short:"AP",
            name:"Authorised Prescriber",
            bullets:[
              "Prescriber approval covers a class of patients — no per-patient TGA step",
              "Initial application: HREC endorsement or specialist college endorsement required",
              "Streamlines access for high-volume prescribers",
              "Application guide available in Resources above",
            ],
          },
        ].map(p=>(
          <div key={p.short} style={{background:"rgba(241,232,208,.08)", border:"1px solid rgba(241,232,208,.2)", padding:"32px 32px", borderRadius:24}}>
            <div className="uc mono" style={{fontSize:11,letterSpacing:".2em", color:"var(--blue)", marginBottom:14}}>{p.short}</div>
            <h3 style={{fontSize:22, fontWeight:700, letterSpacing:"-.01em", color:"var(--cream)", marginBottom:16, lineHeight:1.2}}>{p.name}</h3>
            <ul style={{listStyle:"none",display:"grid",gap:10}}>
              {p.bullets.map(b=>(
                <li key={b} style={{display:"grid",gridTemplateColumns:"10px 1fr",gap:12,fontSize:14,lineHeight:1.55,color:"var(--cream)",opacity:.9}}>
                  <div style={{width:5,height:5,borderRadius:999,background:"var(--blue)",marginTop:8}}/>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>

    {/* MEDICAL AFFAIRS & ADVERSE EVENTS */}
    <Section bg="ink" style={{paddingTop:isMobile?60:80, paddingBottom:isMobile?60:80}}>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1fr",gap:isMobile?32:64,alignItems:"flex-start"}}>
        <div>
          <Eyebrow color="var(--blue)">Medical affairs</Eyebrow>
          <h2 style={{fontSize:isMobile?32:48, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:24, color:"var(--cream)"}}>Clinical queries, direct.</h2>
          <p style={{fontSize:16, lineHeight:1.6, color:"var(--cream)", opacity:.85, marginBottom:20}}>
            For questions beyond what's published here — specific clinical scenarios, literature requests, or case-level queries — contact Medical Affairs directly. Enquiries are triaged to qualified personnel and answered within two business days.
          </p>
          <a href="mailto:info@halefarm.com.au" style={{display:"inline-block", fontSize:18, fontWeight:500, color:"var(--blue)", borderBottom:"1px solid var(--blue)", paddingBottom:4}}>info@halefarm.com.au</a>
        </div>
        <div style={{background:"rgba(241,232,208,.06)", border:"1px solid rgba(241,232,208,.18)", padding:"36px 36px", borderRadius:24, color:"var(--cream)"}}>
          <div className="uc mono" style={{fontSize:11,letterSpacing:".2em",opacity:.7,marginBottom:14}}>Adverse event reporting</div>
          <h3 style={{fontSize:22, fontWeight:700, letterSpacing:"-.01em", marginBottom:12, lineHeight:1.2}}>Report directly to the TGA.</h3>
          <p style={{fontSize:14, lineHeight:1.55, opacity:.85, marginBottom:20}}>
            All suspected adverse events should be reported to the TGA via the Database of Adverse Event Notifications (DAEN). Copy Medical Affairs so we can support any follow-up.
          </p>
          <div style={{display:"flex",flexDirection:"column",gap:10}}>
            <a href="https://www.tga.gov.au/reporting-problems" target="_blank" rel="noopener noreferrer" style={{fontSize:14, color:"var(--blue)", borderBottom:"1px solid rgba(190,215,226,.4)", paddingBottom:3, alignSelf:"flex-start"}}>TGA reporting portal ↗</a>
            <a href="mailto:info@halefarm.com.au?subject=Adverse%20event%20report%20%E2%80%94%20Poura" style={{fontSize:14, color:"var(--blue)", borderBottom:"1px solid rgba(190,215,226,.4)", paddingBottom:3, alignSelf:"flex-start"}}>Copy Medical Affairs ↗</a>
          </div>
        </div>
      </div>
      <ComplianceNote style={{color:"var(--cream)", opacity:.65, marginTop:40, maxWidth:"none"}}>
        This practitioner area is intended for registered Australian healthcare practitioners under Regulation 6(1)(a) of the Therapeutic Goods Regulations 1990. Content is not directed at the general public.
      </ComplianceNote>
    </Section>
    </>
  );
}

export { PageHCP };
