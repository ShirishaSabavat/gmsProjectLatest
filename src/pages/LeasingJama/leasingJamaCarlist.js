/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getQueueCarsList } from 'services/axios';
import { useJamaContext } from 'context/sixtyFortyJamaContext';

const leasingJamacarlist = () => {
  const {
    setselectedCarID,
    setSelectedCar,
    setVisitId,
    setMemberName,
  } = useJamaContext();
  const [CarsList, setCarsList] = useState([
    {
      car_number: 'MH 04 DR 1564',
      visitId: 'sdafsdfg8465465',
    },
  ]);
  const [garageid, setGarageid] = useState('');
  useEffect(() => {
    const tempGarageID = localStorage.getItem('garageid');
    setGarageid(tempGarageID);
    getQueueCarsList(tempGarageID, 2, 2).then((resp) => {
      setCarsList(resp.data?.results.pageData);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  const history = useHistory();
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Leasing Jama
          </span>
        </div>
        {/* <div className="basis-1/2 flex flex-row flex-nonwrap mr-5">
          <Input
            size="medium"
            placeholder="Search for anything..."
            prefix={(
              <img
                className="bg-white"
                src="/assets/images/general/loupe.svg"
                alt="search"
                width="10"
              />
            )}
            style={{
              padding: '14px', marginLeft: '15px', backgroundColor: 'rgba(255,255,255,1)', width: '180%',
            }}

          />

        </div> */}
        <div>
          {CarsList.map((item) => (
            <div
              onClick={() => {
                setselectedCarID({ selectedCarIDValue: item.id });
                setSelectedCar({ selectedCarValue: item.car_number });
                setVisitId({ visitIdValue: item.visitId });
                setMemberName({ memberNameValue: item.driver_manager_name });
                history.push('/LeasingJama/LeasingJamadetails');
              }}
              className="bg-white"
            >
              <div className="bg-white rounded-lg my-3 mx-2">
                <div className="flex flex-row flex-nonwrap justify-center">
                  <img className="w-20 h-20 my-3 mx-6 rounded-full" alt="" src={require('../../components/layouts/carimage.jpg')} />
                  <div>
                    <h1 className="font-quicksand-bold text-xl mt-3">{item.car_number}</h1>
                    <h1 className="font-quicksand-semi-bold text-sm mt-1">Maruti Suzuki Drive Vxi CNG</h1>
                    <div className="flex flex-row">
                      <h1 className="font-quicksand-semi-bold text-sm mt-1">Visit ID: </h1>
                      <h1 className="font-quicksand-semi-bold text-sm mt-1 text-teal-300">{item.visitId}</h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default leasingJamacarlist;
