/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useContext } from 'react';

const QueueContext = createContext({});

const QueueProvider = ({ children }) => {
  const [cardObject, setCardObject] = useState({
  });

  return (
    <QueueContext.Provider value={{
      cardObject,
      setCardObject,
    }}
    >
      {children}
    </QueueContext.Provider>
  );
};

export const useQueueContext = () => useContext(QueueContext);
export default QueueProvider;
