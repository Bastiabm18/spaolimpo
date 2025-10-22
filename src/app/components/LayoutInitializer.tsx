// src/components/LayoutInitializer.tsx
'use client';

import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// El spinner que se mostrará durante la carga inicial.
const LoadingSpinner = () => {
  // Estado para controlar la aparición del segundo texto.
  const [showSecondaryText, setShowSecondaryText] = useState(false);

  // Efecto para mostrar el segundo texto después de 1 segundo.
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSecondaryText(true);
    }, 250); //

    return () => clearTimeout(timer); // Limpieza al desmontar
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex h-screen w-screen flex-col items-center justify-center bg-black text-white">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-dashed border-[#D39154]"></div>
      <p className="mt-4 text-lg font-alumniSans text-neutral-300">
        Cargando...
      </p>

      {/* El segundo texto solo se renderiza cuando showSecondaryText es true */}
      <AnimatePresence>
        {showSecondaryText && (
          <motion.p
            className='font-caveat text-xl mt-2 '
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            La eXperiencia SpaOlimpo está por comenzar...
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
};

// Este componente renderiza el spinner hasta que la aplicación se "hidrata" en el cliente.
export function LayoutInitializer({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    // Este efecto se ejecuta solo en el navegador, después del montaje inicial.
    // Damos un tiempo extra para asegurar que todo esté listo y la animación se aprecie.
    const timer = setTimeout(() => {
        setIsMounted(true);
    }, 2000); // Duración total de la pantalla de carga

    return () => clearTimeout(timer);
  }, []);

  // Mientras no esté montado, muestra la pantalla de carga.
  if (!isMounted) {
    return <LoadingSpinner />;
  }

  // Una vez montado, renderiza el layout completo.
  return <>{children}</>;
}
