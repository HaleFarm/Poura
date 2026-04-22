/* For Patients — general educational content. No substance names, no claims. */
import React from "react";
import { Button, Clover, ComplianceNote, Display, Eyebrow, Section, useViewport } from "./primitives";

function PagePatients({onNav}){
  const { isMobile } = useViewport();
  return (
    <>
    <Section bg="cream" style={{paddingTop:isMobile?100:140, paddingBottom:isMobile?40:60}}>
      <Eyebrow>02 — For Patients</Eyebrow>
      <Display size={isMobile?64:112} style={{marginTop:20, maxWidth:1200}}>
        Access in<br/>Australia.
      </Display>
      <p style={{fontSize:isMobile?16:19, lineHeight:1.5, maxWidth:680, marginTop:isMobile?24:32, opacity:.8}}>
        Poura is a prescription-only medicine in Australia. It is not available over the counter. Access is through a registered healthcare practitioner who decides whether it is clinically appropriate for you.
      </p>
    </Section>

    <Section bg="burgundy" style={{paddingTop:60,paddingBottom:60}}>
      <Eyebrow>The pathway</Eyebrow>
      <h2 style={{fontSize:isMobile?36:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:isMobile?32:48}}>
        Four steps from question to pharmacy.
      </h2>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(4,1fr)",gap:isMobile?20:24}}>
        {[
          ["01","Talk to a prescriber","Speak with your regular GP or a clinician in the area of plant medicine. They will review your history and assess suitability."],
          ["02","Prescription issued","If appropriate, your prescriber follows the relevant TGA-approved access pathway."],
          ["03","Pharmacy dispense","Take your prescription to an authorised pharmacy, or have it dispensed and delivered discreetly to your home. Either way, it's supplied under Australian controls."],
          ["04","Patient consultation","Your pharmacist will walk you through directions for use and safety information before you leave the counter."],
        ].map(([n,t,d])=>(
          <div key={n} style={{borderTop:"1.5px solid var(--cream)", paddingTop:20}}>
            <div className="mono uc" style={{fontSize:11, letterSpacing:".2em", opacity:.6, marginBottom:18}}>{n}</div>
            <h3 style={{fontSize:24, fontWeight:700, letterSpacing:"-.01em", lineHeight:1.1, marginBottom:12}}>{t}</h3>
            <p style={{fontSize:14, lineHeight:1.55, opacity:.85}}>{d}</p>
          </div>
        ))}
      </div>
    </Section>

    <Section bg="cream">
      <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"1.1fr 1fr", gap:isMobile?32:80, alignItems:"flex-start"}}>
        <div>
          <Eyebrow>Things to consider</Eyebrow>
          <h2 style={{fontSize:isMobile?36:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:24}}>
            Before your appointment.
          </h2>
          <p style={{fontSize:16, lineHeight:1.6, opacity:.85, marginBottom:16}}>
            Australian prescribers consider many factors when deciding whether a particular medicine is appropriate — medical history, current medications, previous treatments attempted, and the condition being managed.
          </p>
          <p style={{fontSize:16, lineHeight:1.6, opacity:.85}}>
            Be ready to discuss your history openly. Bring a list of your current medications and any past treatments you've tried. The decision to prescribe is always clinical, and always your prescriber's to make.
          </p>
        </div>
        <div style={{background:"var(--blue)", padding:"40px 36px", borderRadius:30}}>
          <div className="uc mono" style={{fontSize:11,letterSpacing:".2em", color:"var(--burgundy)", marginBottom:20}}>Important</div>
          <ul style={{listStyle:"none",display:"grid",gap:16}}>
            {[
              "Follow all directions provided by your prescriber and pharmacist.",
              "Tell your prescriber about every medicine and supplement you are taking. Some medicines may interact.",
              "Ask your prescriber whether it is safe to drive or operate machinery while taking any prescribed medicine.",
              "Not suitable during pregnancy or while breastfeeding unless explicitly directed by a prescriber.",
              "If you experience side effects, contact your prescriber or pharmacist. In an emergency, call 000.",
            ].map(t=>(
              <li key={t} style={{display:"grid",gridTemplateColumns:"20px 1fr",gap:12, fontSize:14, lineHeight:1.5, color:"var(--burgundy)"}}>
                <Clover size={14} color="var(--burgundy)"/>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>

    <Section bg="burgundy" style={{paddingTop:isMobile?60:80, paddingBottom:isMobile?60:80}}>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"1fr 1.2fr", gap:isMobile?32:80, alignItems:"flex-start"}}>
        <div>
          <Eyebrow>Eligibility</Eyebrow>
          <h2 style={{fontSize:isMobile?32:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:24}}>
            What the TGA framework looks for.
          </h2>
          <p style={{fontSize:16, lineHeight:1.6, opacity:.85, maxWidth:420}}>
            The Therapeutic Goods Administration sets the criteria for access to unapproved medicines in Australia. Your prescriber will generally assess whether:
          </p>
        </div>
        <div style={{display:"grid", gap:20}}>
          {[
            ["Chronic medical condition","Symptoms lasting three months or more, diagnosed by a registered practitioner."],
            ["Standard treatments tried","Previous therapies haven't provided relief, or have caused side effects you couldn't tolerate."],
            ["Clinically appropriate","The medicine is suitable for your specific circumstances, in your prescriber's judgment."],
          ].map(([t,d],i)=>(
            <div key={t} style={{display:"grid",gridTemplateColumns:"50px 1fr",gap:20,paddingBottom:20,borderBottom:"1px solid rgba(241,232,208,.18)"}}>
              <div className="mono uc" style={{fontSize:11,letterSpacing:".2em",opacity:.6,paddingTop:4}}>{String(i+1).padStart(2,"0")}</div>
              <div>
                <div style={{fontSize:22, fontWeight:700, letterSpacing:"-.01em", marginBottom:6}}>{t}</div>
                <div style={{fontSize:14, lineHeight:1.55, opacity:.85}}>{d}</div>
              </div>
            </div>
          ))}
          <ComplianceNote style={{color:"var(--cream)", opacity:.7, marginTop:4}}>
            Your prescriber's assessment is always individual. Additional factors may apply.
          </ComplianceNote>
        </div>
      </div>
    </Section>

    <Section bg="cream">
      <Eyebrow>How access works</Eyebrow>
      <h2 style={{fontSize:isMobile?36:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:20}}>
        Two regulated pathways.
      </h2>
      <p style={{fontSize:isMobile?15:17, lineHeight:1.55, opacity:.85, maxWidth:680, marginBottom:isMobile?28:40}}>
        Australian prescribers access unapproved medicines through one of two TGA frameworks. Your prescriber will choose the appropriate one for you.
      </p>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)",gap:isMobile?20:24}}>
        {[
          {
            tag:"Pathway 01",
            name:"Special Access Scheme — Category B",
            short:"SAS-B",
            bullets:[
              "Individual applications, patient-by-patient.",
              "For specific clinical circumstances where standard treatment isn't suitable.",
              "Each prescription requires a separate TGA notification.",
              "Most common for first-time or one-off cases.",
            ],
          },
          {
            tag:"Pathway 02",
            name:"Authorised Prescriber",
            short:"AP",
            bullets:[
              "Prescriber holds TGA approval to prescribe a particular medicine to a defined class of patients.",
              "No per-patient TGA application needed once approval is granted.",
              "Often used by clinicians who prescribe regularly.",
              "Faster ongoing access for patients under that prescriber.",
            ],
          },
        ].map(p=>(
          <div key={p.short} style={{background:"var(--burgundy)",color:"var(--cream)",padding:"36px 32px",borderRadius:30,display:"flex",flexDirection:"column",gap:24}}>
            <div>
              <div className="uc mono" style={{fontSize:11,letterSpacing:".2em",opacity:.7,marginBottom:14}}>{p.tag}</div>
              <div style={{fontSize:26, fontWeight:700, letterSpacing:"-.01em", lineHeight:1.15, marginBottom:10}}>{p.name}</div>
              <div className="uc mono" style={{fontSize:12,letterSpacing:".15em",opacity:.6}}>{p.short}</div>
            </div>
            <ul style={{listStyle:"none",display:"grid",gap:12}}>
              {p.bullets.map(b=>(
                <li key={b} style={{display:"grid",gridTemplateColumns:"14px 1fr",gap:12,fontSize:14,lineHeight:1.55,opacity:.9,paddingBottom:12,borderBottom:"1px solid rgba(241,232,208,.15)"}}>
                  <div style={{width:6,height:6,borderRadius:999,background:"var(--blue)",marginTop:8}}/>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <ComplianceNote style={{marginTop:32}}>
        Both pathways require the prescriber to assess clinical appropriateness and follow Australian dispensing requirements.
      </ComplianceNote>
    </Section>

    <Section bg="green">
      <Eyebrow color="var(--cream)">Starting the conversation</Eyebrow>
      <h2 style={{fontSize:isMobile?36:56, letterSpacing:"-.02em", lineHeight:1, fontWeight:700, marginTop:16, marginBottom:isMobile?28:40, color:"var(--cream)"}}>
        Questions worth asking.
      </h2>
      <div style={{display:"grid",gridTemplateColumns:isMobile?"1fr":"repeat(2,1fr)",gap:isMobile?32:64}}>
        {[
          {
            label:"Ask them",
            items:[
              "What pathway (SAS-B or Authorised Prescriber) are you using?",
              "How long before we'd expect to know whether this is working?",
              "What side effects should I watch for?",
              "What should I avoid while taking this medicine — food, other medicines, driving?",
              "How will we review progress, and how often?",
            ],
          },
          {
            label:"Tell them",
            items:[
              "Every medicine and supplement you're currently taking.",
              "Previous treatments you've tried and how they worked for you.",
              "Relevant medical history, allergies, past reactions.",
              "Pregnancy or breastfeeding status.",
              "Your driving or workplace safety obligations.",
            ],
          },
        ].map(col=>(
          <div key={col.label}>
            <div className="uc mono" style={{fontSize:11,letterSpacing:".22em",color:"var(--blue)",marginBottom:24}}>{col.label}</div>
            <ul style={{listStyle:"none",display:"grid",gap:16}}>
              {col.items.map(q=>(
                <li key={q} style={{display:"grid",gridTemplateColumns:"14px 1fr",gap:14,fontSize:15,lineHeight:1.55,color:"var(--cream)",paddingBottom:14,borderBottom:"1px solid rgba(241,232,208,.15)"}}>
                  <div style={{width:6,height:6,borderRadius:999,background:"var(--blue)",marginTop:8}}/>
                  <span>{q}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>

    <Section bg="burgundy" style={{paddingTop:0, paddingBottom:0}}>
      <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", minHeight:isMobile?"auto":480, marginLeft:isMobile?-20:-48, marginRight:isMobile?-20:-48}}>
        <div style={{padding:isMobile?"56px 20px 40px":"80px 48px 80px 48px", display:"flex", flexDirection:"column", justifyContent:"center"}}>
          <Eyebrow>Everyday moments</Eyebrow>
          <h2 style={{fontSize:isMobile?34:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:24}}>
            A prescribed<br/>medicine that<br/>fits in a bottle.
          </h2>
          <p style={{fontSize:16, lineHeight:1.6, opacity:.9, maxWidth:460}}>
            Mixed into a drink you'd be carrying anyway. For patients who don't want a new ritual, a new device, or a daily reminder that they're taking anything at all.
          </p>
          <div style={{marginTop:32, display:"flex", gap:16, flexWrap:"wrap"}}>
            <div className="uc mono" style={{fontSize:11, letterSpacing:".22em", opacity:.6, paddingTop:12, borderTop:"1px solid rgba(241,232,208,.25)"}}>
              Flavourless
            </div>
            <div className="uc mono" style={{fontSize:11, letterSpacing:".22em", opacity:.6, paddingTop:12, borderTop:"1px solid rgba(241,232,208,.25)"}}>
              Dispersible
            </div>
            <div className="uc mono" style={{fontSize:11, letterSpacing:".22em", opacity:.6, paddingTop:12, borderTop:"1px solid rgba(241,232,208,.25)"}}>
              Precise dosage
            </div>
          </div>
        </div>
        <figure style={{margin:0, position:"relative", overflow:"hidden", minHeight:isMobile?320:undefined}}>
          <img src="assets/lifestyle-drink-hand.jpg" alt="A person holding a drink with citrus"
            style={{width:"100%", height:"100%", objectFit:"cover", display:"block"}}/>
        </figure>
      </div>
    </Section>

    <Section bg="ink">
      <div style={{display:"grid", gridTemplateColumns:isMobile?"1fr":"1fr 1fr", gap:isMobile?32:64, alignItems:isMobile?"flex-start":"center"}}>
        <div>
          <Eyebrow color="var(--blue)">A note on tone</Eyebrow>
          <h2 style={{fontSize:isMobile?32:56, letterSpacing:"-.02em", lineHeight:1.05, fontWeight:700, marginTop:16, marginBottom:24, color:"var(--cream)"}}>
            We won't promise outcomes.
          </h2>
          <p style={{fontSize:16, lineHeight:1.6, color:"var(--cream)", opacity:.85, marginBottom:16}}>
            Australian advertising law for therapeutic goods is clear. We cannot make claims about what a medicine treats, or promote it as a solution for any condition. Those conversations belong in a consulting room with a registered practitioner.
          </p>
          <p style={{fontSize:16, lineHeight:1.6, color:"var(--cream)", opacity:.85}}>
            What we can do is describe how the format works and how access is structured in Australia. If you are considering any new prescription medicine, start with a conversation with your prescriber.
          </p>
        </div>
        <div style={{background:"var(--green)", padding:"56px 44px", color:"var(--cream)", borderRadius:30}}>
          <div className="uc mono" style={{fontSize:11, letterSpacing:".2em", opacity:.7, marginBottom:16}}>Find a prescriber</div>
          <div style={{fontSize:26, lineHeight:1.2, fontWeight:600, marginBottom:24}}>
            Start with your regular GP. They can refer you or prescribe directly.
          </div>
          <div style={{fontSize:13, lineHeight:1.55, opacity:.8, marginBottom:28}}>
            If your GP is unable to help, the TGA maintains a public directory of Authorised Prescribers. Some Australian clinics specialise in plant-medicine consultations.
          </div>
          <Button kind="blue" as="a" href="https://www.tga.gov.au" style={{width:"100%",justifyContent:"center"}}>
            TGA website ↗
          </Button>
        </div>
      </div>
    </Section>
    </>
  );
}

export { PagePatients };
