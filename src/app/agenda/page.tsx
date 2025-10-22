// src/app/agenda/page.tsx
'use client';

import { useState } from 'react';
import { motion, Variants } from 'framer-motion';
import Link from 'next/link';
import { FaArrowLeft, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

// --- Tipos y Datos ---
const services = ['Corte de Pelo', 'Barbería', 'Perfilado', 'Otro'];

// Genera los horarios del día en intervalos de 1 hora
const generateTimeSlots = () => {
  const slots = [];
  for (let i = 9; i <= 20; i++) {
    // Marca los horarios de colación como bloqueados
    const isBlocked = i >= 13 && i < 15;
    slots.push({ time: `${i}:00`, isBlocked });
  }
  return slots;
};

const timeSlots = generateTimeSlots();

// --- Variantes de Animación ---
const containerVariants: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 15,
      stiffness: 100,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export default function AgendaPage() {
  const [name, setName] = useState('');
  const [service, setService] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [errors, setErrors] = useState<{ name?: string; time?: string }>({});

  const handleDateChange = (amount: number) => {
    setSelectedDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setDate(newDate.getDate() + amount);
      return newDate;
    });
    setSelectedTime(null); // Resetea la hora al cambiar de día
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: { name?: string; time?: string } = {};

    if (!name.trim()) {
      newErrors.name = 'El nombre es obligatorio.';
    }
    if (!selectedTime) {
      newErrors.time = 'Debes seleccionar una hora.';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      const bookingData = {
        clientName: name,
        service: service || 'No especificado',
        date: selectedDate.toLocaleDateString('es-CL'),
        time: selectedTime,
      };
      console.log('Datos de la reserva:', bookingData);
      alert('¡Reserva simulada con éxito! Revisa la consola para ver los datos.');
      // Aquí iría la lógica para enviar a Firebase
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('es-CL', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  
  return (
    <div className="min-h-screen md:h-[40vh] font-alumniSans w-full overflow-y-hidden mt-0 md:-mt-8 flex items-start  justify-center p-4 bg-black">
      <motion.div
        className="relative w-full max-w-4xl p-8 md:p-12
                   bg-black/20 border-[16px] border-solid 
                   [border-image:url(/madera.jpeg)_30_stretch]"
        variants={containerVariants}
       
        animate="visible"
      >
        {/* Botón para volver al inicio */}
        <Link href="/" className="absolute top-4 left-4 text-[#D39154] hover:text-white transition-colors">
          <FaArrowLeft size={24} />
        </Link>
        
        {/* Título */}
        <motion.h1
          className="text-4xl md:text-3xl font-alumniSans font-bold text-center mb-8 md:mb-0
                     bg-cover bg-clip-text text-transparent bg-[url('/madera2.jpeg')]"
          style={{ textShadow: '2px 2px 4px rgba(0,0,0,0.5)' }}
          variants={itemVariants}
        >
          Agenda tu Hora
        </motion.h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Sección de Datos del Cliente */}
          <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-lg font-alumniSans text-neutral-300 mb-2">
                Nombre del Cliente
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-3 bg-black/30 text-white rounded-md border border-white/20 focus:ring-2 focus:ring-[#D39154] focus:border-[#D39154] outline-none focus:bg-black transition-all"
              />
              {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
            </div>
            <div>
              <label htmlFor="service" className="block text-lg font-alumniSans text-neutral-300 mb-2">
                Servicio (Opcional)
              </label>
              <select
                id="service"
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full p-3 bg-black/30 text-white rounded-md border border-white/20 focus:ring-2 focus:ring-[#D39154] focus:border-[#D39154] outline-none transition-all"
              >
                <option value="">Selecciona un servicio...</option>
                {services.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
          </motion.div>

          {/* Sección de Selección de Fecha y Hora */}
          <motion.div variants={itemVariants}>
            <div className="flex items-center justify-between mb-2">
              <button type="button" onClick={() => handleDateChange(-1)} className="p-2 text-[#D39154] hover:text-white rounded-full transition-colors">
                <FaChevronLeft size={20} />
              </button>
              <h3 className="text-xl text-center text-neutral-200 font-bold capitalize">{formatDate(selectedDate)}</h3>
              <button type="button" onClick={() => handleDateChange(1)} className="p-2 text-[#D39154] hover:text-white rounded-full transition-colors">
                <FaChevronRight size={20} />
              </button>
            </div>
            
            <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-6 gap-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  type="button"
                  disabled={slot.isBlocked}
                  onClick={() => !slot.isBlocked && setSelectedTime(slot.time)}
                  className={`p-3 md:p-2 text-center rounded-md font-bold transition-all duration-200
                    ${slot.isBlocked
                      ? 'bg-red-900/50 text-neutral-500 cursor-not-allowed'
                      : selectedTime === slot.time
                        ? 'bg-[#D39154] text-black scale-110 shadow-lg'
                        : 'bg-gray-700/50 text-neutral-300 hover:bg-gray-600/70'
                    }
                  `}
                >
                  {slot.time}
                </button>
              ))}
            </div>
            {errors.time && <p className="text-red-500 text-sm mt-2 text-center">{errors.time}</p>}
          </motion.div>

          {/* Botones de Acción */}
          <motion.div variants={itemVariants} className="flex justify-center items-start gap-6 pt-6 md:pt-0">
            <button
              type="submit"
              className="px-8 py-3 font-bold text-lg text-black bg-[#D39154] rounded-md hover:brightness-110 transition-all shadow-lg"
            >
              Agendar
            </button>
            <Link href="/" className="px-8 py-3 font-bold text-lg text-neutral-300 bg-black/40 border border-white/30 rounded-md hover:bg-neutral-700 transition-all">
              Cancelar
            </Link>
          </motion.div>
        </form>
      </motion.div>
    </div>
  );
}
