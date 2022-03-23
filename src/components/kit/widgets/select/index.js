import { Select } from 'antd';
import { forwardRef } from 'react';

const { OptGroup, Option } = Select;
const SelectWrapper = forwardRef(({
  label,
  mandatory,
  error,
  placeholder,
  name,
  onChange,
  children,
  className,
  style,
  ...keys
}, ref) => (
  <div
    className={`space-y-2 ${className || ''}`}
    style={style}
  >
    {label && (
      <div className="space-x-2 text-xs text-eep-gray font-mulish-semi-bold">
        <span>{label}</span>
        <span className="text-red-500">*</span>
        <span>:</span>
      </div>
    )}
    <Select
      className={`custom-select w-full ${(error && mandatory) ? 'select-error' : ''}`}
      {...keys}
      ref={ref}
      style={{ borderRadius: 2, ...style }}
      onChange={(value, option) => onChange?.({ target: { name, value } }, option)}
      placeholder={placeholder || label || ''}
    >
      {children}
    </Select>
  </div>
));

export default SelectWrapper;
export { OptGroup, Option };
