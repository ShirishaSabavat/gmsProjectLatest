/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import {
  Input, Menu, Button, Dropdown, Radio,
} from 'antd';
import { CaretDownOutlined } from '@ant-design/icons';
import {
  addProcess, getModules, getProcess, editProcess,
} from 'services/axios';
import { useLocation } from 'react-router-dom';

const createModules = () => {
  const [radioValue, setRadioValue] = useState(true);
  const [processName, setProcessName] = useState('');
  const [processError, setProcessError] = useState({});
  const [dropDownMenu, setDropDownMenu] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');
  const location = useLocation();
  const { id } = location.state;
  const menu = (
    <Menu onClick={(e) => setSelectedItem(e.key)} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {dropDownMenu?.map((data, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={key} value={data.id}>
          {data.module}
        </Menu.Item>
      ))}
    </Menu>
  );
  useEffect(() => {
    getModules()
      .then((res) => {
        console.log('res', res?.data?.results?.pageData);
        setDropDownMenu(res?.data?.results?.pageData);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    getProcess(id)
      .then((res) => {
        setProcessName(res?.data?.results?.process);
        setSelectedItem(res?.data?.results?.moduleId);
        setRadioValue(res?.data?.results?.isActive);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const validateFormData = () => {
    const processNameError = {};
    let isValid = true;

    if (processName.trim().length === 0) {
      processNameError.err = 'Process name can not be empty';
      isValid = false;
    }
    setProcessError(processNameError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    console.log('radio', radioValue);
    console.log('pname', processName);
    console.log('mod', dropDownMenu[selectedItem]?.id);
    const resp = validateFormData();
    if (resp) {
      if (id !== -1) {
        console.log('in edit');
        editProcess(processName, radioValue, dropDownMenu[selectedItem]?.id, id)
          .then((res) => {
            console.log('res', res);
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        console.log('in add');
        addProcess(processName, radioValue, dropDownMenu[selectedItem]?.id)
          .then((res) => {
            console.log('res', res);
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    }
  };

  return (
    <div className="row px-4">
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A] font-quicksand-semi-bold">Process</h6>
        <Input placeholder="PROCESS NAME" value={processName} onChange={(e) => setProcessName(e.target.value)} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }} />
        {Object.keys(processError).map((key) => (
          <div style={{ color: 'red' }}>
            {processError[key]}
          </div>
        ))}
      </div>
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A] font-quicksand-semi-bold">Status</h6>
        <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
          <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={true}>Active</Radio>
          <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>Inactive</Radio>
        </Radio.Group>
      </div>
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A] font-quicksand-semi-bold">Select Module</h6>
        <Dropdown overlay={menu}>
          <Button
            className="w-100"
            style={{
              backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', height: '40px', color: '#53565A',
            }}
          >
            <div className="row">
              <div span={22} className="col-6 text-start font-quicksand-medium">
                {dropDownMenu[selectedItem]?.module || 'Select from Modules(dropdown)'}
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
          onClick={onSave}
          className="font-quicksand-medium"
          style={{
            marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '100px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
export default createModules;
