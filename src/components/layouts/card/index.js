import { Space } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";

const Card = ({
  style,
  className,
  icon: Icon,
  title,
  onCancel,
  customToolbar,
  description,
  children,
}) => (
  <div
    className={`bg-gray-50 font-mulish-semi-bold w-full space-y-1 shadow-1 ${className || ""}`}
    style={style}
  >
    {/* HEADER */}
    <div className={`bg-white p-6 rounded-t-lg ${Icon ? "flex space-x-3 items-center" : ""}`}>

      {/* ICON */}
      {Icon && (
        <div
          className="rounded-full bg-primary flex justify-center items-center"
          style={{ minWidth: 32, minHeight: 32 }}
        >
          <Icon className="text-lg text-white flex" />
        </div>
      )}
      <div className={`flex flex-col w-full ${description ? "" : "justify-center"}`}>
        <div className="flex justify-between items-center">

          {/* TITLE */}
          {title && (
            <span className="font-mulish-bold text-sm">
              {title}
            </span>
          )}

          {/* CANCEL ICON || CUSTOM ICON(S) */}
          {(onCancel || customToolbar) && (
            <div className="q-d-flex q-items-center">
              {(onCancel && !customToolbar) && (
                <CloseCircleOutlined
                  className="text-red-400 hover:cursor-pointer flex text-base"
                  onClick={() => onCancel?.(true)}
                />
              )}
              {(Array.isArray(customToolbar) && customToolbar.length > 0) && (
                <Space>
                  {customToolbar.map((items) => items)}
                </Space>
              )}
            </div>
          )}
        </div>

        {/* DESCRIPTION */}
        {description && (
          <span className="text-xs">
            {description}
          </span>
        )}
      </div>
    </div>

    {/* SECTION */}
    <div className="bg-white p-6 rounded-b-lg">
      {children}
    </div>
  </div>
);

export default Card;
