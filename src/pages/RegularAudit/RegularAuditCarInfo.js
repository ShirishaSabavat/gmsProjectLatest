/* eslint-disable global-require */
/* eslint-disable no-nested-ternary */
/* eslint-disable no-unused-vars */
import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from 'react-helmet';
import {
  Radio, Button, Input, notification, Checkbox,
} from 'antd';
import { useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { addOtherAuditMaster, addOtherAuditDetails } from 'services/axios';
import { useRegularAuditContext } from 'context/RegularAuditContext';

const nestedPath = [
  'Home',
  'Regular Audit',
];

const RegularAuditCarInfo = () => {
  const {
    selectedCarID,
    selectedCar,
    visitId,

  } = useRegularAuditContext();

  const location = useLocation();
  // const {
  //   id,
  // } = location.state;
  const [auditID, setauditID] = useState('');
  const [carKms, setCarKms] = useState('');
  const [currentCarKms, setcurrentCarKms] = useState('');
  const [fasttagBalance, setfasttagBalance] = useState('');
  const [carKmsError, setCarKmsError] = useState('');
  const [currentCarKmsError, setcurrentCarKmsError] = useState('');
  const [fasttagBalanceError, setfasttagBalanceError] = useState('');
  const [fuelIndicatorPetrolBar, setfuelIndicatorPetrolBar] = useState('Yes');
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
    if (currentCarKms.toString().trim().length === 0) {
      carcurretnkmerror.err = 'Current Car Kms can not be empty.';
      isValid = false;
    }
    if (fasttagBalance.toString().trim().length === 0) {
      fastagerror.err = 'Fastag Balance can not be empty';
      isValid = false;
    }

    setCarKmsError(carkmerror);
    // setDescriptionError(descriptionNameError);
    setcurrentCarKmsError(carcurretnkmerror);
    setfasttagBalanceError(fastagerror);
    return isValid;
  };

  const createAudit = (event) => {
    event.preventDefault();
    const resp = validateFormData();
    console.log(resp);

    if (resp) {
      const auditmaster = {
        visit: selectedCarID.selectedCarIDValue,
        driver_reported_issue: null,
        car_return_reason: null,
        fastag_balance: fasttagBalance,
        penalty_amount: null,
        penalty_reason: null,
        penalty_details: null,
        status: 1,
      };
      console.log(auditmaster);
      let auditdetails = {};
      addOtherAuditMaster(auditmaster)
        .then((res) => {
          const tempID = res.data.results.id;
          console.log('res', tempID);
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
            fuel_indicator_petrol: fuelIndicatorPetrolBar === 'Yes',
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
          console.log(auditdetails);
          addOtherAuditDetails(auditdetails)
            .then((respp) => {
              console.log('respp', respp);
              notification.success({
                message: 'Audit submitted successfully.',
              });
              history.push('/RegularAudit/RegularAuditCarList');
            })
            .catch((err) => {
              console.log('err', err.response);
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
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Regular Audit
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
      </div>
      <div className="bg-white rounded-lg my-3 mx-3">
        <div className="flex flex-row flex-nonwrap justify-center">
          <img className="w-20 h-20 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/carimage.jpg')} />
          <div>
            <h1 className="font-quicksand-bold text-xl mt-3">{selectedCar.selectedCarValue}</h1>
            <div className="flex flex-row">
              <h1 className="font-quicksand-semi-bold text-sm mt-1">Visit ID: </h1>
              <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">{visitId.visitIdValue}</h1>
            </div>
            <div className="flex flex-row">
              <h1 className="font-quicksand-semi-bold text-sm mt-1">Time Stamp: </h1>
              <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">2022/02/21 13:54</h1>
            </div>
          </div>
        </div>
        <div className="flex flex-row ml-12 mt-2 my-3">
          <h1 className="font-quicksand-semi-bold text-sm mt-1">Driver: </h1>
          <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300 ml-12">John Doe</h1>
        </div>
      </div>
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Car Details</p>
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Car Kms*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={carKms}
            onChange={(e) => setCarKms(e.target.value)}
            placeholder="Enter Name Here..."
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
            placeholder="Enter Name Here..."
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
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Fastag Balance*</p>
        <div className="flex flex-row flex-nonwrap bg-white">
          <Input
            value={fasttagBalance}
            onChange={(e) => setfasttagBalance(e.target.value)}
            placeholder="Enter Name Here..."
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
      </div>
      <div className="bg-white p-4 m-3">
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
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Number Plate Sticker Status*</p>
        <div className="bg-white">
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setFrontMainSticker(!frontMainSticker)}>Front Main</Checkbox>
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setBackMainSticker(!backMainSticker)}>Back Main</Checkbox>
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setBackRightSticker(!backRightSticker)}>Back Right side</Checkbox>
          <Checkbox style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" onChange={() => setBackLeftSticker(!backLeftSticker)}>Back left side</Checkbox>
        </div>
      </div>
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Jack Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setJackStat(e.target.value)} value={jackStat}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Pana Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setPanaStat(e.target.value)} value={panaStat}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Tommy Status*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setTommyStat(e.target.value)} value={tommyStat}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Yes">Yes</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No">No</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Engine Oil*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setEngineOil(e.target.value)} value={engineoil}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Brake Oil*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setBrakeOil(e.target.value)} value={brakeoil}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Coolant*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setCoolant(e.target.value)} value={coolant}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Sufficient">Sufficient</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Sufficient">Not Sufficient</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Battery Charge*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setBatteryCharge(e.target.value)} value={batteryCharge}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Okay">Okay</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No Charge">No Charge</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="bg-white p-4 m-3">
        <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Horn*</p>
        <div className="bg-white">
          <Radio.Group onChange={(e) => setHorn(e.target.value)} value={horn}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Okay">Okay</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Not Okay">Not Okay</Radio>
          </Radio.Group>
        </div>
      </div>
      <div className="col-10 flex flex-row justify-end">
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
