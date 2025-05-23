import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import HorizontalSearchHeader from 'components/layouts/HorizontalSearchHeader';
import Listitemteamgarage from 'components/layouts/Listitemteamgarage';
import { Pagination } from 'react-headless-pagination';
import { useHistory, useParams } from 'react-router-dom';
import { getTeamGarages } from 'services/axios';

function teamslist() {
  const [garages, setGarages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { name, garageId } = useParams();

  const nestedPath = [
    'Home',
    'Garages',
    `Garage - ${name}`,
  ];

  useEffect(() => {
    getTeamGarages(0, garageId).then((res) => {
      setGarages(res.data?.results.pageData);
      setCurrentPage(res.data?.results.currentPage);
      setTotalPages(res.data?.results.totalPages);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  function clickNext() {
    if (currentPage + 1 < totalPages) {
      getTeamGarages(currentPage + 1, garageId).then((res) => {
        setGarages(res.data?.results.pageData);
        setCurrentPage(currentPage + 1);
      })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
  function clickPrevious() {
    if (currentPage - 1 >= 0) {
      getTeamGarages(currentPage - 1, garageId).then((res) => {
        setGarages(res.data?.results.pageData);
        setCurrentPage(currentPage - 1);
      })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
  const history = useHistory();
  return (
    <>
      <Helmet title="Garages" />
      <div className="absolute right-20 mt-3.5" style={{ fontFamily: 'Quicksand' }}>
        <div
          onClick={() => history.push({
            pathname: `/garage/addteam/-1/${garageId}/-1/${name}/-1/-1/true`,
            state: { user_ids: [] },
          })}
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '194px', height: '52px', boxShadow: '0px 8px 16px #005B923D', padding: '13px 30px', textDecoration: 'none', cursor: 'pointer',
          }}
        >
          Add New Team +
        </div>
      </div>
      <div>
        <div className="flex flex-col space-y-12 mx-5">
          <div className="space-y-2 basic-1/2">
            <span className="font-quicksand-semi-bold text-4xl mr-3.5">
              {name}
            </span>
            <Breadcrumb nestedPath={nestedPath} />
            <HorizontalSearchHeader Title="Teams" />

          </div>

        </div>
        <div className="box-border mx-5">
          <div className="flex flex-row flex-nowrap">
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/2 bg-white p-4 mr-0.5">Team Name</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">Status</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-4 mr-0.5">Action</h1>
          </div>

        </div>
        <div>
          {garages.map((item) => (
            <Listitemteamgarage
              team_id={item.id}
              garageName={name}
              team_name={item.name}
              team_description={item.description}
              garage_id={garageId}
              locationId={item.locationId}
              users_ids={item.users}
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

export default teamslist;
