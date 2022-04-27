/* eslint-disable no-unused-vars */
/* eslint-disable global-require */
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Input } from 'antd';
import { useState, useEffect } from 'react';
import { getCarsList } from 'services/axios';
import { Link } from 'react-router-dom';

const nestedPath = [
  'Home',
  'Modify Visit',
];

const carslist = () => {
  const [CarsList, setCarsList] = useState([]);
  const [garageid, setGarageID] = useState('');
  const [createdbyid, setCreatedBy] = useState('');
  useEffect(() => {
    const tempgarageid = localStorage.getItem('garageid');
    const tempcreatedbyid = localStorage.getItem('createdby');
    setGarageID(tempgarageid);
    setCreatedBy(tempcreatedbyid);
    getCarsList(tempgarageid, tempcreatedbyid).then((resp) => {
      console.log(`garageid: ${tempgarageid}, createdbyid: ${tempcreatedbyid}`);
      console.log(resp);
      setCarsList(resp.data?.results.pageData);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  return (
    <>
      <Helmet title="Dashboard" />
      <div className="flex flex-col space-y-12 mx-3">
        <div className="space-y-2 ml-3">
          <span className="font-quicksand-semi-bold text-xl">
            General Queue : Modify Visit
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="basis-1/2 flex flex-row flex-nonwrap mr-5">
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

        </div>
        <div>
          {CarsList.map((item) => (
            <Link
              to={{ pathname: 'carformpage', state: { carId: item.carId, carnumber: item.car_number, visitcategory: item.visit_category } }}
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
            </Link>

          ))}
        </div>
      </div>
    </>
  );
};

export default carslist;
