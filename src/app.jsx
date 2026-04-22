/* App shell — routing, age gate */
import React, { useState, useEffect } from "react";
import { AgeGate, Footer, RegulatoryBanner, TopNav } from "./chrome";
import { PageHome } from "./pages-home";
import { PageFormat } from "./pages-format";
import { PagePatients } from "./pages-patients";
import { PagePharmacies } from "./pages-pharmacies";
import { PageHCP } from "./pages-hcp";
import { PageFaqs, PageContact } from "./pages-misc";

function App(){
  const [route, setRoute] = useState(()=> localStorage.getItem("poura:route") || "home");
  const [entered, setEntered] = useState(()=> localStorage.getItem("poura:entered") === "1");

  useEffect(()=> localStorage.setItem("poura:route", route), [route]);
  useEffect(()=>{ window.scrollTo({top:0}); }, [route]);

  const onNav = (id) => setRoute(id);

  const theme = route === "home" ? "burgundy" : "cream";

  const page =
    route === "home" ? <PageHome onNav={onNav}/> :
    route === "format" ? <PageFormat onNav={onNav}/> :
    route === "patients" ? <PagePatients onNav={onNav}/> :
    route === "pharmacies" ? <PagePharmacies onNav={onNav}/> :
    route === "hcp" ? <PageHCP onNav={onNav}/> :
    route === "faqs" ? <PageFaqs/> :
    route === "contact" ? <PageContact/> : <PageHome onNav={onNav}/>;

  return (
    <div data-screen-label={`poura-${route}`}>
      {!entered && <AgeGate onAccept={()=>{ localStorage.setItem("poura:entered","1"); setEntered(true); }}/>}
      <RegulatoryBanner/>
      <TopNav route={route} onNav={onNav} theme={theme}/>
      {page}
      <Footer onNav={onNav}/>
    </div>
  );
}

export default App;
