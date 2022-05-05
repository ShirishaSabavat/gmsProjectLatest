/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Button } from 'antd';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';

const nestedPath = [
  'Home',
  'Insurance',
];

const homepage = () => {
  const [username, setUserName] = useState('');
  const [empid, setEmpID] = useState('');
  useEffect(() => {
    const tempUserName = localStorage.getItem('user');
    const tempempid = localStorage.getItem('empid');
    setUserName(tempUserName);
    setEmpID(tempempid);
  }, []);
  const history = useHistory();
  return (
    <>
      <Helmet title="Home" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Insurance
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        {/* <div className="flex bg-white rounded-lg my-3 mx-8 justify-center">
          <div>
            <div className="flex flex-row justify-center">
              <img
                className="w-28 h-28 my-3 rounded-full align-middle" alt=""
                src={require('../../components/layouts/defaultperson.jpg')}
              />
            </div>
            <h1 className="font-quicksand-bold text-xl mt-6 text-center">{username}</h1>
            <h1
              className="font-quicksand-semi-bold text-base mt-3 text-center"
            >
              Gatekeeper Auditor
            </h1>
            <div className="flex flex-row justify-center mb-6">
              <h1 className="font-quicksand-semi-bold text-base mt-3">ID: </h1>
              <h1 className="font-quicksand-semi-bold text-base mt-3 text-teal-300">
                {' '}
                {empid}
              </h1>
            </div>
          </div>
        </div> */}
        <div div className="flex bg-white rounded-lg my-3 mx-8 justify-center py-24">
          <div>
            <div className="col-12 flex flex-row justify-end">
              <div
                onClick={() => history.push('/insurance/insuranceForm/-1')}
                className="font-quicksand-medium"
                style={{
                  marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#74d1d8', color: '#FFFFFF', fontSize: '16px', width: '90%', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 25px',
                }}
              >
                Add Insurance
              </div>
            </div>
            <div className="col-12 flex flex-row justify-end mt-10">
              <div
                onClick={() => history.push('/insurance/insuranceList')}
                className="font-quicksand-medium"
                style={{
                  marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '90%', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
                }}
              >
                Edit Insurance
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default homepage;
