/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
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
  'Leasing Jama',
];

const { TextArea } = Input;

const AcceptLeasingJama = () => {
  const location = useLocation();
  const [remarks, setRemarks] = useState('');
  const [GarageID, setGarageID] = useState('');
  const [remarksError, setRemarksError] = useState('');

  const history = useHistory();

  const {
    selectedCarID,
    selectedCar,
    visitId,
    carReturnReason,
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
    driverReportedIssue,
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
    setHorn,
    batteryBrand,
    batteryName,
    frontMainSticker,
    setFrontMainSticker,
    backMainSticker,
    setBackMainSticker,
    backRightSticker,
    setBackRightSticker,
    backLeftSticker,
    setBackLeftSticker,
    penaltyAmount,
    setPenaltyAmount,
    penaltyReason,
    setPenaltyReason,
    stepnyWornOut,
    setStepnyWornOut,
    stepnyPressure,
    setStepnyPressure,
    etmId,
    setEtmId,
    driverName,
    setDriverName,
    driverBal,
    setDriverBal,
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
    setCarKms({ carKmsValue: '' });
    setcurrentCarKms({ currentCarKmsValue: '' });
    setfasttagBalance({ fasttagBalanceValue: '' });
    setfuelIndicatorPetrolBar({ fuelIndicatorPetrolBarValue: 'Yes' });
    setCng({ cngValue: 'Full' });
    setnumberPlateStickerStat({ numberPlateStickerStatValue: 'Front Main' });
    setJackStat({ jackStatValue: 'Yes' });
    setPanaStat({ panaStatValue: 'Yes' });
    setTommyStat({ tommyStatValue: 'Yes' });
    setEngineOil({ engineoilValue: 'Sufficient' });
    setBrakeOil({ brakeoilValue: 'Sufficient' });
    setCoolant({ coolantValue: 'Sufficient' });
    setBatteryCharge({ batteryChargeValue: 'Okay' });
    setHorn({ hornValue: 'Okay' });
    setFrontMainSticker({ frontMainStickerValue: false });
    setBackMainSticker({ backMainStickerValue: false });
    setBackRightSticker({ backRightStickerValue: false });
    setBackLeftSticker({ backLeftStickerValue: false });
    setPenaltyAmount({ penaltyAmountValue: 1 });
    setPenaltyReason({ penaltyReasonValue: 1 });
    setStepnyWornOut({ stepnyWornOutValue: '<3' });
    setStepnyPressure({ stepnyPressureValue: '' });
    setEtmId({ etmIdValue: '' });
    setDriverName({ driverNameValue: '' });
    setDriverBal({ driverBalValue: '' });
    history.push('/LeasingJama/leasingJamaCarlist');
  };

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

    if (resp) {
      const auditmaster = {
        visit: selectedCarID.selectedCarIDValue,
        driver_reported_issue: '',
        car_return_reason: '',
        fastag_balance: fasttagBalance.fasttagBalanceValue,
        penalty_amount: null,
        penalty_reason: null,
        penalty_details: null,
        status: 1,
        employee_id: etmId.etmIdValue,
        driver_name: driverName.driverNameValue,
        driver_ola_balance: driverBal.driverBalValue,
      };
      let auditdetails = {};
      addOtherAuditMaster(auditmaster)
        .then((res) => {
          const tempID = res.data.results.id;
          auditdetails = {
            visit: selectedCarID.selectedCarIDValue,
            audit: tempID,
            auditor_comment: remarks,
            battery_brand: batteryBrand.batteryBrandValue,
            battery_number: batteryName.batteryNameValue,
            battery_status: batteryCharge.batteryChargeValue === 'Okay',
            break_oil: brakeoil.brakeoilValue === 'Sufficient',
            car_km: carKms.carKmsValue,
            coolant: coolant.coolantValue === 'Sufficient',
            engine_oil: engineoil.engineoilValue === 'Sufficient',
            front_left_tyre_brand: fLTyreBrand.fLTyreBrandValue,
            front_left_tyre_number: fLTyreNumber.fLTyreNumberValue,
            front_left_tyre_pressure: fLPressure.fLPressureValue,
            front_left_tyre_worn_out: fLWornOut.fLWornOutValue === '<3' ? 3 : fLWornOut.fLWornOutValue === '4' ? 4 : fLWornOut.fLWornOutValue === '5' ? 5 : fLWornOut.fLWornOutValue === '6' ? 6 : 7,
            front_right_tyre_brand: fRTyreBrand.fRTyreBrandValue,
            front_right_tyre_number: fRTyreNumber.fRTyreNumberValue,
            front_right_tyre_pressure: fRPressure.fRPressureValue,
            front_right_tyre_worn_out: fRWornOut.fRWornOutValue === '<3' ? 3 : fRWornOut.fRWornOutValue === '4' ? 4 : fRWornOut.fRWornOutValue === '5' ? 5 : fRWornOut.fRWornOutValue === '6' ? 6 : 7,
            fuel_indicator_petrol: fuelIndicatorPetrolBar.fuelIndicatorPetrolBarValue === 'Yes',
            fuel_indicator_cng: cng.cngValue === 'Full' ? 1 : cng.cngValue === 'Empty' ? 2 : cng.cngValue === 'Half full and Above' ? 3 : 4,
            horn: horn.hornValue === 'Okay',
            jack: jackStat.jackStatValue === 'Yes',
            panna: panaStat.panaStatValue === 'Yes',
            rear_left_tyre_brand: rLTyreBrand.rLTyreBrandValue,
            rear_left_tyre_number: rLTyreNumber.rLTyreNumberValue,
            rear_left_tyre_pressure: rLPressure.rLPressureValue,
            rear_left_tyre_worn_out: rLWornOut.rLWornOutValue === '<3' ? 3 : rLWornOut.rLWornOutValue === '4' ? 4 : rLWornOut.rLWornOutValue === '5' ? 5 : rLWornOut.rLWornOutValue === '6' ? 6 : 7,
            rear_right_tyre_brand: rRTyreBrand.rRTyreBrandValue,
            rear_right_tyre_number: rRTyreNumber.rRTyreNumberValue,
            rear_right_tyre_pressure: rRPressure.rRPressureValue,
            rear_right_tyre_worn_out: rRWornOut.rRWornOutValue === '<3' ? 3 : rRWornOut.rRWornOutValue === '4' ? 4 : rRWornOut.rRWornOutValue === '5' ? 5 : rRWornOut.rRWornOutValue === '6' ? 6 : 7,
            stephney_available: stepnyPresent.stepnyPresentValue === 1,
            stephney_tyre_worn_out: stepnyPresent.stepnyPresentValue === 1 ? stepnyWornOut.stepnyWornOutValue === '<3' ? 3 : stepnyWornOut.stepnyWornOutValue === '4' ? 4 : stepnyWornOut.stepnyWornOutValue === '5' ? 5 : stepnyWornOut.stepnyWornOutValue === '6' ? 6 : 7 : null,
            stephney_tyre_pressure: stepnyPresent.stepnyPresentValue === 1 ? stepnyPressure.stepnyPressureValue : null,
            stephney_tyre_brand: stepnyPresent.stepnyPresentValue === 1 ? stepnyBrand.stepnyBrandValue : null,
            stephney_tyre_number: stepnyPresent.stepnyPresentValue === 1 ? stepnyTyreNumber.stepnyTyreNumberValue : null,
            sticker_back_left: backLeftSticker.backLeftStickerValue,
            sticker_back_main: backMainSticker.backMainStickerValue,
            sticker_back_right: backRightSticker.backRightStickerValue,
            sticker_front_main: frontMainSticker.frontMainStickerValue,
            tommy: tommyStat.tommyStatValue === 'Yes',
          };
          addOtherAuditDetails(auditdetails)
            .then((respp) => {
              notification.success({
                message: 'Audit submitted successfully.',
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
    }
  };
  const goToRejectRTAListMethod = () => {
    history.push('/LeasingJama/RejectLeasingJama');
  };

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Leasing Jama
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div>
          <div className="bg-white rounded-lg my-3 mx-2">
            <div className="flex flex-row flex-nonwrap justify-center">
              <img className="w-20 h-20 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/carimage.jpg')} />
              <div>
                <h1 className="font-quicksand-bold text-xl mt-3">{selectedCar.selectedCarValue}</h1>
                <h1 className="font-quicksand-semi-bold text-sm mt-1">Maruti Suzuki Drive Vxi CNG</h1>
                <div className="flex flex-row justify-center">
                  <h1 className="font-quicksand-semi-bold text-sm mt-1">Visit ID: </h1>
                  <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">{visitId.visitIdValue}</h1>
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
              Accept Car for Jama
            </Button>
          </div>
          <div className="col-12 flex flex-row justify-center">
            <Button
              // onClick={goToRejectRTAListMethod}
              className="font-quicksand-medium"
              style={{
                marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#74d1d8', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 25px',
              }}
            >
              Reject for Jama
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AcceptLeasingJama;
