/* eslint-disable global-require */
import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from 'react-helmet';
import { Radio, Button, Input } from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useJamaContext } from 'context/sixtyFortyJamaContext';

const nestedPath = [
  'Home',
  '60:40 Jama',
];

const CarInfoAudit = () => {
  const [radioValue, setRadioValue] = useState('');
  const history = useHistory();
  const goToTyreAudit = () => {
    history.push('/sixtyfortyjama/AcceptForSixtyFortyJama');
  };

  const {
    carKms,
    currentCarKms,
    fasttagBalance,
    fuelIndicatorPetrolBar,
    cng,
    numberPlateStickerStat,
    jackStat,
    panaStat,
    tommyStat,
    engineoil,
    brakeoil,
    coolant,
    batteryCharge,
    horn,
    setCarKms,
    setcurrentCarKms,
    setfasttagBalance,
    setfuelIndicatorPetrolBar,
    setCng,
    setnumberPlateStickerStat,
    setJackStat,
    setPanaStat,
    setTommyStat,
    setEngineOil,
    setBrakeOil,
    setCoolant,
    setBatteryCharge,
    setHorn
  } = useJamaContext();

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            60:40 Jama
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
      </div>
      <div className="bg-white rounded-lg my-3 mx-2">
        <div className="flex flex-row flex-nonwrap justify-center">
          <img className="w-20 h-20 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/carimage.jpg')} />
          <div>
            <h1 className="font-quicksand-bold text-xl mt-3">MH04 BJ 1904</h1>
            <div className="flex flex-row">
              <h1 className="font-quicksand-semi-bold text-sm mt-1">Visit ID: </h1>
              <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">sgsdfg654654</h1>
            </div>
            <div className="flex flex-row">
              <h1 className="font-quicksand-semi-bold text-sm mt-1">Time Stamp: </h1>
              <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">2022/02/21 13:54</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row ml-12 mt-2">
          <h1 className="font-quicksand-semi-bold text-sm mt-1">Driver: </h1>
          <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300 ml-12">John Doe</h1>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Car Details</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Car Kms*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={carKms.carKmsValue}
            onChange={(e) => setCarKms({ carKmsValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Current Kms*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={currentCarKms.currentCarKmsValue}
            onChange={(e) => setcurrentCarKms({ currentCarKmsValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Fuel Indicator Petrol (1 bar)*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setfuelIndicatorPetrolBar({ fuelIndicatorPetrolBarValue: e.target.value })} value={fuelIndicatorPetrolBar.fuelIndicatorPetrolBarValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Fastag Balance*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fasttagBalance.fasttagBalanceValue}
            onChange={(e) => setfasttagBalance({ fasttagBalanceValue: e.target.value })}
            placeholder="Enter Name Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>CNG*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setCng({ cngValue: e.target.value })} value={cng.cngValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Full">Full</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Empty">Empty</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Half full and Above">Half full and Above</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Below Half">Below Half</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Number Plate Sticker Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setnumberPlateStickerStat({ numberPlateStickerStatValue: e.target.value })} value={numberPlateStickerStat.numberPlateStickerStatValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Front Main</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">Back Main</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Back Right side</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">Back left side</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Jack Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setJackStat({ jackStatValue: e.target.value })} value={jackStat.jackStatValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Pana Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setPanaStat({ panaStatValue: e.target.value })} value={panaStat.panaStatValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Tommy Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setTommyStat({ tommyStatValue: e.target.value })} value={tommyStat.tommyStatValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Engine Oil*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setEngineOil({ carReturnReasonValue: e.target.value })} value={engineoil.engineoilValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brake Oil*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setBrakeOil({ brakeoilValue: e.target.value })} value={brakeoil.brakeoilValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Coolant*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setCoolant({ coolantValue: e.target.value })} value={coolant.coolantValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Battery Charge*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setBatteryCharge({ carReturnReasonValue: e.target.value })} value={batteryCharge.batteryChargeValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Okay">Okay</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No Charge">No Charge</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-5">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Horn*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setHorn({ hornValue: e.target.value })} value={horn.hornValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Okay">Okay</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No Charge">No Charge</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="col-12 flex flex-row justify-end">
        <Button
          onClick={goToTyreAudit}
          className="font-quicksand-medium"
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Next
        </Button>
      </div>
    </>
  );
};
export default CarInfoAudit;
