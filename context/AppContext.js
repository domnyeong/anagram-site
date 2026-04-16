import { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [lang, setLang] = useState('ko');
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    document.body.className = lang;
  }, [lang]);

  const openSubscribeModal = () => {
    setModalOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeSubscribeModal = () => {
    setModalOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <AppContext.Provider value={{ lang, setLang, modalOpen, openSubscribeModal, closeSubscribeModal }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
