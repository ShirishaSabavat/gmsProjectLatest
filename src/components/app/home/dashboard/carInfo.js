import React from 'react';
import { Card } from 'antd';

const CarInfo = (props) => {
  const {
    visitingCarInfo, carNumber,
  } = props;
  console.log(visitingCarInfo);
  return (
    <div className="font-quicksand-regular">
      <div className="container-fluid mb-4">
        <Card>
          <div className="row">
            <div className="col-12">
              <div className="row">
                <div className="col-6">
                  <h6 className="text-[#333333] text-base font-quicksand-semi-bold m-0">{carNumber}</h6>
                </div>
                <hr className="mt-0 text-[#86A1A4]" />
                <div style={{ fontSize: '14px' }} className="col-12 font-quicksand-semi-bold grid grid-cols-4 my-3">
                  <div className="text-center border-solid border-r-2 border-[#86A1A4] px-3 my-3">
                    <p className="text-[#86A1A4] mb-0">Team</p>
                    <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                      {' '}
                      Pranay Rental
                    </p>
                  </div>
                  <div className="text-center border-solid border-r-2 border-slate-400 px-3 my-3">
                    <p className="text-[#86A1A4] mb-0">Driver</p>
                    <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                      {' '}
                      Firoz Ahmed
                    </p>
                  </div>
                  <div className="text-center border-solid border-r-2 border-slate-400 px-3 my-3">
                    <p className="text-[#86A1A4] mb-0">Mobile</p>
                    <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                      {' '}
                      9876543211
                    </p>
                  </div>
                  <div className="text-center border-solid border-slate-400 px-3 my-3">
                    <p className="text-[#86A1A4] mb-0">Trips per Hour</p>
                    <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                      {' '}
                      13-06-2022, 3:29:53 pm
                    </p>
                  </div>
                  <div className="text-center border-solid border-r-2 border-[#86A1A4] px-3 my-3">
                    <p className="text-[#86A1A4] mb-0">Auditor Name</p>
                    <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                      {' '}
                      Ashish Pandey
                    </p>
                  </div>
                  <div className="text-center border-solid border-slate-400 px-3 my-3">
                    <p className="text-[#86A1A4] mb-0">Auditor Role</p>
                    <p className="text-[#333333] mb-1" style={{ fontSize: '16px' }}>
                      {' '}
                      60:40 Jama Queue Auditor
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CarInfo;
