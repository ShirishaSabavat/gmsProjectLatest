/* eslint-disable max-len */
/* eslint-disable global-require */
/* eslint-disable no-unused-vars */
import { Helmet } from 'react-helmet';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { getQueueCarsList, getQueueOperator } from 'services/axios';
import { useCompletionContext } from 'context/CompletionContext';
import moment from 'moment';

const carsQueue = () => {
  const {
    operator,
    setOperator,
    setCardObject,
    ResetContextValues,
  } = useCompletionContext();
  const history = useHistory();
  const { id } = useParams();
  const [CarsList, setCarsList] = useState([]);
  // const [operator, setOperator] = useState(0);

  const tempGarageID = localStorage.getItem('garageid');
  const tempLocationID = localStorage.getItem('locationid');
  // const tempOperator = localStorage.getItem('role');
  useEffect(() => {
    setOperator(id);
  }, []);
  useEffect(() => {
    if (operator === '6' || operator === '7' || operator === '8') {
      getQueueOperator(operator, 3)
        .then((resp) => {
          setCarsList(resp.data?.results.pageData);
        })
        .catch((err) => {
          console.log('err', err);
        });
    } else {
      getQueueCarsList(tempGarageID, operator, 3, tempLocationID)
        .then((resp) => {
          setCarsList(resp.data?.results.pageData);
        })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }, [operator]);
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-2 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            Completion Queue
          </span>
        </div>
        <div>
          {CarsList.map((item) => (
            <div
              className="px-2 py-0 my-3 max-w-sm bg-white rounded-lg border shadow-md sm:p-6"
              onClick={() => {
                ResetContextValues();
                setCardObject({ ...item });
                history.push('/completion/CarsQueueDetails');
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
          ))}
        </div>
      </div>
    </>
  );
};

export default carsQueue;
