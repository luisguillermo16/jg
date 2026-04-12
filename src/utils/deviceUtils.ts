/**
 * Stable mobile detection — computed once at module load.
 * Use this to enable lighter animation paths on low-end / touch devices.
 */
export const isMobileDevice: boolean =
  typeof window !== 'undefined' &&
  (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));

/** Ahorro de datos del sistema (móvil / conexión limitada) */
export const prefersSaveData: boolean =
  typeof navigator !== 'undefined' &&
  Boolean(
    (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData,
  );

/** Evitar vídeos / fotos pesadas: móvil o Data Saver */
export const isMediaLite: boolean = isMobileDevice || prefersSaveData;
