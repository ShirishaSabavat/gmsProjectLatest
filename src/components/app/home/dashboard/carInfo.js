import React from 'react';
import { Card } from 'antd';

const CarInfo = (props) => {
  const {
    visitingCarInfo, carNumber, showCard,
  } = props;
  return (
    <div className="font-quicksand-regular">
      <div className="container-fluid mb-4">
        {showCard ? (
          <Card>
            <div className="row">
              <div className="col-12">
                <div className="row">
                  <div className="col-6">
                    <h6 className="text-[#333333] text-base font-quicksand-semi-bold m-0">{carNumber}</h6>
                    <h6 className="text-[#333333] font-quicksand-semi-bold text-sm mb-0">
                      {visitingCarInfo?.name}
                    </h6>
                  </div>
                  <hr className="mt-0 text-[#86A1A4]" />
                  <div style={{ fontSize: '14px' }} className="col-12 font-quicksand-semi-bold grid grid-cols-4 my-3">
                    <div className="text-center border-solid border-r-2 border-[#86A1A4] px-3 my-3">
                      <p className="text-[#86A1A4] mb-0">Team</p>
                      <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                        {' '}
                        {visitingCarInfo?.driver_manager_name}
                      </p>
                    </div>
                    <div className="text-center border-solid border-r-2 border-slate-400 px-3 my-3">
                      <p className="text-[#86A1A4] mb-0">Driver</p>
                      <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                        {' '}
                        {visitingCarInfo?.driver_name}
                      </p>
                    </div>
                    <div className="text-center border-solid border-r-2 border-slate-400 px-3 my-3">
                      <p className="text-[#86A1A4] mb-0">Mobile</p>
                      <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                        {' '}
                        {visitingCarInfo?.drive_contact_number}
                      </p>
                    </div>
                    <div className="text-center border-solid border-slate-400 px-3 my-3">
                      <p className="text-[#86A1A4] mb-0">In Time</p>
                      <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                        {' '}
                        {visitingCarInfo?.in_time}
                      </p>
                    </div>
                    <div className="text-center border-solid border-r-2 border-[#86A1A4] px-3 my-3">
                      <p className="text-[#86A1A4] mb-0">Gate Keeper</p>
                      <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                        {' '}
                        {visitingCarInfo?.gate_keeper}
                      </p>
                    </div>
                    <div className="text-center border-solid border-r-2 border-[#86A1A4] px-3 my-3">
                      <p className="text-[#86A1A4] mb-0">Auditor Name</p>
                      <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                        {' '}
                        {visitingCarInfo?.auditor}
                      </p>
                    </div>
                    <div className="text-center border-solid border-slate-400 px-3 my-3">
                      <p className="text-[#86A1A4] mb-0">Auditor Role</p>
                      <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                        {' '}
                        {visitingCarInfo?.auditor_role}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ) : ''}
      </div>
    </div>
  );
};

export default CarInfo;
