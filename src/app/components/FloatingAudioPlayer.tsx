// components/FloatingAudioPlayer.tsx
'use client';

import React, { useState } from 'react';
import ReactHowler from 'react-howler';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaMusic } from 'react-icons/fa';
import { MdClose } from 'react-icons/md';

// Definimos las propiedades que recibirá el componente
interface FloatingAudioPlayerProps {
  tracks: string[]; // Un array con las URLs de las canciones
}

export const FloatingAudioPlayer: React.FC<FloatingAudioPlayerProps> = ({ tracks }) => {
  // Estado para controlar la visibilidad del reproductor completo
  const [isOpen, setIsOpen] = useState(false);
  // Estado para saber si la música está sonando
  const [isPlaying, setIsPlaying] = useState(true);
  // Estado para saber qué canción de la lista se está reproduciendo
  const [trackIndex, setTrackIndex] = useState(0);

  // --- Funciones de Control ---
  const togglePlayPause = () => setIsPlaying(!isPlaying);
  const playNextTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    setIsPlaying(true);
  };
  const playPrevTrack = () => {
    setTrackIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    setIsPlaying(true);
  };

  // --- JSX del Componente ---
  return (
    <div className="fixed bottom-5 right-5 z-50">
      {/* Componente de ReactHowler que maneja la lógica de audio de fondo */}
      <ReactHowler
        src={tracks[trackIndex]}
        playing={isPlaying}
        onEnd={playNextTrack}
        html5={true}
        
      />
      
      <AnimatePresence>
        {isOpen ? (
          // --- VISTA EXPANDIDA DEL REPRODUCTOR ---
          <motion.div
            key="player"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
            className="relative flex flex-col items-center gap-4 rounded-lg bg-gray-900/80 p-4 text-white shadow-2xl backdrop-blur-md"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute -top-2 -right-2 rounded-full bg-red-500 p-1 text-white hover:bg-red-600"
              aria-label="Cerrar reproductor"
            >
              <MdClose size={20} />
            </button>
            
            <p className="text-sm font-semibold truncate max-w-[150px]">
              {/* Extraemos el nombre del archivo para mostrarlo */}
              {tracks[trackIndex].split('/').pop()?.replace('.mp3', '')}
            </p>
            
            <div className="flex items-center gap-x-5">
              <button onClick={playPrevTrack} aria-label="Canción anterior" className="hover:text-yellow-300">
                <FaStepBackward size={20} />
              </button>
              <button
                onClick={togglePlayPause}
                aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
                className="rounded-full bg-yellow-400 p-3 text-gray-900 shadow-md transition hover:bg-yellow-300"
              >
                {isPlaying ? <FaPause size={20} /> : <FaPlay size={20} />}
              </button>
              <button onClick={playNextTrack} aria-label="Siguiente canción" className="hover:text-yellow-300">
                <FaStepForward size={20} />
              </button>
            </div>
          </motion.div>

        ) : (
          
          // --- BOTÓN FLOTANTE COLAPSADO ---
          <motion.button
            key="button"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsOpen(true)}
            className="flex h-16 w-16 items-center justify-center rounded-full bg-yellow-400 text-gray-900 shadow-xl transition hover:bg-yellow-300"
            aria-label="Abrir reproductor de música"
          >
            <FaMusic size={24} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};