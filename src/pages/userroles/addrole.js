/* eslint-disable max-len */
/* eslint-disable react/jsx-boolean-value */
import { React, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Breadcrumb from 'components/layouts/breadcrumb';
import {
  Input, Radio, Button, Checkbox, notification,
} from 'antd';
import { useParams, useHistory } from 'react-router-dom';
import {
  addRole, editRole, getRolesUI, addRoleModule, getRole,
} from 'services/axios';

const addrole = () => {
  const { id } = useParams();
  const history = useHistory();

  const nestedPath = [
    'Home',
    'User Roles',
    `${id === '-1' ? 'Create New Role' : 'Edit Role'}`,
  ];

  const [radioValue, setRadioValue] = useState(true);
  const [roleTitle, setRoleTitle] = useState('');
  const [roleError, setRoleError] = useState('');
  const [checkboxList, setCheckboxList] = useState([]);
  const [checkboxValue, setCheckboxValue] = useState([]);
  const [checkboxError, setCheckboxError] = useState('');

  useEffect(() => {
    getRolesUI(Number(id))
      .then((res) => {
        console.log('resp', res?.data?.results?.modules?.pageData);
        const data = res?.data?.results?.modules?.pageData.map((item) => ({
          Module_ID: item.id,
          Module_Name: item.module,
          processes: item?.processes,
        }));
        setCheckboxList(data);
      })
      .catch((err) => {
        console.log('err', err);
      });
  }, []);

  useEffect(() => {
    getRole(Number(id))
      .then((res) => {
        console.log('mod', res?.data?.results);
        setRoleTitle(res?.data?.results?.role);
        setRadioValue(res?.data?.results?.isActive);
        let data = res?.data?.results?.modules.map((item) => ({
          moduleId: item.id,
        }));
        data = data.map((obj) => obj.moduleId);
        setCheckboxValue(data);
      })
      .catch((err) => {
        console.log('err1', err);
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
      if (id !== '-1') {
        console.log('in edit');
        editRole(roleTitle, Number(id), radioValue)
          .then((res) => {
            console.log('res', res);
            addRoleModule(Number(id), checkboxValue)
              .then((response) => {
                console.log('edit', response);
                notification.success({
                  message: 'Role Updated Successfully',
                });
                setTimeout(() => {
                  history.push('/userroles/userroleslist');
                }, 1000);
              })
              .catch((err) => {
                console.log('err', err);
                notification.error({
                  message: 'Something went wrong, Please Try again later',
                });
                setTimeout(() => {
                  history.push('/userroles/userroleslist');
                }, 1000);
              });
          })
          .catch((err) => {
            console.log('err', err);
            notification.error({
              message: 'Something went wrong, Please Try again later',
            });
            setTimeout(() => {
              history.push('/userroles/userroleslist');
            }, 1000);
          });
      } else {
        console.log('in add');
        addRole(roleTitle, radioValue)
          .then((res) => {
            console.log('respp', res?.data?.results?.id);
            const data = res?.data?.results?.id;
            addRoleModule(data, checkboxValue)
              .then((response) => {
                console.log('response', response);
                notification.success({
                  message: 'Role Added Successfully',
                });
                setTimeout(() => {
                  history.push('/userroles/userroleslist');
                }, 1000);
              })
              .catch((err) => {
                console.log('err', err);
                notification.error({
                  message: 'Something went wrong, Please Try again later',
                });
                setTimeout(() => {
                  history.push('/userroles/userroleslist');
                }, 1000);
              });
          })
          .catch((err) => {
            console.log('err', err);
            notification.error({
              message: 'Something went wrong, Please Try again later',
            });
            setTimeout(() => {
              history.push('/userroles/userroleslist');
            }, 1000);
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
            {id === '-1' ? 'Create New Role' : 'Edit Role'}
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
          </div>
          {Object.keys(roleError).map((key) => (
            <div style={{ color: 'red' }}>
              {roleError[key]}
            </div>
          ))}

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
          <div className="box-border h-100">
            {checkboxList.map((item) => (
              <div className="flex flex-col flex-nowrap flex-auto">
                {item?.processes.length > 0 && (
                  <>
                    <div>
                      <h1 className="text-base font-quicksand-semi-bold basis-1/7 bg-white p-4 mr-0.5">
                        <Checkbox value={item.Module_ID} onChange={handleChange} checked={checkboxValue.includes(item.Module_ID)} style={{ fontSize: '16px' }}>{item.Module_Name}</Checkbox>
                      </h1>
                    </div>
                    <div className="flex flex-nowrap bg-slate-200 p-4 mr-0.5">
                      {item?.processes.map((data) => (
                        <div className="flex flex-row font-quicksand-medium" style={{ marginRight: '150px', fontSize: '14px' }}>
                          {data.process}
                        </div>
                      ))}
                    </div>
                  </>
                )}

              </div>
            ))}
            {Object.keys(checkboxError).map((key) => (
              <div style={{ color: 'red' }}>
                {checkboxError[key]}
              </div>
            ))}
          </div>
        </div>
        <div className="col-12 flex flex-row justify-end">
          <Button
            onClick={onSave}
            className="font-quicksand-medium"
            style={{
              marginRight: '20px', borderRadius: '4px', fontWeight: '500', backgroundColor: '#013453', color: '#FFFFFF', fontSize: '16px', width: '140px', height: '52px', boxShadow: '0px 8px 16px #005B923D', textDecoration: 'none', padding: '13px 30px',
            }}
          >
            {id === '-1' ? 'Add Role' : 'Edit Role'}
          </Button>
        </div>
      </div>
    </>
  );
};

export default addrole;
