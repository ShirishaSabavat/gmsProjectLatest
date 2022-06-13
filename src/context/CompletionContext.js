/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useContext } from 'react';

const CompletionContext = createContext(
  {
    selectedCarIdValue: '',
    selectedCarNumberValue: '',
    selectedDriverNameValue: '',
    selectedVisitIdValue: '',
    selectedVisitCategoryValue: '',
    remarksValue: '',
  },
);

const CompletionProvider = ({ children }) => {
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
  const [cardObject, setCardObject] = useState({
  });
  const [operator, setOperator] = useState(0);

  const ResetContextValues = () => {
    setSelectedCarId({
      selectedCarIdValue: '',
    });
    setSelectedCarNumber({
      selectedCarNumberValue: '',
    });
    setSelectedDriverName({
      selectedDriverNameValue: '',
    });
    setSelectedVisitId({
      selectedVisitIdValue: '',
    });
    setSelectedVisitCategory({
      selectedVisitCategoryValue: '',
    });
    setRemarks({
      remarksValue: '',
    });
  };

  return (
    <CompletionContext.Provider value={{
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
      cardObject,
      setCardObject,
      ResetContextValues,
      operator,
      setOperator,
    }}
    >
      {children}
    </CompletionContext.Provider>
  );
};

export const useCompletionContext = () => useContext(CompletionContext);
export default CompletionProvider;
