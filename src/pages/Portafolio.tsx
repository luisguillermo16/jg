import { type FC, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { GALLERY_IMAGES } from '../data/homeData';
import CategoriesSection from '../components/home/categories/CategoriesSection';
import GallerySection from '../components/home/gallery/GallerySection';
import FooterSection from '../components/home/footer/FooterSection';
import { useRevealOnScroll } from '../hooks/useRevealOnScroll';
import { useScrollSpy } from '../hooks/useScrollSpy';

const Portafolio: FC = () => {
  const activeSection = useScrollSpy(['categorias', 'galeria'], '-20% 0px -65% 0px');

  // Animaciones de aparición
  useRevealOnScroll();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-[#21201E] selection:bg-[#63D72A] selection:text-black min-h-screen font-sans">
      <Navbar activeSection={activeSection} />

      <main >
        {/* Espacio inicial para que el Navbar no tape el contenido */}


        <CategoriesSection />
        <GallerySection galleryImages={GALLERY_IMAGES} />
      </main>

      <FooterSection />
    </div>
  );
};

export default Portafolio;
 