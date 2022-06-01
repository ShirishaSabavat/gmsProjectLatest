import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import HorizontalSearchHeader from 'components/layouts/HorizontalSearchHeader';
import Listitemprocess from 'components/layouts/Listitemprocess';
import { Pagination } from 'react-headless-pagination';
import { useHistory } from 'react-router-dom';
import { getProcess } from 'services/axios';

const nestedPath = [
  'Home',
  'Processes',
];

function ProcessesPage() {
  const [processlist, setProcessList] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getProcess(0).then((res) => {
      setProcessList(res.data?.results.pageData);
      setCurrentPage(res.data?.results.currentPage);
      setTotalPages(res.data?.results.totalPages);
    })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);
  function clickNext() {
    if (currentPage + 1 < totalPages) {
      getProcess(currentPage + 1).then((res) => {
        setProcessList(res.data?.results.pageData);
        setCurrentPage(currentPage + 1);
      })
        .catch((err) => {
          console.log('err', err);
        });
    }
  }
  function clickPrevious() {
    if (currentPage - 1 >= 0) {
      getProcess(currentPage - 1).then((res) => {
        setProcessList(res.data?.results.pageData);
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
      <Helmet title="Processes" />
      <div className="absolute right-20 mt-3.5" style={{ fontFamily: 'Quicksand' }}>
        <div
          onClick={() => history.push('/processes/addProcess/-1')}
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '205px', height: '52px', boxShadow: '0px 8px 16px #005B923D', padding: '13px 30px', textDecoration: 'none', cursor: 'pointer',
          }}
        >
          Add New Process +
        </div>
      </div>
      <div>
        <div className="flex flex-col space-y-12">
          <div className="space-y-2 basic-1/2  mx-5">
            <span className="font-montserrat-medium text-4xl mr-3.5">
              Processes
            </span>
            <Breadcrumb nestedPath={nestedPath} />
            <HorizontalSearchHeader Title="" />

          </div>
        </div>
        <div className="box-border mb-px">
          <div className="flex flex-row flex-nowrap mx-5">
            <h1 className="text-base font-quicksand-medium font-medium basis-1/2 bg-white p-4 mr-1">Process</h1>
            <h1 className="text-base font-quicksand-medium font-medium basis-1/2 bg-white p-4 mr-1">Modules</h1>
            <h1 className="text-base font-quicksand-medium font-medium basis-1/2 bg-white p-4 mr-1">Created on</h1>
            <h1 className="text-base font-quicksand-medium font-medium basis-1/4 bg-white p-4 mr-1">Status</h1>
            <h1 className="text-base font-quicksand-medium font-medium basis-1/5 bg-white p-4 mr-1">Action</h1>
          </div>

        </div>
        <div>
          {processlist.map((item) => (
            <Listitemprocess
              process_id={item.id}
              process_name={item.process}
              module_name={item.module?.module}
              created_on={item.createdAt.substring(0, 10)}
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

export default ProcessesPage;
