/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import WithPageHandler from 'components/layouts/pageHandler';
import {
  Table,
  Input,
} from 'antd';
import {
  SearchOutlined,
} from '@ant-design/icons';
import '../../kit/table.scss';
import lodash from 'lodash';
import { useLocation } from 'react-router-dom';
import {
  onDecodeQueryParams,
  onEncodeQueryParams,
} from 'lib/helper';
import { getUsers } from '../../../services/fetch';

// eslint-disable-next-line no-unused-vars
const promise = new Promise((resolve) => {
  setTimeout(() => resolve(), 1000);
});

// default filter structure
const filterStructure = {
  page: 1,
  limit: 5,
};

const UserProfile = ({
  pageState,
  setPageState,
}) => {
  const { search } = useLocation();
  const [list, setList] = useState();
  const [filter, setFilter] = useState(lodash.cloneDeep(filterStructure));

  // set filter state from query params
  useEffect(() => {
    let queryParams = onDecodeQueryParams(search);
    if (!lodash.size(queryParams)) queryParams = filterStructure;
    setFilter(queryParams);
  }, [search]);

  const onFetchList = async () => {
    try {
      const res = await getUsers(filter);
      setList(res);
    } catch (error) {
      console.log(error);
    } finally {
      setPageState('loaded');
    }
  };

  // fire fetch table data function when filter data is available
  useEffect(() => {
    if (filter) onFetchList();
  }, [filter]);

  const onChangeTable = (_, { current: page, pageSize: size }) => {
    onEncodeQueryParams({ page, size }, '/userProfiles/userProfiles');
  };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'first_name',
      key: 'name',
      render: (value, record) => (
        <span className="font-quicksand-medium">{`${record.first_name} ${record.last_name}`}</span>
      ),
    },
    {
      title: 'Employee Id',
      dataIndex: 'user_profile.emp_id',
      key: 'emp_id',
      render: (value, record) => (
        <span className="font-quicksand-medium">{`${record.user_profile?.emp_id}`}</span>
      ),
    },
    {
      title: 'Username',
      dataIndex: 'user_name',
      key: 'user_name',
    },
    {
      title: 'Mobile No.',
      dataIndex: 'mobile_no',
      key: 'mobile_no',
      render: (value, record) => (
        <span className="font-quicksand-medium">{`${record.user_profile?.mobile_no}`}</span>
      ),
    },
    {
      title: 'Driving License No',
      dataIndex: 'driving_license_no',
      key: 'driving_license_no',
      render: (value, record) => (
        <span className="font-quicksand-medium">{`${record.user_profile?.driving_license_no}`}</span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (value, record) => (
        <span className="font-quicksand-medium">{`${record.isActive}`}</span>
      ),
    },
  ];

  // return null during page loading or data fetching error
  if (pageState === 'loading' || pageState === 'error') return null;
  const { totalPages = 1, pageData = [], currentPage } = list;
  const { size = 5 } = filter;
  return (
    <div>
      <div className="col-lg-2">
        <Input
          prefix={<SearchOutlined />}
          placeholder="Name"
          allowClear
        />
      </div>
      <Table
        columns={columns}
        dataSource={pageData}
        rowKey={(record) => record.id}
        className="font-quickand-semi-bold"
        pagination={{
          current: currentPage + 1,
          pageSize: size,
          total: size * totalPages,
          position: ['none', 'bottomCenter'],
        }}
        onChange={(pagination, filters, sorter) => (
          onChangeTable('order-pagination', pagination, sorter, null)
        )}
      />
    </div>
  );
};

export default WithPageHandler(UserProfile);
