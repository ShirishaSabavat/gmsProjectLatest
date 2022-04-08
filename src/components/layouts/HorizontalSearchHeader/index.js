// eslint-disable-next-line no-unused-vars
import { Input } from 'antd';
import React from 'react';

const HorizontalSearchHeader = ({ Title }) => (
  <div className="box-border h-200 p-4 ">
    <div className="flex flex-row flex-wrap mt-24">
      <div className="basis-1/3">
        <h1 className="text-2xl font-mulish-semi-bold font-medium">{Title}</h1>
      </div>
      <div className="basis-1/3">
        <p className="underline text-lg text-[#6EC1E4]">View All</p>
      </div>
      <div className="basis-1/3 flex flex-row flex-wrap bg-white">
        {/* <Input
              size="medium"
              placeholder="Search for anything..."
              prefix={(

              )}
              className="w-25 p-5"
              style={{ margin: '11px' }}
            /> */}
        <img
          className="mx-4"
          src="/assets/images/general/loupe.svg"
          alt="search"
          width="15"
          height="15"
        />
        <input
          className="basic-1"
          prefix="Search Anything Here..."
        />
      </div>
    </div>

  </div>
);

export default HorizontalSearchHeader;
