/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import {
  Input, Menu, Button, Dropdown, Radio, notification,
} from 'antd';
import Breadcrumb from 'components/layouts/breadcrumb';
import { CaretDownOutlined } from '@ant-design/icons';
import {
  addProcess, getModules, getProcessById, editProcess,
} from 'services/axios';
import { useParams, useHistory } from 'react-router-dom';

const createModules = () => {
  const [radioValue, setRadioValue] = useState(true);
  const [processName, setProcessName] = useState('');
  const [processError, setProcessError] = useState({});
  const [moduleError, setModuleError] = useState({});
  const [dropDownMenu, setDropDownMenu] = useState([]);
  const [selectedItem, setSelectedItem] = useState('');

  const { id } = useParams();
  const history = useHistory();

  const nestedPath = [
    'Home',
    `${id === '-1' ? 'Add New Process' : 'Edit Process'}`,
  ];

  const menu = (
    <Menu onClick={(e) => setSelectedItem(Number(e.key))} style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }}>
      {dropDownMenu?.map((data) => (
        // eslint-disable-next-line react/no-array-index-key
        <Menu.Item key={data.id}>
          {data.module}
        </Menu.Item>
      ))}
    </Menu>
  );
  useEffect(() => {
    getModules()
      .then((res) => {
        setDropDownMenu(res?.data?.results?.pageData);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    getProcessById(id)
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
    const moduleSelectError = {};
    let isValid = true;

    if (processName.trim().length === 0) {
      processNameError.err = 'Process name can not be empty';
      isValid = false;
    }
    if (!selectedItem) {
      moduleSelectError.err = 'Please select module';
      isValid = false;
    }
    setProcessError(processNameError);
    setModuleError(moduleSelectError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    const resp = validateFormData();
    if (resp) {
      if (id !== '-1') {
        editProcess(processName, radioValue, selectedItem, Number(id))
          .then((res) => {
            notification.success({
              message: 'Process Edited Successfully',
            });
            setTimeout(() => {
              history.push('/processes/processes');
            }, 1000);
          })
          .catch((err) => {
            notification.error({
              message: 'Something went wrong',
            });
            setTimeout(() => {
              history.push('/processes/processes');
            }, 1000);
          });
      } else {
        addProcess(processName, radioValue, selectedItem)
          .then((res) => {
            notification.success({
              message: 'Process Added Successfully',
            });
            setTimeout(() => {
              history.push('/processes/processes');
            }, 1000);
          })
          .catch((err) => {
            notification.error({
              message: err.response.data.errors[0].msg,
            });
            // setTimeout(() => {
            //   history.push('/processes/processes');
            // }, 1000);
          });
      }
    }
  };

  return (
    <div className="row px-4">
      <div className="space-y-2 basic-1/2">
        <span className="font-quicksand-semi-bold text-4xl mr-3.5">
          {id === '-1' ? 'Add New Process' : 'Edit Process'}
        </span>
        <Breadcrumb nestedPath={nestedPath} />
      </div>
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
                {dropDownMenu.find((x) => x.id === selectedItem)?.module || 'Select Modules(dropdown)'}
              </div>
              <div span={2} className="col-6 text-end">
                <CaretDownOutlined className="text-end" style={{ color: '#74D1D8' }} />
              </div>
            </div>
          </Button>
        </Dropdown>
        {Object.keys(moduleError).map((key) => (
          <div style={{ color: 'red' }}>
            {moduleError[key]}
          </div>
        ))}
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
