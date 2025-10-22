// src/components/SideMenu.tsx

'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { IconType } from 'react-icons';
import { FaHome, FaCalendarAlt, FaEnvelope, FaSpa, FaUsers, FaImages } from 'react-icons/fa';
// ✅ 1. IMPORTAMOS LOS NUEVOS ÍCONOS DE 'GAME ICONS'
import { GiRazor, GiScissors, GiSpiralBottle } from 'react-icons/gi';
import { RxScissors } from "react-icons/rx";
import { TbRazorElectric } from "react-icons/tb";

const iconComponents: { [key: string]: IconType } = {
  FaHome,
  FaCalendarAlt,
  FaEnvelope,
  FaSpa,
  FaUsers,
  FaImages,
};

type MenuLink = {
  label: string;
  path: string;
  icon: string;
};

export const SideMenu = ({ links }: { links: MenuLink[] }) => {
  const chaoticLinesStyle = {
    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 200 200'%3e%3cpolygon fill='none' stroke='rgba(255,255,255,0.20)' stroke-width='2' points='50,5 95,50 50,95 5,50'/%3e%3cpolygon fill='none' stroke='rgba(255,255,255,0.19)' stroke-width='2' points='150,105 195,150 150,195 105,150' transform='rotate(15 150 150)'/%3e%3cline fill='none' stroke='rgba(255,255,255,0.27)' stroke-width='1' x1='10' y1='110' x2='90' y2='190'/%3e%3cline fill='none' stroke='rgba(255,255,255,0.27)' stroke-width='1' x1='120' y1='10' x2='190' y2='80'/%3e%3c/svg%3e")`,
    backgroundSize: 'cover',
  };

  // ✅ 2. NUEVA DECORACIÓN: MÁS SIMPLE Y CON LOS ÍCONOS DE REACT-ICONS
  // Usamos 'null' para dejar un espacio vacío en la estantería.
  const shelfDecorations = [
    { left: <TbRazorElectric className="h-8 w-8" /> , right: null },
    { left: <GiSpiralBottle className="h-8 w-8" />, right: <GiRazor className="h-7 w-7" /> },
    { left: null, right: <RxScissors className="h-8 w-8  " /> },
  ];

  return (
    <div className="w-64 rounded-xl overflow-hidden">
      <aside
        className="w-full h-full flex flex-col"
        style={{
          borderWidth: '16px',
          borderStyle: 'solid',
          borderImageSource: "url('/madera.jpeg')",
          borderImageSlice: 30,
          borderImageRepeat: 'stretch',
        }}
      >
        {links.map((link, index) => {
          const IconComponent = iconComponents[link.icon];
          const decoration = shelfDecorations[index % shelfDecorations.length];

          return (
            <Link
              key={link.path}
              href={link.path}
              passHref
              className="flex-1 flex items-center justify-center relative"
            >
              {/* Divisor con textura */}
              {index > 0 && (
                <div
                  className="absolute top-0 left-0 w-full h-[15px] z-20"
                  style={{
                    borderTopWidth: '15px',
                    borderTopStyle: 'solid',
                    borderImageSource: "url('/madera.jpeg')",
                    borderImageSlice: 30,
                    borderImageRepeat: 'stretch',
                  }}
                ></div>
              )}

              {/* Fondo abstracto */}
              <div
                className="absolute inset-0 z-0"
                style={chaoticLinesStyle}
              ></div>

              {/* Contenido del Menú */}
              <motion.div
                className="flex flex-col items-center justify-center gap-2 z-10"
                whileHover={{ scale: 1.1, textShadow: '0 0 10px #fde047' }}
              >
                {IconComponent && <IconComponent className="text-4xl text-[#D39154]" />}
                <span
                  className="font-bold font-rubikDirt text-2xl uppercase tracking-wider bg-cover bg-clip-text text-transparent bg-[url('/madera2.jpeg')]"
                  style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
                >
                  {link.label}
                </span>
              </motion.div>

              {/* ✅ 3. NUEVO POSICIONAMIENTO DE SILUETAS */}
              <div className="absolute inset-x-0 -bottom-1 h-10 z-10 pointer-events-none">
                {/* Silueta Izquierda */}
                {decoration.left && (
                  <div className="absolute bottom-0 left-2 text-red-800">
                    {decoration.left}
                  </div>
                )}
                {/* Silueta Derecha */}
                {decoration.right && (
                  <div className="absolute bottom-0 right-2 text-yellow-800">
                    {decoration.right}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </aside>
    </div>
  );
};