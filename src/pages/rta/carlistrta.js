/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { getCarsListRoadTest } from 'services/axios';
import { useRTAContext } from 'context/rtaContext';
import moment from 'moment';

const carslistrta = () => {
  const {
    setSelectedCarId,
    setSelectedCarNumber,
    setSelectedDriverName,
    setSelectedVisitId,
    setCardObject,
    ResetContextValues,
  } = useRTAContext();
  const history = useHistory();
  const [CarsList, setCarsList] = useState([]);
  useEffect(() => {
    const tempGarageID = localStorage.getItem('garageid');
    const tempLocationID = localStorage.getItem('locationid');
    getCarsListRoadTest(tempGarageID, tempLocationID).then((resp) => {
      setCarsList(resp.data?.results.pageData);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-2 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Road Trial: Cars For Jama
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
            <>
              {/* <div
                onClick={() => {
                  setSelectedCarId(item.carId);
                  setSelectedCarNumber(item.car_number);
                  setSelectedDriverName(item.driver_name);
                  setSelectedVisitId(item.visitId);
                  setSelectedVisitCategory(item.visitCategory);
                  history.push(`/rta/leasingjama/${item.id}`);
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
              </div> */}
              <div
                className="px-2 py-0 my-3 max-w-sm bg-white rounded-lg border shadow-md sm:p-6"
                onClick={() => {
                  setSelectedCarId(item.carId);
                  setSelectedCarNumber(item.car_number);
                  setSelectedDriverName(item.driver_name);
                  setSelectedVisitId(item.visitId);
                  setCardObject({ ...item });
                  ResetContextValues();
                  history.push(`/rta/leasingjama/${item.id}`);
                }}
              >
                <div
                  className=" my-2 flex items-center p-3 text-base font-bold text-gray-900 rounded-lg"
                  style={{ backgroundColor: '#f4fcfc' }}
                >
                  <span className="flex-1 ml-3 font-quicksand-bold text-xl whitespace-nowrap">{item.car_number}</span>
                  <span className=" font-quicksand-semi-bold px-2 py-0.5 ml-3 text-xs text-gray-500 truncate">{item.carId?.model?.name}</span>
                </div>
                <div
                  className=" my-2 flex items-center p-3 text-base font-bold text-gray-900 rounded-lg"
                  style={{ backgroundColor: '#f4fcfc' }}
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-quicksand-medium text-gray-900 truncate mb-1">
                      Team:
                      {' '}
                      <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate mb-1">
                        {item.driver_manager_name}
                      </p>
                    </p>
                    <p className="text-sm font-quicksand-medium text-gray-900 truncate my-1">
                      Driver:
                      {' '}
                      <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate my-1">
                        {item.driver_name}
                      </p>
                    </p>
                    <p className="text-sm font-quicksand-medium text-gray-900 truncate my-1">
                      Mobile:
                      {' '}
                      <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate my-1">
                        {item.drive_contact_number}
                      </p>
                    </p>
                    <p className="text-sm font-bold font-quicksand-medium text-gray-900 truncate mt-1 mb-0">
                      In-Time:
                      {' '}
                      <p className="inline-flex text-sm font-quicksand-medium text-teal-300 truncate mt-1 mb-0">
                        {moment(
                          item.createdAt,
                        ).format('DD-MM-YYYY, h:mm:ss a')}
                      </p>
                    </p>
                  </div>
                </div>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
};

export default carslistrta;
