/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { Link, useHistory, useParams } from 'react-router-dom';
import HorizontalSearchHeader from 'components/layouts/HorizontalSearchHeader';
import Listitemlocation from 'components/layouts/Listitemlocation';
import { getPickupLocationByGarageId } from 'services/axios';

function ProcessesPage() {
  const { garageId } = useParams();

  const [locationList, setLocationList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    getPickupLocationByGarageId(garageId)
      .then((res) => {
        setLocationList(res?.data?.results?.pageData);
        setCurrentPage(currentPage - 1);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const history = useHistory();

  return (
    <>
      <Helmet title="Locations" />
      <div style={{ fontFamily: 'Quicksand' }} className="absolute right-20 mt-3.5">
        <div
          onClick={() => history.push(`/garage/addPickupLocation/-1/${garageId}`)}
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '194px', height: '52px', boxShadow: '0px 8px 16px #005B923D', padding: '13px 30px', textDecoration: 'none', cursor: 'pointer',
          }}
        >
          Add Location +
        </div>
      </div>
      <div>
        <div className="flex flex-col space-y-12">
          <div className="space-y-2 basic-1/2 mx-5">
            <span className="font-quicksand-medium text-4xl mr-3.5">
              Locations
            </span>
            <HorizontalSearchHeader Title="" />
          </div>
        </div>

        <div className="box-border h-100">
          <div className="flex flex-row flex-nowrap mx-5">
            <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/2 bg-white p-4 mr-1">Location</h1>
            <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/2 bg-white p-4 mr-1">Created on</h1>
            <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/4 bg-white p-4 mr-1">Status</h1>
            <h1 className="text-base font-quicksand-semi-bold font-medium basis-1/5 bg-white p-4 mr-1">Action</h1>
          </div>
        </div>

        <div>
          {locationList.map((item) => (
            <Listitemlocation
              locationId={item.id}
              garage_id={garageId}
              locationName={item.name}
              createdOn={item.createdAt.substring(0, 10)}
              status={String(item.isActive)}
            />
          ))}
        </div>
      </div>
    </>
  );
}

export default ProcessesPage;
