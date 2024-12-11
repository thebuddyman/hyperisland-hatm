// components/context/right-sidebar-context.tsx
'use client';

import { createContext, useContext, useState, useEffect } from 'react';

type RightSidebarContextType = {
  isOpen: boolean;
  toggleSidebar: () => void;
};

const RightSidebarContext = createContext<RightSidebarContextType | undefined>(undefined);

export function RightSidebarProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const storedState = localStorage.getItem('right-sidebar:state');
    setIsOpen(storedState === 'true' ? true : false);
  }, []);

  const toggleSidebar = () => {
    setIsOpen((prev) => {
      const newState = !prev;
      localStorage.setItem('right-sidebar:state', newState.toString());
      return newState;
    });
  };

  return (
    <RightSidebarContext.Provider value={{ isOpen, toggleSidebar }}>
      {children}
    </RightSidebarContext.Provider>
  );
}

export const useRightSidebar = () => {
  const context = useContext(RightSidebarContext);
  if (context === undefined) {
    throw new Error('useRightSidebar must be used within a RightSidebarProvider');
  }
  return context;
};