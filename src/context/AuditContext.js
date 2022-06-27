/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useContext } from 'react';

const AuditContext = createContext(
  {
    selectedCarValue: '',
    cardValue: false,
  },
);

const AuditProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState({
    selectedCarValue: '',
  });
  const [showCard, setShowCard] = useState({
    cardValue: false,
  });

  return (
    <AuditContext.Provider value={{
      selectedCar,
      setSelectedCar,
      showCard,
      setShowCard,
    }}
    >
      {children}
    </AuditContext.Provider>
  );
};

export const useAuditContext = () => useContext(AuditContext);
export default AuditProvider;
