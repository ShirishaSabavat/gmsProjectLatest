/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import {
  Radio, Button, Input, notification, Checkbox,
} from 'antd';
import { useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { addOtherAuditMaster, addOtherAuditDetails } from 'services/axios';
import { useRegularAuditContext } from 'context/RegularAuditContext';
import moment from 'moment';

const RegularAuditCarInfo = () => {
  const {
    selectedCarID,
    selectedCar,
    visitId,
    driverName,
    cardObject,
  } = useRegularAuditContext();

  const location = useLocation();
  // const {
  //   id,
  // } = location.state;
  const [auditID, setauditID] = useState('');
  const [carKms, setCarKms] = useState('');
  const [currentCarKms, setcurrentCarKms] = useState('');
  // const [fasttagBalance, setfasttagBalance] = useState('');
  const [carKmsError, setCarKmsError] = useState('');
  const [currentCarKmsError, setcurrentCarKmsError] = useState('');
  const [fasttagBalanceError, setfasttagBalanceError] = useState('');
  const [fuelIndicatorPetrolBar, setfuelIndicatorPetrolBar] = useState(0);
  const [cng, setCng] = useState('Full');
  const [numberPlateStickerStat, setnumberPlateStickerStat] = useState('Front Main');
  const [jackStat, setJackStat] = useState('Yes');
  const [panaStat, setPanaStat] = useState('Yes');
  const [tommyStat, setTommyStat] = useState('Yes');
  const [engineoil, setEngineOil] = useState('Sufficient');
  const [brakeoil, setBrakeOil] = useState('Sufficient');
  const [coolant, setCoolant] = useState('Sufficient');
  const [batteryCharge, setBatteryCharge] = useState('Okay');
  const [horn, setHorn] = useState('Okay');
  const [frontMainSticker, setFrontMainSticker] = useState(false);
  const [backMainSticker, setBackMainSticker] = useState(false);
  const [backRightSticker, setBackRightSticker] = useState(false);
  const [backLeftSticker, setBackLeftSticker] = useState(false);
  const history = useHistory();
  const goToTyreAudit = () => {
    history.push('/LeasingJama/AcceptLeasingJama');
  };

  const validateFormData = () => {
    const carkmerror = {};
    // const descriptionNameError = {};
    const carcurretnkmerror = {};
    const fastagerror = {};
    let isValid = true;

    if (carKms.toString().trim().length === 0) {
      carkmerror.err = 'Car Kms can not be empty.';
      isValid = false;
    }
    // if (description.trim().length === 0) {
    //   descriptionNameError.err = 'City description can not be empty';
    //   isValid = false;
    // }
    if (Number(currentCarKms.currentCarKmsValue) <= Number(carKms.carKmsValue)) {
      carcurretnkmerror.err = 'Current KMs should be greater than Car KMs';
      isValid = false;
    }
    if (currentCarKms.toString().trim().length === 0) {
      carcurretnkmerror.err = 'Current Car Kms can not be empty.';
      isValid = false;
    }
    // if (fasttagBalance.toString().trim().length === 0) {
    //   fastagerror.err = 'Fastag Balance can not be empty';
    //   isValid = false;
    // }

    setCarKmsError(carkmerror);
    // setDescriptionError(descriptionNameError);
    setcurrentCarKmsError(carcurretnkmerror);
    setfasttagBalanceError(fastagerror);
    return isValid;
  };

  const createAudit = (event) => {
    event.preventDefault();
    const resp = validateFormData();

    if (resp) {
      const auditmaster = {
        visit: selectedCarID.selectedCarIDValue,
        driver_reported_issue: null,
        car_return_reason: null,
        // fastag_balance: fasttagBalance,
        penalty_amount: null,
        penalty_reason: null,
        penalty_details: null,
        status: 1,
      };
      let auditdetails = {};
      addOtherAuditMaster(auditmaster)
        .then((res) => {
          const tempID = res.data.results.id;
          auditdetails = {
            visit: selectedCarID.selectedCarIDValue,
            audit: tempID,
            auditor_comment: null,
            battery_brand: null,
            battery_number: null,
            battery_status: null,
            break_oil: brakeoil === 'Sufficient',
            car_km: carKms,
            coolant: coolant === 'Sufficient',
            engine_oil: engineoil === 'Sufficient',
            front_left_tyre_brand: null,
            front_left_tyre_number: null,
            front_left_tyre_pressure: null,
            front_left_tyre_worn_out: null,
            front_right_tyre_brand: null,
            front_right_tyre_number: null,
            front_right_tyre_pressure: null,
            front_right_tyre_worn_out: null,
            fuel_indicator_petrol: fuelIndicatorPetrolBar,
            fuel_indicator_cng: cng === 'Full' ? 1 : cng === 'Empty' ? 2 : cng === 'Half full and Above' ? 3 : 4,
            horn: horn === 'Okay',
            jack: jackStat === 'Yes',
            panna: panaStat === 'Yes',
            rear_left_tyre_brand: null,
            rear_left_tyre_number: null,
            rear_left_tyre_pressure: null,
            rear_left_tyre_worn_out: null,
            rear_right_tyre_brand: null,
            rear_right_tyre_number: null,
            rear_right_tyre_pressure: null,
            rear_right_tyre_worn_out: null,
            stephney_available: null,
            stephney_tyre_worn_out: null,
            stephney_tyre_pressure: null,
            stephney_tyre_brand: null,
            stephney_tyre_number: null,
            sticker_back_left: backLeftSticker,
            sticker_back_main: backMainSticker,
            sticker_back_right: backRightSticker,
            sticker_front_main: frontMainSticker,
            tommy: tommyStat === 'Yes',
          };
          addOtherAuditDetails(auditdetails)
            .then((respp) => {
              notification.success({
                message: 'Audit submitted successfully.',
              });
              history.push('/RegularAudit/RegularAuditCarList');
            })
            .catch((err) => {
              notification.error({
                message: err.response.data.message,
              });
            });
        })
        .catch((err) => {
          console.log('err', err.response);
        });
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
            <p className="text-sm font-quicksand-medium text-gray-900 truncate my-1">
              Team:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate my-1">
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
                mobile
              </p>
            </p>
            <p className="text-sm font-quicksand-medium text-gray-900 truncate my-1">
              In-Time:
              {' '}
              <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate my-1">
                {moment(
                  cardObject.createdAt,
                ).format('DD-MM-YYYY, h:mm:ss a')}
              </p>
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-bold text-sm">Car Details</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Car Kms*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={carKms}
            onChange={(e) => setCarKms(e.target.value)}
            placeholder="Enter Car Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        {Object.keys(carKmsError).map((key) => (
          <div style={{ color: 'red' }}>
            {carKmsError[key]}
          </div>
        ))}
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Current Kms*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={currentCarKms}
            onChange={(e) => setcurrentCarKms(e.target.value)}
            placeholder="Enter Current KMs Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        {Object.keys(currentCarKmsError).map((key) => (
          <div style={{ color: 'red' }}>
            {currentCarKmsError[key]}
          </div>
        ))}
        <p className="font-quicksand-semi-bold mt-2" style={{ fontSize: '12px' }}>Fuel Indicator Petrol (1 bar)*</p>
        <div className="bg-white">
          <Radio.Group
            onChange={(e) => setfuelIndicatorPetrolBar(e.target.value)}
            value={fuelIndicatorPetrolBar}
          >
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={0}>0</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={1}>1</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={2}>2</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value={3}>3</Radio>
          </Radio.Group>
        </div>
      </div>
      {/* <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Fastag Balance*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fasttagBalance}
            onChange={(e) => setfasttagBalance(e.target.value)}
            placeholder="Enter Fastag Balance Here..."
            style={{
              padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
            }}
          />
        </div>
        {Object.keys(fasttagBalanceError).map((key) => (
          <div style={{ color: 'red' }}>
            {fasttagBalanceError[key]}
          </div>
        ))}
      </div> */}
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>CNG*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setCng(e.target.value)} value={cng}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Full">Full</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Empty">Empty</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Half full and Above">Half full and Above</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Below Half">Below Half</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-2">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Number Plate Sticker Status*</p>
        <div className="bg-white">
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setFrontMainSticker({ frontMainStickerValue: !frontMainSticker.frontMainStickerValue })}>Front Main</Checkbox>
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setBackMainSticker({ backMainStickerValue: !backMainSticker.backMainStickerValue })}>Back Main</Checkbox>
        </div>
        <div className="bg-white">
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setBackRightSticker({ backRightStickerValue: !backRightSticker.backRightStickerValue })}>Back Right side</Checkbox>
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setBackLeftSticker({ backLeftStickerValue: !backLeftSticker.backLeftStickerValue })}>Back left side</Checkbox>
        </div>
      </div>
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Jack Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setJackStat(e.target.value)} value={jackStat}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Pana Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setPanaStat(e.target.value)} value={panaStat}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Tommy Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setTommyStat(e.target.value)} value={tommyStat}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Engine Oil*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setEngineOil(e.target.value)} value={engineoil}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brake Oil*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setBrakeOil(e.target.value)} value={brakeoil}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Coolant*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setCoolant(e.target.value)} value={coolant}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Battery Charge*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setBatteryCharge(e.target.value)} value={batteryCharge}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Okay">Okay</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No Charge">No Charge</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-3 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Horn*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setHorn(e.target.value)} value={horn}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Okay">Okay</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Okay">Not Okay</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="col-12 flex flex-row justify-between mt-3">
        <Button
          onClick={() => history.push('/RegularAudit/RegularAuditCarlist')}
          className="font-quicksand-medium"
          style={{
            marginLeft: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Back
        </Button>
        <Button
          onClick={createAudit}
          className="font-quicksand-medium"
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '200px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Submit Audit
        </Button>
      </div>
    </>
  );
};
export default RegularAuditCarInfo;
