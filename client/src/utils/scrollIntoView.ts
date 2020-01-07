declare global {
  interface Window {
    autoScrollEnabled: boolean;
  }
}

window.autoScrollEnabled = false;

export const setAutoScrollEnabled = (enabled: boolean) => {
  window.autoScrollEnabled = enabled;
};

export const scrollToRef = (ref, force = false) => {
  if ((force || window.autoScrollEnabled) && ref && ref.current) {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  }
};
