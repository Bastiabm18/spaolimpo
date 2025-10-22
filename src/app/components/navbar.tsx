'use client';

import React from 'react';
import { useState } from 'react';
// 1. Se añaden AnimatePresence de framer-motion y MdClose para el ícono de cerrar.
import { motion, AnimatePresence } from 'framer-motion';
import { HiOutlineUser, HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2';
import { MdMenu, MdClose } from 'react-icons/md';
import { BsMenuButtonWideFill } from "react-icons/bs";
import NeonSign from './NeonSign';
import Link from 'next/link';

type LightBulbProps = {
  isOn: boolean;
};

const LightBulb = ({ isOn }: LightBulbProps) => {
  // 2. Se eliminaron las animaciones y transiciones pulsantes.
  // Ahora la ampolleta simplemente se prende o se apaga.

  return (
    <div className="relative flex justify-center">
      <motion.div
        className={`h-4 w-5 rounded-md transition-colors duration-500 z-10 ${
          isOn ? 'bg-yellow-300' : 'bg-gray-600'
        }`}
        style={{
          boxShadow: isOn
            ? '0 0 12px 3px #fde047, 0 0 20px 6px #facc15, inset 0 0 5px 1px #fef08a'
            : 'none',
        }}
        // 2. La animación ahora es un simple cambio de opacidad.
        animate={{ opacity: isOn ? 1 : 0.4 }}
        transition={{ duration: 0.5 }}
      />
      
      <motion.div
        className="absolute top-full h-24 w-20"
        style={{
          pointerEvents: 'none', 
          background: 'linear-gradient(to bottom, rgba(253, 224, 71, 0.6), transparent)',
          // 1. El cono ahora empieza más angosto para coincidir con la ampolleta.
          clipPath: 'polygon(38% 0, 62% 0, 100% 100%, 0% 100%)',
          // 3. Se establece el origen de la transformación en la parte superior.
          transformOrigin: 'top',
        }}
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ 
          opacity: isOn ? 1 : 0,
          scaleY: isOn ? 1 : 0,
        }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  );
};

export const Navbar: React.FC = () => {
  const [lightsOn, setLightsOn] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);

  const woodTextureStyle: React.CSSProperties = {
    backgroundImage: 'url(/wood4.png)',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    // Se envuelve todo en un fragmento para que el menú pueda ser un hermano del nav principal.
    <>
      <div className="sticky top-0 z-50 w-full shadow-lg">
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="w-full h-[100px]"
          style={woodTextureStyle}
        >
          <div className="w-full h-full mx-auto flex items-center justify-between px-8">
           <NeonSign/>

            <div className="flex items-center gap-6">

              <button
                className="hidden md:flex text-stone-100 hover:text-yellow-300 transition-colors"
                aria-label="Iniciar Sesión"
              >
                <HiOutlineUser className="h-7 w-7" style={{ filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.8))' }}/>
              </button>
              <button
                onClick={() => setLightsOn(!lightsOn)}
                className="text-stone-100 hover:text-yellow-300 transition-colors"
                aria-label={lightsOn ? "Apagar luces" : "Encender luces"}
              >
                {lightsOn
                  ? <HiOutlineMoon className="h-7 w-7" style={{ filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.8))' }}/>
                  : <HiOutlineSun className="h-7 w-7" style={{ filter: 'drop-shadow(1px 1px 3px rgba(0,0,0,0.8))' }}/>
                }
              </button>
              <button
                onClick={() => setMenuOpen(!menuOpen)} className="text-stone-100 hover:text-yellow-300 transition-colors md:hidden">
                <BsMenuButtonWideFill className="h-7 w-7"/>
              </button>
            </div>
          </div>
        </motion.header>
        
        <div
          className="w-full h-6  flex justify-evenly items-center"
        >
          <div  className='hidden md:flex w-full h-6 justify-evenly items-center '> 
          <LightBulb isOn={lightsOn} />
          <LightBulb isOn={lightsOn} />
          <LightBulb isOn={lightsOn} />
          <LightBulb isOn={lightsOn} />
            
          </div>
          <div className='flex md:hidden w-full h-6 justify-evenly items-center'> 
          <LightBulb isOn={lightsOn} />
          <LightBulb isOn={lightsOn} />
          <LightBulb isOn={lightsOn} />
          </div>
          
        </div>
      </div>

      {/* 2. SECCIÓN DEL MENÚ MÓVIL AÑADIDA */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
            // Se usa 'fixed' para que ocupe toda la pantalla y bg-gray-700/70 para la opacidad.
            className="fixed top-0 right-0 h-[100vh] w-[100vw] bg-gray-900/70 backdrop-blur-sm flex flex-col items-center justify-center z-[100]"
          >
            <button
              onClick={closeMenu}
              className="absolute top-8 right-8 text-stone-100 hover:text-yellow-300 transition-colors"
              aria-label="Cerrar menú"
            >
              <MdClose className="h-10 w-10" />
            </button>
            <nav className="flex flex-col font-alumniSans items-center gap-y-8">
              <Link href="/" onClick={closeMenu} className="text-3xl  text-stone-100 hover:text-yellow-300 transition-colors">Inicio</Link>
              <Link href="/agenda" onClick={closeMenu} className="text-3xl  text-stone-100 hover:text-yellow-300 transition-colors">Agenda</Link>
              <Link href="#servicio" onClick={closeMenu} className="text-3xl  text-stone-100 hover:text-yellow-300 transition-colors">Servicios</Link>
              <Link href="#contacto" onClick={closeMenu} className="text-3xl  text-stone-100 hover:text-yellow-300 transition-colors">Contacto</Link>
              <Link href="#nosotros" onClick={closeMenu} className="text-3xl  text-stone-100 hover:text-yellow-300 transition-colors">Nosotros</Link>
              <Link href="#galeria" onClick={closeMenu} className="text-3xl  text-stone-100 hover:text-yellow-300 transition-colors">Galería</Link>
              <Link href="/login"   onClick={closeMenu} className ="text-3xl  text-stone-100 hover:text-yellow-300 transition-colors" >Login</Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};