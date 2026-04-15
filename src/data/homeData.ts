import serviceAudio from '../assets/home/icons/service_audio.webp';
import serviceLighting from '../assets/home/icons/service_lighting.webp';
import serviceLed from '../assets/home/icons/service_led.webp';
import bgBoda from '../assets/home/img/boda sevicios.jfif';
import bgConcierto from '../assets/home/img/concierto servicios.jpg';
import bgCorp from '../assets/home/img/corporativos servicios.jpg';
import bgMarca from '../assets/home/img/marca servicios.jfif';
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

export const SERVICES = [
  {
    title: "Bodas & Eventos Sociales",
    desc: "Tu día más especial merece una producción impecable.",
    features: ["Iluminación", "Sonido", "Montaje", "Coordinación"],
    image: bgBoda
  },
  {
    title: "Conciertos & Shows",
    desc: "Producción técnica de alto nivel para shows en vivo. Escenarios y gestión completa del evento.",
    features: ["Escenarios", "Rider técnico", "Visuales LED", "PA System"],
    image: bgConcierto
  },
  {
    title: "Eventos Corporativos",
    desc: "Conferencias y lanzamientos que transmiten el profesionalismo de tu empresa en cada evento.",
    features: ["Conferencias", "A/V Profesional", "Streaming", "Ambientación"],
    image: bgCorp
  },
  {
    title: "Lanzamientos de Marca",
    desc: "Experiencias de marca que generan impacto y recordación en el centro del escenario.",
    features: ["BTL", "Branding", "Experiencias"],
    image: bgMarca
  }
];

export const GALLERY_IMAGES = [
  gal1, gal2, gal3, gal4, gal5, gal6, gal7, gal8, gal9, gal10, gal11, gal12
];

export const CATEGORIES = [
  {
    id: 'bodas',
    title: 'Bodas',
    tag: 'Categoría',
    desc: 'Capturamos la esencia del día más importante de tu vida con una producción audiovisual de nivel cinematográfico.',
    video: 'https://luispineda.b-cdn.net/boda.mp4',
    videoMobile: 'https://luispineda.b-cdn.net/bodaParaTelefono.mp4'
  },
  {
    id: 'corporativo',
    title: 'Corporativo',
    tag: 'Categoría',
    desc: 'Elevamos la imagen de tu marca con lanzamientos y convenciones que proyectan innovación y profesionalismo.',
    video: 'https://luispineda.b-cdn.net/corporativo.mp4',
    videoMobile: 'https://luispineda.b-cdn.net/corprativoTelefono.mp4'
  },
  {
    id: 'social',
    title: 'Eventos Sociales',
    tag: 'Categoría',
    desc: 'Desde aniversarios hasta grandes celebraciones, creamos el escenario perfecto para tus mejores recuerdos.',
    video: 'https://luispineda.b-cdn.net/social.mp4',
    videoMobile: 'https://luispineda.b-cdn.net/solcialTelefono.mp4'
  }
];

export const SECTIONS = [
  { id: 'hero', label: 'Inicio' },
  { id: 'categorias', label: 'Categorías' },
  { id: 'servicios', label: 'Servicios' },
  { id: 'galeria', label: 'Galería' }
];
