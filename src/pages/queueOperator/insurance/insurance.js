/* eslint-disable max-len */
/* eslint-disable global-require */
// import Breadcrumb from 'components/layouts/breadcrumb';
import { Helmet } from 'react-helmet';
import {
  Radio, Button, notification,
} from 'antd';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useQueueContext } from 'context/QueueContext';
import { editBreakdown } from 'services/axios';
import moment from 'moment';

const insuranceDetails = () => {
  const {
    cardObject,
  } = useQueueContext();

  const history = useHistory();

  const [rejectReason, setRejectReason] = useState('Incorrect Car Number');
  const [rejectValue, setRejectValue] = useState(true);
  const [tadValue, setTadValue] = useState(true);

  const validateFormData = () => {
    // const RemarkError = {};
    const isValid = true;
    // if (!rejectValue) {
    //   if (rejectReason.trim().length === 0) {
    //     RemarkError.err = 'This field can not be empty.';
    //     isValid = false;
    //   }
    // }
    // setReasonError(RemarkError);
    return isValid;
  };

  const handleSaveData = () => {
    const resp = validateFormData();
    if (resp) {
      const recoveryData = {
        accept_reject: rejectValue,
        reject_reason: rejectValue === true ? null : rejectReason,
        insurance_tad_received: rejectValue === true ? tadValue : null,
        status: 3,
      };
      editBreakdown(cardObject?.id, recoveryData)
        .then(() => {
          notification.success({
            message: 'Visit Edited Successfully',
          });
          history.push('/insurance/insuranceQueueList');
        })
        .catch((err) => {
          notification.error({
            message: err.response.data.message,
          });
        });
    }
  };

  const handleReject = (e) => {
    setRejectReason('');
    setTadValue(true);
    setRejectReason('Incorrect Car Number');
    setRejectValue(e.target.value);
  };
  const handleTAD = (e) => {
    setTadValue(e.target.value);
  };
  const handleRejectReason = (e) => {
    setRejectReason(e.target.value);
  };

  return (
    <>
      <Helmet title="Insurance Queue Form" />
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
          <div
            className=" my-2 flex items-center p-3 text-base font-bold text-gray-900 rounded-lg"
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
      </div>
      <div className="bg-white p-4 mx-2">
        <h6 className="text-sm text-[#53565A]">
          Status
          {' '}
          <span style={{ color: 'red' }}>*</span>
        </h6>
        <Radio.Group onChange={handleReject} value={rejectValue}>
          <Radio style={{ color: '#9193A2' }} value>Accept</Radio>
          <Radio style={{ color: '#9193A2' }} value={false}>Reject</Radio>
        </Radio.Group>
        {rejectValue === false ? (
          <div className="bg-white mt-2">
            <div className="flex flex-nonwrap bg-white">
              <div className="bg-white py-2">
                <h6 className="text-sm text-[#53565A]">
                  Reject Reason
                  {' '}
                  <span style={{ color: 'red' }}>*</span>
                </h6>
                <Radio.Group onChange={handleRejectReason} value={rejectReason}>
                  <Radio style={{ color: '#9193A2' }} value="Incorrect Car Number">Incorrect Car Number</Radio>
                  <Radio style={{ color: '#9193A2' }} value="Incorrect Location">Incorrect Location</Radio>
                </Radio.Group>
              </div>

            </div>
          </div>
        ) : (
          <div className="bg-white mt-4">
            <h6 className="text-sm text-[#53565A]">
              TAD Received
              {' '}
              <span style={{ color: 'red' }}>*</span>
            </h6>
            <Radio.Group onChange={handleTAD} value={tadValue}>
              <Radio style={{ color: '#9193A2' }} value>Yes</Radio>
              <Radio style={{ color: '#9193A2' }} value={false}>No</Radio>
            </Radio.Group>
          </div>
        )}
      </div>
      <div className="col-12 flex flex-row justify-between my-3">
        <Button
          onClick={() => {
            history.push('/insurance/insuranceQueueList');
          }}
          className="font-quicksand-medium"
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Back
        </Button>
        <Button
          onClick={handleSaveData}
          className="font-quicksand-medium"
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#74d1d8', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 25px',
          }}
        >
          Save
        </Button>
      </div>
    </>
  );
};
export default insuranceDetails;
