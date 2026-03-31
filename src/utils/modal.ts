export const openContactModal = () => {
  window.dispatchEvent(new CustomEvent('open-contact-modal'));
};
