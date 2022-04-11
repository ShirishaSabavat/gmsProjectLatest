import React from 'react';
import {
  Input, Menu, Button, Dropdown, Radio,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';

const createModules = () => {
  const [value, setValue] = React.useState(1);

  const onChange = (e) => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

  const menu = (
    <Menu onClick="" style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      <Menu.Item key="1">
        Module 1
      </Menu.Item>
      <Menu.Item key="2">
        Module 2
      </Menu.Item>
      <Menu.Item key="3">
        Module 3
      </Menu.Item>
      <Menu.Item key="2">
        Module 4
      </Menu.Item>
      <Menu.Item key="3">
        Module 5
      </Menu.Item>
    </Menu>
  );

  return (
    <div className="row px-4">
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A]">Process</h6>
        <Input placeholder="Process 1" style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }} />
      </div>
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A]">Status</h6>
        <Radio.Group onChange={onChange} value={value}>
          <Radio style={{ color: '#9193A2' }} value={1}>Active</Radio>
          <Radio style={{ color: '#9193A2' }} value={2}>Inactive</Radio>
        </Radio.Group>
      </div>
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A]">Select Module</h6>
        <Dropdown overlay={menu}>
          <Button
            className="w-100"
            style={{
              backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', height: '40px', color: '#53565A',
            }}
          >
            <div className="row">
              <div span={22} className="col-6 text-start">
                Select from Modules(dropdown)
              </div>
              <div span={2} className="col-6 text-end">
                <CaretDownOutlined className="text-end" style={{ color: '#74D1D8' }} />
              </div>
            </div>
          </Button>
        </Dropdown>
      </div>
      <div className="col-12 flex flex-row justify-end">
        <Button
          onClick=""
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '120px', height: '40px', boxShadow: '0px 8px 16px #005B923D',
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default createModules;
