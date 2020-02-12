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
  setTimeout(() => {
    if ((force || window.autoScrollEnabled) && ref && ref.current) {
      ref.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, 100);
};

export const scrollToTop = (force = false) => {
  setTimeout(() => {
    if (force || window.autoScrollEnabled) {
      window.scrollTo(0, 0);
    }
  }, 100);
};
