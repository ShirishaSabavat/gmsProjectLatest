import { Input } from "antd";
import React from "react";

const HorizontalSearchHeader = ({ Title }) => (
  <div className="box-border h-200 p-4 ">
    <div className="flex flex-row flex-wrap mt-24">
      <div className="basis-1/3 mt-2.5">
        <h1 className="text-2xl font-mulish-semi-bold font-medium">{Title}</h1>
      </div>
      <div className="basis-1/5 mt-2.5 text-right">
        <p className="underline text-lg text-[#6EC1E4]">View All</p>
      </div>
      <div className="basis-1/3 flex flex-row flex-nonwrap bg-white">
        <Input
          size="medium"
          placeholder="Search for anything..."
          prefix={(
            <img
              className="mr-3"
              src="/assets/images/general/loupe.svg"
              alt="search"
              width="10"
            />
          )}
          style={{
            padding: "14px", marginLeft: "15px", marginBottom: "8px", backgroundColor: "rgba(245,248,252,1)", width: "150%",
          }}

        />

      </div>
    </div>

  </div>
);

export default HorizontalSearchHeader;
