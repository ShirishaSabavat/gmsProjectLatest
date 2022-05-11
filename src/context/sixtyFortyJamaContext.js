/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useContext } from 'react';

const JamaContext = createContext(
  {
    selectedCarIDValue: 0,
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
    stepnyPresentValue: 1,
    stepnyBrandValue: 1,
    stepnyTyreNumberValue: '',
    carKmsValue: "",
    currentCarKmsValue: "",
    fasttagBalanceValue: "",
    fuelIndicatorPetrolBarValue: "Yes",
    cngValue: "Full",
    numberPlateStickerStatValue: "Front Main",
    jackStatValue: "Yes",
    panaStatValue: "Yes",
    tommyStatValue: "Yes",
    engineoilValue: "Sufficient",
    brakeoilValue: "Sufficient",
    coolantValue: "Sufficient",
    batteryChargeValue: "Okay",
    hornValue: "Okay"
  },
);

const JamaProvider = ({ children }) => {
  const [selectedCarID, setselectedCarID] = useState({
    selectedCarIDValue: 0,
  });
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
    fRWornOutValue: '<3',
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
    rRWornOutValue: '<3',
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
    fLWornOutValue: '<3',
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
    rLWornOutValue: '<3',
  });
  const [rLPressure, setrLPressure] = useState({
    rLPressureValue: '',
  });
  const [rLTyreNumber, setrLTyreNumber] = useState({
    rLTyreNumberValue: '',
  });
  const [stepnyPresent, setStepnyPresent] = useState({
    stepnyPresentValue: 1,
  });
  const [stepnyBrand, setStepnyBrand] = useState({
    stepnyBrandValue: 1,
  });
  const [stepnyTyreNumber, setStepnyTyreNumber] = useState({
    stepnyTyreNumberValue: '',
  });
  const [carKms, setCarKms] = useState({
    carKmsValue: ""
  });
  const [currentCarKms, setcurrentCarKms] = useState({
    currentCarKmsValue: ""
  });
  const [fasttagBalance, setfasttagBalance] = useState({
    fasttagBalanceValue: ""
  });
  const [fuelIndicatorPetrolBar, setfuelIndicatorPetrolBar] = useState({
    fuelIndicatorPetrolBarValue: "Yes"
  });
  const [cng, setCng] = useState({
    cngValue: "Full"
  });
  const [numberPlateStickerStat, setnumberPlateStickerStat] = useState({
    numberPlateStickerStatValue: "Front Main"
  });
  const [jackStat, setJackStat] = useState({
    jackStatValue: "Yes"
  });
  const [panaStat, setPanaStat] = useState({
    panaStatValue: "Yes"
  });
  const [tommyStat, setTommyStat] = useState({
    tommyStatValue: "Yes"
  });
  const [engineoil, setEngineOil] = useState({
    engineoilValue: "Sufficient"
  });
  const [brakeoil, setBrakeOil] = useState({
    brakeoilValue: "Sufficient"
  });
  const [coolant, setCoolant] = useState({
    coolantValue: "Sufficient"
  });
  const [batteryCharge, setBatteryCharge] = useState({
    batteryChargeValue: "Okay"
  });
  const [horn, setHorn] = useState({
    hornValue: "Okay"
  });

  return (
    <JamaContext.Provider value={{
      selectedCarID,
      setselectedCarID,
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
      stepnyPresent,
      setStepnyPresent,
      stepnyBrand,
      setStepnyBrand,
      stepnyTyreNumber,
      setStepnyTyreNumber,
      carKms,
      setCarKms,
      currentCarKms,
      setcurrentCarKms,
      fasttagBalance,
      setfasttagBalance,
      fuelIndicatorPetrolBar,
      setfuelIndicatorPetrolBar,
      cng,
      setCng,
      numberPlateStickerStat,
      setnumberPlateStickerStat,
      jackStat,
      setJackStat,
      panaStat,
      setPanaStat,
      tommyStat,
      setTommyStat,
      engineoil,
      setEngineOil,
      brakeoil,
      setBrakeOil,
      coolant,
      setCoolant,
      batteryCharge,
      setBatteryCharge,
      horn,
      setHorn,
    }}
    >
      {children}
    </JamaContext.Provider>
  );
};

export const useJamaContext = () => useContext(JamaContext);
export default JamaProvider;
