import {useState, useEffect} from 'react';

const defaultWidth = 1080;

export const useIsMobile = () => {
  const [width, setWidth] = useState(defaultWidth);

  useEffect(() => {
    setWidth(window?.innerWidth ?? defaultWidth);
    const handleResize = () => {
      setWidth(window?.innerWidth ?? defaultWidth);
    };
    window.addEventListener('resize', handleResize, {passive: true});
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return {
    width,
    isMobile: width < 1200,
  };
};
