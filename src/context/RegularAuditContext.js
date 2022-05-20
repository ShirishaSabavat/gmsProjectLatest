/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useContext } from 'react';

const RegularAuditContext = createContext({
  selectedCarValue: '',
  selectedCarIDValue: 0,
  visitIdValue: '',
});

const RegularAuditProvider = ({ children }) => {
  const [selectedCar, setSelectedCar] = useState({
    selectedCarValue: '',
  });
  const [selectedCarID, setselectedCarID] = useState({
    selectedCarIDValue: 0,
  });
  const [visitId, setVisitId] = useState({
    visitIdValue: '',
  });
  const [carKms, setCarKms] = useState({
    carKmsValue: '',
  });
  const [currentCarKms, setcurrentCarKms] = useState({
    currentCarKmsValue: '',
  });
  const [fasttagBalance, setfasttagBalance] = useState({
    fasttagBalanceValue: '',
  });
  const [fuelIndicatorPetrolBar, setfuelIndicatorPetrolBar] = useState({
    fuelIndicatorPetrolBarValue: 'Yes',
  });
  const [cng, setCng] = useState({
    cngValue: 'Full',
  });
  const [numberPlateStickerStat, setnumberPlateStickerStat] = useState({
    numberPlateStickerStatValue: 'Front Main',
  });
  const [jackStat, setJackStat] = useState({
    jackStatValue: 'Yes',
  });
  const [panaStat, setPanaStat] = useState({
    panaStatValue: 'Yes',
  });
  const [tommyStat, setTommyStat] = useState({
    tommyStatValue: 'Yes',
  });
  const [engineoil, setEngineOil] = useState({
    engineoilValue: 'Sufficient',
  });
  const [brakeoil, setBrakeOil] = useState({
    brakeoilValue: 'Sufficient',
  });
  const [coolant, setCoolant] = useState({
    coolantValue: 'Sufficient',
  });
  const [batteryCharge, setBatteryCharge] = useState({
    batteryChargeValue: 'Okay',
  });
  const [horn, setHorn] = useState({
    hornValue: 'Okay',
  });
  return (
    <RegularAuditContext.Provider value={{
      selectedCar,
      setSelectedCar,
      selectedCarID,
      setselectedCarID,
      visitId,
      setVisitId,
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
    </RegularAuditContext.Provider>
  );
};

export const useRegularAuditContext = () => useContext(RegularAuditContext);
export default RegularAuditProvider;
