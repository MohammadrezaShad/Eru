'use client';
/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import { createContext, useContext, useMemo } from 'react';

import { createStore } from './create-store';

export function createFastContext<Store>(initialState: Store) {
  function useStoreData() {
    const store = useMemo(() => createStore(initialState), []);
    return store;
  }

  type UseStoreDataReturnType = ReturnType<typeof useStoreData>;

  const StoreContext = createContext<UseStoreDataReturnType | null>(null);

  function Provider({ children }: { children: React.ReactNode }) {
    return (
      <StoreContext.Provider value={useStoreData()}>
        {children}
      </StoreContext.Provider>
    );
  }

  function useStoreContext<SelectorOutput>(
    selector: (store: Store) => SelectorOutput,
  ): [
    SelectorOutput,
    (value: Partial<Store>) => void,
    (initialServerState: Store) => void,
  ] {
    const store = useContext(StoreContext);
    if (!store) {
      throw new Error('StoreContext must be used within a <Provider />');
    }

    const state = store?.useStore(selector);
    const initialFnc = () => {
      console.log('initial');
    };

    return [
      state as SelectorOutput,
      store?.set || initialFnc,
      store?.serverInitialize || initialFnc,
    ];
  }

  return {
    Provider,
    useStoreContext,
  };
}
