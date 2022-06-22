/* eslint-disable max-len */
import { useState } from 'react';
import { Layout, Menu } from 'antd';
import { getVisitingCarInfo } from 'services/axios';
import CarInfo from './carInfo';

const SideBar = (props) => {
  const {
    carList, carCount, headers, category,
  } = props;
  const {
    Header, Content, Sider,
  } = Layout;

  const [visitingCarInfo, setVisitingCarInfo] = useState([]);
  const [carNumber, setCarNumber] = useState('');

  const handleClick = (carId, carNo) => {
    setCarNumber(carNo);
    getVisitingCarInfo(category, carId)
      .then((res) => {
        setVisitingCarInfo(res?.data?.results[0]);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="font-quicksand-bold text-lg">
      <Layout>
        <Sider
          breakpoint="lg"
          collapsedWidth="0"
        >
          <div className="logo" />
          <Menu style={{ color: '#86A1A4', fontWeight: 'regular' }} theme="light">
            <div className="px-3 pt-3 pb-2.5">
              <h3 className="font-quicksand-bold text-sm">
                {headers}
                {' '}
                Car List
              </h3>
            </div>
            {carList.map((item, index) => (
              <Menu.Item
                key={index.toString()}
                onClick={() => handleClick(item?.carId_id, item?.car_number)}
              >
                {' '}
                {/* <div className="flex place-content-center flex-row text-base"> */}
                {/* <img alt="car" height="40px" width="50px" src="/assets/images/general/bgRemovedCarImg.png" /> */}
                {item?.car_number}
                {/* </div> */}
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout>
          <Header className="site-layout-sub-header-background font-bold text-[#333333] text-sm" style={{ paddingLeft: '10px' }}>
            {headers}
            <span className="text-[#37BDC8]">
              {' '}
              (
              {carCount}
              )
            </span>
          </Header>
          <Content className="ml-0 mr-6 mt-4">
            <div className="site-layout-background">
              <CarInfo
                visitingCarInfo={visitingCarInfo}
                carNumber={carNumber}
              />
            </div>
          </Content>
        </Layout>
      </Layout>
    </div>
  );
};

export default SideBar;
