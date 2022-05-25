/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useContext } from 'react';

const RTAContext = createContext(
  {
    selectedCarIdValue: '',
    selectedCarNumberValue: '',
    selectedDriverNameValue: '',
    selectedVisitIdValue: '',
    selectedVisitCategoryValue: '',
    remarksValue: '',
  },
);

const RTAProvider = ({ children }) => {
  const [selectedCarId, setSelectedCarId] = useState({
    selectedCarIdValue: '',
  });
  const [selectedCarNumber, setSelectedCarNumber] = useState({
    selectedCarNumberValue: '',
  });
  const [selectedDriverName, setSelectedDriverName] = useState({
    selectedDriverNameValue: '',
  });
  const [selectedVisitId, setSelectedVisitId] = useState({
    selectedVisitIdValue: '',
  });
  const [selectedVisitCategory, setSelectedVisitCategory] = useState({
    selectedVisitCategoryValue: '',
  });
  const [remarks, setRemarks] = useState({
    remarksValue: '',
  });

  return (
    <RTAContext.Provider value={{
      selectedCarId,
      setSelectedCarId,
      selectedCarNumber,
      setSelectedCarNumber,
      selectedDriverName,
      setSelectedDriverName,
      selectedVisitId,
      setSelectedVisitId,
      selectedVisitCategory,
      setSelectedVisitCategory,
      remarks,
      setRemarks,
    }}
    >
      {children}
    </RTAContext.Provider>
  );
};

export const useRTAContext = () => useContext(RTAContext);
export default RTAProvider;
