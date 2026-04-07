/**
 * Stable mobile detection — computed once at module load.
 * Use this to enable lighter animation paths on low-end / touch devices.
 */
export const isMobileDevice: boolean =
  typeof window !== 'undefined' &&
  (window.innerWidth < 768 || /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
