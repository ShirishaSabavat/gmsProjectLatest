import React from "react";
import {
  Input, Button, Radio,
} from "antd";

const createModules = () => {
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log("radio checked", e.target.value);
    setValue(e.target.value);
  };

  return (
    <div className="row px-4">
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A]">Module Title</h6>
        <Input placeholder="Module 1" style={{ backgroundColor: "#F5F8FC", borderColor: "#F5F8FC", padding: "8px" }} />
      </div>
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A]">Status</h6>
        <Radio.Group onChange={onChange} value={value}>
          <Radio style={{ color: "#9193A2" }} value={1}>Active</Radio>
          <Radio style={{ color: "#9193A2" }} value={2}>Inactive</Radio>
        </Radio.Group>
      </div>
      <div className="col-12 flex flex-row justify-end">
        <Button
          onClick=""
          style={{
            marginRight: "20px", borderRadius: "4px", fontWeight: "500", backgroundColor: "#013453", color: "#FFFFFF", fontSize: "16px", width: "120px", height: "40px", boxShadow: "0px 8px 16px #005B923D",
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default createModules;
