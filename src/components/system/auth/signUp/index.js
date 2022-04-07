import { useEffect, useState, useRef } from "react";
import lodash from "lodash";
import { Button, Space } from "antd";
import { UserOutlined } from "@ant-design/icons";

// helper components
import Card from "components/layouts/card";
import ShowError from "components/layouts/showErrors";
import InputWrapper from "components/kit/widgets/input";

// helper data
import { onFormValidation } from "lib/helper";
import { userRegisterStructure, userRegisterSchema } from "./data";

const Register = () => {
  const inputRefs = useRef(lodash.cloneDeep(userRegisterStructure));
  const [userRegister, setUserRegister] = useState(null);
  const [errors, setErrors] = useState(null);

  const onResetForm = () => {
    inputRefs.current.username.focus();
    setErrors(null);
    setUserRegister(lodash.cloneDeep(userRegisterStructure));
  };

  useEffect(() => {
    onResetForm();
  }, []);

  const onInput = ({ name, value }) => {
    setUserRegister((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const onSubmitForm = async () => {
    const {
      error,
      value: variables,
      ...keys
    } = await onFormValidation(userRegisterSchema, userRegister);
    if (error) {
      const { paths } = keys;
      setErrors(keys);
      inputRefs.current[paths[0]].focus();
      return;
    }
    console.log(userRegister);
  };

  return (
    <div
      className="w-full flex items-center justify-center"
      style={{ height: "calc(100vh - 69px)", minHeight: 500 }}
    >
      <Card
        title="Sign up for account"
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
            label="Name"
            mandatory
            error={errors?.paths.includes("username")}
            name="username"
            ref={(ref) => { inputRefs.current.username = ref; }}
            value={(userRegister && userRegister?.username) || null}
            onChange={({ target }) => onInput(target)}
          />
          <InputWrapper
            label="Email"
            mandatory
            error={errors?.paths.includes("email")}
            name="email"
            ref={(ref) => { inputRefs.current.email = ref; }}
            value={(userRegister && userRegister?.email) || null}
            onChange={({ target }) => onInput(target)}
          />
          <InputWrapper
            label="Password"
            mandatory
            error={errors?.paths.includes("password")}
            name="password"
            ref={(ref) => { inputRefs.current.password = ref; }}
            inputType="Password"
            value={(userRegister && userRegister?.password) || null}
            onChange={({ target }) => onInput(target)}
          />
          <InputWrapper
            label="Confirm Password"
            mandatory
            error={errors?.paths.includes("confirmPassword")}
            name="confirmPassword"
            ref={(ref) => { inputRefs.current.confirmPassword = ref; }}
            inputType="Password"
            value={(userRegister && userRegister?.confirmPassword) || null}
            onChange={({ target }) => onInput(target)}
          />
          <Space direction="vertical" className="w-full">
            <Button
              type="primary"
              onClick={onSubmitForm}
              className="w-full"
            >
              Register
            </Button>
            <Button
              onClick={onResetForm}
              className="w-full"
            >
              Reset form
            </Button>
          </Space>
        </Space>
      </Card>
    </div>
  );
};

export default Register;
Register.displayName = "Register User Component";
