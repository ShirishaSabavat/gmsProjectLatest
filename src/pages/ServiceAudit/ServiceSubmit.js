/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Input, Button, notification } from 'antd';
import { useState, useEffect } from 'react';
import { addOtherAuditDetails, addOtherAuditMaster, addRTAList } from 'services/axios';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useJamaContext } from 'context/sixtyFortyJamaContext';

const nestedPath = [
  'Home',
  'Servicing Audit',
];

const { TextArea } = Input;

const ServiceSubmit = () => {
  const location = useLocation();
  const [remarks, setRemarks] = useState('');
  const [GarageID, setGarageID] = useState('');
  const [remarksError, setRemarksError] = useState('');
  const {
    carReturnReason,
    selectedCarID,
    fRTyreBrand,
    fRWornOut,
    fRPressure,
    fRTyreNumber,
    rRTyreBrand,
    rRWornOut,
    rRPressure,
    rRTyreNumber,
    fLTyreBrand,
    fLWornOut,
    fLPressure,
    fLTyreNumber,
    rLTyreBrand,
    rLWornOut,
    rLPressure,
    rLTyreNumber,
    stepnyPresent,
    stepnyBrand,
    stepnyTyreNumber,
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
    setselectedCarID,
    setdriverReportedIssue,
    setCarReturnReason,
    setBatteryName,
    setBatteryBrand,
    setfRTyreBrand,
    setfRWornOut,
    setfRPressure,
    setfRTyreNumber,
    setrRTyreBrand,
    setrRWornOut,
    setrRPressure,
    setrRTyreNumber,
    setfLTyreBrand,
    setfLWornOut,
    setfLPressure,
    setfLTyreNumber,
    setrLTyreBrand,
    setrLWornOut,
    setrLPressure,
    setrLTyreNumber,
    setStepnyPresent,
    setStepnyBrand,
    setStepnyTyreNumber,
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

  const ResetContextValues = () => {
    setselectedCarID({ selectedCarIDValue: 0 });
    setdriverReportedIssue({ driverReportedIssueValue: '' });
    setCarReturnReason({ carReturnReasonValue: 'Family/Personal obligations' });
    setBatteryName({ batteryNameValue: '' });
    setBatteryBrand({ batteryBrandValue: 1 });
    setfRTyreBrand({ fRTyreBrandValue: 1 });
    setfRWornOut({ fRWornOutValue: '<3' });
    setfRPressure({ fRPressureValue: '' });
    setfRTyreNumber({ fRTyreNumberValue: '' });
    setrRTyreBrand({ rRTyreBrandValue: 1 });
    setrRWornOut({ rRWornOutValue: '<3' });
    setrRPressure({ rRPressureValue: '' });
    setrRTyreNumber({ rRTyreNumberValue: '' });
    setfLTyreBrand({ fLTyreBrandValue: 1 });
    setfLWornOut({ fLWornOutValue: '<3' });
    setfLPressure({ fLPressureValue: '' });
    setfLTyreNumber({ fLTyreNumberValue: '' });
    setrLTyreBrand({ rLTyreBrandValue: 1 });
    setrLWornOut({ rLWornOutValue: '<3' });
    setrLPressure({ rLPressureValue: '' });
    setrLTyreNumber({ rLTyreNumberValue: '' });
    setStepnyPresent({ stepnyPresentValue: 1 });
    setStepnyBrand({ stepnyBrandValue: 1 });
    setStepnyTyreNumber({ stepnyTyreNumberValue: '' });
    setCarKms({ carKmsValue: "" });
    setcurrentCarKms({ currentCarKmsValue: "" });
    setfasttagBalance({ fasttagBalanceValue: "" });
    setfuelIndicatorPetrolBar({ fuelIndicatorPetrolBarValue: "Yes" });
    setCng({ cngValue: "Full" });
    setnumberPlateStickerStat({ numberPlateStickerStatValue: "Front Main" });
    setJackStat({ jackStatValue: "Yes" });
    setPanaStat({ panaStatValue: "Yes" });
    setTommyStat({ tommyStatValue: "Yes" });
    setEngineOil({ engineoilValue: "Sufficient" });
    setBrakeOil({ brakeoilValue: "Sufficient" });
    setCoolant({ coolantValue: "Sufficient" });
    setBatteryCharge({ batteryChargeValue: "Okay" });
    setHorn({ hornValue: "Okay" });
    history.push('/ServiceAudit/ServiceAuditCarList');
  }

  const validateFormData = () => {
    const RemarkError = {};
    let isValid = true;
    if (remarks.trim().length === 0) {
      RemarkError.err = 'Please enter proper remarks.';
      isValid = false;
    }
    // if (garageSeries.trim().length === 0) {
    //   garageSeriesNameError.err = 'Garage series can not be empty';
    //   isValid = false;
    // }
    // if (userSeries.trim().length === 0) {
    //   userSeriesNameError.err = 'User series can not be empty';
    //   isValid = false;
    // }

    setRemarksError(RemarkError);
    return isValid;
  };

  const createAudit = (event) => {
    event.preventDefault();
    const resp = validateFormData();
    console.log(resp);

    if (resp) {
      const auditmaster = {
        visitId: selectedCarID,
        driverReportedIssue: carReturnReason.carReturnReasonValue,
        carReturnReason: "",
        fastagBalance: fasttagBalance.fasttagBalanceValue,
      };
      let auditdetails = {}
      addOtherAuditMaster(auditmaster)
        .then((res) => {
          const tempID = res.data.results.id;
          console.log('res', tempID);
          auditdetails = {
            id: tempID,
            frWornOut: fRWornOut.fRWornOutValue === "<3" ? 1 : fRWornOut.fRWornOutValue === "4" ? 2 : fRWornOut.fRWornOutValue === "5" ? 3 : fRWornOut.fRWornOutValue === "4" ? 4 : 5,
            fLWornOut: fLWornOut.fLWornOutValue === "<3" ? 1 : fLWornOut.fLWornOutValue === "4" ? 2 : fLWornOut.fLWornOutValue === "5" ? 3 : fLWornOut.fLWornOutValue === "4" ? 4 : 5,
            rrWornOut: rRWornOut.rRWornOutValue === "<3" ? 1 : rRWornOut.rRWornOutValue === "4" ? 2 : rRWornOut.rRWornOutValue === "5" ? 3 : rRWornOut.rRWornOutValue === "4" ? 4 : 5,
            rLWornOut: rLWornOut.rLWornOutValue === "<3" ? 1 : rLWornOut.rLWornOutValue === "4" ? 2 : rLWornOut.rLWornOutValue === "5" ? 3 : rLWornOut.rLWornOutValue === "4" ? 4 : 5,
            frBrand: fRTyreBrand.fRTyreBrandValue === "Apollo" ? 1 : fRTyreBrand.fRTyreBrandValue === "Ceat" ? 2 : fRTyreBrand.fRTyreBrandValue === "JK" ? 3 :
              fRTyreBrand.fRTyreBrandValue === "BridgeStone" ? 4 : fRTyreBrand.fRTyreBrandValue === "MRF" ? 5 : fRTyreBrand.fRTyreBrandValue === "Firestone" ? 6 :
                fRTyreBrand.fRTyreBrandValue === "Kelly" ? 7 : 8,
            fLBrand: fLTyreBrand.fLTyreBrandValue === "Apollo" ? 1 : fLTyreBrand.fLTyreBrandValue === "Ceat" ? 2 : fLTyreBrand.fLTyreBrandValue === "JK" ? 3 :
              fLTyreBrand.fLTyreBrandValue === "BridgeStone" ? 4 : fLTyreBrand.fLTyreBrandValue === "MRF" ? 5 : fLTyreBrand.fLTyreBrandValue === "Firestone" ? 6 :
                fLTyreBrand.fLTyreBrandValue === "Kelly" ? 7 : 8,
            rrBrand: rRTyreBrand.rRTyreBrandValue === "Apollo" ? 1 : rRTyreBrand.rRTyreBrandValue === "Ceat" ? 2 : rRTyreBrand.rRTyreBrandValue === "JK" ? 3 :
              rRTyreBrand.rRTyreBrandValue === "BridgeStone" ? 4 : rRTyreBrand.rRTyreBrandValue === "MRF" ? 5 : rRTyreBrand.rRTyreBrandValue === "Firestone" ? 6 :
                rRTyreBrand.rRTyreBrandValue === "Kelly" ? 7 : 8,
            rLBrand: rLTyreBrand.rLTyreBrandValue === "Apollo" ? 1 : rLTyreBrand.rLTyreBrandValue === "Ceat" ? 2 : rLTyreBrand.rLTyreBrandValue === "JK" ? 3 :
              rLTyreBrand.rLTyreBrandValue === "BridgeStone" ? 4 : rLTyreBrand.rLTyreBrandValue === "MRF" ? 5 : rLTyreBrand.rLTyreBrandValue === "Firestone" ? 6 :
                rLTyreBrand.rLTyreBrandValue === "Kelly" ? 7 : 8,
            frPressure: fRPressure.fRPressureValue,
            fLPressure: rRPressure.rRPressureValue,
            rrPressure: fLPressure.fLPressureValue,
            rLPressure: rLPressure.rLPressureValue,
            frNumber: fRTyreNumber.fRTyreNumberValue,
            fLNumber: fLTyreNumber.fLTyreNumberValue,
            rrNumber: rRTyreNumber.rRTyreNumberValue,
            rLNumber: rLTyreNumber.rLTyreNumberValue,
            fuelIndicatorOne: fuelIndicatorPetrolBar.fuelIndicatorPetrolBarValue === "Yes" ? true : false,
            fuel_indicator_cng: cng.cngValue === "Full" ? 1 : cng.cngValue === "Empty" ? 2 : cng.cngValue === "Half full and Above" ? 3 : 4,
            StickerFrontMain: numberPlateStickerStat.numberPlateStickerStatValue === "Front Main" ? true : false,
            StickerBackMain: numberPlateStickerStat.numberPlateStickerStatValue === "Front Main" ? true : false,
            StickerBackRight: numberPlateStickerStat.numberPlateStickerStatValue === "Front Main" ? true : false,
            StickerBackLeft: numberPlateStickerStat.numberPlateStickerStatValue === "Front Main" ? true : false,
            jack: jackStat.jackStatValue === "Yes" ? true : false,
            panna: panaStat.panaStatValue === "Yes" ? true : false,
            tommy: tommyStat.tommyStatValue === "Yes" ? true : false,
            engineOil: engineoil.engineoilValue === "Sufficient" ? true : false,
            breakOil: brakeoil.brakeoilValue === "Sufficient" ? true : false,
            coolant: coolant.coolantValue === "Sufficient" ? true : false,
            batteryCharge: batteryCharge.batteryChargeValue === "Okay" ? true : false,
            horn: horn.hornValue === "Okay" ? true : false,
          };
          addOtherAuditDetails(auditdetails)
            .then((res) => {
              console.log('res', res);
              notification.success({
                message: "Audit submitted successfully.",
              });
              ResetContextValues();
            })
            .catch((err) => {
              console.log('err', err.response);
            });
        })
        .catch((err) => {
          console.log('err', err.response);
        });


    } else {

    }
  }
  const history = useHistory();

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Servicing Audit
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div>
          <div className="bg-white rounded-lg my-3 mx-2">
            <div className="flex flex-row flex-nonwrap justify-center">
              <img className="w-20 h-20 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/carimage.jpg')} />
              <div>
                <h1 className="font-quicksand-bold text-xl mt-3">MH01 DR 1836</h1>
                <h1 className="font-quicksand-semi-bold text-sm mt-1">Maruti Suzuki Drive Vxi CNG</h1>
                <div className="flex flex-row justify-center">
                  <h1 className="font-quicksand-semi-bold text-sm mt-1">Visit ID: </h1>
                  <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">DSFSDFSDF654654</h1>
                </div>
              </div>
            </div>
            <div className="flex flex-row justify-center">
              <h1 className="font-quicksand-semi-bold text-base my-3">Driver Name: </h1>
              <h1 className="font-quicksand-semi-bold text-base my-3 text-teal-300">John Doe</h1>
            </div>
          </div>
          <div className="bg-white p-4 mx-2">
            <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Add Comments (Optional)</p>
            <div className="flex flex-nonwrap bg-white">
              <TextArea
                rows={4}
                placeholder="Enter Remarks Here..."
                value={remarks}
                onChange={(e) => setRemarks(e.target.value)}
                style={{
                  padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
                }}
              />

            </div>
            {Object.keys(remarksError).map((key) => (
              <div style={{ color: 'red' }}>
                {remarksError[key]}
              </div>
            ))}
          </div>
          <div className="col-12 flex flex-row justify-center my-3">
            <Button
              onClick={createAudit}
              className="font-quicksand-medium"
              style={{
                marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
              }}
            >
              Submit Audit
            </Button>
          </div>

        </div>
      </div>
    </>
  );
};

export default ServiceSubmit;
