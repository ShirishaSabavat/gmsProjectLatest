/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import {
  Input, Radio, Button, notification,
} from 'antd';
import Breadcrumb from 'components/layouts/breadcrumb';
import { addModule, getModuleById, editModule } from 'services/axios';
import { useHistory, useParams } from 'react-router-dom';

const addModules = () => {
  const { id } = useParams();
  const history = useHistory();

  const nestedPath = [
    'Home',
    `${id === '-1' ? 'Add New Module' : 'Edit Module'}`,
  ];

  const [radioValue, setRadioValue] = useState(true);
  const [moduleName, setModuleName] = useState('');
  const [moduleError, setModuleError] = useState({});

  useEffect(() => {
    getModuleById(Number(id))
      .then((res) => {
        console.log(res);
        setModuleName(res.data?.results?.module);
        setRadioValue(res.data?.results?.isActive);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const validateFormData = () => {
    const moduleNameError = {};
    let isValid = true;

    if (moduleName.trim().length === 0) {
      moduleNameError.err = 'Module name can not be empty';
      isValid = false;
    }
    setModuleError(moduleNameError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    console.log('radio', radioValue);
    console.log('error', moduleName);
    const resp = validateFormData();
    if (resp) {
      if (id !== '-1') {
        editModule(moduleName, radioValue, Number(id))
          .then((res) => {
            console.log('res', res);
            notification.success({
              message: 'Module Edited Successfully',
            });
            setTimeout(() => {
              history.push('/modules/modules');
            }, 1000);
          })
          .catch((err) => {
            console.log('err', err);
            notification.error({
              message: 'Something went wrong',
            });
            setTimeout(() => {
              history.push('/modules/modules');
            }, 1000);
          });
      } else {
        addModule(moduleName, radioValue)
          .then((res) => {
            console.log('res', res);
            notification.success({
              message: 'Module Added Successfully',
            });
            setTimeout(() => {
              history.push('/modules/modules');
            }, 1000);
          })
          .catch((err) => {
            console.log('err', err);
            notification.error({
              message: err.response.data.errors[0].msg,
            });
            // setTimeout(() => {
            //   history.push('/modules/modules');
            // }, 1000);
          });
      }
    }
  };

  return (
    <div className="row px-4">
      <div className="space-y-2 basic-1/2">
        <span className="font-quicksand-semi-bold text-4xl mr-3.5">
          {id === '-1' ? 'Add New Module' : 'Edit Module'}
        </span>
        <Breadcrumb nestedPath={nestedPath} />
      </div>
      <div className="col-12 py-3 px-4 mt-5 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A] font-quicksand-semi-bold">Module Title</h6>
        <Input placeholder="MODULE NAME" value={moduleName} onChange={(e) => setModuleName(e.target.value)} className="font-quicksand-medium" style={{ backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', padding: '8px' }} />
        {Object.keys(moduleError).map((key) => (
          <div style={{ color: 'red' }}>
            {moduleError[key]}
          </div>
        ))}
      </div>
      <div className="col-12 py-3 px-4 bg-[#FFFFFF] mb-4">
        <h6 className="text-sm text-[#53565A] font-quicksand-semi-bold">Status</h6>
        <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
          <Radio style={{ color: '#9193A2' }} value={true} className="font-quicksand-semi-bold">Active</Radio>
          <Radio style={{ color: '#9193A2' }} value={false} className="font-quicksand-semi-bold">Inactive</Radio>
        </Radio.Group>
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

export default addModules;
