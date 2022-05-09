import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from "react-helmet";
import { Radio, Button, Input, notification } from 'antd';
import { useState } from 'react';
import { useHistory, useParams, useLocation } from 'react-router-dom';
import { addAuditMaster } from 'services/axios';

const nestedPath = [
  'Home',
  'Regular Audit',
];

const RegularAuditCarInfo = () => {
  const location = useLocation();
  const {
    id
  } = location.state;
  const [carKms, setCarKms] = useState("");
  const [currentCarKms, setcurrentCarKms] = useState("");
  const [fasttagBalance, setfasttagBalance] = useState("");
  const [carKmsError, setCarKmsError] = useState("");
  const [currentCarKmsError, setcurrentCarKmsError] = useState("");
  const [fasttagBalanceError, setfasttagBalanceError] = useState("");
  const [fuelIndicatorPetrolBar, setfuelIndicatorPetrolBar] = useState("Yes");
  const [cng, setCng] = useState("Full");
  const [numberPlateStickerStat, setnumberPlateStickerStat] = useState("Front Main");
  const [jackStat, setJackStat] = useState("Yes");
  const [panaStat, setPanaStat] = useState("Yes");
  const [tommyStat, setTommyStat] = useState("Yes");
  const [engineoil, setEngineOil] = useState("Sufficient");
  const [brakeoil, setBrakeOil] = useState("Sufficient");
  const [coolant, setCoolant] = useState("Sufficient");
  const [batteryCharge, setBatteryCharge] = useState("Okay");
  const [horn, setHorn] = useState("Okay");
  const history = useHistory();
  const goToTyreAudit = () => {
    history.push('/LeasingJama/AcceptLeasingJama');
  }

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
        visitId: id,
        fastagBalance: fasttagBalance,
      };
      addAuditMaster(auditmaster)
        .then((res) => {
          console.log('res', res);
          notification.error({
            message: "Audit submitted successfully.",
          });
        })
        .catch((err) => {
          console.log('err', err.response);
          notification.error({
            message: err.response.data.message,
          });
        });
    } else {

    }
  }

  const addAuditDetails = () => {
    const auditdetails = {
      id: id,
      fuelIndicatorOne: fuelIndicatorPetrolBar === "Yes" ? true : false,
      fuel_indicator_cng: cng === "Full" ? 1 : cng === "Empty" ? 2 : cng === "Half full and Above" ? 3 : 4,
      StickerFrontMain: numberPlateStickerStat === "Front Main" ? true : false,
      StickerBackMain: numberPlateStickerStat === "Front Main" ? true : false,
      StickerBackRight: numberPlateStickerStat === "Front Main" ? true : false,
      StickerBackLeft: numberPlateStickerStat === "Front Main" ? true : false,
      jack: jackStat === "Yes" ? true : false,
      panna: panaStat === "Yes" ? true : false,
      tommy: tommyStat === "Yes" ? true : false,
      engineOil: engineoil === "Sufficient" ? true : false,
      breakOil: brakeoil === "Sufficient" ? true : false,
      coolant: coolant === "Sufficient" ? true : false,
      batteryCharge: batteryCharge === "Okay" ? true : false,
      horn: horn === "Okay" ? true : false,
    };
    addAuditDetails(auditdetails)
      .then((res) => {
        console.log('res', res);

        history.push('/LeasingJama/AcceptLeasingJama');
      })
      .catch((err) => {
        console.log('err', err.response);
        notification.error({
          message: err.response.data.message,
        });
      });
  }

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
          <Radio.Group onChange={(e) => setfuelIndicatorPetrolBar(e.target.value)} value={fuelIndicatorPetrolBar}>
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
          <Radio.Group onChange={(e) => setnumberPlateStickerStat(e.target.value)} value={numberPlateStickerStat}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Front Main">Front Main</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Back Main">Back Main</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Back Right side">Back Right side</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="Back left side">Back left side</Radio>
          </Radio.Group>
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
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold mr-48 mt-2" value="No Charge">No Charge</Radio>
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
  )
}
export default RegularAuditCarInfo;