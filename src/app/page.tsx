import { AboutUs } from "./components/AboutUs";
import { AgendaSection } from "./components/AgendaSection";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { HeroSection } from "./components/HeroSection";
import { Services } from "./components/Services";
import { Tienda } from "./components/Tienda";


export default function Home() {
    const mainContentBackgroundSvg = `
    <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <rect width="100%" height="100%" fill="#000000"/>
        <line x1="0" y1="30%" x2="100%" y2="40%" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
        <line x1="20%" y1="0" x2="80%" y2="100%" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
        <line x1="100%" y1="60%" x2="0" y2="70%" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
        <line x1="40%" y1="100%" x2="60%" y2="0" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
        <line x1="0" y1="100%" x2="100%" y2="0" stroke="rgba(255,255,255,0.1)" stroke-width="2"/>
    </svg>
  `;

  const encodedSvg = `url("data:image/svg+xml,${encodeURIComponent(mainContentBackgroundSvg)}")`;

  const mainStyle = {
    backgroundImage: encodedSvg,
    backgroundSize: 'cover',
  };
  return (
     <div className="text-center flex flex-col" style={mainStyle}>
     
     <HeroSection />
    
    <section id="servicio" className="flex-grow md:hidden">
       <Services />
      </section>

      <section id="nosotros" className="flex-grow md:hidden">
        <AgendaSection />
      </section>
    
    <section id="nosotros" className="flex-grow md:hidden">
       <AboutUs />
      </section>

    <section id="tienda" className="flex-grow md:hidden">
        <Tienda />
        </section>  
      
      <section id="contacto" className="flex-grow md:hidden">
        <Contact />
        </section>
        <section className="flex md:hidden">
          
     <Footer/>
           </section>
    </div>
  );
}
