import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Breadcrumb from "components/layouts/breadcrumb";
import HorizontalSearchHeader from "components/layouts/HorizontalSearchHeader";
import Listitemgarage from "components/layouts/Listitemgarage";
import { Pagination } from "react-headless-pagination";
import { Link } from "react-router-dom";
import { getGarages } from "services/axios";

const nestedPath = [
  'Home',
  'Garages',
];

function garagelist() {
  const [garages, setGarages] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  useEffect(() => {
    getGarages(0).then((res) => {
      console.log("res", res);
      setGarages(res.data?.results.pageData);
      setCurrentPage(res.data?.results.currentPage);
      setTotalPages(res.data?.results.totalPages);
    })
      .catch((err) => {
        console.log("err", err);
      });
  }, []);
  function clickNext() {
    if (currentPage + 1 <= totalPages) {
      getGarages(currentPage + 1).then((res) => {
        console.log("res", res);
        setGarages(res.data?.results.pageData);
        setCurrentPage(currentPage + 1);
      })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }
  function clickPrevious() {
    if (currentPage - 1 >= 0) {
      getGarages(currentPage - 1).then((res) => {
        console.log("res", res);
        setGarages(res.data?.results.pageData);
        setCurrentPage(currentPage - 1);
      })
        .catch((err) => {
          console.log("err", err);
        });
    }
  }
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
            <HorizontalSearchHeader Title="All Garages" />

          </div>

        </div>
        <div className="box-border h-100">
          <div className="flex flex-row flex-nowrap">
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">Garage Name</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">Description</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/3 bg-white p-4 mr-0.5">Garage Series</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-4 mr-0.5">Status</h1>
            <h1 className="text-base font-mulish-semi-bold font-medium basis-1/6 bg-white p-4 mr-0.5">Action</h1>
          </div>

        </div>
        <div>
          {garages.map((item) => (
            <Listitemgarage
              garage_name={item.name}
              garage_manager={item.description}
              garage_members={item.garage_series}
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
              <Pagination.PrevButton className="mt-5 bg-white mx-5 rounded">{"<"}</Pagination.PrevButton>
            </div>
            <Pagination.PageButton
              activeClassName="bg-teal-400 text-white"
              inactiveClassName="bg-white"
              className="p-3 mx-4 mt-5 rounded"
            />
            <div onClick={clickNext}>
              <Pagination.NextButton className="mt-5 bg-white mx-5 rounded">{">"}</Pagination.NextButton>
            </div>
          </div>
        </Pagination>
        {/* <Items currentItems={currentItems} /> */}
      </div>
    </>
  );
}

export default garagelist;
