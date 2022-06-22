/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import { Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { getQueueCarsList } from 'services/axios';
import { useJamaContext } from 'context/sixtyFortyJamaContext';
import moment from 'moment';

const jamacarlist = () => {
  const {
    setselectedCarID,
    setSelectedCar,
    setVisitId,
    setDriverName,
    setCardObject,
    ResetContextValues,
  } = useJamaContext();
  const history = useHistory();
  const [CarsList, setCarsList] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchLoading, setSearchLoading] = useState(false);
  const globalSearch = (value) => {
    setSearchLoading(true);
    setSearchValue(value);
    setTimeout(() => setSearchLoading(false), 1500);
  };

  useEffect(() => {
    const tempGarageID = localStorage.getItem('garageid');
    const tempLocationID = localStorage.getItem('locationid');
    getQueueCarsList(tempGarageID, 1, 2, tempLocationID).then((resp) => {
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
            Cars: in 60:40 Jama
          </span>
        </div>
        <div className="bg-white m-1 mt-4">
          <div className="flex flex-nonwrap bg-white">
            <Input
              size="medium"
              placeholder="Search Car Number"
              prefix={(
                <img
                  className="mr-3"
                  src="/assets/images/general/loupe.svg"
                  alt="search"
                  width="10"
                />
              )}
              style={{
                padding: '8px', backgroundColor: '#fff', borderColor: '#013453', width: '150%',
              }}
              suffix={searchLoading && <LoadingOutlined />}
              onChange={({ target: { value } }) => globalSearch(value)}
            />
          </div>
        </div>
        <div>
          {
            CarsList.length !== 0 ? (CarsList.filter((el) => el.car_number.toLowerCase().includes(searchValue.toLowerCase())).map((item) => (
              <div
                className="p-2 my-3 max-w-sm bg-white rounded-lg border shadow-md sm:p-6"
                onClick={() => {
                  ResetContextValues();
                  setselectedCarID({ selectedCarIDValue: item.id });
                  setSelectedCar({ selectedCarValue: item.car_number });
                  setVisitId({ visitIdValue: item.visitId });
                  setDriverName({ driverNameValue: item.driver_name });
                  setCardObject({ ...item });
                  history.push('/sixtyfortyjama/sixtyfortyjamadetails');
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
            ))) : (
              <div className="px-2 py-0 my-6 mt-48 max-w-sm sm:p-6">
                <p className="font-quicksand-semi-bold text-4xl text-red-500 text-center">No cars in queue</p>
              </div>
            )
          }
        </div>
      </div>
    </>
  );
};

export default jamacarlist;
