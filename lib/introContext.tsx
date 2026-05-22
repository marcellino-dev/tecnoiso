'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

type IntroPhase = 'loading' | 'lifting' | 'done';

const IntroContext = createContext<{
  phase: IntroPhase;
  setPhase: (p: IntroPhase) => void;
}>({ phase: 'loading', setPhase: () => {} });

export function IntroProvider({ children }: { children: ReactNode }) {
  const [phase, setPhase] = useState<IntroPhase>('loading');
  return (
    <IntroContext.Provider value={{ phase, setPhase }}>
      {children}
    </IntroContext.Provider>
  );
}

export const useIntroPhase = () => useContext(IntroContext);