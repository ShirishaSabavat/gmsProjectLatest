import React, { useState, useEffect } from 'react';
import WithPageHandler from 'components/layouts/pageHandler';
import { Input } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import Table from './table2';

// eslint-disable-next-line no-unused-vars
const promise = new Promise((resolve) => {
  setTimeout(() => resolve(), 1000);
});

const Modules = ({
  pageState,
  setPageState,
}) => {
  const onFetchData = async () => {
    try {
      await promise;
      setPageState('loaded');
    } catch (error) {
      setPageState('error');
    }
  };

  useEffect(() => {
    onFetchData();
  }, []);
  const [searchLoading, setSearchLoading] = useState(false);

  // global search input on enter
  const globalSearch = () => {
    setSearchLoading(true);
    setTimeout(() => setSearchLoading(false), 1500);
  };

  // return null during page loading or data fetching error
  if (pageState === 'loading' || pageState === 'error') return null;
  return (
    <div className="row mx-2">
      <div className="col-12 flex flex-row justify-end">
        <Input
          size="medium"
          placeholder="Search for anything..."
          prefix={(
            <img
              className="mr-3"
              src="/assets/images/general/loupe.svg"
              alt="search"
              width="10"
            />
          )}
          style={{
            marginLeft: '-11px', marginBottom: '8px', marginTop: '8px', padding: '10px', backgroundColor: '#FFFFFF', width: '42%',
          }}
          suffix={searchLoading && <LoadingOutlined />}
          bordered={false}
          onPressEnter={({ target: { value } }) => globalSearch(value)}
        />
      </div>
      <div className="col-12 mt-3">
        <Table />
      </div>
    </div>
  );
};

export default WithPageHandler(Modules);
