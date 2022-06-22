import { useEffect, useState } from 'react';
import WithPageHandler from 'components/layouts/pageHandler';
import { Tabs } from 'antd';
import { getVisitCarNumber, getBreakdownCarNumber } from 'services/axios';
import SideBar from './sideBar';

const { TabPane } = Tabs;
// eslint-disable-next-line no-unused-vars
const promise = new Promise((resolve) => {
  setTimeout(() => resolve(), 1000);
});

const Dashboard = (props) => {
  const {
    pageState,
    setPageState,
    auditCount = {},
  } = props;

  const [tabKey, setTabKey] = useState('0');
  const [category, setCategory] = useState(1);
  const [carList, setCarList] = useState([]);

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

  useEffect(() => {
    if (tabKey === '0') {
      setCategory(1);
    } else if (tabKey === '1') {
      setCategory(2);
    } else if (tabKey === '2') {
      setCategory(3);
    } else if (tabKey === '3') {
      setCategory(4);
    } else if (tabKey === '4') {
      setCategory(5);
    } else if (tabKey === '5') {
      setCategory(6);
    } else if (tabKey === '6') {
      setCategory(7);
    } else if (tabKey === '7') {
      setCategory(8);
    }
  }, [tabKey]);

  useEffect(() => {
    if (category === 6 || category === 7 || category === 8) {
      getBreakdownCarNumber(category)
        .then((res) => {
          const response = res?.data?.results;
          setCarList(response);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      getVisitCarNumber(category)
        .then((res) => {
          const response = res?.data?.results;
          setCarList(response);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [category]);

  const handleChange = (activeKey) => {
    setTabKey(activeKey);
  };

  // return null during page loading or data fetching error
  if (pageState === 'loading' || pageState === 'error') return null;
  return (
    <div className="font-quicksand-bold text-lg">
      <Tabs
        activeKey={tabKey}
        onChange={handleChange}
      >
        <TabPane tab={`60:40 Jama (${auditCount?.Jama})`} key="0">
          <SideBar
            carList={carList}
            category={1}
            carCount={auditCount?.Jama}
            headers="60:40 Jama"
          />
        </TabPane>
        <TabPane tab={`Leasing (${auditCount?.Leasing_Jama})`} key="1">
          <SideBar
            carList={carList}
            category={2}
            carCount={auditCount?.Leasing_Jama}
            headers="Leasing"
          />
        </TabPane>
        <TabPane tab={`Regular Audit (${auditCount?.Regular_Audit})`} key="2">
          <SideBar
            carList={carList}
            category={3}
            carCount={auditCount?.Regular_Audit}
            headers="Regular Audit"
          />
        </TabPane>
        <TabPane tab={`Servicing (${auditCount?.Servicing})`} key="3">
          <SideBar
            carList={carList}
            category={4}
            carCount={auditCount?.Servicing}
            headers="Servicing"
          />
        </TabPane>
        <TabPane tab={`Repair (${auditCount?.Repair})`} key="4">
          <SideBar
            carList={carList}
            category={5}
            carCount={auditCount?.Repair}
            headers="Repair"
          />
        </TabPane>
        <TabPane tab={`Breakdown (${auditCount?.Breakdown})`} key="5">
          <SideBar
            carList={carList}
            category={6}
            carCount={auditCount?.Breakdown}
            headers="Breakdown"
          />
        </TabPane>
        <TabPane tab={`Insurance (${auditCount?.Insurance})`} key="6">
          <SideBar
            carList={carList}
            category={7}
            carCount={auditCount?.Insurance}
            headers="Insurance"
          />
        </TabPane>
        <TabPane tab={`Car Recovery (${auditCount?.Car_Recovery})`} key="7">
          <SideBar
            carList={carList}
            category={8}
            carCount={auditCount?.Car_Recovery}
            headers="Car Recovery"
          />
        </TabPane>
      </Tabs>
    </div>
  );
};

export default WithPageHandler(Dashboard);
