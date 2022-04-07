/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import { Input, Radio, Button } from 'antd';
import { useLocation } from 'react-router-dom';
import ListitemModules from 'components/layouts/ListModules';
import { addRole, editRole } from 'services/axios';

const nestedPath = [
  'Home',
  'User Roles',
  'Create New Role',
];

const ModuleDetails = [
  {
    Module_ID: '1',
    Module_Name: 'Module 1',
    Process1: 'Process 1',
    Process2: 'Process 2',
    Process3: 'Process 3',
  },
  {
    Module_ID: '1',
    Module_Name: 'Module 2',
    Process1: 'Process 1',
    Process2: 'Process 2',
    Process3: 'Process 3',
  },
  {
    Module_ID: '1',
    Module_Name: 'Module 3',
    Process1: 'Process 1',
    Process2: 'Process 2',
    Process3: 'Process 3',
  },
  {
    Module_ID: '1',
    Module_Name: 'Module 4',
    Process1: 'Process 1',
    Process2: 'Process 2',
    Process3: 'Process 3',
  },
];

function ModuleList() {
  const modulelist = ModuleDetails.map((item) => (
    <ListitemModules
      Module_Name={item.Module_Name}
    // Process1={item.Process1}
    // Process2={item.Process2}
    // Process3={item.Process3}
    />
  ));
  return <div>{modulelist}</div>;
}

const addrole = () => {
  const location = useLocation();
  const { id } = location.state;
  console.log(id);

  const [radioValue, setRadioValue] = useState(true);
  const [roleTitle, setRoleTitle] = useState('');
  const [roleError, setRoleError] = useState('');

  useEffect(() => {
  }, []);

  const validateFormData = () => {
    const roleNameError = {};
    let isValid = true;

    if (roleTitle.trim().length === 0) {
      roleNameError.err = 'Role name can not be empty';
      isValid = false;
    }

    setRoleError(roleNameError);
    return isValid;
  };

  const onSave = (event) => {
    event.preventDefault();
    console.log('radio', radioValue);
    console.log('roleTitle', roleTitle);
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
        addRole(roleTitle, radioValue)
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
        <ModuleList />
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
