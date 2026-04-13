const bodaVideo = 'https://luispineda.b-cdn.net/boda.mp4';
const bodaMobileVideo = 'https://luispineda.b-cdn.net/boda%20telefonos.mp4';
const socialVideo = 'https://luispineda.b-cdn.net/social.mp4';
const corporativoVideo = 'https://luispineda.b-cdn.net/corporativo.mp4';
// Usar CDN de Bunny.net para los videos

import serviceAudio from '../assets/home/icons/service_audio.webp';
import serviceLighting from '../assets/home/icons/service_lighting.webp';
import serviceLed from '../assets/home/icons/service_led.webp';
import gal1 from '../assets/gallery/MRW01846.webp';
import gal2 from '../assets/gallery/MRW03505.webp';
import gal3 from '../assets/gallery/MRW03575.webp';
import gal4 from '../assets/gallery/MRW04373.webp';
import gal5 from '../assets/gallery/MRW08896.webp';
import gal6 from '../assets/gallery/MRW09177.webp';
import gal7 from '../assets/gallery/MRW09244.webp';
import gal8 from '../assets/gallery/MRW09445.webp';
import gal9 from '../assets/gallery/MRW09447.webp';
import gal10 from '../assets/gallery/MRW09474.webp';
import gal11 from '../assets/gallery/MRW09758.webp';
import gal12 from '../assets/gallery/MRW09772.webp';

export const CATEGORIES = [
  {
    id: 'bodas',
    title: 'Bodas',
    description: 'Capturamos la esencia de tu gran día con tecnología cinematográfica y una sensibilidad artística que transforma cada instante en un legado visual eterno.',
    video: bodaVideo,
    videoMobile: bodaMobileVideo,
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
    description: 'Puntualidad, respaldo técnico y excelencia operativa para lanzamientos de marca, conferencias y eventos empresariales de alto impacto. Sin errores, sin improvisación.',
    video: corporativoVideo,
    tag: 'Precisión y Confianza'
  }
];

export const SERVICES = [
  {
    title: "Acústica Impecable",
    desc: "Cada palabra y cada nota llegan nítidas a toda la sala. Sistemas Line Array de alta fidelidad sin distorsión, sin zonas muertas.",
    image: serviceAudio,
    tag: "Audio de Alta Gama"
  },
  {
    title: "Escenarios que Impresionan",
    desc: "Iluminación robótica inteligente que convierte cualquier espacio en una experiencia visual única e irrepetible.",
    image: serviceLighting,
    tag: "Iluminación Robótica"
  },
  {
    title: "Visuales que Impactan",
    desc: "Pantallas LED en alta definición que mantienen la atención de tus invitados y amplifican cada momento clave.",
    image: serviceLed,
    tag: "Pantallas LED UHD"
  },
  {
    title: "Momentos Inolvidables",
    desc: "Pirotecnia fría y niebla densa que generan reacciones espontáneas y convierten instantes ordinarios en escenas épicas.",
    image: gal6,
    tag: "Efectos Especiales"
  },
  {
    title: "Escenarios a tu Medida",
    desc: "Tarimas y estructuras truss seguras y personalizadas. Cada presentación con la presencia que merece.",
    image: gal3,
    tag: "Estructuras y Tarimas"
  },
  {
    title: "Nada se Pierde",
    desc: "Cobertura multicámara y transmisión en vivo para que cada ángulo, cada emoción, quede inmortalizado.",
    image: gal4,
    tag: "Streaming y Video"
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
