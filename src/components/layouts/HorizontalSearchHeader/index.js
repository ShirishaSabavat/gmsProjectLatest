// import { Input } from "antd";
import React from 'react';
import { Input } from 'antd';

// eslint-disable-next-line no-unused-vars
const HorizontalSearchHeader = ({ Title }) => (
  <div className="box-border h-100 p-4 ">
    <div className="flex flex-row flex-nonwrap mt-0.5 ml-36">
      <div className="basis-1/4 mt-2">
        <p className="underline text-lg text-[#6EC1E4]">{' '}</p>
      </div>
      <div className="basis-1/4 mt-2">
        <p className="underline text-lg text-[#6EC1E4]">{' '}</p>
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
    </div>

  </div>
);

export default HorizontalSearchHeader;
