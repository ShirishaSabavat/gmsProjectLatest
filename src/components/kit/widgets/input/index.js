import { Input, Space } from "antd";
import lodash from "lodash";
import { forwardRef } from "react";

const InputTypes = {
  Input,
  ...Input,
};

const reg = /^-?\d*(\.\d*)?$/;

const InputWrapper = forwardRef(({
  label,
  limit,
  mandatory,
  error,
  inputType = "Input",
  number,
  placeholder,
  value,
  className,
  style,
  onChange,
  ...keys
}, ref) => {
  const InputType = InputTypes[lodash.has(InputTypes, [inputType]) ? inputType : "Input"];

  // function supporting input type --> string/number
  const onInputType = (event) => {
    // string input
    if (!number) {
      onChange(event);
      return;
    }
    // number input
    const { target: { value: input } } = event;
    if ((!Number.isNaN(input) && reg.test(input)) || input === "" || input === "-") {
      onChange(event);
    }
  };

  // highlight limit exceeded error while typing
  let limitError = false;
  if (limit && value?.length > limit) limitError = true;
  else limitError = false;
  return (
    <div
      className={`space-y-2 ${className || ""}`}
      style={style}
    >

      {/* LABEL */}
      {label && (
        <div className="space-x-2 text-xs text-eep-gray font-mulish-semi-bold">
          <span>{label}</span>
          <span className="text-red-500">*</span>
          <span>:</span>
        </div>
      )}

      {/* INPUT */}
      <InputType
        className={`custom-input ${((error && mandatory) || limitError) ? "input-error" : ""}`}
        {...keys}
        value={value}
        onChange={(event) => onInputType?.(event)}
        ref={ref}
        placeholder={placeholder || label || ""}
      />

      {/* LIMIT */}
      {limit && (
        <Space className="font-mulish-semi-bold flex justify-end text-xs text-eep-gray">
          <span>{`Maximum ${limit} characters`}</span>
          {value && (
            <Space>
              (
              <span>{limit >= value.length ? "Remaining:" : "Exceeded By:"}</span>
              <span className={value.length > limit ? "text-red-500" : ""}>
                {limit >= value.length ? limit - value.length : value.length - limit}
              </span>
              )
            </Space>
          )}
        </Space>
      )}
    </div>
  );
});

export default InputWrapper;
