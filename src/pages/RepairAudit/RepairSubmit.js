/* eslint-disable max-len */
/* eslint-disable no-nested-ternary */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import { Input, Button, notification } from 'antd';
import { useState, useEffect } from 'react';
import { addOtherAuditDetails, addOtherAuditMaster, addRTAList } from 'services/axios';
import { Link, useLocation, useHistory } from 'react-router-dom';
import { useRepairContext } from 'context/RepairAuditContext';
import { useJamaContext } from 'context/sixtyFortyJamaContext';
import moment from 'moment';

const { TextArea } = Input;

const RepairSubmit = () => {
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
    driverReportedIssue,
    frontMainSticker,
    setFrontMainSticker,
    backMainSticker,
    setBackMainSticker,
    backRightSticker,
    setBackRightSticker,
    backLeftSticker,
    setBackLeftSticker,
    stepnyWornOut,
    setStepnyWornOut,
    stepnyPressure,
    setStepnyPressure,
    driverName,
    cardObject,
    ResetContextValues,
  } = useJamaContext();

  const validateFormData = () => {
    const RemarkError = {};
    const isValid = true;
    // if (remarks.trim().length === 0) {
    //   RemarkError.err = 'Please enter proper remarks.';
    //   isValid = false;
    // }
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
        driver_reported_issue: driverReportedIssue.driverReportedIssueValue,
        car_return_reason: '',
        fastag_balance: null,
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
            fuel_indicator_petrol: fuelIndicatorPetrolBar.fuelIndicatorPetrolBarValue,
            fuel_indicator_cng: cng.cngValue,
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
            .then((resp1) => {
              notification.success({
                message: 'Audit submitted successfully.',
              });
              ResetContextValues();
              history.push('/RepairAudit/RepairAuditCarList');
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

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-2 mx-3">
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
                  {cardObject.drive_contact_number || 'mobile'}
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
        <div className="bg-white p-4 mx-2">
          <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Add Comments (Optional)</p>
          <div className="flex flex-nonwrap bg-white">
            <TextArea
              rows={4}
              placeholder="Enter Remarks Here..."
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#fff', borderColor: '#74D1D8', width: '150%',
              }}
            />

          </div>
          {Object.keys(remarksError).map((key) => (
            <div style={{ color: 'red' }}>
              {remarksError[key]}
            </div>
          ))}
        </div>
        <div className="col-12 flex flex-row justify-between my-3">
          <Button
            onClick={() => history.push('/RepairAudit/RepairCarInfo')}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            Back
          </Button>
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
    </>
  );
};

export default RepairSubmit;
