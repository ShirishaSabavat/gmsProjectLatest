/* eslint-disable max-len */
/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Radio, Button, Checkbox,
} from 'antd';
import { useLocation } from 'react-router-dom';
import {
  addRole, editRole, getModules, addRoleModule,
} from 'services/axios';

const nestedPath = [
  'Home',
  'User Roles',
  'Create New Role',
];

const addrole = () => {
  const location = useLocation();
  const { id } = location.state;

  const [radioValue, setRadioValue] = useState(true);
  const [roleTitle, setRoleTitle] = useState('');
  const [roleError, setRoleError] = useState('');
  const [checkboxList, setCheckboxList] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState([]);
  const [checkboxError, setCheckboxError] = useState('');

  useEffect(() => {
    getModules()
      .then((res) => {
        console.log('res', res?.data?.results?.pageData);
        const data = res?.data?.results?.pageData.map((item) => ({
          Module_ID: item.id,
          Module_Name: item.module,
        }));
        setCheckboxList(data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  const handleChange = (e) => {
    if (e.target.checked) {
      setCheckboxValue([...checkboxValue, e.target.value]);
    } else {
      setCheckboxValue(checkboxValue.filter((item) => item !== e.target.value));
    }
  };

  const validateFormData = () => {
    const roleNameError = {};
    const checkboxValueError = {};
    let isValid = true;

    if (roleTitle.trim().length === 0) {
      roleNameError.err = 'Role name can not be empty';
      isValid = false;
    }

    if (checkboxValue.length === 0) {
      checkboxValueError.err = 'Please select at least one module';
      isValid = false;
    }

    setRoleError(roleNameError);
    setCheckboxError(checkboxValueError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    console.log('radio', radioValue);
    console.log('roleTitle', roleTitle);
    console.log('chkval', checkboxValue);
    const resp = validateFormData();
    if (resp) {
      if (id !== -1) {
        console.log('in edit');
        editRole(roleTitle, radioValue, id)
          .then((res) => {
            console.log('res', res);
          })
          .catch((err) => {
            console.log('err', err);
          });
      } else {
        console.log('in add');
        addRole(roleTitle)
          .then((res) => {
            console.log('respp', res?.data?.results?.id);
            const data = res?.data?.results?.id;
            checkboxValue.forEach((item) => {
              addRoleModule(data, item)
                .then((response) => {
                  console.log('response', response);
                })
                .catch((err) => {
                  console.log('err', err);
                });
            });
          })
          .catch((err) => {
            console.log('err', err);
          });
      }
    }
  };

  return (
    <>
      <Helmet title="Roles" />
      <div className="flex flex-col space-y-12">
        <div className="space-y-2 basic-1/2">
          <span className="font-quicksand-semi-bold text-4xl mr-3.5">
            Create New Role
          </span>
          <Breadcrumb nestedPath={nestedPath} />
        </div>
        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Role Title</p>
          <div className="flex flex-row flex-nonwrap bg-white">
            <Input
              placeholder="Enter Name Here..."
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              style={{
                padding: '8px', marginBottom: '8px', backgroundColor: '#F5F8FC', borderColor: '#F5F8FC', width: '150%',
              }}
            />
            {Object.keys(roleError).map((key) => (
              <div style={{ color: 'red' }}>
                {roleError[key]}
              </div>
            ))}
          </div>

        </div>

        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Role Status</p>
          <Radio.Group onChange={(e) => setRadioValue(e.target.value)} value={radioValue}>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={true}>Active</Radio>
            <Radio style={{ color: '#9193A2' }} className="font-quicksand-semi-bold" value={false}>Inactive</Radio>
          </Radio.Group>
        </div>
        <div className="bg-white p-5">
          <p className="font-quicksand-semi-bold" style={{ fontSize: '12px' }}>Add Modules</p>
        </div>
        <div className="box-border h-100">
          {checkboxList.map((item) => (
            <div className="flex flex-row flex-nowrap">
              <h1 className="text-base font-quicksand-semi-bold basis-1/7 bg-white p-4 mr-0.5">
                <Checkbox value={item.Module_ID} onChange={handleChange}>{item.Module_Name}</Checkbox>
              </h1>
            </div>
          ))}
          {Object.keys(checkboxError).map((key) => (
            <div style={{ color: 'red' }}>
              {checkboxError[key]}
            </div>
          ))}
        </div>
        <div className="col-12 flex flex-row justify-end">
          <Button
            onClick={onSave}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '140px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            Add Role
          </Button>
        </div>
      </div>
    </>
  );
};

export default addrole;
