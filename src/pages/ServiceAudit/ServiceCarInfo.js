/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import {
  Radio, Button, Input, Checkbox,
} from 'antd';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useJamaContext } from 'context/sixtyFortyJamaContext';
import { getCarKms } from 'services/axios';
import moment from 'moment';

const ServiceCarInfo = () => {
  const [carKmsError, setCarKmsError] = useState({});
  const [currentCarKmsError, setCurrentCarKmsError] = useState({});
  // const [fasttagBalanceError, setFasttagBalanceError] = useState({});
  const [cngError, setCngError] = useState({});
  const history = useHistory();

  const {
    selectedCar,
    visitId,
    carKms,
    currentCarKms,
    // fasttagBalance,
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
    setHorn,
    frontMainSticker,
    setFrontMainSticker,
    backMainSticker,
    setBackMainSticker,
    backRightSticker,
    setBackRightSticker,
    backLeftSticker,
    setBackLeftSticker,
    driverName,
    cardObject,
  } = useJamaContext();

  useEffect(() => {
    const tempCarId = cardObject?.carId?.id;
    getCarKms(tempCarId)
      .then((resp) => {
        setCarKms({ carKmsValue: resp?.data?.results?.car_km || 0 });
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const validateFormData = () => {
    let isValid = true;
    const carKmsErr = {};
    const currentCarKmsErr = {};
    // const fasttagBalanceErr = {};
    const cngErr = {};

    if (carKms.carKmsValue === null) {
      carKmsErr.err = 'This field cannot be empty';
      isValid = false;
    }
    if (Number(currentCarKms.currentCarKmsValue) <= Number(carKms.carKmsValue)) {
      currentCarKmsErr.err = 'Current KMs should be greater than Car KMs';
      isValid = false;
    }
    if (!currentCarKms.currentCarKmsValue) {
      currentCarKmsErr.err = 'This field cannot be empty';
      isValid = false;
    }
    // if (!fasttagBalance.fasttagBalanceValue) {
    //   fasttagBalanceErr.err = 'This field cannot be empty';
    //   isValid = false;
    // }
    if (!cng.cngValue) {
      cngErr.err = 'This field cannot be empty';
      isValid = false;
    }

    setCarKmsError(carKmsErr);
    setCurrentCarKmsError(currentCarKmsErr);
    // setFasttagBalanceError(fasttagBalanceErr);
    setCngError(cngErr);
    return isValid;
  };

  const goToTyreAudit = () => {
    const resp = validateFormData();
    if (resp) {
      history.push('/ServiceAudit/ServiceSubmit');
    }
  };

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="px-2 py-0 mb-3 mx-1 max-w-sm bg-white rounded-lg border shadow-md sm:p-6">
        <div
          className=" my-2 flex items-center p-2 text-base font-bold text-gray-900 rounded-lg"
          style={{ backgroundColor: '#f4fcfc' }}
        >
          <span className="flex-1 ml-3 font-quicksand-bold text-xl whitespace-nowrap">{cardObject.car_number}</span>
          <span className=" font-quicksand-semi-bold px-2 py-0.5 ml-3 text-xs text-gray-500 truncate">{cardObject.carId?.model?.name}</span>
        </div>
        <div
          className=" my-2 flex items-center p-2 text-base font-bold text-gray-900 rounded-lg"
          style={{ backgroundColor: '#f4fcfc' }}
        >
          <div className="flex-1 min-w-0">
            <p className="text-sm font-quicksand-medium text-gray-900 truncate mb-1">
              Team:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate mb-1">
                {cardObject.driver_manager_name}
              </p>
            </p>
            <p className="text-sm font-quicksand-medium text-gray-900 truncate my-1">
              Driver:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate my-1">
                {cardObject.driver_name}
              </p>
            </p>
            <p className="text-sm font-quicksand-medium text-gray-900 truncate my-1">
              Mobile:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate my-1">
                {cardObject.drive_contact_number}
              </p>
            </p>
            <p className="text-sm font-bold font-quicksand-medium text-gray-900 truncate mt-1 mb-0">
              In-Time:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate mt-1 mb-0">
                {moment(
                  cardObject.createdAt,
                ).format('DD-MM-YYYY, h:mm:ss a')}
              </p>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-bold text-sm">Car Details</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Car Kms
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={carKms.carKmsValue}
            onChange={(e) => setCarKms({ carKmsValue: e.target.value })}
            readOnly
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(carKmsError).map((key) => (
            <div style={{ color: 'red' }}>
              {carKmsError[key]}
            </div>
          ))}
        </div>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Current Kms
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={currentCarKms.currentCarKmsValue}
            onChange={(e) => setcurrentCarKms({ currentCarKmsValue: e.target.value })}
            placeholder="Enter Current KMs Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(currentCarKmsError).map((key) => (
            <div style={{ color: 'red' }}>
              {currentCarKmsError[key]}
            </div>
          ))}
        </div>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Fuel Indicator Petrol (1 bar)
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="bg-white">
          <Radio.Group
            onChange={
              (e) => setfuelIndicatorPetrolBar({ fuelIndicatorPetrolBarValue: e.target.value })
            }
            value={fuelIndicatorPetrolBar.fuelIndicatorPetrolBarValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={0}>0</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>1</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>2</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>3</Radio>
          </Radio.Group>
        </div>
      </div>
      {/* <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Fastag Balance*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fasttagBalance.fasttagBalanceValue}
            onChange={(e) => setfasttagBalance({ fasttagBalanceValue: e.target.value })}
            placeholder="Enter Fast tag Balance Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(fasttagBalanceError).map((key) => (
            <div style={{ color: 'red' }}>
              {fasttagBalanceError[key]}
            </div>
          ))}
        </div>
      </div> */}
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          CNG
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={cng.cngValue}
            onChange={(e) => setCng({
              cngValue: e.target.value.replace(
                /\D/g,
                '',
              ),
            })}
            maxLength={1}
            placeholder="Enter CNG Indicator Value Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
            }}
          />
        </div>
        <div className="flex flex-row flex-nonwrap bg-white">
          {Object.keys(cngError).map((key) => (
            <div style={{ color: 'red' }}>
              {cngError[key]}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Number Plate Sticker Status</p>
        <div className="bg-white">
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setFrontMainSticker({ frontMainStickerValue: !frontMainSticker.frontMainStickerValue })}>Front Main</Checkbox>
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setBackMainSticker({ backMainStickerValue: !backMainSticker.backMainStickerValue })}>Back Main</Checkbox>
        </div>
        <div className="bg-white">
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setBackRightSticker({ backRightStickerValue: !backRightSticker.backRightStickerValue })}>Back Right side</Checkbox>
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setBackLeftSticker({ backLeftStickerValue: !backLeftSticker.backLeftStickerValue })}>Back left side</Checkbox>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Jack Status
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="bg-white">
          <Radio.Group
            onChange={
              (e) => setJackStat({ jackStatValue: e.target.value })
            }
            value={jackStat.jackStatValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Pana Status
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="bg-white">
          <Radio.Group
            onChange={
              (e) => setPanaStat({ panaStatValue: e.target.value })
            }
            value={panaStat.panaStatValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Tommy Status
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setTommyStat({ tommyStatValue: e.target.value })}
            value={tommyStat.tommyStatValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Engine Oil
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setEngineOil({ engineoilValue: e.target.value })}
            value={engineoil.engineoilValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Brake Oil
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setBrakeOil({ brakeoilValue: e.target.value })}
            value={brakeoil.brakeoilValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Coolant
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setCoolant({ coolantValue: e.target.value })}
            value={coolant.coolantValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Battery Charge
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setBatteryCharge({ batteryChargeValue: e.target.value })}
            value={batteryCharge.batteryChargeValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Okay">Okay</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No Charge">No Charge</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>
          Horn
          <span style={{ color: 'red' }}>*</span>
        </p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setHorn({ hornValue: e.target.value })}
            value={horn.hornValue}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Okay">Okay</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Okay">Not Okay</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="col-12 flex flex-row justify-between mt-3">
        <Button
          onClick={() => history.push('/ServiceAudit/ServiceTyreAudit')}
          className="font-quicksand-medium"
          style={{
            marginLeft: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Back
        </Button>
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
export default ServiceCarInfo;
