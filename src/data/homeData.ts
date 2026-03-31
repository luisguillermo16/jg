import bodaVideo from '../assets/home/vids/boda.mp4';
import socialVideo from '../assets/home/vids/social.mp4';
import corporativoVideo from '../assets/home/vids/corporativo.mp4';

import serviceAudio from '../assets/home/icons/service_audio.png';
import serviceLighting from '../assets/home/icons/service_lighting.png';
import serviceLed from '../assets/home/icons/service_led.png';
import gal1 from '../assets/gallery/MRW01846.jpg';
import gal2 from '../assets/gallery/MRW03505.jpg';
import gal3 from '../assets/gallery/MRW03575.jpg';
import gal4 from '../assets/gallery/MRW04373.jpg';
import gal5 from '../assets/gallery/MRW08896.jpg';
import gal6 from '../assets/gallery/MRW09177.jpg';
import gal7 from '../assets/gallery/MRW09244.jpg';
import gal8 from '../assets/gallery/MRW09445.jpg';
import gal9 from '../assets/gallery/MRW09447.jpg';
import gal10 from '../assets/gallery/MRW09474.jpg';
import gal11 from '../assets/gallery/MRW09758.jpg';
import gal12 from '../assets/gallery/MRW09772.jpg';

export const CATEGORIES = [
  {
    id: 'bodas',
    title: 'Bodas',
    description: 'Capturamos la esencia de tu gran día con tecnología cinematográfica y una sensibilidad artística que transforma cada instante en un legado visual eterno.',
    video: bodaVideo,
    tag: 'Elegancia y Romance'
  },
  {
    id: 'sociales',
    title: 'Eventos Sociales',
    description: 'Desde celebraciones vibrantes hasta reuniones íntimas, elevamos la energía y el diseño estético para crear ambientes memorables y llenos de vida.',
    video: socialVideo,
    tag: 'Energía y Estilo'
  },
  {
    id: 'corporativos',
    title: 'Corporativos',
    description: 'Precisión técnica y excelencia operativa para lanzamientos de marca, conferencias y eventos empresariales de alto impacto visual y sonoro.',
    video: corporativoVideo,
    tag: 'Precisión y Professionalismo'
  }
];

export const SERVICES = [
  {
    title: "Sonido Profesional",
    desc: "Sistemas Line Array de alta fidelidad para una cobertura acústica perfecta.",
    image: serviceAudio
  },
  {
    title: "Iluminación Robótica",
    desc: "Cabezas móviles y efectos que transforman tu celebración en algo único.",
    image: serviceLighting
  },
  {
    title: "Pantallas LED HD",
    desc: "Módulos de alta definición para visuales impactantes en tiempo real.",
    image: serviceLed
  },
  {
    title: "Efectos Especiales",
    desc: "Pirotecnia fría y niebla densa que añaden magia a cada momento.",
    image: gal6
  },
  {
    title: "Tarimas y Truss",
    desc: "Estructuras sólidas y escenarios personalizados para presentaciones.",
    image: gal3
  },
  {
    title: "Producción de Video",
    desc: "Cobertura multicámara y streaming para capturar cada ángulo.",
    image: gal4
  }
];

export const GALLERY_IMAGES = [
  gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10, gal11, gal12
];

export const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'categories', label: 'Categorías' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'galeria', label: 'Galería' }
];
