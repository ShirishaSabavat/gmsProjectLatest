import { Button } from "antd";
import { history } from "redux/store";

const Error401 = () => (
  <div
    className="flex flex-col items-center justify-center space-y-4"
    style={{ height: "calc(100vh - 70px)", minHeight: 450 }}
  >
    <img
      src="assets/images/page/access-denied-page-1.svg"
      alt="access denied"
      width={300}
    />
    <span className="font-mulish-semi-bold text-xs text-eep-gray">
      Unauthorized
    </span>
    <Button
      type="primary"
      onClick={() => history.push("/home/dashboard")}
    >
      Dashboard
    </Button>
  </div>
);

export default Error401;
