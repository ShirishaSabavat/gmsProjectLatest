import { LoadingOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { Button } from 'antd';
import { history } from 'redux/store';

const WithPageHandler = (WrappedComponent, option = {}) => {
  const {
    loadingImgPath = 'assets/images/page/loading-page-1.svg',
    errorImgPath = 'assets/images/page/error-page-1.svg',
    loadingMessage = 'Loading page...please standby.',
    errorMessage = 'Error Loading...rest assured we are working on it.',
  } = option;
  const HOC = (props) => {
    const [pageState, setPageState] = useState('loading');
    return (
      <>
        {pageState === 'loading' && (
          <div
            className="w-full flex flex-col justify-center items-center space-y-4"
            style={{ height: 'calc(100vh - 228px)', minHeight: 450 }}
          >
            <img
              src={loadingImgPath}
              alt="loading!"
              width="300"
            />
            <div className="text-eep-gray flex items-center space-x-3">
              <LoadingOutlined className="text-purple-dark" />
              <span className="font-mulish-semi-bold">
                {loadingMessage}
              </span>
            </div>
          </div>
        )}
        {pageState === 'error' && (
          <div
            className="w-full flex flex-col justify-center items-center space-y-4"
            style={{ height: 'calc(100vh - 228px)', minHeight: 450 }}
          >
            <img
              src={errorImgPath}
              alt="loading!"
              width="300"
            />
            <span className="text-red-500 font-mulish-semi-bold">
              {errorMessage}
            </span>
            <Button
              type="primary"
              onClick={() => history.push('/home/dashboard')}
            >
              Take me to Dashboard
            </Button>
          </div>
        )}
        <WrappedComponent
          {...props}
          setPageState={setPageState}
          pageState={pageState}
        />
      </>
    );
  };
  return HOC;
};

export default WithPageHandler;
