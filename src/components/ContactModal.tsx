import { type FC, useState, useEffect } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactModal: FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    telefono: '',
    descripcion: '',
    ciudad: '',
    tipoEvento: '',
    fechaEvento: '',
  });

  // Prevent scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const formatDateLabel = (value: string) => {
    if (!value) return '';
    const date = new Date(value);
    return date.toLocaleString('es-CO', { 
      day: 'numeric',
      month: 'long', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { nombre, apellido, telefono, descripcion, ciudad, tipoEvento, fechaEvento } = formData;

    const fechaLabel = formatDateLabel(fechaEvento);

    const message =
      `Hola, mi nombre es ${nombre} ${apellido}.\n` +
      `Tipo de evento: ${tipoEvento}\n` +
      `Fecha y hora: ${fechaLabel}\n` +
      `Ciudad: ${ciudad} | Teléfono: ${telefono}\n` +
      `Detalle: ${descripcion}`;

    const whatsappUrl = `https://wa.me/573007103577?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    onClose();
  };

  const containerVariants: Variants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring' as const,
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      transition: { duration: 0.2 },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const inputClass =
    'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-sans text-sm';

  const selectClass =
    'w-full bg-[#0f0f0f] border border-white/10 rounded-xl px-4 py-2.5 text-white focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/50 transition-all font-sans text-sm appearance-none cursor-pointer';

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-md bg-[#0a0a0a] border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]"
          >
            {/* Glow Effects */}
            <div className="absolute -top-24 -left-24 w-32 h-32 bg-accent/20 rounded-full blur-[60px] pointer-events-none" />
            <div className="absolute -bottom-24 -right-24 w-32 h-32 bg-accent/10 rounded-full blur-[60px] pointer-events-none" />

            <div className="relative p-6 sm:p-8">
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={onClose}
                className="absolute top-6 right-6 text-white/30 hover:text-white transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>

              <div className="mb-5">
                <motion.h2
                  variants={itemVariants}
                  className="text-2xl font-bold text-white mb-0 font-remixa uppercase tracking-tight"
                >
                  Contáctanos
                </motion.h2>
                <motion.p variants={itemVariants} className="text-white/30 text-xs mt-1 font-sans">
                  Cuéntanos sobre tu evento y te respondemos en menos de 24h.
                </motion.p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">

                {/* Nombre + Apellido */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-accent font-black px-1">Nombre</label>
                    <input
                      required
                      type="text"
                      name="nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Tu nombre"
                    />
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-accent font-black px-1">Apellido</label>
                    <input
                      required
                      type="text"
                      name="apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      className={inputClass}
                      placeholder="Tu apellido"
                    />
                  </motion.div>
                </div>

                {/* Tipo de Evento + Fecha */}
                <div className="grid grid-cols-2 gap-3">
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-accent font-black px-1">Tipo de Evento</label>
                    <div className="relative">
                      <select
                        required
                        name="tipoEvento"
                        value={formData.tipoEvento}
                        onChange={handleChange}
                        className={selectClass}
                      >
                        <option value="" disabled hidden>Seleccionar</option>
                        <option value="Boda">Boda</option>
                        <option value="Corporativo">Corporativo</option>
                        <option value="Evento Social">Evento Social</option>
                        <option value="Concierto">Concierto</option>
                        <option value="Otro">Otro</option>
                      </select>
                      {/* Chevron icon */}
                      <svg className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </motion.div>
                  <motion.div variants={itemVariants} className="space-y-1">
                    <label className="text-[9px] uppercase tracking-[0.2em] text-accent font-black px-1">Fecha y Hora del Evento</label>
                    <input
                      required
                      type="datetime-local"
                      name="fechaEvento"
                      value={formData.fechaEvento}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </motion.div>
                </div>

                {/* Teléfono */}
                <motion.div variants={itemVariants} className="space-y-1">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-accent font-black px-1">Teléfono</label>
                  <input
                    required
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Ej: 300 000 0000"
                  />
                </motion.div>

                {/* Ciudad */}
                <motion.div variants={itemVariants} className="space-y-1">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-accent font-black px-1">Ciudad</label>
                  <input
                    required
                    type="text"
                    name="ciudad"
                    value={formData.ciudad}
                    onChange={handleChange}
                    className={inputClass}
                    placeholder="Ciudad del evento"
                  />
                </motion.div>

                {/* Descripción */}
                <motion.div variants={itemVariants} className="space-y-1">
                  <label className="text-[9px] uppercase tracking-[0.2em] text-accent font-black px-1">Cuéntanos más</label>
                  <textarea
                    required
                    rows={2}
                    name="descripcion"
                    value={formData.descripcion}
                    onChange={handleChange}
                    className={`${inputClass} resize-none`}
                    placeholder="¿Qué necesitas para tu evento?"
                  />
                </motion.div>

                {/* Submit */}
                <motion.button
                  variants={itemVariants}
                  whileHover={{ scale: 1.02, boxShadow: '0 0 30px rgba(163, 255, 0, 0.4)' }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-accent text-black font-black uppercase tracking-widest py-3.5 rounded-xl transition-all duration-300 mt-1 shadow-[0_10px_30px_rgba(163,255,0,0.2)] flex items-center justify-center gap-3 text-xs"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                  Enviar por WhatsApp
                </motion.button>
              </form>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
