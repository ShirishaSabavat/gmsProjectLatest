import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import HorizontalSearchHeader from 'components/layouts/HorizontalSearchHeader';
import Listitemgarage from 'components/layouts/Listitemgarage';
import { Pagination } from 'react-headless-pagination';
import { Link } from 'react-router-dom';
import { getGarages } from 'services/axios';

const nestedPath = [
  "Home",
  "Garages",
];

function garagelist() {
  const [garages, setGarages] = useState([]);
  useEffect(() => {
    getGarages().then((res) => {
      console.log('res', res);
      setGarages(res.data?.results.pageData);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  return (
    <>
      <Helmet title="Garages" />
      <div className="absolute right-20 mt-3.5">
        <Link to="addgarage" className="font-montserrat-medium text-xl text-white bg-cyan-900 p-3">
          Add new Garage +
        </Link>
      </div>
      <div>
        <div className="flex flex-col space-y-12">
          <div className="space-y-2 basic-1/2">
            <span className="font-montserrat-medium text-4xl mr-3.5">
              Garages
            </span>
            <Breadcrumb nestedPath={nestedPath} />
            <HorizontalSearchHeader Title="All Cities" />

          </div>

        </div>
        <div className="box-border h-100">
          <div className="flex flex-row flex-nowrap">
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">Garage Name</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">Garage Manager</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">Garage Members</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-4 mr-0.5">Status</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-4 mr-0.5">Action</h1>
          </div>

        </div>
        <div>
          {garages.map((item) => (
            <Listitemgarage
              garage_name={item.name}
              garage_manager="John Doe"
              garage_members="15"
              status={item.isActive}
            />
          ))}
        </div>
        <Pagination
          currentPage={0}
          totalPages={10}
          edgePageCount={2}
          middlePagesSiblingCount={2}
          className=""
          truncableText="..."
          truncableClassName="mt-5 mx-5"
        >
          <div className="flex items-center justify-center flex-grow mt-5">
            <Pagination.PrevButton className="mt-5 bg-white mx-5 rounded">{'<'}</Pagination.PrevButton>
            <Pagination.PageButton
              activeClassName="bg-teal-400 text-white"
              inactiveClassName="bg-white"
              className="p-3 mx-4 mt-5 rounded"
            />
            <Pagination.NextButton className="mt-5 bg-white mx-5 rounded">{'>'}</Pagination.NextButton>
          </div>
        </Pagination>
        {/* <Items currentItems={currentItems} /> */}
      </div>
    </>
  );
}

export default garagelist;
