import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Input, Button } from 'antd';
import { useState, useEffect } from 'react';

const nestedPath = [
  'Home',
  'Repair Audit',
];

const { TextArea } = Input;

const transferjama = () => {
  const [rejectfor, setrejectfor] = useState(0);

  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Leasing Jama: Road Trip Audit
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div>
          <div className="bg-white p-4">
            <p className="font-quicksand-bold text-5xl" style={{ fontSize: '12px' }}>Select Reject Option</p>
            <div className="flex flex-row flex-nonwrap">
              <Button
                onClick={() => setrejectfor(4)}
                className="font-quicksand-medium"
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Transfer to Repair
              </Button>

            </div>
            <div className="flex flex-row flex-nonwrap">
              <Button
                onClick={() => setrejectfor(5)}
                className="font-quicksand-medium"
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Transfer to Servicing
              </Button>
            </div>
            <div className="flex flex-row flex-nonwrap">
              <Button
                onClick={() => setrejectfor(3)}
                className="font-quicksand-medium"
                style={{ marginTop: '10px', marginLeft: '10px' }}
              >
                Transfer to Fitness Queue
              </Button>
            </div>
          </div>
          <div className="col-12 flex flex-row justify-center my-3">
            <Button
              className="font-quicksand-medium"
              style={{
                marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
              }}
            >
              Create Job Card
            </Button>
          </div>
        </div>
      </div>
    </>
  )
};

export default transferjama;
