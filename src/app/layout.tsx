// src/app/layout.tsx

import { Navbar } from "./components/navbar";
import { SideMenu } from "./components/SideMenu";
import { Frijole, Rubik_Dirt, Caveat, Alumni_Sans } from "next/font/google";
import type { Metadata } from "next";
import './globals.css';
import { ZigZagDragon } from "./components/DragonAnimation";
import { twMerge } from "tailwind-merge";
import { Footer } from "./components/Footer";
import { PromoModal } from "./components/PromoModal";
import { LayoutInitializer } from "./components/LayoutInitializer";
import { FloatingAudioPlayer } from "./components/FloatingAudioPlayer"; // Ajusta la ruta si es necesario

export const metadata: Metadata = {
  title: "Spa Olimpo",
  description: "Estilo y precisión en cada corte.",
  icons: {
    icon: '/favicon.ico',
  },
};

  // 2. Define tu lista de canciones
  const playlist = [
    '/Apollo Brown - Never in a million years - TripHop Beatss.mp3',
    '/Travis Scott - YOSEMITE (INSTRUMENTAL) reprod - Mizzy Mauri the Producer.mp3',
    '/Travis Scott - Sicko Mode (Official Instrumental) - John.mp3',
    '/Aférrate (Instrumental) - Brous One.mp3',
    '/Wiz Khalifa ~ The Race Instrumental - Random Audio ChainVEVO.mp3',
  ];

const leftMenuLinks = [
  { label: "Inicio", path: "/", icon: "FaHome" },
  { label: "Agenda", path: "/agenda", icon: "FaCalendarAlt" },
  { label: "Contacto", path: "/contacto", icon: "FaEnvelope" },
];

const rightMenuLinks = [
  { label: "Servicios", path: "/servicios", icon: "FaSpa" },
  { label: "Nosotros", path: "/nosotros", icon: "FaUsers" },
  { label: "Galería", path: "/galeria", icon: "FaImages" },
];

const frijole = Frijole({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-frijole",
});

const alumniSans = Alumni_Sans({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-alumni-sans",
});

const rubikDirt = Rubik_Dirt({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-rubik-dirt",
});

const CaveatFont = Caveat({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-caveat",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  const htmlClasses = twMerge(frijole.variable, rubikDirt.variable, CaveatFont.variable, alumniSans.variable);

  const bodyClasses = twMerge("bg-black", CaveatFont.className);

  return (
    <html lang="es" className={htmlClasses}>
      <body className={bodyClasses}>
        {/* ---- FILTRO VX1000 PRO ---- */}
        <div
          className="vx1000-pro-filter fixed inset-0 z-[9999] pointer-events-none
                     saturate-125 contrast-110 brightness-110"
        >
          {/* Elemento para las líneas de daño de cinta ("gusanos") */}
          <div className="tape-damage-lines"></div>
        </div>

        <LayoutInitializer>
          <div className="text-white flex flex-col h-full md:h-[80vh] md:overflow-hidden">
            <ZigZagDragon />
            <Navbar />
            <div className="flex md:h-[60vh] flex-grow">
              <div className="hidden md:flex">
                <SideMenu links={leftMenuLinks} />
              </div>
              <main
                className=" flex-grow pt-5  md:overflow-y-hidden overflow-x-hidden"
                style={mainStyle}
              >
                {children}
              </main>
              <div className="hidden md:flex">
                <SideMenu links={rightMenuLinks} />
              </div>
            </div>
        
            
            <PromoModal />
          </div>
          {/* ---- FOOTER ---- */}
          <div className="hidden md:flex">
             <Footer />
          </div>
            <FloatingAudioPlayer tracks={playlist} />
        </LayoutInitializer>
      </body>
    </html>
  );
}
