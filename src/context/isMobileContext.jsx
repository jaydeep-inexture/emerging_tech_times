import React, { createContext, useContext, useState, useEffect } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

const MobileContext = createContext();

export const MobileProvider = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'));

  return (
    <MobileContext.Provider value={isMobile}>
      {children}
    </MobileContext.Provider>
  );
};

export const useMobile = () => {
  return useContext(MobileContext);
};
