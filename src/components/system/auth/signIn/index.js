import { connect } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import lodash from 'lodash';
import { Button, Space } from 'antd';
import { UserOutlined } from '@ant-design/icons';

// helper components
import Card from 'components/layouts/card';
import ShowError from 'components/layouts/showErrors';
import InputWrapper from 'components/kit/widgets/input';

// helper data
import { onFormValidation } from 'lib/helper';
import { userLogin as userLoginRedux } from 'redux/user/actions';
import { userLoginStructure, userLoginSchema } from './data';

// mutation/query
import USER_LOGIN from './mutation';

const Login = ({
  login,
  isLoading,
}) => {
  const inputRefs = useRef({ userName: null, password: null });
  const [userLogin, setUserLogin] = useState(null);
  const [errors, setErrors] = useState(null);

  const onResetForm = () => {
    inputRefs.current.userName.focus();
    setErrors(null);
    setUserLogin(lodash.cloneDeep(userLoginStructure));
  };

  useEffect(() => {
    onResetForm();
  }, []);

  const onInput = ({ name, value }) => {
    setUserLogin((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = async () => {
    const {
      error,
      value: variables,
      ...keys
    } = await onFormValidation(userLoginSchema, userLogin);
    if (error) {
      const { paths } = keys;
      setErrors(keys);
      inputRefs.current[paths[0]].focus();
      return;
    }
    login({ variables, mutation: USER_LOGIN });
  };

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: 'calc(100vh - 69px)', minHeight: 500 }}
    >
      <Card
        title="Sign in to your account"
        style={{ maxWidth: 450 }}
        icon={UserOutlined}
      >
        <Space
          direction="vertical"
          size="large"
          className="w-full font-mulish-semi-bold"
        >
          {errors && (
            <ShowError
              {...errors}
              refs={inputRefs}
            />
          )}
          <InputWrapper
            label="User Name"
            mandatory
            error={errors?.paths.includes('userName')}
            name="userName"
            ref={(ref) => { inputRefs.current.userName = ref; }}
            value={(userLogin && userLogin?.userName) || null}
            onChange={({ target }) => onInput(target)}
          />
          <InputWrapper
            label="Password"
            mandatory
            error={errors?.paths.includes('password')}
            name="password"
            ref={(ref) => { inputRefs.current.password = ref; }}
            inputType="Password"
            value={(userLogin && userLogin?.password) || null}
            onChange={({ target }) => onInput(target)}
          />
          <Space direction="vertical" className="w-full">
            <Button
              type="primary"
              loading={isLoading}
              onClick={onSubmitForm}
              className="w-full"
              disabled={isLoading}
            >
              Login
            </Button>
            <Button
              onClick={onResetForm}
              className="w-full"
              disabled={isLoading}
            >
              Reset form
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  isLoading: userReducer.loading,
});

const mapDispatchToProps = (dispatch) => ({
  login: (userCred) => dispatch(userLoginRedux(userCred)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
Login.displayName = 'Login User Component';
