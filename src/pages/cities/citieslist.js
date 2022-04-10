import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import HorizontalSearchHeader from 'components/layouts/HorizontalSearchHeader';
import Listitemcity from 'components/layouts/Listitemcity';
import { Pagination } from 'react-headless-pagination';
import { Link } from 'react-router-dom';
import { getCities } from 'services/axios';

const nestedPath = [
  'Home',
  'Cities',
];

function citieslist() {
  const [cities, setCities] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getCities(0).then((res) => {
      console.log('res', res);
      setCities(res.data?.results.pageData);
      setCurrentPage(res.data?.results.currentPage);
      setTotalPages(res.data?.results.totalPages);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  function clickNext() {
    if (currentPage + 1 <= totalPages) {
      getCities(currentPage + 1).then((res) => {
        console.log('res', res);
        setCities(res.data?.results.pageData);
        setCurrentPage(currentPage + 1);
      })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
  function clickPrevious() {
    if (currentPage - 1 >= 0) {
      getCities(currentPage - 1).then((res) => {
        console.log('res', res);
        setCities(res.data?.results.pageData);
        setCurrentPage(currentPage - 1);
      })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
  return (
    <>
      <Helmet title="Cities" />
      <div className="absolute right-20 mt-3.5" style={{ fontFamily: 'Quicksand' }}>
        <Link
          to={{ pathname: 'addcity', state: { id: -1 } }}
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '194px', height: '52px', boxShadow: '0px 8px 16px #005B923D', padding: '13px 30px', textDecoration: 'none',
          }}
        >
          Add New City +
        </Link>
      </div>
      <div>
        <div className="flex flex-col space-y-12">
          <div className="space-y-2 basic-1/2 mx-5">
            <span className="font-montserrat-medium text-4xl mr-3.5">
              Cities
            </span>
            <Breadcrumb nestedPath={nestedPath} />
            <HorizontalSearchHeader Title="All Cities" />

          </div>

        </div>
        <div className="box-border h-12">
          <div className="flex flex-row flex-nowrap mx-5">
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-3 mr-0.5">City</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-3 mr-0.5">User Series</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-3 mr-0.5">Garage Series</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-3 mr-0.5">Status</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-3 mr-0.5">Action</h1>
          </div>

        </div>
        <div>
          {cities.map((item) => (
            <Listitemcity
              city_name={item.name}
              city_manager={item.user_series}
              garage_quantity={item.garage_series}
              status={String(item.isActive)}
            />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          edgePageCount={2}
          middlePagesSiblingCount={2}
          className=""
          truncableText="..."
          truncableClassName="mt-5 mx-5"
        >
          <div className="flex items-center justify-center flex-grow mt-5">
            <div onClick={clickPrevious}>
              <Pagination.PrevButton className="mt-5 bg-white mx-5 rounded">{'<'}</Pagination.PrevButton>
            </div>
            <Pagination.PageButton
              activeClassName="bg-teal-400 text-white"
              inactiveClassName="bg-white"
              className="p-3 mx-4 mt-5 rounded"
            />
            <div onClick={clickNext}>
              <Pagination.NextButton className="mt-5 bg-white mx-5 rounded">{'>'}</Pagination.NextButton>
            </div>
          </div>
        </Pagination>
        {/* <Items currentItems={currentItems} /> */}
      </div>
    </>
  );
}

export default citieslist;
