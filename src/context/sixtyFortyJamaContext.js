/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useContext } from 'react';

const JamaContext = createContext(
  {
    carReturnReasonValue: 'Family/Personal obligations',
    batteryNumberValue: '',
    batteryBrandValue: 1,
    fRTyreBrandValue: 1,
    fRWornOutValue: 3,
    fRPressureValue: '',
    fRTyreNumberValue: '',
    rRTyreBrandValue: 1,
    rRWornOutValue: 3,
    rRPressureValue: '',
    rRTyreNumberValue: '',
    fLTyreBrandValue: 1,
    fLWornOutValue: 3,
    fLPressureValue: '',
    fLTyreNumberValue: '',
    rLTyreBrandValue: 1,
    rLWornOutValue: 3,
    rLPressureValue: '',
    rLTyreNumberValue: '',
    stephanyPresentValue: true,
    sTyreBrandValue: 1,
    sTyreNumberValue: '',
  },
);

const JamaProvider = ({ children }) => {
  const [carReturnReason, setCarReturnReason] = useState({
    carReturnReasonValue: 'Family/Personal obligations',
  });
  const [batteryName, setBatteryName] = useState({
    batteryNameValue: '',
  });
  const [batteryBrand, setBatteryBrand] = useState({
    batteryBrandValue: 1,
  });
  const [fRTyreBrand, setfRTyreBrand] = useState({
    fRTyreBrandValue: 1,
  });
  const [fRWornOut, setfRWornOut] = useState({
    fRWornOutValue: 3,
  });
  const [fRPressure, setfRPressure] = useState({
    fRPressureValue: '',
  });
  const [fRTyreNumber, setfRTyreNumber] = useState({
    fRTyreNumberValue: '',
  });
  const [rRTyreBrand, setrRTyreBrand] = useState({
    rRTyreBrandValue: 1,
  });
  const [rRWornOut, setrRWornOut] = useState({
    rRWornOutValue: 3,
  });
  const [rRPressure, setrRPressure] = useState({
    rRPressureValue: '',
  });
  const [rRTyreNumber, setrRTyreNumber] = useState({
    rRTyreNumberValue: '',
  });
  const [fLTyreBrand, setfLTyreBrand] = useState({
    fLTyreBrandValue: 1,
  });
  const [fLWornOut, setfLWornOut] = useState({
    fLWornOutValue: 3,
  });
  const [fLPressure, setfLPressure] = useState({
    fLPressureValue: '',
  });
  const [fLTyreNumber, setfLTyreNumber] = useState({
    fLTyreNumberValue: '',
  });
  const [rLTyreBrand, setrLTyreBrand] = useState({
    rLTyreBrandValue: 1,
  });
  const [rLWornOut, setrLWornOut] = useState({
    rLWornOutValue: 3,
  });
  const [rLPressure, setrLPressure] = useState({
    rLPressureValue: '',
  });
  const [rLTyreNumber, setrLTyreNumber] = useState({
    rLTyreNumberValue: '',
  });
  const [stephanyPresent, setStephanyPresent] = useState({
    stephanyPresentValue: true,
  });
  const [sTyreBrand, setsTyreBrand] = useState({
    sTyreBrandValue: 1,
  });
  const [sTyreNumber, setsTyreNumber] = useState({
    sTyreNumberValue: '',
  });

  return (
    <JamaContext.Provider value={{
      carReturnReason,
      setCarReturnReason,
      batteryName,
      setBatteryName,
      batteryBrand,
      setBatteryBrand,
      fRTyreBrand,
      setfRTyreBrand,
      fRWornOut,
      setfRWornOut,
      fRPressure,
      setfRPressure,
      fRTyreNumber,
      setfRTyreNumber,
      rRTyreBrand,
      setrRTyreBrand,
      rRWornOut,
      setrRWornOut,
      rRPressure,
      setrRPressure,
      rRTyreNumber,
      setrRTyreNumber,
      fLTyreBrand,
      setfLTyreBrand,
      fLWornOut,
      setfLWornOut,
      fLPressure,
      setfLPressure,
      fLTyreNumber,
      setfLTyreNumber,
      rLTyreBrand,
      setrLTyreBrand,
      rLWornOut,
      setrLWornOut,
      rLPressure,
      setrLPressure,
      rLTyreNumber,
      setrLTyreNumber,
      stephanyPresent,
      setStephanyPresent,
      sTyreBrand,
      setsTyreBrand,
      sTyreNumber,
      setsTyreNumber,
    }}
    >
      {children}
    </JamaContext.Provider>
  );
};

export const useJamaContext = () => useContext(JamaContext);
export default JamaProvider;
