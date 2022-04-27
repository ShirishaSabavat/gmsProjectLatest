/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable no-underscore-dangle */
import { useEffect, useState } from 'react';
// import AWS from 'aws-sdk';
import {
  message,
  Modal,
  Space,
  Button,
  Input,
  Table,
} from 'antd';
import { connect } from 'react-redux';
import {
  ExclamationCircleOutlined,
  FileSearchOutlined,
  UserAddOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import Card from 'components/layouts/card';
import moment from 'moment';
import { useLocation } from 'react-router-dom';
import lodash, { debounce } from 'lodash';
import { useLazyQuery, useMutation } from '@apollo/client';

// import OptionFilter from 'components/kit/widgets/customFilters/optionFilter';
import WithPageHandler from 'components/layouts/pageHandler';
import { history } from 'redux/store';
import {
  onDecodeQueryParams,
  // onEncodeQueryParams,
} from 'lib/helper';
import {
  GET_PARTNER_LIST,
  DELETE_PARTNER,
} from '../mutation';
import { filterStructure } from '../data/index';
import '../../../../kit/table.scss';

const { confirm } = Modal;
const key = 'updatable';

const PartnerPage = ({
  permission,
  // pageState,
  setPageState,
}) => {
  const { search } = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [searchString, setSearchString] = useState('');
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState({});
  const [partners, setPartners] = useState([]);
  const [pages, setPages] = useState(1);
  const [pageSize1, setPageSize] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);

  // delete user mutation
  const [deletePartnerMutation] = useMutation(DELETE_PARTNER);

  // update filter state on change search
  useEffect(() => {
    let queryParams = onDecodeQueryParams(search);
    if (!lodash.size(queryParams)) queryParams = filterStructure;
    setFilter((prevState) => ({ ...prevState, queryParams }));
  }, [search]);

  const [
    getUserListQuery,
    { data: getPartnerListData },
  ] = useLazyQuery(GET_PARTNER_LIST);

  const onFetchList = ({
    page = currentPage,
    limit = pageSize1,
    searchValue = {},
  } = filter) => {
    setLoading(false);
    const { keywords = [] } = searchValue;
    const variables = {
      filter: {
        page: Number(page),
        limit: Number(limit),
      },
      searchValue: [
        keywords.join(' '),
      ].join(' ').trim(),
    };
    getUserListQuery({ variables });
  };

  useEffect(() => {
    const variables = { filter: { limit: 10, page: 1, searchValue: '' } };
    getUserListQuery({ variables });
  }, []);

  useEffect(() => {
    if (
      getPartnerListData
      && getPartnerListData.partnerList
      && getPartnerListData.partnerList.partner
      && getPartnerListData.partnerList.partner.length
    ) {
      setPageState('loaded');
      setLoading(false);
      setPartners(getPartnerListData.partnerList.partner);
      setPages(getPartnerListData.partnerList.pages);
    } else {
      setPartners([]);
    }
  }, [getPartnerListData]);

  // fire fetch list function on change filter
  useEffect(() => {
    if (filter) onFetchList(filter);
  }, [filter]);

  // eslint-disable-next-line no-unused-vars
  const onChangeTableFilters = (
    type,
    pagination,
    sorter,
  ) => {
    if (type === 'order-pagination') {
      const {
        current,
        pageSize,
      } = pagination;
      const {
        field,
        order,
      } = sorter;
      // eslint-disable-next-line no-nested-ternary
      const sortType = order ? order === 'ascend' ? 1 : -1 : 0;
      const variables = {
        filter: {
          limit: pageSize1, page: current, sortName: field, sortType,
        },
      };
      setCurrentPage(current);
      setPageSize(pageSize);
      getUserListQuery({ variables });
    }
  };

  // DELETE USER FROM DATABASE REQUEST
  const onDeletePartner = async (id) => {
    const status = false;
    message.loading({ content: 'Deactivating Partner!', key });
    try {
      await deletePartnerMutation({ variables: { id, status } });
      onFetchList(filter);
      message.success({ content: 'Partner Deactivated.', key });
    } catch (error) {
      message.success({ content: 'Partner couldn\'t be Deactivate.', key });
    }
  };

  // SHOW DELETE MODAL BEFORE DELETING ASSESSMENT
  const onDeleteModal = (record) => {
    const title = (
      <span className="font-mulish-bold">
        Deactivate Partner?
      </span>
    );
    const content = (
      <span className="font-mulish-semi-bold text-xs text-eep-gray">
        <span>Are you sue you want to Deactivate </span>
        <span className="text-black">{record?.name}</span>
        <span> Partner?</span>
      </span>
    );
    confirm({
      title,
      icon: <ExclamationCircleOutlined />,
      content,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        onDeletePartner(record?._id);
      },
    });
  };
  // Search By Name
  const debouncedInputSearch = debounce((value) => {
    setSearchString(`${value}`);
    setCurrentPage(1);
    setPageSize(10);
    const variables = {
      filter: {
        limit: pageSize1,
        page: currentPage,
      },
    };

    variables.searchValue = `${value.trim()}`;
    getUserListQuery({ variables });
  }, 500);

  // if (!permission.includes('partnerList')) history.push('/auth/401');

  const {
    sortType = 1,
    sortName = 'name',
  } = filter;

  // eslint-disable-next-line no-nested-ternary
  const sortOrder = Number(sortType) === 1
    ? 'ascend' : Number(sortType) === -1 ? 'descend' : false;
  const columns = [
    // title
    {
      title: <span className="font-mulish-bold text-xs">Name</span>,
      dataIndex: 'name',
      key: 'name',
      width: 100,
      align: 'center',
      sorter: true,
      fixed: 'left',
      sortDirections: ['descend', 'ascend'],
      render: (value, record) => (
        // eslint-disable-next-line jsx-a11y/anchor-is-valid
        <a onClick={() => history.push(`/admin/addPartner/${record?._id}`)}>
          <span className="font-mulish-semi-bold text-xs">{`${record.name}`}</span>
        </a>
      ),
      sortOrder: sortName === 'name' ? sortOrder : false,
    },
    {
      title: <span className="font-mulish-bold text-xs">Email</span>,
      dataIndex: 'email',
      key: 'Email',
      width: 150,
      align: 'center',
      // sorter: true,
      render: (value) => (
        <span className="font-mulish-semi-bold text-xs">
          {value}
        </span>
      ),
      sortOrder: sortName === 'email' ? sortOrder : false,
    },
    {
      title: <span className="font-mulish-bold text-xs">Contact No.</span>,
      dataIndex: 'contactNumber',
      key: 'ContactNumber',
      width: 100,
      align: 'center',
      // sorter: true,
      render: (value) => (
        <span className="font-mulish-semi-bold text-xs">
          {value}
        </span>
      ),
      sortOrder: sortName === 'contactNumber' ? sortOrder : false,
    },
    {
      title: <span className="font-mulish-bold text-xs">Area</span>,
      dataIndex: 'address',
      key: 'address',
      align: 'center',
      width: 100,
      // sorter: true,
      render: (value) => (
        <span className="font-mulish-semi-bold text-xs">
          {`${value.area}, ${value.city}`}
        </span>
      ),
      sortOrder: sortName === 'role' ? sortOrder : false,
    },
    // date created
    {
      title: <span className="font-mulish-bold text-xs">Date created</span>,
      dataIndex: 'createdAt',
      key: 'CREATEDAT',
      align: 'center',
      sorter: true,
      sortDirections: ['descend', 'ascend'],
      width: 100,
      sortOrder: sortName === 'createdAt' ? sortOrder : false,
      render: (value) => (
        <span className="font-mulish-semi-bold text-xs">
          {moment(value).format('MM/DD/YYYY')}
        </span>
      ),
    },
  ];

  // actions
  // if (permission.includes('deleteAssessmentTemplates')
  //  || permission.includes('updateAssessmentTemplates')) {
  columns.push({
    title: <span className="font-mulish-bold text-xs">Actions</span>,
    key: 'ACTIONS',
    width: 100,
    align: 'center',
    fixed: 'right',
    render: (text, record) => {
      if (!record.active) {
        return 'Deactivated';
      }
      if (permission.includes('deletePartners')) {
        return (
          <div className="flex justify-center space-x-3">
            <Button
              onClick={() => onDeleteModal(record)}
              size="small"
              type="primary"
              className="cursor-pointer"
              danger
              ghost
            >
              Deactivate
            </Button>
          </div>
        );
      }
      return 'Active';
    },
  });
  // }

  return (
    <Space
      direction="vertical"
      className="w-100"
      size="middle"
    >
      <Card
        icon={FileSearchOutlined}
        title="Beyond Partners"
        customToolbar={(
          <>
            <div className="col-lg-2">
              <Input
                prefix={<SearchOutlined />}
                placeholder="Partner Name"
                onChange={({ target: { value } }) => debouncedInputSearch(value)}
                allowClear
              />
            </div>
            <Button
              className="button"
              size="large"
              style={{
                color: 'white', backgroundColor: '#71bf44', borderRadius: 5, fontWeight: 'bold',
              }}
              onClick={() => history.push('/admin/addPartner')}
            >
              <UserAddOutlined />
              <span>
                Add Partner
              </span>
            </Button>
          </>
        )}
      >
        <Table
          columns={columns}
          dataSource={partners}
          scroll={{ x: 1 }}
          pagination={{
            current: Number(currentPage),
            pageSize: Number(pageSize1),
            total: pages * pageSize1,
            showSizeChanger: pages > 20,
            pageSizeOptions: [10, 20, 50, 100],
            position: ['none', 'bottomCenter'],
          }}
          onChange={(pagination, filters, sorter) => (
            onChangeTableFilters('order-pagination', pagination, sorter, null)
          )}
          // title={renderTableSection}
          loading={loading}
          rowKey={(record) => String(record._id)}
          locale={{
            emptyText: (
              <div className="custom-empty-text-parent">
                <div className="custom-empty-text-child">
                  <i className="fe fe-search" />
                  <h5>No Partners Found</h5>
                </div>
              </div>
            ),
          }}
        />
      </Card>
    </Space>
  );
};

const mapStateToProps = ({ userReducer }) => ({
  permission: userReducer.permission,
});

export default connect(mapStateToProps, null)(WithPageHandler(PartnerPage));
